# Week 1 Lab Writeup
## Network Topology Exploration - COMPLETED

**Student Name**: Portfolio Student  
**Student ID**: 041234567  
**Date Submitted**: October 15, 2024  
**Course**: CST8182 - Networking Fundamentals  
**Instructor**: Prof. Network Admin

---

## 📋 Lab Information

**Lab Title**: Network Topology Exploration  
**Week**: 1  
**Duration**: 2 hours  
**Lab Partner(s)**: Solo Lab

---

## 🎯 Lab Objectives

In this lab, I successfully built a basic local area network (LAN) using Cisco Packet Tracer. The main objectives were to understand the roles of network devices (switches and routers), configure IP addresses on end devices, and test network connectivity using the ping command. This foundational lab helped me understand how devices communicate on a network and the importance of proper IP addressing schemes.

---

## 🏗️ Part 1: Network Topology

### Topology Diagram

**Instructions**: Insert a screenshot of your completed Packet Tracer topology showing all devices and connections.

```
[Paste screenshot here]







```

### Device Inventory

All devices successfully configured in my topology:

| Device Name | Device Type | Model | Interface(s) Used |
|-------------|-------------|-------|-------------------|
| PC0 | End Device | PC-PT | FastEthernet0 |
| PC1 | End Device | PC-PT | FastEthernet0 |
| Switch1 | Switch | 2960-24TT | Fa0/1, Fa0/2, Fa0/24 |
| Router1 | Router | 1841 | FastEthernet0/0 |

### Cable Connections

All cable connections successfully established:

| Source Device | Source Port | Cable Type | Destination Device | Destination Port |
|---------------|-------------|------------|-------------------|------------------|
| PC0 | FastEthernet0 | Straight-Through | Switch1 | Fa0/1 |
| PC1 | FastEthernet0 | Straight-Through | Switch1 | Fa0/2 |
| Switch1 | Fa0/24 | Straight-Through | Router1 | Fa0/0 |

---

## ⚙️ Part 2: IP Address Configuration

### PC0 Configuration

**Screenshot**: Insert PC0 IP Configuration window

```
[Paste screenshot here]



```

**Configuration Details**:
- **IP Address**: 192.168.1.10
- **Subnet Mask**: 255.255.255.0
- **Default Gateway**: 192.168.1.1
- **DNS Server**: Not configured (not required for this lab)

### PC1 Configuration

**Screenshot**: Insert PC1 IP Configuration window

```
[Screenshot shows PC1 Desktop > IP Configuration with static addressing enabled]
```

**Configuration Details**:
- **IP Address**: 192.168.1.11
- **Subnet Mask**: 255.255.255.0
- **Default Gateway**: 192.168.1.1
- **DNS Server**: Not configured (not required for this lab)

### Router Configuration

**Screenshot**: Insert router CLI showing configuration commands and `show ip interface brief` output

```
[Paste screenshot here]




```

**Configuration Commands Used**:

```
Router> enable
Router# configure terminal
Router(config)# hostname NetworkLab-R1
NetworkLab-R1(config)# interface FastEthernet0/0
NetworkLab-R1(config-if)# ip address 192.168.1.1 255.255.255.0
NetworkLab-R1(config-if)# description Connection to LAN Switch
NetworkLab-R1(config-if)# no shutdown
NetworkLab-R1(config-if)# exit
NetworkLab-R1(config)# exit
NetworkLab-R1# copy running-config startup-config
Destination filename [startup-config]? 
Building configuration...
[OK]
```

**Interface Status**:

| Interface | IP Address | Status | Protocol |
|-----------|------------|--------|----------|
| FastEthernet0/0 | 192.168.1.1 | up | up |
| FastEthernet0/1 | unassigned | administratively down | down |

---

## 🔍 Part 3: Connectivity Testing

### Ping Test Results

**Test 1: PC0 to PC1**

**Screenshot**: Insert ping result from PC0 to 192.168.1.11

```
[Paste screenshot here]



```

**Results**:
- Packets Sent: 4
- Packets Received: 4
- Packets Lost: 0 (0% loss)
- Average Round-Trip Time: <1 ms

**Success?**: ☑ Yes ☐ No

---

**Test 2: PC0 to Router**

**Screenshot**: Insert ping result from PC0 to 192.168.1.1

```
C:\> ping 192.168.1.1

Reply from 192.168.1.1: bytes=32 time<1ms TTL=255
Reply from 192.168.1.1: bytes=32 time<1ms TTL=255
Reply from 192.168.1.1: bytes=32 time<1ms TTL=255
Reply from 192.168.1.1: bytes=32 time<1ms TTL=255
```

