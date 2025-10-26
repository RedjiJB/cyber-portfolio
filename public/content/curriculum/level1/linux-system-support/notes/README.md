# Linux System Support - Notes

Comprehensive study notes for CST8207 - GNU/Linux System Support.

## Course Topics by Week

### Week 1-2: Command Line Fundamentals
**Learning Objectives:**
- Navigate the Linux file system hierarchy
- Master essential command-line tools
- Understand the Unix philosophy

**Key Concepts:**
- File System Hierarchy Standard (FHS)
- Commands: `ls`, `cd`, `pwd`, `mkdir`, `rm`, `cp`, `mv`, `cat`, `less`, `more`
- Man pages and help systems (`man`, `--help`, `info`)
- File types: regular files, directories, links, devices

**Directory Structure:**
```
/          # Root directory
/bin       # Essential user binaries
/boot      # Boot loader files
/dev       # Device files
/etc       # System configuration
/home      # User home directories
/lib       # System libraries
/proc      # Process information
/root      # Root user home
/tmp       # Temporary files
/usr       # User programs
/var       # Variable data (logs, mail)
```

---

### Week 3: File Permissions and Ownership

**Permission Types:**
- Read (r) = 4
- Write (w) = 2
- Execute (x) = 1

**Permission Groups:**
- Owner (u)
- Group (g)
- Others (o)

**Commands:**
```bash
chmod 755 file          # rwxr-xr-x
chmod u+x script.sh     # Add execute for owner
chown user:group file   # Change ownership
umask 022               # Set default permissions
```

**Special Permissions:**
- SUID (Set User ID): 4000
- SGID (Set Group ID): 2000
- Sticky Bit: 1000

---

### Week 4-5: Redirection and Pipes

**I/O Redirection:**
```bash
command > file          # Redirect output (overwrite)
command >> file         # Redirect output (append)
command < file          # Redirect input
command 2> file         # Redirect errors
command &> file         # Redirect all output
```

**Pipes:**
```bash
ls -l | grep ".txt"                    # Filter output
cat file | sort | uniq                 # Chain commands
ps aux | grep nginx | awk '{print $2}' # Extract process IDs
```

**Useful Command Chains:**
- `grep`: Pattern matching
- `sort`: Sort lines
- `uniq`: Remove duplicates
- `wc`: Word count
- `head`/`tail`: Show first/last lines
- `cut`: Extract columns
- `tr`: Translate characters

---

### Week 6-7: User and Process Management

**User Administration:**
```bash
useradd -m username         # Create user with home
passwd username             # Set password
usermod -aG group user      # Add to group
userdel -r username         # Delete user and home
groupadd groupname          # Create group
```

**Process Management:**
```bash
ps aux                      # List all processes
top                         # Interactive process viewer
htop                        # Enhanced top
kill PID                    # Terminate process
killall name                # Kill by name
nice -n 10 command          # Set priority
renice 5 -p PID            # Change priority
```

**Job Control:**
```bash
command &                   # Run in background
Ctrl+Z                      # Suspend current job
bg                          # Resume in background
fg                          # Resume in foreground
jobs                        # List jobs
```

---

### Week 8-9: Shell Scripting

**Script Basics:**
```bash
#!/bin/bash
# Shebang line

# Variables
NAME="Linux"
echo "Hello, $NAME"

# Command substitution
CURRENT_DATE=$(date +%Y-%m-%d)
```

**Conditionals:**
```bash
if [ -f "$FILE" ]; then
    echo "File exists"
elif [ -d "$DIR" ]; then
    echo "Directory exists"
else
    echo "Not found"
fi
```

**Loops:**
```bash
# For loop
for i in {1..10}; do
    echo "Number: $i"
done

# While loop
while read line; do
    echo "$line"
done < file.txt
```

**Functions:**
```bash
function backup() {
    tar -czf backup-$(date +%Y%m%d).tar.gz "$1"
}
```

---

### Week 10-11: Text Processing and Regular Expressions

**grep - Pattern Matching:**
```bash
grep "pattern" file         # Search for pattern
grep -i "pattern" file      # Case insensitive
grep -r "pattern" /dir      # Recursive search
grep -v "pattern" file      # Invert match
grep -E "regex" file        # Extended regex
```

**sed - Stream Editor:**
```bash
sed 's/old/new/' file       # Replace first occurrence
sed 's/old/new/g' file      # Replace all
sed '/pattern/d' file       # Delete lines
sed -n '1,10p' file         # Print lines 1-10
```

**awk - Text Processing:**
```bash
awk '{print $1}' file       # Print first column
awk -F: '{print $1,$3}' /etc/passwd  # Custom delimiter
awk '$3 > 1000' file        # Conditional
```

**Regular Expressions:**
- `.` = Any character
- `*` = Zero or more
- `+` = One or more
- `?` = Zero or one
- `^` = Start of line
- `$` = End of line
- `[]` = Character class
- `|` = OR operator

---

### Week 12-13: System Services and Automation

**systemd Services:**
```bash
systemctl start service     # Start service
systemctl stop service      # Stop service
systemctl restart service   # Restart
systemctl enable service    # Enable at boot
systemctl disable service   # Disable at boot
systemctl status service    # Check status
journalctl -u service       # View logs
```

**Cron Jobs:**
```
# Format: minute hour day month weekday command
0 2 * * * /path/backup.sh           # Daily at 2 AM
*/15 * * * * /path/check.sh         # Every 15 minutes
0 0 * * 0 /path/weekly.sh           # Weekly on Sunday
@reboot /path/startup.sh            # On system boot
```

---

### Week 14: Networking and Security

**Network Configuration:**
```bash
ip addr show                # Show IP addresses
ip route show               # Show routing table
nmcli                       # NetworkManager CLI
hostnamectl                 # Hostname management
```

**Firewall (ufw):**
```bash
ufw enable                  # Enable firewall
ufw allow 22/tcp            # Allow SSH
ufw deny 23/tcp             # Deny Telnet
ufw status                  # Show rules
```

**SSH:**
```bash
ssh user@host               # Connect to remote
scp file user@host:/path    # Copy file
ssh-keygen                  # Generate key pair
ssh-copy-id user@host       # Copy public key
```

---

## Important Concepts

**Unix Philosophy:**
1. Write programs that do one thing well
2. Write programs to work together
3. Write programs to handle text streams

**Environment Variables:**
```bash
export PATH=$PATH:/new/path
export EDITOR=vim
export PS1="[\u@\h \W]\$ "
```

**Package Management:**
- **Debian/Ubuntu:** apt, dpkg
- **Red Hat/CentOS:** yum, dnf, rpm
- **Arch:** pacman
- **Universal:** snap, flatpak

**System Logs:**
- `/var/log/syslog` - System log
- `/var/log/auth.log` - Authentication
- `/var/log/kern.log` - Kernel messages
- `journalctl` - systemd journal
