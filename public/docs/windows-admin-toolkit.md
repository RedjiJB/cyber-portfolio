# Windows Admin Toolkit
**Course:** CST8202 - Windows Desktop Support  
**Project Type:** PowerShell Automation Development  
**Tools:** PowerShell ISE/VS Code, Windows Server 2019/2022, Active Directory, BitLocker

---

## Project Overview

Develop a comprehensive PowerShell automation toolkit designed for Windows system administrators. This project includes modules for user account management, automated backup systems, BitLocker encryption automation, and system health monitoring. The toolkit will feature error handling, logging, and professional documentation.

### Learning Objectives
- Master PowerShell scripting and automation techniques
- Understand Active Directory management through code
- Implement secure backup strategies
- Configure and manage BitLocker encryption
- Develop reusable, modular PowerShell functions
- Create professional technical documentation

---

## Project Requirements

### 1. Toolkit Components

#### Module 1: User Account Management (`UserManagement.psm1`)
**Features:**
- Bulk user creation from CSV file
- User account modification (password reset, group membership)
- User account deletion with archival
- Disabled account reporting
- Password expiration notifications
- Group membership audit

#### Module 2: Automated Backup System (`BackupManager.psm1`)
**Features:**
- Scheduled file/folder backups
- Incremental and full backup options
- Backup rotation policy (7 daily, 4 weekly, 12 monthly)
- Email notifications on success/failure
- Backup integrity verification
- Restore functionality

#### Module 3: BitLocker Management (`BitLockerTools.psm1`)
**Features:**
- Enable BitLocker on system drives
- Enable BitLocker on data drives
- Recovery key backup to Active Directory
- Recovery key export to file
- BitLocker status reporting
- Automatic encryption of new drives

#### Module 4: System Health Monitor (`HealthCheck.psm1`)
**Features:**
- Disk space monitoring with alerts
- Service status checking
- Event log error analysis
- Performance metrics collection
- HTML health report generation

---

## Implementation Guide

### Phase 1: Environment Setup (Week 1)

#### Required Software:
1. **Windows Server 2019/2022** (or Windows 10/11 Pro with Hyper-V)
2. **PowerShell 5.1 or PowerShell 7+**
3. **Visual Studio Code** with PowerShell extension
4. **Active Directory Domain Services** (can be lab environment)
5. **Git** for version control

#### Lab Environment Setup:

**Option 1: Physical/Virtual Lab**
- Windows Server for Domain Controller
- 2-3 Windows 10/11 clients
- Network connectivity between machines

**Option 2: Hyper-V Lab**
- Create Windows Server VM
- Create Windows 10/11 client VMs
- Configure virtual network

**📸 SCREENSHOT #1:** Lab environment topology (VMs or physical machines)
**📸 SCREENSHOT #2:** PowerShell version verification (`$PSVersionTable`)

#### Initial Setup Steps:

1. **Install Required PowerShell Modules:**
```powershell
# Check PowerShell version
$PSVersionTable

# Install Active Directory module (on DC)
Install-WindowsFeature RSAT-AD-PowerShell

# Install additional useful modules
Install-Module -Name PSWindowsUpdate
Install-Module -Name ImportExcel

# Verify module installation
Get-Module -ListAvailable
```

**📸 SCREENSHOT #3:** Installed PowerShell modules (`Get-Module -ListAvailable`)

2. **Set Up Development Environment:**
```powershell
# Create project structure
New-Item -Path "C:\AdminToolkit" -ItemType Directory
New-Item -Path "C:\AdminToolkit\Modules" -ItemType Directory
New-Item -Path "C:\AdminToolkit\Logs" -ItemType Directory
New-Item -Path "C:\AdminToolkit\Backups" -ItemType Directory
New-Item -Path "C:\AdminToolkit\Config" -ItemType Directory
New-Item -Path "C:\AdminToolkit\Reports" -ItemType Directory
New-Item -Path "C:\AdminToolkit\Tests" -ItemType Directory
```

**📸 SCREENSHOT #4:** Project folder structure

3. **Configure Execution Policy:**
```powershell
# Set execution policy (run as Administrator)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Verify
Get-ExecutionPolicy -List
```

**📸 SCREENSHOT #5:** Execution policy settings

---

### Phase 2: Module 1 - User Account Management (Week 2)

#### Development Steps:

**Step 1: Create Module File**
Create `C:\AdminToolkit\Modules\UserManagement.psm1`

