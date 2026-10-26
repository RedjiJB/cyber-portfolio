# Linux Automation Suite
**Course:** CST8207 - GNU/Linux System Support  
**Project Type:** Bash Scripting & System Automation  
**Tools:** Bash, Cron, Linux CLI, Vi/Vim/Nano

---

## Project Overview

Create a comprehensive Bash automation suite for Linux system administration. This project includes automated backup solutions with intelligent rotation policies, log analysis with alerting capabilities, cron job management with monitoring, and system maintenance automation. All scripts will feature robust error handling, logging, and professional documentation.

### Learning Objectives
- Master Bash scripting fundamentals and advanced techniques
- Implement automated system maintenance tasks
- Configure and manage cron jobs effectively
- Develop log analysis and monitoring solutions
- Apply Linux best practices for script security and reliability
- Create maintainable and documented automation solutions

---

## Project Requirements

### 1. Automation Suite Components

#### Script 1: Automated Backup System (`backup_manager.sh`)
**Features:**
- Full and incremental backups
- Configurable backup sources and destinations
- Rotation policy (daily, weekly, monthly)
- Compression and encryption options
- Email notifications
- Backup verification and integrity checks
- Restore functionality

#### Script 2: Log Analysis Tool (`log_analyzer.sh`)
**Features:**
- Parse system logs (/var/log/syslog, /var/log/auth.log)
- Detect error patterns and security events
- Generate summary reports
- Email alerts for critical events
- Historical trend analysis
- Custom filter support

#### Script 3: Cron Job Manager (`cron_manager.sh`)
**Features:**
- List all cron jobs (system and user)
- Add/remove/modify cron jobs
- Monitor cron job execution
- Track failed jobs
- Generate cron job reports
- Backup cron configurations

#### Script 4: System Maintenance Automation (`system_maintenance.sh`)
**Features:**
- Disk space monitoring and cleanup
- Package update automation
- Service health checks
- User account auditing
- Security audit (failed logins, open ports)
- Performance metrics collection

---

## Implementation Guide

### Phase 1: Environment Setup (Week 1)

#### Required Environment:
1. **Linux Distribution:** Ubuntu 22.04 LTS or CentOS/Rocky Linux 8+
2. **User Access:** Root/sudo privileges
3. **Development Tools:** Bash 5.0+, text editor (vim/nano)
4. **Additional Packages:** rsync, tar, gzip, mailutils, logwatch

#### Initial Setup:

**📸 SCREENSHOT #1:** Linux system information (`uname -a`, `lsb_release -a`)

```bash
# Check Bash version
bash --version

# Install required packages
sudo apt update
sudo apt install -y rsync tar gzip mailutils logwatch cron anacron

# OR for CentOS/RHEL
sudo yum install -y rsync tar gzip mailx cronie

# Verify installations
which rsync tar gzip cron

# Create project directory structure
sudo mkdir -p /opt/automation-suite/{scripts,config,logs,backups,reports,temp}
sudo chmod 755 /opt/automation-suite
sudo chown $USER:$USER /opt/automation-suite -R

# Create log directory
sudo mkdir -p /var/log/automation-suite
sudo chown $USER:$USER /var/log/automation-suite
```

**📸 SCREENSHOT #2:** Package installation success
**📸 SCREENSHOT #3:** Project directory structure (`tree /opt/automation-suite`)

---

### Phase 2: Script 1 - Automated Backup System (Week 2)

#### Development Steps:

Create `/opt/automation-suite/scripts/backup_manager.sh`:

