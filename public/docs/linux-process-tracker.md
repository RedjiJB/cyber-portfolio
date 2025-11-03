# Linux Process Tracker
**Course:** CST8207 - GNU/Linux System Support  
**Project Type:** System Monitoring Dashboard  
**Tools:** Bash, Linux System Tools (ps, top, htop, iotop, nethogs)

---

## Project Overview

Build a real-time system monitoring dashboard for Linux that provides comprehensive insights into system performance. This interactive Bash-based tool tracks CPU usage, memory consumption, disk I/O operations, network activity, and process-level details. Features include performance analysis, configurable alerting for resource thresholds, historical data tracking, and export capabilities.

### Learning Objectives
- Master Linux process management and monitoring
- Understand system resource utilization metrics
- Implement real-time data collection and analysis
- Create interactive terminal-based user interfaces
- Apply performance optimization techniques
- Develop system health monitoring solutions

---

## Project Requirements

### 1. Core Features

#### Real-Time Monitoring Dashboard
- **CPU Monitoring:**
  - Overall CPU utilization (%)
  - Per-core CPU usage
  - Top CPU-consuming processes
  - CPU load averages (1, 5, 15 minutes)
  
- **Memory Monitoring:**
  - Total RAM usage
  - Available memory
  - Swap usage
  - Memory-intensive processes
  - Cache and buffer statistics
  
- **Disk I/O Monitoring:**
  - Read/write operations per second
  - Disk utilization percentage
  - I/O wait times
  - Top disk-using processes
  
- **Network Monitoring:**
  - Bandwidth usage (upload/download)
  - Active connections
  - Network-intensive processes
  - Packet statistics

#### Performance Analysis
- Historical trend analysis
- Resource usage graphs (ASCII-based)
- Performance bottleneck detection
- Resource prediction alerts

#### Alert System
- Configurable thresholds for all metrics
- Email/log alerts when thresholds exceeded
- Color-coded warnings in dashboard
- Alert history tracking

---

## Implementation Guide

### Phase 1: Environment Setup & Core Structure (Week 1)

#### Required Tools Installation:

```bash
# Update package lists
sudo apt update

# Install required tools
sudo apt install -y sysstat iotop nethogs bc mailutils

# Verify installations
which iostat mpstat sar bc

# Check kernel modules
lsmod | grep -i netfilter
```

**📸 SCREENSHOT #1:** Tool installation success
**📸 SCREENSHOT #2:** Verification of installed monitoring tools

#### Create Project Structure:

```bash
# Create directory structure
sudo mkdir -p /opt/process-tracker/{bin,config,data,logs,reports}
sudo chown $USER:$USER /opt/process-tracker -R

# Create directories
mkdir -p /opt/process-tracker/{bin,config,data,logs,reports}
```

**📸 SCREENSHOT #3:** Project directory structure (`tree /opt/process-tracker`)

---

### Phase 2: Core Monitoring Script Development (Week 2)

Create `/opt/process-tracker/bin/process_tracker.sh`:

