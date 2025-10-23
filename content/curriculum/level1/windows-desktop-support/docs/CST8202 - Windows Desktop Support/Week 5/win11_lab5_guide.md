# CST8202 Lab 5 - Expert-Level Deep Dive
## Users, Groups, Shares and Security: Mastery Through Understanding

---

## **⚡ Aphorism for This Lab**

> *"Security is not a product, but a process. Permissions are not restrictions, but intentional grants of trust."*
> 
> *"Groups are the grammar of permissions; users are merely the vocabulary."*

---

## **🧠 Conceptual Foundation: Building Your Mental Model**

### **The Windows Security Architecture: A Four-Layer Model**

Think of Windows security as a **castle with four defensive layers**:

```
┌─────────────────────────────────────────┐
│  Layer 4: Share Permissions (Network)  │  ← First gate (network only)
├─────────────────────────────────────────┤
│  Layer 3: NTFS Permissions (Filesystem)│  ← Second gate (always active)
├─────────────────────────────────────────┤
│  Layer 2: User Rights & Privileges     │  ← What actions users can take
├─────────────────────────────────────────┤
│  Layer 1: Authentication (Login)       │  ← Proving who you are
└─────────────────────────────────────────┘
```

**Mnemonic: "SNUA" - Share, NTFS, User rights, Authentication**
*"Secure Networks Use Authentication"*

---

## **📊 CONCEPT MAP: User-Group-Permission Relationship**

Visualize this hierarchy in your mind:

```
                    ┌──────────────────┐
                    │   ORGANIZATION   │
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
   │  USER   │         │  GROUP  │         │RESOURCE │
   │ (Who?)  │────────▶│ (Role?) │────────▶│ (What?) │
   └─────────┘         └─────────┘         └─────────┘
        │                    │                    │
   Individual           Collection of        Files/Folders
   Person/Account       Related Users        Requiring Access
        
   Examples:            Examples:            Examples:
   - User1a            - Management         - C:\Management
   - jsmith@           - Accounting         - \\server\share
   - admin             - IT Staff           - D:\Projects
```

**Key Mental Model:** 
- **Users** = Individual actors (the WHO)
- **Groups** = Roles/departments (the WHAT ROLE)  
- **Resources** = Assets being protected (the WHAT ASSET)
- **Permissions** = The connections between them (the HOW MUCH ACCESS)

---

## **🎯 Deep Dive: Understanding User Accounts**

### **What IS a User Account? (Beyond the Basics)**

A user account is not just a name and password. It's a **Security Principal** - a fundamental concept in Windows security.

**A user account consists of:**

1. **SID (Security Identifier)**: 
   - Unique identifier like: `S-1-5-21-3623811015-3361044348-30300820-1013`
   - **Think of it as DNA** - unchangeable, unique, permanent
   - Even if you rename a user, the SID stays the same
   - This is what Windows ACTUALLY uses for security (not the name!)

2. **Username**: Human-readable identifier
   - Subject to constraints (no special characters, length limits)
   - Can be changed, but SID cannot

3. **Password Hash**: Encrypted password stored in SAM database
   - Never stored as plaintext
   - Uses NTLM hash or newer algorithms
   - This is why you can't "recover" passwords, only reset them

4. **Profile**: User's personal settings, documents, registry hive
   - Stored in `C:\Users\[username]`
   - Contains Desktop, Documents, AppData, etc.

5. **Token**: Created at login, contains SIDs of user and all their groups
   - This is what Windows checks against ACLs
   - Contains privileges and rights

**Mnemonic: "SUPPT" - SID, Username, Password, Profile, Token**
*"Super Users Possess Powerful Tokens"*

---

### **Local vs Domain Accounts: Critical Distinction**

**Local Accounts:**
- Stored in local SAM (Security Accounts Manager) database
- Scope: Only this computer
- Format: `ComputerName\Username` or just `Username`
- Use case: Standalone computers, workgroups, lab environments

**Domain Accounts:**
- Stored in Active Directory
- Scope: Entire domain/forest
- Format: `DOMAIN\Username` or `username@domain.com`
- Use case: Enterprise environments, centralized management

**This lab focuses on LOCAL accounts** - think of your VM as an isolated island.

---

### **Real-World Scenario: Why Multiple User Accounts?**

**Scenario: Small Business with 5 Employees**

```
Company: "Acme Widgets Inc."
- 1 CEO (needs access to everything)
- 2 Accountants (need financial data access)
- 2 Engineers (need technical documentation access)
```

**Bad Approach (All use one account):**
- Everyone logs in as "CompanyUser"
- Cannot track who did what (no accountability)
- Cannot revoke access for terminated employees
- Password known by everyone (security nightmare)

**Good Approach (Individual accounts + groups):**
- CEO: ceo-account (member of Administrators)
- Accountants: acct1, acct2 (members of Accounting group)
- Engineers: eng1, eng2 (members of Engineering group)
- Benefits: Accountability, granular control, audit trail

**This is why we create User1a, User1b, etc. - simulating individual employees**

---

## **🎯 Deep Dive: Understanding Groups**

### **What IS a Group? (The Power of Abstraction)**

Groups are the **most powerful concept** in Windows security administration. Understanding them deeply separates novices from experts.

**Mental Model: Groups as Roles in a Theater**

```
Theater Production:
├─ Director (Group)
│  ├─ User: Sarah
│  └─ Has permissions: Full control of production
├─ Actors (Group)
│  ├─ User: John
│  ├─ User: Mary
│  └─ Has permissions: Access to stage, scripts, costumes
├─ Crew (Group)
│  ├─ User: Bob
│  ├─ User: Alice
│  └─ Has permissions: Access to equipment, backstage
└─ Audience (Group)
   └─ Has permissions: View only (read)
```

When Sarah needs Director access, you add her to the Director group. When she leaves, you remove her. **The Director role's permissions never change - only the membership changes.**

---

### **Why Groups? The Scalability Problem**

**Problem Without Groups:**

```
100 users × 50 shared folders = 5,000 permission assignments to manage!

User1 → Finance Folder ✓
User1 → HR Folder ✓
User1 → IT Folder ✓
...
User100 → Finance Folder ✓
User100 → HR Folder ✓
```

When User1 gets promoted, you must update 50 permissions.
When you add a new folder, you must set 100 permissions.

**Solution With Groups:**

```
5 groups × 50 shared folders = 250 permission assignments

Finance Group → Finance Folder ✓
HR Group → HR Folder ✓
IT Group → IT Folder ✓
...
```

When User1 gets promoted: Change ONE group membership.
When you add a new folder: Set ONE group permission.

**Aphorism:** *"Manage hundreds of users by managing a handful of groups."*

---

### **Group Types: The Two Dimensions**

Windows groups have TWO separate properties that are often confused:

**Dimension 1: Scope** (Where can the group be used?)
- **Local**: Only on this computer
- **Domain Local**: In this domain only
- **Global**: Can be used anywhere in the domain/forest
- **Universal**: Can be used across multiple domains

**Dimension 2: Type** (What can the group do?)
- **Security**: Used for permissions (this is what we use 99% of the time)
- **Distribution**: Used for email lists (not for permissions)

**For this lab:** We create LOCAL SECURITY groups.

**Mnemonic for Scope: "LDGU" - Local, Domain Local, Global, Universal**
*"Little Dogs Grow Up"*

---

### **Active Recall Question:**

*Before reading ahead, answer this:*
- Why is it better to assign permissions to groups rather than users?
- What happens to permissions when a user is removed from a group?
- If you need to grant 10 users access to 5 folders, how many permission assignments do you need with groups vs without?

**Answers:**
- Scalability, maintainability, auditability, role-based access control
- Permissions are immediately revoked (token refresh)
- With groups: 2 assignments (1 group, add 10 users to it, assign group to folder). Without: 50 assignments (10 users × 5 folders)

---

## **🎯 Deep Dive: NTFS Permissions (The Core Security Layer)**

### **What ARE NTFS Permissions?**

NTFS (New Technology File System) permissions are **Access Control Entries (ACEs)** stored in the **Access Control List (ACL)** attached to every file and folder.

**Visualization of an ACL:**

```
C:\Management (Folder)
│
└─ ACL (Access Control List)
   ├─ ACE #1: abcd1234 → Allow → Full Control
   ├─ ACE #2: Management Group → Allow → Modify
   ├─ ACE #3: Accounting Group → Deny → Full Control
   └─ ACE #4: SYSTEM → Allow → Full Control
   
Each ACE contains:
- Security Principal (user/group SID)
- Permission Type (Allow/Deny)
- Permissions (Full Control, Modify, etc.)
- Inheritance flags
```

**Key Concept:** When you open a file, Windows:
1. Reads your access token (contains your user SID + all group SIDs)
2. Reads the file's ACL
3. Compares every ACE against your token
4. Applies permission rules (Deny beats Allow, etc.)
5. Grants or denies access

**This happens in MILLISECONDS for EVERY file access!**

---

### **The Six Standard NTFS Permissions: What They REALLY Mean**

Most documentation tells you what permissions do. Let's understand WHY they exist and WHEN to use each.