```bash
#!/bin/bash

################################################################################
# Script Name: backup_manager.sh
# Description: Automated backup system with rotation and verification
# Author: [Your Name]
# Version: 1.0.0
# Date: $(date +%Y-%m-%d)
################################################################################

# Strict error handling
set -euo pipefail
IFS=$'\n\t'

# Global Variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/../config/backup.conf"
LOG_FILE="/var/log/automation-suite/backup_manager.log"
BACKUP_BASE_DIR="/opt/automation-suite/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DATE_ONLY=$(date +%Y%m%d)

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

################################################################################
# Logging Functions
################################################################################

log_message() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
    
    case "$level" in
        ERROR)
            echo -e "${RED}[ERROR]${NC} $message" >&2
            ;;
        WARNING)
            echo -e "${YELLOW}[WARNING]${NC} $message"
            ;;
        SUCCESS)
            echo -e "${GREEN}[SUCCESS]${NC} $message"
            ;;
        INFO)
            echo -e "${BLUE}[INFO]${NC} $message"
            ;;
    esac
}

################################################################################
# Error Handler
################################################################################

error_exit() {
    log_message "ERROR" "$1"
    send_notification "ERROR" "Backup failed: $1"
    exit 1
}

trap 'error_exit "Script interrupted"' INT TERM

################################################################################
# Configuration Loader
################################################################################

load_config() {
    if [[ ! -f "$CONFIG_FILE" ]]; then
        log_message "WARNING" "Config file not found, creating default"
        create_default_config
    fi
    
    source "$CONFIG_FILE"
    
    log_message "INFO" "Configuration loaded from $CONFIG_FILE"
}

create_default_config() {
    cat > "$CONFIG_FILE" << 'EOF'
# Backup Configuration File

# Backup sources (space-separated list)
BACKUP_SOURCES="/home/user/documents /etc /var/www"

# Backup destination
BACKUP_DEST="/opt/automation-suite/backups"

# Backup type: full or incremental
BACKUP_TYPE="full"

# Compression: none, gzip, bzip2, xz
COMPRESSION="gzip"

# Enable encryption (yes/no)
ENCRYPTION="no"

# Encryption password (if enabled)
ENCRYPTION_PASSWORD=""

# Retention policy (days)
DAILY_RETENTION=7
WEEKLY_RETENTION=4
MONTHLY_RETENTION=12

# Email notifications
EMAIL_ENABLED="yes"
EMAIL_RECIPIENT="admin@example.com"

# Backup verification
VERIFY_BACKUP="yes"
EOF
    
    chmod 600 "$CONFIG_FILE"
}

################################################################################
# Backup Functions
################################################################################

perform_backup() {
    local backup_type="$1"
    local backup_name="backup_${DATE_ONLY}_${TIMESTAMP}"
    local backup_dir="${BACKUP_BASE_DIR}/${backup_name}"
    
    log_message "INFO" "Starting $backup_type backup: $backup_name"
    
    # Create backup directory
    mkdir -p "$backup_dir"
    
    # Loop through backup sources
    for source in $BACKUP_SOURCES; do
        if [[ ! -e "$source" ]]; then
            log_message "WARNING" "Source not found: $source"
            continue
        fi
        
        local source_name=$(basename "$source")
        local dest_path="${backup_dir}/${source_name}"
        
        log_message "INFO" "Backing up: $source -> $dest_path"
        
        case "$backup_type" in
            full)
                perform_full_backup "$source" "$dest_path"
                ;;
            incremental)
                perform_incremental_backup "$source" "$dest_path"
                ;;
        esac
    done
    
    # Compress backup
    if [[ "$COMPRESSION" != "none" ]]; then
        compress_backup "$backup_dir"
    fi
    
    # Encrypt backup
    if [[ "$ENCRYPTION" == "yes" ]]; then
        encrypt_backup "$backup_dir"
    fi
    
    # Verify backup
    if [[ "$VERIFY_BACKUP" == "yes" ]]; then
        verify_backup "$backup_dir"
    fi
    
    # Apply retention policy
    apply_retention_policy
    
    log_message "SUCCESS" "Backup completed: $backup_name"
    send_notification "SUCCESS" "Backup completed successfully: $backup_name"
}

perform_full_backup() {
    local source="$1"
    local dest="$2"
    
    rsync -av \
        --delete \
        --exclude='*.tmp' \
        --exclude='cache/*' \
        "$source" "$dest" 2>&1 | tee -a "$LOG_FILE"
    
    if [[ ${PIPESTATUS[0]} -eq 0 ]]; then
        log_message "SUCCESS" "Full backup completed: $source"
    else
        error_exit "Full backup failed: $source"
    fi
}

perform_incremental_backup() {
    local source="$1"
    local dest="$2"
    
    # Find last full backup
    local last_backup=$(find "$BACKUP_BASE_DIR" -maxdepth 1 -type d -name "backup_*" | sort -r | head -n 1)
    
    if [[ -z "$last_backup" ]]; then
        log_message "WARNING" "No previous backup found, performing full backup"
        perform_full_backup "$source" "$dest"
        return
    fi
    
    # Incremental backup using rsync with --link-dest
    rsync -av \
        --link-dest="$last_backup" \
        --exclude='*.tmp' \
        "$source" "$dest" 2>&1 | tee -a "$LOG_FILE"
    
    if [[ ${PIPESTATUS[0]} -eq 0 ]]; then
        log_message "SUCCESS" "Incremental backup completed: $source"
    else
        error_exit "Incremental backup failed: $source"
    fi
}

compress_backup() {
    local backup_dir="$1"
    local archive_name="${backup_dir}.tar"
    
    log_message "INFO" "Compressing backup: $backup_dir"
    
    case "$COMPRESSION" in
        gzip)
            tar -czf "${archive_name}.gz" -C "$(dirname "$backup_dir")" "$(basename "$backup_dir")"
            rm -rf "$backup_dir"
            log_message "SUCCESS" "Backup compressed with gzip"
            ;;
        bzip2)
            tar -cjf "${archive_name}.bz2" -C "$(dirname "$backup_dir")" "$(basename "$backup_dir")"
            rm -rf "$backup_dir"
            log_message "SUCCESS" "Backup compressed with bzip2"
            ;;
        xz)
            tar -cJf "${archive_name}.xz" -C "$(dirname "$backup_dir")" "$(basename "$backup_dir")"
            rm -rf "$backup_dir"
            log_message "SUCCESS" "Backup compressed with xz"
            ;;
    esac
}

encrypt_backup() {
    local backup_path="$1"
    
    if [[ -z "$ENCRYPTION_PASSWORD" ]]; then
        log_message "WARNING" "Encryption enabled but no password set, skipping encryption"
        return
    fi
    
    log_message "INFO" "Encrypting backup: $backup_path"
    
    # Use openssl for encryption
    find "$backup_path" -type f | while read -r file; do
        openssl enc -aes-256-cbc -salt -in "$file" -out "${file}.enc" -k "$ENCRYPTION_PASSWORD"
        rm -f "$file"
    done
    
    log_message "SUCCESS" "Backup encrypted"
}

verify_backup() {
    local backup_path="$1"
    
    log_message "INFO" "Verifying backup integrity: $backup_path"
    
    if [[ -d "$backup_path" ]]; then
        local file_count=$(find "$backup_path" -type f | wc -l)
        log_message "INFO" "Backup contains $file_count files"
        
        if [[ $file_count -gt 0 ]]; then
            log_message "SUCCESS" "Backup verification passed"
            return 0
        fi
    elif [[ -f "${backup_path}.tar.gz" ]]; then
        if tar -tzf "${backup_path}.tar.gz" > /dev/null 2>&1; then
            log_message "SUCCESS" "Backup archive verification passed"
            return 0
        fi
    fi
    
    log_message "ERROR" "Backup verification failed"
    return 1
}

apply_retention_policy() {
    log_message "INFO" "Applying retention policy"
    
    local now=$(date +%s)
    
    # Daily retention
    find "$BACKUP_BASE_DIR" -maxdepth 1 -name "backup_*" -mtime +${DAILY_RETENTION} -type d -o -name "backup_*.tar.*" -mtime +${DAILY_RETENTION} | while read -r old_backup; do
        # Check if it's a weekly backup (Sunday)
        local backup_date=$(echo "$old_backup" | grep -oP '\d{8}' | head -1)
        local day_of_week=$(date -d "$backup_date" +%u)
        
        if [[ $day_of_week -eq 7 ]]; then
            # Weekly backup - check weekly retention
            local age_weeks=$(( (now - $(stat -c %Y "$old_backup")) / 604800 ))
            if [[ $age_weeks -gt $WEEKLY_RETENTION ]]; then
                rm -rf "$old_backup"
                log_message "INFO" "Deleted old weekly backup: $(basename "$old_backup")"
            fi
        else
            rm -rf "$old_backup"
            log_message "INFO" "Deleted old daily backup: $(basename "$old_backup")"
        fi
    done
}

################################################################################
# Notification Functions
################################################################################

send_notification() {
    local status="$1"
    local message="$2"
    
    if [[ "$EMAIL_ENABLED" != "yes" ]]; then
        return
    fi
    
    local subject="Backup $status - $(hostname)"
    
    echo "$message" | mail -s "$subject" "$EMAIL_RECIPIENT" 2>/dev/null || \
        log_message "WARNING" "Failed to send email notification"
}

################################################################################
# Restore Functions
################################################################################

restore_backup() {
    local backup_name="$1"
    local restore_dest="$2"
    
    log_message "INFO" "Restoring backup: $backup_name to $restore_dest"
    
    local backup_path="${BACKUP_BASE_DIR}/${backup_name}"
    
    if [[ -f "${backup_path}.tar.gz" ]]; then
        tar -xzf "${backup_path}.tar.gz" -C "$restore_dest"
    elif [[ -d "$backup_path" ]]; then
        rsync -av "$backup_path/" "$restore_dest/"
    else
        error_exit "Backup not found: $backup_name"
    fi
    
    log_message "SUCCESS" "Restore completed"
}

################################################################################
# List Backups
################################################################################

list_backups() {
    echo -e "\n${BLUE}Available Backups:${NC}"
    echo "===================="
    
    find "$BACKUP_BASE_DIR" -maxdepth 1 \( -type d -o -type f \) -name "backup_*" | sort -r | while read -r backup; do
        local size=$(du -sh "$backup" | cut -f1)
        local date=$(stat -c %y "$backup" | cut -d' ' -f1,2)
        echo "$(basename "$backup") - Size: $size - Date: $date"
    done
}

################################################################################
# Main Function
################################################################################

show_usage() {
    cat << EOF
Usage: $0 [OPTION]

Automated Backup Manager

OPTIONS:
    -b, --backup [full|incremental]    Perform backup
    -l, --list                         List available backups
    -r, --restore BACKUP DEST          Restore backup to destination
    -h, --help                         Show this help message

EXAMPLES:
    $0 --backup full
    $0 --backup incremental
    $0 --list
    $0 --restore backup_20240130_120000 /tmp/restore

EOF
}

main() {
    # Check if running as root or with sudo
    if [[ $EUID -ne 0 ]] && [[ -z "$SUDO_USER" ]]; then
        log_message "WARNING" "Script not running as root, some backups may fail"
    fi
    
    # Load configuration
    load_config
    
    # Parse arguments
    case "${1:-}" in
        -b|--backup)
            local backup_type="${2:-full}"
            perform_backup "$backup_type"
            ;;
        -l|--list)
            list_backups
            ;;
        -r|--restore)
            if [[ $# -lt 3 ]]; then
                echo "Error: Restore requires backup name and destination"
                show_usage
                exit 1
            fi
            restore_backup "$2" "$3"
            ;;
        -h|--help)
            show_usage
            ;;
        *)
            echo "Error: Invalid option"
            show_usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
```

