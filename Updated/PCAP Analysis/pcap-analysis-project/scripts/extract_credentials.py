#!/usr/bin/env python3
"""
PCAP Credential Extractor
Extracts credentials from various protocols in PCAP files
"""

import argparse
import sys
import re
import base64
from scapy.all import *
from scapy.layers.http import HTTPRequest, HTTPResponse
from collections import defaultdict
import json
from datetime import datetime

class CredentialExtractor:
    def __init__(self, pcap_file):
        self.pcap_file = pcap_file
        self.credentials = defaultdict(list)
        self.statistics = {
            'total_packets': 0,
            'http_packets': 0,
            'ftp_packets': 0,
            'smtp_packets': 0,
            'pop3_packets': 0,
            'imap_packets': 0,
            'telnet_packets': 0,
            'credentials_found': 0
        }
        
    def extract_http_credentials(self, packet):
        """Extract credentials from HTTP packets"""
        if packet.haslayer(HTTPRequest):
            self.statistics['http_packets'] += 1
            
            # Get HTTP layer
            http_layer = packet[HTTPRequest]
            
            # Extract URL
            url = http_layer.Host.decode() + http_layer.Path.decode() if http_layer.Host else http_layer.Path.decode()
            
            # Check for Basic Authentication
            if http_layer.Authorization:
                auth_header = http_layer.Authorization.decode()
                if auth_header.startswith('Basic '):
                    try:
                        decoded = base64.b64decode(auth_header[6:]).decode()
                        username, password = decoded.split(':', 1)
                        self._add_credential('HTTP Basic Auth', username, password, url, packet)
                    except:
                        pass
            
            # Check for form data in POST requests
            if http_layer.Method == b'POST':
                if packet.haslayer(Raw):
                    payload = packet[Raw].load.decode('utf-8', errors='ignore')
                    
                    # Common password field patterns
                    password_patterns = [
                        r'password=([^&\s]+)',
                        r'pass=([^&\s]+)',
                        r'pwd=([^&\s]+)',
                        r'passwd=([^&\s]+)',
                        r'user_pass=([^&\s]+)'
                    ]
                    
                    username_patterns = [
                        r'username=([^&\s]+)',
                        r'user=([^&\s]+)',
                        r'login=([^&\s]+)',
                        r'email=([^&\s]+)',
                        r'user_login=([^&\s]+)'
                    ]
                    
                    username = None
                    password = None
                    
                    for pattern in username_patterns:
                        match = re.search(pattern, payload, re.IGNORECASE)
                        if match:
                            username = match.group(1)
                            break
                    
                    for pattern in password_patterns:
                        match = re.search(pattern, payload, re.IGNORECASE)
                        if match:
                            password = match.group(1)
                            break
                    
                    if username and password:
                        self._add_credential('HTTP POST', username, password, url, packet)
    
    def extract_ftp_credentials(self, packet):
        """Extract credentials from FTP packets"""
        if packet.haslayer(TCP) and packet.haslayer(Raw):
            if packet[TCP].dport == 21 or packet[TCP].sport == 21:
                self.statistics['ftp_packets'] += 1
                payload = packet[Raw].load.decode('utf-8', errors='ignore')
                
                # FTP USER command
                if payload.startswith('USER '):
                    username = payload[5:].strip()
                    src_ip = packet[IP].src if packet.haslayer(IP) else 'Unknown'
                    dst_ip = packet[IP].dst if packet.haslayer(IP) else 'Unknown'
                    self.credentials['FTP_USERS'].append({
                        'username': username,
                        'src_ip': src_ip,
                        'dst_ip': dst_ip,
                        'timestamp': datetime.fromtimestamp(float(packet.time)).isoformat()
                    })
                
                # FTP PASS command
                elif payload.startswith('PASS '):
                    password = payload[5:].strip()
                    src_ip = packet[IP].src if packet.haslayer(IP) else 'Unknown'
                    dst_ip = packet[IP].dst if packet.haslayer(IP) else 'Unknown'
                    
                    # Try to match with recent USER command
                    if self.credentials['FTP_USERS']:
                        last_user = self.credentials['FTP_USERS'][-1]
                        if last_user['src_ip'] == src_ip and last_user['dst_ip'] == dst_ip:
                            self._add_credential('FTP', last_user['username'], password, dst_ip, packet)
    
    def extract_smtp_credentials(self, packet):
        """Extract credentials from SMTP packets"""
        if packet.haslayer(TCP) and packet.haslayer(Raw):
            if packet[TCP].dport == 25 or packet[TCP].sport == 25 or \
               packet[TCP].dport == 587 or packet[TCP].sport == 587:
                self.statistics['smtp_packets'] += 1
                payload = packet[Raw].load.decode('utf-8', errors='ignore')
                
                # SMTP AUTH LOGIN
                if 'AUTH LOGIN' in payload:
                    dst_ip = packet[IP].dst if packet.haslayer(IP) else 'Unknown'
                    self.credentials['SMTP_AUTH'].append({
                        'server': dst_ip,
                        'timestamp': datetime.fromtimestamp(float(packet.time)).isoformat()
                    })
                
                # Base64 encoded credentials after AUTH LOGIN
                elif len(self.credentials['SMTP_AUTH']) > 0:
                    try:
                        decoded = base64.b64decode(payload.strip()).decode()
                        if '@' in decoded:  # Likely an email/username
                            self.credentials['SMTP_AUTH'][-1]['username'] = decoded
                        else:  # Likely a password
                            if 'username' in self.credentials['SMTP_AUTH'][-1]:
                                username = self.credentials['SMTP_AUTH'][-1]['username']
                                self._add_credential('SMTP', username, decoded, 
                                                   self.credentials['SMTP_AUTH'][-1]['server'], packet)
                    except:
                        pass
    
    def extract_pop3_credentials(self, packet):
        """Extract credentials from POP3 packets"""
        if packet.haslayer(TCP) and packet.haslayer(Raw):
            if packet[TCP].dport == 110 or packet[TCP].sport == 110:
                self.statistics['pop3_packets'] += 1
                payload = packet[Raw].load.decode('utf-8', errors='ignore')
                
                # POP3 USER command
                if payload.startswith('USER '):
                    username = payload[5:].strip()
                    dst_ip = packet[IP].dst if packet.haslayer(IP) else 'Unknown'
                    self.credentials['POP3_USERS'].append({
                        'username': username,
                        'server': dst_ip,
                        'timestamp': datetime.fromtimestamp(float(packet.time)).isoformat()
                    })
                
                # POP3 PASS command
                elif payload.startswith('PASS '):
                    password = payload[5:].strip()
                    if self.credentials['POP3_USERS']:
                        last_user = self.credentials['POP3_USERS'][-1]
                        self._add_credential('POP3', last_user['username'], password, 
                                           last_user['server'], packet)
    
    def extract_imap_credentials(self, packet):
        """Extract credentials from IMAP packets"""
        if packet.haslayer(TCP) and packet.haslayer(Raw):
            if packet[TCP].dport == 143 or packet[TCP].sport == 143:
                self.statistics['imap_packets'] += 1
                payload = packet[Raw].load.decode('utf-8', errors='ignore')
                
                # IMAP LOGIN command
                login_match = re.search(r'LOGIN\s+(\S+)\s+(\S+)', payload, re.IGNORECASE)
                if login_match:
                    username = login_match.group(1).strip('"')
                    password = login_match.group(2).strip('"')
                    dst_ip = packet[IP].dst if packet.haslayer(IP) else 'Unknown'
                    self._add_credential('IMAP', username, password, dst_ip, packet)
    
    def extract_telnet_credentials(self, packet):
        """Extract credentials from Telnet packets"""
        if packet.haslayer(TCP) and packet.haslayer(Raw):
            if packet[TCP].dport == 23 or packet[TCP].sport == 23:
                self.statistics['telnet_packets'] += 1
                # Telnet credential extraction is complex due to character-by-character transmission
                # This is a simplified version
                payload = packet[Raw].load.decode('utf-8', errors='ignore')
                
                # Look for login prompts and responses
                if 'login:' in payload.lower() or 'username:' in payload.lower():
                    src_ip = packet[IP].src if packet.haslayer(IP) else 'Unknown'
                    dst_ip = packet[IP].dst if packet.haslayer(IP) else 'Unknown'
                    self.credentials['TELNET_SESSIONS'].append({
                        'src_ip': src_ip,
                        'dst_ip': dst_ip,
                        'timestamp': datetime.fromtimestamp(float(packet.time)).isoformat()
                    })
    
    def _add_credential(self, protocol, username, password, server, packet):
        """Add extracted credential to the collection"""
        src_ip = packet[IP].src if packet.haslayer(IP) else 'Unknown'
        dst_ip = packet[IP].dst if packet.haslayer(IP) else 'Unknown'
        
        credential = {
            'protocol': protocol,
            'username': username,
            'password': password,
            'server': server,
            'src_ip': src_ip,
            'dst_ip': dst_ip,
            'timestamp': datetime.fromtimestamp(float(packet.time)).isoformat()
        }
        
        self.credentials['extracted_credentials'].append(credential)
        self.statistics['credentials_found'] += 1
    
    def process_packet(self, packet):
        """Process a single packet"""
        self.statistics['total_packets'] += 1
        
        try:
            self.extract_http_credentials(packet)
            self.extract_ftp_credentials(packet)
            self.extract_smtp_credentials(packet)
            self.extract_pop3_credentials(packet)
            self.extract_imap_credentials(packet)
            self.extract_telnet_credentials(packet)
        except Exception as e:
            pass  # Continue processing other packets
    
    def analyze(self):
        """Analyze the PCAP file"""
        print(f"[*] Loading PCAP file: {self.pcap_file}")
        
        try:
            # Process packets
            sniff(offline=self.pcap_file, prn=self.process_packet, store=0)
            
            return True
        except Exception as e:
            print(f"[!] Error analyzing PCAP: {str(e)}")
            return False
    
    def print_results(self):
        """Print analysis results"""
        print("\n" + "="*60)
        print("CREDENTIAL EXTRACTION RESULTS")
        print("="*60)
        
        print(f"\nStatistics:")
        print(f"  Total packets analyzed: {self.statistics['total_packets']}")
        print(f"  HTTP packets: {self.statistics['http_packets']}")
        print(f"  FTP packets: {self.statistics['ftp_packets']}")
        print(f"  SMTP packets: {self.statistics['smtp_packets']}")
        print(f"  POP3 packets: {self.statistics['pop3_packets']}")
        print(f"  IMAP packets: {self.statistics['imap_packets']}")
        print(f"  Telnet packets: {self.statistics['telnet_packets']}")
        print(f"  Credentials found: {self.statistics['credentials_found']}")
        
        if self.credentials['extracted_credentials']:
            print(f"\nExtracted Credentials:")
            print("-"*60)
            
            for cred in self.credentials['extracted_credentials']:
                print(f"\nProtocol: {cred['protocol']}")
                print(f"Username: {cred['username']}")
                print(f"Password: {cred['password']}")
                print(f"Server: {cred['server']}")
                print(f"Source IP: {cred['src_ip']}")
                print(f"Destination IP: {cred['dst_ip']}")
                print(f"Timestamp: {cred['timestamp']}")
                print("-"*60)
        else:
            print("\n[!] No credentials found in the PCAP file")
    
    def save_results(self, output_file):
        """Save results to JSON file"""
        results = {
            'analysis_timestamp': datetime.now().isoformat(),
            'pcap_file': self.pcap_file,
            'statistics': self.statistics,
            'credentials': dict(self.credentials)
        }
        
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        
        print(f"\n[+] Results saved to: {output_file}")

def main():
    parser = argparse.ArgumentParser(
        description='Extract credentials from PCAP files',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  %(prog)s capture.pcap
  %(prog)s capture.pcap -o results.json
  %(prog)s capture.pcap --verbose
        '''
    )
    
    parser.add_argument('pcap_file', help='Path to PCAP file')
    parser.add_argument('-o', '--output', help='Output JSON file for results')
    parser.add_argument('-v', '--verbose', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    # Check if file exists
    if not os.path.exists(args.pcap_file):
        print(f"[!] Error: PCAP file not found: {args.pcap_file}")
        sys.exit(1)
    
    # Create extractor
    extractor = CredentialExtractor(args.pcap_file)
    
    # Analyze PCAP
    if extractor.analyze():
        # Print results
        extractor.print_results()
        
        # Save results if output file specified
        if args.output:
            extractor.save_results(args.output)
    else:
        sys.exit(1)

if __name__ == '__main__':
    main()