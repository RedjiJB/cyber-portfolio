# Networking Fundamentals - Labs

This directory contains hands-on lab exercises and practical network configurations from CST8182.

## Lab Structure

Each lab includes:
- **Objectives**: What skills and concepts the lab covers
- **Topology**: Network diagram or Packet Tracer file
- **Configuration**: Step-by-step device configurations
- **Verification**: Commands and outputs to verify functionality
- **Troubleshooting**: Common issues and solutions
- **Deliverables**: Screenshots, configs, and documentation

## Labs Overview

### Lab 1: Network Topology Exploration
**Objectives:**
- Explore basic networking devices (PCs, switches, routers)
- Configure basic hostnames and IP addresses using Packet Tracer
- Test connectivity using ping and tracert

**Tasks:**
- Set up a 3-device topology (2 PCs + 1 Switch)
- Assign IP addresses using IPv4
- Verify connectivity between devices
- Capture the ICMP traffic using Wireshark

**Deliverables:**
- Screenshot of successful ping results
- Wireshark packet capture showing ICMP echo and reply

---

### Lab 2: Protocols and OSI Model
**Objectives:**
- Understand encapsulation and protocol operation
- Analyze data encapsulation with Wireshark

**Tasks:**
- Use Wireshark to capture HTTP, DNS, and ARP packets
- Identify OSI layer for each captured protocol
- Create a mapping chart: Protocol → OSI Layer → Function

**Deliverables:**
- Table mapping protocols to OSI layers
- Screenshot of Wireshark filter results

---

### Lab 3: Ethernet and ARP
**Objectives:**
- Examine Layer 2 data transfer and MAC addressing
- Analyze ARP requests and replies in local networks

**Tasks:**
- Create a simple LAN with 3 PCs and a switch
- Clear ARP cache and ping between devices
- Observe ARP tables using `arp -a`

**Deliverables:**
- Screenshot of ARP cache table
- Short explanation of ARP resolution process

---

### Lab 4: Router Configuration & Default Gateway
**Objectives:**
- Configure router interfaces and default gateway
- Verify routing and subnet communication

**Tasks:**
- Configure router interface IPs for two subnets
- Set default gateway on PCs
- Use `show ip route` and ping to confirm routing

**Deliverables:**
- Router config file
- Screenshot of connectivity test between subnets

---

### Lab 5: IPv4 & IPv6 Addressing
**Objectives:**
- Apply subnetting concepts and configure IPv6 addressing
- Compare IPv4 vs IPv6 operation

**Tasks:**
- Subnet a /24 network into four /26 networks
- Assign IPs to devices in Packet Tracer
- Enable IPv6 and configure link-local addresses

**Deliverables:**
- Subnetting table (Network ID, Range, Broadcast)
- Screenshot of successful IPv6 ping

---

### Lab 6: Subnetting & VLSM
**Objectives:**
- Master Variable Length Subnet Masking (VLSM)
- Design efficient IP addressing schemes for complex networks

**Tasks:**
- Given a network requirement, design VLSM scheme
- Calculate subnet boundaries for networks of varying sizes
- Implement the design in Packet Tracer
- Verify connectivity across all subnets

**Deliverables:**
- Complete VLSM calculation worksheet
- Network diagram with IP addressing scheme
- Packet Tracer topology file

---

### Lab 7: Static Routing Configuration
**Objectives:**
- Configure static routes between multiple routers
- Understand routing table entries and next-hop addresses

**Tasks:**
- Build a multi-router topology (3+ routers)
- Configure static routes for all networks
- Use `show ip route` to verify routing table
- Test end-to-end connectivity with ping and traceroute

**Deliverables:**
- Router configuration files
- Screenshot of routing tables
- Traceroute output showing path selection

---

### Lab 8: Dynamic Routing (RIP & OSPF)
**Objectives:**
- Configure and compare RIP and OSPF dynamic routing protocols
- Understand routing protocol convergence

