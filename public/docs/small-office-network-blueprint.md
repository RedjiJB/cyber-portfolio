# Small Office Network Blueprint
**Course:** CST8182 - Networking Fundamentals  
**Project Type:** Network Design & Implementation  
**Tools:** Cisco Packet Tracer, Draw.io/Lucidchart, Excel/Google Sheets

---

## Project Overview

Design and implement a complete small office network infrastructure from the ground up. This comprehensive project covers network topology design, IP addressing schemes using VLSM (Variable Length Subnet Masking), security policies, hardware specifications, cost analysis, and full implementation in Cisco Packet Tracer.

### Learning Objectives
- Apply network design principles for small business environments
- Implement VLSM for efficient IP address allocation
- Configure network security policies and access controls
- Select appropriate networking hardware based on requirements
- Perform cost-benefit analysis for network infrastructure
- Document professional network designs

---

## Project Requirements

### 1. Business Scenario
**Company Profile:**
- Small office with 30-50 employees
- 3 departments: Management (5 users), Sales (15 users), IT (8 users), General Staff (20 users)
- Requires internet connectivity, file sharing, printing services
- Need for guest WiFi network (isolated)
- VoIP phone system for internal/external calls
- Security cameras (IP-based) - optional advanced feature

### 2. Network Design Components

#### A. Topology Design
- **Physical Topology:** Star or Extended Star configuration
- **Logical Topology:** Hierarchical design (Core, Distribution, Access layers)
- **Redundancy:** Consider backup links and redundant equipment
- **Scalability:** Design for 50% growth over 3 years

#### B. IP Addressing Scheme (VLSM)
- Network: 192.168.10.0/24 (or choose appropriate)
- Subnets required:
  - Management VLAN: /28 (14 hosts)
  - Sales VLAN: /27 (30 hosts)
  - IT VLAN: /28 (14 hosts)
  - General Staff VLAN: /26 (62 hosts)
  - Guest WiFi VLAN: /28 (14 hosts)
  - VoIP VLAN: /27 (30 hosts)
  - Server Farm: /29 (6 hosts)
  - Network Devices: /29 (6 hosts)

#### C. Hardware Requirements
- **Router:** Cisco ISR (e.g., ISR 4331) or equivalent
- **Core Switch:** Layer 3 switch (Catalyst 3650 or higher)
- **Access Switches:** Layer 2 switches (Catalyst 2960 series)
- **Wireless Access Points:** Cisco Aironet or Meraki
- **Firewall:** ASA 5500 series or integrated router firewall
- **Server(s):** File server, DHCP/DNS server
- **Uninterruptible Power Supply (UPS)**

#### D. Security Policies
- VLAN segmentation and inter-VLAN routing
- Access Control Lists (ACLs)
- Port security on access switches
- WPA3 encryption for wireless networks
- Guest network isolation
- Basic firewall rules
- Network Address Translation (NAT/PAT)

---

## Implementation Guide

### Phase 1: Planning & Documentation (Week 1)

#### Tasks:
1. **Requirements Gathering**
   - Document business requirements
   - Interview stakeholders (simulated)
   - Create requirements matrix

2. **Initial Design**
   - Sketch preliminary topology
   - Calculate IP addressing requirements
   - List all necessary equipment

#### Screenshots Required:
- ✅ Requirements document (PDF/Word)
- ✅ Initial hand-drawn or digital topology sketch
- ✅ IP addressing calculation spreadsheet

---

### Phase 2: Detailed Design (Week 2)

#### Tasks:
1. **Create Professional Topology Diagram**
   - Use Draw.io, Lucidchart, or Cisco Packet Tracer
   - Include all devices, connections, and labels
   - Show IP addresses, VLANs, and subnets
   - Add legend and annotations

2. **VLSM Calculation & Documentation**
   - Create detailed subnet table
   - Document IP ranges, broadcast addresses, usable hosts
   - Plan DHCP ranges vs static assignments
   - Document gateway addresses

3. **Hardware Specification Document**
   - Model numbers and specifications
   - Justification for each device
   - Compatibility matrix
   - Vendor information

#### Screenshots Required:
- ✅ **Final network topology diagram (high resolution)**
- ✅ **VLSM calculation table (Excel/Google Sheets)**
- ✅ **IP addressing plan spreadsheet with all subnets**
- ✅ **Hardware specifications document**