```powershell
#Requires -Version 5.1
#Requires -Modules ActiveDirectory

<#
.SYNOPSIS
    User Account Management Module for Windows Active Directory
.DESCRIPTION
    Provides functions for bulk user creation, modification, deletion, and auditing
.AUTHOR
    [Your Name]
.VERSION
    1.0.0
#>

# Import required modules
Import-Module ActiveDirectory

# Global variables
$script:LogPath = "C:\AdminToolkit\Logs\UserManagement.log"
$script:ErrorActionPreference = "Stop"

#region Logging Functions

function Write-ToolkitLog {
    <#
    .SYNOPSIS
        Writes log entries to file and console
    #>
    param(
        [Parameter(Mandatory=$true)]
        [string]$Message,
        
        [Parameter(Mandatory=$false)]
        [ValidateSet('INFO','WARNING','ERROR','SUCCESS')]
        [string]$Level = 'INFO'
    )
    
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    
    # Write to file
    Add-Content -Path $script:LogPath -Value $LogEntry
    
    # Write to console with color
    switch ($Level) {
        'INFO'    { Write-Host $LogEntry -ForegroundColor Cyan }
        'WARNING' { Write-Host $LogEntry -ForegroundColor Yellow }
        'ERROR'   { Write-Host $LogEntry -ForegroundColor Red }
        'SUCCESS' { Write-Host $LogEntry -ForegroundColor Green }
    }
}

#endregion

#region User Creation Functions

function New-BulkADUsers {
    <#
    .SYNOPSIS
        Creates multiple AD users from CSV file
    .DESCRIPTION
        Reads user data from CSV and creates AD accounts with specified properties
    .PARAMETER CSVPath
        Path to CSV file containing user data
    .PARAMETER OU
        Organizational Unit where users will be created
    .EXAMPLE
        New-BulkADUsers -CSVPath "C:\users.csv" -OU "OU=Users,DC=domain,DC=com"
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [ValidateScript({Test-Path $_})]
        [string]$CSVPath,
        
        [Parameter(Mandatory=$true)]
        [string]$OU,
        
        [Parameter(Mandatory=$false)]
        [string]$DefaultPassword = "P@ssw0rd123!"
    )
    
    begin {
        Write-ToolkitLog "Starting bulk user creation from: $CSVPath" -Level INFO
        $SuccessCount = 0
        $FailCount = 0
    }
    
    process {
        try {
            # Import CSV
            $Users = Import-Csv -Path $CSVPath
            
            foreach ($User in $Users) {
                try {
                    # Validate required fields
                    if (-not $User.FirstName -or -not $User.LastName) {
                        Write-ToolkitLog "Skipping user: Missing FirstName or LastName" -Level WARNING
                        $FailCount++
                        continue
                    }
                    
                    # Generate username
                    $Username = ($User.FirstName.Substring(0,1) + $User.LastName).ToLower()
                    
                    # Create user parameters
                    $UserParams = @{
                        Name = "$($User.FirstName) $($User.LastName)"
                        GivenName = $User.FirstName
                        Surname = $User.LastName
                        SamAccountName = $Username
                        UserPrincipalName = "$Username@yourdomain.com"
                        Path = $OU
                        AccountPassword = (ConvertTo-SecureString $DefaultPassword -AsPlainText -Force)
                        Enabled = $true
                        ChangePasswordAtLogon = $true
                    }
                    
                    # Add optional fields if present
                    if ($User.Department) { $UserParams.Add('Department', $User.Department) }
                    if ($User.Title) { $UserParams.Add('Title', $User.Title) }
                    if ($User.Email) { $UserParams.Add('EmailAddress', $User.Email) }
                    
                    # Create user
                    New-ADUser @UserParams
                    Write-ToolkitLog "Created user: $Username" -Level SUCCESS
                    $SuccessCount++
                    
                } catch {
                    Write-ToolkitLog "Failed to create user: $($User.FirstName) $($User.LastName) - $($_.Exception.Message)" -Level ERROR
                    $FailCount++
                }
            }
        } catch {
            Write-ToolkitLog "Error reading CSV file: $($_.Exception.Message)" -Level ERROR
            throw
        }
    }
    
    end {
        Write-ToolkitLog "Bulk user creation complete. Success: $SuccessCount, Failed: $FailCount" -Level INFO
        
        return [PSCustomObject]@{
            Success = $SuccessCount
            Failed = $FailCount
            TotalProcessed = $SuccessCount + $FailCount
        }
    }
}

#endregion

#region User Modification Functions

function Reset-ADUserPasswordBulk {
    <#
    .SYNOPSIS
        Resets passwords for multiple users
    .PARAMETER UserList
        Array of usernames
    .PARAMETER NewPassword
        New password for users
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [string[]]$UserList,
        
        [Parameter(Mandatory=$true)]
        [SecureString]$NewPassword
    )
    
    foreach ($Username in $UserList) {
        try {
            Set-ADAccountPassword -Identity $Username -NewPassword $NewPassword -Reset
            Set-ADUser -Identity $Username -ChangePasswordAtLogon $true
            Write-ToolkitLog "Password reset for user: $Username" -Level SUCCESS
        } catch {
            Write-ToolkitLog "Failed to reset password for: $Username - $($_.Exception.Message)" -Level ERROR
        }
    }
}

#endregion

#region Reporting Functions

function Get-DisabledADUserReport {
    <#
    .SYNOPSIS
        Generates report of disabled user accounts
    .PARAMETER ExportPath
        Path to export CSV report
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$false)]
        [string]$ExportPath = "C:\AdminToolkit\Reports\DisabledUsers_$(Get-Date -Format 'yyyyMMdd').csv"
    )
    
    try {
        $DisabledUsers = Get-ADUser -Filter {Enabled -eq $false} -Properties * | 
            Select-Object Name, SamAccountName, LastLogonDate, WhenChanged, Department
        
        $DisabledUsers | Export-Csv -Path $ExportPath -NoTypeInformation
        
        Write-ToolkitLog "Disabled user report generated: $ExportPath" -Level SUCCESS
        Write-ToolkitLog "Total disabled accounts: $($DisabledUsers.Count)" -Level INFO
        
        return $DisabledUsers
    } catch {
        Write-ToolkitLog "Error generating report: $($_.Exception.Message)" -Level ERROR
        throw
    }
}

function Get-PasswordExpirationReport {
    <#
    .SYNOPSIS
        Generates report of users with passwords expiring soon
    .PARAMETER DaysToExpire
        Number of days to check for expiration
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$false)]
        [int]$DaysToExpire = 14
    )
    
    $Users = Get-ADUser -Filter {Enabled -eq $true -and PasswordNeverExpires -eq $false} -Properties PasswordLastSet, PasswordNeverExpires
    $ExpiringUsers = @()
    
    foreach ($User in $Users) {
        $PasswordAge = (Get-Date) - $User.PasswordLastSet
        $MaxPasswordAge = (Get-ADDefaultDomainPasswordPolicy).MaxPasswordAge
        $DaysUntilExpiration = ($MaxPasswordAge - $PasswordAge).Days
        
        if ($DaysUntilExpiration -le $DaysToExpire -and $DaysUntilExpiration -gt 0) {
            $ExpiringUsers += [PSCustomObject]@{
                Username = $User.SamAccountName
                Name = $User.Name
                PasswordLastSet = $User.PasswordLastSet
                DaysUntilExpiration = $DaysUntilExpiration
            }
        }
    }
    
    $ExportPath = "C:\AdminToolkit\Reports\PasswordExpiration_$(Get-Date -Format 'yyyyMMdd').csv"
    $ExpiringUsers | Export-Csv -Path $ExportPath -NoTypeInformation
    
    Write-ToolkitLog "Password expiration report generated: $ExportPath" -Level SUCCESS
    
    return $ExpiringUsers
}

#endregion

# Export functions
Export-ModuleMember -Function *
```

