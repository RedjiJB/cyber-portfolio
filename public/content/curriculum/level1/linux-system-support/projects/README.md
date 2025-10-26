# Linux System Support - Projects

Final projects and automation suite for CST8207.

## Final Project: Linux Service Suite

**Duration:** Weeks 10-14  
**Team Size:** Individual  
**Weight:** 30% of final grade

---

## Project Overview

Create a comprehensive **Linux System Administration Toolkit** - a collection of Bash scripts that automate common sysadmin tasks. This project demonstrates your mastery of Linux commands, shell scripting, automation, and system thinking.

---

## Part 1: Automated Backup System (Week 10)

### Requirements

Create a robust backup solution with the following features:

**Features:**
1. **Incremental Backups:** Full backup weekly, incremental daily
2. **Compression:** Use tar + gzip for efficiency
3. **Rotation:** Keep last 7 daily, 4 weekly backups
4. **Logging:** Detailed logs of each backup operation
5. **Error Handling:** Email alerts on failures
6. **Scheduling:** Automated via cron

**Script: `backup-system.sh`**
```bash
#!/bin/bash
# Automated backup system with rotation

BACKUP_DIR="/backups"
SOURCE_DIR="/home /etc /var/www"
DATE=$(date +%Y%m%d-%H%M%S)
LOG_FILE="/var/log/backup.log"

# Function to log messages
log_message() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Create backup directory
mkdir -p "$BACKUP_DIR/daily" "$BACKUP_DIR/weekly"

# Determine backup type
DAY_OF_WEEK=$(date +%u)
if [ "$DAY_OF_WEEK" -eq 7 ]; then
    BACKUP_TYPE="weekly"
    BACKUP_PATH="$BACKUP_DIR/weekly/full-$DATE.tar.gz"
else
    BACKUP_TYPE="daily"
    BACKUP_PATH="$BACKUP_DIR/daily/incremental-$DATE.tar.gz"
fi

# Perform backup
log_message "Starting $BACKUP_TYPE backup..."
tar -czf "$BACKUP_PATH" $SOURCE_DIR 2>> "$LOG_FILE"

if [ $? -eq 0 ]; then
    log_message "Backup completed successfully: $BACKUP_PATH"
    
    # Rotate old backups
    find "$BACKUP_DIR/daily" -name "*.tar.gz" -mtime +7 -delete
    find "$BACKUP_DIR/weekly" -name "*.tar.gz" -mtime +28 -delete
else
    log_message "ERROR: Backup failed!"
    # Send email alert (requires mail command)
    # echo "Backup failed on $(hostname)" | mail -s "Backup Alert" admin@example.com
fi
```

**Deliverables:**
- Working backup script
- Crontab configuration
- Documentation on setup and recovery
- Test results showing successful backup and restoration

---

## Part 2: System Health Monitoring (Week 11)

### Requirements

Create a monitoring script that checks system health and alerts on issues.

**Metrics to Monitor:**
- CPU usage above 80%
- Memory usage above 85%
- Disk space above 90%
- Critical service status (ssh, apache, mysql)
- System load average
- Failed login attempts

**Script: `system-health.sh`**
```bash
#!/bin/bash
# System health monitoring dashboard

# Thresholds
CPU_THRESHOLD=80
MEM_THRESHOLD=85
DISK_THRESHOLD=90

# Check CPU usage
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
echo "CPU Usage: ${CPU_USAGE}%"

# Check Memory usage
MEM_USAGE=$(free | grep Mem | awk '{printf("%.0f", $3/$2 * 100)}')
echo "Memory Usage: ${MEM_USAGE}%"

# Check Disk usage
DISK_USAGE=$(df -h / | tail -1 | awk '{print $5}' | cut -d'%' -f1)
echo "Disk Usage: ${DISK_USAGE}%"

# Check services
SERVICES="sshd apache2 mysql"
for service in $SERVICES; do
    if systemctl is-active --quiet "$service"; then
        echo "✓ $service is running"
    else
        echo "✗ $service is DOWN"
    fi
done

# Alerts
if [ "$CPU_USAGE" -gt "$CPU_THRESHOLD" ]; then
    echo "WARNING: High CPU usage!"
fi

if [ "$MEM_USAGE" -gt "$MEM_THRESHOLD" ]; then
    echo "WARNING: High memory usage!"
fi

if [ "$DISK_USAGE" -gt "$DISK_THRESHOLD" ]; then
    echo "WARNING: Low disk space!"
fi
```

**Advanced Features:**
- Historical data collection
- Graphical output (gnuplot or ASCII charts)
- Email/SMS alerts
- Web dashboard (optional)

**Deliverables:**
- Monitoring script
- Cron setup for regular checks
- Alert configuration
- Sample output and logs

---

## Part 3: User Management Automation (Week 12)

### Requirements

Create scripts for bulk user management operations.

