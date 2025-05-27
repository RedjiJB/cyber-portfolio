#!/usr/bin/env python3
"""
PCAP Analyzer - Automated Network Forensics Tool
Author: Your Name
Description: Analyzes PCAP files for suspicious patterns and generates reports
"""

import sys
import argparse
from datetime import datetime
from collections import Counter
import ipaddress
from scapy.all import *
import json

class PCAPAnalyzer:
    def __init__(self, pcap_file):
        self.pcap_file = pcap_file
        self.packets = []
        self.results = {
            'summary': {},
            'suspicious_ips': [],
            'dns_queries': [],
            'http_requests': [],
            'potential_c2': [],
            'file_transfers': [],
            'anomalies': []
        }
    
    def load_pcap(self):
        """Load and parse PCAP file"""
        print(f"[*] Loading PCAP: {self.pcap_file}")
        try:
            self.packets = rdpcap(self.pcap_file)
            print(f"[+] Loaded {len(self.packets)} packets")
            return True
        except Exception as e:
            print(f"[!] Error loading PCAP: {e}")
            return False
    
    def analyze_summary(self):
        """Generate traffic summary statistics"""
        print("[*] Generating summary statistics...")
        
        # Time range
        timestamps = [pkt.time for pkt in self.packets if hasattr(pkt, 'time')]
        if timestamps:
            self.results['summary']['start_time'] = datetime.fromtimestamp(min(timestamps))
            self.results['summary']['end_time'] = datetime.fromtimestamp(max(timestamps))
            self.results['summary']['duration'] = max(timestamps) - min(timestamps)
        
        # Protocol distribution
        protocols = Counter()
        for pkt in self.packets:
            if IP in pkt:
                if TCP in pkt:
                    protocols['TCP'] += 1
                elif UDP in pkt:
                    protocols['UDP'] += 1
                elif ICMP in pkt:
                    protocols['ICMP'] += 1
                else:
                    protocols['Other'] += 1
        
        self.results['summary']['protocols'] = dict(protocols)
        self.results['summary']['total_packets'] = len(self.packets)
    
    def analyze_dns(self):
        """Extract and analyze DNS queries"""
        print("[*] Analyzing DNS traffic...")
        
        dns_packets = [pkt for pkt in self.packets if pkt.haslayer(DNS)]
        
        for pkt in dns_packets:
            if pkt[DNS].qr == 0:  # DNS query
                query = {
                    'timestamp': datetime.fromtimestamp(pkt.time).isoformat(),
                    'src_ip': pkt[IP].src if IP in pkt else 'Unknown',
                    'query': pkt[DNS].qd.qname.decode() if pkt[DNS].qd else 'Unknown',
                    'type': pkt[DNS].qd.qtype if pkt[DNS].qd else 0
                }
                
                # Check for suspicious patterns
                if self._is_suspicious_dns(query['query']):
                    query['suspicious'] = True
                    self.results['anomalies'].append({
                        'type': 'Suspicious DNS',
                        'details': f"Possible DNS tunneling: {query['query']}",
                        'timestamp': query['timestamp']
                    })
                
                self.results['dns_queries'].append(query)
    
    def _is_suspicious_dns(self, domain):
        """Check for DNS tunneling indicators"""
        # Long subdomain (possible data encoding)
        parts = domain.split('.')
        if any(len(part) > 50 for part in parts):
            return True
        
        # High entropy (random-looking)
        if len(parts) > 4:  # Many subdomains
            return True
        
        # Known DGA patterns
        suspicious_tlds = ['.tk', '.ml', '.ga', '.cf']
        if any(domain.endswith(tld) for tld in suspicious_tlds):
            return True
        
        return False
    
    def analyze_http(self):
        """Extract HTTP requests and responses"""
        print("[*] Analyzing HTTP traffic...")
        
        http_packets = [pkt for pkt in self.packets if pkt.haslayer(TCP) and pkt.haslayer(Raw)]
        
        for pkt in http_packets:
            payload = pkt[Raw].load
            
            # Check for HTTP request
            if payload.startswith(b'GET') or payload.startswith(b'POST'):
                try:
                    lines = payload.split(b'\r\n')
                    request_line = lines[0].decode('utf-8', errors='ignore')
                    
                    # Extract headers
                    headers = {}
                    for line in lines[1:]:
                        if b':' in line:
                            key, value = line.split(b':', 1)
                            headers[key.decode()] = value.decode().strip()
                    
                    http_req = {
                        'timestamp': datetime.fromtimestamp(pkt.time).isoformat(),
                        'src_ip': pkt[IP].src,
                        'dst_ip': pkt[IP].dst,
                        'method': request_line.split()[0],
                        'uri': request_line.split()[1] if len(request_line.split()) > 1 else '',
                        'user_agent': headers.get('User-Agent', 'Unknown')
                    }
                    
                    # Check for suspicious patterns
                    if self._is_suspicious_http(http_req):
                        http_req['suspicious'] = True
                    
                    self.results['http_requests'].append(http_req)
                    
                except Exception as e:
                    pass
    
    def _is_suspicious_http(self, request):
        """Check for suspicious HTTP patterns"""
        suspicious_paths = ['/cmd', '/shell', '/exec', '/upload', '/download']
        suspicious_agents = ['Mozilla/4.0', 'Wget', 'curl', 'python']
        
        # Check URI
        if any(path in request['uri'].lower() for path in suspicious_paths):
            return True
        
        # Check User-Agent
        if any(agent in request['user_agent'] for agent in suspicious_agents):
            return True
        
        return False
    
    def detect_c2_patterns(self):
        """Detect potential C2 communication patterns"""
        print("[*] Detecting C2 patterns...")
        
        # Group connections by src-dst pairs
        connections = {}
        for pkt in self.packets:
            if IP in pkt and TCP in pkt:
                key = (pkt[IP].src, pkt[IP].dst, pkt[TCP].dport)
                if key not in connections:
                    connections[key] = []
                connections[key].append(pkt.time)
        
        # Analyze for beacon-like behavior
        for conn, times in connections.items():
            if len(times) > 5:  # Multiple connections
                # Calculate intervals
                intervals = [times[i+1] - times[i] for i in range(len(times)-1)]
                
                # Check for regular intervals (beacon)
                if intervals:
                    avg_interval = sum(intervals) / len(intervals)
                    variance = sum((i - avg_interval) ** 2 for i in intervals) / len(intervals)
                    
                    # Low variance suggests regular beacon
                    if variance < (avg_interval * 0.1) ** 2:
                        self.results['potential_c2'].append({
                            'src_ip': conn[0],
                            'dst_ip': conn[1],
                            'dst_port': conn[2],
                            'beacon_interval': avg_interval,
                            'connection_count': len(times),
                            'confidence': 'High' if variance < (avg_interval * 0.05) ** 2 else 'Medium'
                        })
    
    def extract_credentials(self):
        """Extract potential credentials from traffic"""
        print("[*] Searching for credentials...")
        
        for pkt in self.packets:
            if pkt.haslayer(Raw):
                payload = pkt[Raw].load
                
                # FTP credentials
                if b'USER' in payload or b'PASS' in payload:
                    self.results['anomalies'].append({
                        'type': 'Credential Exposure',
                        'details': 'FTP credentials detected',
                        'src_ip': pkt[IP].src if IP in pkt else 'Unknown',
                        'dst_ip': pkt[IP].dst if IP in pkt else 'Unknown',
                        'timestamp': datetime.fromtimestamp(pkt.time).isoformat()
                    })
                
                # HTTP Basic Auth
                if b'Authorization: Basic' in payload:
                    self.results['anomalies'].append({
                        'type': 'Credential Exposure',
                        'details': 'HTTP Basic Auth detected',
                        'src_ip': pkt[IP].src if IP in pkt else 'Unknown',
                        'dst_ip': pkt[IP].dst if IP in pkt else 'Unknown',
                        'timestamp': datetime.fromtimestamp(pkt.time).isoformat()
                    })
    
    def generate_report(self, output_file):
        """Generate analysis report"""
        print(f"[*] Generating report: {output_file}")
        
        with open(output_file, 'w') as f:
            f.write("# PCAP Analysis Report\n\n")
            f.write(f"**File**: {self.pcap_file}\n")
            f.write(f"**Analysis Date**: {datetime.now().isoformat()}\n\n")
            
            # Summary
            f.write("## Summary\n\n")
            for key, value in self.results['summary'].items():
                f.write(f"- **{key.replace('_', ' ').title()}**: {value}\n")
            f.write("\n")
            
            # Suspicious DNS
            if self.results['dns_queries']:
                suspicious_dns = [q for q in self.results['dns_queries'] if q.get('suspicious')]
                if suspicious_dns:
                    f.write("## Suspicious DNS Queries\n\n")
                    for query in suspicious_dns[:10]:  # Top 10
                        f.write(f"- {query['query']} from {query['src_ip']}\n")
                    f.write("\n")
            
            # Potential C2
            if self.results['potential_c2']:
                f.write("## Potential C2 Communication\n\n")
                for c2 in self.results['potential_c2']:
                    f.write(f"- **{c2['src_ip']}** → **{c2['dst_ip']}:{c2['dst_port']}**\n")
                    f.write(f"  - Beacon Interval: {c2['beacon_interval']:.2f}s\n")
                    f.write(f"  - Connections: {c2['connection_count']}\n")
                    f.write(f"  - Confidence: {c2['confidence']}\n\n")
            
            # Anomalies
            if self.results['anomalies']:
                f.write("## Anomalies Detected\n\n")
                for anomaly in self.results['anomalies']:
                    f.write(f"- **{anomaly['type']}**: {anomaly['details']}\n")
                    f.write(f"  - Time: {anomaly['timestamp']}\n\n")
            
            # Save JSON for further processing
            json_file = output_file.replace('.md', '.json')
            with open(json_file, 'w') as jf:
                json.dump(self.results, jf, indent=2, default=str)
            f.write(f"\n*Full results saved to: {json_file}*\n")

def main():
    parser = argparse.ArgumentParser(description='Automated PCAP Analysis Tool')
    parser.add_argument('pcap', help='PCAP file to analyze')
    parser.add_argument('-o', '--output', default='analysis_report.md', help='Output report file')
    
    args = parser.parse_args()
    
    analyzer = PCAPAnalyzer(args.pcap)
    
    if analyzer.load_pcap():
        analyzer.analyze_summary()
        analyzer.analyze_dns()
        analyzer.analyze_http()
        analyzer.detect_c2_patterns()
        analyzer.extract_credentials()
        analyzer.generate_report(args.output)
        print(f"[+] Analysis complete! Report saved to: {args.output}")
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()