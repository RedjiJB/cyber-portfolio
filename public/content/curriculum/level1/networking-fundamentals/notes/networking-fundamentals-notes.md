# Networking Fundamentals - Lab Notes

## Module Overview
Comprehensive notes covering fundamental networking concepts and protocols.

---

## Chapter 1: Introduction to Computer Networks

### What is a Computer Network?
A computer network is a collection of interconnected devices that can communicate and share resources.

**Key Components:**
- **Nodes**: Devices connected to the network (computers, servers, printers)
- **Links**: Physical or wireless connections between nodes
- **Protocols**: Rules governing communication

### Network Types

#### 1. LAN (Local Area Network)
- **Scope**: Small geographic area (building, campus)
- **Speed**: High (100 Mbps - 10 Gbps)
- **Ownership**: Private
- **Example**: Office network, home network

#### 2. WAN (Wide Area Network)
- **Scope**: Large geographic area (cities, countries)
- **Speed**: Varies (slower than LAN)
- **Ownership**: Often leased from ISPs
- **Example**: Internet, corporate networks

#### 3. MAN (Metropolitan Area Network)
- **Scope**: City or metropolitan area
- **Speed**: Between LAN and WAN
- **Example**: City-wide Wi-Fi

---

## Chapter 2: OSI Model

The OSI (Open Systems Interconnection) model is a conceptual framework with 7 layers:

### Layer 7: Application Layer
- **Purpose**: User interface, network services
- **Protocols**: HTTP, HTTPS, FTP, SMTP, DNS
- **Examples**: Web browsers, email clients

### Layer 6: Presentation Layer
- **Purpose**: Data translation, encryption, compression
- **Functions**: Format conversion, encryption/decryption
- **Examples**: SSL/TLS, JPEG, MPEG

### Layer 5: Session Layer
- **Purpose**: Session management
- **Functions**: Establishes, maintains, terminates sessions
- **Examples**: NetBIOS, RPC

### Layer 4: Transport Layer
- **Purpose**: End-to-end communication, reliability
- **Protocols**: TCP, UDP
- **Functions**: Segmentation, flow control, error checking

**TCP vs UDP:**
| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Reliable | Unreliable |
| Speed | Slower | Faster |
| Use Case | Web, Email | Streaming, Gaming |

### Layer 3: Network Layer
- **Purpose**: Routing, logical addressing
- **Protocol**: IP (IPv4, IPv6)
- **Device**: Router
- **Functions**: Path determination, IP addressing

### Layer 2: Data Link Layer
- **Purpose**: Physical addressing, frame formatting
- **Protocol**: Ethernet, Wi-Fi (802.11)
- **Device**: Switch
- **Address**: MAC address

### Layer 1: Physical Layer
- **Purpose**: Physical transmission of raw bits
- **Components**: Cables, hubs, repeaters
- **Characteristics**: Voltage, frequencies, physical connectors

---

## Chapter 3: TCP/IP Model

Simplified 4-layer model used in practice:

1. **Application Layer** (OSI 5-7)
2. **Transport Layer** (OSI 4)
3. **Internet Layer** (OSI 3)
4. **Network Access Layer** (OSI 1-2)

---

## Chapter 4: IP Addressing

### IPv4 Address Structure
- **Format**: Four octets (e.g., 192.168.1.1)
- **Size**: 32 bits
- **Total Addresses**: ~4.3 billion

### Address Classes

| Class | Range | Default Mask | Use |
|-------|-------|--------------|-----|
| A | 1.0.0.0 - 126.255.255.255 | 255.0.0.0 (/8) | Large networks |
| B | 128.0.0.0 - 191.255.255.255 | 255.255.0.0 (/16) | Medium networks |
| C | 192.0.0.0 - 223.255.255.255 | 255.255.255.0 (/24) | Small networks |

### Private IP Ranges (RFC 1918)
- **Class A**: 10.0.0.0 - 10.255.255.255
- **Class B**: 172.16.0.0 - 172.31.255.255
- **Class C**: 192.168.0.0 - 192.168.255.255

### Subnetting
Process of dividing a network into smaller sub-networks.

**Example:**
```
Network: 192.168.1.0/24
Subnet Mask: 255.255.255.0
Usable Hosts: 254
Broadcast: 192.168.1.255
```

---

## Chapter 5: Common Protocols

### HTTP/HTTPS (Application Layer)
- **Port**: 80 (HTTP), 443 (HTTPS)
- **Purpose**: Web communication
- **Methods**: GET, POST, PUT, DELETE

### DNS (Application Layer)
- **Port**: 53
- **Purpose**: Domain name resolution
- **Process**: Translates domain names to IP addresses

### DHCP (Application Layer)
- **Port**: 67 (server), 68 (client)
- **Purpose**: Automatic IP address assignment
- **Process**: DORA (Discover, Offer, Request, Acknowledge)

### TCP (Transport Layer)
- **Features**: Reliable, ordered, error-checked
- **Connection**: 3-way handshake (SYN, SYN-ACK, ACK)
- **Use Cases**: Web, email, file transfer

### UDP (Transport Layer)
- **Features**: Fast, connectionless, no error checking
- **Use Cases**: Video streaming, VoIP, DNS

---

## Chapter 6: Network Devices

### Hub (Layer 1)
- Broadcasts to all ports
- No intelligence
- Creates collision domains

### Switch (Layer 2)
- Learns MAC addresses
- Forwards to specific port
- Separates collision domains

### Router (Layer 3)
- Routes between networks
- Uses IP addresses
- Separates broadcast domains

### Firewall (Layers 3-7)
- Security device
- Filters traffic
- Enforces security policies

---

## Key Commands

### Windows
```bash
ipconfig              # View IP configuration
ipconfig /all         # Detailed information
ipconfig /release     # Release DHCP lease
ipconfig /renew       # Renew DHCP lease
ping 8.8.8.8         # Test connectivity
tracert google.com   # Trace route
nslookup google.com  # DNS lookup
netstat -an          # View connections
```

### Linux
```bash
ifconfig             # View interfaces
ip addr show         # Modern alternative
ping 8.8.8.8        # Test connectivity
traceroute google.com # Trace route
dig google.com       # DNS lookup
netstat -tulpn       # View listening ports
ss -tulpn           # Modern alternative
```

---

## Study Tips

✅ Draw diagrams of the OSI model  
✅ Practice subnetting calculations  
✅ Set up a home lab with virtual machines  
✅ Use Wireshark to analyze packets  
✅ Create flashcards for protocols and ports  
✅ Take online quizzes regularly  

---

## Additional Resources

- **Books**: "Computer Networking: A Top-Down Approach"
- **Online**: Cisco Networking Academy
- **Tools**: Packet Tracer, GNS3, Wireshark
- **Videos**: Professor Messer Network+ series

---

**Last Updated:** October 2025  
**Version:** 1.0  
**Maintained by:** Curriculum Team