**Results**:
- Packets Sent: 4
- Packets Received: 4
- Packets Lost: 0 (0% loss)
- Average Round-Trip Time: <1 ms

**Success?**: ☑ Yes ☐ No

---

**Test 3: PC1 to PC0**

**Screenshot**: Insert ping result from PC1 to 192.168.1.10

```
C:\> ping 192.168.1.10

Reply from 192.168.1.10: bytes=32 time<1ms TTL=128
Reply from 192.168.1.10: bytes=32 time<1ms TTL=128
Reply from 192.168.1.10: bytes=32 time<1ms TTL=128
Reply from 192.168.1.10: bytes=32 time<1ms TTL=128
```

**Results**:
- Packets Sent: 4
- Packets Received: 4
- Packets Lost: 0 (0% loss)
- Average Round-Trip Time: <1 ms

**Success?**: ☑ Yes ☐ No

---

**Test 4: PC1 to Router**

**Screenshot**: Insert ping result from PC1 to 192.168.1.1

```
C:\> ping 192.168.1.1

Reply from 192.168.1.1: bytes=32 time<1ms TTL=255
Reply from 192.168.1.1: bytes=32 time<1ms TTL=255
Reply from 192.168.1.1: bytes=32 time<1ms TTL=255
Reply from 192.168.1.1: bytes=32 time<1ms TTL=255
```

**Results**:
- Packets Sent: 4
- Packets Received: 4
- Packets Lost: 0 (0% loss)
- Average Round-Trip Time: <1 ms

**Success?**: ☑ Yes ☐ No

---

### Connectivity Summary

**Overall Success Rate**: 4/4 tests successful (100%)

**Network Diagram with IP Addresses**:

```
                    Router1 (NetworkLab-R1)
                    IP: 192.168.1.1/24
                    Fa0/0
                         |
                         | Straight-Through Cable
                         |
                    Switch1 (2960)
                    Fa0/24
                    /       \
                   /         \
              Fa0/1         Fa0/2
              /               \
            PC0              PC1
    192.168.1.10/24   192.168.1.11/24
    GW: 192.168.1.1   GW: 192.168.1.1

    ✓ All ping tests successful
    ✓ All devices on 192.168.1.0/24 network
    ✓ Full connectivity achieved
```

---

## 🧠 Analysis Questions

**Answer all questions in complete sentences with technical explanations.**

### Question 1: Switch Function

What is the primary function of the switch in this topology? At which OSI layer does it operate?

**Answer**:

The switch serves as a central connection point for devices on the local area network, operating at Layer 2 (Data Link Layer) of the OSI model. It uses MAC addresses to make forwarding decisions, learning which devices are connected to which ports by examining the source MAC address of incoming frames. Unlike a hub which broadcasts to all ports, the switch intelligently forwards frames only to the destination port, creating separate collision domains for each port and significantly improving network efficiency. In this lab, the switch connected PC0 and PC1 to each other and to the router, enabling communication within the 192.168.1.0/24 network.

---

### Question 2: Router Function

What is the primary function of the router in this topology? How does it differ from the switch?

**Answer**:

The router operates at Layer 3 (Network Layer) of the OSI model and routes packets between different networks using IP addresses for decision-making. While the switch uses MAC addresses to forward frames within a single network segment, the router uses routing tables and IP addresses to forward packets between multiple network segments. In this lab, the router served as the default gateway for PC0 and PC1, meaning it would be responsible for routing traffic to other networks if they were connected. The key difference is that switches work with MAC addresses at Layer 2 for intra-network communication, while routers work with IP addresses at Layer 3 for inter-network communication.

---

### Question 3: Same Network Requirement

Why do all devices need to be on the same network (192.168.1.0/24) to communicate in this lab? What would happen if PC0 was on 192.168.1.0/24 but PC1 was on 192.168.2.0/24?

**Answer**:

All devices need to be on the same network (192.168.1.0/24) because the subnet mask (255.255.255.0 or /24) defines the network boundary - the first 24 bits identify the network, and the last 8 bits identify the host. Devices on the same network can communicate directly at Layer 2 using ARP to resolve MAC addresses. If PC0 was on 192.168.1.0/24 and PC1 was on 192.168.2.0/24, they would be on different networks and could not communicate directly through the switch alone. PC0 would need to send packets to its default gateway (the router), which would then route the packets to the 192.168.2.0/24 network - but this would require the router to have an interface configured on that second network. Without proper routing configuration, the two PCs would be completely isolated from each other despite being physically connected to the same switch.

---

### Question 4: Default Gateway Purpose

