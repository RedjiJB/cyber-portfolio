# Linux System Support - Study Plans

14-week study schedule and exam preparation for CST8207.

## Study Schedule

### Week 1-2: Command Line Mastery
- [ ] Practice all basic commands daily (ls, cd, cp, mv, rm, mkdir)
- [ ] Read man pages for each command
- [ ] Create personal command cheat sheet
- [ ] Set up Linux VM (Ubuntu or CentOS)
- [ ] Complete Lab 1

**Daily Practice (15 min):**
```bash
# Navigation drill
cd /var/log && ls -lah && cd -
# File manipulation drill
mkdir test && touch test/file{1..10}.txt && rm -rf test
```

---

### Week 3: File Permissions Deep Dive
- [ ] Master chmod numeric and symbolic notation
- [ ] Understand umask and default permissions
- [ ] Practice chown and chgrp
- [ ] Study SUID, SGID, and sticky bit
- [ ] Complete Lab 2

**Permission Practice:**
Create permission scenarios and solve:
- Web server needs read access to `/var/www`
- Scripts in `/usr/local/bin` need execute
- Shared directory where users can't delete each other's files

---

### Week 4-5: Pipes and Redirection
- [ ] Practice 20 different pipe combinations
- [ ] Learn grep, sort, uniq, wc, head, tail, cut
- [ ] Study redirection (>, >>, <, 2>, &>)
- [ ] Complete Lab 3

**Daily Chain Exercise:**
```bash
# Find largest files
du -ah /home | sort -rh | head -10
# Count file types
ls -1 | grep -o '\.[^.]*$' | sort | uniq -c
```

---

### Week 6-7: User & Process Management
- [ ] Practice user creation and deletion
- [ ] Study /etc/passwd and /etc/shadow structure
- [ ] Master ps, top, kill, nice commands
- [ ] Learn bg, fg, jobs for job control
- [ ] Complete Lab 4

**Process Practice:**
- Find processes using most CPU: `ps aux --sort=-%cpu | head`
- Kill all processes by name: `killall process_name`
- Monitor system: `top`, `htop`

---

### Week 8-9: Shell Scripting
- [ ] Write 5 practical scripts
- [ ] Study variables, conditionals, loops, functions
- [ ] Learn command substitution and arrays
- [ ] Practice script debugging with `set -x`
- [ ] Complete Lab 5

**Script Challenges:**
1. Automated backup script
2. System health checker
3. User account creator
4. Log analyzer
5. File organizer

---

### Week 10-11: Regular Expressions & Text Processing
- [ ] Master basic regex patterns
- [ ] Practice grep with complex patterns
- [ ] Learn sed for find/replace
- [ ] Master awk for column processing
- [ ] Complete Lab 6

**Regex Exercises:**
- Match IP addresses
- Extract email addresses from text
- Parse log files
- Clean CSV data

---

### Week 12-13: Services & Automation
- [ ] Study systemd service management
- [ ] Create custom systemd service
- [ ] Master crontab syntax
- [ ] Set up automated tasks
- [ ] Learn journalctl for logs

**Automation Projects:**
- Daily backup cron job
- Weekly system update script
- Monitoring with alerts
- Log rotation

---

### Week 14: Networking & Security
- [ ] Master ip, nmcli commands
- [ ] Configure SSH keys
- [ ] Set up firewall rules (ufw/firewalld)
- [ ] Practice remote administration
- [ ] Complete final lab

---

## Exam Preparation

### Midterm (Week 7)
**Topics:**
- Commands and file system navigation (20%)
- File permissions and ownership (25%)
- Pipes and redirection (20%)
- User management (20%)
- Basic scripting (15%)

**Study Strategy:**
- Create flashcards for all commands
- Practice permission calculations
- Write 10 pipe chains from memory
- Complete practice exam

---

### Final Exam (Week 14)
**Comprehensive Review:**
- [ ] All commands and their options
- [ ] Shell scripting syntax
- [ ] Regular expressions
- [ ] System administration tasks
- [ ] Service management

**Practical Focus:**
- Can you write a backup script from scratch?
- Can you troubleshoot permission denied errors?
- Can you analyze logs with grep/awk/sed?
- Can you configure a service with systemd?

---

## Daily Practice Routine

**Morning (10 min):**
```bash
# Command drill
man -k . | shuf | head -1 | awk '{print $1}' | xargs man
```

**Evening (15 min):**
- Write one script solving a real problem
- Document it on GitHub
- Add it to your automation toolkit

---

## Resources

**Books:**
- "The Linux Command Line" by William Shotts
- "Linux Pocket Guide" by Daniel Barrett

**Online:**
- https://explainshell.com - Decode commands
- https://regex101.com - Test regex patterns
- https://linuxjourney.com - Interactive lessons

**Practice:**
- https://overthewire.org/wargames/bandit/ - Command-line challenges
- https://cmdchallenge.com - Shell challenges

---

## Portfolio Integration

**GitHub Repository Structure:**
```
linux-automation-toolkit/
├── backup/
│   └── automated-backup.sh
├── monitoring/
│   └── system-health.sh
├── user-management/
│   └── bulk-user-creator.sh
└── log-analysis/
    └── parse-apache-logs.sh
```

**Document Each Script:**
- Purpose
- Usage
- Dependencies
- Example output

This becomes your **Linux portfolio** for co-op applications!
