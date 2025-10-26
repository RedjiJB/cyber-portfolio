# Week 1 Lab Manual: Step-by-Step Instructions

**Instructor Guide for CST8182 - Week 1 Lab**

---

## 🎓 Instructor Notes

**Lab Duration**: 2 hours  
**Difficulty**: Beginner  
**Prerequisites**: None (introductory lab)

### Learning Outcomes

This lab introduces students to:
- Cisco Packet Tracer interface and navigation
- Basic network device identification
- IP address configuration
- Connectivity testing with ping
- Network documentation practices

### Common Student Challenges

1. **Packet Tracer Navigation**: First-time users may struggle with device selection
   - **Solution**: Demonstrate live in first 15 minutes

2. **Router CLI**: Students unfamiliar with command-line interfaces
   - **Solution**: Provide cheat sheet with common commands

3. **IP Configuration**: Confusion about subnet masks and gateways
   - **Solution**: Review binary/decimal conversion before lab

---

## 📋 Pre-Lab Setup

### Software Requirements

**For Students**:
- Cisco Packet Tracer 8.0+ installed
- Verify installation by opening application
- Create "CST8182-Labs" folder for organization

**For Instructor**:
- Prepare sample topology file as reference
- Test all connectivity scenarios
- Prepare troubleshooting FAQ sheet

### Materials Distribution

Provide students with:
- [ ] Lab assignment document (lab.md)
- [ ] Writeup template (writeup.md)
- [ ] IP addressing reference sheet
- [ ] Router command reference card
- [ ] Grading rubric

---

## 🔧 Lab Walkthrough

### Part 1: Building the Topology (25 minutes)

**Instructor Demonstration** (10 minutes):

1. **Launch Packet Tracer**
   - Show main interface components
   - Explain device categories at bottom
   - Demonstrate drag-and-drop

2. **Add Devices**
   - Click "End Devices" → Select PC
   - Drag to workspace (show grid snap)
   - Repeat for second PC
   - Switch to "Switches" → Select 2960
   - Switch to "Routers" → Select 1841

3. **Connection Types**
   - Explain straight-through vs crossover vs fiber
   - Demonstrate cable selection
   - Show connection process:
     - Click "Connections" (lightning bolt)
     - Select "Copper Straight-Through"
     - Click source device → select port
     - Click destination device → select port

4. **Visual Cues**
   - Green dots = connection established
   - Orange dots = connection establishing
   - Red dots = physical problem

**Student Practice** (15 minutes):
- Students replicate topology independently
- Circulate and assist with connection issues
- Verify all topologies before proceeding

**Checkpoint 1**: All students should have 4 devices connected with green indicators

---

### Part 2: IP Address Configuration (30 minutes)

**Instructor Demonstration** (10 minutes):

1. **PC Configuration GUI Method**:
   ```
   Click PC0
   → Desktop tab
   → IP Configuration
   → Select "Static"
   → Enter:
      IP Address: 192.168.1.10
      Subnet Mask: 255.255.255.0
      Default Gateway: 192.168.1.1
   ```

2. **Router Configuration CLI Method**:
   ```
   Click Router
   → CLI tab
   → Press Enter at prompt
   ```

   Show the command sequence:
   ```
   Router> enable                           (Enter privileged mode)
   Router# configure terminal               (Enter configuration mode)
   Router(config)# interface FastEthernet0/0
   Router(config-if)# ip address 192.168.1.1 255.255.255.0
   Router(config-if)# no shutdown          (Activate interface)
   Router(config-if)# exit
   Router(config)# exit
   Router#
   ```

3. **Verification**:
   ```
   Router# show ip interface brief
   ```
   Explain output columns:
   - Interface name
   - IP address
   - Status (up/down)
   - Protocol (up/down)

**Student Practice** (20 minutes):
- Configure PC0, PC1, and Router
- Document each configuration step
- Take screenshots for writeup

**Common Errors**:

| Error | Symptom | Fix |
|-------|---------|-----|
| Wrong subnet mask | Can't communicate | Verify all devices use 255.255.255.0 |
| Interface shutdown | Status shows "down" | Use `no shutdown` command |
| Wrong gateway | Can reach router but not Internet | Check gateway matches router IP |

**Checkpoint 2**: Verify with `show ip interface brief` - Interface shows "up/up"

---

### Part 3: Connectivity Testing (25 minutes)

**Instructor Demonstration** (10 minutes):

1. **Basic Ping Test**:
   ```
   Click PC0
   → Desktop tab
   → Command Prompt
   → Type: ping 192.168.1.11
   ```

   Explain ping output:
   ```
   Pinging 192.168.1.11 with 32 bytes of data:

   Reply from 192.168.1.11: bytes=32 time<1ms TTL=128
   Reply from 192.168.1.11: bytes=32 time<1ms TTL=128
   Reply from 192.168.1.11: bytes=32 time<1ms TTL=128
   Reply from 192.168.1.11: bytes=32 time<1ms TTL=128

   Ping statistics for 192.168.1.11:
       Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
   ```

   **Important Fields**:
   - **Reply from**: Destination is reachable
   - **time<1ms**: Round-trip time (latency)
   - **TTL=128**: Time To Live (hops remaining)
   - **Lost = 0**: No packet loss (good!)

2. **Simulation Mode** (Advanced):
   - Click "Simulation" button (bottom right)
   - Click "Auto Capture/Play"
   - Show ICMP packet traversal
   - Explain encapsulation at each layer

**Student Practice** (15 minutes):

Test Matrix:
| Source | Destination | Expected Result |
|--------|-------------|-----------------|
| PC0 | 192.168.1.11 (PC1) | Success |
| PC0 | 192.168.1.1 (Router) | Success |
| PC1 | 192.168.1.10 (PC0) | Success |
| PC1 | 192.168.1.1 (Router) | Success |

**Troubleshooting Guide**:

**Problem**: Request timed out
- Check IP addresses match the plan
- Verify subnet masks are identical
- Confirm cables are connected
- Wait 30 seconds and try again (ARP learning)

**Problem**: Destination host unreachable
- Check default gateway configuration
- Verify router interface is up: `show ip interface brief`
- Ensure router interface has IP address

**Checkpoint 3**: All 4 ping tests successful

---

### Part 4: Documentation (20 minutes)

**Required Screenshots**:

1. **Topology Overview**:
   - Zoom to fit all devices
   - `File > Export > PNG`
   - Save as "topology-overview.png"

2. **IP Configuration Screens**:
   - PC0 IP configuration window
   - PC1 IP configuration window
   - Router CLI with `show ip interface brief` output

3. **Ping Results**:
   - PC0 ping to PC1 (successful)
   - PC0 ping to Router (successful)

4. **Packet Tracer File**:
   - `File > Save As`
   - Name: "week1-topology.pkt"
   - Save to "CST8182-Labs/Week1/" folder

**Instructor Tip**: Create a sample writeup for reference

---

## 📊 Grading Rubric

### Topology Configuration (25 points)

| Criteria | Excellent (5) | Good (4) | Satisfactory (3) | Needs Work (2) | Incomplete (0-1) |
|----------|---------------|----------|------------------|----------------|------------------|
| Device Placement | All devices correctly placed and connected | Minor issues | Some errors | Major topology errors | Missing devices |
| IP Addressing | All IPs correct and documented | 1-2 minor errors | Several errors | Wrong subnet | Missing IPs |
| Router Config | Perfect CLI configuration | Minor typos | Some commands wrong | Major config errors | Not configured |
| Connectivity | All pings successful | 1 failed ping | 2 failed pings | Most pings fail | No connectivity |
| Documentation | Complete, professional screenshots | Good screenshots | Basic screenshots | Poor quality | Missing |

**Total**: 25 points

### Written Analysis (15 points)

- **Question Responses** (10 points): Thorough, accurate answers
- **Reflection** (5 points): Insightful learning analysis

### Professionalism (10 points)

- **File Organization**: Properly named files
- **Timeliness**: Submitted on time
- **Formatting**: Clean, readable writeup

