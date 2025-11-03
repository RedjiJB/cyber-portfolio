# Linux System Support - Labs

Hands-on Linux administration labs for CST8207.

## Labs Overview

Practical exercises covering Linux installation, system administration, and troubleshooting.

---

## Lab 1: Linux Installation and Basic Commands

**Objectives:**
- Install Linux distribution (Ubuntu/CentOS)
- Navigate the file system
- Execute basic commands

**Tasks:**
- Install Linux in virtual machine
- Practice navigation commands (cd, ls, pwd)
- Learn file manipulation (cp, mv, rm, mkdir)
- Understand Linux file system hierarchy

**Commands to Master:**
```bash
ls -la         # List all files with details
cd /path       # Change directory
pwd            # Print working directory
mkdir folder   # Create directory
rm -rf file    # Remove files/folders
cp source dest # Copy files
mv old new     # Move/rename files
```

**Deliverables:**
- Installation report with screenshots
- Command practice worksheet

---

## Lab 2: User and Permission Management

**Objectives:**
- Create and manage user accounts
- Configure file permissions
- Understand sudo and root access

**Tasks:**
- Create users with useradd/adduser
- Set up groups and group membership
- Configure file permissions (chmod)
- Change file ownership (chown)
- Configure sudo access

**Permission Concepts:**
- Read (r=4), Write (w=2), Execute (x=1)
- Owner, Group, Others (ugo)
- Symbolic vs. numeric notation
- Special permissions (SUID, SGID, sticky bit)

**Example Commands:**
```bash
sudo useradd -m username      # Create user with home directory
sudo passwd username          # Set user password
sudo usermod -aG sudo username # Add user to sudo group
chmod 755 file                # Set permissions
chown user:group file         # Change ownership
```

---

## Lab 3: Package Management and Software Installation

**Objectives:**
- Install and update software packages
- Manage repositories
- Compile software from source

**Tasks (Debian/Ubuntu):**
```bash
sudo apt update               # Update package lists
sudo apt upgrade              # Upgrade installed packages
sudo apt install package      # Install software
sudo apt remove package       # Remove software
sudo apt search keyword       # Search for packages
```

**Tasks (Red Hat/CentOS):**
```bash
sudo yum update               # Update system
sudo yum install package      # Install software
sudo yum remove package       # Remove software
sudo dnf search keyword       # Search packages (newer systems)
```

**From Source:**
```bash
./configure
make
sudo make install
```

---

## Lab 4: Process and Service Management

**Objectives:**
- Monitor system processes
- Manage services
- Schedule tasks

**Process Management:**
```bash
ps aux                 # List all processes
top                    # Interactive process viewer
htop                   # Enhanced process viewer
kill PID               # Terminate process
killall name           # Kill by process name
bg                     # Background job
fg                     # Foreground job
```

**Service Management (systemd):**
```bash
sudo systemctl start service    # Start service
sudo systemctl stop service     # Stop service
sudo systemctl restart service  # Restart service
sudo systemctl enable service   # Enable at boot
sudo systemctl status service   # Check status
```

**Task Scheduling:**
```bash
crontab -e             # Edit user crontab
sudo crontab -e        # Edit root crontab
# Format: minute hour day month weekday command
0 2 * * * /path/to/backup.sh    # Daily at 2 AM
```

---

## Lab 5: Shell Scripting and Automation

**Objectives:**
- Write basic bash scripts
- Automate common tasks
- Use variables and loops

**Basic Script Structure:**
```bash
#!/bin/bash
# This is a comment

# Variables
NAME="Linux Admin"
echo "Hello, $NAME"

# User input
read -p "Enter your name: " USERNAME
echo "Welcome, $USERNAME"

# Conditional
if [ -f "/etc/passwd" ]; then
    echo "File exists"
else
    echo "File not found"
fi

# Loop
for i in {1..5}; do
    echo "Number: $i"
done
```

**Practical Scripts to Create:**
1. System backup script
2. User creation automation
3. Log file analyzer
4. Disk space monitor
5. Service health checker

---

## Lab 6: Networking and Firewall Configuration

**Objectives:**
- Configure network interfaces
- Set up firewall rules
- Troubleshoot connectivity

**Network Configuration:**
```bash
ip addr show           # Show IP addresses
ip route show          # Show routing table
sudo ip addr add IP/MASK dev eth0  # Add IP address
ping host              # Test connectivity
traceroute host        # Trace network path
nslookup domain        # DNS lookup
netstat -tuln          # Show listening ports
ss -tuln               # Modern alternative to netstat
```

**Firewall (UFW - Ubuntu):**
```bash
sudo ufw enable                    # Enable firewall
sudo ufw allow 22/tcp              # Allow SSH
sudo ufw allow 80/tcp              # Allow HTTP
sudo ufw deny 23/tcp               # Deny Telnet
sudo ufw status                    # Show rules
```

**Firewall (firewalld - CentOS):**
```bash
sudo firewall-cmd --add-service=http --permanent
sudo firewall-cmd --add-port=8080/tcp --permanent
sudo firewall-cmd --reload
```

**Deliverables:**
- Network configuration documentation
- Firewall rule set
- Connectivity test results