#### Documentation Files:
```
docs/
├── network-topology-diagram.pdf
├── vlsm-calculations.xlsx
├── ip-addressing-plan.xlsx
└── hardware-specifications.pdf
```

---

### Phase 3: Cisco Packet Tracer Implementation (Week 3-4)

#### Setup Instructions:

##### Step 1: Create Network Infrastructure
1. Open Cisco Packet Tracer
2. Add devices:
   - 1x Router (e.g., 2911 or 4331)
   - 1x Layer 3 Core Switch (3650)
   - 3x Layer 2 Access Switches (2960)
   - 2x Wireless Access Points
   - 1x Server (for DHCP/DNS)
   - 1x Server (for File/Print services)
   - PCs for each department
   - IP Phones (optional)

**📸 SCREENSHOT #1:** Complete physical topology in Packet Tracer (before configuration)

##### Step 2: Cable Connections
1. Connect router to core switch (Gigabit)
2. Connect core switch to access switches
3. Connect access switches to end devices
4. Connect wireless APs to appropriate switches
5. Use appropriate cable types (copper straight-through, crossover, fiber where needed)

**📸 SCREENSHOT #2:** Cabling diagram showing all connections with link lights green

##### Step 3: Configure Router
```cisco
! Basic router configuration
Router> enable
Router# configure terminal
Router(config)# hostname Office-Router
Office-Router(config)# enable secret Cisco123!

! Configure interfaces
Office-Router(config)# interface GigabitEthernet0/0
Office-Router(config-if)# description Connection to ISP
Office-Router(config-if)# ip address dhcp
Office-Router(config-if)# no shutdown

Office-Router(config)# interface GigabitEthernet0/1
Office-Router(config-if)# description Connection to Core Switch
Office-Router(config-if)# ip address 192.168.10.1 255.255.255.252
Office-Router(config-if)# no shutdown

! Configure DHCP (if router acts as DHCP server)
Office-Router(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.10
Office-Router(config)# ip dhcp pool MANAGEMENT
Office-Router(dhcp-config)# network 192.168.10.16 255.255.255.240
Office-Router(dhcp-config)# default-router 192.168.10.17
Office-Router(dhcp-config)# dns-server 8.8.8.8

! Configure NAT
Office-Router(config)# access-list 1 permit 192.168.10.0 0.0.0.255
Office-Router(config)# ip nat inside source list 1 interface GigabitEthernet0/0 overload
Office-Router(config)# interface GigabitEthernet0/1
Office-Router(config-if)# ip nat inside
Office-Router(config)# interface GigabitEthernet0/0
Office-Router(config-if)# ip nat outside

Office-Router(config)# end
Office-Router# write memory
```

**📸 SCREENSHOT #3:** Router configuration (`show running-config`)
**📸 SCREENSHOT #4:** Router interface status (`show ip interface brief`)

##### Step 4: Configure VLANs on Core Switch
```cisco
! Core Switch configuration
Switch> enable
Switch# configure terminal
Switch(config)# hostname Core-Switch
Core-Switch(config)# enable secret Cisco123!

! Create VLANs
Core-Switch(config)# vlan 10
Core-Switch(config-vlan)# name MANAGEMENT
Core-Switch(config)# vlan 20
Core-Switch(config-vlan)# name SALES
Core-Switch(config)# vlan 30
Core-Switch(config-vlan)# name IT
Core-Switch(config)# vlan 40
Core-Switch(config-vlan)# name STAFF
Core-Switch(config)# vlan 50
Core-Switch(config-vlan)# name GUEST
Core-Switch(config)# vlan 60
Core-Switch(config-vlan)# name VOIP

! Configure trunk port to router
Core-Switch(config)# interface GigabitEthernet1/0/1
Core-Switch(config-if)# description Trunk to Router
Core-Switch(config-if)# switchport trunk encapsulation dot1q
Core-Switch(config-if)# switchport mode trunk
Core-Switch(config-if)# switchport trunk allowed vlan 10,20,30,40,50,60

! Configure SVI (Switch Virtual Interfaces) for inter-VLAN routing
Core-Switch(config)# ip routing
Core-Switch(config)# interface vlan 10
Core-Switch(config-if)# description Management VLAN
Core-Switch(config-if)# ip address 192.168.10.17 255.255.255.240
Core-Switch(config-if)# no shutdown

Core-Switch(config)# interface vlan 20
Core-Switch(config-if)# description Sales VLAN
Core-Switch(config-if)# ip address 192.168.10.33 255.255.255.224
Core-Switch(config-if)# no shutdown

! Repeat for other VLANs...

Core-Switch(config)# end
Core-Switch# write memory
```

