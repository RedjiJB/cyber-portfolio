# Windows Desktop Support - Labs

This directory contains hands-on lab exercises and practical Windows administration tasks from CST8202.

## Lab Structure

Each lab includes:
- **Objectives**: What skills and concepts the lab covers
- **Environment**: Windows version and tools required
- **Configuration**: Step-by-step setup and tasks
- **Verification**: How to confirm successful completion
- **Troubleshooting**: Common issues and solutions
- **Deliverables**: Screenshots, documentation, and reports

## Labs Overview

### Lab 1: Windows Installation & Setup
**Objectives:**
- Perform clean Windows 10/11 installation
- Configure initial system settings
- Understand Windows boot process

**Tasks:**
- Create bootable Windows installation media
- Partition hard drive and install Windows
- Configure user accounts and privacy settings
- Install device drivers and Windows updates

**Deliverables:**
- Installation screenshots
- System information report
- Driver verification documentation

---

### Lab 2: User Account Management
**Objectives:**
- Create and manage local user accounts
- Implement user groups and permissions
- Configure User Account Control (UAC)

**Tasks:**
- Create standard and administrator accounts
- Add users to built-in groups (Administrators, Users, Power Users)
- Configure password policies
- Test UAC behavior with different account types

**Deliverables:**
- User and group management screenshots
- Password policy configuration
- UAC test results

---

### Lab 3: File System & Permissions
**Objectives:**
- Understand NTFS file system structure
- Configure file and folder permissions
- Implement inheritance and special permissions

**Tasks:**
- Create folder structure with different permission levels
- Configure NTFS permissions (Read, Write, Modify, Full Control)
- Test permission inheritance
- Troubleshoot access denied scenarios

**Deliverables:**
- Permission configuration screenshots
- Access test results matrix
- Troubleshooting documentation

---

### Lab 4: Disk Management & Storage
**Objectives:**
- Manage disk partitions and volumes
- Configure basic and dynamic disks
- Implement storage spaces

**Tasks:**
- Initialize and partition new disk
- Create simple, spanned, and striped volumes
- Convert basic disk to dynamic disk
- Configure Storage Spaces for redundancy

**Deliverables:**
- Disk Management screenshots
- Volume configuration documentation
- Storage capacity analysis

---

### Lab 5: Windows Registry & Group Policy
**Objectives:**
- Navigate and modify Windows Registry
- Configure Local Group Policy settings
- Implement security policies

**Tasks:**
- Use regedit to modify registry keys
- Create registry backup and restore
- Configure Local Group Policy (password policy, account lockout)
- Apply software restriction policies

**Deliverables:**
- Registry modification screenshots
- Group Policy settings report
- Policy test results

---

### Lab 6: Network Configuration & Sharing
**Objectives:**
- Configure TCP/IP network settings
- Set up file and printer sharing
- Join domain and workgroup

**Tasks:**
- Configure static and DHCP IP addressing
- Set up network file shares with permissions
- Configure printer sharing
- Join computer to workgroup/domain

**Deliverables:**
- Network configuration screenshots
- Sharing permissions documentation
- Connectivity test results

---

### Lab 7: Windows Update & Patch Management
**Objectives:**
- Configure Windows Update settings
- Manage update installation and rollback
- Use WSUS for enterprise updates

**Tasks:**
- Configure Windows Update policies
- Install, pause, and uninstall updates
- Roll back problematic updates
- Review update history and logs

**Deliverables:**
- Update configuration screenshots
- Update history report
- Rollback procedure documentation

---

### Lab 8: Device Drivers & Hardware
**Objectives:**
- Install and update device drivers
- Troubleshoot hardware conflicts
- Use Device Manager effectively

**Tasks:**
- Install drivers from manufacturer websites
- Update drivers through Device Manager
- Roll back faulty drivers
- Disable and uninstall devices
- Troubleshoot device conflicts

**Deliverables:**
- Device Manager screenshots
- Driver version documentation
- Troubleshooting log

---

