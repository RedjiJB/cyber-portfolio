# Networking Fundamentals - Projects

Major projects and network design assignments completed during CST8182.

## Projects Overview

This directory contains comprehensive network design and implementation projects that demonstrate practical application of networking fundamentals.

---

## Final Project: "Designing a Small Office Network"

**Objective:**  
Design and simulate a complete network for a 10-user office including both wired and wireless connectivity.

**Requirements:**

**Network Components:**
- 1 Router
- 1 Switch
- 1 Wireless Access Point (AP)
- 10 End devices (PCs, laptops, phones)

**Network Design:**
- **Two subnets:**
  - Admin subnet (Static IP addressing)
  - Guest subnet (DHCP)
- **Security:**
  - Firewall/ACL to isolate traffic between subnets
  - Guest network with restricted access
- **Services:**
  - DHCP server for Guest network
  - DNS configuration
  - Default gateway properly configured

**Deliverables:**

1. **Network Topology Diagram**
   - Complete visual representation of the network
   - IP addressing scheme clearly labeled
   - Device connections and interfaces documented

2. **Packet Tracer Simulation File (.pkt)**
   - Fully functional network simulation
   - All devices configured and tested
   - Connectivity verified between all segments

3. **Configuration Documentation**
   - Router configuration file with comments
   - Switch configuration file with VLAN setup
   - AP wireless settings
   - IP addressing table

4. **Testing & Verification Report**
   - Ping tests showing connectivity
   - ACL verification (traffic allowed/denied as designed)
   - DHCP lease verification
   - Screenshots of successful tests

5. **Reflection Document**
   - Design choices and justification
   - Challenges encountered and solutions
   - Lessons learned
   - Future improvements or scalability considerations

**Skills Demonstrated:**
- ✅ Network design and planning
- ✅ IP addressing and subnetting
- ✅ Router and switch configuration
- ✅ VLAN implementation
- ✅ Security implementation (ACLs)
- ✅ Wireless network integration
- ✅ DHCP and DNS configuration
- ✅ Testing and troubleshooting
- ✅ Technical documentation

---

## Additional Lab Projects

### Project 1: Basic LAN Setup
- 3-device topology (2 PCs + 1 Switch)
- IPv4 addressing and connectivity testing
- Wireshark packet analysis

### Project 2: Multi-Subnet Router Configuration
- Two subnets connected via router
- Static routing configuration
- Inter-subnet communication verification

### Project 3: IPv4 and IPv6 Dual-Stack Network
- Subnet a /24 network into four /26 networks
- Configure IPv6 link-local and global addresses
- Test both IPv4 and IPv6 connectivity

---

## Project Development Process

### Planning Phase
1. Understand requirements and constraints
2. Design IP addressing scheme
3. Sketch network topology
4. Plan security policies

### Implementation Phase
1. Build topology in Packet Tracer
2. Configure devices systematically (Router → Switch → End devices)
3. Implement security features (ACLs)
4. Configure services (DHCP, DNS)

### Testing Phase
1. Verify connectivity within each subnet
2. Test inter-subnet routing
3. Verify ACL rules (allow/deny)
4. Test wireless connectivity
5. Document all test results

### Documentation Phase
1. Create professional network diagram
2. Export and comment configuration files
3. Compile testing screenshots
4. Write comprehensive reflection

---

## Skills Developed Through Projects

### Technical Skills
- ✅ Cisco IOS command-line interface
- ✅ Network topology design
- ✅ IP addressing and subnetting calculations
- ✅ Router and switch configuration
- ✅ Access Control List (ACL) implementation
- ✅ Wireless network setup
- ✅ Network services configuration (DHCP, DNS)
- ✅ Troubleshooting methodologies

### Professional Skills
- ✅ Technical documentation
- ✅ Problem-solving and critical thinking
- ✅ Attention to detail
- ✅ Time management
- ✅ Self-directed learning

---

## Tools Used

- **Cisco Packet Tracer 8.2.2**: Network simulation and configuration
- **Wireshark**: Protocol analysis and packet capture
- **Draw.io / Visio**: Network diagram creation
- **Notepad++**: Configuration file editing
- **Microsoft Word/PDF**: Documentation