**📸 SCREENSHOT #5:** VLAN configuration (`show vlan brief`)
**📸 SCREENSHOT #6:** Trunk configuration (`show interfaces trunk`)
**📸 SCREENSHOT #7:** SVI configuration (`show ip interface brief`)

##### Step 5: Configure Access Switches
```cisco
! Access Switch configuration (repeat for each switch)
Switch> enable
Switch# configure terminal
Switch(config)# hostname Access-SW1
Access-SW1(config)# enable secret Cisco123!

! Configure trunk to core switch
Access-SW1(config)# interface GigabitEthernet1/0/24
Access-SW1(config-if)# description Trunk to Core Switch
Access-SW1(config-if)# switchport mode trunk
Access-SW1(config-if)# switchport trunk allowed vlan 10,20,30,40

! Configure access ports for Management VLAN (ports 1-5)
Access-SW1(config)# interface range FastEthernet0/1-5
Access-SW1(config-if-range)# description Management Department
Access-SW1(config-if-range)# switchport mode access
Access-SW1(config-if-range)# switchport access vlan 10
Access-SW1(config-if-range)# spanning-tree portfast
Access-SW1(config-if-range)# switchport port-security
Access-SW1(config-if-range)# switchport port-security maximum 2

! Configure access ports for Sales VLAN (ports 6-20)
Access-SW1(config)# interface range FastEthernet0/6-20
Access-SW1(config-if-range)# description Sales Department
Access-SW1(config-if-range)# switchport mode access
Access-SW1(config-if-range)# switchport access vlan 20
Access-SW1(config-if-range)# spanning-tree portfast
Access-SW1(config-if-range)# switchport port-security

Access-SW1(config)# end
Access-SW1# write memory
```

**📸 SCREENSHOT #8:** Access switch port assignments (`show vlan brief`)
**📸 SCREENSHOT #9:** Port security configuration (`show port-security`)

##### Step 6: Configure DHCP Server
1. Add a Server device
2. Set static IP: 192.168.10.5
3. Configure DHCP service:
   - Enable DHCP Service
   - Configure pools for each VLAN
   - Set gateway, DNS, and lease time

**📸 SCREENSHOT #10:** DHCP server configuration interface
**📸 SCREENSHOT #11:** DHCP pools configured for all VLANs

##### Step 7: Configure Wireless Network
1. Configure Wireless Access Points:
   - SSID: "Office-Network"
   - Security: WPA2-PSK
   - Password: YourSecurePassword123!
   - VLAN: appropriate per AP location

2. Configure Guest WiFi:
   - SSID: "Office-Guest"
   - Security: WPA2-PSK
   - VLAN 50 (isolated)

**📸 SCREENSHOT #12:** Wireless AP configuration
**📸 SCREENSHOT #13:** Wireless security settings

##### Step 8: Configure End Devices
1. Add PCs to each department
2. Configure network settings:
   - DHCP (automatic) or static IPs
   - Appropriate VLAN assignment
3. Add laptops with wireless adapters for WiFi testing

**📸 SCREENSHOT #14:** PC receiving DHCP address from correct VLAN
**📸 SCREENSHOT #15:** Laptop connected to wireless network

##### Step 9: Implement Security Policies

**Configure ACLs on Router:**
```cisco
! Prevent Guest VLAN from accessing internal networks
Office-Router(config)# access-list 100 deny ip 192.168.10.64 0.0.0.15 192.168.10.0 0.0.0.63
Office-Router(config)# access-list 100 permit ip 192.168.10.64 0.0.0.15 any

Office-Router(config)# interface GigabitEthernet0/1.50
Office-Router(config-subif)# ip access-group 100 in

! Save configuration
Office-Router(config)# end
Office-Router# write memory
```

**📸 SCREENSHOT #16:** ACL configuration (`show access-lists`)
**📸 SCREENSHOT #17:** ACL applied to interface (`show ip interface GigabitEthernet0/1.50`)

---

### Phase 4: Testing & Verification (Week 4)

#### Connectivity Tests:

1. **Intra-VLAN Communication**
   - Ping between devices in same VLAN
   - **📸 SCREENSHOT #18:** Successful ping within VLAN 20 (Sales)