```bash
#!/bin/bash

################################################################################
# Script Name: process_tracker.sh
# Description: Real-time Linux system monitoring dashboard
# Author: [Your Name]
# Version: 2.0.0
################################################################################

set -euo pipefail

# Global Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/../config/tracker.conf"
DATA_DIR="${SCRIPT_DIR}/../data"
LOG_FILE="${SCRIPT_DIR}/../logs/tracker.log"
REFRESH_RATE=2

# Color Codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Alert Thresholds (default)
CPU_THRESHOLD=80
MEM_THRESHOLD=85
DISK_THRESHOLD=90
LOAD_THRESHOLD=4.0

################################################################################
# Initialization
################################################################################

init_tracker() {
    # Create data directory
    mkdir -p "$DATA_DIR"
    
    # Load configuration
    if [[ -f "$CONFIG_FILE" ]]; then
        source "$CONFIG_FILE"
    else
        create_default_config
    fi
    
    # Initialize data files
    touch "$DATA_DIR/cpu_history.dat"
    touch "$DATA_DIR/mem_history.dat"
    touch "$DATA_DIR/disk_history.dat"
    
    # Clear screen
    clear
}

create_default_config() {
    cat > "$CONFIG_FILE" << 'EOF'
# Process Tracker Configuration

# Alert Thresholds
CPU_THRESHOLD=80
MEM_THRESHOLD=85
DISK_THRESHOLD=90
LOAD_THRESHOLD=4.0
NETWORK_THRESHOLD=1000  # KB/s

# Email Alerts
EMAIL_ENABLED=true
EMAIL_RECIPIENT="admin@example.com"

# Data Retention (days)
DATA_RETENTION=30

# Refresh Rate (seconds)
REFRESH_RATE=2
EOF
    chmod 600 "$CONFIG_FILE"
}

################################################################################
# System Information Functions
################################################################################

get_cpu_usage() {
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    echo "$cpu_usage"
}

get_cpu_per_core() {
    mpstat -P ALL 1 1 | grep -E "Average.*[0-9]" | awk '{printf "%2d: %5.1f%%\n", $2, 100-$NF}'
}

get_memory_usage() {
    free -m | awk 'NR==2{printf "%.1f", $3*100/$2}'
}

get_memory_details() {
    free -h | awk 'NR==2{printf "Used: %s / Total: %s (%.1f%%)", $3, $2, $3*100/$2}'
}

get_swap_usage() {
    free -m | awk 'NR==3{if($2>0) printf "%.1f", $3*100/$2; else print "0"}'
}

get_disk_usage() {
    df -h / | awk 'NR==2{print $5}' | tr -d '%'
}

get_disk_io() {
    iostat -dx 1 2 | tail -n +4 | head -5 | \
        awk '{printf "%-10s R: %6.1f MB/s W: %6.1f MB/s\n", $1, $6/1024, $7/1024}'
}

get_load_average() {
    uptime | awk -F'load average:' '{print $2}' | awk '{print $1, $2, $3}' | tr -d ','
}

get_uptime() {
    uptime -p | sed 's/up //'
}

get_network_stats() {
    # Get network interface stats
    local interface=$(ip route | grep default | awk '{print $5}' | head -1)
    
    if [[ -n "$interface" ]]; then
        local rx_bytes1=$(cat /sys/class/net/$interface/statistics/rx_bytes)
        local tx_bytes1=$(cat /sys/class/net/$interface/statistics/tx_bytes)
        
        sleep 1
        
        local rx_bytes2=$(cat /sys/class/net/$interface/statistics/rx_bytes)
        local tx_bytes2=$(cat /sys/class/net/$interface/statistics/tx_bytes)
        
        local rx_rate=$(( (rx_bytes2 - rx_bytes1) / 1024 ))
        local tx_rate=$(( (tx_bytes2 - tx_bytes1) / 1024 ))
        
        echo "↓ ${rx_rate} KB/s  ↑ ${tx_rate} KB/s"
    else
        echo "N/A"
    fi
}

################################################################################
# Process Information Functions
################################################################################

get_top_cpu_processes() {
    local count=${1:-10}
    
    ps aux --sort=-%cpu | head -n $((count + 1)) | tail -n +2 | \
        awk '{printf "%-8s %5s%% %5s%% %s\n", $1, $3, $4, $11}'
}

get_top_memory_processes() {
    local count=${1:-10}
    
    ps aux --sort=-%mem | head -n $((count + 1)) | tail -n +2 | \
        awk '{printf "%-8s %5s%% %5s%% %s\n", $1, $3, $4, $11}'
}

get_process_count() {
    ps aux | wc -l
}

get_zombie_processes() {
    ps aux | awk '$8=="Z"' | wc -l
}

################################################################################
# Visualization Functions
################################################################################

draw_header() {
    local hostname=$(hostname)
    local kernel=$(uname -r)
    local uptime=$(get_uptime)
    
    echo -e "${BOLD}${CYAN}╔═══════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BOLD}${CYAN}║${WHITE}                    LINUX PROCESS TRACKER v2.0                             ${CYAN}║${NC}"
    echo -e "${BOLD}${CYAN}╠═══════════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${CYAN}║${NC} Hostname: ${YELLOW}$hostname${NC}                                                       ${CYAN}║${NC}"
    echo -e "${CYAN}║${NC} Kernel: ${YELLOW}$kernel${NC}                                                          ${CYAN}║${NC}"
    echo -e "${CYAN}║${NC} Uptime: ${GREEN}$uptime${NC}                                                           ${CYAN}║${NC}"
    echo -e "${BOLD}${CYAN}╚═══════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

draw_progress_bar() {
    local value=$1
    local max=$2
    local width=50
    local percentage=$(echo "scale=1; ($value/$max)*100" | bc)
    local filled=$(echo "scale=0; ($value/$max)*$width" | bc)
    
    # Determine color based on percentage
    local color=$GREEN
    if (( $(echo "$percentage > 80" | bc -l) )); then
        color=$RED
    elif (( $(echo "$percentage > 60" | bc -l) )); then
        color=$YELLOW
    fi
    
    # Draw bar
    printf "${color}["
    for ((i=0; i<width; i++)); do
        if (( i < filled )); then
            printf "█"
        else
            printf " "
        fi
    done
    printf "]${NC} %5.1f%%\n" "$percentage"
}

draw_cpu_section() {
    local cpu_usage=$(get_cpu_usage)
    local load_avg=$(get_load_average)
    
    echo -e "${BOLD}${BLUE}┌─ CPU Usage${NC}"
    echo -e "${BLUE}│${NC}"
    echo -ne "${BLUE}│${NC} Overall: "
    draw_progress_bar "$cpu_usage" 100
    
    echo -e "${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${BOLD}Per Core:${NC}"
    
    get_cpu_per_core | while read -r line; do
        echo -e "${BLUE}│${NC}   $line"
    done
    
    echo -e "${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} Load Average: ${YELLOW}$load_avg${NC}"
    echo -e "${BLUE}└────────────────────────────────────────${NC}"
    echo ""
    
    # Alert check
    if (( $(echo "$cpu_usage > $CPU_THRESHOLD" | bc -l) )); then
        send_alert "CPU" "CPU usage is ${cpu_usage}% (threshold: ${CPU_THRESHOLD}%)"
    fi
}

draw_memory_section() {
    local mem_usage=$(get_memory_usage)
    local mem_details=$(get_memory_details)
    local swap_usage=$(get_swap_usage)
    
    echo -e "${BOLD}${MAGENTA}┌─ Memory Usage${NC}"
    echo -e "${MAGENTA}│${NC}"
    echo -ne "${MAGENTA}│${NC} RAM: "
    draw_progress_bar "$mem_usage" 100
    
    echo -e "${MAGENTA}│${NC} $mem_details"
    echo -e "${MAGENTA}│${NC}"
    echo -ne "${MAGENTA}│${NC} Swap: "
    draw_progress_bar "$swap_usage" 100
    
    echo -e "${MAGENTA}└────────────────────────────────────────${NC}"
    echo ""
    
    # Alert check
    if (( $(echo "$mem_usage > $MEM_THRESHOLD" | bc -l) )); then
        send_alert "MEMORY" "Memory usage is ${mem_usage}% (threshold: ${MEM_THRESHOLD}%)"
    fi
}

draw_disk_section() {
    local disk_usage=$(get_disk_usage)
    
    echo -e "${BOLD}${YELLOW}┌─ Disk Usage${NC}"
    echo -e "${YELLOW}│${NC}"
    echo -ne "${YELLOW}│${NC} Root (/): "
    draw_progress_bar "$disk_usage" 100
    
    echo -e "${YELLOW}│${NC}"
    echo -e "${YELLOW}│${NC} ${BOLD}I/O Activity:${NC}"
    get_disk_io | while read -r line; do
        echo -e "${YELLOW}│${NC}   $line"
    done
    
    echo -e "${YELLOW}└────────────────────────────────────────${NC}"
    echo ""
    
    # Alert check
    if (( disk_usage > DISK_THRESHOLD )); then
        send_alert "DISK" "Disk usage is ${disk_usage}% (threshold: ${DISK_THRESHOLD}%)"
    fi
}

draw_network_section() {
    local net_stats=$(get_network_stats)
    
    echo -e "${BOLD}${CYAN}┌─ Network Activity${NC}"
    echo -e "${CYAN}│${NC}"
    echo -e "${CYAN}│${NC} $net_stats"
    echo -e "${CYAN}│${NC}"
    echo -e "${CYAN}│${NC} Active Connections: $(netstat -an | grep ESTABLISHED | wc -l)"
    echo -e "${CYAN}└────────────────────────────────────────${NC}"
    echo ""
}

draw_process_section() {
    local process_count=$(get_process_count)
    local zombie_count=$(get_zombie_processes)
    
    echo -e "${BOLD}${GREEN}┌─ Top CPU Processes${NC}"
    echo -e "${GREEN}│${NC}"
    echo -e "${GREEN}│${NC} ${BOLD}USER     CPU%   MEM%  COMMAND${NC}"
    echo -e "${GREEN}│${NC} ${BOLD}────────────────────────────────────────${NC}"
    
    get_top_cpu_processes 5 | while read -r line; do
        echo -e "${GREEN}│${NC} $line"
    done
    
    echo -e "${GREEN}│${NC}"
    echo -e "${GREEN}│${NC} Total Processes: ${WHITE}$process_count${NC}"
    echo -e "${GREEN}│${NC} Zombie Processes: ${RED}$zombie_count${NC}"
    echo -e "${GREEN}└────────────────────────────────────────${NC}"
    echo ""
}

################################################################################
# Data Logging
################################################################################

log_metrics() {
    local timestamp=$(date +%s)
    local cpu=$(get_cpu_usage)
    local mem=$(get_memory_usage)
    local disk=$(get_disk_usage)
    
    # Append to history files
    echo "$timestamp $cpu" >> "$DATA_DIR/cpu_history.dat"
    echo "$timestamp $mem" >> "$DATA_DIR/mem_history.dat"
    echo "$timestamp $disk" >> "$DATA_DIR/disk_history.dat"
    
    # Clean old data (keep last 30 days)
    local cutoff=$(date -d "30 days ago" +%s)
    
    for file in cpu_history.dat mem_history.dat disk_history.dat; do
        local filepath="$DATA_DIR/$file"
        awk -v cutoff="$cutoff" '$1 > cutoff' "$filepath" > "${filepath}.tmp"
        mv "${filepath}.tmp" "$filepath"
    done
}

################################################################################
# Alerting
################################################################################

send_alert() {
    local alert_type="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Log alert
    echo "[$timestamp] ALERT: $alert_type - $message" >> "$LOG_FILE"
    
    # Send email if enabled
    if [[ "$EMAIL_ENABLED" == "true" ]]; then
        echo "$message" | mail -s "System Alert: $alert_type" "$EMAIL_RECIPIENT" 2>/dev/null
    fi
}

################################################################################
# Reporting
################################################################################

generate_report() {
    local report_file="${SCRIPT_DIR}/../reports/system_report_$(date +%Y%m%d_%H%M%S).txt"
    
    {
        echo "=========================================="
        echo "SYSTEM PERFORMANCE REPORT"
        echo "Generated: $(date)"
        echo "=========================================="
        echo ""
        echo "CPU Usage: $(get_cpu_usage)%"
        echo "Memory Usage: $(get_memory_usage)%"
        echo "Disk Usage: $(get_disk_usage)%"
        echo "Load Average: $(get_load_average)"
        echo "Uptime: $(get_uptime)"
        echo ""
        echo "Top 10 CPU Processes:"
        echo "----------------------------------------"
        get_top_cpu_processes 10
        echo ""
        echo "Top 10 Memory Processes:"
        echo "----------------------------------------"
        get_top_memory_processes 10
    } > "$report_file"
    
    echo -e "${GREEN}Report generated: $report_file${NC}"
}

################################################################################
# Main Dashboard Loop
################################################################################

run_dashboard() {
    init_tracker
    
    # Trap Ctrl+C
    trap 'clear; exit 0' INT TERM
    
    while true; do
        clear
        
        draw_header
        draw_cpu_section
        draw_memory_section
        draw_disk_section
        draw_network_section
        draw_process_section
        
        # Log metrics
        log_metrics
        
        # Display refresh info
        echo -e "${CYAN}Press Ctrl+C to exit | Refreshing in ${REFRESH_RATE}s...${NC}"
        
        sleep "$REFRESH_RATE"
    done
}

################################################################################
# CLI Interface
################################################################################

show_usage() {
    cat << EOF
Usage: $0 [OPTION]

Linux Process Tracker - Real-time system monitoring

OPTIONS:
    -d, --dashboard         Run interactive dashboard (default)
    -r, --report            Generate system report
    -h, --history TYPE      Show historical data (cpu|mem|disk)
    -a, --alerts            Show alert history
    --help                  Show this help message

EXAMPLES:
    $0                      # Run interactive dashboard
    $0 --report             # Generate report
    $0 --history cpu        # Show CPU history
    $0 --alerts             # Show alerts

EOF
}

show_history() {
    local type="$1"
    local file="$DATA_DIR/${type}_history.dat"
    
    if [[ ! -f "$file" ]]; then
        echo "No historical data found for $type"
        return 1
    fi
    
    echo "Last 24 hours of $type usage:"
    echo "=============================="
    
    local cutoff=$(date -d "24 hours ago" +%s)
    awk -v cutoff="$cutoff" '$1 > cutoff {print strftime("%Y-%m-%d %H:%M:%S", $1), $2"%"}' "$file"
}

show_alerts() {
    if [[ ! -f "$LOG_FILE" ]]; then
        echo "No alerts found"
        return
    fi
    
    echo "Recent Alerts (last 100):"
    echo "========================="
    grep "ALERT" "$LOG_FILE" | tail -100
}

################################################################################
# Main
################################################################################

main() {
    case "${1:-}" in
        -d|--dashboard|"")
            run_dashboard
            ;;
        -r|--report)
            generate_report
            ;;
        -h|--history)
            if [[ -z "${2:-}" ]]; then
                echo "Error: Specify history type (cpu|mem|disk)"
                exit 1
            fi
            show_history "$2"
            ;;
        -a|--alerts)
            show_alerts
            ;;
        --help)
            show_usage
            ;;
        *)
            echo "Error: Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
}

main "$@"
```