---

## Lessons Learned

1. **Plan Before Implementing**: Proper IP addressing design saves troubleshooting time
2. **Test Incrementally**: Verify each configuration step before moving forward
3. **Document Everything**: Good documentation helps troubleshooting and future reference
4. **Security First**: Easier to build security in from the start than add it later
5. **Understand the "Why"**: Knowing why configurations work helps fix problems faster

---

*This project represents the culmination of networking fundamentals knowledge, demonstrating the ability to design, implement, secure, and troubleshoot a small office network.*

---

## Project 2: Multi-Site Network with Routing

**Objective:** Connect three office locations using routers and implement dynamic routing.

**Scenario:**
A company has three locations:
- **Head Office:** 100 users, 4 VLANs
- **Branch Office 1:** 50 users, 2 VLANs  
- **Branch Office 2:** 30 users, 2 VLANs

**Requirements:**
- Each site has local switching infrastructure
- Sites connected via WAN links (simulated)
- RIPv2 for dynamic routing
- Redundant paths for fault tolerance
- Security between sites with ACLs

**Skills Demonstrated:**
- Multi-site network design
- WAN connectivity concepts
- Dynamic routing protocol configuration
- Redundancy and fault tolerance
- Inter-site security

**Deliverables:**
- Complete network diagram
- IP addressing plan for all sites
- Router configurations
- Routing table documentation
- Failover testing results

**Status:** ✅ Completed  
**Grade:** 92%  
**Files:** `project-2-multi-site-network/`

---

## Project 3: Network Troubleshooting Challenge

**Objective:** Diagnose and fix a pre-configured broken network.

**Scenario:**
Given a network with multiple intentional misconfigurations, identify and resolve all issues to restore full connectivity.

**Issues Present:**
- IP addressing conflicts
- Incorrect subnet masks
- Wrong default gateway
- VLAN mismatches on trunk ports
- Disabled interfaces
- Missing static routes
- ACL blocking legitimate traffic
- Incorrect NAT configuration

**Skills Demonstrated:**
- Systematic troubleshooting methodology
- Use of diagnostic commands
- Documentation of issues and solutions
- Root cause analysis
- Verification testing

**Deliverables:**
- Troubleshooting log (issues found and resolved)
- Before/after configurations
- Testing verification screenshots
- Lessons learned document

**Status:** ✅ Completed  
**Grade:** 98%  
**Files:** `project-3-troubleshooting-challenge/`

---

## Project 4: Enterprise Network Design (Final Project)

**Objective:** Design a complete enterprise network infrastructure from scratch.

**Scenario:**
Design network infrastructure for a mid-sized company with 200 employees across 2 floors.

**Requirements:**

**Network Segments:**
- Executive Suite (10 users)
- Human Resources (15 users)
- Finance Department (20 users)
- IT Department (10 users)
- Sales Department (40 users)
- Customer Service (50 users)
- Guest WiFi (isolated)
- Server Farm (5 servers)
- Voice over IP (VoIP) phones
- Management VLAN

**Technical Requirements:**
- Hierarchical network design (Core, Distribution, Access layers)
- Redundant connections for critical paths
- VLANs for department segmentation
- Quality of Service (QoS) for voice traffic
- DHCP for all user VLANs
- Static IPs for servers
- Internet connectivity with NAT
- Security policies:
  - HR and Finance isolated from other departments
  - Guest network completely isolated
  - IT department has access to all VLANs for management
  - Deny external access to server farm except specific services

**Advanced Features:**
- Spanning Tree Protocol configuration
- EtherChannel for increased bandwidth
- Port security on access switches
- SSH access to network devices (no Telnet)
- Syslog server for logging
- NTP for time synchronization

**Skills Demonstrated:**
- Enterprise network design principles
- Scalability and redundancy planning
- Security architecture
- QoS implementation
- Network documentation
- Presentation skills

**Deliverables:**
1. **Executive Summary** (2 pages)
   - Business requirements
   - Proposed solution overview
   - Cost estimate

2. **Network Design Document** (15-20 pages)
   - Detailed topology diagrams (physical and logical)
   - IP addressing scheme
   - VLAN design and naming
   - Routing protocol selection and justification
   - Security policy documentation
   - Equipment list and specifications