2. **Inter-VLAN Communication**
   - Ping from Sales VLAN to IT VLAN
   - **📸 SCREENSHOT #19:** Successful ping between different VLANs

3. **Internet Connectivity**
   - Ping from internal device to external IP (8.8.8.8)
   - **📸 SCREENSHOT #20:** Successful ping to internet from PC

4. **Guest Network Isolation**
   - Attempt ping from Guest VLAN to internal VLAN (should fail)
   - Attempt ping from Guest VLAN to internet (should succeed)
   - **📸 SCREENSHOT #21:** Guest network isolation test (blocked internal, allowed internet)

5. **DHCP Functionality**
   - Release and renew IP addresses
   - **📸 SCREENSHOT #22:** `ipconfig /renew` showing new DHCP lease

6. **Wireless Connectivity**
   - Connect laptop to wireless network
   - Verify internet access
   - **📸 SCREENSHOT #23:** Wireless laptop browsing internet

7. **Routing Table Verification**
   - Check routing tables on router and core switch
   - **📸 SCREENSHOT #24:** Routing table (`show ip route`)

8. **Port Security Test**
   - Connect multiple devices to port with security enabled
   - **📸 SCREENSHOT #25:** Port security violation log

#### Performance Tests:
- **📸 SCREENSHOT #26:** Bandwidth test between VLANs
- **📸 SCREENSHOT #27:** Latency/ping statistics report

---

### Phase 5: Documentation & Cost Analysis (Week 5)

#### Network Documentation Package:

1. **Executive Summary** (1-2 pages)
   - Project overview
   - Key achievements
   - Total cost summary

2. **Network Design Document** (5-10 pages)
   - Topology diagrams
   - IP addressing scheme
   - VLAN design
   - Security policies
   - Redundancy and failover plans

3. **Configuration Guide** (10-15 pages)
   - Step-by-step configuration for each device
   - Include all commands used
   - Troubleshooting tips

4. **Cost Analysis Spreadsheet**
   - Hardware costs (research actual prices)
   - Software/licensing costs
   - Installation costs
   - Maintenance costs (annual)
   - 5-year Total Cost of Ownership (TCO)

**Sample Cost Breakdown:**
| Item | Model | Quantity | Unit Price | Total |
|------|-------|----------|------------|-------|
| Router | Cisco ISR 4331 | 1 | $2,500 | $2,500 |
| Core Switch | Catalyst 3650-24PS | 1 | $4,000 | $4,000 |
| Access Switch | Catalyst 2960-24TT | 3 | $1,200 | $3,600 |
| Wireless AP | Aironet 2802i | 2 | $800 | $1,600 |
| Server | Dell PowerEdge T340 | 2 | $1,500 | $3,000 |
| UPS | APC Smart-UPS 1500VA | 3 | $400 | $1,200 |
| Cabling & Rack | Various | 1 | $1,500 | $1,500 |
| **Total Hardware** | | | | **$17,400** |

5. **Test Results Report**
   - All test results with screenshots
   - Performance metrics
   - Security validation

6. **User Guide** (for end users)
   - How to connect to network
   - WiFi setup instructions
   - Troubleshooting common issues

**📸 SCREENSHOT #28:** Final documentation package (table of contents)

---

## Deliverables Checklist

### Required Files:
- [ ] Network topology diagram (PDF/PNG)
- [ ] Cisco Packet Tracer file (.pkt)
- [ ] IP addressing plan (Excel/CSV)
- [ ] VLSM calculations (Excel/PDF)
- [ ] Hardware specifications document (PDF)
- [ ] Cost analysis spreadsheet (Excel)
- [ ] Configuration backup files (text files)
- [ ] Test results report with all screenshots (PDF)
- [ ] Network documentation (PDF, 20-30 pages)
- [ ] User guide (PDF, 5-10 pages)

### Screenshots Required (Minimum 28):
1. Complete physical topology in Packet Tracer
2. Cabling diagram with green link lights
3. Router running configuration
4. Router interface status
5. VLAN configuration
6. Trunk configuration
7. SVI configuration
8. Access switch port assignments
9. Port security configuration
10. DHCP server configuration
11. DHCP pools configured
12. Wireless AP configuration
13. Wireless security settings
14. PC receiving DHCP address
15. Laptop connected to wireless
16. ACL configuration
17. ACL applied to interface
18. Intra-VLAN ping test
19. Inter-VLAN ping test
20. Internet connectivity test
21. Guest network isolation test
22. DHCP renewal test
23. Wireless laptop internet access
24. Routing table
25. Port security violation
26. Bandwidth test
27. Latency statistics
28. Final documentation package