**Make executable:**
```bash
chmod +x /opt/process-tracker/bin/process_tracker.sh
```

**📸 SCREENSHOT #4:** process_tracker.sh in text editor (full code view)
**📸 SCREENSHOT #5:** Script file permissions and size

---

### Phase 3: Testing & Screenshots (Week 3-4)

#### Test Dashboard:

```bash
# Run dashboard
/opt/process-tracker/bin/process_tracker.sh
```

**📸 SCREENSHOT #6:** Full dashboard view showing all sections
**📸 SCREENSHOT #7:** CPU section with per-core usage and progress bars
**📸 SCREENSHOT #8:** Memory section showing RAM and swap usage
**📸 SCREENSHOT #9:** Disk section with I/O statistics
**📸 SCREENSHOT #10:** Network activity display
**📸 SCREENSHOT #11:** Top processes section

#### Generate Stress for Testing:

```bash
# Install stress tool
sudo apt install stress

# Generate CPU stress (all cores, 30 seconds)
stress --cpu 4 --timeout 30s &

# While stress is running, capture dashboard
/opt/process-tracker/bin/process_tracker.sh
```

**📸 SCREENSHOT #12:** Dashboard during high CPU load (red progress bars)
**📸 SCREENSHOT #13:** Stress process appearing in top processes