**📸 SCREENSHOT #6:** UserManagement.psm1 file in VS Code
**📸 SCREENSHOT #7:** Module structure in file explorer

**Step 2: Create Sample CSV File**
Create `C:\AdminToolkit\Config\users.csv`:

```csv
FirstName,LastName,Department,Title,Email
John,Doe,IT,Systems Administrator,jdoe@company.com
Jane,Smith,Sales,Sales Manager,jsmith@company.com
Michael,Johnson,HR,HR Coordinator,mjohnson@company.com
Emily,Brown,IT,Help Desk Technician,ebrown@company.com
```

**📸 SCREENSHOT #8:** Sample CSV file contents

**Step 3: Test User Creation**

```powershell
# Import module
Import-Module C:\AdminToolkit\Modules\UserManagement.psm1

# Test bulk user creation
$Result = New-BulkADUsers -CSVPath "C:\AdminToolkit\Config\users.csv" -OU "OU=Users,DC=yourdomain,DC=com"

# Display results
$Result

# Verify users were created
Get-ADUser -Filter * -SearchBase "OU=Users,DC=yourdomain,DC=com"
```

**📸 SCREENSHOT #9:** Bulk user creation execution and results
**📸 SCREENSHOT #10:** Created users in Active Directory Users and Computers
**📸 SCREENSHOT #11:** Log file showing user creation details

**Step 4: Test Reporting Functions**

```powershell
# Generate disabled user report
Get-DisabledADUserReport

# Generate password expiration report
Get-PasswordExpirationReport -DaysToExpire 30
```

**📸 SCREENSHOT #12:** Disabled users report (CSV opened in Excel)
**📸 SCREENSHOT #13:** Password expiration report

---

### Phase 3: Module 2 - Automated Backup System (Week 3)

Create `C:\AdminToolkit\Modules\BackupManager.psm1`