---

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| **Network Design** | 20 | Logical topology, scalability, redundancy |
| **IP Addressing (VLSM)** | 15 | Correct subnet calculations, efficient allocation |
| **Packet Tracer Implementation** | 25 | All devices configured correctly, full functionality |
| **Security Implementation** | 15 | VLANs, ACLs, port security, wireless security |
| **Testing & Verification** | 10 | Comprehensive testing, documented results |
| **Documentation** | 10 | Professional, complete, well-organized |
| **Cost Analysis** | 5 | Realistic pricing, justified selections |
| **Total** | **100** | |

---

## Tips for Success

### Best Practices:
1. **Plan Before You Build** - Complete all planning phases before opening Packet Tracer
2. **Save Often** - Save your .pkt file after each major configuration step
3. **Label Everything** - Use descriptions on interfaces, meaningful hostnames, comments in ACLs
4. **Test Incrementally** - Test after each configuration phase, don't wait until the end
5. **Document as You Go** - Take screenshots immediately after completing each step
6. **Use Standardization** - Consistent naming conventions, IP schemes, passwords

### Common Pitfalls to Avoid:
- ❌ Not calculating VLSM correctly (subnet overlap)
- ❌ Forgetting to enable interfaces (`no shutdown`)
- ❌ Incorrect trunk configuration
- ❌ Missing default gateway configuration on end devices
- ❌ Not saving configurations (`write memory`)
- ❌ Poor cable management in topology
- ❌ Inadequate testing documentation

### Advanced Challenges (Optional):
- Implement IPv6 addressing alongside IPv4
- Add redundant core switches with HSRP/VRRP
- Configure VTP (VLAN Trunking Protocol)
- Implement QoS for VoIP traffic
- Add network monitoring (SNMP simulation)
- Configure site-to-site VPN tunnel
- Implement wireless controller for centralized AP management

---

## Resources

### Cisco Packet Tracer Resources:
- [Cisco Packet Tracer Download](https://www.netacad.com/courses/packet-tracer)
- [Packet Tracer Tutorials](https://www.packettracernetwork.com/)
- [VLSM Calculator](https://www.subnet-calculator.com/vlsm.php)

### Documentation Templates:
- Network diagram symbols: [Cisco Official Icons](https://www.cisco.com/c/en/us/about/brand-center/network-topology-icons.html)
- Technical writing guide: [Network Documentation Best Practices](https://www.techrepublic.com/)

### Additional Reading:
- Cisco CCNA Study Guide - Chapters on VLAN, Routing, Security
- "Network Warrior" by Gary A. Donahue
- RFC 1918 - Private IP Addressing

---

## Project Timeline

| Week | Phase | Tasks | Deliverables |
|------|-------|-------|--------------|
| 1 | Planning | Requirements, initial design | Requirements doc, sketches |
| 2 | Design | Topology, VLSM, hardware specs | Diagrams, calculations, specs |
| 3 | Implementation | Packet Tracer build | .pkt file, configs |
| 4 | Testing | Verification, security tests | Test reports, screenshots |
| 5 | Documentation | Final docs, cost analysis | Complete project package |

---

## Submission Instructions

### File Naming Convention:
```
LastName_FirstName_SmallOfficeNetwork/
├── 01_Documentation/
│   ├── Executive_Summary.pdf
│   ├── Network_Design_Document.pdf
│   └── User_Guide.pdf
├── 02_Diagrams/
│   ├── Network_Topology.pdf
│   └── Network_Topology.png
├── 03_PacketTracer/
│   ├── SmallOfficeNetwork.pkt
│   └── Configuration_Backups/
├── 04_Calculations/
│   ├── VLSM_Calculations.xlsx
│   └── IP_Addressing_Plan.xlsx
├── 05_CostAnalysis/
│   └── Cost_Analysis.xlsx
├── 06_TestResults/
│   ├── Test_Report.pdf
│   └── Screenshots/
└── README.txt
```

### Submission Format:
- Compress entire folder as .zip
- Upload to learning management system
- File size limit: 50MB
- Due date: [Insert date]

---

**Good luck with your Small Office Network Blueprint project!** 🚀