**Make script executable:**
```bash
chmod +x /opt/automation-suite/scripts/backup_manager.sh
```

**📸 SCREENSHOT #4:** backup_manager.sh script in text editor
**📸 SCREENSHOT #5:** Script file permissions (`ls -l backup_manager.sh`)

#### Testing Backup Script:

```bash
# Create test data
sudo mkdir -p /home/testuser/documents
sudo bash -c 'for i in {1..50}; do echo "Test file $i" > /home/testuser/documents/test$i.txt; done'

# Run full backup
sudo /opt/automation-suite/scripts/backup_manager.sh --backup full

# List backups
/opt/automation-suite/scripts/backup_manager.sh --list

# Modify some files
echo "Modified content" | sudo tee /home/testuser/documents/test1.txt

# Run incremental backup
sudo /opt/automation-suite/scripts/backup_manager.sh --backup incremental

# Test restore
sudo /opt/automation-suite/scripts/backup_manager.sh --restore backup_20240130_120000 /tmp/restore_test
```

**📸 SCREENSHOT #6:** Full backup execution output
**📸 SCREENSHOT #7:** Backup directory structure showing compressed archives
**📸 SCREENSHOT #8:** Backup log file contents (`cat /var/log/automation-suite/backup_manager.log`)
**📸 SCREENSHOT #9:** List of available backups
**📸 SCREENSHOT #10:** Incremental backup execution
**📸 SCREENSHOT #11:** Restore operation success