```powershell
#Requires -Version 5.1

<#
.SYNOPSIS
    Automated Backup Management Module
.DESCRIPTION
    Provides functions for automated file/folder backups with rotation and verification
#>

# Global variables
$script:LogPath = "C:\AdminToolkit\Logs\BackupManager.log"
$script:BackupBasePath = "C:\AdminToolkit\Backups"
$script:ConfigPath = "C:\AdminToolkit\Config\BackupConfig.json"

function Write-BackupLog {
    param(
        [string]$Message,
        [ValidateSet('INFO','WARNING','ERROR','SUCCESS')]
        [string]$Level = 'INFO'
    )
    
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    Add-Content -Path $script:LogPath -Value $LogEntry
    
    switch ($Level) {
        'ERROR'   { Write-Host $LogEntry -ForegroundColor Red }
        'WARNING' { Write-Host $LogEntry -ForegroundColor Yellow }
        'SUCCESS' { Write-Host $LogEntry -ForegroundColor Green }
        default   { Write-Host $LogEntry -ForegroundColor Cyan }
    }
}

function New-AutomatedBackup {
    <#
    .SYNOPSIS
        Creates backup of specified source path
    .PARAMETER SourcePath
        Path to backup
    .PARAMETER BackupType
        Type of backup: Full or Incremental
    .PARAMETER CompressionLevel
        Compression level: None, Fastest, Optimal
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [ValidateScript({Test-Path $_})]
        [string]$SourcePath,
        
        [Parameter(Mandatory=$false)]
        [ValidateSet('Full','Incremental')]
        [string]$BackupType = 'Full',
        
        [Parameter(Mandatory=$false)]
        [string]$DestinationPath = $script:BackupBasePath,
        
        [Parameter(Mandatory=$false)]
        [ValidateSet('None','Fastest','Optimal')]
        [string]$CompressionLevel = 'Optimal'
    )
    
    try {
        # Create backup folder structure
        $BackupDate = Get-Date -Format "yyyyMMdd_HHmmss"
        $SourceName = Split-Path -Path $SourcePath -Leaf
        $BackupFolder = Join-Path -Path $DestinationPath -ChildPath "$SourceName\_Backup_$BackupDate"
        
        Write-BackupLog "Starting $BackupType backup of: $SourcePath" -Level INFO
        
        # Create destination folder
        New-Item -Path $BackupFolder -ItemType Directory -Force | Out-Null
        
        if ($BackupType -eq 'Full') {
            # Full backup
            if ($CompressionLevel -ne 'None') {
                # Compressed backup
                $ZipPath = "$BackupFolder.zip"
                Compress-Archive -Path $SourcePath -DestinationPath $ZipPath -CompressionLevel $CompressionLevel
                Write-BackupLog "Compressed backup created: $ZipPath" -Level SUCCESS
                
                # Verify backup
                $VerifyResult = Test-BackupIntegrity -BackupPath $ZipPath
                if ($VerifyResult) {
                    Write-BackupLog "Backup integrity verified" -Level SUCCESS
                } else {
                    Write-BackupLog "Backup integrity check failed!" -Level ERROR
                }
            } else {
                # Uncompressed backup
                Copy-Item -Path $SourcePath -Destination $BackupFolder -Recurse -Force
                Write-BackupLog "Full backup completed: $BackupFolder" -Level SUCCESS
            }
        } else {
            # Incremental backup
            $LastBackup = Get-LatestBackup -SourcePath $SourcePath
            
            if ($LastBackup) {
                # Copy only changed files
                $ChangedFiles = Get-ChangedFiles -SourcePath $SourcePath -CompareDate $LastBackup.Date
                foreach ($File in $ChangedFiles) {
                    $RelativePath = $File.FullName.Replace($SourcePath, "")
                    $DestFile = Join-Path -Path $BackupFolder -ChildPath $RelativePath
                    $DestDir = Split-Path -Path $DestFile -Parent
                    
                    if (-not (Test-Path $DestDir)) {
                        New-Item -Path $DestDir -ItemType Directory -Force | Out-Null
                    }
                    
                    Copy-Item -Path $File.FullName -Destination $DestFile -Force
                }
                Write-BackupLog "Incremental backup completed: $($ChangedFiles.Count) files" -Level SUCCESS
            } else {
                Write-BackupLog "No previous backup found, performing full backup" -Level WARNING
                New-AutomatedBackup -SourcePath $SourcePath -BackupType Full -DestinationPath $DestinationPath
            }
        }
        
        # Apply retention policy
        Invoke-BackupRetention -SourcePath $SourcePath
        
        return $BackupFolder
        
    } catch {
        Write-BackupLog "Backup failed: $($_.Exception.Message)" -Level ERROR
        throw
    }
}

function Invoke-BackupRetention {
    <#
    .SYNOPSIS
        Applies retention policy to backups
    .DESCRIPTION
        Keeps 7 daily, 4 weekly, and 12 monthly backups
    #>
    param(
        [string]$SourcePath
    )
    
    try {
        $SourceName = Split-Path -Path $SourcePath -Leaf
        $BackupRoot = Join-Path -Path $script:BackupBasePath -ChildPath $SourceName
        
        if (-not (Test-Path $BackupRoot)) {
            return
        }
        
        $AllBackups = Get-ChildItem -Path $BackupRoot -Directory | Sort-Object CreationTime -Descending
        
        # Keep 7 daily backups
        $DailyBackups = $AllBackups | Where-Object {$_.CreationTime -gt (Get-Date).AddDays(-7)}
        
        # Keep 4 weekly backups
        $WeeklyBackups = $AllBackups | Where-Object {
            $_.CreationTime -gt (Get-Date).AddDays(-28) -and 
            $_.CreationTime.DayOfWeek -eq 'Sunday'
        } | Select-Object -First 4
        
        # Keep 12 monthly backups
        $MonthlyBackups = $AllBackups | Where-Object {
            $_.CreationTime -gt (Get-Date).AddMonths(-12) -and 
            $_.CreationTime.Day -eq 1
        } | Select-Object -First 12
        
        # Combine all backups to keep
        $KeepBackups = $DailyBackups + $WeeklyBackups + $MonthlyBackups | Select-Object -Unique
        
        # Delete old backups
        $DeletedCount = 0
        foreach ($Backup in $AllBackups) {
            if ($Backup.FullName -notin $KeepBackups.FullName) {
                Remove-Item -Path $Backup.FullName -Recurse -Force
                Write-BackupLog "Deleted old backup: $($Backup.Name)" -Level INFO
                $DeletedCount++
            }
        }
        
        Write-BackupLog "Retention policy applied. Deleted $DeletedCount old backups" -Level INFO
        
    } catch {
        Write-BackupLog "Error applying retention policy: $($_.Exception.Message)" -Level ERROR
    }
}

function Test-BackupIntegrity {
    <#
    .SYNOPSIS
        Verifies backup file integrity
    #>
    param(
        [string]$BackupPath
    )
    
    try {
        if ($BackupPath -match '\.zip$') {
            # Test ZIP file
            $TestResult = Test-Path -Path $BackupPath
            
            if ($TestResult) {
                # Try to open ZIP to verify it's not corrupted
                Add-Type -AssemblyName System.IO.Compression.FileSystem
                $zip = [System.IO.Compression.ZipFile]::OpenRead($BackupPath)
                $zip.Dispose()
                return $true
            }
        } else {
            # Test folder exists and has contents
            return (Test-Path -Path $BackupPath) -and ((Get-ChildItem -Path $BackupPath -Recurse).Count -gt 0)
        }
    } catch {
        Write-BackupLog "Integrity check failed: $($_.Exception.Message)" -Level ERROR
        return $false
    }
}

function Restore-BackupData {
    <#
    .SYNOPSIS
        Restores data from backup
    #>
    param(
        [Parameter(Mandatory=$true)]
        [string]$BackupPath,
        
        [Parameter(Mandatory=$true)]
        [string]$RestorePath
    )
    
    try {
        Write-BackupLog "Starting restore from: $BackupPath to $RestorePath" -Level INFO
        
        if ($BackupPath -match '\.zip$') {
            # Extract ZIP backup
            Expand-Archive -Path $BackupPath -DestinationPath $RestorePath -Force
        } else {
            # Copy folder backup
            Copy-Item -Path "$BackupPath\*" -Destination $RestorePath -Recurse -Force
        }
        
        Write-BackupLog "Restore completed successfully" -Level SUCCESS
        
    } catch {
        Write-BackupLog "Restore failed: $($_.Exception.Message)" -Level ERROR
        throw
    }
}

# Export functions
Export-ModuleMember -Function *
```

