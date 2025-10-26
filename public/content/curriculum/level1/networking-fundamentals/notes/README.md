# Networking Fundamentals - Notes

Comprehensive course notes covering all major networking topics from CST8182.

## How to Use These Notes

These notes are organized by week/topic and include:
- Key concepts and definitions
- Diagrams and visual aids
- Command references
- Exam preparation tips
- Real-world applications

## Weekly Topics

### Week 1: Networking Overview
- **Networking** = interconnection of devices for communication and data sharing
- **Devices:** routers (Layer 3), switches (Layer 2), hubs (Layer 1)
- **Media:** copper (Ethernet), fiber, wireless (Wi-Fi)
- **Protocol models:** OSI (7 layers) and TCP/IP (4 layers)

### Week 2: OSI and TCP/IP Models
**OSI Layers:**
- Physical, Data Link, Network, Transport, Session, Presentation, Application

**TCP/IP Layers:**
- Network Access, Internet, Transport, Application

**Encapsulation order:** App → Transport → Network → Data Link → Physical

### Week 3: Addressing
- **IPv4 format:** 32-bit binary, written as 4 octets (e.g., 192.168.1.1)
- **Subnet mask:** defines network and host portion
- **IPv6:** 128-bit hexadecimal, uses colons (:: for compression)

### Week 4: Switching & MAC Addresses
- Switches forward based on MAC tables
- Broadcast domains and collision domains differ per device type
- MAC address learning process

### Week 5: Routing
- Routers use IP addresses to forward packets between networks
- **Commands:**
  - `show ip route` → routing table
  - `ip route 0.0.0.0 0.0.0.0 <next-hop>` → default route

### Weeks 6–10: Protocols
- **ARP** – maps IP to MAC (Layer 2)
- **ICMP** – diagnostics (ping/traceroute)
- **DHCP** – automatic IP assignment
- **DNS** – domain name resolution

### Weeks 11–14: Security & Troubleshooting
- **Basic ACLs:** restrict traffic via IP/port
- **Security best practices:** disable unused ports, strong passwords, monitor logs
- **Troubleshooting flow:** Physical → Data Link → Network → Transport → Application

## Study Tips

1. **Understand, Don't Memorize**: Focus on understanding how protocols work rather than memorizing details
2. **Practice Subnetting**: Do subnetting calculations regularly until they become second nature
3. **Use Packet Tracer**: Build topologies and practice configurations hands-on
4. **Draw Diagrams**: Visualize network concepts through drawings
5. **Teach Others**: Explaining concepts to others reinforces your understanding

## Command Quick Reference

### Common Cisco IOS Commands

```
enable                      # Enter privileged mode
configure terminal          # Enter global configuration mode
show running-config         # Display current configuration
show ip interface brief     # Show interface status
show ip route              # Display routing table
show vlan brief            # Show VLAN information
show mac address-table     # Display MAC address table
ping [ip-address]          # Test connectivity
traceroute [ip-address]    # Trace packet path
```

## Exam Preparation

- Focus on subnetting speed and accuracy
- Know OSI and TCP/IP models thoroughly
- Understand routing vs switching
- Practice ACL configuration
- Master VLAN concepts
- Know common port numbers
- Understand troubleshooting methodologies

---

*These notes are compiled from lectures, textbooks, and hands-on lab experiences to provide a comprehensive study resource.*
