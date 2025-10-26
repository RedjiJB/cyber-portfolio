# Week 1 Lab: Network Topology Exploration

**Course**: CST8182 - Networking Fundamentals  
**Duration**: 2 hours  
**Difficulty**: Beginner

---

## 🎯 Learning Objectives

By the end of this lab, you will be able to:
- Identify basic network devices and their roles
- Build a simple LAN topology in Cisco Packet Tracer
- Configure IP addresses on end devices
- Test connectivity using ping
- Understand physical and logical network addressing

---

## 📋 Prerequisites

- Cisco Packet Tracer installed (version 8.0 or later)
- Basic understanding of IP addresses
- Familiarity with computer networking concepts

---

## 🛠️ Required Materials

**Hardware (Virtual)**:
- 2 PCs
- 1 Switch (Cisco 2960)
- 1 Router (Cisco 1841 or 2811)
- Copper straight-through cables

**Software**:
- Cisco Packet Tracer
- Screenshot tool (for documentation)

---

## 📝 Lab Scenario

You are a junior network technician at a small office. Your manager has asked you to set up a basic network connecting two computers through a switch to a router. This will be the foundation for expanding the office network later.

**Network Requirements**:
- Network: 192.168.1.0/24
- Router IP: 192.168.1.1
- PC0 IP: 192.168.1.10
- PC1 IP: 192.168.1.11

---

## 🔧 Lab Tasks

### Task 1: Create the Network Topology

1. **Launch Packet Tracer**
   - Open Cisco Packet Tracer
   - Create a new project: `File > New`

2. **Add Devices**
   - From the device panel at the bottom:
     - Click "End Devices" → Select "PC" → Drag 2 PCs onto workspace
     - Click "Switches" → Select "2960" → Drag 1 switch onto workspace
     - Click "Routers" → Select "1841" → Drag 1 router onto workspace

3. **Arrange Devices**
   - Position PC0 on the left
   - Position Switch in the middle
   - Position PC1 on the right
   - Position Router above the switch

4. **Connect Devices with Cables**
   - Click the lightning bolt icon (Connections)
   - Select "Copper Straight-Through"
   - Connect PC0 FastEthernet0 to Switch FastEthernet0/1
   - Connect PC1 FastEthernet0 to Switch FastEthernet0/2
   - Connect Switch FastEthernet0/24 to Router FastEthernet0/0

5. **Verify Physical Connections**
   - All connection dots should turn green (may take a few seconds)
   - If red or orange, check cable type and ports

---

### Task 2: Configure IP Addresses

**Configure PC0**:
1. Click on PC0
2. Select "Desktop" tab
3. Click "IP Configuration"
4. Enter the following:
   - **IP Address**: `192.168.1.10`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `192.168.1.1`

**Configure PC1**:
1. Click on PC1
2. Repeat the IP configuration process:
   - **IP Address**: `192.168.1.11`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `192.168.1.1`

**Configure Router Interface**:
1. Click on Router
2. Select "CLI" tab
3. Press Enter to start
4. Enter the following commands:

```
Router> enable
Router# configure terminal
Router(config)# interface FastEthernet0/0
Router(config-if)# ip address 192.168.1.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# exit
Router(config)# exit
Router#
```

5. Verify configuration:
```
Router# show ip interface brief
```

You should see FastEthernet0/0 with IP 192.168.1.1 and status "up/up"

---

### Task 3: Test Connectivity

**From PC0**:
1. Click on PC0
2. Select "Desktop" tab
3. Click "Command Prompt"
4. Test connectivity to PC1:
   ```
   ping 192.168.1.11
   ```
   - Expected result: 4 successful replies

5. Test connectivity to Router:
   ```
   ping 192.168.1.1
   ```
   - Expected result: 4 successful replies

**From PC1**:
1. Click on PC1
2. Open Command Prompt
3. Test connectivity to PC0:
   ```
   ping 192.168.1.10
   ```

4. Test connectivity to Router:
   ```
   ping 192.168.1.1
   ```

**Troubleshooting**: If pings fail:
- Verify IP addresses are configured correctly
- Check that cables are connected to correct ports
- Ensure router interface is "up" using `show ip interface brief`
- Wait 30 seconds for ARP tables to populate

---

### Task 4: Documentation

1. **Take Screenshots**:
   - Full topology view
   - PC0 IP configuration screen
   - PC1 IP configuration screen
   - Router `show ip interface brief` output
   - Successful ping from PC0 to PC1
   - Successful ping from PC0 to Router

2. **Export Topology**:
   - `File > Save As` → Save as `week1-topology.pkt`

---

## 📊 Deliverables

Submit the following to your instructor:

1. **Packet Tracer File**: `week1-topology.pkt`
2. **Lab Writeup** (use provided template):
   - All required screenshots
   - Answers to analysis questions
   - Reflection on learning

---

## 🧠 Analysis Questions

Answer these questions in your writeup:

1. **Device Roles**:
   - What is the primary function of the switch in this topology?
   - What is the primary function of the router?

2. **Addressing**:
   - Why do all devices need to be on the same network (192.168.1.0/24) to communicate?
   - What would happen if PC0 had a default gateway of 192.168.1.2 instead of 192.168.1.1?

3. **Cable Types**:
   - Why do we use straight-through cables instead of crossover cables in this lab?
   - When would you use a crossover cable?

4. **OSI Model**:
   - At which layer of the OSI model does the switch operate?
   - At which layer does the router operate?

5. **Troubleshooting**:
   - If PC0 could ping the router but not PC1, where would you look for the problem?
   - What command on the router shows the status of interfaces?

---

## 🌟 Extension Challenges (Optional)

For advanced students:

1. **Add a Third PC**:
   - Add PC2 with IP 192.168.1.12
   - Test connectivity to all devices

2. **Second Network**:
   - Add another router interface (FastEthernet0/1)
   - Create a second network: 192.168.2.0/24
   - Add PC3 on the new network
   - Configure routing to allow PC0 to ping PC3

3. **DHCP Exploration**:
   - Configure the router as a DHCP server
   - Change PC0 to obtain IP automatically
   - Verify it receives the correct IP from DHCP pool

---

## 📚 Key Concepts Review

- **LAN**: Local Area Network connecting devices in a small geographic area
- **Switch**: Layer 2 device that forwards frames based on MAC addresses
- **Router**: Layer 3 device that routes packets between different networks
- **IP Address**: Logical address assigned to devices (Layer 3)
- **Subnet Mask**: Defines the network and host portions of an IP address
- **Default Gateway**: Router IP that devices use to reach other networks
- **Ping**: ICMP echo request/reply used to test connectivity

---

## 🔗 Additional Resources

- [Cisco Packet Tracer Tutorials](https://www.netacad.com/courses/packet-tracer)
- [Subnetting Practice](https://subnettingpractice.com/)
- [TCP/IP Fundamentals](https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13769-5.html)

---

**Next Lab**: Week 2 - OSI vs TCP/IP Model with Wireshark Analysis