**📸 SCREENSHOT #14:** BackupManager.psm1 in VS Code

**Testing Backup Module:**

```powershell
# Import module
Import-Module C:\AdminToolkit\Modules\BackupManager.psm1 -Force

# Create test data
New-Item -Path "C:\TestData" -ItemType Directory -Force
1..100 | ForEach-Object {
    "Test content $_" | Out-File "C:\TestData\TestFile$_.txt"
}

# Perform full backup
New-AutomatedBackup -SourcePath "C:\TestData" -BackupType Full -CompressionLevel Optimal

# Modify some files
"Modified content" | Out-File "C:\TestData\TestFile1.txt"

# Perform incremental backup
New-AutomatedBackup -SourcePath "C:\TestData" -BackupType Incremental

# List all backups
Get-ChildItem C:\AdminToolkit\Backups\TestData -Recurse
```

**📸 SCREENSHOT #15:** Full backup execution
**📸 SCREENSHOT #16:** Backup folder structure showing full and incremental backups
**📸 SCREENSHOT #17:** Compressed backup file properties
**📸 SCREENSHOT #18:** Backup log file contents

---

### Phase 4: Module 3 - BitLocker Management (Week 4)

Create `C:\AdminToolkit\Modules\BitLockerTools.psm1`

```powershell
#Requires -Version 5.1
#Requires -RunAsAdministrator

<#
.SYNOPSIS
    BitLocker Drive Encryption Management Module
.DESCRIPTION
    Automates BitLocker encryption, recovery key management, and status reporting
#>

$script:LogPath = "C:\AdminToolkit\Logs\BitLocker.log"
$script:RecoveryKeyPath = "C:\AdminToolkit\RecoveryKeys"

function Write-BitLockerLog {
    param([string]$Message, [string]$Level = 'INFO')
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    Add-Content -Path $script:LogPath -Value $LogEntry
    
    switch ($Level) {
        'ERROR'   { Write-Host $LogEntry -ForegroundColor Red }
        'WARNING' { Write-Host $LogEntry -ForegroundColor Yellow }
        'SUCCESS' { Write-Host $LogEntry -ForegroundColor Green }
        default   { Write-Host $LogEntry -ForegroundColor Cyan }
    }
}

function Enable-BitLockerOnDrive {
    <#
    .SYNOPSIS
        Enables BitLocker encryption on specified drive
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [ValidatePattern('^[A-Z]:$')]
        [string]$DriveLetter,
        
        [Parameter(Mandatory=$false)]
        [ValidateSet('Password','TPM','TPMAndPIN','RecoveryPassword')]
        [string]$ProtectorType = 'RecoveryPassword',
        
        [Parameter(Mandatory=$false)]
        [ValidateSet('Aes128','Aes256','XtsAes128','XtsAes256')]
        [string]$EncryptionMethod = 'XtsAes256',
        
        [Parameter(Mandatory=$false)]
        [switch]$SkipHardwareTest
    )
    
    try {
        Write-BitLockerLog "Enabling BitLocker on drive $DriveLetter" -Level INFO
        
        # Check if BitLocker is already enabled
        $BLStatus = Get-BitLockerVolume -MountPoint $DriveLetter
        
        if ($BLStatus.ProtectionStatus -eq 'On') {
            Write-BitLockerLog "BitLocker is already enabled on $DriveLetter" -Level WARNING
            return
        }
        
        # Add key protector
        switch ($ProtectorType) {
            'RecoveryPassword' {
                $RecoveryKey = Add-BitLockerKeyProtector -MountPoint $DriveLetter `
                    -RecoveryPasswordProtector
                Write-BitLockerLog "Recovery password protector added" -Level SUCCESS
            }
            'TPM' {
                Add-BitLockerKeyProtector -MountPoint $DriveLetter -TpmProtector
                Write-BitLockerLog "TPM protector added" -Level SUCCESS
            }
            'TPMAndPIN' {
                $PIN = Read-Host "Enter PIN (4-20 digits)" -AsSecureString
                Add-BitLockerKeyProtector -MountPoint $DriveLetter `
                    -TpmAndPinProtector -Pin $PIN
                Write-BitLockerLog "TPM and PIN protector added" -Level SUCCESS
            }
        }
        
        # Enable BitLocker
        $EnableParams = @{
            MountPoint = $DriveLetter
            EncryptionMethod = $EncryptionMethod
            UsedSpaceOnly = $true
        }
        
        if ($SkipHardwareTest) {
            $EnableParams.Add('SkipHardwareTest', $true)
        }
        
        Enable-BitLocker @EnableParams
        
        Write-BitLockerLog "BitLocker encryption initiated on $DriveLetter" -Level SUCCESS
        
        # Backup recovery key
        Backup-BitLockerRecoveryKey -DriveLetter $DriveLetter
        
        # Return status
        return Get-BitLockerVolume -MountPoint $DriveLetter
        
    } catch {
        Write-BitLockerLog "Failed to enable BitLocker: $($_.Exception.Message)" -Level ERROR
        throw
    }
}

function Backup-BitLockerRecoveryKey {
    <#
    .SYNOPSIS
        Backs up BitLocker recovery key to file and Active Directory
    #>
    param(
        [Parameter(Mandatory=$true)]
        [string]$DriveLetter
    )
    
    try {
        # Get recovery password
        $BLV = Get-BitLockerVolume -MountPoint $DriveLetter
        $RecoveryProtector = $BLV.KeyProtector | Where-Object {$_.KeyProtectorType -eq 'RecoveryPassword'}
        
        if ($RecoveryProtector) {
            # Save to file
            $Filename = "$($env:COMPUTERNAME)_$($DriveLetter.Replace(':',''))_$(Get-Date -Format 'yyyyMMdd').txt"
            $FilePath = Join-Path -Path $script:RecoveryKeyPath -ChildPath $Filename
            
            New-Item -Path $script:RecoveryKeyPath -ItemType Directory -Force | Out-Null
            
            $RecoveryInfo = @"
Computer Name: $env:COMPUTERNAME
Drive: $DriveLetter
Date: $(Get-Date)
Recovery Key ID: $($RecoveryProtector.KeyProtectorId)
Recovery Password: $($RecoveryProtector.RecoveryPassword)
"@
            
            $RecoveryInfo | Out-File -FilePath $FilePath -Force
            
            # Set secure permissions on file
            $Acl = Get-Acl -Path $FilePath
            $Acl.SetAccessRuleProtection($true, $false)
            $AdminRule = New-Object System.Security.AccessControl.FileSystemAccessRule(
                "BUILTIN\Administrators", "FullControl", "Allow"
            )
            $Acl.AddAccessRule($AdminRule)
            Set-Acl -Path $FilePath -AclObject $Acl
            
            Write-BitLockerLog "Recovery key backed up to: $FilePath" -Level SUCCESS
            
            # Backup to Active Directory (if domain-joined)
            try {
                Backup-BitLockerKeyProtector -MountPoint $DriveLetter `
                    -KeyProtectorId $RecoveryProtector.KeyProtectorId
                Write-BitLockerLog "Recovery key backed up to Active Directory" -Level SUCCESS
            } catch {
                Write-BitLockerLog "Could not backup to AD: $($_.Exception.Message)" -Level WARNING
            }
        }
        
    } catch {
        Write-BitLockerLog "Error backing up recovery key: $($_.Exception.Message)" -Level ERROR
    }
}