---

### Phase 3: Script 2 - Log Analysis Tool (Week 3)

Create `/opt/automation-suite/scripts/log_analyzer.sh`:

```bash
#!/bin/bash

################################################################################
# Script Name: log_analyzer.sh
# Description: Intelligent log analysis with pattern detection and alerting
# Author: [Your Name]
# Version: 1.0.0
################################################################################

set -euo pipefail

# Configuration
LOG_FILE="/var/log/automation-suite/log_analyzer.log"
REPORT_DIR="/opt/automation-suite/reports"
ALERT_THRESHOLD=10
EMAIL_RECIPIENT="admin@example.com"

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Logs to analyze
SYSLOG="/var/log/syslog"
AUTH_LOG="/var/log/auth.log"
APACHE_ERROR="/var/log/apache2/error.log"

################################################################################
# Logging
################################################################################

log_msg() {
    local level="$1"
    shift
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $*" | tee -a "$LOG_FILE"
}

################################################################################
# Analysis Functions
################################################################################

analyze_system_errors() {
    log_msg "INFO" "Analyzing system errors"
    
    local error_count=$(grep -i "error" "$SYSLOG" 2>/dev/null | wc -l)
    local warning_count=$(grep -i "warning" "$SYSLOG" 2>/dev/null | wc -l)
    
    echo -e "\n${YELLOW}System Error Analysis:${NC}"
    echo "Total Errors: $error_count"
    echo "Total Warnings: $warning_count"
    
    if [[ $error_count -gt $ALERT_THRESHOLD ]]; then
        send_alert "High number of system errors detected: $error_count"
    fi
    
    # Top error messages
    echo -e "\nTop 10 Error Messages:"
    grep -i "error" "$SYSLOG" 2>/dev/null | \
        awk '{$1=$2=$3=""; print $0}' | \
        sort | uniq -c | sort -rn | head -10
}

analyze_failed_logins() {
    log_msg "INFO" "Analyzing failed login attempts"
    
    local failed_ssh=$(grep "Failed password" "$AUTH_LOG" 2>/dev/null | wc -l)
    local failed_sudo=$(grep "incorrect password" "$AUTH_LOG" 2>/dev/null | wc -l)
    
    echo -e "\n${YELLOW}Failed Login Analysis:${NC}"
    echo "Failed SSH logins: $failed_ssh"
    echo "Failed sudo attempts: $failed_sudo"
    
    if [[ $failed_ssh -gt 5 ]]; then
        echo -e "${RED}WARNING: Multiple failed SSH attempts detected${NC}"
        
        # List IPs with failed attempts
        echo -e "\nTop attacking IPs:"
        grep "Failed password" "$AUTH_LOG" 2>/dev/null | \
            grep -oP '\d+\.\d+\.\d+\.\d+' | \
            sort | uniq -c | sort -rn | head -10
    fi
}

analyze_disk_usage() {
    log_msg "INFO" "Analyzing disk usage"
    
    echo -e "\n${YELLOW}Disk Usage Analysis:${NC}"
    
    df -h | awk 'NR==1 || $5+0 > 80 {print $0}' | while read -r line; do
        if [[ $line == *"Use%"* ]]; then
            echo "$line"
        else
            usage=$(echo "$line" | awk '{print $5}' | tr -d '%')
            if [[ $usage -gt 90 ]]; then
                echo -e "${RED}$line${NC}"
                send_alert "Critical disk usage: $line"
            elif [[ $usage -gt 80 ]]; then
                echo -e "${YELLOW}$line${NC}"
            fi
        fi
    done
}

analyze_service_status() {
    log_msg "INFO" "Checking service status"
    
    echo -e "\n${YELLOW}Service Status:${NC}"
    
    local services=("ssh" "cron" "apache2" "nginx" "mysql")
    
    for service in "${services[@]}"; do
        if systemctl is-active --quiet "$service" 2>/dev/null; then
            echo -e "${GREEN}✓${NC} $service is running"
        else
            if systemctl list-unit-files | grep -q "^${service}.service"; then
                echo -e "${RED}✗${NC} $service is NOT running"
                send_alert "Service down: $service"
            fi
        fi
    done
}

generate_html_report() {
    local report_file="${REPORT_DIR}/log_analysis_$(date +%Y%m%d_%H%M%S).html"
    
    log_msg "INFO" "Generating HTML report: $report_file"
    
    cat > "$report_file" << 'HTMLEOF'
<!DOCTYPE html>
<html>
<head>
    <title>System Log Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        h1 { color: #333; border-bottom: 3px solid #007bff; padding-bottom: 10px; }
        h2 { color: #007bff; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #007bff; color: white; }
        tr:hover { background-color: #f5f5f5; }
        .error { color: #dc3545; font-weight: bold; }
        .warning { color: #ffc107; font-weight: bold; }
        .success { color: #28a745; font-weight: bold; }
        .metric { background: #e9ecef; padding: 15px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>System Log Analysis Report</h1>
        <p><strong>Generated:</strong> $(date)</p>
        <p><strong>Hostname:</strong> $(hostname)</p>
        
        <h2>System Errors</h2>
        <div class="metric">
            <strong>Total Errors:</strong> $(grep -i "error" "$SYSLOG" 2>/dev/null | wc -l)<br>
            <strong>Total Warnings:</strong> $(grep -i "warning" "$SYSLOG" 2>/dev/null | wc -l)
        </div>
        
        <h2>Failed Login Attempts</h2>
        <div class="metric">
            <strong>Failed SSH Logins:</strong> $(grep "Failed password" "$AUTH_LOG" 2>/dev/null | wc -l)<br>
            <strong>Failed Sudo Attempts:</strong> $(grep "incorrect password" "$AUTH_LOG" 2>/dev/null | wc -l)
        </div>
        
        <h2>Disk Usage</h2>
        <table>
            <tr>
                <th>Filesystem</th>
                <th>Size</th>
                <th>Used</th>
                <th>Available</th>
                <th>Use%</th>
                <th>Mounted On</th>
            </tr>
$(df -h | tail -n +2 | while read -r line; do
    echo "            <tr><td>$(echo $line | awk '{print $1}')</td>"
    echo "<td>$(echo $line | awk '{print $2}')</td>"
    echo "<td>$(echo $line | awk '{print $3}')</td>"
    echo "<td>$(echo $line | awk '{print $4}')</td>"
    echo "<td>$(echo $line | awk '{print $5}')</td>"
    echo "<td>$(echo $line | awk '{print $6}')</td></tr>"
done)
        </table>
    </div>
</body>
</html>
HTMLEOF
    
    log_msg "SUCCESS" "Report generated: $report_file"
    
    # Open in browser (if GUI available)
    which xdg-open > /dev/null 2>&1 && xdg-open "$report_file" &
}

send_alert() {
    local message="$1"
    
    log_msg "ALERT" "$message"
    
    echo "$message" | mail -s "System Alert - $(hostname)" "$EMAIL_RECIPIENT" 2>/dev/null || \
        log_msg "WARNING" "Failed to send email alert"
}

################################################################################
# Main
################################################################################

main() {
    echo -e "\n${GREEN}=== System Log Analyzer ===${NC}\n"
    
    analyze_system_errors
    analyze_failed_logins
    analyze_disk_usage
    analyze_service_status
    generate_html_report
    
    echo -e "\n${GREEN}Analysis complete!${NC}\n"
}

main "$@"
```