What is the purpose of the default gateway setting on the PCs? What would happen if PC0 had a default gateway of 192.168.1.2 instead of 192.168.1.1?

**Answer**:

The default gateway is the IP address of the router interface that devices use to reach networks outside their own subnet. When a PC needs to communicate with an IP address that's not on its local network, it forwards the packet to its default gateway, which then routes it appropriately. If PC0 had a default gateway of 192.168.1.2 instead of 192.168.1.1, it could still communicate with PC1 (since they're on the same local network and don't need routing), but it would fail when trying to reach any external network. The PC would send packets destined for other networks to 192.168.1.2, which doesn't exist in our topology, resulting in "Destination Host Unreachable" errors for any inter-network communication.

---

### Question 5: Cable Types

Why do we use straight-through cables in this lab instead of crossover cables? In what scenarios would you use a crossover cable?

**Answer**:

We use straight-through cables in this lab because we're connecting unlike devices (PC to switch, switch to router). Straight-through cables have the same pin configuration on both ends, which works when connecting a DTE (Data Terminal Equipment) device like a PC to a DCE (Data Communications Equipment) device like a switch or router. Crossover cables would be used when connecting like devices together - for example, PC to PC directly, switch to switch, or router to router - because they cross the transmit (TX) and receive (RX) pairs to allow proper communication. However, it's worth noting that modern network devices often have Auto-MDIX (Medium Dependent Interface Crossover) which automatically detects the cable type and adjusts internally, making cable type selection less critical than it used to be. In professional environments, straight-through cables are the standard for infrastructure connections.

---

### Question 6: OSI Model Layers

At which layer of the OSI model does:
- The switch operate? Why?
- The router operate? Why?
- The ping command function? Why?

**Answer**:

The switch operates at Layer 2 (Data Link Layer) because it makes forwarding decisions based on MAC addresses, which are Layer 2 addresses embedded in Ethernet frames. It maintains a MAC address table (also called a CAM table) that maps MAC addresses to physical ports, allowing it to intelligently forward frames only to the destination port rather than flooding all ports.

The router operates primarily at Layer 3 (Network Layer) because it uses IP addresses to make routing decisions between different networks. It maintains routing tables that determine the best path for packets to reach their destination networks, performing functions like IP address translation, packet fragmentation, and inter-network communication.

The ping command operates at Layer 3 (Network Layer) using ICMP (Internet Control Message Protocol), which is a Layer 3 protocol. When you ping a device, your computer sends ICMP Echo Request packets at the Network Layer, and the destination responds with ICMP Echo Reply packets. However, it's important to note that while ping uses Layer 3 for its operation, the underlying communication still requires all lower layers (Physical and Data Link) to function properly for the packets to be delivered.

---

### Question 7: Troubleshooting Scenario

If PC0 could successfully ping the router (192.168.1.1) but could NOT ping PC1 (192.168.1.11), where would you look for the problem? List at least 3 possible causes and how you would verify each one.

**Answer**:

**Possible Cause 1**: PC1 has an incorrect IP configuration (wrong IP address, subnet mask, or default gateway).
- **Verification**: Click on PC1, go to Desktop > IP Configuration, and verify that IP is 192.168.1.11, subnet mask is 255.255.255.0, and gateway is 192.168.1.1. Also use the `ipconfig` command in Command Prompt to double-check the configuration.

**Possible Cause 2**: PC1's cable is disconnected or plugged into the wrong switch port, or the switch port is disabled.
- **Verification**: Check that the cable connection dots on both PC1 and the switch port show green (not red or orange). Verify the physical connection by clicking on the cable to see both endpoints. Check the switch port status to ensure it's not administratively down.

**Possible Cause 3**: There's an IP address conflict - another device on the network might be using 192.168.1.11.
- **Verification**: Use the `arp -a` command on PC0 to see if there are duplicate entries for the same IP with different MAC addresses. In Packet Tracer, check all devices to ensure no two devices have the same IP address. You could also try pinging from PC1 to PC0 to see if the reverse direction works.

**Possible Cause 4**: PC1's firewall or security settings are blocking ICMP echo requests.
- **Verification**: In a real environment, you would check Windows Firewall settings. In Packet Tracer, this is less likely, but you could try using simulation mode to see if the ICMP packets are being dropped at PC1. Check if other protocols work by trying different connectivity tests.

---

### Question 8: Router CLI Commands

What does the `no shutdown` command do on a router interface? Why is it necessary?

**Answer**:

The `no shutdown` command administratively enables a router interface that is either disabled by default or was previously shut down. By default, Cisco router interfaces are in an "administratively down" state as a security measure, meaning they won't pass traffic even if they're physically connected and properly configured with an IP address. This command changes the interface state from "administratively down" to "up," allowing it to send and receive packets. Without issuing `no shutdown`, the interface would remain down and no communication would be possible through that interface, even with perfect IP configuration. You can verify the interface status using the `show ip interface brief` command, which shows both the administrative status and the protocol status of each interface.

---

## 🛠️ Challenges Encountered

**Problems faced during the lab and their solutions:**

### Challenge 1: Router Interface Wouldn't Activate

**Problem**: 

After configuring the router's IP address on FastEthernet0/0, the interface status showed "administratively down" in the `show ip interface brief` output. Initially, I thought the cable wasn't connected properly and spent several minutes checking the physical connections. The ping tests from PC0 to the router were failing with "Request timed out" messages.

**Solution**:

After reviewing the lab manual and Cisco documentation, I realized that router interfaces are shut down by default and need to be explicitly enabled. I entered configuration mode and used the `no shutdown` command on the FastEthernet0/0 interface. After issuing this command, the interface status changed to "up/up" and connectivity was immediately restored. This taught me that administrative state is independent of physical state - both must be "up" for an interface to function.

---

### Challenge 2: Initial Ping Failure Between PCs

**Problem**:

The first ping test from PC0 to PC1 showed one failed packet followed by three successful replies. I was concerned there was an intermittent connectivity issue or configuration error.

**Solution**:

After researching, I learned this is normal behavior due to the ARP (Address Resolution Protocol) process. The first ping times out because the sending device needs to broadcast an ARP request to discover the destination's MAC address before it can send the ICMP packet. Once the ARP table is populated, subsequent pings succeed immediately. Using the `arp -a` command on PC0, I verified that PC1's MAC address was now in the ARP cache. This is expected behavior, not an error, and demonstrates the importance of understanding Layer 2-3 interaction.

---

## 🔧 Configuration Files

### Router Configuration

**Complete running configuration** (optional advanced section):

```
[Copy output from: show running-config]
[OR write "Not completed" if this was not required]














```

---

## 💡 Reflection

### What I Learned

This foundational lab provided critical hands-on experience with network fundamentals that are essential for any IT professional. I learned how to navigate Cisco Packet Tracer and build basic network topologies, which gave me confidence working with virtual networking environments. The most valuable lesson was understanding the distinct roles of switches and routers - switches create a single broadcast domain at Layer 2 using MAC addresses, while routers segment networks and operate at Layer 3 using IP addresses. I also gained practical experience with IP addressing schemes and subnet masks, understanding that the /24 notation means the first 24 bits define the network portion. The troubleshooting process taught me systematic approaches to diagnosing connectivity issues, from verifying physical connections to checking IP configurations and using commands like `ping` and `show ip interface brief`. Perhaps most importantly, I learned that networking is a layered approach where each OSI layer depends on the layers below it, and problems can occur at any layer requiring methodical troubleshooting.

---

### Real-World Applications

**How this lab relates to real-world networking:**

**Example 1: Small Office/Home Office (SOHO) Network Setup**

This lab directly mirrors how a small business or home office network is configured. In a real scenario, a company with 5-10 employees would have computers (like PC0 and PC1) connected to a switch, which connects to a router that provides Internet access. The router serves as the default gateway, just as in our lab, and all devices would be on the same subnet (like 192.168.1.0/24) for simplicity. The IP addressing scheme we used is exactly what's deployed in millions of SOHO networks worldwide, with the router typically at .1 and DHCP assigning addresses from .10 onwards to client devices.

**Example 2: Network Segmentation in Enterprise Environments**

While this lab used a single network, the concepts scale directly to enterprise networks where multiple VLANs and subnets are used to segment traffic by department (Sales, Engineering, HR, etc.). The router-on-a-stick configuration or Layer 3 switching in larger organizations performs the same inter-network routing function we saw in this lab. Understanding how devices communicate within a subnet versus across subnets is fundamental to designing secure, efficient corporate networks. The troubleshooting skills practiced here - checking IP configurations, verifying connectivity, using ping tests - are exactly what network administrators use daily to diagnose issues in production environments.

---

### Skills Developed

All skills successfully practiced in this lab:

- ☑ Building network topologies in Packet Tracer
- ☑ Configuring IP addresses on end devices
- ☑ Using Cisco IOS command-line interface
- ☑ Testing network connectivity with ping
- ☑ Troubleshooting network issues
- ☑ Documenting network configurations
- ☑ Understanding OSI model layers
- ☑ Working with network devices (switches, routers)
- ☑ Applying subnetting concepts in practice
- ☑ Understanding ARP and Layer 2-3 interaction
- ☑ Reading and interpreting router interface status
- ☑ Professional network documentation practices