function Get-BitLockerStatusReport {
    <#
    .SYNOPSIS
        Generates comprehensive BitLocker status report
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$false)]
        [string]$ExportPath = "C:\AdminToolkit\Reports\BitLockerStatus_$(Get-Date -Format 'yyyyMMdd').html"
    )
    
    try {
        $Volumes = Get-BitLockerVolume
        $Report = @()
        
        foreach ($Vol in $Volumes) {
            $Report += [PSCustomObject]@{
                DriveLetter = $Vol.MountPoint
                VolumeStatus = $Vol.VolumeStatus
                EncryptionPercentage = $Vol.EncryptionPercentage
                EncryptionMethod = $Vol.EncryptionMethod
                ProtectionStatus = $Vol.ProtectionStatus
                LockStatus = $Vol.LockStatus
                KeyProtectors = ($Vol.KeyProtector | ForEach-Object {$_.KeyProtectorType}) -join ', '
            }
        }
        
        # Generate HTML report
        $HTML = @"
<!DOCTYPE html>
<html>
<head>
    <title>BitLocker Status Report - $env:COMPUTERNAME</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #0066cc; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #0066cc; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        .protected { color: green; font-weight: bold; }
        .unprotected { color: red; font-weight: bold; }
    </style>
</head>
<body>
    <h1>BitLocker Status Report</h1>
    <p><strong>Computer:</strong> $env:COMPUTERNAME</p>
    <p><strong>Generated:</strong> $(Get-Date)</p>
    <table>
        <tr>
            <th>Drive</th>
            <th>Status</th>
            <th>Encryption %</th>
            <th>Method</th>
            <th>Protection</th>
            <th>Lock Status</th>
            <th>Key Protectors</th>
        </tr>
"@
        
        foreach ($Item in $Report) {
            $ProtectionClass = if ($Item.ProtectionStatus -eq 'On') { 'protected' } else { 'unprotected' }
            
            $HTML += @"
        <tr>
            <td>$($Item.DriveLetter)</td>
            <td>$($Item.VolumeStatus)</td>
            <td>$($Item.EncryptionPercentage)%</td>
            <td>$($Item.EncryptionMethod)</td>
            <td class="$ProtectionClass">$($Item.ProtectionStatus)</td>
            <td>$($Item.LockStatus)</td>
            <td>$($Item.KeyProtectors)</td>
        </tr>
"@
        }
        
        $HTML += @"
    </table>
</body>
</html>
"@
        
        $HTML | Out-File -FilePath $ExportPath -Encoding UTF8
        
        Write-BitLockerLog "BitLocker status report generated: $ExportPath" -Level SUCCESS
        
        # Open report in browser
        Start-Process $ExportPath
        
        return $Report
        
    } catch {
        Write-BitLockerLog "Error generating report: $($_.Exception.Message)" -Level ERROR
        throw
    }
}