**Total Lab Grade**: 50 points

---

## 🧠 Assessment Questions - Answer Key

**Question 1**: What is the primary function of the switch?

**Answer**: The switch operates at Layer 2 (Data Link) and forwards frames based on MAC addresses. It creates a single collision domain per port and connects devices within the same local network.

**Question 2**: Why do all devices need to be on the same network?

**Answer**: Devices on 192.168.1.0/24 can communicate directly because they share the same network prefix. The subnet mask (255.255.255.0) defines that the first 3 octets are the network portion, so all devices with 192.168.1.x are on the same LAN and can exchange frames at Layer 2.

**Question 3**: Why use straight-through cables?

**Answer**: Straight-through cables connect unlike devices (PC to switch, switch to router). Modern switches have auto-MDIX which automatically detects and corrects cable types, but best practice is straight-through for PC-to-switch and switch-to-router connections.

**Question 4**: OSI Model layers for switch and router?

**Answer**: 
- Switch: Layer 2 (Data Link) - uses MAC addresses
- Router: Layer 3 (Network) - uses IP addresses and routes between networks

**Question 5**: Troubleshooting scenario?

**Answer**: If PC0 can ping the router but not PC1:
1. Check PC1's IP configuration (wrong IP or subnet mask)
2. Verify PC1's cable connection to switch
3. Check switch port is enabled
4. Ping PC1's default gateway from PC1 to verify router connectivity
5. Check for IP conflicts

---

## 🔧 Troubleshooting Common Issues

### Issue 1: "Connection Dots Stay Orange"

**Cause**: Interfaces are administratively down

**Solution**:
```
Router(config)# interface FastEthernet0/0
Router(config-if)# no shutdown
```

Wait 30 seconds for link to establish.

---

### Issue 2: "Ping Shows Request Timed Out"

**Possible Causes**:

1. **IP Address Mismatch**:
   - Verify: `ipconfig` on PC (in Command Prompt)
   - Fix: Correct IP in Desktop > IP Configuration

2. **Wrong Subnet Mask**:
   - All devices must have 255.255.255.0
   - Fix: Update subnet mask to match

3. **Missing Default Gateway**:
   - PCs need 192.168.1.1 as gateway
   - Fix: Set gateway in IP Configuration

4. **ARP Cache Not Populated**:
   - First ping may fail while learning MAC addresses
   - Fix: Wait 30 seconds and ping again

---

### Issue 3: "Router Interface Shows 'down/down'"

**Diagnostic**:
```
Router# show ip interface brief
```

Look for:
- Status: administratively down → Use `no shutdown`
- Protocol: down → Check cable connection

**Solution**:
```
Router# configure terminal
Router(config)# interface FastEthernet0/0
Router(config-if)# no shutdown
Router(config-if)# end
Router# show ip interface brief
```

Should now show "up/up"

---

## 📚 Additional Resources for Students

### Cisco Packet Tracer Basics
- [Official Packet Tracer Guide](https://www.netacad.com/courses/packet-tracer)
- [YouTube: Packet Tracer Tutorial Series](https://www.youtube.com/results?search_query=cisco+packet+tracer+tutorial)

### IP Addressing
- [Subnet Calculator](https://www.subnet-calculator.com/)
- [IPv4 Subnetting Practice](https://subnettingpractice.com/)

### Router CLI Commands
- [Cisco IOS Command Reference](https://www.cisco.com/c/en/us/support/ios-nx-os-software/ios-15-4m-t/products-command-reference-list.html)

---

## 📝 Post-Lab Discussion Topics

**Week 2 Preview**:
- Next lab will analyze packets with Wireshark
- We'll examine OSI and TCP/IP model layers
- Students should review Layer 1-4 concepts

**Real-World Applications**:
- How is this lab similar to setting up a home network?
- What additional devices would a business network need?
- How do ISPs connect customer networks to the Internet?

---

**Lab Manual Version**: 1.0  
**Last Updated**: 2024  
**Instructor**: [Your Name]