**Make executable:**
```bash
chmod +x /opt/automation-suite/scripts/log_analyzer.sh
```

**📸 SCREENSHOT #12:** log_analyzer.sh in editor
**📸 SCREENSHOT #13:** Log analyzer execution output
**📸 SCREENSHOT #14:** HTML report opened in browser
**📸 SCREENSHOT #15:** Failed login analysis showing IP addresses
**📸 SCREENSHOT #16:** Disk usage analysis with color coding

---

### Phase 4: Script 3 - Cron Job Manager (Week 4)

Create `/opt/automation-suite/scripts/cron_manager.sh` - Complete implementation similar to above scripts with functions to:
- List all cron jobs
- Add new cron jobs
- Remove cron jobs
- Monitor cron execution
- Generate cron audit reports

**📸 SCREENSHOT #17-22:** Cron manager implementation and testing

---

### Phase 5: Cron Integration & Automation (Week 5)

#### Set up automated execution:

```bash
# Edit crontab
crontab -e

# Add automated backup (daily at 2 AM)
0 2 * * * /opt/automation-suite/scripts/backup_manager.sh --backup full

# Add log analysis (every 6 hours)
0 */6 * * * /opt/automation-suite/scripts/log_analyzer.sh

# Add system maintenance (weekly on Sunday)
0 3 * * 0 /opt/automation-suite/scripts/system_maintenance.sh
```

**📸 SCREENSHOT #23:** Crontab configuration
**📸 SCREENSHOT #24:** Cron job execution logs
**📸 SCREENSHOT #25:** Email notification received

---

## Deliverables Checklist

### Required Scripts:
- [ ] backup_manager.sh (500+ lines)
- [ ] log_analyzer.sh (400+ lines)
- [ ] cron_manager.sh (300+ lines)
- [ ] system_maintenance.sh (400+ lines)
- [ ] Configuration files
- [ ] README.md with usage instructions

### Screenshots (Minimum 25):
All numbered screenshots above

### Documentation:
- [ ] Installation guide
- [ ] User manual
- [ ] Script documentation (comments)
- [ ] Troubleshooting guide

---

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Script Functionality | 35 |
| Error Handling | 15 |
| Code Quality | 15 |
| Documentation | 15 |
| Automation Setup | 10 |
| Testing | 10 |
| **Total** | **100** |

**Good luck with your Linux Automation Suite!** 🐧