# Export functions
Export-ModuleMember -Function *
```

**Testing BitLocker Module:**

```powershell
# Import module (must run as Administrator)
Import-Module C:\AdminToolkit\Modules\BitLockerTools.psm1 -Force

# Enable BitLocker on data drive (example: D:)
Enable-BitLockerOnDrive -DriveLetter "D:" -ProtectorType RecoveryPassword -SkipHardwareTest

# Check status
Get-BitLockerVolume -MountPoint "D:"

# Generate status report
Get-BitLockerStatusReport
```

**📸 SCREENSHOT #19:** BitLocker module loaded in PowerShell
**📸 SCREENSHOT #20:** BitLocker enablement in progress
**📸 SCREENSHOT #21:** BitLocker encryption status (Get-BitLockerVolume output)
**📸 SCREENSHOT #22:** Recovery key file in RecoveryKeys folder
**📸 SCREENSHOT #23:** HTML BitLocker status report (opened in browser)
**📸 SCREENSHOT #24:** BitLocker-encrypted drive in Windows Explorer

---

### Phase 5: Testing & Documentation (Week 5)

#### Comprehensive Testing:

**Create Test Script:**
`C:\AdminToolkit\Tests\RunAllTests.ps1`

```powershell
# Comprehensive toolkit testing script