**Script: `user-manager.sh`**
```bash
#!/bin/bash
# Bulk user creation and management

# Function to create users from CSV
create_users() {
    CSV_FILE="$1"
    
    while IFS=, read -r username fullname email group; do
        # Skip header
        [ "$username" = "username" ] && continue
        
        # Create user
        useradd -m -c "$fullname" -G "$group" "$username"
        
        # Set temporary password
        echo "$username:changeme123" | chpasswd
        
        # Force password change on first login
        chpasswd -e "$username"
        
        echo "Created user: $username ($fullname)"
    done < "$CSV_FILE"
}

# Function to generate password report
password_audit() {
    echo "Password Audit Report - $(date)"
    echo "======================================"
    
    # Find users with no password
    awk -F: '($2 == "" ) {print $1 " has no password!"}' /etc/shadow
    
    # Find users who haven't changed password in 90 days
    for user in $(cut -d: -f1 /etc/passwd); do
        last_change=$(chage -l "$user" | grep "Last password change" | cut -d: -f2)
        # Check if older than 90 days
    done
}

# Menu
case "$1" in
    create)
        create_users "$2"
        ;;
    audit)
        password_audit
        ;;
    *)
        echo "Usage: $0 {create|audit} [csvfile]"
        exit 1
esac
```

**Features:**
- Bulk user creation from CSV
- Group membership management
- Password policy enforcement
- Account expiration management
- User audit reports

**Deliverables:**
- User management scripts
- CSV template file
- Documentation on usage
- Security considerations document

---

## Part 4: Log Analysis Tool (Week 13)

### Requirements

Parse and analyze system logs to identify issues and patterns.

**Script: `log-analyzer.sh`**
```bash
#!/bin/bash
# Apache/Nginx log analyzer

LOG_FILE="/var/log/apache2/access.log"

echo "=== Log Analysis Report ==="
echo "Date: $(date)"
echo

# Total requests
echo "Total Requests: $(wc -l < "$LOG_FILE")"

# Requests by status code
echo
echo "Status Codes:"
awk '{print $9}' "$LOG_FILE" | sort | uniq -c | sort -rn

# Top 10 IP addresses
echo
echo "Top 10 IPs:"
awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -rn | head -10

# Top 10 requested pages
echo
echo "Top 10 Pages:"
awk '{print $7}' "$LOG_FILE" | sort | uniq -c | sort -rn | head -10

# 404 errors
echo
echo "404 Errors:"
grep " 404 " "$LOG_FILE" | awk '{print $7}' | sort | uniq -c | sort -rn

# Traffic by hour
echo
echo "Requests by Hour:"
awk '{print $4}' "$LOG_FILE" | cut -d: -f2 | sort | uniq -c

# Bandwidth usage
echo
echo "Total Bandwidth:"
awk '{sum += $10} END {printf "%.2f MB\n", sum/1024/1024}' "$LOG_FILE"
```

**Advanced Features:**
- Detect suspicious patterns (SQL injection, XSS attempts)
- Identify bot traffic
- Generate HTML reports
- Real-time monitoring mode

**Deliverables:**
- Log parsing script
- Analysis report template
- Security findings document
- Automation recommendations

---

## Part 5: Final Integration (Week 14)

### Complete Automation Suite

Combine all scripts into a unified system administration toolkit.

**Directory Structure:**
```
linux-admin-toolkit/
├── README.md                   # Main documentation
├── install.sh                  # Setup script
├── backup/
│   ├── backup-system.sh
│   ├── restore.sh
│   └── README.md
├── monitoring/
│   ├── system-health.sh
│   ├── alerts.conf
│   └── README.md
├── user-management/
│   ├── user-manager.sh
│   ├── users-template.csv
│   └── README.md
├── log-analysis/
│   ├── log-analyzer.sh
│   ├── report-generator.sh
│   └── README.md
└── cron.d/
    └── automation-jobs
```

**Master Control Script:**
```bash
#!/bin/bash
# toolkit.sh - Main control interface

case "$1" in
    backup)
        ./backup/backup-system.sh
        ;;
    monitor)
        ./monitoring/system-health.sh
        ;;
    users)
        ./user-management/user-manager.sh "${@:2}"
        ;;
    logs)
        ./log-analysis/log-analyzer.sh
        ;;
    status)
        echo "=== System Administration Toolkit Status ==="
        crontab -l | grep -E "backup|monitor"
        ;;
    *)
        echo "Usage: $0 {backup|monitor|users|logs|status}"
        exit 1
esac
```

---

## Grading Rubric

| Component | Excellent (25%) | Good (20%) | Satisfactory (15%) | Needs Improvement (<15%) |
|-----------|-----------------|------------|---------------------|--------------------------|
| **Code Quality** | Clean, commented, modular | Functional with comments | Works but messy | Many bugs |
| **Error Handling** | Robust error checking | Basic error handling | Minimal handling | No error handling |
| **Automation** | Fully automated with cron | Mostly automated | Manual execution needed | No automation |
| **Documentation** | Comprehensive README and comments | Good documentation | Basic documentation | Poor or missing |

---

## Bonus Challenges (+10% extra credit)

1. **Web Dashboard:** Create simple web interface for monitoring
2. **Ansible Playbook:** Convert scripts to Ansible automation
3. **Docker Integration:** Containerize the toolkit
4. **CI/CD Pipeline:** Set up automated testing with GitHub Actions

---

## Presentation (Week 14)

**Format:** 10-minute demonstration + 5-minute Q&A

**Content:**
1. Architecture overview
2. Live demo of each component
3. Cron scheduling demonstration
4. Error handling showcase
5. Code quality highlights

**Deliverables:**
- GitHub repository with all code
- README with setup instructions
- Presentation slides or live demo
- Video walkthrough (optional)

This project showcases real-world Linux system administration skills and creates a portfolio piece you can reference in co-op interviews and job applications!