#### Test Memory Stress:

```bash
# Memory stress (1GB for 30 seconds)
stress --vm 1 --vm-bytes 1G --timeout 30s &

# Capture dashboard
```

**📸 SCREENSHOT #14:** Dashboard during high memory usage
**📸 SCREENSHOT #15:** Memory alerts in log file

#### Test Reporting:

```bash
# Generate report
/opt/process-tracker/bin/process_tracker.sh --report

# View report
cat /opt/process-tracker/reports/system_report_*.txt
```

**📸 SCREENSHOT #16:** Generated report file
**📸 SCREENSHOT #17:** Report contents showing all metrics

#### Test Historical Data:

```bash
# Let tracker run for a while to collect data
# Then view history

/opt/process-tracker/bin/process_tracker.sh --history cpu
/opt/process-tracker/bin/process_tracker.sh --history mem
/opt/process-tracker/bin/process_tracker.sh --history disk
```

**📸 SCREENSHOT #18:** CPU usage history over 24 hours
**📸 SCREENSHOT #19:** Memory usage history
**📸 SCREENSHOT #20:** Disk usage history

#### Test Alert System:

```bash
# Trigger alerts by creating stress
# View alerts

/opt/process-tracker/bin/process_tracker.sh --alerts
```

**📸 SCREENSHOT #21:** Alert history showing threshold violations
**📸 SCREENSHOT #22:** Email alert received (if configured)