Write-Host "====== Windows Admin Toolkit - Comprehensive Tests ======" -ForegroundColor Cyan
Write-Host ""

# Import all modules
Import-Module C:\AdminToolkit\Modules\UserManagement.psm1 -Force
Import-Module C:\AdminToolkit\Modules\BackupManager.psm1 -Force
Import-Module C:\AdminToolkit\Modules\BitLockerTools.psm1 -Force

# Test 1: User Management
Write-Host "[TEST 1] User Management Module" -ForegroundColor Yellow
try {
    # Create test users
    $TestResult = New-BulkADUsers -CSVPath "C:\AdminToolkit\Config\users.csv" -OU "OU=Users,DC=yourdomain,DC=com"
    Write-Host "✓ User creation: SUCCESS - $($TestResult.Success) users created" -ForegroundColor Green
} catch {
    Write-Host "✗ User creation: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Backup System
Write-Host "`n[TEST 2] Backup Manager Module" -ForegroundColor Yellow
try {
    # Perform backup
    $BackupResult = New-AutomatedBackup -SourcePath "C:\TestData" -BackupType Full
    Write-Host "✓ Backup creation: SUCCESS - $BackupResult" -ForegroundColor Green
} catch {
    Write-Host "✗ Backup creation: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: BitLocker
Write-Host "`n[TEST 3] BitLocker Tools Module" -ForegroundColor Yellow
try {
    # Generate status report
    Get-BitLockerStatusReport | Out-Null
    Write-Host "✓ BitLocker reporting: SUCCESS" -ForegroundColor Green
} catch {
    Write-Host "✗ BitLocker reporting: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n====== Testing Complete ======" -ForegroundColor Cyan
```

**📸 SCREENSHOT #25:** Complete test suite execution
**📸 SCREENSHOT #26:** All tests passing successfully

#### Create Documentation:

**User Guide:** `C:\AdminToolkit\Docs\UserGuide.md`
**Developer Guide:** `C:\AdminToolkit\Docs\DeveloperGuide.md`
**API Reference:** `C:\AdminToolkit\Docs\APIReference.md`

**📸 SCREENSHOT #27:** Documentation folder structure
**📸 SCREENSHOT #28:** User guide opened in Markdown viewer

---

## Deliverables Checklist

### Required Files:
- [ ] UserManagement.psm1 module
- [ ] BackupManager.psm1 module
- [ ] BitLockerTools.psm1 module
- [ ] HealthCheck.psm1 module (optional)
- [ ] Test scripts
- [ ] Configuration files
- [ ] Sample CSV files
- [ ] Complete documentation package
- [ ] PowerShell module manifest files (.psd1)

### Screenshots Required (Minimum 28):
All screenshots listed above in each phase

### Documentation:
- [ ] User Guide (15-20 pages)
- [ ] Developer/Technical Guide (20-30 pages)
- [ ] API Reference (10-15 pages)
- [ ] Installation Guide (5-10 pages)

---

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| **Module Functionality** | 30 | All modules work correctly, error handling |
| **Code Quality** | 20 | Clean code, comments, best practices |
| **Documentation** | 20 | Comprehensive, professional, clear |
| **Testing** | 15 | Thorough testing, test scripts, validation |
| **Error Handling** | 10 | Proper try/catch, logging, user feedback |
| **Innovation** | 5 | Additional features, creative solutions |
| **Total** | **100** | |

---

## Submission Format

```
LastName_FirstName_WindowsAdminToolkit/
├── Modules/
│   ├── UserManagement.psm1
│   ├── BackupManager.psm1
│   └── BitLockerTools.psm1
├── Tests/
│   └── RunAllTests.ps1
├── Config/
│   └── users.csv
├── Logs/
├── Docs/
│   ├── UserGuide.pdf
│   ├── DeveloperGuide.pdf
│   └── APIReference.pdf
├── Screenshots/
│   └── [All numbered screenshots]
└── README.md
```

**Good luck with your Windows Admin Toolkit project!** 💻
