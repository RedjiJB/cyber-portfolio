# Windows Desktop Support - Projects

Final project and practical assignments for CST8202.

## Final Project: Corporate Desktop Deployment and Support Plan

### Project Overview

Design and implement a comprehensive Windows desktop support solution for a small business with 25 employees.

**Duration:** 4 weeks  
**Team Size:** Individual or pairs  
**Weight:** 25% of final grade

---

## Project Requirements

### Part 1: Environment Setup (Week 1)

**Objectives:**
- Set up virtual lab environment
- Install Windows 10/11 on multiple VMs
- Configure network infrastructure

**Deliverables:**
- 5 Windows client VMs
- Network diagram
- IP address scheme documentation

**Technical Requirements:**
- Windows 10/11 Pro edition
- Domain or workgroup configuration
- File server setup

---

### Part 2: User and Security Configuration (Week 2)

**Objectives:**
- Create user accounts and groups
- Implement security policies
- Configure access controls

**Tasks:**
1. Create organizational units:
   - Management (3 users)
   - Sales (10 users)
   - IT Department (2 users)
   - Finance (5 users)
   - HR (5 users)

2. Implement security policies:
   - Password complexity requirements
   - Account lockout policies
   - User rights assignments
   - Audit policies

3. Configure NTFS permissions:
   - Department shared folders
   - Public folders
   - Executive-only resources

**Deliverables:**
- User account documentation
- Security policy document
- Permission matrix spreadsheet

---

### Part 3: System Management and Monitoring (Week 3)

**Objectives:**
- Configure system monitoring
- Implement backup solutions
- Create maintenance schedules

**Requirements:**

**Backup Strategy:**
- Full system backups weekly
- File History for user data
- System image backups monthly
- Offsite backup simulation

**Monitoring Setup:**
- Event log collection and analysis
- Performance baseline documentation
- Alert configuration for critical events
- Scheduled maintenance tasks

**Tools to Implement:**
- Windows Backup
- Task Scheduler for automation
- Performance Monitor data collector sets
- Event Viewer custom views

**Deliverables:**
- Backup and recovery procedures document
- Monitoring dashboard setup
- Maintenance schedule

---

### Part 4: Troubleshooting and Documentation (Week 4)

**Objectives:**
- Create troubleshooting documentation
- Develop support procedures
- Test recovery scenarios

**Troubleshooting Scenarios to Document:**

1. **Boot Failure Recovery:**
   - Steps to access Safe Mode
   - Using System Restore
   - Repairing boot configuration
   - Clean installation procedures

2. **Performance Issues:**
   - Identifying resource bottlenecks
   - Removing malware
   - Optimizing startup programs
   - Disk cleanup procedures

3. **Network Connectivity:**
   - DNS resolution problems
   - DHCP troubleshooting
   - Firewall configuration issues
   - Remote access problems

4. **Permission Issues:**
   - Resolving "Access Denied" errors
   - Fixing permission inheritance
   - Restoring file ownership
   - Auditing access attempts

**Deliverables:**
- Comprehensive troubleshooting guide (15-20 pages)
- FAQ document for common issues
- Escalation procedures
- Knowledge base articles

---

## Final Presentation Requirements

**Presentation Format:**
- 15-minute demonstration
- PowerPoint or live demo
- Q&A session (5 minutes)

**Content to Cover:**
1. Environment architecture overview
2. Security implementation highlights
3. Backup and monitoring strategy
4. Live troubleshooting demonstration
5. Lessons learned and challenges

**Grading Criteria:**
- Technical accuracy (40%)
- Documentation quality (30%)
- Presentation delivery (15%)
- Problem-solving approach (15%)

---

## Bonus Challenges (Optional)

For extra credit, implement any of the following:

1. **PowerShell Automation:**
   - Script for bulk user creation
   - Automated system health checks
   - Backup verification scripts

2. **Advanced Security:**
   - BitLocker implementation
   - Windows Defender exploit protection
   - Application whitelisting with AppLocker

3. **Remote Management:**
   - Remote Desktop Services configuration
   - PowerShell remoting setup
   - Remote assistance procedures

4. **Integration Projects:**
   - OneDrive for Business setup
   - Microsoft 365 integration
   - Mobile device management basics

---

## Submission Guidelines

**File Structure:**
```
ProjectName_StudentName/
├── Documentation/
│   ├── NetworkDiagram.pdf
│   ├── UserAccounts.xlsx
│   ├── SecurityPolicies.docx
│   ├── TroubleshootingGuide.pdf
│   └── BackupProcedures.docx
├── Scripts/
│   ├── UserCreation.ps1
│   └── SystemCheck.ps1
├── Screenshots/
│   ├── Lab1_Installation.png
│   ├── Lab2_Permissions.png
│   └── Lab3_Monitoring.png
└── Presentation.pptx
```

**Submission Deadline:** End of Week 14  
**Format:** ZIP file uploaded to learning management system  
**Naming Convention:** CST8202_Project_FirstNameLastName.zip

---

## Evaluation Rubric

| Component | Excellent (90-100%) | Good (80-89%) | Satisfactory (70-79%) | Needs Improvement (<70%) |
|-----------|---------------------|---------------|------------------------|--------------------------|
| **Technical Implementation** | All systems properly configured and functional | Most systems working with minor issues | Basic functionality achieved | Significant technical problems |
| **Documentation** | Comprehensive, professional, error-free | Detailed with minor omissions | Adequate but lacking detail | Incomplete or unclear |
| **Security** | Advanced security measures implemented | Good security practices applied | Basic security configured | Security weaknesses present |
| **Troubleshooting** | Excellent problem-solving demonstrated | Good troubleshooting skills shown | Basic troubleshooting ability | Limited troubleshooting capability |

---

## Tips for Success

1. **Start Early** - Don't wait until the last week
2. **Document Everything** - Take screenshots as you work
3. **Test Thoroughly** - Verify each configuration works
4. **Backup Your Work** - Save VMs and documents regularly
5. **Ask Questions** - Use office hours and discussion forums
6. **Practice Presentation** - Rehearse your demonstration