**Tasks:**
- Configure RIPv2 on multi-router network
- Configure OSPF with area design
- Analyze routing updates with debug commands
- Compare convergence times between protocols

**Deliverables:**
- Configuration files for both protocols
- Wireshark capture of routing updates
- Comparison analysis document

---

### Lab 9: VLAN Configuration & Trunking
**Objectives:**
- Create and configure VLANs on switches
- Implement trunk links between switches

**Tasks:**
- Create multiple VLANs (VLAN 10, 20, 30)
- Assign switch ports to VLANs
- Configure 802.1Q trunk links
- Verify VLAN isolation and trunk operation

**Deliverables:**
- Switch configuration files
- VLAN database output
- Trunk verification screenshots

---

### Lab 10: Inter-VLAN Routing
**Objectives:**
- Enable communication between VLANs using router-on-a-stick
- Configure switch virtual interfaces (SVIs)

**Tasks:**
- Configure router subinterfaces for each VLAN
- Enable 802.1Q encapsulation
- Test inter-VLAN connectivity
- Implement Layer 3 switching (if available)

**Deliverables:**
- Router and switch configurations
- Successful ping tests between VLANs
- Network topology diagram

---

### Lab 11: DHCP & DNS Services
**Objectives:**
- Configure DHCP server on router
- Set up DNS services for name resolution

**Tasks:**
- Configure DHCP pools with options (gateway, DNS)
- Exclude static IP addresses from pools
- Configure DNS server for hostname resolution
- Test automatic IP assignment and name resolution

**Deliverables:**
- DHCP configuration file
- `show ip dhcp binding` output
- DNS query test results

---

### Lab 12: Access Control Lists (ACLs)
**Objectives:**
- Implement standard and extended ACLs
- Control traffic flow for security

**Tasks:**
- Create standard ACL to filter by source IP
- Create extended ACL to filter by protocol/port
- Apply ACLs to router interfaces
- Test and verify traffic filtering

**Deliverables:**
- ACL configuration files
- Before/after ping test results
- Traffic flow diagrams

---

### Lab 13: NAT & PAT Configuration
**Objectives:**
- Configure Network Address Translation (NAT)
- Implement Port Address Translation (PAT)

**Tasks:**
- Configure static NAT for server
- Configure dynamic NAT pool
- Implement PAT (NAT overload)
- Verify NAT translations with `show ip nat translations`

**Deliverables:**
- NAT configuration files
- Translation table screenshots
- Internet connectivity test results

---

### Lab 14: Network Security & Best Practices
**Objectives:**
- Implement comprehensive network security measures
- Apply industry best practices

**Tasks:**
- Configure encrypted passwords and SSH
- Implement port security on switches
- Configure VLAN security (shutdown unused VLANs)
- Apply ACLs for traffic filtering
- Document security baseline

**Deliverables:**
- Complete security configuration files
- Security compliance checklist
- Final network topology with security annotations

---

## Skills Developed

- ✅ Cisco IOS command-line interface (CLI) proficiency
- ✅ Network device configuration and management
- ✅ IP addressing and subnetting calculations
- ✅ VLAN design and implementation
- ✅ Routing protocol configuration
- ✅ Network security implementation
- ✅ Troubleshooting methodologies
- ✅ Network documentation skills

## Lab Equipment

- Cisco Packet Tracer (Simulation Software)
- Cisco 2960 Series Switches (Physical/Virtual)
- Cisco 1941 Series Routers (Physical/Virtual)
- Console Cables
- Ethernet Cables (Straight-through and Crossover)

## Resources

