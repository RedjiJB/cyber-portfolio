# Windows Desktop Support - Notes

Study notes and theoretical concepts for CST8202.

## Course Topics

### Week 1-2: Windows Architecture and Installation
- Windows operating system architecture
- File system overview (FAT32, NTFS, exFAT)
- Installation methods (clean, upgrade, network)
- System requirements and hardware compatibility
- Windows editions (Home, Pro, Enterprise)

### Week 3-4: User and Group Management
- Local vs. domain accounts
- User Account Control (UAC)
- Group Policy basics
- Password policies and security
- User profile management

### Week 5-6: File and Folder Permissions
- NTFS permissions (Read, Write, Modify, Full Control)
- Permission inheritance and propagation
- Share permissions vs. NTFS permissions
- Effective permissions calculation
- Auditing file access

### Week 7-8: Networking in Windows
- TCP/IP configuration
- DNS and DHCP client configuration
- Network troubleshooting tools (ipconfig, ping, nslookup)
- Joining workgroups and domains
- Remote Desktop configuration

### Week 9-10: Storage and Backup
- Disk Management console
- Dynamic disks and volumes
- RAID configurations
- Windows Backup and File History
- OneDrive integration

### Week 11-12: System Monitoring and Maintenance
- Event Viewer log analysis
- Performance monitoring and optimization
- Disk cleanup and defragmentation
- Windows Update management
- Device Manager and driver updates

### Week 13-14: Security and Troubleshooting
- Windows Defender configuration
- Firewall rules and exceptions
- BitLocker drive encryption
- System recovery options
- Common troubleshooting methodologies

## Key Concepts

**Registry Basics:**
- HKEY_LOCAL_MACHINE (system settings)
- HKEY_CURRENT_USER (user settings)
- Registry editing best practices

**Command-Line Tools:**
- `sfc /scannow` - System File Checker
- `chkdsk /f` - Check and fix disk errors
- `dism /online /cleanup-image /restorehealth` - Repair Windows image
- `net user` - Manage user accounts
- `gpupdate /force` - Refresh Group Policy

**Boot Process:**
1. POST (Power-On Self-Test)
2. BIOS/UEFI initialization
3. Bootloader (Windows Boot Manager)
4. Kernel loading
5. Service initialization
6. User logon

## Important Tools

- **Computer Management** - Centralized system management
- **Disk Management** - Storage administration
- **Event Viewer** - System and application logs
- **Group Policy Editor** - Policy configuration
- **Services Console** - Service management
- **Task Scheduler** - Automated task management