### Lab 9: Performance Monitoring & Optimization
**Objectives:**
- Monitor system performance metrics
- Optimize Windows for better performance
- Use Performance Monitor and Resource Monitor

**Tasks:**
- Monitor CPU, memory, disk, and network usage
- Create custom Performance Monitor data collector sets
- Analyze performance bottlenecks
- Optimize startup programs and services

**Deliverables:**
- Performance baseline report
- Bottleneck analysis
- Optimization recommendations

---

### Lab 10: Backup & Recovery
**Objectives:**
- Implement Windows backup solutions
- Create and use system restore points
- Perform system recovery

**Tasks:**
- Configure Windows Backup and Restore
- Create system image backup
- Set up File History
- Create and test system restore points
- Perform recovery from backup

**Deliverables:**
- Backup configuration screenshots
- Recovery procedure documentation
- Test restore results

---

### Lab 11: Windows Security Features
**Objectives:**
- Configure Windows Defender and Firewall
- Implement BitLocker encryption
- Use security policies

**Tasks:**
- Configure Windows Defender settings and scans
- Set up Windows Firewall rules
- Enable BitLocker drive encryption
- Configure local security policies
- Implement AppLocker rules

**Deliverables:**
- Security configuration screenshots
- Firewall rule documentation
- BitLocker recovery key backup

---

### Lab 12: PowerShell Basics
**Objectives:**
- Learn PowerShell fundamentals
- Execute basic administrative tasks via PowerShell
- Create simple automation scripts

**Tasks:**
- Navigate file system using PowerShell
- Manage users and groups with cmdlets
- Query system information
- Create basic automation script
- Use PowerShell pipeline and filters

**Deliverables:**
- PowerShell command history
- Custom automation script
- Script execution results

---

### Lab 13: Remote Desktop & Administration
**Objectives:**
- Configure and use Remote Desktop
- Implement remote administration tools
- Use Windows Admin Center

**Tasks:**
- Enable Remote Desktop Protocol (RDP)
- Configure RDP security settings
- Use Remote Assistance
- Manage remote computers with MMC
- Install and use Windows Admin Center

**Deliverables:**
- Remote Desktop configuration
- Remote session screenshots
- Remote administration report

---

### Lab 14: Troubleshooting Methodologies
**Objectives:**
- Apply systematic troubleshooting approach
- Use Windows troubleshooting tools
- Document and resolve complex issues

**Tasks:**
- Use Event Viewer to diagnose issues
- Analyze crash dumps with WinDbg
- Troubleshoot boot failures (Safe Mode, Startup Repair)
- Resolve blue screen errors
- Create troubleshooting documentation

**Deliverables:**
- Event Viewer analysis report
- Boot troubleshooting procedure
- Complete issue resolution documentation

**Objectives:**
- Monitor system performance and resource usage
- Troubleshoot performance bottlenecks
- Optimize Windows for better performance

**Tasks:**
- Use Task Manager and Resource Monitor
- Analyze Event Viewer logs
- Configure virtual memory and page file
- Disable unnecessary startup programs

**Tools Used:**
- Task Manager
- Performance Monitor
- Event Viewer
- System Configuration (msconfig)

---

## Lab 4: Windows Security and Updates

**Objectives:**
- Configure Windows Defender and Firewall
- Manage Windows Update policies
- Implement User Account Control (UAC)

**Tasks:**
- Configure Windows Defender settings
- Set up Windows Firewall rules
- Manage Group Policy Objects (GPO)
- Configure Windows Update for Business

**Security Focus:**
- Malware protection
- Network security
- Update management

---

## Lab 5: Troubleshooting and Recovery

**Objectives:**
- Diagnose and resolve common Windows issues
- Use recovery tools and safe mode
- Repair boot problems and system files

**Tasks:**
- Boot into Safe Mode and troubleshoot
- Use System File Checker (SFC) and DISM
- Repair boot configuration with bootrec
- Perform system restore and reset

**Troubleshooting Tools:**
- Safe Mode
- System File Checker
- DISM
- Windows Recovery Environment