---

### Phase 4: Advanced Features & Documentation (Week 5)

#### Add Export Functionality:

Create `/opt/process-tracker/bin/export_data.sh`:

```bash
#!/bin/bash

# Export metrics to CSV for analysis

EXPORT_DIR="/opt/process-tracker/exports"
mkdir -p "$EXPORT_DIR"

# Export CPU data
echo "timestamp,cpu_usage" > "$EXPORT_DIR/cpu_export.csv"
awk '{print $1","$2}' /opt/process-tracker/data/cpu_history.dat >> "$EXPORT_DIR/cpu_export.csv"

# Export Memory data
echo "timestamp,mem_usage" > "$EXPORT_DIR/mem_export.csv"
awk '{print $1","$2}' /opt/process-tracker/data/mem_history.dat >> "$EXPORT_DIR/mem_export.csv"

echo "Data exported to $EXPORT_DIR"
```

**📸 SCREENSHOT #23:** CSV export files
**📸 SCREENSHOT #24:** CSV opened in LibreOffice Calc/Excel

#### Create Automated Monitoring:

```bash
# Add to crontab for continuous monitoring
crontab -e

# Add entry to run every 5 minutes and log data
*/5 * * * * /opt/process-tracker/bin/process_tracker.sh --report > /dev/null 2>&1
```