3. **Configuration Files**
   - All router configurations
   - All switch configurations
   - Commented and organized

4. **Testing Plan**
   - Connectivity tests
   - Security tests
   - Redundancy tests
   - Performance tests

5. **Presentation** (15 minutes)
   - Design overview
   - Key decisions and justifications
   - Live demo in Packet Tracer
   - Q&A

**Status:** ✅ Completed  
**Grade:** 96%  
**Files:** `project-4-enterprise-network/`

---

## Mini-Projects and Labs

### VLAN Design Exercise
Simple 3-VLAN network with inter-VLAN routing  
**Files:** `mini-projects/vlan-design/`

### Subnetting Scenarios
Multiple subnetting challenges with solutions  
**Files:** `mini-projects/subnetting-scenarios/`

### ACL Security Implementation
Various ACL configurations for different security requirements  
**Files:** `mini-projects/acl-security/`

### Routing Protocol Comparison
Lab comparing RIP, OSPF behavior side-by-side  
**Files:** `mini-projects/routing-comparison/`

---

## Project Development Process

### Planning Phase
1. Read and understand requirements
2. Research best practices
3. Create initial design sketches
4. Develop IP addressing plan
5. Create equipment list

### Design Phase
1. Draw detailed topology diagram
2. Plan VLAN structure
3. Design routing architecture
4. Plan security policies
5. Create configuration templates

### Implementation Phase
1. Build topology in Packet Tracer
2. Configure core layer first
3. Configure distribution layer
4. Configure access layer
5. Implement security features
6. Document configurations

### Testing Phase
1. Verify all connectivity
2. Test redundancy/failover
3. Verify security policies
4. Performance testing
5. Document test results

### Documentation Phase
1. Write design document
2. Create configuration backups
3. Develop troubleshooting guide
4. Prepare presentation materials

---

## Skills Developed Through Projects

### Technical Skills
- ✅ Network design and planning
- ✅ Cisco IOS configuration
- ✅ IP addressing and subnetting at scale
- ✅ VLAN design and implementation
- ✅ Routing protocol deployment
- ✅ Network security implementation
- ✅ Troubleshooting complex issues
- ✅ Performance optimization

### Professional Skills
- ✅ Technical documentation
- ✅ Project planning and time management
- ✅ Presentation and communication
- ✅ Problem-solving methodology
- ✅ Attention to detail
- ✅ Working under deadlines

### Design Principles Learned
- **Hierarchical Design:** Core, Distribution, Access layers
- **Modularity:** Design networks in manageable sections
- **Redundancy:** Eliminate single points of failure
- **Scalability:** Plan for future growth
- **Security:** Defense in depth, least privilege
- **Documentation:** Clear, comprehensive, maintainable

---

## Tools Used

- **Cisco Packet Tracer:** Network simulation and testing
- **Microsoft Visio:** Professional network diagrams
- **Draw.io:** Free diagramming tool
- **Excel:** IP address planning and documentation
- **Notepad++:** Configuration file editing
- **TFTP Server:** Configuration backups

---

## Lessons Learned

1. **Plan Before Implementing:** Time spent planning saves debugging time
2. **Document Everything:** Future you will thank present you
3. **Test Incrementally:** Build and test in stages, not all at once
4. **Security First:** Easier to build security in than add it later
5. **Standards Matter:** Consistent naming and addressing schemes are crucial
6. **Backup Configurations:** Always save working configs before changes
7. **Keep It Simple:** Simplest solution that meets requirements is best
8. **Consider the User:** Network design impacts user experience

---

## Future Enhancements

Projects I'd like to revisit with advanced knowledge:

- Add wireless controller and APs to enterprise network
- Implement more advanced routing (OSPF areas, BGP)
- Add VPN connectivity for remote access
- Integrate network automation with Python
- Implement centralized logging and monitoring
- Design disaster recovery solutions
- Add IPv6 dual-stack operation

---

*These projects represent the culmination of networking fundamentals knowledge, demonstrating the ability to design, implement, secure, and troubleshoot professional-grade networks.*