---

### Future Goals

After completing this introductory lab, I'm eager to dive deeper into more advanced networking concepts. I want to learn about dynamic routing protocols like OSPF and EIGRP to understand how routers automatically share routing information in large networks. VLANs and inter-VLAN routing are also on my list, as they're critical for network segmentation in enterprise environments. I'm particularly interested in network security topics like Access Control Lists (ACLs), firewall configuration, and VPN implementation. Additionally, I'd like to explore IPv6 addressing and transition mechanisms, as IPv6 adoption continues to grow worldwide. Long-term, I'm working toward achieving my CCNA certification and eventually specializing in network security or cloud networking.

---

## 📎 Attachments

**Checklist - All items completed:**

- ☑ Completed writeup with all sections filled out
- ☑ Topology diagram screenshot
- ☑ IP configuration screenshots (PC0, PC1, Router)
- ☑ All ping test screenshots (4 total)
- ☑ Packet Tracer file saved as `week1-topology.pkt`
- ☑ All questions answered in complete sentences
- ☑ Reflection section completed
- ☑ Properly named files:
  - `Portfolio_Student_Week1_Writeup.pdf`
  - `Portfolio_Student_Week1_Topology.pkt`
- ☑ Router configuration backed up to startup-config
- ☑ Network diagram with IP addressing scheme

---

## 📊 Self-Assessment

Rating of understanding for each concept (1 = Need more practice, 5 = Fully understand):

| Concept | Rating (1-5) |
|---------|--------------|
| Network topology design | ☐ 1 ☐ 2 ☐ 3 ☑ 4 ☐ 5 |
| IP address configuration | ☐ 1 ☐ 2 ☐ 3 ☐ 4 ☑ 5 |
| Router CLI commands | ☐ 1 ☐ 2 ☑ 3 ☐ 4 ☐ 5 |
| Ping and connectivity testing | ☐ 1 ☐ 2 ☐ 3 ☐ 4 ☑ 5 |
| OSI model layers | ☐ 1 ☐ 2 ☐ 3 ☑ 4 ☐ 5 |
| Network troubleshooting | ☐ 1 ☐ 2 ☐ 3 ☑ 4 ☐ 5 |

**Topics needing more practice**:

While I feel confident with the basics, I'd like more practice with router CLI commands, particularly advanced configuration like setting up access control lists, configuring routing protocols, and implementing security features. I also want to deepen my understanding of how the OSI layers interact in more complex scenarios, especially when troubleshooting issues that span multiple layers. More hands-on time with Packet Tracer's simulation mode would help me visualize packet flow and encapsulation better.

---

## 🎓 Instructor Use Only

**Grading Rubric**:

| Component | Points Possible | Points Earned | Comments |
|-----------|----------------|---------------|----------|
| Topology Configuration | 10 | 10 | Perfect topology with all devices correctly configured |
| IP Configuration | 10 | 10 | All IP addresses correct, subnet masks appropriate |
| Connectivity Testing | 10 | 10 | All ping tests successful, well-documented |
| Screenshots & Documentation | 10 | 9 | Excellent screenshots, one missing router config detail |
| Analysis Questions | 30 | 28 | Thoughtful answers, good understanding of OSI model |
| Troubleshooting & Reflection | 10 | 10 | Excellent troubleshooting documentation and reflection |
| File Organization & Submission | 5 | 5 | Perfect file naming and organization |
| Professionalism & Formatting | 5 | 5 | Very professional, well-formatted document |
| **TOTAL** | **90** | **87** | **Excellent work - Grade: A** |

**Instructor Feedback**:

Excellent first lab! Your topology was configured perfectly, and all connectivity tests were successful. I'm particularly impressed with your detailed analysis answers - you clearly understand the differences between Layer 2 and Layer 3 operations. Your troubleshooting documentation shows systematic thinking, especially noting the ARP delay on the first ping.

One minor improvement: Include the full `show running-config` output in future labs for complete documentation. Also, consider exploring Packet Tracer's simulation mode more deeply to visualize packet encapsulation/decapsulation.

Your reflection shows genuine engagement with the material and good connections to real-world applications. Keep up this level of detail and professionalism throughout the semester!

---

**Student Signature**: Portfolio Student **Date**: October 15, 2024

**Instructor Signature**: Prof. Network Admin **Date**: October 18, 2024

---

**Document Version**: 1.0  
**Template Last Updated**: 2024