**📸 SCREENSHOT #25:** Crontab configuration for automated monitoring

---

## Deliverables Checklist

### Required Files:
- [ ] process_tracker.sh (800+ lines)
- [ ] export_data.sh
- [ ] Configuration file
- [ ] README.md with usage guide
- [ ] Documentation PDF (15-20 pages)

### Screenshots Required (Minimum 25):
All screenshots numbered above

### Documentation:
- [ ] User manual
- [ ] Installation guide
- [ ] Configuration guide
- [ ] Troubleshooting guide
- [ ] Code documentation (inline comments)

---

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| **Functionality** | 35 | All features work correctly, accurate metrics |
| **User Interface** | 15 | Clear, colorful, well-organized dashboard |
| **Code Quality** | 15 | Clean code, proper structure, comments |
| **Alert System** | 10 | Proper threshold detection and notifications |
| **Documentation** | 15 | Comprehensive user and technical docs |
| **Testing** | 10 | Thorough testing with evidence |
| **Total** | **100** | |

---

## Advanced Challenges (Optional Bonus)

1. **Add ASCII graphs** for historical data visualization
2. **Implement process filtering** by user or command
3. **Add process management** (kill, nice, renice)
4. **Create web-based dashboard** using CGI or simple HTTP server
5. **Add container monitoring** (Docker/Podman stats)
6. **Implement predictive alerts** based on trends

---

## Tips for Success

### Best Practices:
- Test on multiple Linux distributions
- Use `tput` for better terminal control
- Implement graceful error handling
- Validate all numeric calculations
- Use consistent formatting throughout

### Common Pitfalls:
- Not handling terminal resize events
- Hardcoded paths instead of relative paths
- Missing error checks for missing tools
- Incorrect color code resets
- Division by zero in calculations

---

## Submission Format

```
LastName_FirstName_ProcessTracker/
├── bin/
│   ├── process_tracker.sh
│   └── export_data.sh
├── config/
│   └── tracker.conf
├── data/
├── docs/
│   ├── UserManual.pdf
│   ├── InstallationGuide.pdf
│   └── TechnicalDocumentation.pdf
├── screenshots/
│   └── [All 25+ screenshots]
├── exports/
└── README.md
```

**Good luck with your Linux Process Tracker project!** 📊🐧