**1. Full Control**
- **What it means:** Complete authority over the object
- **Includes:** All permissions below PLUS:
  - Change permissions (modify the ACL)
  - Take ownership (become the owner)
  - Delete subfolders and files (even if you can't delete individual items)
- **Real-world use:** Administrators, data owners, department managers
- **Mnemonic:** "The God Mode"

**2. Modify**
- **What it means:** Change content but not security
- **Includes:** Read, Write, Execute, Delete (but NOT change permissions)
- **Real-world use:** Normal users in their department folders
- **This is the most commonly assigned permission for daily users**
- **Mnemonic:** "Can touch, but can't control"

**3. Read & Execute**
- **What it means:** View and run, but not change
- **Includes:** Read + Execute (run programs, traverse folders)
- **Real-world use:** Application folders, shared tools, reference documents
- **Mnemonic:** "Look and Launch"

**4. List Folder Contents**
- **What it means:** See what's inside folders (applies only to folders)
- **Special use:** Different inheritance behavior than Read
- **Real-world use:** Directory browsing without file access

**5. Read**
- **What it means:** View contents, attributes, permissions
- **Cannot:** Modify, delete, or execute
- **Real-world use:** Archived data, audit logs, reference materials
- **Mnemonic:** "Eyes only"

**6. Write**
- **What it means:** Create new files/folders, modify attributes
- **Cannot:** Read existing files or execute (unusual permission!)
- **Real-world use:** Drop boxes (submit files without seeing others' submissions)
- **Mnemonic:** "Blind drop box"

---

### **Permission Hierarchy Visualization**

```
Full Control          ████████████████████  (Everything)
    │
    ├─ Change Permissions
    ├─ Take Ownership
    └─ Contains ↓
    
Modify                ███████████████       (Change but not control)
    │
    ├─ Delete
    └─ Contains ↓
    
Write                 ███████              (Create/Modify)
    ├─ Create Files/Folders
    └─ Modify Attributes

Read & Execute        ████████              (View + Run)
    ├─ Read
    └─ Execute/Traverse

Read                  █████                 (View only)
    ├─ Read Data
    ├─ Read Attributes
    └─ Read Permissions

List Folder Contents  ████                  (See names only)
```

**Key Insight:** Higher permissions include all lower permissions (except special cases).

---

### **Advanced Concept: Special Permissions (The Granular Level)**

The six standard permissions are actually **combinations of 13 special permissions**:

```
Standard: Full Control
Special:  
  ✓ Traverse Folder / Execute File
  ✓ List Folder / Read Data
  ✓ Read Attributes
  ✓ Read Extended Attributes
  ✓ Create Files / Write Data
  ✓ Create Folders / Append Data
  ✓ Write Attributes
  ✓ Write Extended Attributes
  ✓ Delete Subfolders and Files
  ✓ Delete
  ✓ Read Permissions
  ✓ Change Permissions
  ✓ Take Ownership
```

**When to use special permissions:**
- Highly customized scenarios
- Security-critical environments
- Compliance requirements (HIPAA, PCI-DSS)

**For most scenarios: Standard permissions are sufficient**

---

### **Permission Inheritance: The Family Tree Model**

**Concept:** Child objects inherit permissions from parent objects (unless you break inheritance).

```
C:\  (Root)
 │   ACL: Administrators → Full Control
 │
 ├── Management\ (Inherits from C:\)
 │   │   Inherited: Administrators → Full Control
 │   │   Explicit: Management Group → Modify
 │   │
 │   └── Reports\ (Inherits from Management\)
 │       Inherited: Administrators → Full Control
 │       Inherited: Management Group → Modify
```

**Three Inheritance States:**

1. **Inherited Permissions** (Gray/dimmed in GUI)
   - Come from parent
   - Cannot be directly modified (must change parent)
   - Automatically propagate to children

2. **Explicit Permissions** (Black/normal in GUI)
   - Directly set on this object
   - Override inherited if conflict
   - Can be modified directly

3. **Disabled Inheritance**
   - Breaks the parent-child link
   - Gives you full control over ACL
   - Options: Copy parent ACL or start fresh

**Mnemonic: "IEB" - Inherited, Explicit, Broken**
*"Inheritance Enables Behavior"*

---

### **Real-World Scenario: Permission Inheritance Gone Wrong**

**Problem:**
```
C:\Data\ (Inherited: Everyone → Read & Execute)
 └── Sensitive\
      └── Passwords.txt  ← EVERYONE CAN READ THIS!
```

**Why it happened:** Lazy admin set "Everyone" at the root, inheritance carried it down.

**Solution:**
```
C:\Data\ (Everyone → Read)
 └── Sensitive\ ← DISABLE INHERITANCE HERE
      ACL: Administrators → Full Control ONLY
      └── Passwords.txt (Inherits restricted ACL)
```

**Lesson:** Always consider inheritance when setting permissions at high-level folders.

---

### **Allow vs Deny: The Nuclear Option**

**Rule #1: Deny ALWAYS wins over Allow (no exceptions)**

```
User1a's effective permissions:
├─ Member of Management Group → Allow Modify ✓
├─ Member of Users Group → Allow Read ✓
└─ User1a explicitly → Deny Full Control ✗

Result: DENIED (Deny wins)
```

**When to use Deny:**
- Excluding specific users from broader group permissions
- Temporary restrictions (better than deleting from groups)
- Compliance requirements (explicit denial for audit)

**When NOT to use Deny:**
- As the primary security method (use group exclusion instead)
- In complex ACLs (makes troubleshooting nightmare)

**Best Practice:** "Build security with Allows, use Deny as a scalpel, not a hammer."

**Real-World Scenario:**
```
Situation: Marketing department (12 people) needs access to Marketing folder.
One person (User5) is under investigation, must lose access.

Bad Approach: Remove User5 from Marketing group
Problem: User5 might need access to other Marketing resources

Good Approach: Add Deny for User5 on specific folder
Benefit: Surgical removal of access, easily reversed, audit trail clear
```

---

## **🎯 Deep Dive: Share Permissions (The Network Gateway)**

### **What ARE Share Permissions?**

Share permissions are a **separate and additional** security layer that ONLY applies when accessing resources over the network using SMB/CIFS protocol.

**Crucial Understanding:** Share permissions are NOT a replacement for NTFS permissions - they work **in conjunction**.

---

### **The Two-Gate Model (Most Important Concept)**

**Visualization:**

```
Remote User Accessing \\Server\Share\file.txt
    │
    ▼
┌─────────────────────────────┐
│  GATE 1: Share Permissions  │ ← First check (SMB layer)
│  User has: Change           │
└──────────┬──────────────────┘
           │ Pass through ✓
           ▼
┌─────────────────────────────┐
│  GATE 2: NTFS Permissions   │ ← Second check (filesystem layer)
│  User has: Read             │
└──────────┬──────────────────┘
           │
           ▼
     Final Access: READ ONLY (most restrictive wins)
```

**The Golden Rule:** 
```
Effective Network Access = MOST RESTRICTIVE of (Share Permissions, NTFS Permissions)
```

**Mnemonic:** "Share Restricts Network Traffic - NTFS Rules The System"
*"SRN-TRS"*

---

### **The Three Share Permissions**

Unlike NTFS's six standard permissions, shares only have THREE:

**1. Read**
- View files and folders
- Open files (read-only)
- Execute programs

**2. Change**
- Everything in Read
- Create/modify/delete files
- Create/delete folders
- Does NOT include changing permissions

**3. Full Control**
- Everything in Change
- Change share permissions (on the share itself)

**Visualization:**

```
Full Control  ▓▓▓▓▓▓▓▓▓▓▓▓  (Read + Change + Modify Share)
              │
Change        ▓▓▓▓▓▓▓▓      (Read + Write/Delete)
              │
Read          ▓▓▓           (View only)
```

---

### **Real-World Permission Strategies**

**Strategy 1: Permissive Share, Restrictive NTFS (RECOMMENDED)**

```
Share Permissions:
  Everyone → Full Control

NTFS Permissions:
  Management Group → Modify
  Accounting Group → Read
  HR Group → Modify
  abcd1234 → Full Control
```

**Why this works:**
- Share layer doesn't restrict (reduces complexity)
- NTFS provides granular control
- Easy to manage (one place for security)
- Works for both local and network access

**Strategy 2: Restrictive Share, Permissive NTFS (NOT RECOMMENDED)**

```
Share Permissions:
  Management → Change
  Accounting → Read

NTFS Permissions:
  Everyone → Full Control
```

**Why this fails:**
- Local access bypasses share permissions (security hole!)
- Two places to manage permissions (complexity)
- Inconsistent security model

**Best Practice:** "NTFS is your security foundation; Share permissions are your network gate. Make NTFS strong, Share permissions simple."

---

### **Common Share Permission Mistakes**

**Mistake #1: Leaving "Everyone" on Share Permissions**

```
Default after creating share:
  Share: Everyone → Read
  NTFS: Administrators → Full Control

Problem: Anyone on network can browse to share
Solution: Remove "Everyone", add specific groups
```

**Mistake #2: Conflicting Permissions**

```
User1a accesses \\Server\Management\Report.xlsx

Share: Management → Full Control
NTFS: Management → Read

User1a thinks: "I have Full Control!"
Reality: Can only read (NTFS restricted)
Result: Confusion and help desk tickets
```

**Active Recall Challenge:**

*A user has:*
- *Share permission: Change*
- *NTFS permission: Full Control*

*What can they do over the network?*
- *Change files (most restrictive wins)*

*What can they do locally?*
- *Full Control (share permissions don't apply locally!)*

---

## **🎯 Deep Dive: SMB Shares (The Network Plumbing)**

### **What IS SMB/CIFS?**

**SMB (Server Message Block)** is the network protocol Windows uses to share files, printers, and other resources.

**Evolution:**
- **SMB 1.0** (1990s): Original, insecure, vulnerable (WannaCry ransomware exploited this)
- **SMB 2.0** (Vista/Server 2008): Performance improvements
- **SMB 3.0** (Windows 8/Server 2012): Encryption, resilience
- **SMB 3.1.1** (Windows 10/Server 2016): Integrity checking, AES-128 encryption

**Windows 11 uses SMB 3.1.1 by default** (excellent!)

---

### **UNC Paths: The Network Language**

**UNC (Universal Naming Convention)** is how we address network resources.

**Format:** `\\ComputerName\ShareName\Path\To\File`

**Breakdown:**
```
\\FILESERVER\Management Share\Reports\2024\January.xlsx
  │         │              │                │
  Server    Share Name     Path within      File
  Name                     share
```

**Special UNC Paths:**

- `\\localhost\ShareName` - Access your own shares
- `\\127.0.0.1\ShareName` - Same as localhost (IP loopback)
- `\\.\ShareName` - Device namespace (advanced)
- `\\ComputerName\C$` - Administrative share (requires admin rights)

**Hidden Shares (end with $):**
- `C$`, `D$` - Admin access to drives
- `ADMIN$` - Windows folder
- `IPC$` - Inter-Process Communication
- Custom shares ending in `$` don't appear in browse lists

---

### **Real-World Scenario: The Support Nightmare**

**Ticket:** "I can access the share from my desk but not from home!"

**Investigation:**
```
From office (on corporate network):
  \\FILESERVER\Management → ✓ Works

From home (VPN):
  \\FILESERVER\Management → ✗ Timeout
```

**Root Causes (Could Be):**
1. Firewall blocking SMB ports (445, 139)
2. VPN not routing correctly
3. DNS not resolving \\FILESERVER
4. Offline Files sync conflict
5. Cached credentials mismatch

**Lesson:** Share access depends on network connectivity, DNS, firewalls, not just permissions!

---

## **SECTION 1: GUI Administration (Visual Learning Path)**

**Why start with GUI?**
- Builds mental models through visual feedback
- Immediate results reinforce learning
- Easier to understand concepts before automation
- Essential for troubleshooting when PowerShell fails

**Aphorism:** *"See first, script later. Understand manually before automating."*

---

### **🔧 Launch PowerShell as Administrator**

**Why Administrator Rights Matter:**

Windows uses a security model called **UAC (User Account Control)**. Even when you're logged in as an Administrator, you run with **standard user token** until you elevate.

**Visualization:**

```
Login as Administrator
       │
       ▼
┌──────────────────┐
│  Standard Token  │ ← Default: Limited permissions
└────────┬─────────┘
         │
         │ Right-click → "Run as administrator"
         ▼
┌──────────────────┐
│  Admin Token     │ ← Elevated: Full permissions
└──────────────────┘
```

**What you CAN'T do without elevation:**
- Create user accounts
- Modify system files
- Change security permissions
- Install software system-wide
- Modify registry (HKLM)

**Steps:**

1. Click **Start** button
2. Type: `PowerShell`
3. **Right-click** "Windows PowerShell"
4. Select **"Run as administrator"**
5. **UAC Prompt appears:** Click **"Yes"**

**Visual Cue:** Administrator PowerShell has:
- Title bar: "Administrator: Windows PowerShell"
- Default path: `PS C:\Windows\System32>` (not user folder)

**Mnemonic:** "Right Admin Yes" (RAY)
*"Always RAY when you need power"*

---

### **🔧 STEP 1: Create Four User Accounts**

**Concept Review:** We're creating LOCAL security principals that will exist only on this VM.

**Real-World Context:**

Imagine you're the IT administrator for a small law firm:
- Partner Smith (User1a) - needs management access
- Partner Jones (User1b) - needs management access
- Associate Brown (User1c) - needs management access  
- Paralegal Wilson (User1d) - needs management access

**Navigation:**

1. **Right-click Start button** (or press **Win+X**)
   - This is the "Power User Menu" - fastest way to admin tools

2. **Select "Computer Management"**
   - This is **MMC (Microsoft Management Console)** with snap-ins pre-loaded
   - Think of it as "Mission Control" for local system management

3. **Expand "Local Users and Groups"** (left pane)
   - This is an MMC snap-in connecting to local SAM database
   - On domain-joined computers, you'd use "Active Directory Users and Computers" instead

4. **Click "Users"** folder

**What you see:**

```
List of built-in accounts:
- Administrator (SID: S-1-5-21-...-500) - Built-in admin (currently disabled)
- DefaultAccount (SID: ...503) - System use only
- Guest (SID: ...501) - Built-in guest (disabled)
- WDAGUtilityAccount - Windows Defender Application Guard
- [Your college account] - The account you created during Windows setup
```

**Creating User1a:**

5. **Right-click** in empty space (right pane)
6. **Select "New User..."**

**Dialog Box Breakdown:**

```
┌─────────────────────────────────────┐
│ User name: [User1a          ]       │ ← Machine-readable identifier
│ Full name: [                ]       │ ← Human-readable (optional)
│ Description: [              ]       │ ← Purpose/role (optional)
│                                     │
│ Password: [********         ]       │ ← Minimum complexity required
│ Confirm:  [********         ]       │ ← Must match exactly
│                                     │
│ ☑ User must change password...     │ ← Force new password on first login
│ ☐ User cannot change password       │ ← Lock password (service accounts)
│ ☐ Password never expires            │ ← Violates policy but OK for labs
│ ☐ Account is disabled               │ ← Create but don't activate
└─────────────────────────────────────┘
```

**Fill in:**
- **User name:** `User1a`
- **Password:** `P@ssW0rd`
- **Confirm password:** `P@ssW0rd`
- **UNCHECK** "User must change password at next logon"
- **CHECK** "Password never expires"

**Why these settings?**

❌ **Production Environment:**
```
☑ User must change password at next logon
☐ Password never expires
☑ Enforce password complexity
Password expiration: 90 days
```

✓ **Lab Environment:**
```
☐ User must change password at next logon
☑ Password never expires  
Reason: Focus on permissions, not password management
```

7. **Click "Create"** (not OK - this lets you create multiple users)

**What just happened?**

```
Behind the scenes:
1. Windows generated unique SID (e.g., S-1-5-21-xxx-1001)
2. Created SAM database entry
3. Hashed password (NTLM/Kerberos)
4. Created user profile path (C:\Users\User1a) - created on first login
5. Added to "Users" group automatically
6. Generated security token template
```

**Repeat for User1b, User1c, User1d:**

8. Create three more users with same settings
9. After User1d, click **"Close"**

**Verification:**

```
You should now see in the user list:
[Icon] User1a    Local User Account
[Icon] User1b    Local User Account
[Icon] User1c    Local User Account
[Icon] User1d    Local User Account
```

**Active Recall:**
- What is the actual identifier Windows uses internally for users?
- Why doesn't Windows use usernames for security?
- What happens if you rename User1a to JohnSmith?

**Answers:**
- SID (Security Identifier)
- SIDs are unique and unchangeable; usernames can be duplicated or changed
- SID stays the same, all permissions remain intact

---

### **🔧 STEP 2: Create the Management Group**

**Concept Review:** Groups are collections of users that share a common role or security needs.

**Mental Model:** Think of a group as a **job title** or **department** in a company.

**Navigation:**

1. In **Computer Management** (still open)
2. Under **"Local Users and Groups"**, click **"Groups"**

**What you see (built-in groups):**

```
Administrators          - Full system control (SID ending in -544)
Backup Operators        - Can backup/restore files
Guests                  - Limited access
Network Configuration   - Can modify network settings
Power Users             - Legacy (not used in modern Windows)
Remote Desktop Users    - Can connect via RDP
Users                   - Standard user rights
... (many more)
```

**Understanding Built-in Groups:**

These have **well-known SIDs** that are the same on every Windows system:
- `S-1-5-32-544` = Administrators (on every Windows computer!)
- `S-1-5-32-545` = Users
- `S-1-5-32-546` = Guests

**Creating Custom Group:**

3. **Right-click** empty space (right pane)
4. **Select "New Group..."**

**Dialog Breakdown:**

```
┌────────────────────────────────────────┐
│ Group name: [Management          ]     │ ← Descriptive name
│ Description: [                   ]     │ ← Explain purpose (best practice)
│                                        │
│ Members:                               │
│ ┌────────────────────────────────┐   │
│ │ (empty initially)              │   │
│ └────────────────────────────────┘   │
│       [Add...] [Remove]               │
└────────────────────────────────────────┘
```

5. **Group name:** `Management`
6. **Description:** Leave blank (we'll add in next step)
7. **Don't add members yet** (step 4)
8. Click **"Create"**
9. Click **"Close"**

**What just happened?**

```
Behind the scenes:
1. Windows generated unique SID for group (S-1-5-21-xxx-1XXX)
2. Created group entry in SAM database
3. Group token template created (empty membership list)
4. Group appears in local security policy
```

**Real-World Naming Conventions:**

```
Good Group Names:
✓ Domain-Admins
✓ Finance-ReadOnly
✓ HR-Management
✓ Project-Phoenix-Contributors

Bad Group Names:
✗ Group1 (not descriptive)
✗ Users (conflicts with built-in)
✗ Everyone (definitely conflicts!)
✗ TempGroup (unclear purpose)
```

**Best Practice:** Use prefixes to organize: `DEPT-`, `PROJ-`, `ROLE-`

---

### **🔧 STEP 3: Add Description to Management Group**

**Why Descriptions Matter:**

In enterprise environments, you might have:
- 500+ Active Directory groups
- Multiple administrators
- Staff turnover
- Compliance audits

**Without descriptions:** "What does PROJ-PHX-CONTRIB group do? Who knows!"
**With descriptions:** "Project Phoenix Contributors - Can modify project files in \\fileserver\Phoenix"

**Steps:**

1. In the **Groups** folder
2. **Double-click "Management"** (or right-click → Properties)

**Properties Dialog:**

```
┌─────────────────────────────────────────┐
│ Management Properties          [X]      │
├─────────────────────────────────────────┤
│ General                                 │
│                                         │
│ Group name:  Management                 │
│              (Cannot be changed)        │
│                                         │
│ Description: [________________________] │
│                                         │
│ Members:                                │
│ ┌─────────────────────────────────┐   │
│ │ (none)                          │   │
│ └─────────────────────────────────┘   │
│       [Add...] [Remove]                │
└─────────────────────────────────────────┘
```

3. In **Description** field, type:
   ```
   Management team members with access to management resources
   ```

4. Click **"Apply"** (saves changes)
5. Click **"OK"** (closes dialog)

**Best Practice Description Template:**

```
[Role/Department] - [Purpose] - [Primary Resources]

Examples:
"Finance Department - Full access to financial shares and reports"
"IT Helpdesk - Can reset passwords and join computers to domain"
"Project Zeus Team - Modify access to \\server\Projects\Zeus"
```

---

### **🔧 STEP 4: Add Users to Management Group**

**Critical Concept:** This is where users inherit group permissions.

**Group Membership Mental Model:**

```
User1a's Token After Login:
┌────────────────────────────┐
│ User1a                     │ SID: S-1-5-21-xxx-1001
├────────────────────────────┤
│ Member of Groups:          │
│  - Users                   │ SID: S-1-5-32-545 (built-in)
│  - Management              │ SID: S-1-5-21-xxx-2001 (custom)
│  - Everyone                │ SID: S-1-1-0 (special)
│  - Authenticated Users     │ SID: S-1-5-11 (special)
└────────────────────────────┘
```

When User1a accesses a file, Windows checks EVERY group SID in the token against the file's ACL.

**Steps:**

1. **Double-click "Management"** group (or right-click → Properties)
2. Click **"Add..."** button

**Select Users Dialog:**

```
┌────────────────────────────────────────────┐
│ Select Users                      [X]      │
├────────────────────────────────────────────┤
│ Select this object type:                   │
│   [Users]                  [Object Types..]│
│                                            │
│ From this location:                        │
│   [COMPUTERNAME]           [Locations...]  │
│                                            │
│ Enter object names to select:             │
│ ┌────────────────────────────────────────┐│
│ │                                        ││
│ └────────────────────────────────────────┘│
│                   [Check Names] [Advanced] │
│                                            │
│               [OK] [Cancel]                │
└────────────────────────────────────────────┘
```

**Method 1: Add All at Once (Efficient)**

3. In the text box, type:
   ```
   User1a;User1b;User1c;User1d
   ```
   - Use semicolons `;` to separate multiple names
   - Spaces don't matter: `User1a; User1b; User1c; User1d` also works

4. Click **"Check Names"**
   - Windows validates each name against SAM database
   - Names become underlined if found
   - If not found, you'll see an error (check spelling!)

5. Click **"OK"**

**What "Check Names" Does:**

```
Input: "User1a"
  ↓
SAM Database Lookup
  ↓
Found: S-1-5-21-xxx-1001
  ↓
Display: COMPUTERNAME\User1a (underlined)
```

**Method 2: Add One at a Time (Safer for Beginners)**

3. Type: `User1a`
4. Click **"Check Names"**
5. Click **"OK"**
6. Click **"Add..."** again
7. Repeat for User1b, User1c, User1d

**Result:**

```
Members list now shows:
- User1a
- User1b
- User1c
- User1d
```

6. Click **"OK"** to save

**What Just Happened? (Deep Dive)**

```
For EACH user:
1. Windows added group SID to user's token template
2. Updated SAM database with membership relationship
3. Next time user logs in, their token includes Management group SID
4. User inherits ALL permissions assigned to Management group
```

**Important:** Group membership changes take effect:
- **Immediately** for new processes
- **After next login** for existing session (token doesn't refresh mid-session!)

**Real-World Scenario:**

```
9:00 AM - User1a logs in (token created)
10:00 AM - Admin adds User1a to Administrators group
10:05 AM - User1a tries to install software → FAILS! (old token)
10:10 AM - User1a logs out and back in (new token created)
10:15 AM - User1a tries to install software → SUCCESS! (new token includes Admins)
```

**Active Recall:**
- When do group membership changes take effect?
- What is stored in a user's access token?
- Can you remove a user from the Users group?

**Answers:**
- At next login (token refresh)
- User SID + all group SIDs + privileges
- No! It's automatic membership for all local users (you can try, Windows will prevent it)

---

### **🔧 STEP 5: Create the Management Directory**

**Concept:** Before we can secure data, we need a container for it.

**Filesystem Hierarchy Visualization:**

```
C:\ (Root of C: drive)
├── Program Files\
├── Program Files (x86)\
├── Windows\
├── Users\
│   ├── abcd1234\
│   ├── Public\
│   └── User1a\ (created on first login)
├── Management\ ← WE'RE CREATING THIS
└── Accounting\ (created later)
```

**Where to Create Shared Folders? (Design Decision)**

**Option 1: Root of Drive (C:\Management)**
- ✓ Easy to find
- ✓ Short UNC paths
- ✓ Clear organization
- ✗ Clutters system drive
- ✗ Could be OS drive (space concerns on small SSDs)

**Option 2: Dedicated Data Drive (D:\Shares\Management)**
- ✓ Separates user data from OS
- ✓ Easier backup strategy
- ✓ Can use different drive types (SSD for OS, HDD for storage)
- ✗ More complex path structure

**Option 3: Subfolder (C:\Shared\Management)**
- ✓ Groups all shared folders
- ✓ Single point for backups
- ✓ Clean root directory

**For this lab: C:\Management (simplicity)**

**In production:** D:\Shares\ or dedicated file server

---

**Steps:**

1. Press **Win + E** (opens File Explorer)
   - Keyboard shortcut: Faster than clicking!
   - Mnemonic: "E for Explorer"

2. Click **"This PC"** (left sidebar)
3. Double-click **"Local Disk (C:)"**

**What you see:**

```
C:\ contents:
- $Recycle.Bin (hidden)
- Documents and Settings (junction point - ignore)
- PerfLogs (performance logs - usually empty)
- Program Files
- Program Files (x86)
- Users
- Windows
```

4. **Right-click** in empty space (white area, not on a folder)
5. **Select "New"** → **"Folder"**
6. **Name it:** `Management`
7. Press **Enter**

**What Just Happened?**

```
Behind the scenes:
1. Filesystem created directory entry in MFT (Master File Table)
2. Assigned default ACL (inherited from C:\)
3. Created metadata (timestamps, attributes)
4. Allocated space in filesystem structure
```

**Check Inherited Permissions (Preview):**

8. **Right-click** "Management" folder
9. **Select "Properties"**
10. **Click "Security" tab**

**You'll see inherited permissions like:**

```
Group or user names:
- SYSTEM             Full Control
- Administrators     Full Control  
- Users              Read & Execute
- Authenticated Users Modify (or similar)
```

**These are INHERITED from C:\ - we'll change them shortly!**

11. Click **"Cancel"** (we'll modify permissions in Step 6)

**Active Recall:**
- What does MFT stand for?
- Why do new folders have permissions already set?
- What's the difference between inherited and explicit permissions?

**Answers:**
- Master File Table (NTFS structure that tracks all files/folders)
- Inheritance from parent folder (C:\ in this case)
- Inherited come from parent (gray in GUI), explicit are directly set (black in GUI)

---

### **🔧 STEP 6: Configure NTFS Permissions (THE MOST IMPORTANT STEP)**

**This step is THE FOUNDATION of Windows security.** Take your time and understand each action.

**Security Architecture We're Building:**

```
Management Folder Access Control:
┌─────────────────────────────────────┐
│ abcd1234 (Your account)             │ → Full Control (owner/admin)
├─────────────────────────────────────┤
│ Management Group                    │ → Modify (daily work)
│  ├─ User1a                          │
│  ├─ User1b                          │
│  ├─ User1c                          │
│  └─ User1d                          │
├─────────────────────────────────────┤
│ SYSTEM (Windows OS)                 │ → Full Control (required)
├─────────────────────────────────────┤
│ Everyone Else                       │ → NO ACCESS (deny by absence)
└─────────────────────────────────────┘
```

**Principle: "Least Privilege"** - Only grant minimum access needed to perform job functions.

---

**Steps:**

1. **Right-click** "Management" folder
2. **Select "Properties"**
3. **Click "Security" tab**

**Current State (Inherited Permissions):**

```
You'll see something like:
☑ SYSTEM                 Full Control ᴵ
☑ Administrators (GROUP) Full Control ᴵ
☑ Users (GROUP)          Read & Execute ᴵ
☑ Authenticated Users    Modify ᴵ

ᴵ = Inherited from parent (gray/dimmed)
```

**Problem:** Everyone in "Users" group has read access! "Authenticated Users" has modify!

**Solution:** Disable inheritance and set explicit permissions.

---

**4. Click "Advanced" button**

**Advanced Security Settings Dialog:**

```
┌─────────────────────────────────────────────────┐
│ Advanced Security Settings for Management  [X] │
├─────────────────────────────────────────────────┤
│ Permissions | Auditing | Effective Access | ... │
├─────────────────────────────────────────────────┤
│ For additional information, double-click...     │
│                                                 │
│ Permission entries:                             │
│ Type      Principal          Access   Inherited │
│ Allow     SYSTEM            Full Ctl  Yes       │
│ Allow     Administrators    Full Ctl  Yes       │
│ Allow     Users             R & X     Yes       │
│ Allow     Authenticated...  Modify    Yes       │
│                                                 │
│ ☑ Include inheritable permissions from parent   │
│                                                 │
│ [Add] [Remove] [Disable inheritance]           │
└─────────────────────────────────────────────────┘
```

**Understanding This Screen:**

- **Type:** Allow or Deny
- **Principal:** User or group the permission applies to
- **Access:** Level of permission (Full Control, Modify, etc.)
- **Inherited:** Yes (from parent) or No (explicit)

**Key Feature: "Include inheritable permissions from parent"**
- Currently CHECKED (inheritance enabled)
- We need to UNCHECK this to break inheritance

---

**5. Click "Disable inheritance" button**

**Critical Dialog Appears:**

```
┌───────────────────────────────────────────────┐
│ Block Inheritance                        [X] │
├───────────────────────────────────────────────┤
│ What do you want to do with current         │
│ inherited permissions?                       │
│                                              │
│ ┌─────────────────────────────────────────┐│
│ │ Convert inherited permissions into       ││
│ │ explicit permissions on this object      ││ ← Option 1
│ └─────────────────────────────────────────┘│
│                                              │
│ ┌─────────────────────────────────────────┐│
│ │ Remove all inherited permissions from    ││
│ │ this object                              ││ ← Option 2 (We choose this!)
│ └─────────────────────────────────────────┘│
│                                              │
│                       [Cancel]               │
└───────────────────────────────────────────────┘
```

**Understanding the Options:**

**Option 1: Convert inherited → explicit**
```
Before:
- SYSTEM: Full Control ᴵ
- Administrators: Full Control ᴵ
- Users: Read ᴵ

After Option 1:
- SYSTEM: Full Control (explicit copy)
- Administrators: Full Control (explicit copy)
- Users: Read (explicit copy)

Result: Same permissions, but now you can modify them
Use Case: Want to keep current access but tweak it
```

**Option 2: Remove all inherited**
```
Before:
- SYSTEM: Full Control ᴵ
- Administrators: Full Control ᴵ
- Users: Read ᴵ

After Option 2:
(empty - no permissions at all!)

Result: Clean slate
Use Case: Want complete control over who has access
```

**6. Click "Remove all inherited permissions from this object"**

**⚠️ Security Warning Will Appear:**

```
┌─────────────────────────────────────────┐
│ Windows Security Warning           [X] │
├─────────────────────────────────────────┤
│ You are removing all permissions from  │
│ this object. This means nobody,        │
│ including Administrators, will have    │
│ access. Are you sure?                  │
│                                         │
│             [Yes]  [No]                 │
└─────────────────────────────────────────┘
```

**7. Click "Yes"**

**What You'll See:**

```
Permission entries:
(Empty list - no permissions!)

This is CORRECT! We're starting from scratch.
```

**8. Click "Apply"** (saves the empty ACL)

**What Just Happened? (Critical Understanding)**

```
Before:
Management folder ACL:
  - Inherited from C:\
  - Everyone had some level of access
  - Not secure for sensitive data

After:
Management folder ACL:
  - No inheritance
  - EMPTY (no one has access, not even you!)
  - Ready for custom permissions

This is a "default deny" security model!
```

---

**Now We Add Our Custom Permissions**

**Adding Your Account (Full Control):**

**9. Click "Add" button**

**Permission Entry Dialog:**

```
┌────────────────────────────────────────────┐
│ Permission Entry for Management       [X] │
├────────────────────────────────────────────┤
│ Principal: [Select a principal...]        │
│                                            │
│ Type: ○ Allow  ○ Deny                     │
│                                            │
│ Applies to: [This folder, subfolders...]  │
│                                            │
│ Basic permissions:                         │
│ ☐ Full control                             │
│ ☐ Modify                                   │
│ ☐ Read & execute                           │
│ ☐ List folder contents                    │
│ ☐ Read                                     │
│ ☐ Write                                    │
│                                            │
│ Advanced permissions: [Show]               │
│                                            │
│ ☑ Apply these permissions to objects...   │
│                                            │
│                  [OK] [Cancel]             │
└────────────────────────────────────────────┘
```

**10. Click "Select a principal"**

**Select User or Group Dialog:**

```
┌────────────────────────────────────────────┐
│ Select User or Group                  [X] │
├────────────────────────────────────────────┤
│ Select this object type:                   │
│   Users or Groups        [Object Types...] │
│                                            │
│ From this location:                        │
│   COMPUTERNAME           [Locations...]    │
│                                            │
│ Enter the object name to select:          │
│ ┌────────────────────────────────────────┐│
│ │                                        ││
│ └────────────────────────────────────────┘│
│                 [Check Names] [Advanced]   │
│                                            │
│              [OK] [Cancel]                 │
└────────────────────────────────────────────┘
```

**11. Type:** `abcd1234` (YOUR college username - replace this!)

**12. Click "Check Names"**
   - Should become: `COMPUTERNAME\abcd1234` (underlined)

**13. Click "OK"**

**Back to Permission Entry Dialog:**

**14. Principal now shows:** `COMPUTERNAME\abcd1234`

**15. Keep "Allow" selected** (Deny should rarely be used)

**16. Check the box for "Full control"**
   - Notice: All other boxes automatically check!
   - This is because Full Control includes all lower permissions

**Permission Hierarchy (Visual):**

```
☑ Full control ────┐
   ☑ Modify        │ (includes these)
      ☑ Write      │
      ☑ Read & execute │
         ☑ Read    │
         ☑ List   │
```

**17. Click "OK"**

**Result:**

```
Permission entries:
Type    Principal          Access        Inherited
Allow   COMPUTERNAME\...   Full Control  No ✓

You now have ONE explicit permission entry!
```

---

**Adding Management Group (Modify Access):**

**18. Click "Add" again**

**19. Click "Select a principal"**

**20. Type:** `Management`

**21. Click "Check Names"**
   - Should become: `COMPUTERNAME\Management` (underlined)

**22. Click "OK"**

**23. Check the box for "Modify"**

**Watch What Happens:**

```
When you check Modify:
☐ Full control
☑ Modify ────────────┐ You checked this
   ☑ Read & execute  │ These auto-checked!
   ☑ List folder...  │
   ☑ Read            │
   ☑ Write           │
```

**Why These Auto-Check:**

```
Modify permission REQUIRES:
├─ Read (must see files to modify them)
├─ Write (must write to modify)
├─ Execute (must run programs)
└─ List (must see folder contents)

This is logical dependency!
```

**24. Click "OK"**

**Result:**

```
Permission entries:
Type    Principal               Access        Inherited
Allow   COMPUTERNAME\abcd1234   Full Control  No
Allow   COMPUTERNAME\Management Modify        No

Perfect! Two explicit permissions.
```

---

**Adding SYSTEM Account (Best Practice):**

**Why Add SYSTEM?**
- SYSTEM is the Windows OS itself
- Needed for:
  - Windows Search indexing
  - File system operations
  - Backup operations
  - System maintenance tasks
- Without it, strange errors can occur

**25. Click "Add"**

**26. Click "Select a principal"**

**27. Type:** `SYSTEM`

**28. Click "Check Names"** (should underline)

**29. Click "OK"**

**30. Check "Full control"**

**31. Click "OK"**

**Final ACL:**

```
Permission entries:
Type    Principal               Access        Inherited
Allow   COMPUTERNAME\abcd1234   Full Control  No
Allow   COMPUTERNAME\Management Modify        No
Allow   NT AUTHORITY\SYSTEM     Full Control  No

This is a properly secured folder!
```

**32. Click "OK"** (closes Advanced Security Settings)

**33. Click "OK"** (closes Properties)

---

**What We've Accomplished (Summary):**

```
Security Model:
✓ Broken inheritance (no unwanted access from parent)
✓ Applied least privilege (only specified users/groups)
✓ Granted appropriate levels (Full Control for admin, Modify for users)
✓ Included SYSTEM (for OS operations)
✓ Everyone else: NO ACCESS (deny by absence, not explicit deny)

This is textbook Windows security!
```

**Active Recall Questions:**

1. Why disable inheritance rather than just removing unwanted entries?
2. What's the difference between "Full Control" and "Modify"?
3. Why is SYSTEM account granted Full Control?
4. What happens if you forget to add yourself to the ACL?

**Answers:**

1. Inheritance means parent changes propagate down; disabling gives you complete control
2. Full Control can change permissions and take ownership; Modify cannot
3. Windows OS needs access for indexing, backups, maintenance operations
4. You'll be locked out! Can only recover using "Take Ownership" feature or admin account

---

**Real-World Disaster Scenario:**

```
Company: "TechCorp"
Situation: Junior admin was "cleaning up" permissions

Action Taken:
1. Disabled inheritance on C:\ImportantData
2. Added Department groups
3. Forgot to add Administrators group
4. Applied changes

Result:
- NO ONE could access C:\ImportantData (not even admins!)
- ACL was locked to everyone
- Had to boot to recovery environment
- Used takeown.exe and icacls.exe from command prompt
- Cost: 4 hours downtime, missed deadline

Lesson: ALWAYS include admin account or Administrators group before removing inherited permissions!
```

---

### **🔧 STEP 7 & 8: Share the Management Directory**

**Now we add the NETWORK layer of security.**

**Recall the Two-Gate Model:**

```
User accesses \\Server\Management\file.txt
    │
    ▼
[GATE 1: Share Permissions] ← We're configuring this now
    │
    ▼
[GATE 2: NTFS Permissions]  ← We already configured this (Step 6)
    │
    ▼
Access Granted (most restrictive wins)
```

---

**Steps:**

1. **Right-click** "Management" folder (still in C:\)
2. **Select "Properties"**
3. **Click "Sharing" tab**

**Sharing Tab Overview:**

```
┌──────────────────────────────────────────┐
│ Management Properties            [X]    │
├──────────────────────────────────────────┤
│ General | Sharing | Security | Previous │
├──────────────────────────────────────────┤
│ Sharing                                  │
│                                          │
│ Network Path: Not Shared                 │
│                                          │
│ Network File and Folder Sharing          │
│ [ Share... ]                             │
│                                          │
│ Advanced Sharing                         │
│ [ Advanced Sharing... ]                  │
│                                          │
│ Password Protection                      │
│ [Network and Sharing Center]            │
└──────────────────────────────────────────┘
```

**Two Sharing Methods:**

1. **"Share..." button:** 
   - Simplified HomeGroup-style sharing
   - Limited control
   - Not suitable for our needs

2. **"Advanced Sharing..." button:**
   - Full control over share name, permissions, connections
   - Professional/enterprise method
   - **WE USE THIS**

---

**4. Click "Advanced Sharing..." button**

**Advanced Sharing Dialog:**

```
┌──────────────────────────────────────────┐
│ Advanced Sharing                    [X] │
├──────────────────────────────────────────┤
│ ☐ Share this folder                      │
│                                          │
│ Settings:                                │
│   Share name: [Management         ] ▼    │
│   [ Add ] [ Remove ]                     │
│                                          │
│   Comments: [_____________________]      │
│                                          │
│   Limit: ○ Maximum allowed               │
│          ● Allow this number: [10  ] ▼   │
│                                          │
│   [ Permissions ] [ Caching ]           │
│                                          │
│            [OK] [Cancel] [Apply]         │
└──────────────────────────────────────────┘
```

**5. Check "Share this folder"**

**Settings Become Active:**

**6. Share name:** Change to `Management Share`

**Understanding Share Names:**

```
Folder Name: Management (filesystem name)
Share Name: Management Share (network name)

UNC Path will be: \\COMPUTERNAME\Management Share

Share name can be different from folder name:
Folder: C:\Financial_Reports_2024
Share: FinanceReports ← Simpler for users
```

**Best Practices for Share Names:**

```
✓ Good:
- Management Share
- Finance-Reports
- HR_Documents
- ProjectPhoenix

✗ Bad:
- Share1 (not descriptive)
- My Documents (spaces problematic for scripts)
- C$ (conflicts with admin shares)
- a (too short, unclear)
```

**7. Comments field (optional):** You can add a description
   ```
   Management department shared files
   ```
   - This appears when browsing network shares
   - Helpful in large environments

**8. Limit the number of simultaneous users:**

Options:
- **Maximum allowed:** Windows limitation (10 for non-server, unlimited for Server)
- **Allow this number:** Custom limit

**For this lab:** Leave as "Maximum allowed"

**In production:**
- Monitor connection count
- Server OS removes the 10-connection limit
- Use DFS for load balancing

---

**9. Click "Permissions" button**

**Share Permissions Dialog:**

```
┌──────────────────────────────────────────┐
│ Permissions for Management Share    [X] │
├──────────────────────────────────────────┤
│ Group or user names:                     │
│ ┌──────────────────────────────────────┐│
│ │ Everyone                             ││ ← Default!
│ └──────────────────────────────────────┘│
│ [ Add ] [ Remove ]                       │
│                                          │
│ Permissions for Everyone:      Allow Deny│
│ Full Control                    ☐     ☐ │
│ Change                          ☐     ☐ │
│ Read                            ☑     ☐ │ ← Default
│                                          │
│         [OK] [Cancel] [Apply]           │
└──────────────────────────────────────────┘
```

**Default Share Permissions: INSECURE!**

```
Everyone → Read

"Everyone" includes:
- All local users
- All domain users (if domain-joined)
- Anonymous network connections (if enabled)
- Guest account (if enabled)

This is TOO PERMISSIVE for sensitive data!
```

---

**Remove Everyone:**

**10. Select "Everyone"**

**11. Click "Remove"**

**Result:**

```
Group or user names:
(empty)

Permissions become grayed out (nothing selected)
```

---

**Add Management Group:**

**12. Click "Add"**

**Select Users or Groups Dialog:**

**13. Type:** `Management`

**14. Click "Check Names"**

**15. Click "OK"**

**Back to Permissions Dialog:**

**16. Management is now selected**

**17. Set permissions:**

**Share Permission Options:**

```
Full Control:
  - Read files
  - Change files
  - Delete files
  - Change share permissions

Change:
  - Read files
  - Change files
  - Delete files
  (No permission control)

Read:
  - View files only
  - Execute programs
```

**Our Goal:** Management users should have full access to files over network.

**18. Check "Change"** (or "Full Control" - your choice)

**Decision Point: Change vs Full Control?**

```
Change:
  ✓ Sufficient for daily work
  ✓ Cannot modify share permissions
  ✓ Follows least privilege
  
Full Control:
  ✓ Can modify share permissions
  ✗ Allows users to change who else has access
  ✗ Generally too much power

Recommendation: Change
```

**For this lab, either works. In production: Change is safer.**

**19. Check "Change" (Allow column)**

**Result:**

```
Permissions for Management:         Allow Deny
Full Control                         ☐     ☐
Change                               ☑     ☐
Read                                 ☑     ☐  ← Auto-checked!
```

**Why Read auto-checks:** Change includes Read (dependency).

**20. Click "OK"** (closes Permissions dialog)

**Back to Advanced Sharing Dialog:**

**21. Click "OK"** (closes Advanced Sharing)

---

**Final Dialog:**

```
┌──────────────────────────────────────────┐
│ Management Properties            [X]    │
├──────────────────────────────────────────┤
│ General | Sharing | Security | Previous │
├──────────────────────────────────────────┤
│ Sharing                                  │
│                                          │
│ Network Path:                            │
│ \\COMPUTERNAME\Management Share          │
│                                          │
│ Network File and Folder Sharing          │
│ [ Share... ]                             │
│                                          │
│ Advanced Sharing                         │
│ [ Advanced Sharing... ]                  │
└──────────────────────────────────────────┘
```

**22. Note the Network Path!** This is your UNC path.

**23. Click "Close"**

---

**What We've Accomplished:**

```
Network Share Configuration:
✓ Share Name: "Management Share"
✓ Share Permissions: Management → Change
✓ UNC Path: \\COMPUTERNAME\Management Share
✓ Removed "Everyone" (secure)

Combined with NTFS:
─────────────────────────────
         │  NTFS  │  Share
─────────┼────────┼─────────
abcd1234 │   FC   │  (none)
Management│ Modify │ Change
Everyone │  None  │  None
─────────┴────────┴─────────

Effective Network Access for Management:
  Modify (most restrictive of Modify + Change)
  
Effective Local Access for Management:
  Modify (share permissions don't apply locally!)
```

---

**Testing the Share:**

**24. Press Win+R** (Run dialog)

**25. Type:** `\\localhost\Management Share`

**26. Press Enter**

**You should see:** Empty folder opens (success!)

**27. Right-click → New → Text Document**

**28. Name it:** `test.txt`

**29. If successful, delete it**

---

**Active Recall:**

1. What's the difference between folder name and share name?
2. Why remove "Everyone" from share permissions?
3. What happens if you only set share permissions without NTFS?
4. Why might Change be better than Full Control for share permissions?

**Answers:**

1. Folder name is filesystem; share name is network identifier (can differ)
2. "Everyone" is too broad and includes potentially anonymous users
3. Local access bypasses share permissions (security hole!)
4. Change prevents users from modifying share permissions (limiting lateral privilege escalation)

---

**📝 DELIVERABLE #4 PREPARATION:**

You'll need to answer: "What are the Share permissions on Management Share? Why did you set them this way?"

**Answer to prepare:**

```
Share Permissions on "Management Share":
- Management group: Change (Read + Write + Delete)
- Everyone: Removed (No Access)

Reasoning:
1. Removed "Everyone" to prevent unauthorized network access
2. Granted Management group "Change" permission to allow:
   - Reading existing files
   - Creating new files
   - Modifying files
   - Deleting files
3. Did not grant "Full Control" to prevent Management users from modifying share permissions (principle of least privilege)
4. Share permissions work in conjunction with NTFS permissions
5. Effective network access is limited by most restrictive permission (in this case, NTFS Modify)
6. This configuration follows security best practices: restrictive NTFS permissions (primary security) + simple share permissions (network gate)
```

---

## **🔧 STEP 9: Verify Your Configuration**

**Critical Step:** Always test your security configuration!

**Test 1: Local Access**

1. Open File Explorer
2. Navigate to `C:\Management`
3. Right-click → New → Text Document
4. Name: `LocalTest.txt`
5. Open it, type: "Testing local access"
6. Save and close
7. **Success?** ✓ Your permissions work locally

**Test 2: Network Access**

1. Press Win+R
2. Type: `\\localhost\Management Share`
3. Press Enter
4. You should see `LocalTest.txt`
5. Right-click → New → Text Document
6. Name: `NetworkTest.txt`
7. Open it, type: "Testing network access"
8. Save and close
9. **Success?** ✓ Your share works!

**Test 3: Permission Verification**

1. In either view, right-click `LocalTest.txt`
2. Properties → Security tab
3. Verify you see:
   - Your account: Full Control
   - Management: Modify
   - SYSTEM: Full Control
   - **NO inherited permissions**

**Test 4: Access Denial (Verify Security)**

1. Try to access from a non-Management account (we'll do this in next step)

**Clean Up:**

Delete `LocalTest.txt` and `NetworkTest.txt` before proceeding.

---

### **🔧 STEP 10: Test Login as Management User**

**Critical Concept:** Testing is not optional—it's required for professional security administration.

**Why Test?**
- Verify theory matches reality
- Catch misconfigurations before production
- Understand user experience
- Document functionality for audits

**Pre-Test Checklist:**

```
Before testing, confirm:
☑ User1a exists
☑ User1a is member of Management group
☑ Management folder has proper NTFS permissions
☑ Management Share has proper share permissions
☑ You can access folder as admin
```

---

**Steps:**

**1. Save any open work!** (You're about to sign out)

**2. Click Start menu**

**3. Click your account icon (shows your username/picture)**

**4. Select "Sign out"**

**Alternative Methods:**
- **Ctrl + Alt + Delete** → Sign out
- **Win + L** → Lock (then switch users)
- **Win + X → U → S** (keyboard shortcut for Sign out)

---

**Login Screen:**

```
┌────────────────────────────────────────┐
│                                        │
│         [User Icon]                    │
│                                        │
│         abcd1234                       │
│     [Password field]                   │
│                                        │
│         Other user  ←──── Click this   │
│                                        │
└────────────────────────────────────────┘
```

**5. Click "Other user"** (bottom left)

**Login Form:**

```
┌────────────────────────────────────────┐
│                                        │
│      [Generic User Icon]               │
│                                        │
│ Username: [_________________]          │
│                                        │
│ Password: [_________________]          │
│                                        │
│ Sign in to: [COMPUTERNAME    ▼]       │
│                                        │
└────────────────────────────────────────┘
```

**6. Username:** `User1a`

**7. Password:** `P@ssW0rd`

**8. Press Enter** (or click →)

---

**First Login Process (Watch Carefully):**

```
"Preparing Windows"
   ↓
"Setting up your profile"
   ↓
"Hi"
   ↓  
"We're getting things ready for you"
   ↓
"This might take a few minutes"
   ↓
Desktop appears!
```

**What's Happening Behind the Scenes:**

```
First Login Tasks:
1. Create user profile directory: C:\Users\User1a
2. Copy default profile template (Desktop, Documents, AppData, etc.)
3. Create NTUSER.DAT (user registry hive)
4. Initialize user environment variables
5. Generate access token with User1a's SID + group SIDs
6. Apply group policies (if any)
7. Load shell (Explorer.exe)
8. Run startup programs

This is why first login takes longer than subsequent logins!
```

---

**Desktop Appears (User1a's Session):**

**9. Press Win + E** (File Explorer)

**10. Navigate to C:\Management**

**Can You Access It?**

```
Expected Result: ✓ YES

Why?
├─ User1a is member of Management group
├─ Management group has Modify on C:\Management
├─ User1a inherits this permission
└─ Access granted!
```

**11. Right-click → New → Text Document**

**12. Name:** `User1a_Test.txt`

**13. Open it**

**14. Type:** 
```
Testing Management access as User1a
Date: [today's date]
This file confirms User1a has Modify permissions.
```

**15. Save and close**

---

**Test Network Access:**

**16. Press Win + R**

**17. Type:** `\\localhost\Management Share`

**18. Press Enter**

**Can You Access It?**

```
Expected Result: ✓ YES

Why?
Network Access Flow:
1. User1a connects to \\localhost\Management Share
2. Windows checks Share Permissions:
   ├─ Management group: Change ✓ (User1a is member)
   └─ Pass through Gate 1
3. Windows checks NTFS Permissions:
   ├─ Management group: Modify ✓ (User1a is member)
   └─ Pass through Gate 2
4. Effective Access: Modify (most restrictive)
5. Access granted!
```

**19. Verify you can see `User1a_Test.txt`**

**20. Open it, confirm contents**

**21. Modify the file (add a line: "Verified network access works!")**

**22. Save**

---

**Additional Tests (Optional but Educational):**

**Test: Can User1a change permissions?**

1. Right-click `C:\Management` folder
2. Properties → Security → Advanced
3. Try to click "Add"

**Expected:** Either:
- Button disabled (doesn't have Full Control)
- Can add but changes don't save (modify permission blocked)

**This confirms User1a has Modify (not Full Control)!**

---

**Test: Can User1a delete files?**

1. Right-click `User1a_Test.txt`
2. Select "Delete"
3. Confirm deletion

**Expected:** ✓ File deletes (Modify includes Delete permission)

---

**Visual Confirmation:**

**23. Right-click C:\Management → Properties → Security**

**24. Select "Management" group**

**25. Observe permissions:**

```
Permissions for Management:           Allow
Full control                          ☐
Modify                                ☑
Read & execute                        ☑
List folder contents                  ☑
Read                                  ☑
Write                                 ☑
Special permissions                   ☐
```

**This is EXACTLY what we configured!**

---

**Understanding What Just Happened:**

```
User1a Login Flow:
┌─────────────────────────────────────────┐
│ 1. Credentials entered                  │
│    ↓                                    │
│ 2. Windows authenticates against SAM    │
│    ↓                                    │
│ 3. Access Token Created:                │
│    ├─ User1a SID: S-1-5-21-xxx-1001     │
│    ├─ Management SID: S-1-5-21-xxx-2001 │
│    ├─ Users SID: S-1-5-32-545           │
│    ├─ Authenticated Users SID: S-1-5-11 │
│    └─ Everyone SID: S-1-1-0             │
│    ↓                                    │
│ 4. File access to C:\Management:        │
│    ├─ Read folder ACL                   │
│    ├─ Compare token SIDs to ACL         │
│    ├─ Match: Management SID → Modify    │
│    └─ Grant access                      │
└─────────────────────────────────────────┘
```

---

### **🔧 STEP 11: Switch Back to Your College Account**

**1. Click Start → User1a (account icon)**

**2. Select "Sign out"**

**3. At login screen, select your college account (abcd1234)**

**4. Enter your password**

**5. Press Enter**

**Welcome back to admin session!**

---

**Verification:**

**6. Navigate to C:\Management**

**7. Check if `User1a_Test.txt` exists**

**Expected:** ✓ File is there (persistence confirmed)

**What This Proves:**

```
✓ User1a successfully created/modified files
✓ Changes persisted across logouts
✓ NTFS permissions working correctly
✓ Multi-user environment functioning
✓ Access token properly generated with group membership
```

---

### **📸 DELIVERABLE %1: Screenshot of User List**

**Purpose:** Document all created user accounts at end of Section 1.

**Steps:**

1. **Right-click Start → Computer Management**

2. **Expand "Local Users and Groups"**

3. **Click "Users"**

**What You Should See:**

```
List should include:
- Administrator (disabled)
- DefaultAccount (disabled)
- Guest (disabled)
- [Your college account: abcd1234]
- User1a
- User1b
- User1c
- User1d
- WDAGUtilityAccount (system)
```

**Taking the Screenshot:**

**Method 1: Snip & Sketch (Recommended)**

1. Press **Win + Shift + S**
2. Screen dims
3. Click and drag to select Computer Management window
4. Screenshot copied to clipboard
5. Open Word/lab report document
6. Press **Ctrl + V**
7. Label: "Deliverable %1 - User List (End of Section 1)"

**Method 2: Print Screen**

1. Click on Computer Management window (make it active)
2. Press **Alt + Print Screen** (captures active window only)
3. Paste into document

**Method 3: Snipping Tool**

1. Start → Type "Snipping Tool"
2. New → Select area
3. Save or copy

**What to Capture:**

Ensure screenshot shows:
- ✓ Computer Management title bar (proves it's the right tool)
- ✓ "Users" folder selected in left pane
- ✓ All usernames visible in right pane
- ✓ Clear, readable text

---

### **📸 DELIVERABLE %2: Management Group Members**

**Purpose:** Document Management group membership configuration.

**Steps:**

1. **In Computer Management** (already open)

2. **Click "Groups"** (under Local Users and Groups)

3. **Double-click "Management" group**

**Management Properties Window:**

```
┌────────────────────────────────────────┐
│ Management Properties          [X]    │
├────────────────────────────────────────┤
│ General                                │
│                                        │
│ Group name: Management                 │
│                                        │
│ Description: Management team members...│
│                                        │
│ Members:                               │
│ ┌────────────────────────────────────┐│
│ │ User1a                             ││
│ │ User1b                             ││
│ │ User1c                             ││
│ │ User1d                             ││
│ └────────────────────────────────────┘│
│                                        │
│     [Add...] [Remove]                  │
│                                        │
│                [OK] [Cancel] [Apply]   │
└────────────────────────────────────────┘
```

**Take Screenshot:**

1. Press **Win + Shift + S**
2. Select this dialog
3. Paste into document
4. Label: "Deliverable %2 - Management Group Members"

**What to Capture:**

Ensure screenshot shows:
- ✓ Window title "Management Properties"
- ✓ Description field (if you added one)
- ✓ All four members listed clearly
- ✓ Clear, readable text

**4. Click OK** (close dialog)

---

### **📸 DELIVERABLE %3: Management Directory Permissions**

**Purpose:** Document NTFS permission configuration for Management folder.

**Steps:**

1. **Open File Explorer**

2. **Navigate to C:\**

3. **Right-click "Management" folder**

4. **Properties → Security tab**

**Security Tab View:**

```
┌────────────────────────────────────────┐
│ Management Properties          [X]    │
├────────────────────────────────────────┤
│ General│Sharing│Security│Previous Ver. │
├────────────────────────────────────────┤
│                                        │
│ Group or user names:                   │
│ ┌────────────────────────────────────┐│
│ │ COMPUTERNAME\abcd1234              ││
│ │ COMPUTERNAME\Management            ││
│ │ NT AUTHORITY\SYSTEM                ││
│ └────────────────────────────────────┘│
│                                        │
│ Permissions for Management:       Allow│
│ Full control                       ☐  │
│ Modify                             ☑  │
│ Read & execute                     ☑  │
│ List folder contents               ☑  │
│ Read                               ☑  │
│ Write                              ☑  │
│                                        │
│ [Edit...] [Advanced]                   │
└────────────────────────────────────────┘
```

**5. Click "Management" group** (to show its permissions)

**Take Screenshot:**

1. Press **Win + Shift + S**
2. Select this dialog
3. Paste into document
4. Label: "Deliverable %3 - Management Directory Security Permissions"

**What to Capture:**

Ensure screenshot shows:
- ✓ Window title "Management Properties"
- ✓ Security tab selected
- ✓ All three principals listed (abcd1234, Management, SYSTEM)
- ✓ Management selected with permissions visible
- ✓ Checkboxes for Modify permissions clearly visible
- ✓ No "(Inherited from...)" text (proves inheritance disabled)

**6. Click Cancel** (close dialog)

---

### **📝 DELIVERABLE #4: Share Permissions Explanation**

**Question:** What are the Share permissions on the share called Management Share? Why did you set the permissions this way?

**Write this comprehensive answer in your lab report:**

---

**Answer:**

**Share Permissions on "Management Share":**

The share "Management Share" has the following permissions configured:
- **Management group:** Change (includes Read and Write)
- **Everyone:** Removed (No Access)

**Technical Explanation:**

Share permissions control access to the folder when accessed over the network using SMB protocol (\\computername\sharename). These permissions work as the first security gate, with NTFS permissions serving as the second gate.

**Detailed Reasoning:**

**1. Removed "Everyone" Group:**
   - Windows creates shares with "Everyone → Read" by default
   - "Everyone" is a special identity that includes all users who can authenticate to the system
   - This includes local users, domain users, and potentially guest accounts
   - Leaving "Everyone" creates a security vulnerability where unauthorized users could browse the share
   - Following principle of least privilege, we removed this overly permissive default

**2. Granted Management Group "Change" Permission:**
   - Change permission allows: Read, Write, and Delete operations
   - Does NOT allow: Changing share permissions or ownership
   - This level is appropriate for daily operational needs
   - Users can create, modify, and delete files as needed for their work
   - Prevents lateral privilege escalation (users cannot modify who else has access)

**3. Why Not "Full Control"?**
   - Full Control at share level would allow Management users to modify the share permissions themselves
   - This could allow users to grant access to unauthorized individuals
   - Violates principle of least privilege
   - Change permission provides sufficient access for all legitimate file operations

**4. Defense in Depth Strategy:**
   - Share permissions act as network-level access control
   - NTFS permissions (already configured) provide file-system level control
   - The most restrictive permission between the two determines effective access
   - If Share permissions were compromised, NTFS permissions would still protect data
   - This layered approach follows security best practices

**5. Effective Network Access:**
   ```
   Share Permission: Management → Change
   NTFS Permission: Management → Modify
   Effective Access: Modify (most restrictive)
   ```
   - Users can read, write, modify, and delete files
   - Users cannot change permissions or take ownership
   - Access is properly restricted to Management group members only

**6. Operational Benefits:**
   - Clear access control (only Management group has access)
   - Easy to audit (single group, explicit permissions)
   - Simple to manage (add/remove users from group, not share)
   - Scalable (adding 10 more users requires one group membership change)
   - Secure (follows least privilege, defense in depth)

**Conclusion:**

This configuration balances security with functionality. Management users have full operational capability (read/write/delete) while preventing unauthorized access and limiting privilege escalation. The combination of Share and NTFS permissions creates a robust, auditable, and maintainable security model that follows industry best practices.

---

## **📊 SECTION 1 COMPLETE - MENTAL MODEL CHECK**

**🧠 Active Recall Challenge:**

Before moving to Section 2, answer these without looking:

1. What are the four layers of Windows security architecture?
2. Why do we assign permissions to groups instead of users?
3. What's the difference between inherited and explicit permissions?
4. What's the effective access when Share = Change and NTFS = Read?
5. Why remove inheritance before setting custom permissions?
6. What does SYSTEM account need Full Control?
7. When do group membership changes take effect?

**Answers in next section's introduction...**

---

**What You've Mastered:**

```
✓ User account creation (GUI)
✓ Group creation and management
✓ Group membership assignment
✓ NTFS permission architecture
✓ Inheritance disable and explicit ACL creation
✓ Share creation with proper permissions
✓ Two-gate security model understanding
✓ Access testing and verification
✓ Documentation with screenshots
✓ Real-world security best practices
```

**Aphorism to Remember:**

> *"In security, complexity is the enemy of safety. Simple, explicit, and well-documented permissions are the foundation of defensible systems."*

---

# **SECTION 2: PowerShell Automation (Professional Administration)**

**Why PowerShell?**

```
GUI Administration:
├─ ✓ Visual feedback
├─ ✓ Easy to learn
├─ ✗ Time-consuming at scale
├─ ✗ Not repeatable
├─ ✗ Human error prone
└─ ✗ Not auditable

PowerShell Administration:
├─ ✓ Scriptable and repeatable
├─ ✓ Fast at scale
├─ ✓ Version control friendly
├─ ✓ Audit trail in scripts
├─ ✓ Remote management capable
└─ ✗ Steeper learning curve
```

**Real-World Scenario:**

```
Task: Create 50 user accounts with specific group memberships

GUI Method:
- 50 users × 3 minutes each = 150 minutes (2.5 hours)
- High error rate (typos, forgotten steps)
- No documentation

PowerShell Method:
- Write script once: 10 minutes
- Execute: 30 seconds
- Perfect consistency
- Script serves as documentation
- Reusable for future batches
```

**Aphorism:** *"Automate the repeatable, so you can focus on the exceptional."*

---

## **PowerShell Primer: Essential Concepts**

### **Verb-Noun Command Structure**

PowerShell uses consistent command naming:

```
Verb-Noun

Examples:
Get-LocalUser    (Verb: Get,  Noun: LocalUser)
New-LocalGroup   (Verb: New,  Noun: LocalGroup)
Set-Acl          (Verb: Set,  Noun: Acl)
Add-LocalGroupMember (Verb: Add, Noun: LocalGroupMember)
```

**Common Verbs:**

```
Get-    Retrieve information
New-    Create new object
Set-    Modify existing object
Add-    Add to collection
Remove- Delete object
Enable- Activate feature
Disable- Deactivate feature
Test-   Check condition
```

**Mnemonic: "Get New Set, Add Remove Enable"**
*"Generous Nurses Serve All Really Eager"*

---

### **Parameters and Syntax**

**Basic Structure:**

```powershell
CommandName -Parameter1 Value1 -Parameter2 Value2

Example:
New-LocalUser -Name "User2a" -Password $securePassword
```

**Parameter Types:**

```powershell
# String parameters (text)
-Name "User2a"

# Switch parameters (true/false flags)
-PasswordNeverExpires   # Presence = true
-AccountNeverExpires

# Object parameters (complex types)
-Password (ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force)
```

---

### **Pipeline (`|`) - The Power Multiplier**

**Concept:** Output of one command becomes input to next.

```powershell
# Without pipeline (verbose):
$acl = Get-Acl -Path "C:\Management"
Set-Acl -Path "C:\Accounting" -AclObject $acl

# With pipeline (elegant):
Get-Acl -Path "C:\Management" | Set-Acl -Path "C:\Accounting"
```

**Visualization:**

```
Get-Acl                    Set-Acl
┌───────────┐             ┌───────────┐
│ Read ACL  │────────────▶│ Write ACL │
│ from Mgmt │   Pipeline  │ to Acct   │
└───────────┘             └───────────┘
```

**Real-World Example:**

```powershell
# Get all users, filter for User2*, display as table
Get-LocalUser | Where-Object {$_.Name -like "User2*"} | Format-Table Name, Enabled
```

---

### **Variables in PowerShell**

**Syntax:** Variables start with `$`

```powershell
$username = "User2a"
$password = ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force
$acl = Get-Acl -Path "C:\Management"
```

**Special Variables:**

```powershell
$env:HOMEPATH     # Environment variable
$_                # Current pipeline object
$PSScriptRoot     # Script's directory
$true / $false    # Boolean values
```

---

### **Common Patterns**

**Pattern 1: Secure Password Creation**

```powershell
$password = ConvertTo-SecureString "PlainTextPassword" -AsPlainText -Force

Breakdown:
- ConvertTo-SecureString: Encrypts string
- -AsPlainText: Accept plain text input
- -Force: Suppress warning (password visible in script)
```

**Pattern 2: Creating ACL Rules**

```powershell
$acl = Get-Acl -Path "C:\Folder"
$permission = "GroupName","Modify","ContainerInherit,ObjectInherit","None","Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl -Path "C:\Folder" -AclObject $acl
```

---

### **Error Handling**

**Error Messages:**

```powershell
PS C:\> Get-LocalUser -Name "NonExistent"
Get-LocalUser : User NonExistent was not found.
At line:1 char:1
+ Get-LocalUser -Name "NonExistent"
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo: ObjectNotFound: (NonExistent:String) [Get-LocalUser], UserNotFoundException
```

**Debugging Strategy:**

```
1. Read error message carefully (top line is most important)
2. Check spelling of names/parameters
3. Verify object exists (use Get- commands)
4. Run commands step-by-step (don't pipeline everything at first)
5. Use Get-Help CommandName for syntax
```

---

**Active Recall Answers from Section 1:**

1. **Four layers:** Share Permissions, NTFS Permissions, User Rights/Privileges, Authentication
2. **Groups instead of users:** Scalability, manageability, role-based access control
3. **Inherited vs Explicit:** Inherited come from parent (gray, can't modify), Explicit set directly (black, can modify)
4. **Effective access:** Read (most restrictive wins)
5. **Remove inheritance:** To prevent unwanted parent permissions from leaking through
6. **SYSTEM Full Control:** OS needs access for indexing, backups, maintenance
7. **Group changes take effect:** Next login (token refresh)

---

### **🔧 STEP 16: Create Four User Accounts with PowerShell**

**Learning Objective:** Automate user creation for efficiency and consistency.

**Command Anatomy:**

```powershell
New-LocalUser -Name "User2a" -Password (ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force) -PasswordNeverExpires -AccountNeverExpires
```

**Let's break this down piece by piece:**

**Part 1: `New-LocalUser`**
```
Function: Creates a local user account
Module: Microsoft.PowerShell.LocalAccounts
Requires: Administrator privileges
Alternative: net user [username] [password] /add (legacy command)
```

**Part 2: `-Name "User2a"`**
```
Parameter: Specifies username
Type: String
Constraints:
  - Maximum 20 characters
  - Cannot contain: " / \ [ ] : ; | = , + * ? < > @
  - Cannot be only dots or spaces
  - Case-insensitive (but stored as entered)
```

**Part 3: `-Password (ConvertTo-SecureString...)`**
```
Why SecureString?
- Passwords must NEVER be stored in plain text
- SecureString encrypts password in memory
- Uses DPAPI (Data Protection API)
- Encrypted per-user, per-machine (can't be decrypted elsewhere)

The nested command:
  ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force
  
  - ConvertTo-SecureString: Cmdlet that encrypts
  - "P@ssW0rd": Our password (plain text input)
  - -AsPlainText: Flag saying "I know I'm giving you plain text"
  - -Force: Suppress security warning

Why the parentheses?
- Tells PowerShell to execute inner command first
- Result (SecureString object) passed to -Password parameter
```

**Part 4: `-PasswordNeverExpires`**
```
Type: Switch parameter (no value needed, presence = true)
Effect: Password expiration policy disabled
Default: Passwords expire based on local security policy (usually 42 days)

⚠️ Production Note:
  In real environments, password expiration is crucial!
  We disable only for lab stability.
```

**Part 5: `-AccountNeverExpires`**
```
Type: Switch parameter
Effect: Account expiration date not set
Default: Accounts don't expire unless explicitly set
Use Case: Service accounts, shared accounts (carefully!)
```

---

**Real-World Comparison:**

```powershell
# LAB VERSION (simple, weak security)
New-LocalUser -Name "User2a" -Password (ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force) -PasswordNeverExpires -AccountNeverExpires

# PRODUCTION VERSION (secure, policy-compliant)
$securePassword = Read-Host "Enter password for User2a" -AsSecureString
New-LocalUser -Name "User2a" `
  -Password $securePassword `
  -Description "Accounting Department - Jane Smith" `
  -UserMayNotChangePassword:$false `
  -PasswordNeverExpires:$false `
  -AccountExpires (Get-Date).AddDays(90)
```

**Key Differences:**

| Aspect | Lab Version | Production Version |
|--------|-------------|-------------------|
| Password Source | Hardcoded in script | Interactive input (not in script) |
| Password Expiration | Never | 42 days (default policy) |
| Account Expiration | Never | 90 days (contractor example) |
| Description | None | Full name, department |
| Documentation | Minimal | Comprehensive |

---

**Execute the Commands:**

**Open PowerShell as Administrator** (if not already open)

**Command 1: Create User2a**

```powershell
New-LocalUser -Name "User2a" -Password (ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force) -PasswordNeverExpires -AccountNeverExpires
```

**Expected Output:**

```
Name   Enabled Description
----   ------- -----------
User2a True
```

**What This Output Means:**

```
Name: User2a          ← Username created
Enabled: True         ← Account is active (not disabled)
Description: (blank)  ← No description set
```

**Behind the Scenes:**

```
When you pressed Enter:
1. PowerShell validated administrator privileges ✓
2. Checked if username already exists (conflict check)
3. Generated new SID: S-1-5-21-[computer]-[RID]
4. Hashed password using NTLM/Kerberos algorithms
5. Created SAM database entry
6. Added to "Users" group automatically
7. Created profile path placeholder: C:\Users\User2a
8. Set password policy flags in user attributes
9. Returned user object to console
```

---

**Command 2: Create User2b**

```powershell
New-LocalUser -Name "User2b" -Password (ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force) -PasswordNeverExpires -AccountNeverExpires
```

**Command 3: Create User2c**

```powershell
New-LocalUser -Name "User2c" -Password (ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force) -PasswordNeverExpires -AccountNeverExpires
```

**Command 4: Create User2d**

```powershell
New-LocalUser -Name "User2d" -Password (ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force) -PasswordNeverExpires -AccountNeverExpires
```

**After each command, you should see similar success output.**

---

**Verification Commands:**

**View All User2 Accounts:**

```powershell
Get-LocalUser | Where-Object {$_.Name -like "User2*"}
```

**Expected Output:**

```
Name   Enabled Description
----   ------- -----------
User2a True
User2b True
User2c True
User2d True
```

**Understanding This Command:**

```powershell
Get-LocalUser | Where-Object {$_.Name -like "User2*"}
     ↓              ↓                    ↓
  Retrieve    Pass through     Filter by name
  all users      pipeline      pattern matching

Pipeline Flow:
Get-LocalUser → [All users] → Where-Object → [Filtered: User2*]
```

**The `$_` Variable:**

```
$_ represents the "current object" in the pipeline

As objects flow through:
User1a → $_ = User1a → Name -like "User2*"? → NO → Discard
User2a → $_ = User2a → Name -like "User2*"? → YES → Keep
User2b → $_ = User2b → Name -like "User2*"? → YES → Keep
...
```

**Pattern Matching with `-like`:**

```
Wildcards:
* = Zero or more characters
? = Exactly one character

Examples:
"User2*"     matches: User2a, User2b, User2abc, User2
"User2?"     matches: User2a, User2b (but NOT User2ab)
"*2a"        matches: User2a, TestUser2a, 2a
"User[2-3]a" matches: User2a, User3a (bracket notation)
```

---

**Detailed View of Single User:**

```powershell
Get-LocalUser -Name "User2a" | Format-List *
```

**Expected Output (comprehensive):**

```
AccountExpires         : 
Description            : 
Enabled                : True
FullName               : 
PasswordChangeableDate : [Date]
PasswordExpires        : 
UserMayChangePassword  : True
PasswordRequired       : True
PasswordLastSet        : [Date/Time]
LastLogon              : 
Name                   : User2a
SID                    : S-1-5-21-3623811015-3361044348-30300820-1005
PrincipalSource        : Local
ObjectClass            : User
```

**Understanding Each Property:**

| Property | Meaning | Our Value |
|----------|---------|-----------|
| **AccountExpires** | When account stops working | (blank) = Never |
| **Enabled** | Is account active? | True = Yes |
| **PasswordExpires** | When password becomes invalid | (blank) = Never |
| **PasswordLastSet** | Last password change timestamp | Creation time |
| **SID** | Security Identifier (unique ID) | S-1-5-21-...-1005 |
| **PrincipalSource** | Local vs Domain | Local |
| **ObjectClass** | Type of security principal | User |

**The SID Breakdown:**

```
S-1-5-21-3623811015-3361044348-30300820-1005
│ │ │ │                                    │
│ │ │ │                                    └─ RID (Relative ID)
│ │ │ │                                       Sequential: 1001, 1002, 1003...
│ │ │ │
│ │ │ └─ Machine-specific identifier (unique per computer)
│ │ │    Three numbers that identify THIS computer
│ │ │
│ │ └─ NT Authority (21 = Non-unique IDs, machine/domain level)
│ │
│ └─ Security Authority (5 = NT Authority)
│
└─ Revision Level (Always 1)

Mnemonic: "S-Rev-Auth-SubAuth-RID"
```

**Why SIDs Matter:**

```
Scenario: Company renames user account
- Old: jsmith → New: john.smith
- Username changes in GUI
- SID remains: S-1-5-21-xxx-1005
- All permissions still work!
- Audit logs still track correctly

This is why permissions survive username changes!
```

---

**Advanced Verification: Check Group Membership**

```powershell
Get-LocalUser -Name "User2a" | Select-Object Name, @{Name="Groups";Expression={(Get-LocalGroup | Where-Object {(Get-LocalGroupMember -Group $_.Name).Name -contains $env:COMPUTERNAME\$($_.Name)})}}
```

**Simpler Alternative:**

```powershell
# Check what groups User2a is in (requires querying each group)
Get-LocalGroup | ForEach-Object {
    $group = $_
    $members = Get-LocalGroupMember -Group $group.Name -ErrorAction SilentlyContinue
    if ($members.Name -contains "$env:COMPUTERNAME\User2a") {
        Write-Host "User2a is in: $($group.Name)"
    }
}
```

**Expected Output:**

```
User2a is in: Users
```

**Why Only "Users"?**

```
When you create a local user:
1. Automatically added to "Users" group (built-in behavior)
2. Not added to any other groups by default
3. We'll add them to "Accounting" group in Step 19

This is different from GUI, which has same behavior!
```

---

**Error Scenarios and Troubleshooting:**

**Error 1: User Already Exists**

```powershell
PS C:\> New-LocalUser -Name "User2a" -Password (ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force)

New-LocalUser : User account User2a already exists.
At line:1 char:1
+ New-LocalUser -Name "User2a" ...
```

**Solution:**

```powershell
# Option 1: Delete and recreate
Remove-LocalUser -Name "User2a"
New-LocalUser -Name "User2a" -Password (ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force)

# Option 2: Use different name
New-LocalUser -Name "User2a_v2" ...

# Option 3: Modify existing (if you just want to change settings)
Set-LocalUser -Name "User2a" -Description "Updated description"
```

**Error 2: Insufficient Privileges**

```powershell
New-LocalUser : Access is denied
```

**Solution:** Run PowerShell as Administrator (Right-click → Run as administrator)

**Error 3: Password Doesn't Meet Complexity Requirements**

```powershell
New-LocalUser : The password does not meet the password policy requirements.
```

**Check Current Policy:**

```powershell
net accounts
```

**Solution:** Use compliant password or disable policy temporarily (not recommended)

---

**Pro Tip: Bulk User Creation**

**For Real-World Scenarios (Creating 100 users):**

```powershell
# Create array of usernames
$users = @("User2a", "User2b", "User2c", "User2d")

# Loop through and create each
foreach ($username in $users) {
    $password = ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force
    New-LocalUser -Name $username -Password $password -PasswordNeverExpires -AccountNeverExpires
    Write-Host "Created: $username" -ForegroundColor Green
}
```

**Even Better: From CSV File**

```powershell
# Users.csv contains:
# Username,FullName,Description
# User2a,John Smith,Accounting
# User2b,Jane Doe,Accounting
# ...

Import-Csv "C:\Users.csv" | ForEach-Object {
    $password = ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force
    New-LocalUser -Name $_.Username `
                  -Password $password `
                  -FullName $_.FullName `
                  -Description $_.Description `
                  -PasswordNeverExpires `
                  -AccountNeverExpires
}
```

---

### **🔧 STEP 17: Create the Accounting Group**

**Learning Objective:** Understand group creation via command line.

**Command:**

```powershell
New-LocalGroup -Name "Accounting"
```

**Command Breakdown:**

```
New-LocalGroup
│
├─ Function: Creates local security group
├─ Module: Microsoft.PowerShell.LocalAccounts
├─ Requires: Administrator privileges
└─ Returns: LocalGroup object

-Name "Accounting"
│
├─ Parameter type: String
├─ Required: Yes (must specify group name)
├─ Constraints: Same as username constraints
└─ Case-insensitive but case-preserving
```

**Execute the Command:**

```powershell
New-LocalGroup -Name "Accounting"
```

**Expected Output:**

```
Name        Description
----        -----------
Accounting
```

**What Just Happened:**

```
Behind the scenes:
1. PowerShell validated admin privileges ✓
2. Checked for name conflicts (no existing "Accounting" group)
3. Generated unique Group SID: S-1-5-21-[computer]-[RID]
4. Created entry in SAM database (Groups section)
5. Initialized empty membership list
6. Set default group type: Security (not Distribution)
7. Set default scope: Local (not Domain, Global, Universal)
8. Returned group object to console
```

---

**Verification:**

```powershell
Get-LocalGroup -Name "Accounting"
```

**Expected Output:**

```
Name        Description SID                                          
----        ----------- ---                                          
Accounting              S-1-5-21-3623811015-3361044348-30300820-1006
```

**Detailed View:**

```powershell
Get-LocalGroup -Name "Accounting" | Format-List *
```

**Output:**

```
Description     : 
Name            : Accounting
SID             : S-1-5-21-3623811015-3361044348-30300820-1006
PrincipalSource : Local
ObjectClass     : Group
```

**Understanding Group SIDs vs User SIDs:**

```
User SID:  S-1-5-21-xxx-1005
Group SID: S-1-5-21-xxx-1006
                        │
                        └─ RID continues from same sequence!

Windows doesn't distinguish user/group SIDs by number.
Both use the same RID pool: 1001, 1002, 1003...
```

---

**Comparing with Built-in Groups:**

```powershell
Get-LocalGroup | Format-Table Name, SID
```

**Output:**

```
Name                          SID
----                          ---
Accounting                    S-1-5-21-xxx-1006  ← Our custom group
Administrators                S-1-5-32-544       ← Well-known SID
Backup Operators              S-1-5-32-551       ← Well-known SID
Guests                        S-1-5-32-546       ← Well-known SID
Users                         S-1-5-32-545       ← Well-known SID
Management                    S-1-5-21-xxx-2001  ← Our custom group (from Section 1)
...
```

**Well-Known SIDs (Always the Same):**

```
Pattern: S-1-5-32-[RID]
        │  │  │   │
        │  │  │   └─ Well-known RID
        │  │  └─ BUILTIN authority (32)
        │  └─ NT Authority (5)
        └─ Revision (1)

Examples:
S-1-5-32-544 = Administrators (on EVERY Windows computer!)
S-1-5-32-545 = Users
S-1-5-32-546 = Guests

These SIDs are universal across all Windows systems.
```

---

### **🔧 STEP 18: Add Description to Accounting Group**

**Learning Objective:** Modify existing group properties.

**Command:**

```powershell
Set-LocalGroup -Name "Accounting" -Description "Accounting team members with access to financial resources"
```

**Command Breakdown:**

```
Set-LocalGroup
│
├─ Function: Modifies existing local group
├─ Cannot: Create new groups (use New-LocalGroup)
├─ Cannot: Change group name (must delete and recreate)
└─ Can: Change description, rename (actually no, can't rename!)

-Name "Accounting"
│
└─ Identifies which group to modify

-Description "..."
│
└─ Sets the description field (replaces existing, not append)
```

**Execute the Command:**

```powershell
Set-LocalGroup -Name "Accounting" -Description "Accounting team members with access to financial resources"
```

**Expected Output:**

```
(No output is displayed)
```

**Why No Output?**

```
PowerShell design philosophy:
- Get-* commands: Return objects (output)
- Set-* commands: Modify objects (usually no output unless error)
- New-* commands: Create and return new object (output)
- Remove-* commands: Delete objects (no output unless error)

"No news is good news" - No error = Success!
```

---

**Verification:**

```powershell
Get-LocalGroup -Name "Accounting" | Format-List Name, Description
```

**Expected Output:**

```
Name        : Accounting
Description : Accounting team members with access to financial resources
```

**Full Detail View:**

```powershell
Get-LocalGroup -Name "Accounting" | Format-List *
```

**Output:**

```
Description     : Accounting team members with access to financial resources
Name            : Accounting
SID             : S-1-5-21-3623811015-3361044348-30300820-1006
PrincipalSource : Local
ObjectClass     : Group
```

---

**Best Practices for Group Descriptions:**

**Template:**

```
[Department/Role] - [Purpose] - [Primary Resources/Systems]

Examples:
✓ "Finance Department - Full access to QuickBooks and financial shares"
✓ "IT Helpdesk Tier 1 - Password resets and basic troubleshooting"
✓ "Project Phoenix Team - Collaboration on \\fileserver\Projects\Phoenix"
✓ "Temporary Contractors Q1 2025 - Limited access expires March 31"

✗ "Finance" (too vague)
✗ "Group for people who need finance stuff" (unprofessional)
✗ "Group1" (meaningless)
```

**Description Field Limits:**

```
Maximum length: 1024 characters (plenty!)
Allowed characters: Any Unicode characters
Best practice: Keep under 200 characters for readability
```

---

**Real-World Scenario:**

```
Company: "Acme Corp"
Situation: IT admin leaves, replacement arrives 6 months later

Without descriptions:
- Finds groups: PROJ-PHX, PROJ-ZEUS, TEMP-2024, FIN-RO
- No idea what these mean
- Afraid to delete or modify
- Has to investigate each group's permissions (time-consuming)

With descriptions:
- PROJ-PHX: "Project Phoenix - Marketing campaign team - Access to \\fileserver\Phoenix"
- PROJ-ZEUS: "Project Zeus DEPRECATED - Remove after Dec 2024"
- TEMP-2024: "Temporary contractors hired in 2024 - Review quarterly"
- FIN-RO: "Finance Read-Only - Auditors and external accountants"

Instant clarity! New admin knows what to do.
```

---

### **🔧 STEP 19: Add Users to Accounting and Users Groups**

**Learning Objective:** Understand group membership management and multiple group assignment.

**Command Structure:**

```powershell
Add-LocalGroupMember -Group "GroupName" -Member "Username"
```

**Breakdown:**

```
Add-LocalGroupMember
│
├─ Function: Adds users/groups to a local group
├─ Can add: Users, Groups (yes, groups within groups!)
├─ Can add: Multiple members at once (comma-separated)
└─ Idempotent: Adding existing member = no error (just warning)

-Group "GroupName"
│
└─ Target group to modify

-Member "Username"
│
├─ User or group to add
├─ Format: Just name (if local) or DOMAIN\Name (if domain)
└─ Can be array: -Member "User1","User2","User3"
```

---

**Adding to Accounting Group:**

**Method 1: One at a Time**

```powershell
Add-LocalGroupMember -Group "Accounting" -Member "User2a"
Add-LocalGroupMember -Group "Accounting" -Member "User2b"
Add-LocalGroupMember -Group "Accounting" -Member "User2c"
Add-LocalGroupMember -Group "Accounting" -Member "User2d"
```

**Execute these commands in sequence.**

**Expected Output:**

```
(No output - silence means success!)
```

---

**Method 2: All at Once (More Efficient)**

```powershell
Add-LocalGroupMember -Group "Accounting" -Member "User2a","User2b","User2c","User2d"
```

**Array Syntax Explained:**

```powershell
-Member "User2a","User2b","User2c","User2d"
        │
        └─ PowerShell array: @("item1","item2","item3")
           Shorthand: "item1","item2","item3"

Behind the scenes:
PowerShell loops through array and adds each member individually
```

---

**Verification:**

```powershell
Get-LocalGroupMember -Group "Accounting"
```

**Expected Output:**

```
ObjectClass Name                    PrincipalSource
----------- ----                    ---------------
User        COMPUTERNAME\User2a     Local
User        COMPUTERNAME\User2b     Local
User        COMPUTERNAME\User2c     Local
User        COMPUTERNAME\User2d     Local
```

**Understanding the Output:**

| Column | Meaning |
|--------|---------|
| **ObjectClass** | Type of member (User, Group, or Computer) |
| **Name** | Full name including computer/domain prefix |
| **PrincipalSource** | Origin: Local, ActiveDirectory, AzureAD, MicrosoftAccount |

---

**Adding to Users Group:**

**Important Conceptual Note:**

```
Built-in Group: "Users"
├─ Well-known SID: S-1-5-32-545
├─ Purpose: Standard user rights (not admin)
├─ Auto-membership: All local users added automatically
└─ Behavior: When you create a user, they're already in Users!

Let's verify this before adding:
```

**Check Current Membership:**

```powershell
Get-LocalGroupMember -Group "Users" | Where-Object {$_.Name -like "*User2*"}
```

**Expected Output:**

```
ObjectClass Name                    PrincipalSource
----------- ----                    ---------------
User        COMPUTERNAME\User2a     Local
User        COMPUTERNAME\User2b     Local
User        COMPUTERNAME\User2c     Local
User        COMPUTERNAME\User2d     Local
```

**They're Already Members!**

```
When New-LocalUser creates a user:
1. Create user account ✓
2. Automatically add to "Users" group ✓
3. Return user object

This is Windows default behavior!
```

**But Let's Follow the Lab Instructions:**

```powershell
Add-LocalGroupMember -Group "Users" -Member "User2a","User2b","User2c","User2d"
```

**Expected Output:**

```
WARNING: Member User2a already belongs to group Users.
WARNING: Member User2b already belongs to group Users.
WARNING: Member User2c already belongs to group Users.
WARNING: Member User2d already belongs to group Users.
```

**Understanding Idempotent Operations:**

```
Idempotent: Operation that can be performed multiple times with same result

Add-LocalGroupMember is idempotent:
├─ User not in group → Added successfully (no output)
├─ User already in group → Warning (not error)
└─ Subsequent adds → Same warning (doesn't break)

This is GOOD! Scripts can run multiple times safely.

Compare to non-idempotent:
├─ New-LocalUser "User2a"  # First time: Success
└─ New-LocalUser "User2a"  # Second time: ERROR (breaks script)
```

---

**Verify Final Membership:**

```powershell
Write-Host "=== Accounting Group Members ===" -ForegroundColor Cyan
Get-LocalGroupMember -Group "Accounting"

Write-Host "`n=== Users Group Members (User2*) ===" -ForegroundColor Cyan
Get-LocalGroupMember -Group "Users" | Where-Object {$_.Name -like "*User2*"}
```

**Expected Output:**

```
=== Accounting Group Members ===
ObjectClass Name                    PrincipalSource
----------- ----                    ---------------
User        COMPUTERNAME\User2a     Local
User        COMPUTERNAME\User2b     Local
User        COMPUTERNAME\User2c     Local
User        COMPUTERNAME\User2d     Local

=== Users Group Members (User2*) ===
ObjectClass Name                    PrincipalSource
----------- ----                    ---------------
User        COMPUTERNAME\User2a     Local
User        COMPUTERNAME\User2b     Local
User        COMPUTERNAME\User2c     Local
User        COMPUTERNAME\User2d     Local
```

---

**Advanced Concept: Nested Groups**

**Groups Can Contain Groups!**

```powershell
# Create a sub-group
New-LocalGroup -Name "Accounting-Managers"

# Add users to sub-group
Add-LocalGroupMember -Group "Accounting-Managers" -Member "User2a"

# Add sub-group to parent group
Add-LocalGroupMember -Group "Accounting" -Member "Accounting-Managers"

# Now User2a has TWO group memberships:
# 1. Direct: Accounting-Managers
# 2. Indirect: Accounting (via Accounting-Managers)
```

**Visualization:**

```
Accounting Group
├─ User2b (direct member)
├─ User2c (direct member)
├─ User2d (direct member)
└─ Accounting-Managers (nested group)
    └─ User2a (indirect member of Accounting)

When User2a logs in, token contains:
- User2a SID
- Accounting-Managers SID
- Accounting SID (inherited from nested group)
- Users SID
```

**Best Practice:**

```
Nested groups are powerful but complex:

✓ Good use: Organizational hierarchy
  IT Department → IT-Helpdesk, IT-Admins, IT-Security
  
✗ Bad use: Deep nesting (hard to troubleshoot)
  Group1 → Group2 → Group3 → Group4 → User
  
Recommendation: Maximum 2 levels deep
```

---

**Real-World Scenario: Group Management at Scale**

```
Company: "GlobalCorp" (500 employees)
Department: Accounting (25 people)

Option 1: Individual permissions (Anti-pattern)
- 25 users × 10 shared folders = 250 permission assignments
- New folder: 25 new assignments
- New employee: 10 assignments
- Time: Hours per change

Option 2: Single group (Good)
- 25 users → Accounting group → 10 folders
- New folder: 1 assignment (Accounting group)
- New employee: 1 group membership change
- Time: Minutes per change

Option 3: Role-based nested groups (Best)
- Accounting-Managers (5 users) → High-level access
- Accounting-Staff (15 users) → Standard access
- Accounting-Interns (5 users) → Limited access
- Each role has appropriate folder permissions
- New employee: Add to correct role group
- Promotion: Move between role groups
- Time: Seconds per change
```

---

**Active Recall Questions:**

1. What's the difference between Add-LocalGroupMember and New-LocalGroup?
2. Can a group be a member of another group?
3. What happens if you add a user to a group they're already in?
4. Why are User2a-d already in the "Users" group before we add them?
5. How do nested groups affect user access tokens?

**Answers:**

1. Add-LocalGroupMember adds members to existing group; New-LocalGroup creates new group
2. Yes! Nested groups allow hierarchical organization
3. PowerShell shows warning but doesn't error (idempotent operation)
4. Windows automatically adds all local users to "Users" group at creation
5. Token includes SIDs of all groups (direct + indirect/nested)

---

### **🔧 STEP 20: Create the Accounting Directory**

**Learning Objective:** Filesystem operations via PowerShell.

**Command:**

```powershell
New-Item -Path "C:\Accounting" -ItemType Directory
```

**Command Breakdown:**

```
New-Item
│
├─ Function: Creates new filesystem item (file, folder, link, etc.)
├─ Versatile: Not just folders! (files, registry keys, etc.)
└─ Returns: Created item object

-Path "C:\Accounting"
│
├─ Full path to create
├─ Can be: Relative or absolute
└─ Examples: "C:\Accounting", ".\Accounting", "..\Accounting"

-ItemType Directory
│
├─ Specifies what to create
├─ Options: Directory, File, SymbolicLink, HardLink, Junction
└─ Required for folders (otherwise creates file)
```

---

**Execute the Command:**

```powershell
New-Item -Path "C:\Accounting" -ItemType Directory
```

**Expected Output:**

```
    Directory: C:\

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        [Current Date/Time]                Accounting
```

**Understanding the Output:**

```
Mode: d-----
      │││││└─ Archive bit
      ││││└── System bit
      │││└─── Hidden bit
      ││└──── Read-only bit
      │└───── Directory (d) or File (-)
      └────── Permissions indicator (Windows doesn't show here)

d----- means: Directory, not hidden, not system, not read-only

LastWriteTime: When folder was last modified
Length: (blank for folders, size for files)
Name: Folder name
```

---

**Verification:**

```powershell
Test-Path "C:\Accounting"
```

**Expected Output:**

```
True
```

**`Test-Path` Command:**

```
Purpose: Check if path exists (folder, file, registry key, etc.)
Returns: Boolean ($true or $false)
Use case: Scripts that need to verify resources before using

Example:
if (Test-Path "C:\Accounting") {
    Write-Host "Folder exists!"
} else {
    Write-Host "Folder doesn't exist!"
}
```

---

**Alternative Folder Creation Methods:**

**Method 2: Using mkdir (Alias)**

```powershell
mkdir C:\Accounting
```

**What is mkdir?**

```
mkdir is an ALIAS for New-Item -ItemType Directory

PowerShell aliases for convenience:
├─ mkdir → New-Item -ItemType Directory
├─ md → New-Item -ItemType Directory
├─ ls → Get-ChildItem
├─ dir → Get-ChildItem
├─ cd → Set-Location
├─ pwd → Get-Location
├─ rm → Remove-Item
└─ cat → Get-Content

Mnemonic: "PowerShell speaks both PowerShell and DOS/Linux"
```

**Method 3: Using [System.IO.Directory]**

```powershell
[System.IO.Directory]::CreateDirectory("C:\Accounting")
```

**What is This Syntax?**

```
PowerShell can access .NET Framework classes directly:
[System.IO.Directory] → .NET class for directory operations
::CreateDirectory() → Static method

This is lower-level access (faster but less PowerShell-friendly)
Use when: Performance critical OR cmdlet doesn't exist
Usually: Stick with PowerShell cmdlets for consistency
```

---

**Inspecting Folder Properties:**

```powershell
Get-Item "C:\Accounting" | Format-List *
```

**Expected Output:**

```
PSPath            : Microsoft.PowerShell.Core\FileSystem::C:\Accounting
PSParentPath      : Microsoft.PowerShell.Core\FileSystem::C:\
PSChildName       : Accounting
PSDrive           : C
PSProvider        : FileSystem
PSIsContainer     : True
Mode              : d-----
BaseName          : Accounting
Target            : {}
LinkType          : 
Name              : Accounting
FullName          : C:\Accounting
Parent            : C:\
Exists            : True
Root              : C:\
Extension         : 
CreationTime      : [Date/Time]
CreationTimeUtc   : [Date/Time]
LastAccessTime    : [Date/Time]
LastAccessTimeUtc : [Date/Time]
LastWriteTime     : [Date/Time]
LastWriteTimeUtc  : [Date/Time]
Attributes        : Directory
```

**Key Properties Explained:**

| Property | Meaning |
|----------|---------|
| **PSPath** | PowerShell provider path (internal representation) |
| **PSIsContainer** | True if folder, False if file |
| **FullName** | Complete path |
| **Parent** | Parent folder |
| **Attributes** | File system attributes (Directory, Hidden, System, etc.) |
| **CreationTime** | When folder was created |
| **LastWriteTime** | When folder contents last changed |
| **LastAccessTime** | When folder was last opened/browsed |

---

**Checking Inherited Permissions (Preview):**

```powershell
Get-Acl "C:\Accounting" | Format-List
```

**Expected Output (Abbreviated):**

```
Path   : Microsoft.PowerShell.Core\FileSystem::C:\Accounting
Owner  : BUILTIN\Administrators
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         BUILTIN\Users Allow  ReadAndExecute, Synchronize
         ...
```

**Current State:**

```
C:\Accounting inherits permissions from C:\
├─ SYSTEM: Full Control
├─ Administrators: Full Control
├─ Users: Read & Execute
└─ (potentially others)

This is NOT what we want!
We'll fix this in the next step by copying ACL from Management.
```

---

### **🔧 STEP 21 & 22: Copy ACL from Management to Accounting**

**Learning Objective:** Understand Access Control Lists at a deep level and how to manipulate them programmatically.

**🎯 THIS COMMAND IS DELIVERABLE #5 - WRITE IT DOWN!**

---

**The Concept: What is an ACL?**

**ACL (Access Control List)** is a data structure attached to every file and folder in NTFS.

**Visualization:**

```
C:\Accounting Folder
│
└─ ACL (Access Control List)
   ├─ Owner: BUILTIN\Administrators
   ├─ Inheritance: Enabled (currently)
   │
   ├─ DACL (Discretionary Access Control List)
   │  ├─ ACE #1: SYSTEM → Allow → Full Control
   │  ├─ ACE #2: Administrators → Allow → Full Control
   │  ├─ ACE #3: Users → Allow → Read & Execute
   │  └─ ACE #4: ... (more entries)
   │
   └─ SACL (System Access Control List) - for auditing
      └─ (audit entries if configured)

ACE = Access Control Entry (individual permission rule)
```

---

**The ACL Copy Command:**

```powershell
Get-Acl -Path "C:\Management" | Set-Acl -Path "C:\Accounting"
```

**🎯 CRITICAL: Write this EXACT command in your lab report for Deliverable #5!**

---

**Deep Dive: Command Anatomy**

**Part 1: `Get-Acl -Path "C:\Management"`**

```
Get-Acl
│
├─ Function: Retrieves security descriptor (ACL + Owner + other security info)
├─ Returns: System.Security.AccessControl.DirectorySecurity object
├─ Contains:
│  ├─ Owner information
│  ├─ Group information  
│  ├─ DACL (all permission entries)
│  ├─ SACL (all audit entries)
│  └─ Inheritance flags
└─ Does NOT modify anything (read-only operation)

-Path "C:\Management"
│
└─ Specifies which folder's ACL to retrieve
```

**What Gets Retrieved:**

```powershell
# See what Get-Acl returns:
$aclObject = Get-Acl -Path "C:\Management"
$aclObject | Format-List *
```

**Output (Comprehensive):**

```
Path   : Microsoft.PowerShell.Core\FileSystem::C:\Management
Owner  : COMPUTERNAME\abcd1234
Group  : COMPUTERNAME\None
Access : COMPUTERNAME\abcd1234 Allow  FullControl
         COMPUTERNAME\Management Allow  Modify, Synchronize
         NT AUTHORITY\SYSTEM Allow  FullControl
AreAccessRulesProtected     : True  ← Inheritance DISABLED!
AreAuditRulesProtected      : True
AreAccessRulesCanonical     : True
AreAuditRulesCanonical      : True
Sddl   : O:S-1-5-21-...G:S-1-5-21-...D:PAI(A;OICI;FA;;;S-1-5-21-...)...
```

**Key Fields:**

| Field | Meaning |
|-------|---------|
| **Owner** | Who owns the object (usually creator or Administrators) |
| **Group** | Primary group (rarely used in Windows) |
| **Access** | All ACEs (permission entries) |
| **AreAccessRulesProtected** | True = Inheritance disabled |
| **Sddl** | Security Descriptor Definition Language (machine-readable format) |

---

**Part 2: Pipeline `|`**

```
The Pipeline Operator |
│
├─ Takes output from left command
├─ Passes as input to right command
├─ Left command must output an object
├─ Right command must accept pipeline input
└─ Enables command chaining

Visual Flow:
Get-Acl → [ACL Object] → | → Set-Acl
```

**Without Pipeline (Verbose Method):**

```powershell
# Step 1: Get ACL and store in variable
$aclObject = Get-Acl -Path "C:\Management"

# Step 2: Apply ACL to new folder
Set-Acl -Path "C:\Accounting" -AclObject $aclObject
```

**With Pipeline (Elegant Method):**

```powershell
# One line does both steps!
Get-Acl -Path "C:\Management" | Set-Acl -Path "C:\Accounting"
```

**Why Pipeline is Better:**

```
Advantages:
✓ Concise (one line vs three lines)
✓ No temporary variables (cleaner)
✓ More "PowerShell" idiom (professional style)
✓ Easier to read once you understand pipelines

Disadvantages:
✗ Harder to debug (can't inspect intermediate object)
✗ Less clear for beginners

For lab: Use pipeline (following best practices)
For troubleshooting: Use variables (easier to inspect)
```

---

**Part 3: `Set-Acl -Path "C:\Accounting"`**

```
Set-Acl
│
├─ Function: Applies security descriptor to filesystem object
├─ Receives: ACL object from pipeline or -AclObject parameter
├─ Modifies: Target path's permissions
└─ Requires: Full Control or Take Ownership rights

-Path "C:\Accounting"
│
└─ Target folder to modify

Pipeline Input:
│
└─ Receives ACL object from Get-Acl (via pipeline)
    Set-Acl automatically binds this to -AclObject parameter
```

---

**Execute the Command:**

```powershell
Get-Acl -Path "C:\Management" | Set-Acl -Path "C:\Accounting"
```

**Expected Output:**

```
(No output - success!)
```

---

**Verification: Compare ACLs**

**Check Source ACL (Management):**

```powershell
Write-Host "=== Management Folder ACL ===" -ForegroundColor Cyan
Get-Acl "C:\Management" | Format-Table -Wrap -AutoSize
```

**Check Destination ACL (Accounting):**

```powershell
Write-Host "`n=== Accounting Folder ACL ===" -ForegroundColor Cyan
Get-Acl "C:\Accounting" | Format-Table -Wrap -AutoSize
```

**Expected Output:**

```
=== Management Folder ACL ===
Path                     Owner               Access
----                     -----               ------
C:\Management            COMPUTERNAME\abc... COMPUTERNAME\abcd1234 Allow  FullControl
                                             COMPUTERNAME\Management Allow  Modify, Synchronize
                                             NT AUTHORITY\SYSTEM Allow  FullControl

=== Accounting Folder ACL ===
Path                     Owner               Access
----                     -----               ------
C:\Accounting            COMPUTERNAME\abc... COMPUTERNAME\abcd1234 Allow  FullControl
                                             COMPUTERNAME\Management Allow  Modify, Synchronize
                                             NT AUTHORITY\SYSTEM Allow  FullControl
```

**They Should Be IDENTICAL!**

---

**Detailed Comparison:**

```powershell
# Compare permissions side-by-side
$mgmtAcl = Get-Acl "C:\Management"
$acctAcl = Get-Acl "C:\Accounting"

Write-Host "Management Inheritance Disabled: $($mgmtAcl.AreAccessRulesProtected)" -ForegroundColor Yellow
Write-Host "Accounting Inheritance Disabled: $($acctAcl.AreAccessRulesProtected)" -ForegroundColor Yellow

Write-Host "`nManagement ACE Count: $($mgmtAcl.Access.Count)" -ForegroundColor Yellow
Write-Host "Accounting ACE Count: $($acctAcl.Access.Count)" -ForegroundColor Yellow
```

**Expected Output:**

```
Management Inheritance Disabled: True
Accounting Inheritance Disabled: True

Management ACE Count: 3
Accounting ACE Count: 3
```

---

**What Actually Got Copied?**

```
Copied:
✓ All ACEs (permission entries):
  - abcd1234 → Full Control
  - Management → Modify
  - SYSTEM → Full Control
✓ Inheritance status (Disabled)
✓ Inheritance flags on each ACE
✓ Permission flags (Allow/Deny)

NOT Copied:
✗ Owner (remains Administrators or whoever created it)
✗ Audit entries (SACL) - we don't have any
✗ File contents (this is permissions only!)
```

---

**Why This is Problematic (The "Gotcha"):**

```
Problem:
C:\Accounting now has Management group permissions!
But Accounting users need access, not Management users!

Current State:
C:\Accounting\
├─ abcd1234: Full Control ✓
├─ Management Group: Modify ✗ (WRONG GROUP!)
└─ SYSTEM: Full Control ✓

What We Need:
C:\Accounting\
├─ abcd1234: Full Control ✓
├─ Accounting Group: Modify ✓ (CORRECT GROUP!)
└─ SYSTEM: Full Control ✓

This is intentional for the lab!
We'll fix it in Section 3, Step 26.
```

---

**Understanding SDDL (Security Descriptor Definition Language)**

**View SDDL String:**

```powershell
(Get-Acl "C:\Accounting").Sddl
```

**Output (Example):**

```
O:BAG:SYD:PAI(A;OICI;FA;;;S-1-5-21-xxx-1001)(A;OICI;0x1301bf;;;S-1-5-21-xxx-2001)(A;OICIIO;FA;;;SY)
```

**Decoding SDDL:**

```
O:BA                    ← Owner: BA = Builtin Administrators
G:SY                    ← Group: SY = SYSTEM
D:PAI                   ← DACL: P=Protected, AI=Auto-Inherit
(A;OICI;FA;;;SID)       ← ACE: Allow, Object+Container Inherit, Full Access, for SID
│ │  │ │   │
│ │  │ │   └─ SID of principal
│ │  │ └─ Access mask (FA = Full Access, 0x1301bf = Modify)
│ │  └─ Inheritance flags (OICI = Object & Container Inherit)
│ └─ ACE flags
└─ ACE type (A = Allow, D = Deny)
```

**SDDL is the "machine language" of Windows security!**

---

**Real-World Use Case: Scripted Server Setup**

```powershell
# Company standard: All department folders have same security model
# Create template folder with correct permissions
New-Item -Path "C:\Template" -ItemType Directory
# ... configure Template ACL with company standards ...

# Now create 20 department folders with identical security
$departments = @("HR", "Finance", "IT", "Sales", "Marketing", "Legal", 
                 "Operations", "R&D", "Support", "Admin", "Facilities",
                 "Compliance", "Audit", "Training", "QA", "Logistics",
                 "Procurement", "PR", "Strategy", "Analytics")

foreach ($dept in $departments) {
    New-Item -Path "C:\$dept" -ItemType Directory
    Get-Acl "C:\Template" | Set-Acl -Path "C:\$dept"
    Write-Host "Created and secured: C:\$dept" -ForegroundColor Green
}

# Result: 20 folders, perfectly identical permissions, created in seconds!
```

---

**📝 DELIVERABLE #5: Document the Command**

**Write this in your lab report under "Deliverable #5":**

---

**PowerShell Command Used to Copy ACL from Management Directory to Accounting Directory:**

```powershell
Get-Acl -Path "C:\Management" | Set-Acl -Path "C:\Accounting"
```

**Explanation:**

This command uses PowerShell's pipeline feature to copy the Access Control List (ACL) from the Management directory to the Accounting directory.

**Command Breakdown:**

1. **Get-Acl -Path "C:\Management"**
   - Retrieves the complete security descriptor from C:\Management
   - Includes all Access Control Entries (ACEs), ownership information, and inheritance settings
   - Returns a DirectorySecurity object

2. **| (Pipeline operator)**
   - Passes the ACL object from Get-Acl to Set-Acl
   - Enables one-line execution of both retrieval and application

3. **Set-Acl -Path "C:\Accounting"**
   - Applies the received ACL object to C:\Accounting
   - Overwrites existing permissions
   - Preserves inheritance status (disabled in this case)

**What Gets Copied:**
- All permission entries (ACEs) for abcd1234, Management group, and SYSTEM
- Inheritance disabled status
- Permission levels (Full Control, Modify, etc.)
- Inheritance flags for each ACE

**Result:**
Both directories now have identical NTFS permission structures, with inheritance disabled and the same three security principals granted access.

---

**Active Recall Questions:**

1. What's the difference between DACL and SACL?
2. Why doesn't copying ACL copy the owner?
3. What does "AreAccessRulesProtected: True" mean?
4. Can you copy ACL from a file to a folder?
5. What's the advantage of pipeline over using variables?

**Answers:**

1. DACL = permissions (who can access), SACL = auditing (who accessed)
2. Ownership is separate security attribute, not part of ACL structure
3. Inheritance is disabled (protected from parent changes)
4. Yes, but folder-specific permissions may not apply correctly
5. Pipeline is more concise, idiomatic PowerShell, and avoids temporary variables

---

### **🔧 STEP 23 & 24: Create SMB Share for Accounting Directory**

**Learning Objective:** Network share creation via PowerShell and understanding SMB cmdlets.

**🎯 THIS COMMAND IS DELIVERABLE #6 - WRITE IT DOWN!**

---

**The Command:**

```powershell
New-SmbShare -Name "Accounting Share" -Path "C:\Accounting" -FullAccess "Accounting"
```

**🎯 CRITICAL: Write this EXACT command in your lab report for Deliverable #6!**

---

**Deep Dive: Command Anatomy**

```
New-SmbShare
│
├─ Function: Creates SMB/CIFS network share
├─ Module: SmbShare (Windows feature)
├─ Requires: Administrator privileges
├─ Returns: SmbShare object
└─ SMB Versions: Supports SMB 2.x and 3.x (Windows 11 uses 3.1.1)

-Name "Accounting Share"
│
├─ Share name as it appears on network
├─ Format: \\COMPUTERNAME\ShareName
├─ Constraints:
│  ├─ Maximum 80 characters
│  ├─ Cannot contain: / \ [ ] : | < > + = ; , ? * "
│  ├─ Cannot end with period or space
│  └─ Case-insensitive but case-preserving
└─ Hidden shares: End with $ (e.g., "Accounting$")

-Path "C:\Accounting"
│
├─ Local folder path to share
├─ Must exist before creating share
├─ Can be: C:\, D:\Data\, \\?\C:\VeryLongPath\...
└─ Cannot be: UNC path (\\server\share)

-FullAccess "Accounting"
│
├─ Grants Full Control at SHARE level
├─ Value: User or group name (local or domain)
├─ Multiple principals: -FullAccess "User1","Group1","User2"
└─ Alternative parameters:
   ├─ -ReadAccess: Grant Read permission
   ├─ -ChangeAccess: Grant Change permission
   └─ -NoAccess: Explicitly deny
```

---

**Execute the Command:**

```powershell
New-SmbShare -Name "Accounting Share" -Path "C:\Accounting" -FullAccess "Accounting"
```

**Expected Output:**

```
Name              ScopeName Path          Description
----              --------- ----          -----------
Accounting Share  *         C:\Accounting
```

**Understanding the Output:**

| Column | Meaning |
|--------|---------|
| **Name** | Share name (network identifier) |
| **ScopeName** | Cluster scope (* = standalone server, not clustered) |
| **Path** | Local filesystem path being shared |
| **Description** | Share description (blank if not set) |

---

**Behind the Scenes: What Happened?**

```
When New-SmbShare executes:

1. Validation Phase:
   ├─ Check admin privileges ✓
   ├─ Verify C:\Accounting exists ✓
   ├─ Check share name not in use ✓
   └─ Validate "Accounting" group exists ✓

2. SMB Server Configuration:
   ├─ Register share in SMB server database
   ├─ Create share GUID (unique identifier)
   ├─ Set share-level permissions
   ├─ Enable SMB protocols (2.1, 3.0, 3.1.1)
   └─ Configure encryption settings (if applicable)

3. Permissions Applied:
   ├─ Accounting group → Full Control (share level)
   └─ Remove default "Everyone" (automatic with -FullAccess)

4. Network Registration:
   ├─ Announce share on local network (if NetBIOS enabled)
   ├─ Register in Computer Browser service
   └─ Make available via: \\COMPUTERNAME\Accounting Share

5. Event Logging:
   └─ Log share creation in Security event log
```

---

**Verification Commands:**

**Check if Share Exists:**

```powershell
Get-SmbShare -Name "Accounting Share"
```

**Expected Output:**

```
Name              ScopeName Path          Description
----              --------- ----          -----------
Accounting Share  *         C:\Accounting
```

---

**View ALL Shares:**

```powershell
Get-SmbShare | Format-Table Name, Path, Description -AutoSize
```

**Expected Output:**

```
Name              Path                 Description
----              ----                 -----------
ADMIN$            C:\Windows           Remote Admin
Accounting Share  C:\Accounting        
C$                C:\                  Default share
IPC$                                   Remote IPC
Management Share  C:\Management        
```

**Built-in Administrative Shares:**

```
ADMIN$  ← Points to C:\Windows (remote administration)
C$      ← Root of C: drive (admin access only)
D$      ← Root of D: drive (if exists)
IPC$    ← Inter-Process Communication (named pipes)

These are:
├─ Created automatically by Windows
├─ Hidden (end with $)
├─ Require administrator credentials
├─ Cannot be permanently deleted (recreated on reboot)
└─ Disable via registry (not recommended)
```

---

**Check Share Permissions (CRITICAL):**

```powershell
Get-SmbShareAccess -Name "Accounting Share"
```

**Expected Output:**

```
Name              ScopeName AccountName      AccessControlType AccessRight
----              --------- -----------      ----------------- -----------
Accounting Share  *         Accounting       Allow             Full
```

**Understanding the Output:**

| Column | Meaning |
|--------|---------|
| **AccountName** | User or group with permission |
| **AccessControlType** | Allow or Deny |
| **AccessRight** | Full, Change, or Read |

**Important:** "Everyone" is NOT in the list! 

```
Default behavior WITHOUT -FullAccess:
├─ Share created with: Everyone → Read
└─ Security risk!

Our command WITH -FullAccess "Accounting":
├─ Share created with: Accounting → Full
├─ Everyone automatically removed ✓
└─ Secure by default!
```

---

**Compare Share Permissions vs NTFS Permissions:**

```powershell
Write-Host "=== Share-Level Permissions ===" -ForegroundColor Cyan
Get-SmbShareAccess -Name "Accounting Share" | Format-Table

Write-Host "`n=== NTFS-Level Permissions ===" -ForegroundColor Cyan
(Get-Acl "C:\Accounting").Access | Format-Table IdentityReference, FileSystemRights, AccessControlType
```

**Expected Output:**

```
=== Share-Level Permissions ===
Name              AccountName      AccessRight
----              -----------      -----------
Accounting Share  Accounting       Full

=== NTFS-Level Permissions ===
IdentityReference             FileSystemRights AccessControlType
-----------------             ---------------- -----------------
COMPUTERNAME\abcd1234         FullControl      Allow
COMPUTERNAME\Management       Modify           Allow
NT AUTHORITY\SYSTEM           FullControl      Allow
```

**Analyzing the Security Layers:**

```
Share Level:
└─ Accounting → Full Control ✓

NTFS Level:
├─ abcd1234 → Full Control
├─ Management → Modify ✗ (WRONG GROUP - remember, we copied ACL!)
└─ SYSTEM → Full Control

Problem Identified:
├─ Share permissions allow Accounting group
├─ NTFS permissions allow Management group
├─ Accounting group has NO NTFS permissions!
└─ Result: Accounting users will be DENIED (we'll see in Step 25)
```

---

**Advanced SMB Share Features:**

**View Detailed Share Configuration:**

```powershell
Get-SmbShare -Name "Accounting Share" | Format-List *
```

**Output (Comprehensive):**

```
PresetPathAcl         : System.Security.AccessControl.DirectorySecurity
ShareState            : Online
AvailabilityType      : NonClustered
ShareType             : FileSystemDirectory
FolderEnumerationMode : Unrestricted
CachingMode           : Manual
CATimeout             : 0
ConcurrentUserLimit   : 0  ← 0 = unlimited (on non-Server editions: max 20)
ContinuouslyAvailable : False
CurrentUsers          : 0  ← Number of current connections
Description           : 
EncryptData           : False  ← SMB encryption (SMB 3.0+ feature)
Name                  : Accounting Share
Path                  : C:\Accounting
Scoped                : False
ScopeName             : *
SecurityDescriptor    : O:SYG:SYD:(A;;FA;;;S-1-5-21-xxx-2002)
ShadowCopy            : False
Special               : False
Temporary             : False
Volume                : \\?\Volume{...}\
```

**Key Properties Explained:**

| Property | Meaning |
|----------|---------|
| **ShareState** | Online (active), Offline (disabled) |
| **ShareType** | FileSystemDirectory, Print, Device, IPC |
| **CachingMode** | Offline file behavior (Manual, Documents, Programs, None) |
| **EncryptData** | SMB 3.0+ encryption in transit |
| **ConcurrentUserLimit** | Max simultaneous connections (0 = unlimited within OS limits) |
| **CurrentUsers** | Active connections right now |
| **Special** | Administrative shares (C$, ADMIN$, etc.) |

---

**Alternative Share Creation Methods:**

**Method 1: Grant Different Permission Levels**

```powershell
# Read-only share
New-SmbShare -Name "Reports-ReadOnly" -Path "C:\Reports" -ReadAccess "Everyone"

# Change permission (read + write)
New-SmbShare -Name "Collaboration" -Path "C:\Collab" -ChangeAccess "Users"

# Multiple permission levels
New-SmbShare -Name "Mixed" -Path "C:\Mixed" `
  -FullAccess "Administrators" `
  -ChangeAccess "Power Users" `
  -ReadAccess "Users"
```

**Method 2: Create Hidden Share**

```powershell
# Share name ending with $ is hidden from browse lists
New-SmbShare -Name "Accounting$" -Path "C:\Accounting" -FullAccess "Accounting"

# Access via: \\COMPUTERNAME\Accounting$ (must type exact name)
# Won't appear when browsing \\COMPUTERNAME\
```

**Method 3: With Description and Limits**

```powershell
New-SmbShare -Name "Accounting Share" `
  -Path "C:\Accounting" `
  -Description "Accounting Department - Financial Records and Reports" `
  -ConcurrentUserLimit 10 `
  -CachingMode Documents `
  -FullAccess "Accounting"
```

---

**SMB Protocol Versions (Important Context):**

```
Evolution:
├─ SMB 1.0 (1990s)
│  ├─ Original protocol
│  ├─ Security vulnerabilities (EternalBlue exploit!)
│  ├─ Poor performance
│  └─ Disabled by default in Windows 11 ✓

├─ SMB 2.0 (Vista/2008)
│  ├─ Complete rewrite
│  ├─ Better performance (reduced chattiness)
│  └─ Improved security

├─ SMB 3.0 (Windows 8/2012)
│  ├─ End-to-end encryption
│  ├─ Transparent failover (clustering)
│  ├─ Direct I/O (RDMA support)
│  └─ Better WAN performance

└─ SMB 3.1.1 (Windows 10/2016+)
   ├─ Pre-authentication integrity (prevents MITM)
   ├─ AES-128-GCM encryption
   ├─ Cluster dialect negotiation
   └─ Current version in Windows 11 ✓
```

**Check SMB Version:**

```powershell
Get-SmbConnection
```

*Note: Only shows active connections (none if no one connected)*

---

**Modifying Share Permissions After Creation:**

**Grant Additional Access:**

```powershell
Grant-SmbShareAccess -Name "Accounting Share" -AccountName "Management" -AccessRight Read -Force
```

**Revoke Access:**

```powershell
Revoke-SmbShareAccess -Name "Accounting Share" -AccountName "Management" -Force
```

**Block Access (Deny):**

```powershell
Block-SmbShareAccess -Name "Accounting Share" -AccountName "Guest" -Force
```

**The `-Force` parameter suppresses confirmation prompts (useful for scripts).**

---

**Testing Network Access:**

**From Same Computer (Using localhost):**

```powershell
# Test if share is accessible
Test-Path "\\localhost\Accounting Share"
```

**Expected:** `True` (from admin account)

**Map Network Drive (Temporarily):**

```powershell
New-PSDrive -Name "Z" -PSProvider FileSystem -Root "\\localhost\Accounting Share"
```

**Now `Z:` drive points to the share!**

**List Mapped Drives:**

```powershell
Get-PSDrive | Where-Object {$_.Provider -like "*FileSystem*"}
```

---

**📝 DELIVERABLE #6: Document the Command**

**Write this in your lab report under "Deliverable #6":**

---

**PowerShell Command Used to Create SMB Share for Accounting Directory:**

```powershell
New-SmbShare -Name "Accounting Share" -Path "C:\Accounting" -FullAccess "Accounting"
```

**Explanation:**

This command creates a Server Message Block (SMB) network share that makes the C:\Accounting directory accessible over the network.

**Command Breakdown:**

1. **New-SmbShare**
   - Creates a new SMB/CIFS file share
   - Registers the share with Windows SMB server service
   - Makes the folder available via UNC path: \\COMPUTERNAME\Accounting Share

2. **-Name "Accounting Share"**
   - Specifies the share name as it appears on the network
   - This is the name users type after \\COMPUTERNAME\
   - Spaces are allowed and do not require quotes in UNC paths

3. **-Path "C:\Accounting"**
   - Specifies the local folder path to be shared
   - Must be an existing directory
   - Can be on any local drive

4. **-FullAccess "Accounting"**
   - Grants the Accounting group Full Control at the share permission level
   - Automatically removes the default "Everyone → Read" permission
   - Full Control at share level includes: Read, Change, and ability to modify share permissions

**Share Permission vs NTFS Permission:**
- Share permissions apply ONLY when accessing over the network
- NTFS permissions apply both locally and over the network
- Effective permission is the most restrictive of the two

**Result:**
The Accounting directory is now accessible via \\COMPUTERNAME\Accounting Share with the Accounting group having Full Control at the share level. NTFS permissions (which currently grant access to the Management group, not Accounting) will be the limiting factor and will need to be corrected in Section 3.

---

**Real-World Scenario: Share Management at Scale**

```
Company: "DataCorp" - File Server Management

Challenge: Create 50 department shares with consistent security

Manual Method (GUI):
├─ Time: 10 minutes per share × 50 = 8+ hours
├─ Error rate: High (typos, inconsistent permissions)
└─ Documentation: Manual notes, often incomplete

Automated Method (PowerShell):
├─ Write script: 30 minutes
├─ Execute: 2 minutes
├─ Error rate: Zero (if script tested)
└─ Documentation: Script itself serves as documentation

The script:
```

```powershell
$departments = Import-Csv "C:\ShareList.csv"
# CSV contains: DeptName, FolderPath, GroupName

foreach ($dept in $departments) {
    # Create folder if doesn't exist
    if (!(Test-Path $dept.FolderPath)) {
        New-Item -Path $dept.FolderPath -ItemType Directory
    }
    
    # Create share
    New-SmbShare -Name "$($dept.DeptName) Share" `
                 -Path $dept.FolderPath `
                 -FullAccess $dept.GroupName `
                 -Description "$($dept.DeptName) Department Files" `
                 -CachingMode Documents
    
    # Log success
    Write-Host "Created: $($dept.DeptName) Share" -ForegroundColor Green
}

Write-Host "`nAll shares created successfully!" -ForegroundColor Cyan
```

**Result: 50 perfect shares in 2 minutes!**

---

**Active Recall Questions:**

1. What's the difference between share name and folder path?
2. Why does -FullAccess automatically remove "Everyone"?
3. What's the maximum number of concurrent connections on Windows 11?
4. How do you create a hidden share?
5. What SMB version does Windows 11 use?

**Answers:**

1. Share name is network identifier (in UNC path); folder path is local filesystem location
2. Security best practice: -FullAccess grants exclusive access to specified principal(s)
3. 20 connections (Windows client OS limitation; Server editions have no limit)
4. End share name with $ (e.g., "ShareName$")
5. SMB 3.1.1 (most secure version with AES-128-GCM encryption)

---

### **🔧 STEP 25: Test Access as Accounting User (Intentional Failure)**

**Learning Objective:** Understand why access denial occurs and develop troubleshooting skills.

**📝 THIS STEP REQUIRES WRITTEN ANSWER - DELIVERABLE #7**

---

**The Purpose of This Step:**

```
This is an INTENTIONAL failure designed to teach:
├─ Two-gate security model (Share + NTFS)
├─ How permissions interact
├─ Troubleshooting methodology
├─ Why ACL copying can cause problems
└─ Real-world debugging skills

You SHOULD be denied access! This is correct!
```

---

**Sign Out and Sign In as User2a:**

1. **Click Start → Your account icon**
2. **Select "Sign out"**
3. **At login screen: Click "Other user"**
4. **Username:** `User2a`
5. **Password:** `P@ssW0rd`
6. **Press Enter**

**First Login (Profile Creation):**

```
"Hi"
"We're getting things ready for you..."
(Wait 30-60 seconds)

Background tasks:
├─ Create C:\Users\User2a\ directory structure
├─ Copy default profile template
├─ Generate NTUSER.DAT (user registry hive)
├─ Create Desktop, Documents, AppData folders
└─ Generate access token with User2a's SIDs
```

---

**Test 1: Local Access to C:\Accounting**

**Once logged in as User2a:**

1. **Press Win + E** (File Explorer)
2. **Navigate to This PC → Local Disk (C:)**
3. **Try to open "Accounting" folder**

**Expected Result:**

```
┌─────────────────────────────────────────┐
│  Accounting                        [X] │
├─────────────────────────────────────────┤
│                                         │
│  You don't currently have permission to │
│  access this folder.                    │
│                                         │
│  Click Continue to permanently get      │
│  access to this folder.                 │
│                                         │
│        [Continue]      [Cancel]         │
└─────────────────────────────────────────┘
```

**DO NOT click Continue!** Click **Cancel**.

---

**Test 2: Network Access via UNC Path**

**4. Press Win + R** (Run dialog)

**5. Type:** `\\localhost\Accounting Share`

**6. Press Enter**

**Expected Result:**

```
┌─────────────────────────────────────────┐
│  Windows Security                  [X] │
├─────────────────────────────────────────┤
│                                         │
│  Enter Network Credentials              │
│                                         │
│  Enter your credentials to connect to:  │
│  localhost                              │
│                                         │
│  User name: [____________________]      │
│  Password:  [____________________]      │
│                                         │
│  ☐ Remember my credentials              │
│                                         │
│        [OK]              [Cancel]       │
└─────────────────────────────────────────┘
```

**OR you might see:**

```
┌─────────────────────────────────────────┐
│  \\localhost\Accounting Share           │
├─────────────────────────────────────────┤
│  Network Error                          │
│                                         │
│  Windows cannot access                  │
│  \\localhost\Accounting Share           │
│                                         │
│  Error code: 0x80070035                 │
│  The network path was not found.        │
│                                         │
│                [OK]                     │
└─────────────────────────────────────────┘
```

**OR most likely:**

```
┌─────────────────────────────────────────┐
│  \\localhost\Accounting Share           │
├─────────────────────────────────────────┤
│  (Empty folder opens)                   │
│  BUT when you try to create a file:     │
│                                         │
│  Access is denied.                      │
│                                         │
│  You might not have permission to use   │
│  this network resource.                 │
│                                         │
│                [OK]                     │
└─────────────────────────────────────────┘
```

---

**Diagnostic Analysis (Think Like a Troubleshooter):**

**Question 1: Does User2a exist?**

```
Answer: YES
Evidence: We successfully logged in as User2a
```

**Question 2: Is User2a in the Accounting group?**

```
Answer: YES
We can verify (but let's wait until we log back as admin)
```

**Question 3: Does the Accounting share exist?**

```
Answer: YES
We created it in Step 23
```

**Question 4: Does User2a have Share permissions?**

```
Let's think through this:
Share permissions: Accounting group → Full Control
User2a membership: Accounting group (yes, from Step 19)
Conclusion: YES, User2a has Share permissions ✓
```

**Question 5: Does User2a have NTFS permissions?**

```
Let's think through this:
NTFS permissions on C:\Accounting:
├─ abcd1234 → Full Control
├─ Management group → Modify
└─ SYSTEM → Full Control

User2a membership:
├─ Accounting group (YES)
├─ Management group (NO!)
└─ Users group (YES, but Users not in ACL)

Conclusion: NO! User2a has NO NTFS permissions ✗
```

---

**The Root Cause:**

```
Two-Gate Security Model:
┌─────────────────────────────────────────┐
│  User2a attempts access via network     │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  GATE 1: Share Permissions              │
│  Check: Is User2a in Accounting group?  │
│  Result: YES ✓                          │
│  Action: Pass to next gate              │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  GATE 2: NTFS Permissions               │
│  Check: Does User2a have permission     │
│         on C:\Accounting?               │
│  ACL Contents:                          │
│    - abcd1234: Full Control             │
│    - Management: Modify                 │
│    - SYSTEM: Full Control               │
│  User2a Groups:                         │
│    - Accounting (not in ACL!)           │
│    - Users (not in ACL!)                │
│  Result: NO MATCH ✗                     │
│  Action: ACCESS DENIED                  │
└─────────────────────────────────────────┘

DIAGNOSIS: NTFS permissions are the bottleneck!
```

---

**Why This Happened:**

```
Step 21: We copied ACL from Management to Accounting
├─ Management folder ACL contained:
│  ├─ abcd1234 → Full Control
│  ├─ Management group → Modify
│  └─ SYSTEM → Full Control
│
├─ We copied this EXACTLY to Accounting folder
│
└─ Result: Accounting folder has Management group, not Accounting group!

This is the "gotcha" in ACL copying!
You must modify copied ACLs for the new context.
```

---

**Sign Out and Return to Admin Account:**

1. **Click Start → User2a → Sign out**
2. **Login as your college account (abcd1234)**

---

**Verification (As Admin):**

**Confirm User2a is in Accounting Group:**

```powershell
Get-LocalGroupMember -Group "Accounting"
```

**Expected Output:**

```
ObjectClass Name                    PrincipalSource
----------- ----                    ---------------
User        COMPUTERNAME\User2a     Local
User        COMPUTERNAME\User2b     Local
User        COMPUTERNAME\User2c     Local
User        COMPUTERNAME\User2d     Local
```

**Confirm User2a is NOT in Management Group:**

```powershell
Get-LocalGroupMember -Group "Management"
```

**Expected Output:**

```
ObjectClass Name                    PrincipalSource
----------- ----                    ---------------
User        COMPUTERNAME\User1a     Local
User        COMPUTERNAME\User1b     Local
User        COMPUTERNAME\User1c     Local
User        COMPUTERNAME\User1d     Local
```

**NO User2a! Confirmed.**

---

**Check Current ACL on C:\Accounting:**

```powershell
(Get-Acl "C:\Accounting").Access | Format-Table IdentityReference, FileSystemRights, AccessControlType
```

**Expected Output:**

```
IdentityReference             FileSystemRights AccessControlType
-----------------             ---------------- -----------------
COMPUTERNAME\abcd1234         FullControl      Allow
COMPUTERNAME\Management       Modify           Allow
NT AUTHORITY\SYSTEM           FullControl      Allow
```

**There it is! "Management" group has permissions, but "Accounting" does NOT!**

---

**📝 DELIVERABLE #7: Why No Access?**

**Write this comprehensive answer in your lab report:**

---

**Question:** Why is there no access for an accounting user on the accounting share?

**Answer:**

User2a (an accounting user) cannot access the Accounting share because of a mismatch between share-level permissions and NTFS-level permissions, specifically due to the ACL copy operation performed in Step 21.

**Technical Explanation:**

**1. Windows Two-Gate Security Model:**

When accessing a network share, Windows enforces TWO independent permission layers:
- **Gate 1: Share Permissions** - Controls network access to the share
- **Gate 2: NTFS Permissions** - Controls file system access to the actual files/folders

Both must grant access, and the most restrictive permission wins.

**2. Current Share Permissions (Gate 1):**

```
\\localhost\Accounting Share
├─ Accounting group: Full Control ✓
└─ Everyone: (removed)

Analysis: User2a is a member of the Accounting group.
Result: PASSED Gate 1 ✓
```

User2a has Full Control at the share level, so network access to the share is permitted.

**3. Current NTFS Permissions (Gate 2):**

```
C:\Accounting folder ACL:
├─ COMPUTERNAME\abcd1234: Full Control
├─ COMPUTERNAME\Management: Modify
└─ NT AUTHORITY\SYSTEM: Full Control

User2a group memberships:
├─ Accounting group (not in ACL!)
├─ Users group (not in ACL!)
└─ Authenticated Users (not explicitly in ACL)

Analysis: No ACE in the ACL matches any of User2a's group SIDs.
Result: FAILED Gate 2 ✗
```

User2a has NO NTFS permissions on C:\Accounting, so file system access is denied.

**4. Root Cause - The ACL Copy Issue:**

In Step 21, we executed:
```powershell
Get-Acl -Path "C:\Management" | Set-Acl -Path "C:\Accounting"
```

This copied the Management folder's ACL verbatim to the Accounting folder:
- Management folder ACL included: Management group → Modify
- This ACL was copied to Accounting folder unchanged
- Result: Accounting folder has permissions for Management group, NOT Accounting group

**5. Permission Evaluation Process:**

```
User2a accesses \\localhost\Accounting Share:

Step 1: Authentication
└─ User2a logs in → Access token created
    Contains SIDs for:
    ├─ User2a: S-1-5-21-xxx-1003
    ├─ Accounting: S-1-5-21-xxx-2002
    ├─ Users: S-1-5-32-545
    └─ Authenticated Users: S-1-5-11

Step 2: Share Permission Check
└─ Check \\localhost\Accounting Share permissions
    ├─ Accounting group (S-1-5-21-xxx-2002): Full Control
    ├─ Token contains Accounting SID: MATCH ✓
    └─ Result: Proceed to NTFS check

Step 3: NTFS Permission Check
└─ Check C:\Accounting ACL
    ├─ abcd1234 (S-1-5-21-xxx-1001): Full Control
    ├─ Management (S-1-5-21-xxx-2001): Modify
    ├─ SYSTEM (S-1-5-18): Full Control
    ├─ Compare against User2a token SIDs:
    │  ├─ S-1-5-21-xxx-1003 (User2a): NO MATCH
    │  ├─ S-1-5-21-xxx-2002 (Accounting): NO MATCH
    │  ├─ S-1-5-32-545 (Users): NO MATCH
    │  └─ S-1-5-11 (Authenticated Users): NO MATCH
    └─ Result: NO MATCHING ACE → ACCESS DENIED ✗
```

**6. The Fix (To Be Implemented in Section 3, Step 26):**

The solution is to modify the NTFS permissions on C:\Accounting to grant the Accounting group (instead of or in addition to the Management group) appropriate access rights:

```powershell
$acl = Get-Acl -Path "C:\Accounting"
$permission = "Accounting","Modify","ContainerInherit,ObjectInherit","None","Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl -Path "C:\Accounting" -AclObject $acl
```

**Conclusion:**

The access denial occurs because share permissions grant access (Accounting group has Full Control), but NTFS permissions deny access (Accounting group is not in the ACL). This demonstrates a critical lesson in Windows security: share permissions and NTFS permissions are independent layers, and both must grant access for network file operations to succeed. Additionally, it highlights the importance of verifying ACL contents after copying them from one folder to another, as the copied permissions may not be appropriate for the new context.

---

**Learning Takeaways:**

```
Key Lessons:
├─ Always verify BOTH share and NTFS permissions
├─ ACL copying requires context adjustment
├─ Most restrictive permission always wins
├─ Test with actual user accounts (not admin!)
└─ Troubleshooting methodology:
   ├─ 1. Verify user/group exists
   ├─ 2. Check group membership
   ├─ 3. Check share permissions
   ├─ 4. Check NTFS permissions
   └─ 5. Compare token SIDs with ACL SIDs
```

---

**Real-World Parallel:**

```
Scenario: Office Building Security

Share Permissions = Building Entrance Guard
├─ "Are you on the visitor list?"
├─ Accounting team members on list ✓
└─ Pass through to elevator

NTFS Permissions = Department Door Lock
├─ "Do you have the keycard for this department?"
├─ Accounting team keycard needed
├─ But only Management keycards work! ✗
└─ Door stays locked

Result: You can enter the building but not your department!
```

---

## **SECTION 2 COMPLETE - CHECKPOINT**

**What You've Mastered:**

```
PowerShell Fundamentals:
✓ Verb-Noun command structure
✓ Parameters and switches
✓ Pipeline operations
✓ Variable usage
✓ SecureString password handling

User/Group Management:
✓ New-LocalUser command
✓ New-LocalGroup command
✓ Set-LocalGroup for descriptions
✓ Add-LocalGroupMember for membership
✓ Get-LocalGroupMember for verification

Filesystem Operations:
✓ New-Item for folder creation
✓ Test-Path for existence checking
✓ Get-Acl for retrieving permissions
✓ Set-Acl for applying permissions
✓ ACL copying and its pitfalls

Network Sharing:
✓ New-SmbShare for share creation
✓ Get-SmbShare for verification
✓ Get-SmbShareAccess for permission checking
✓ Understanding share vs NTFS permissions

Troubleshooting:
✓ Methodical diagnosis approach
✓ Two-gate security model
✓ Permission evaluation process
✓ Token and SID comparison
```

**Aphorism to Remember:**

> *"In security, what you don't test is what will fail in production. Always verify with least-privileged accounts."*

---

**Active Recall Before Section 3:**

*Answer without looking:*
1. What's the difference between New-LocalUser and Add-LocalGroupMember?
2. Why use pipeline instead of variables?
3. What gets copied when you copy an ACL?
4. What's the maximum concurrent connections on Windows 11 Pro?
5. In the two-gate model, which permission wins?
6. Why did Accounting users fail to access the Accounting share?

**Answers:**
1. New-LocalUser creates users; Add-LocalGroupMember adds existing users to groups
2. Pipeline is more concise, idiomatic, and doesn't clutter with temporary variables
3. All ACEs, inheritance status, inheritance flags (but NOT owner)
4. 20 simultaneous connections (OS limitation)
5. Most restrictive of Share vs NTFS permissions
6. NTFS permissions granted access to Management group, not Accounting group (due to ACL copy)

---

**Continue to Section 3 for troubleshooting, modifications, and advanced permission scenarios!**

---

# **SECTION 3: Troubleshooting and Modifications**

**Purpose of This Section:**

```
This section teaches:
├─ Production-level problem solving
├─ Permission modification techniques
├─ Advanced security scenarios
├─ Account lifecycle management
├─ Drive mapping automation
└─ Real-world administrative tasks
```

**Aphorism:** *"The mark of expertise is not avoiding problems, but solving them elegantly."*

---

### **🔧 STEP 26: Fix Accounting Share Access**

**Learning Objective:** Modify NTFS permissions to grant appropriate access.

**The Problem (Recap):**

```
Current State:
├─ Share permissions: Accounting → Full Control ✓
└─ NTFS permissions: Management → Modify (wrong group!) ✗

Needed State:
├─ Share permissions: Accounting → Full Control ✓
└─ NTFS permissions: Accounting → Modify ✓
```

---

**Solution Method 1: GUI (Easiest)**

**1. Open File Explorer**

**2. Navigate to C:\**

**3. Right-click "Accounting" folder**

**4. Properties → Security tab**

**Current ACL:**

```
Group or user names:
├─ COMPUTERNAME\abcd1234      (Full Control)
├─ COMPUTERNAME\Management    (Modify)  ← Has access
└─ NT AUTHORITY\SYSTEM        (Full Control)

Missing: Accounting group!
```

**5. Click "Edit" button**

**6. Click "Add" button**

**7. Type:** `Accounting`

**8. Click "Check Names"** (should underline)

**9. Click "OK"**

**10. Select "Accounting" in the list**

**11. Check "Modify" in the Allow column**

**Result:**

```
Permissions for Accounting:      Allow  Deny
Full control                      ☐     ☐
Modify                            ☑     ☐
Read & execute                    ☑     ☐
List folder contents              ☑     ☐
Read                              ☑     ☐
Write                             ☑     ☐
```

**12. Click "OK"** (closes permissions dialog)

**13. Click "OK"** (closes properties)

---

**Updated ACL:**

```
Group or user names:
├─ COMPUTERNAME\abcd1234      (Full Control)
├─ COMPUTERNAME\Accounting    (Modify)  ← ADDED!
├─ COMPUTERNAME\Management    (Modify)
└─ NT AUTHORITY\SYSTEM        (Full Control)
```

**Note:** We kept Management group too. In production, you'd decide:
- Keep both (both departments need access)
- Remove Management (only Accounting needs access)

For this lab: Keep both (we'll restrict Management in Step 28)

---

**Solution Method 2: PowerShell (Professional)**

```powershell
# Get current ACL
$acl = Get-Acl -Path "C:\Accounting"

# Create new permission rule for Accounting group
$permission = "Accounting","Modify","ContainerInherit,ObjectInherit","None","Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission

# Add rule to ACL
$acl.SetAccessRule($accessRule)

# Apply modified ACL back to folder
Set-Acl -Path "C:\Accounting" -AclObject $acl
```

**Command Breakdown:**

```powershell
$permission = "Accounting","Modify","ContainerInherit,ObjectInherit","None","Allow"
               │           │        │                                │      │
               │           │        │                                │      └─ Allow or Deny
               │           │        │                                └─ Propagation flags (None = apply immediately)
               │           │        └─ Inheritance flags (both container and objects)
               │           └─ Access rights (Modify permission)
               └─ Identity (group or user name)
```

**Inheritance Flags Explained:**

```
ContainerInherit:
├─ Permission propagates to child folders
└─ Example: C:\Accounting\2024\ inherits permission

ObjectInherit:
├─ Permission propagates to child files
└─ Example: C:\Accounting\report.xlsx inherits permission

Both flags ensure complete inheritance tree
```

**Propagation Flags:**

```
None:
├─ Permission applies immediately
└─ No special propagation behavior

InheritOnly:
├─ Permission doesn't apply to this folder
├─ Only applies to children
└─ Rare use case

NoPropagateInherit:
├─ Applies to immediate children only
└─ Doesn't propagate further down
```

---

**Execute PowerShell Method:**

```powershell
$acl = Get-Acl -Path "C:\Accounting"
$permission = "Accounting","Modify","ContainerInherit,ObjectInherit","None","Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl -Path "C:\Accounting" -AclObject $acl
```

**No output = Success!**

---

**Verification:**

```powershell
(Get-Acl "C:\Accounting").Access | Format-Table IdentityReference, FileSystemRights, AccessControlType
```

**Expected Output:**

```
IdentityReference             FileSystemRights AccessControlType
-----------------             ---------------- -----------------
COMPUTERNAME\abcd1234         FullControl      Allow
COMPUTERNAME\Accounting       Modify           Allow  ← NEW!
COMPUTERNAME\Management       Modify           Allow
NT AUTHORITY\SYSTEM           FullControl      Allow
```

**Perfect! Accounting group now has NTFS permissions.**

---

**Test the Fix (Login as User2a):**

**1. Sign out**

**2. Login as User2a**

**3. Press Win + R**

**4. Type:** `\\localhost\Accounting Share`

**5. Press Enter**

**Expected Result:** Folder opens successfully! ✓

**6. Right-click → New → Text Document**

**7. Name:** `AccessTest.txt`

**8. Open it, type:** "Accounting share access confirmed!"

**9. Save and close**

**Success! User2a can now access the share!**

**10. Sign out, log back as admin**

---

**What We Learned:**

```
Problem-Solving Process:
1. Identify the problem (Accounting users denied access)
2. Diagnose root cause (missing NTFS permissions)
3. Determine solution (add Accounting group to ACL)
4. Implement fix (GUI or PowerShell)
5. Verify solution (test with actual user)
6. Document change (in lab report or change log)

This is professional IT administration!
```

---

### **🔧 STEP 27: Grant Management Read Access to Accounting Share**

**Learning Objective:** Modify share permissions to allow cross-department visibility.

**Business Scenario:**

```
Requirement: Management needs to VIEW accounting reports for oversight
├─ Should be able to: Read files, view reports
├─ Should NOT be able to: Create, modify, or delete files
└─ Principle: Least privilege (read-only auditing)
```

---

**Current State:**

```
Share Permissions on "Accounting Share":
└─ Accounting group: Full Control

We need to add:
└─ Management group: Read
```

---

**Method 1: GUI**

**1. Right-click Start → Computer Management**

**2. Expand "System Tools"**

**3. Expand "Shared Folders"**

**4. Click "Shares"**

**Shares List:**

```
Share Name              Folder Path          # Client Connections
Admin$                  C:\Windows           0
Accounting Share        C:\Accounting        0
C$                      C:\                  0
IPC$                                         0
Management Share        C:\Management        0
```

**5. Right-click "Accounting Share"**

**6. Select "Properties"**

**7. Click "Share Permissions" tab**

**Current Permissions:**

```
Group or user names:
└─ Accounting (Full Control)
```

**8. Click "Add"**

**9. Type:** `Management`

**10. Click "Check Names"**

**11. Click "OK"**

**12. Select "Management" in the list**

**13. Ensure ONLY "Read" is checked:**

```
Permissions for Management:      Allow  Deny
Full Control                      ☐     ☐
Change                            ☐     ☐
Read                              ☑     ☐
```

**14. Click "OK"** (closes permissions)

**15. Click "OK"** (closes properties)

---

**Method 2: PowerShell (Recommended)**

```powershell
Grant-SmbShareAccess -Name "Accounting Share" -AccountName "Management" -AccessRight Read -Force
```

**Command Breakdown:**

```
Grant-SmbShareAccess
│
├─ Function: Adds or modifies share permissions
├─ Does NOT: Modify NTFS permissions
└─ Idempotent: Can run multiple times safely

-Name "Accounting Share"
│
└─ Target share to modify

-AccountName "Management"
│
└─ User or group to grant access

-AccessRight Read
│
├─ Options: Full, Change, Read
└─ Read = View only, no modifications

-Force
│
└─ Suppresses confirmation prompt (useful for scripts)
```

**Execute:**

```powershell
Grant-SmbShareAccess -Name "Accounting Share" -AccountName "Management" -AccessRight Read -Force
```

**Expected Output:**

```
Name              ScopeName AccountName      AccessControlType AccessRight
----              --------- -----------      ----------------- -----------
Accounting Share  *         Management       Allow             Read
```

---

**Verification:**

```powershell
Get-SmbShareAccess -Name "Accounting Share" | Format-Table
```

**Expected Output:**

```
Name              ScopeName AccountName      AccessControlType AccessRight
----              --------- -----------      ----------------- -----------
Accounting Share  *         Accounting       Allow             Full
Accounting Share  *         Management       Allow             Read
```

**Perfect! Both groups now have share access.**

---

**Permission Matrix (Current State):**

```
\\localhost\Accounting Share → C:\Accounting

                   Share Permission    NTFS Permission    Effective Network Access
─────────────────────────────────────────────────────────────────────────────────
Accounting Group   Full Control        Modify             Modify (most restrictive)
Management Group   Read                Modify             Read (most restrictive)
Everyone Else      (none)              (none)             No Access
```

**Analysis for Management User:**

```
User1a (Management member) accesses \\localhost\Accounting Share:

Gate 1 - Share Permission:
├─ Management group: Read ✓
└─ Pass to Gate 2

Gate 2 - NTFS Permission:
├─ Management group: Modify ✓
└─ Pass

Effective Access: Read (Share is more restrictive)
Result: Can view files, cannot modify ✓
```

---

**Test the Configuration:**

**1. Sign out, login as User1a** (Management member)

**2. Press Win + R**

**3. Type:** `\\localhost\Accounting Share`

**4. Press Enter**

**Expected:** Folder opens, files visible ✓

**5. Find the "AccessTest.txt" file (created by User2a earlier)**

**6. Try to open it**

**Expected:** File opens, content readable ✓

**7. Try to edit and save**

**Expected:** Error message:

```
┌─────────────────────────────────────────┐
│  AccessTest.txt                         │
├─────────────────────────────────────────┤
│  You don't have permission to save in   │
│  this location.                         │
│                                         │
│  Contact the administrator to obtain    │
│  permission.                            │
│                                         │
│  Would you like to save in the         │
│  Documents folder instead?              │
│                                         │
│        [Yes]              [No]          │
└─────────────────────────────────────────┘
```

**Click "No" - this confirms read-only access works!**

**8. Try to create a new file:**
   - Right-click → New → Text Document

**Expected:** Error or grayed out option

**9. Sign out, log back as admin**

---

**What We Accomplished:**

```
Cross-Department Access Control:
✓ Accounting users: Full access (read/write/delete)
✓ Management users: Read-only access (oversight/auditing)
✓ Proper separation of duties
✓ Least privilege enforcement

This is real-world access control!
```

---

### **🔧 STEP 28: Remove Management Write Access to Accounting Directory**

**Learning Objective:** Refine NTFS permissions to enforce read-only at filesystem level.

**Current Problem:**

```
Management users have:
├─ Share Permission: Read (correct!)
└─ NTFS Permission: Modify (too permissive!)

If they access locally (C:\Accounting), they can modify files!
We need to restrict NTFS to Read & Execute only.
```

---

**Strategy Decision Point:**

**Option 1: Remove Management from NTFS ACL entirely**
```
Result: No local or network access
Problem: They need read access via share
Verdict: Too restrictive ✗
```

**Option 2: Change Management NTFS permission to Read & Execute**
```
Result: Read-only both locally and via network
Combined with Share Read = Consistent read-only
Verdict: Perfect! ✓
```

---

**Method 1: GUI**

**1. Open File Explorer**

**2. Navigate to C:\Accounting**

**3. Right-click → Properties → Security**

**4. Click "Advanced" button**

**Permission Entries:**

```
Type   Principal              Access        Inherited
Allow  COMPUTERNAME\abcd1234  Full Control  No
Allow  COMPUTERNAME\Accounting Modify       No
Allow  COMPUTERNAME\Management Modify       No  ← Need to modify this
Allow  NT AUTHORITY\SYSTEM    Full Control  No
```

**5. Select the "Management" entry**

**6. Click "Edit"**

**Permission Entry for Management:**

```
Principal: COMPUTERNAME\Management

Type: ○ Allow  ○ Deny
Applies to: [This folder, subfolders and files ▼]

Basic permissions:
☑ Full control              ← Uncheck this
☑ Modify                    ← Uncheck this
☑ Read & execute            ← Keep this
☑ List folder contents      ← Keep this
☑ Read                      ← Keep this
☐ Write                     ← Ensure unchecked
```

**7. UNCHECK "Modify"**

**Result:**

```
Basic permissions:
☐ Full control
☐ Modify
☑ Read & execute
☑ List folder contents
☑ Read
☐ Write
```

**8. Click "OK"**

**9. Click "OK"** (closes Advanced Security)

**10. Click "OK"** (closes Properties)

---

**Method 2: PowerShell (More Precise Control)**

**Remove existing Management permission and add new Read-only permission:**

```powershell
# Get current ACL
$acl = Get-Acl -Path "C:\Accounting"

# Find and remove existing Management rule
$existingRule = $acl.Access | Where-Object {$_.IdentityReference -eq "COMPUTERNAME\Management"}
$acl.RemoveAccessRule($existingRule)

# Create new Read & Execute permission
$permission = "Management","ReadAndExecute","ContainerInherit,ObjectInherit","None","Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission

# Add new rule
$acl.SetAccessRule($accessRule)

# Apply
Set-Acl -Path "C:\Accounting" -AclObject $acl
```

**Note:** Replace "COMPUTERNAME" with actual computer name or use:

```powershell
$computerName = $env:COMPUTERNAME
$acl = Get-Acl -Path "C:\Accounting"
$existingRule = $acl.Access | Where-Object {$_.IdentityReference -like "*\Management"}
$acl.RemoveAccessRule($existingRule)
$permission = "Management","ReadAndExecute","ContainerInherit,ObjectInherit","None","Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl -Path "C:\Accounting" -AclObject $acl
```

---

**Verification:**

```powershell
(Get-Acl "C:\Accounting").Access | Format-Table IdentityReference, FileSystemRights, AccessControlType
```

**Expected Output:**

```
IdentityReference             FileSystemRights    AccessControlType
-----------------             ----------------    -----------------
COMPUTERNAME\abcd1234         FullControl         Allow
COMPUTERNAME\Accounting       Modify              Allow
COMPUTERNAME\Management       ReadAndExecute      Allow  ← Changed!
NT AUTHORITY\SYSTEM           FullControl         Allow
```

---

**Updated Permission Matrix:**

```
C:\Accounting Folder

                   Share Permission    NTFS Permission      Effective Network    Effective Local
───────────────────────────────────────────────────────────────────────────────────────────────────
Accounting Group   Full Control        Modify               Modify               Modify
Management Group   Read                ReadAndExecute       Read                 ReadAndExecute
Everyone Else      (none)              (none)               No Access            No Access
```

**Perfect! Management now has consistent read-only access both locally and over network.**

---

**Test Configuration:**

**1. Sign in as User1a** (Management member)

**2. Test local access:**
   - Navigate to C:\Accounting
   - Try to open AccessTest.txt → Should work ✓
   - Try to create new file → Should fail ✓

**3. Test network access:**
   - Navigate to \\localhost\Accounting Share
   - Same behavior: read works, write fails ✓

**4. Sign out, log back as admin**

---

### **🔧 STEP 29: Deny Accounting Users Access to Management Directory**

**Learning Objective:** Using Deny permissions (the "nuclear option").

**Requirement:**

```
Accounting users should NOT be able to view Management directory
├─ Deny local access (C:\Management)
└─ Deny network access (\\localhost\Management Share)
```

**⚠️ Important Reminder: Deny ALWAYS Wins!**

```
Permission Precedence:
1. Explicit Deny (highest priority)
2. Explicit Allow
3. Inherited Deny
4. Inherited Allow
5. Implicit Deny (no permission = denied)
```

---

**Method 1: GUI**

**1. Navigate to C:\Management**

**2. Right-click → Properties → Security**

**3. Click "Edit"**

**4. Click "Add"**

**5. Type:** `Accounting`

**6. Click "Check Names" → OK**

**7. Select "Accounting" in the list**

**8. In the "Deny" column, check "Full control"**

```
Permissions for Accounting:      Allow  Deny
Full control                      ☐     ☑  ← Check this!
Modify                            ☐     ☑  (auto-checks)
Read & execute                    ☐     ☑  (auto-checks)
List folder contents              ☐     ☑  (auto-checks)
Read                              ☐     ☑  (auto-checks)
Write                             ☐     ☑  (auto-checks)
```

**9. Security Warning appears:**

```
┌──────────────────────────────────────────┐
│  Windows Security                   [X] │
├──────────────────────────────────────────┤
│                                          │
│  You are setting a deny permissions     │
│  entry. Deny entries take precedence    │
│  over allow entries. This means that if │
│  a user is a member of two groups, one  │
│  that is allowed and one that is denied,│
│  the deny will take precedence.         │
│                                          │
│  Do you want to continue?                │
│                                          │
│            [Yes]        [No]             │
└──────────────────────────────────────────┘
```

**10. Click "Yes"** (we understand the implications)

**11. Click "OK"** twice

---

**Method 2: PowerShell**

```powershell
$acl = Get-Acl -Path "C:\Management"
$permission = "Accounting","FullControl","ContainerInherit,ObjectInherit","None","Deny"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl -Path "C:\Management" -AclObject $acl
```

**Key Difference:** Last parameter is "Deny" instead of "Allow"

---

**Verification:**

```powershell
(Get-Acl "C:\Management").Access | Format-Table IdentityReference, FileSystemRights, AccessControlType
```

**Expected Output:**

```
IdentityReference             FileSystemRights AccessControlType
-----------------             ---------------- -----------------
COMPUTERNAME\Accounting       FullControl      Deny    ← NEW!
COMPUTERNAME\abcd1234         FullControl      Allow
COMPUTERNAME\Management       Modify           Allow
NT AUTHORITY\SYSTEM           FullControl      Allow
```

**Notice:** Deny entry appears FIRST (Windows automatically reorders ACL with Denies first)

---

**Why This Works:**

```
User2a (Accounting member) tries to access C:\Management:

Access Token Contains:
├─ User2a SID: S-1-5-21-xxx-1003
├─ Accounting SID: S-1-5-21-xxx-2002  ← This is the key!
└─ Users SID: S-1-5-32-545

ACL Evaluation (in order):
1. Check Deny entries first:
   ├─ Accounting (S-1-5-21-xxx-2002): Deny Full Control
   ├─ Token contains this SID: MATCH!
   └─ Result: IMMEDIATE DENIAL ✗

2. Allow entries never evaluated (Deny already decided)

Access Denied!
```

---

**Test Configuration:**

**1. Sign in as User2a** (Accounting member)

**2. Test local access:**
   - Navigate to C:\
   - Try to open "Management" folder

**Expected Result:**

```
┌─────────────────────────────────────────┐
│  C:\Management                          │
├─────────────────────────────────────────┤
│  You don't have permission to access    │
│  this folder.                           │
│                                         │
│  Click Continue to permanently get      │
│  access to this folder.                 │
│                                         │
│         [Continue]    [Cancel]          │
└─────────────────────────────────────────┘
```

**Click Cancel** - Deny is working! ✓

**3. Test network access:**
   - Press Win + R
   - Type: `\\localhost\Management Share`
   - Press Enter

**Expected:** Access Denied (Deny applies to network access too!)

**4. Sign out, log back as admin**

---

**When to Use Deny (Best Practices):**

```
✓ Good Use Cases:
├─ Temporarily blocking specific user while keeping in group
├─ Blocking access to sensitive data for specific group
├─ Compliance requirements (explicit denial needed)
└─ Overriding inherited Allow permissions

✗ Bad Use Cases:
├─ Primary security method (use lack of Allow instead)
├─ Complex scenarios (hard to troubleshoot)
├─ "Just in case" (leads to permission hell)
└─ When removing from group is cleaner
```

**Aphorism:** *"Deny is a scalpel, not a hammer. Use it surgically, not systematically."*

---

### **🔧 STEP 30: Enable the Local Administrator Account**

**Learning Objective:** Understanding built-in accounts and security implications.

**Why is Administrator Disabled by Default?**

```
Security Reasoning:
├─ Well-known account name (attackers target it)
├─ No lockout policy applies (built-in accounts exempt)
├─ Blank password by default (on fresh install)
├─ Security best practice: Use named admin accounts instead
└─ Audit trail: Named accounts show who did what
```

**When to Enable:**

```
✓ Legitimate Reasons:
├─ Emergency access (if all admin accounts locked)
├─ Recovery scenarios
├─ Testing or lab environments
├─ Legacy application requirements

✗ Bad Reasons:
├─ "Easier than creating admin accounts"
├─ Daily administrative work (use named account!)
├─ Shared administrative access (defeats accountability)
```

---

**Method 1: GUI**

**1. Right-click Start → Computer Management**

**2. Local Users and Groups → Users**

**3. Double-click "Administrator"**

**Administrator Properties:**

```
┌────────────────────────────────────────┐
│  Administrator Properties         [X] │
├────────────────────────────────────────┤
│  General │ Member Of │ Profile │...   │
├────────────────────────────────────────┤
│  User name:  Administrator             │
│  Full name:  (blank)                   │
│  Description: Built-in account for ... │
│                                        │
│  ☑ User must change password at next..│
│  ☐ User cannot change password         │
│  ☑ Password never expires              │
│  ☑ Account is disabled  ← Uncheck this!│
│  ☐ Account is locked out               │
│                                        │
│            [OK]    [Cancel]  [Apply]   │
└────────────────────────────────────────┘
```

**4. UNCHECK "Account is disabled"**

**5. Click "OK"**

---

**Method 2: PowerShell (One Command)**

```powershell
Enable-LocalUser -Name "Administrator"
```

**That's it! Simple and elegant.**

---

**Verification:**

```powershell
Get-LocalUser -Name "Administrator" | Format-List Name, Enabled, Description
```

**Expected Output:**

```
Name        : Administrator
Enabled     : True  ← Was False before!
Description : Built-in account for administering the computer/domain
```

**Extended Information:**

```powershell
Get-LocalUser -Name "Administrator" | Format-List *
```

**Shows:**

```
Name                 : Administrator
Enabled              : True
UserMayChangePassword: True
PasswordRequired     : False  ← Security concern!
SID                  : S-1-5-21-xxx-500  ← Well-known RID: 500
PrincipalSource      : Local
ObjectClass          : User
PasswordLastSet      : (never)
PasswordExpires      : (never)
LastLogon            : (never or last use date)
```

**Notice the SID:** Always ends in -500 (Administrator RID is always 500!)

---

**Security Best Practices After Enabling:**

**1. Set a Strong Password:**

```powershell
$password = Read-Host "Enter new Administrator password" -AsSecureString
Set-LocalUser -Name "Administrator" -Password $password
```

**2. Rename the Account (Advanced Security):**

```
You CAN'T rename via PowerShell easily, but via GUI:
1. Computer Management → Users
2. Right-click Administrator → Rename
3. Choose obscure name (e.g., "SysAdmin2024")

Why? Attackers know "Administrator" exists; they won't know "SysAdmin2024"
Note: SID stays S-1-5-21-xxx-500 (rename doesn't change SID!)
```

**3. Enable Auditing:**

```powershell
# Audit Administrator logons (requires Group Policy or auditpol)
auditpol /set /subcategory:"Logon" /success:enable /failure:enable
```

**4. Review Group Membership:**

```powershell
Get-LocalGroupMember -Group "Administrators" | Where-Object {$_.Name -like "*Administrator*"}
```

**Expected:** Administrator is member of Administrators group (automatic, can't remove)

---

**Test Login (Optional but Educational):**

**1. Sign out**

**2. Login as:**
   - Username: `Administrator`
   - Password: (blank if you didn't set one, or your new password)

**3. Desktop appears**

**4. Notice:** Administrator has full system access

**5. Sign out, log back as your college account**

---

**Real-World Scenario:**

```
Company: "SecureCorp"
Incident: All admin accounts locked after password policy change

Problem:
├─ 5 IT admins forgot to update passwords
├─ All accounts locked after failed attempts
├─ No one can perform admin tasks
└─ Business operations halted

Solution:
├─ Boot to Safe Mode
├─ Local Administrator account auto-enabled in Safe Mode
├─ Login as Administrator
├─ Unlock admin accounts
├─ Reset passwords
└─ Resume operations

Lesson: Keep Administrator account available for emergencies!
```

---

### **🔧 STEP 31: Add User1a to IT Management Group (Administrators)**

**Learning Objective:** Understanding built-in administrative groups.

**Business Scenario:**

```
User1a Promotion:
├─ Previous role: Management team member
├─ New role: IT Department Manager
├─ Needs: Administrative rights on local computer
└─ Solution: Add to Administrators group
```

**Understanding the Administrators Group:**

```
Administrators (SID: S-1-5-32-544)
├─ Well-known built-in group
├─ Highest privilege level on local computer
├─ Members can:
│  ├─ Create/delete users and groups
│  ├─ Modify any file permissions
│  ├─ Install software system-wide
│  ├─ Modify system settings
│  ├─ Take ownership of any file
│  └─ Bypass most security restrictions
└─ UAC still applies (must elevate to get full token)
```

---

**Method 1: GUI**

**1. Computer Management → Groups**

**2. Double-click "Administrators"**

**Current Members:**

```
Members:
├─ Administrator (built-in account)
└─ [Your college account - abcd1234]

Built-in members can't be removed
```

**3. Click "Add"**

**4. Type:** `User1a`

**5. Check Names → OK**

**6. Click "OK"**

**New Member List:**

```
Members:
├─ Administrator
├─ abcd1234
└─ User1a  ← NEW!
```

---

**Method 2: PowerShell**

```powershell
Add-LocalGroupMember -Group "Administrators" -Member "User1a"
```

**Simple and effective!**

---

**Verification:**

```powershell
Get-LocalGroupMember -Group "Administrators"
```

**Expected Output:**

```
ObjectClass Name                    PrincipalSource
----------- ----                    ---------------
User        COMPUTERNAME\Administrator  Local
User        COMPUTERNAME\abcd1234       Local
User        COMPUTERNAME\User1a         Local  ← Added!
```

---

**Check User1a's Group Memberships:**

```powershell
# Get all groups User1a is in
Get-LocalGroup | ForEach-Object {
    $group = $_
    $members = Get-LocalGroupMember -Group $group.Name -ErrorAction SilentlyContinue
    if ($members.Name -contains "$env:COMPUTERNAME\User1a") {
        Write-Host "User1a is in: $($group.Name)"
    }
}
```

**Expected Output:**

```
User1a is in: Administrators
User1a is in: Management
User1a is in: Users
```

**User1a now has THREE group memberships!**

---

**Understanding Nested Privileges:**

```
User1a Access Token After Next Login:
┌────────────────────────────────────┐
│ User SID: User1a                   │
├────────────────────────────────────┤
│ Group SIDs:                        │
│  ├─ Administrators (HIGH PRIVILEGE)│
│  ├─ Management (Department access) │
│  └─ Users (Standard rights)        │
├────────────────────────────────────┤
│ Privileges:                        │
│  ├─ SeBackupPrivilege             │
│  ├─ SeRestorePrivilege            │
│  ├─ SeDebugPrivilege              │
│  ├─ SeTakeOwnershipPrivilege      │
│  └─ ... (20+ admin privileges)     │
└────────────────────────────────────┘

Administrators group grants EXTENSIVE system privileges!
```

---

**Test User1a's New Privileges:**

**1. Sign in as User1a**

**2. Right-click Start → Search "PowerShell"**

**3. Right-click Windows PowerShell → Run as administrator**

**Expected:** UAC prompt appears (because User1a is now admin!)

**4. Click "Yes"**

**5. PowerShell opens with admin rights!**

**6. Test admin command:**

```powershell
Get-LocalUser
```

**Should work!** (Before, User1a couldn't run this)

**7. Try creating a user:**

```powershell
New-LocalUser -Name "TestAdmin" -Password (ConvertTo-SecureString "P@ssW0rd" -AsPlainText -Force) -PasswordNeverExpires
```

**Should work!** User1a has admin rights now.

**8. Clean up test user:**

```powershell
Remove-LocalUser -Name "TestAdmin"
```

**9. Sign out, log back as your college account**

---

**Security Implications:**

```
Promoting User to Administrator:
✓ Benefits:
├─ Can perform administrative tasks
├─ Don't need to share Administrator password
├─ Accountability (audit logs show User1a, not Administrator)
└─ Can be revoked easily (remove from group)

⚠️ Risks:
├─ User can modify any security setting
├─ Can delete other admin accounts
├─ Can access all data on system
├─ Malware running as User1a has admin rights
└─ User might make dangerous changes

Best Practice:
├─ Use separate accounts (User1a for daily work, User1a-Admin for admin tasks)
├─ Enable auditing of admin actions
├─ Review admin group membership regularly
└─ Principle of least privilege (only admins who need it)
```

---

### **🔧 STEP 32: Remove User2b (Terminated Employee)**

**Learning Objective:** Proper account termination procedures.

**Business Scenario:**

```
Employee Termination:
├─ User2b employment ended
├─ Access must be revoked immediately
├─ Account data may need preservation (consider first!)
└─ Complete removal from system
```

**Account Deletion Decision Tree:**

```
Is employee permanently gone?
├─ Yes → Consider archive first, then delete
│   ├─ Archive home folder: C:\Users\User2b
│   ├─ Transfer ownership of files to manager
│   ├─ Export mailbox (if applicable)
│   └─ Then delete account
│
└─ No (might return) → Disable instead (Step 33)
    ├─ Account preserved
    ├─ Password doesn't expire while disabled
    └─ Can be re-enabled later
```

---

**Method 1: GUI**

**1. Computer Management → Users**

**2. Right-click "User2b"**

**3. Select "Delete"**

**4. Confirmation dialog:**

```
┌────────────────────────────────────────┐
│  Local Users and Groups           [X] │
├────────────────────────────────────────┤
│                                        │
│  Are you sure you want to delete       │
│  user User2b?                          │
│                                        │
│  Once deleted, this user account       │
│  cannot be recovered.                  │
│                                        │
│        [Yes]              [No]         │
└────────────────────────────────────────┘
```

**5. Click "Yes"**

**User2b disappears from list immediately.**

---

**Method 2: PowerShell**

```powershell
Remove-LocalUser -Name "User2b"
```

**⚠️ Warning:** No confirmation prompt by default! Use -Confirm for safety:

```powershell
Remove-LocalUser -Name "User2b" -Confirm
```

**Confirmation prompt:**

```
Confirm
Are you sure you want to perform this action?
Performing the operation "Remove" on target "User2b".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"):
```

**Type "Y" and Enter**

---

**Verification:**

```powershell
Get-LocalUser -Name "User2b"
```

**Expected Error:**

```
Get-LocalUser : User User2b was not found.
At line:1 char:1
+ Get-LocalUser -Name "User2b"
```

**Perfect! Account deleted.**

---

**Check Accounting Group Membership:**

```powershell
Get-LocalGroupMember -Group "Accounting"
```

**Expected Output:**

```
ObjectClass Name                    PrincipalSource
----------- ----                    ---------------
User        COMPUTERNAME\User2a     Local
User        COMPUTERNAME\User2c     Local
User        COMPUTERNAME\User2d     Local

User2b is gone!
```

---

**What Actually Gets Deleted:**

```
When you delete a user account:

✓ Removed Immediately:
├─ SAM database entry (username, SID, password hash)
├─ Group memberships (automatically removed from all groups)
├─ Security token template
└─ Registry keys in HKEY_USERS

✗ NOT Removed (Remains on disk):
├─ User profile folder: C:\Users\User2b\
├─ User's files (Desktop, Documents, etc.)
├─ Registry hive: C:\Users\User2b\NTUSER.DAT
└─ Local application data

These become "orphaned" and show as:
├─ Owner: S-1-5-21-xxx-1004 (SID, not name)
├─ No username displayed (SID can't resolve)
└─ Requires admin to take ownership and delete
```

---

**Orphaned Profile Cleanup:**

**View User Profiles:**

```powershell
Get-CimInstance -ClassName Win32_UserProfile | Where-Object {$_.LocalPath -like "*User2b*"} | Format-List *
```

**Delete Orphaned Profile:**

```powershell
$profile = Get-CimInstance -ClassName Win32_UserProfile | Where-Object {$_.LocalPath -like "*User2b*"}
$profile | Remove-CimInstance
```

**Or manually:**

**1. Navigate to C:\Users\**

**2. Delete "User2b" folder** (requires admin rights)

**3. Confirm when prompted about files in use**

---

**Check File Ownership (Orphaned Files):**

```powershell
Get-Acl "C:\Accounting\AccessTest.txt" | Format-List Owner
```

**If User2b created this file:**

```
Owner : S-1-5-21-xxx-1004  ← Orphaned SID!
```

**To take ownership and reassign:**

```powershell
# Take ownership
$file = "C:\Accounting\AccessTest.txt"
$acl = Get-Acl $file
$acl.SetOwner([System.Security.Principal.NTAccount]"COMPUTERNAME\abcd1234")
Set-Acl $file $acl

# Or use takeown.exe (older method)
takeown /f "C:\Accounting\AccessTest.txt"
```

---

**Professional Account Termination Procedure:**

```
1. Disable account immediately (Step 33 method)
2. Wait 24-48 hours (ensures no active sessions)
3. Archive critical data:
   ├─ Copy C:\Users\User2b to archive location
   ├─ Transfer file ownership to manager
   └─ Export any application-specific data
4. Document what was archived (compliance)
5. Delete account (after archive confirmed)
6. Delete profile folder
7. Review and update any service dependencies
8. Audit systems for User2b references
9. Document termination date in change log
```

---

### **🔧 STEP 33: Disable User2c (Contract Ended, May Return)**

**Learning Objective:** Temporary account suspension vs permanent deletion.

**Business Scenario:**

```
Contractor Status:
├─ User2c's contract ended
├─ Expected to return later (next quarter)
├─ Need to preserve account and data
└─ Must revoke access immediately

Solution: Disable (not delete)
```

**Disable vs Delete Comparison:**

| Aspect | Disable | Delete |
|--------|---------|--------|
| **Account exists** | Yes (inactive) | No (removed) |
| **Can login** | No | No |
| **Profile preserved** | Yes | No (orphaned) |
| **Files preserved** | Yes | Yes (orphaned) |
| **Group membership** | Yes (retained) | No (removed) |
| **Can be undone** | Yes (re-enable) | No (must recreate) |
| **SID** | Preserved | Lost forever |
| **Use case** | Temporary | Permanent |

---

**Method 1: GUI**

**1. Computer Management → Users**

**2. Double-click "User2c"**

**User2c Properties:**

```
┌────────────────────────────────────────┐
│  User2c Properties                [X] │
├────────────────────────────────────────┤
│  General │ Member Of │ Profile │...   │
├────────────────────────────────────────┤
│  User name:  User2c                    │
│  Full name:                            │
│  Description:                          │
│                                        │
│  ☐ User must change password at next..│
│  ☐ User cannot change password         │
│  ☑ Password never expires              │
│  ☐ Account is disabled  ← CHECK THIS! │
│  ☐ Account is locked out               │
│                                        │
│            [OK]    [Cancel]  [Apply]   │
└────────────────────────────────────────┘
```

**3. CHECK "Account is disabled"**

**4. Click "OK"**

---

**Method 2: PowerShell**

```powershell
Disable-LocalUser -Name "User2c"
```

**Simple and immediate!**

---

**Verification:**

```powershell
Get-LocalUser -Name "User2c" | Format-List Name, Enabled, LastLogon, SID
```

**Expected Output:**

```
Name      : User2c
Enabled   : False  ← Disabled!
LastLogon : [Date/Time of last login]
SID       : S-1-5-21-xxx-1005  ← SID preserved!
```

**Account still exists but is inactive.**

---

**Test the Disable:**

**1. Sign out**

**2. Try to login as User2c:**
   - Username: `User2c`
   - Password: `P@ssW0rd`

**Expected Result:**

```
┌────────────────────────────────────────┐
│                                        │
│  The user account has been disabled.   │
│  Please see your system administrator. │
│                                        │
│                [OK]                    │
└────────────────────────────────────────┘
```

**Perfect! Account is locked out.**

---

**Check Group Membership (Still Intact):**

```powershell
Get-LocalGroupMember -Group "Accounting"
```

**Expected Output:**

```
ObjectClass Name                    PrincipalSource
----------- ----                    ---------------
User        COMPUTERNAME\User2a     Local
User        COMPUTERNAME\User2c     Local  ← Still in group!
User        COMPUTERNAME\User2d     Local
```

**User2c is still a member, just disabled.**

---

**When User2c Returns (Future Scenario):**

```powershell
# Re-enable account
Enable-LocalUser -Name "User2c"

# Optionally require password change
Set-LocalUser -Name "User2c" -PasswordNeverExpires:$false

# User2c can now login with existing password
# All group memberships intact
# All files still owned by User2c
# Profile loads normally
```

**Everything preserved! As if they never left.**

---

**Professional Use Cases for Disable:**

```
✓ When to Disable:
├─ Temporary leave (medical, maternity, sabbatical)
├─ Seasonal employees (return next season)
├─ Contract workers between contracts
├─ Under investigation (preserve for forensics)
├─ Transferred to different department (might come back)
└─ Account compromise (disable while investigating)

✗ When to Delete:
├─ Permanent termination (fired, resigned, retired)
├─ Account never used (created in error)
├─ Security breach requiring complete removal
├─ Compliance requirement (data must be deleted)
└─ After disabled account archived and no longer needed
```

**Best Practice Lifecycle:**

```
1. Employee leaves → Disable immediately
2. Wait 30-90 days (retention period)
3. If not returning → Archive data
4. If archived → Delete account
5. If returning → Re-enable account
```

---

### **🔧 STEP 34: Block User1d from Management Directory**

**Learning Objective:** Individual user restriction within group membership.

**Business Scenario:**

```
Situation:
├─ User1d is member of Management group
├─ Management group has access to C:\Management
├─ User1d misused access (stored personal files)
├─ Need to block ONLY User1d, not entire Management group

Solution: Individual Deny permission
```

**The Conflict:**

```
User1d's Groups:
└─ Management → Has Modify on C:\Management

After we add Deny:
├─ User1d (individual) → Deny Full Control
└─ Management (group) → Allow Modify

Result: Deny wins! User1d loses access.
```

---

**Method 1: GUI**

**1. Navigate to C:\Management**

**2. Right-click → Properties → Security → Edit**

**3. Click "Add"**

**4. Type:** `User1d`

**5. Check Names → OK**

**6. Select "User1d"**

**7. In the "Deny" column, check "Full control"**

```
Permissions for User1d:          Allow  Deny
Full control                      ☐     ☑  ← Check this
Modify                            ☐     ☑
Read & execute                    ☐     ☑
List folder contents              ☐     ☑
Read                              ☐     ☑
Write                             ☐     ☑
```

**8. Security warning → Click "Yes"**

**9. Click "OK" twice**

---

**Method 2: PowerShell**

```powershell
$acl = Get-Acl -Path "C:\Management"
$permission = "User1d","FullControl","ContainerInherit,ObjectInherit","None","Deny"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl -Path "C:\Management" -AclObject $acl
```

---

**Verification:**

```powershell
(Get-Acl "C:\Management").Access | Format-Table IdentityReference, FileSystemRights, AccessControlType
```

**Expected Output:**

```
IdentityReference             FileSystemRights AccessControlType
-----------------             ---------------- -----------------
COMPUTERNAME\User1d           FullControl      Deny    ← NEW!
COMPUTERNAME\Accounting       FullControl      Deny
COMPUTERNAME\abcd1234         FullControl      Allow
COMPUTERNAME\Management       Modify           Allow
NT AUTHORITY\SYSTEM           FullControl      Allow
```

**Notice:** Deny entries appear first (automatic ACL ordering)

---

**Test the Block:**

**1. Sign in as User1d**

**2. Try to access C:\Management**

**Expected:** Access Denied! ✓

**3. Try via network: `\\localhost\Management Share`**

**Expected:** Access Denied! ✓ (Deny applies to network too)

**4. Sign out, log back as admin**

---

**Real-World Scenario:**

```
Company: "TechCorp" - 50 employees

Problem:
├─ Marketing department (20 people) has shared folder
├─ One employee (John) leaked confidential campaign
├─ Need to block John's access immediately
├─ Can't remove from Marketing group (needs other Marketing resources)
├─ Can't disable account (still employed, needs email/apps)

Solution:
├─ Add Deny for John on Marketing Shared Folder
├─ John can't access sensitive marketing materials
├─ Still in Marketing group (access to other resources)
├─ Still active account (email, applications work)
├─ Surgical, targeted, reversible

Implementation:
$acl = Get-Acl "D:\Shares\Marketing"
$permission = "DOMAIN\john.smith","FullControl","ContainerInherit,ObjectInherit","None","Deny"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl "D:\Shares\Marketing" $acl
```

---

### **🔧 STEP 35: Map Z: Drive for User2d**

**Learning Objective:** Persistent network drive mapping.

**📸 DELIVERABLE %8 - SCREENSHOT REQUIRED!**

**Business Requirement:**

```
User2d works extensively with Accounting share
├─ Typing \\localhost\Accounting Share is tedious
├─ Wants Z: drive that automatically connects
├─ Should reconnect at every login

Solution: Persistent drive mapping
```

---

**Method 1: GUI (As User2d)**

**1. Sign out, login as User2d**

**2. Open File Explorer (Win + E)**

**3. Right-click "This PC"**

**4. Select "Map network drive"**

**Map Network Drive Dialog:**

```
┌────────────────────────────────────────┐
│  Map Network Drive                [X] │
├────────────────────────────────────────┤
│                                        │
│  Drive:    [Z:  ▼]                     │
│                                        │
│  Folder:   [____________________]      │
│              [Browse...]               │
│                                        │
│  Example: \\server\share               │
│                                        │
│  ☑ Reconnect at sign-in                │
│  ☐ Connect using different credentials │
│                                        │
│  [Finish]              [Cancel]        │
└────────────────────────────────────────┘
```

**5. Drive: Select "Z:" from dropdown**

**6. Folder: Type `\\localhost\Accounting Share`**

**7. CHECK "Reconnect at sign-in"** ← CRITICAL!

**8. Click "Finish"**

**Result:** Z: drive appears in File Explorer!

---

**📸 TAKE SCREENSHOT NOW - DELIVERABLE %8**

**What to Capture:**

```
File Explorer showing:
├─ Left sidebar with "This PC" expanded
├─ Network location (Z:)
│  Name: "Accounting Share (\\localhost)"
├─ Can see Z: drive icon
└─ Shows it's mapped to \\localhost\Accounting Share

Make screenshot clear and readable!
```

**Screenshot Checklist:**

```
☑ File Explorer window visible
☑ Z: drive shown in device list
☑ Label "Accounting Share" visible
☑ UNC path visible (hover over Z: if needed)
☑ Clear, not blurry
☑ Shows User2d is logged in (taskbar/title)
```

---

**Verification (As User2d):**

**Test 1: Access via Z: drive**

```powershell
# In PowerShell
Set-Location Z:
Get-ChildItem
```

**Should show contents of Accounting Share!**

**Test 2: Create file**

```
1. Navigate to Z:\
2. Right-click → New → Text Document
3. Name: "MappedDriveTest.txt"
4. Should work! ✓
```

**Test 3: Persistence**

```
1. Sign out
2. Sign back in as User2d
3. Open File Explorer
4. Z: drive still there! ✓
```

**Perfect! Persistent mapping works.**

---

**Method 2: PowerShell (Advanced - Can Run as Admin)**

```powershell
# Create mapped drive (temporary - current session only)
New-PSDrive -Name "Z" -PSProvider FileSystem -Root "\\localhost\Accounting Share" -Persist

# -Persist flag makes it reconnect at login (same as GUI checkbox)
```

**Verification:**

```powershell
Get-PSDrive -Name "Z"
```

**Output:**

```
Name       Used (GB)     Free (GB) Provider      Root
----       ---------     --------- --------      ----
Z               0.01         50.23 FileSystem    \\localhost\Accounting Share
```

---

**Method 3: Login Script (Enterprise Method)**

For environments where you want ALL Accounting users to have Z: mapped:

**Create batch file: `MapAccountingDrive.bat`**

```batch
@echo off
net use Z: "\\localhost\Accounting Share" /persistent:yes
```

**Deploy via:**
- Group Policy (Computer Configuration → Scripts → Startup)
- Task Scheduler (Run at logon)
- User profile startup folder

---

**Method 4: Registry (Direct Method - Advanced)**

**Mapped drives stored in registry:**

```
Registry Location:
HKEY_CURRENT_USER\Network\Z

Values:
├─ ProviderName: "Microsoft Windows Network"
├─ ProviderType: 0x20000 (DWORD)
├─ RemotePath: "\\localhost\Accounting Share"
└─ UserName: (blank or username)
```

**PowerShell to create:**

```powershell
$regPath = "HKCU:\Network\Z"
New-Item -Path $regPath -Force
New-ItemProperty -Path $regPath -Name "RemotePath" -Value "\\localhost\Accounting Share" -PropertyType String
New-ItemProperty -Path $regPath -Name "UserName" -Value "" -PropertyType String
```

---

**Viewing Mapped Drives (As User2d):**

**PowerShell:**

```powershell
Get-PSDrive | Where-Object {$_.DisplayRoot -ne $null}
```

**CMD:**

```cmd
net use
```

**Output:**

```
New connections will be remembered.

Status       Local     Remote                    Network
-------------------------------------------------------------------------------
OK           Z:        \\localhost\Accounting Share
                                                Microsoft Windows Network
```

---

**Removing Mapped Drive (If Needed):**

**PowerShell:**

```powershell
Remove-PSDrive -Name "Z"
```

**CMD:**

```cmd
net use Z: /delete
```

**GUI:**

```
1. File Explorer
2. Right-click Z: drive
3. Select "Disconnect"
```

---

**Real-World Use Cases:**

```
Mapped Drives in Enterprise:

H: → Home folder (\\fileserver\users\%USERNAME%)
├─ Personal storage
└─ Follows user across computers (roaming)

P: → Department share (\\fileserver\departments\Marketing)
├─ Collaborative workspace
└─ Mapped for all department members

S: → Company shared drive (\\fileserver\company)
├─ Company-wide resources
└─ Mapped for all employees

T: → Temporary/scratch space (\\fileserver\temp\%USERNAME%)
├─ Non-backed-up working area
└─ Cleaned regularly

Common Letter Conventions:
├─ A:-B: Reserved for floppy drives (legacy)
├─ C: Primary hard drive
├─ D: CD/DVD or second hard drive
├─ E:-F: Removable drives
├─ G:-M: Available for mapping
├─ N:-Z: Network drives (by convention)
└─ Z: Often "last resort" drive
```

---

**Troubleshooting Drive Mapping Issues:**

**Problem: "Network path not found"**

```
Causes:
├─ Server offline or unreachable
├─ DNS not resolving server name
├─ Firewall blocking SMB (port 445)
├─ Share deleted or renamed
└─ Network disconnected

Diagnosis:
1. ping localhost (should always work)
2. Test UNC path directly: \\localhost\Accounting Share
3. Check share exists: Get-SmbShare -Name "Accounting Share"
4. Verify network connectivity
```

**Problem: "The mapped network drive could not be created because the following error has occurred"**

```
Causes:
├─ Drive letter already in use
├─ Insufficient permissions
├─ Credential mismatch
└─ SMB service not running

Solution:
1. Choose different drive letter
2. Verify permissions (share + NTFS)
3. Try with explicit credentials
4. Check SMB service: Get-Service -Name LanmanWorkstation
```

**Problem: Drive disconnects randomly**

```
Causes:
├─ Network timeout settings
├─ Laptop sleep/hibernate
├─ VPN disconnect
└─ Server reboot

Solution:
1. Adjust network timeout: net config workstation /autodisconnect:-1
2. Use DFS for resilience
3. Reconnect script on network resume
```

---

**Sign out from User2d, log back as your college account** (for final steps)

---

## **SECTION 4: Final Deliverables and Documentation**

**Purpose:** Generate comprehensive system documentation using PowerShell.

**Aphorism:** *"What gets documented gets maintained. What gets measured gets managed."*

---

### **🔧 STEP 36-37: Navigate to Documents Folder**

**Objective:** Understand environment variables and filesystem navigation.

**1. Ensure you're logged in as your college account (abcd1234)**

**2. Open PowerShell as Administrator**

**3. Execute:**

```powershell
cd $env:HOMEPATH\Documents
```

**Command Breakdown:**

```
cd (alias for Set-Location)
│
├─ Function: Changes current directory
├─ Aliases: cd, chdir, sl
└─ Similar to: cd in CMD/Linux

$env:HOMEPATH
│
├─ Environment variable: User's home path
├─ Value: "\Users\Username"
├─ Full path: C:\Users\Username (when combined with drive)
└─ Dynamic: Changes based on logged-in user

\Documents
│
└─ Subfolder in user profile

Complete Path Example:
$env:HOMEPATH = "\Users\abcd1234"
Full command navigates to: C:\Users\abcd1234\Documents
```

---

**Verify Current Location:**

```powershell
Get-Location
```

**Or shorthand:**

```powershell
pwd
```

**Expected Output:**

```
Path
----
C:\Users\abcd1234\Documents
```

**Perfect! We're in the Documents folder.**

---

### **🔧 STEP 38: Understanding $env:HOMEPATH**

**📝 DELIVERABLE #9 - WRITE THIS ANSWER**

**Exploration:**

```powershell
# View all environment variables
Get-ChildItem env:
```

**Output (Partial):**

```
Name                           Value
----                           -----
ALLUSERSPROFILE                C:\ProgramData
APPDATA                        C:\Users\abcd1234\AppData\Roaming
CommonProgramFiles             C:\Program Files\Common Files
COMPUTERNAME                   DESKTOP-ABC123
HOMEDRIVE                      C:
HOMEPATH                       \Users\abcd1234  ← This one!
LOCALAPPDATA                   C:\Users\abcd1234\AppData\Local
NUMBER_OF_PROCESSORS           8
OS                             Windows_NT
PATH                           C:\Windows\system32;C:\Windows;...
PROCESSOR_ARCHITECTURE         AMD64
ProgramFiles                   C:\Program Files
SystemRoot                     C:\Windows
TEMP                           C:\Users\abcd1234\AppData\Local\Temp
USERNAME                       abcd1234
USERPROFILE                    C:\Users\abcd1234
windir                         C:\Windows
```

---

**Inspect Specific Variables:**

```powershell
Write-Host "HOMEPATH: $env:HOMEPATH"
Write-Host "HOMEDRIVE: $env:HOMEDRIVE"
Write-Host "USERPROFILE: $env:USERPROFILE"
Write-Host "USERNAME: $env:USERNAME"
Write-Host "COMPUTERNAME: $env:COMPUTERNAME"
```

**Output:**

```
HOMEPATH: \Users\abcd1234
HOMEDRIVE: C:
USERPROFILE: C:\Users\abcd1234
USERNAME: abcd1234
COMPUTERNAME: DESKTOP-ABC123
```

**Relationship:**

```
HOMEDRIVE + HOMEPATH = USERPROFILE
C:        + \Users\abcd1234 = C:\Users\abcd1234
```

---

**Why Environment Variables Matter:**

```
Without environment variables (hardcoded):
───────────────────────────────────────────
cd C:\Users\abcd1234\Documents
├─ Only works for user "abcd1234"
├─ Different user → breaks
├─ Different computer → breaks
└─ Not portable

With environment variables (dynamic):
───────────────────────────────────────────
cd $env:USERPROFILE\Documents
├─ Works for any user
├─ Works on any computer
├─ Portable across systems
└─ Professional scripting practice
```

---

**Common Use Cases:**

```powershell
# Save file to user's desktop
$file = "$env:USERPROFILE\Desktop\output.txt"

# Access user's temporary folder
$temp = $env:TEMP

# Get system drive
$systemDrive = $env:SystemDrive

# Build path to Program Files
$programFiles = $env:ProgramFiles

# Access Windows directory
$windows = $env:windir
```

---

**📝 DELIVERABLE #9 Answer:**

**Question:** What does the $env:HOMEPATH do?

**Write this comprehensive answer in your lab report:**

---

**Answer:**

`$env:HOMEPATH` is a PowerShell environment variable that contains the relative path to the current user's home directory within their home drive.

**Technical Details:**

**1. Environment Variable Access in PowerShell:**
PowerShell uses the `$env:` prefix to access Windows environment variables. This is part of the Environment provider, one of PowerShell's built-in providers that exposes system environment variables as a PowerShell drive.

**2. Value and Structure:**
`$env:HOMEPATH` contains a relative path in the format: `\Users\[Username]`

For example:
- For user "abcd1234": `\Users\abcd1234`
- For user "Administrator": `\Users\Administrator`

**3. Relationship to Other Variables:**
`$env:HOMEPATH` works in conjunction with other environment variables:

```
HOMEDRIVE + HOMEPATH = USERPROFILE
C:        + \Users\abcd1234 = C:\Users\abcd1234
```

- **HOMEDRIVE**: The drive letter where the user profile is stored (usually C:)
- **HOMEPATH**: The path relative to that drive (\Users\Username)
- **USERPROFILE**: The complete absolute path (C:\Users\Username)

**4. Purpose and Use Cases:**
Environment variables like `$env:HOMEPATH` serve several critical purposes:

- **Portability**: Scripts work across different user accounts without modification
- **Flexibility**: Adapts automatically to different system configurations
- **User-specific Paths**: Enables construction of paths to user-specific folders:
  - Desktop: `$env:HOMEPATH\Desktop`
  - Documents: `$env:HOMEPATH\Documents`
  - Downloads: `$env:HOMEPATH\Downloads`

**5. Viewing Environment Variables:**
To list all environment variables in PowerShell:
```powershell
Get-ChildItem env:
```

Or to view a specific variable:
```powershell
$env:HOMEPATH
```

**6. Practical Application in This Lab:**
When we executed `cd $env:HOMEPATH\Documents`, the command:
1. Retrieved the value of HOMEPATH (\Users\abcd1234)
2. Appended "\Documents" to create: \Users\abcd1234\Documents
3. Combined with the current drive (C:) to navigate to: C:\Users\abcd1234\Documents

This approach ensures the command works regardless of:
- Which user account runs the script
- What their username is
- Which drive letter their profile is on

**7. Comparison to Other Operating Systems:**
- **Linux/Unix**: Uses `$HOME` environment variable
- **Windows CMD**: Uses `%USERPROFILE%` with percent signs
- **PowerShell**: Uses `$env:USERPROFILE` or `$env:HOMEDRIVE$env:HOMEPATH`

**Conclusion:**
`$env:HOMEPATH` is a dynamic, user-specific environment variable that enables portable, user-agnostic scripting by providing the relative path to the current user's profile directory. It exemplifies best practices in script writing by avoiding hardcoded paths and ensuring code works across different users and systems.

---

**Continue to generate lab output file...**

---

### **🔧 STEP 39-40: Generate System Documentation (lab5.txt)**

**Objective:** Create comprehensive system state documentation using PowerShell output redirection.

**Understanding Output Redirection:**

```
Redirection Operators:
├─ >  : Create new file (overwrites if exists)
├─ >> : Append to file (creates if doesn't exist)
├─ 2> : Redirect errors to file
├─ 2>&1 : Redirect errors to standard output
└─ | : Pipeline (pass to next command)

For this lab: Use >> (append) for all commands
```

---

**Commands to Execute:**

**Each command appends its output to lab5.txt file in your Documents folder.**

**Command 1: Get All Local Users**

```powershell
Get-LocalUser >> lab5.txt
```

**What this captures:** All user accounts (enabled/disabled status, SIDs, descriptions)

---

**Command 2: Get All Local Groups**

```powershell
Get-LocalGroup >> lab5.txt
```

**What this captures:** All security groups (including built-in and custom)

---

**Command 3: Get Administrators Group Members**

```powershell
Get-LocalGroupMember -Group Administrators >> lab5.txt
```

**What this captures:** Who has administrative rights (should include: Administrator, abcd1234, User1a)

---

**Command 4: Get Management Group Members**

```powershell
Get-LocalGroupMember -Group Management >> lab5.txt
```

**What this captures:** Management department membership (User1a, User1b, User1c, User1d)

---

**Command 5: Get Accounting Group Members**

```powershell
Get-LocalGroupMember -Group Accounting >> lab5.txt
```

**What this captures:** Accounting department membership (User2a, User2c, User2d - NOT User2b who was deleted!)

---

**Command 6: Get All SMB Shares**

```powershell
Get-SmbShare >> lab5.txt
```

**What this captures:** All network shares (Management Share, Accounting Share, plus administrative shares)

---

**Command 7: Get Accounting Share Permissions**

```powershell
Get-SmbShareAccess -Name "accounting share" >> lab5.txt
```

**What this captures:** Who can access Accounting Share over network (should show: Accounting Full, Management Read)

---

**Command 8: Get Management Share Permissions**

```powershell
Get-SmbShareAccess -Name "management share" >> lab5.txt
```

**What this captures:** Who can access Management Share over network (should show: Management Change)

---

**Command 9: Get Management Folder ACL**

```powershell
Get-Acl -Path "C:\Management" | Format-Table -Wrap >> lab5.txt
```

**What this captures:** NTFS permissions on Management directory (abcd1234, Management, Accounting Deny, SYSTEM)

---

**Command 10: Get Accounting Folder ACL**

```powershell
Get-Acl -Path "C:\Accounting" | Format-Table -Wrap >> lab5.txt
```

**What this captures:** NTFS permissions on Accounting directory (abcd1234, Accounting, Management Read, SYSTEM)

---

**All Commands in Sequence (Copy and Paste):**

```powershell
# Navigate to Documents folder (if not already there)
cd $env:HOMEPATH\Documents

# Generate documentation
Get-LocalUser >> lab5.txt
Get-LocalGroup >> lab5.txt
Get-LocalGroupMember -Group Administrators >> lab5.txt
Get-LocalGroupMember -Group Management >> lab5.txt
Get-LocalGroupMember -Group Accounting >> lab5.txt
Get-SmbShare >> lab5.txt
Get-SmbShareAccess -Name "accounting share" >> lab5.txt
Get-SmbShareAccess -Name "management share" >> lab5.txt
Get-Acl -Path "C:\Management" | Format-Table -Wrap >> lab5.txt
Get-Acl -Path "C:\Accounting" | Format-Table -Wrap >> lab5.txt

# Confirmation message
Write-Host "`nDocumentation generated successfully in lab5.txt!" -ForegroundColor Green
Write-Host "Location: $env:USERPROFILE\Documents\lab5.txt" -ForegroundColor Cyan
```

---

### **🔧 STEP 41: Verify lab5.txt Contents**

**Read the file to terminal:**

```powershell
Get-Content lab5.txt
```

**This will display all content in PowerShell window. Review for completeness.**

---

**Alternative: Open in Notepad**

```powershell
notepad lab5.txt
```

**Check that you see:**
- ✓ All users listed (User1a-d, User2a,c,d, Administrator, your account)
- ✓ All groups listed (Management, Accounting, Administrators, etc.)
- ✓ Group memberships populated correctly
- ✓ Share information present
- ✓ ACL data visible

---

**If Something is Missing:**

```powershell
# Re-run the missing command with append
Get-LocalUser >> lab5.txt

# Or start over (delete and regenerate)
Remove-Item lab5.txt
# Then run all commands again
```

---

### **🔧 STEP 42: Submit lab5.txt Contents**

**📝 DELIVERABLE #10 - Include File Contents in Lab Report**

**Method 1: Copy from PowerShell**

```powershell
Get-Content lab5.txt | Set-Clipboard
```

**This copies entire file to clipboard. Paste into Word document.**

---

**Method 2: Copy from Notepad**

```powershell
notepad lab5.txt
```

**Then:** Ctrl+A (select all) → Ctrl+C (copy) → Paste into lab report

---

**Method 3: Select Output Manually**

```powershell
Get-Content lab5.txt
```

**In PowerShell window:** Highlight text with mouse → Right-click → Copy

---

**Formatting in Lab Report:**

```
In your Word document:

1. Create heading: "Deliverable #10 - lab5.txt Contents"

2. Paste the content

3. Format as code:
   - Select all pasted text
   - Font: Courier New or Consolas
   - Font size: 9 or 10 pt
   - Paragraph spacing: Single line spacing
   - Optional: Gray background or border

4. Verify readability
```

---

## **📋 FINAL DELIVERABLES CHECKLIST**

**Before submitting, verify you have ALL deliverables:**

### **Screenshots (% items):**

- [ ] **%1** - User list from Computer Management (includes User1a-d, User2a,c,d)
- [ ] **%2** - Management group members (User1a, User1b, User1c, User1d)
- [ ] **%3** - Management directory NTFS permissions (Security tab showing ACL)
- [ ] **%8** - Z: drive mapped to Accounting Share (File Explorer view for User2d)

### **Written Answers (# items):**

- [ ] **#4** - Share permissions on Management Share and reasoning
- [ ] **#5** - PowerShell command to copy ACL
- [ ] **#6** - PowerShell command to create SMB share
- [ ] **#7** - Why accounting user cannot access accounting share initially
- [ ] **#9** - Explanation of $env:HOMEPATH
- [ ] **#10** - Complete contents of lab5.txt file

---

## **🎓 COMPREHENSIVE KNOWLEDGE CHECK**

**Before completing this lab, you should be able to answer:**

**Conceptual Questions:**

1. What's the difference between a user and a security principal?
2. Why are groups more scalable than individual user permissions?
3. Explain the four layers of Windows security architecture.
4. What's the difference between inherited and explicit permissions?
5. Why does Deny always win over Allow?
6. What's the relationship between SIDs and usernames?
7. When should you delete vs. disable an account?
8. What's the difference between DACL and SACL?

**Technical Questions:**

9. What happens when share permission is "Change" and NTFS is "Read"?
10. Why doesn't renaming a user break their permissions?
11. What's stored in a user's access token?
12. Why are well-known SIDs always the same across systems?
13. What command shows all groups a user belongs to?
14. How do you check if inheritance is disabled on a folder?
15. What's the RID for the built-in Administrator account?

**Practical Questions:**

16. How would you give read-only access to a folder?
17. What steps to properly terminate an employee's account?
18. How to troubleshoot "Access Denied" on a network share?
19. What's the best way to grant 20 users access to 5 folders?
20. How to create 100 users efficiently?

---

## **🏆 WHAT YOU'VE MASTERED**

**Technical Skills:**

```
✓ Windows Security Administration
  ├─ User account lifecycle management
  ├─ Group-based access control
  ├─ NTFS permission configuration
  ├─ SMB share creation and management
  └─ Two-gate security model application

✓ PowerShell Automation
  ├─ User and group cmdlets
  ├─ ACL manipulation
  ├─ Environment variable usage
  ├─ Pipeline operations
  └─ Output redirection

✓ GUI Administration
  ├─ Computer Management console
  ├─ Advanced Security Settings
  ├─ Share permissions configuration
  └─ User/Group property management

✓ Troubleshooting Methodology
  ├─ Permission conflict diagnosis
  ├─ Token and SID analysis
  ├─ Access denial investigation
  └─ Systematic problem-solving
```

**Professional Practices:**

```
✓ Security Best Practices
  ├─ Least privilege principle
  ├─ Defense in depth strategy
  ├─ Separation of duties
  └─ Regular permission auditing

✓ Documentation
  ├─ System state capture
  ├─ Change logging
  ├─ Screenshot evidence
  └─ Command documentation

✓ Operational Skills
  ├─ User onboarding/offboarding
  ├─ Access request fulfillment
  ├─ Security incident response
  └─ Compliance maintenance
```

---

## **🚀 NEXT STEPS: CONTINUING YOUR LEARNING**

**To Deepen Your Knowledge:**

1. **Active Directory**
   - Domain-level user and group management
   - Group Policy for centralized configuration
   - Organizational Units (OUs)
   - Domain trusts and forests

2. **Advanced NTFS**
   - Auditing (SACL configuration)
   - Ownership and special permissions
   - Effective permissions calculation
   - File classification infrastructure

3. **PowerShell Mastery**
   - Advanced scripting techniques
   - Error handling (try/catch)
   - Functions and modules
   - Remote management (PS Remoting)

4. **Enterprise File Services**
   - DFS (Distributed File System)
   - File Server Resource Manager (FSRM)
   - BranchCache for remote offices
   - Work Folders for mobile access

5. **Security Hardening**
   - Principle of least privilege enforcement
   - Regular permission audits
   - Privileged Access Management (PAM)
   - Just-in-Time (JIT) administration

---

## **📚 RESOURCES FOR FURTHER STUDY**

**Official Microsoft Documentation:**
- Microsoft Learn: Windows Server Administration
- PowerShell Documentation (docs.microsoft.com/powershell)
- Security Best Practices Guide
- NTFS Permissions Reference

**Practice Environments:**
- Build a home lab with Hyper-V or VMware
- Set up Active Directory domain
- Practice with different scenarios
- Automate common tasks

**Certifications to Consider:**
- Microsoft MD-102 (Endpoint Administrator)
- Microsoft AZ-800 (Administering Windows Server Hybrid Core Infrastructure)
- CompTIA Security+ (Security fundamentals)
- Microsoft SC-900 (Security, Compliance, and Identity Fundamentals)

---

## **🎯 FINAL APHORISMS TO REMEMBER**

> *"Security is not a product, but a process. Permissions are not restrictions, but intentional grants of trust."*

> *"Groups are the grammar of permissions; users are merely the vocabulary."*

> *"Automate the repeatable, so you can focus on the exceptional."*

> *"See first, script later. Understand manually before automating."*

> *"In security, complexity is the enemy of safety. Simple, explicit, and well-documented permissions are the foundation of defensible systems."*

> *"Deny is a scalpel, not a hammer. Use it surgically, not systematically."*

> *"What gets documented gets maintained. What gets measured gets managed."*

> *"In security, what you don't test is what will fail in production. Always verify with least-privileged accounts."*

> *"The mark of expertise is not avoiding problems, but solving them elegantly."*

---

## **✅ LAB COMPLETION CONFIRMATION**

**Congratulations!** You have completed Lab 5: Users, Groups, Shares and Security.

**You have:**
- Created and managed local user accounts via GUI and PowerShell
- Implemented group-based access control
- Configured NTFS permissions with inheritance control
- Set up network shares with proper security
- Troubleshot permission conflicts using the two-gate model
- Applied security best practices including least privilege
- Documented system configuration comprehensively
- Developed professional IT administration skills

**Submission Checklist:**

Before submitting to Brightspace, verify:
- [ ] All 4 screenshots captured and labeled
- [ ] All 6 written answers complete and detailed
- [ ] Lab5.txt contents included in report
- [ ] Report follows format requirements
- [ ] All sections completed
- [ ] Screenshots are clear and readable
- [ ] Answers demonstrate understanding
- [ ] Document is proofread

---

**🎉 Excellent work! You've gained foundational skills in Windows security administration that will serve you throughout your IT career!**

---

*End of Lab 5 - Expert-Level Deep Dive Guide*