- [Cisco Packet Tracer Download](https://www.netacad.com/courses/packet-tracer)
- [Cisco IOS Command Reference](https://www.cisco.com/c/en/us/support/ios-nx-os-software/ios-15-4m-t/products-command-reference-list.html)
- [Subnetting Practice Tools](https://subnetipv4.com/)

---

*Each lab demonstrates hands-on application of networking concepts and prepares for real-world network administration tasks.*

---

## 💾 Lab Files Repository

All lab materials available at:
```
/networking-fundamentals/labs/
├── week01/
│   ├── lab.md (Student assignment)
│   ├── manual.md (Instructor guide)
│   ├── writeup.md (Completed writeup)
│   └── topology.pkt (Packet Tracer file)
├── week02/
│   ├── lab.md
│   ├── manual.md
│   ├── writeup.md
│   └── sample-capture.pcap
...
```

---

## 🎓 Module Summary: Skills & Deliverables

### Technical Skills Developed Across All Labs

**Network Design & Implementation:**
- ✅ Design and build network topologies using Cisco Packet Tracer
- ✅ Select appropriate network devices (routers, switches, access points)
- ✅ Choose correct cable types (straight-through, crossover, fiber)
- ✅ Plan IP addressing schemes and subnet allocations
- ✅ Implement VLANs and inter-VLAN routing
- ✅ Configure wireless access points and security

**Device Configuration:**
- ✅ Navigate Cisco IOS command-line interface (CLI)
- ✅ Configure router interfaces with IP addresses
- ✅ Set up static and dynamic routing protocols
- ✅ Implement DHCP servers and relay agents
- ✅ Configure DNS services for name resolution
- ✅ Apply basic security configurations (passwords, banners, SSH)
- ✅ Configure and verify Access Control Lists (ACLs)

**Protocol Analysis & Troubleshooting:**
- ✅ Capture and analyze packets using Wireshark
- ✅ Identify protocols operating at each OSI layer
- ✅ Understand encapsulation and de-encapsulation processes
- ✅ Analyze TCP three-way handshake and connection teardown
- ✅ Troubleshoot ARP, DHCP, DNS, and routing issues
- ✅ Use diagnostic commands (ping, traceroute, nslookup, ipconfig)
- ✅ Interpret router and switch show commands

**IP Addressing & Subnetting:**
- ✅ Calculate subnet masks for given host requirements
- ✅ Design VLSM (Variable Length Subnet Mask) schemes
- ✅ Identify network, broadcast, and usable host addresses
- ✅ Convert between decimal, binary, and CIDR notation
- ✅ Implement classless addressing strategies
- ✅ Understand private vs public IP addresses
- ✅ Configure IPv6 addresses and dual-stack environments

---

### Complete Deliverables Portfolio

**Total Lab Hours:** 28 hours (14 weeks × 2 hours/week)

**All Artifacts Created:**
- 📁 14 Packet Tracer topologies (.pkt files)
- 📁 7 Wireshark packet captures (.pcap files)
- 📁 28+ router and switch configuration files
- 📁 14 comprehensive lab writeups with analysis
- 📁 14 weekly reflection journals
- 📁 Network diagrams and IP addressing schemes
- 📁 Midterm project report (15 pages)
- 📁 Final project report (25 pages)

**Skills Proficiency Achieved:**

| Skill Category | Level | Evidence |
|----------------|-------|----------|
| Packet Tracer Navigation | ⭐⭐⭐⭐⭐ | 14 complex topologies built |
| Cisco IOS CLI | ⭐⭐⭐⭐ | 28+ devices configured |
| IP Addressing & Subnetting | ⭐⭐⭐⭐⭐ | 20+ schemes designed |
| Protocol Analysis | ⭐⭐⭐⭐ | 7 packet captures analyzed |
| Troubleshooting | ⭐⭐⭐⭐ | 30+ issues resolved |
| Technical Documentation | ⭐⭐⭐⭐⭐ | 500+ pages produced |

---

### Industry Alignment

**Certification Readiness:**
- ✅ CompTIA Network+ (Ready to attempt)
- 🔄 Cisco CCNA (70% prepared)
- ⏳ CompTIA Security+ (Foundation established)

**Job-Ready Skills:**
- Network Technician
- Help Desk / IT Support
- Junior Network Administrator
- NOC Technician

---

**Module Completed**: October 2024  
**Total Artifacts**: 180+ files  
**GitHub Portfolio**: Available for employer review
