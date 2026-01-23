# **Innovation Proposal: The OS-SENTINEL Initiative**

## **Transforming Iron Horse Security from Service Provider to Technology Leader**

**Prepared By:** Redji Jean Baptiste  
**Role:** Network Engineer Intern  
**Status:** Project Proposal & Architecture Vision

### **The Intern’s Manifesto: A Call to Build, Not Just Learn**

Most internships are passive. They are designed for observation, shadowing, and the g
radual absorption of existing processes. Moreover, they often represent a significant
 cost center for businesses. The intern spends weeks or months learning the ropes, be
nefiting from the company's resources and mentorship, but rarely delivering a tangibl
e return on that investment during their tenure. In today's economic environment, whe
re budgets are constrained and the pressure is on to create leaner, more efficient te
ams rather than simply grow headcount, justifying the cost of a traditional internshi
p is increasingly difficult.  
This proposal is different. I am not looking for a traditional internship where I jus
t observe how things are currently done. I don't *just* want to learn about existing 
processes; I also want to actively contribute by building innovative solutions that r
edefine how things *should* be done. I am proposing a strategic partnership where we 
collaborate to create new value, rather than just maintaining the status quo.  
I stand at the intersection of two worlds: I am a Network Engineering student with de
ep architectural knowledge of network configuration, information technology infrastru
cture, and tools; but I am also a seasoned security professional who has operated leg
acy systems daily for a 4-star Hotel in downtown Toronto as well as major Casino off 
the 401 highway in Canada's economic capital. I have operated legacy systems in resid
ential sites, commercial sites, government buildings; I have worked contract and in-h
ouse security and worked in partnership with several other security companies in orde
r to protect our clients and their assets.  
I have witnessed firsthand the friction, the slowness to adapt, the wasted budget, th
e apathy, and the glaring inefficiencies inherent in these legacy systems. My goal is
 to drive an innovative change that will not only revolutionize the operations of sec
urity teams here in our capital and across Canada but also empower these firms to est
ablish a scalable base infrastructure. This foundation will enable them to export the
ir expertise to international partners and scale globally, turning local operational 
excellence into a massive global advantage.  
The video surveillance industry is currently defined by a restrictive, rent-seeking b
usiness model that is eroding the margins of service providers like Iron Horse. We ar
e forced into proprietary hardware lock-ins, hit with exorbitant per-camera licensing
 fees (often $150–$400 annually), and find innovative AI features gated behind expens
ive "premium" tiers.   
**My proposal is simple:** Over the next four months, I will build the Open Source Se
ntinel (**OS-SENTINEL**) and the surrounding **Open Defender Ecosystem**—an enterpris
e-grade, edge-first security platform that leverages open-source technology to delive
r superior analytics at a fraction of the cost. This is not just a technical project;
 it is a business transformation strategy to shift our model from low-margin labor to
 high-margin technology services.

### **The Strategic Bottleneck: Why We Must Pivot**

Before detailing the solution, we must confront the reality of the current landscape.
 Traditional security companies face a "Commoditization Trap." Mobile patrols and gua
rd services are becoming commodities competed on price alone. Meanwhile, our technolo
gy offerings are hampered by six critical issues:

1. **The Licensing Tax:** Every time we expand a client’s camera network using Genete
c, Milestone, or Verkada, we pay a tax. We do not own the infrastructure; we rent it.
 This artificial cost floor prevents us from offering competitive pricing to SMEs and
 households without destroying our margins.  
2. **Vendor Lock-In:** We are beholden to supply chains we cannot control and feature
 roadmaps that do not prioritize our needs. If a vendor raises prices or discontinues
 a product, our clients feel the pain, and we take the blame. This restriction extend
s to maintenance and upgrades, forcing us into a cycle of planned obsolescence where 
we must buy new proprietary hardware just to keep the system running or to access bas
ic updates.  
   * **Commercial Example:** A retail chain with 50 locations wants to upgrade their 
security cameras to include AI-powered shoplifting detection. They currently use a pr
oprietary system from Vendor X. Vendor X requires them to purchase *their specific* A
I-enabled cameras at a premium price per unit, plus an expensive annual software lice
nse per camera to enable the AI features. The retail chain cannot simply buy cheaper,
 compatible cameras from another manufacturer or use open-source AI software with the
ir existing cameras because Vendor X's system is closed and only works with their own
 hardware and software. This forces the retailer into a costly upgrade cycle dictated
 by Vendor X.  
3. **The "Dumb" Camera Problem:** Most deployed cameras are passive recording devices
. They generate petabytes of data but zero insight. To get intelligence, we are force
d to buy expensive add-on modules that further degrade profitability.  
   * **Commercial Example:** A large office building has hundreds of security cameras
 recording 24/7. A theft occurs in the parking garage. Security personnel have to man
ually review hours of footage from multiple cameras to find the incident because the 
cameras only record video and don't "understand" what they are seeing. They can't sea
rch for "red car leaving between 2 PM and 4 PM" or receive an alert when a person is 
loitering in a restricted area. The cameras are "dumb" recording devices, generating 
massive amounts of data without providing actionable intelligence.  
4. **Lack of Network Effects:** Current systems operate in silos. We are unable to pr
ovide a value-add based on network effects, where the system becomes smarter and more
 valuable as more users or sites are added. For example:  
   * **Commercial:** In a network of retail stores, if a shoplifter is identified at 
one location, legacy systems cannot instantly alert other stores in the network. If c
lients opt-in to data sharing OS-SENTINEL could enable this shared intelligence, prot
ecting the entire commercial ecosystem.  
   * **Residential Setting:** In a neighborhood watch scenario, if a suspicious vehic
le is flagged breaking into cars on one street, legacy systems trap that data locally
. An interconnected system could anonymize and share this threat data with neighbors,
 proactively alerting them to secure their property.  
5. **Government Integration & Data Sovereignty Issues:** There is a significant gap i
n domestic security technology and managed service providers for government integrati
on. Government agencies are often forced to rely on foreign, frequently American, tec
hnology and technical support for their critical sites and installations. This market
 is largely captured by foreign companies, funneling support contracts and procuremen
t dollars out of the country when they could go to local security companies for insta
llation, monitoring, support, and security services. This reliance presents a dual is
sue: missed economic opportunities for domestic firms and potential data protection r
isks, as the foreign technology provider could monetize, harvest, or share sensitive 
data in unwanted ways.

**The Vision:** We need to stop reselling other people's restrictive technology and s
tart deploying our own open architecture.

### **The Proposed Solution: OS-SENTINEL Architecture**

**OS-SENTINEL** will be the flagship of an integrated ecosystem designed on three non
-negotiable principles: **Zero Per-Camera Licensing**, **Privacy by Design**, and **R
eal-Time Actionability**.  
During my internship, I will architect and prototype this system, moving away from mo
nolithic NVRs toward a modular, containerized microservices architecture. Here is the
 technical blueprint I propose to build:

#### **1\. The Inference Engine: Unleashing Edge AI**

At the core, I will deploy a heavily customized implementation of **Frigate NVR**. In
stead of just recording based on pixel changes (motion), Frigate deeply integrates **
real-time object detection** using advanced AI models. It distinguishes between a per
son, a car, an animal instantly. This capability transforms a passive recording syste
m into an active intelligent agent. For instance, we can configure specific zones to 
trigger alerts only when a person enters a restricted area, while ignoring wildlife o
r passing traffic. This drastically reduces false alarms, saving monitoring center re
sources and ensuring that security personnel only respond to genuine threats. Further
more, Frigate supports features like **Birdseye view**, which stitches together feeds
 from multiple cameras to track an object's movement across a facility in real-time, 
and **24/7 continuous recording with event retention**, ensuring that critical footag
e is preserved while storage is optimized.  
**Why Frigate Was Chosen Over Other Open-Source Alternatives:** While other open-sour
ce NVRs like **ZoneMinder** or **Shinobi** exist, Frigate was chosen for specific rea
sons critical to this internship's goals:

10. **AI-First Design:** Unlike others where AI is a plugin or afterthought, Frigate 
was built from the ground up around real-time object detection. Its "zero-copy" pipel
ine is uniquely efficient at handling high-resolution streams for AI analysis without
 crushing the CPU.  
11. **Coral TPU Integration:** Frigate has first-class, optimized support for Google 
Coral TPUs. This allows for incredibly fast (10ms) and low-power inference, enabling 
advanced analytics on cheap hardware (like a Raspberry Pi or NUC) rather than requiri
ng expensive NVIDIA GPUs often needed by other platforms for similar performance.  
12. **Home Assistant Ecosystem:** Frigate integrates deeply with Home Assistant (and 
by extension, MQTT), making it the perfect "brain" for a wider smart security ecosyst
em (e.g., turning on lights when a person is detected), which aligns with the "OpenSe
cure Ecosystem" vision.

### **The Ecosystem: Beyond Surveillance**

While OS-SENTINEL is the foundation, my internship will deliver a suite of interconne
cted prototypes:

* **OS-PATROL:** Fleet tracking and automatic License Plate Recognition (LPR) to mode
rnize mobile patrols.  
* **OS-PACS:** Open-source access control that eliminates per-door licensing fees.  
* **OS-GUARDIAN:** A self-hosted body camera solution to manage evidence without expe
nsive cloud subscriptions.  
* **OS-CONCIERGE:** A visitor management kiosk to automate check-ins and reduce front
-desk labor.

### **The Business Case: Projected ROI & Revenue**

Why should Iron Horse Security sponsor this project? Because the economics of open-so
urce are undeniable.  
**Cost Comparison: 100-Camera Deployment (5-Year TCO)**

|   |  |  |  |
| ----- | ----- | ----- | ----- |
| **Cost Component** | **Proprietary VMS (Current State)** | **OS-SENTINEL (Target St
ate)** | **Strategic Implication** |
| **Cameras** | $80,000–$150,000 (vendor-locked / proprietary) | $20,000 (100 × $200 
ONVIF) | Hardware freedom eliminates forced margin capture by vendors. |
| **Servers (NVR / Compute)** | $40,000–$70,000 (over-provisioned CPU) | $24,000 | Ze
ro-transcode \+ tiered AI enables smaller, cheaper servers. |
| **Storage (on-prem)** | $40,000–$80,000 (bundled / inflated) | $25,000 | Predictabl
e commodity storage with lifecycle expansion. |
| **Network (switching, VLANs)** | $10,000–$15,000 | $10,000 | Neutral cost; standard
 enterprise networking. |
| **Software Licensing (VMS)** | $60,000–$120,000 ($200–$400/cam/yr) | $0 | License t
ax eliminated. Margin shifts to services. |
| **AI / Analytics Licensing** | Premium tier add-ons | Included | “Enterprise AI” be
comes table stakes, not upsell. |
| **Cloud Backups (offsite video \+ metadata)** | Often bundled / opaque | $18,000 | 
Optional, transparent DR instead of forced cloud lock-in. |
| **Compliance & Audit (retention, logs, exports)** | Premium compliance tiers | $12,
000 | Compliance becomes configuration, not SKU negotiation. |
| **Installation Labor** | $20,000+ | $20,000 | Real-world constant. |
| **Training** | $5,000+ | $5,000 | Faster onboarding via consistent UI \+ profiles. 
|
| **Electricity & Cooling** | $45,000+ | $31,536 | Lower CPU density \= real OpEx sav
ings. |
| **Internet / Uplink** | $36,000 | $36,000 | Mostly fixed; video stays local. |
| **Support Subscription (Revenue)** | Vendor contract | $36,000 ($1k/mo) | New recur
ring revenue replacing licenses. |
| **Maintenance / Ops Labor** | Hidden in contracts | $36,000 (10 hrs/mo) | Lower ops
 burden due to simpler stack. |

## 

## **New Revenue Streams: From License Reseller to Intelligence Provider**

By deploying OS-SENTINEL, we unlock recurring, high-margin revenue models that are **
structurally impossible** under proprietary, per-camera licensing regimes. Instead of
 monetizing access to basic functionality, Iron Horse can monetize **intelligence, au
tomation, compliance, and assurance**—turning security infrastructure into an ongoing
 value engine.  
These offerings are not theoretical add-ons; they are direct extensions of the OS-SEN
TINEL architecture described above.

### **Retail Intelligence & Loss Prevention**

For retail clients, OS-SENTINEL enables advanced analytics such as heat maps, dwell-t
ime analysis, queue length monitoring, and repeat-offender pattern detection. These i
nsights allow retailers to optimize store layouts, staffing levels, and loss preventi
on strategies using data that was previously locked away in raw video footage.  
Instead of selling “cameras,” we sell **operational insight**—positioning Iron Horse 
as a strategic partner rather than a commodity security vendor.

### ---

**Parking & Vehicle Enforcement Automation**

Through automated License Plate Recognition (LPR), OS-SENTINEL enables parking enforc
ement, hotlist matching, overstay detection, and access control automation for reside
ntial complexes, campuses, and commercial properties.  
This transforms mobile patrols and static cameras into **revenue-generating enforceme
nt tools**, enabling outcome-based pricing rather than per-device billing.

### ---

**Compliance, Safety & Risk Reporting**

In industrial, logistics, healthcare, and regulated environments, OS-SENTINEL can aut
omatically generate compliance reports using AI-based detection:

* OSHA PPE compliance (helmets, vests, goggles)  
* Restricted-area access monitoring  
* Incident timelines with evidentiary exports  
* Tamper-resistant audit logs and retention enforcement

Compliance shifts from a labor-intensive manual process to an **automated, recurring 
service**, creating sticky, defensible revenue while reducing client liability.

### ---

**Incident Management & Evidence Services**

OS-SENTINEL’s event-centric design allows us to offer managed incident services, incl
uding:

* Automated incident reconstruction (video \+ metadata)  
* Chain-of-custody evidence handling  
* Secure exports for legal or insurance use

This is particularly valuable for municipalities, education, healthcare, and corporat
e security teams—markets where proprietary vendors typically charge premium complianc
e tiers.

### ---

**Workflow Automation & Integrations**

By exposing events through open APIs, MQTT, and webhooks, OS-SENTINEL enables custom 
automation workflows:

* Alarm and dispatch integration  
* Gate, door, and lighting control  
* SOC and SIEM forwarding  
* Multi-site command center dashboards

This allows Iron Horse to sell **automation-as-a-service**, integrating security dire
ctly into client operations rather than isolating it as a standalone system.

### ---

**Managed Platform Services & Support Subscription**

Rather than relying on per-camera software licenses, Iron Horse can offer a recurring
 support subscription covering:

* Secure builds and patch management  
* Monitoring and health checks  
* AI model updates and tuning  
* Priority response and SLA-backed support

This replaces vendor maintenance contracts with **our own service layer**, keeping re
venue and control in-house.

### ---

**Cloud Backup, Resilience & Data Sovereignty**

For clients requiring disaster recovery, offsite retention, or regulatory redundancy,
 OS-SENTINEL supports encrypted cloud backups of video and metadata—hosted domestical
ly and under client control.  
This creates an optional, transparent upsell while reinforcing trust, privacy, and na
tional data sovereignty.

### **The Internship Roadmap: 4 Months to Market-Ready**

This internship is **not** a promise to bring the entire Open Defender ecosystem to f
ull commercial release within four months. Instead, it is a focused plan to deliver a
 **market-ready platform package**: working prototypes, deployment patterns, security
 hardening, documentation, pricing logic, and the operational materials required to p
ass third-party scrutiny and transition into paid pilots and staged commercialization
.  
By the end of the internship, the objective is that Iron Horse Security will be able 
to:

* **Deploy and validate OS-SENTINEL and companion prototypes** in both **company envi
ronments** and **real client pilot environments**  
* Produce an **audit-ready documentation package** (architecture diagrams, dataflow m
aps, threat model, hardening checklist)  
* Begin third-party **security review** planning (penetration test scope, configurati
on review scope, privacy controls)  
* Validate **economic viability** through a repeatable cost model, packaging, and pri
cing ladder  
* Draft and apply a client-ready **SLA** (uptime, response times, severity tiers, mai
ntenance windows)  
* Establish repeatable **support operations** (runbooks, escalation paths, monitoring
/alerting)  
* Begin **open-source contribution workflows** (upstream fixes, documentation, respon
sible disclosure discipline)  
* Launch **marketing enablement** without overpromising (demo scripts, ROI calculator
, pilot case studies, technical blog)

The roadmap below reflects this reality: a path to **production-grade readiness**, no
t an overnight ecosystem launch.

#### **Month 1: Foundation & Demo Kit Development**

**Objective:** Establish an enterprise-grade, secure lab environment and build the po
rtable sales demo kit that proves value instantly.  
**Week 1: Network Architecture & Secure Lab Setup**  
**Activity / Deliverables:**

* Design a secure network topology with VLAN segmentation (**Management, Cameras, Acc
ess Control, Users, Guest**)  
* Configure **pfSense** firewall with inter-VLAN rules, rate limiting, and isolation 
controls  
* Deploy **WireGuard VPN** for secure remote access  
* Set up monitoring/logging (**Prometheus \+ Grafana**) for infrastructure visibility
  
* Create comprehensive network documentation \+ IP addressing scheme  
* Validate network isolation and security controls end-to-end  
  **Deliverable:** Validated, isolated infrastructure pattern ready for client deploy
ments.

**Week 2: OS-SENTINEL Demo Kit v1 — Core Components**  
**Activity / Deliverables:**

* Procure hardware for the portable kit: **Google Coral TPU (\~$150), IP cameras (\~$
160), Raspberry Pi 4 (\~$55), PoE injector (\~$35)**  
* Install **Frigate NVR** (Coral TPU target) and baseline the build  
* Configure **YOLOv8 detection models** with initial detection profiles  
* Build the “datacenter in a briefcase” (Pelican case) with cable management \+ power
 distribution  
* Integrate components and perform baseline testing  
* Document hardware specifications, wiring, and pinouts  
  **Deliverable:** Portable surveillance kit ready for configuration and repeatable d
emos.

**Week 3: OS-SENTINEL Demo Kit v1 — Configuration & Testing**  
**Activity / Deliverables:**

* Configure three demo-ready detection profiles:  
  * **Retail:** people counting \+ heat maps  
  * **Construction/Industrial:** PPE detection  
  * **Office:** occupancy \+ security zones  
* Set up web interface \+ core API endpoints  
* Create alert rules and notification flows  
* Perform end-to-end testing with sample feeds  
* Write a **60-second quick-start guide** for instant setup  
* Build a sales presentation with live demo capability  
  **Deliverable:** Sales team can demonstrate live AI detection to prospects in **60 
seconds**.

**Week 4: OS-PATROL Demo Kit v1 — Fleet Tracking Foundation**  
**Activity / Deliverables:**

* Procure hardware: **Raspberry Pi \+ GPS module (\~$85), 4G modem (\~$50), dashcam (
\~$80), power converter (\~$20)**  
* Deploy **Traccar** on Docker with PostgreSQL  
* Implement GPS tracking \+ database integration scripts  
* Build web dashboard for real-time vehicle tracking  
* Integrate geofence-based alert triggering  
* Test deployment on a company vehicle  
* Produce technical documentation \+ API reference  
  **Deliverable:** Real-time fleet tracking dashboard operational on a test vehicle.

### ---

**Month 2: Demo Kits Completion & Prototype Development**

**Objective:** Expand the ecosystem to cover fleet LPR, access control, and body came
ra evidence—turning prototypes into sellable packages.  
**Week 5: OS-PATROL Demo Kit v1 — LPR & Advanced Features**  
**Activity / Deliverables:**

* Deploy **OpenALPR** for license plate recognition on dashcam feed  
* Build vehicle analytics dashboard (patterns \+ statistics)  
* Implement geofence alerts with SMS/email notifications  
* Create automated patrol report generation  
* Build a client portal for real-time vehicle tracking access  
* Document LPR accuracy calibration procedures  
* Field-test with **10+ vehicle routes**  
  **Deliverable:** Fleet \+ LPR solution demonstrated and field-tested.

**Week 6: OS-PACS Demo Kit v1 — Access Control Hardware Setup**  
**Activity / Deliverables:**

* Procure: **Raspberry Pi controllers (\~$55 each), Wiegand readers (\~$45 each), ele
ctronic locks (\~$80 each)**  
* Install **Leosac** on Pi controllers  
* Configure Wiegand reader integration and credential handling  
* Implement door control logic \+ fail-safe mechanisms  
* Integrate with lab doors for real testing  
* Create credential management UI  
* Build audit logging for all access events  
  **Deliverable:** Working access control system with full audit logging on lab doors
.

**Week 7: OS-PACS Demo Kit v1 — API & Mobile Credentials**  
**Activity / Deliverables:**

* Develop REST API for credential provisioning \+ access management  
* Implement mobile credentials using **NFC/QR code**  
* Build temporary credentials with expiration policies  
* Integrate with HR system APIs for automated provisioning/deprovisioning  
* Create dashboard for access policy configuration  
* Implement rapid issuance for visitors  
* Publish integration docs \+ examples  
  **Deliverable:** Enterprise-grade access control with modern credential methods.

**Week 8: OS-GUARDIAN Demo Kit v1 — Body Camera Infrastructure**  
**Activity / Deliverables:**

* Procure: Pi cameras \+ enclosures; stand up **MinIO storage**  
* Configure MinIO with redundancy \+ encryption  
* Implement capture \+ automatic upload pipeline  
* Build evidence management UI (tagging \+ search)  
* Implement retention schedules \+ backup policies  
* Build incident-based retrieval workflows  
* Test with pilot group of **3–5 staff** for 1 week  
  **Deliverable:** Self-hosted body camera evidence platform with unlimited storage c
apability.

### ---

**Month 3: Advanced Integration & Unified Platform**

**Objective:** Unify all prototypes into a single “pane of glass” so Iron Horse can s
ell a platform—not disconnected tools.  
**Week 9: OS-CONCIERGE Demo Kit v1 — Visitor Management Kiosk**  
**Activity / Deliverables:**

* Assemble kiosk hardware (budget-guided build)  
* Develop React visitor check-in interface  
* Integrate QR pre-registration workflows  
* Deploy facial recognition pre-screening with database  
* Connect OS-CONCIERGE → OS-PACS for automated badge issuance  
* Integrate corporate visitor lists  
* Test with **50+ visitors** over 1 week  
  **Deliverable:** 24/7 unmanned visitor management with security integration.

**Week 10: OpenSecure Hub v1 — Unified Management Platform**  
**Activity / Deliverables:**

* Set up a **Kubernetes cluster** for microservices orchestration  
* Deploy unified API gateway across all platforms  
* Create centralized dashboard for the entire ecosystem  
* Implement single sign-on (SSO) across components  
* Enable cross-system alerting \+ event correlation  
* Build basic workflows (e.g., visitor arrival → door unlock)  
* Establish unified logging \+ audit trail  
  **Deliverable:** All platforms integrated into a single management interface.

**Week 11: Advanced Analytics & AI Features**  
**Activity / Deliverables:**

* Deploy anomaly detection models across systems  
* Create predictive maintenance alerts based on system health  
* Build business intelligence dashboard with ROI metrics  
* Implement heat mapping across video \+ access \+ patrol data  
* Create automated reporting (daily/weekly/monthly)  
* Build custom alert rules configuration UI  
* Validate with 2-week data collection and accuracy testing  
  **Deliverable:** Enterprise-grade analytics producing actionable security insights.

**Week 12: Sales Demo Kit Integration & Preparation**  
**Activity / Deliverables:**

* Package all demo kits into portable cases with standard wiring  
* Create assembly checklist \+ quick-start guides  
* Build 30/60/90-minute demo scenarios  
* Create sales pitch deck \+ ROI calculator  
* Produce internal case studies from lab testing  
* Prepare competitive positioning materials  
* Train sales team on features \+ outcomes  
  **Deliverable:** Complete demo kit ready for immediate field deployment.

#### **Month 4: Validation, Audit Readiness & Launch Preparation**

**Objective:** Validate performance in real environments, harden security, formalize 
operations, and prepare Iron Horse to enter **paid pilots** and **third-party review*
* immediately after the internship.  
**Week 13: Pilot Deployments (Company \+ Client Environments)**  
**Activity:**

* Deploy OS-SENTINEL internally (office/warehouse) and at one friendly pilot client  
* Run controlled trials (5–10 cameras, 2–3 vehicles, 1–3 doors)  
* Collect performance metrics (latency, uptime, false alarms, storage/retention behav
ior)  
  **Deliverable:** Real-world validation results \+ repeatable pilot deployment check
list.

**Week 14: Security Hardening \+ Third-Party Audit Preparation**  
**Activity:**

* Internal security review (network isolation, secrets management, logging, least pri
vilege, update process)  
* Create audit package: threat model \+ dataflow diagrams \+ access controls \+ reten
tion policy templates  
* Define scope for third-party audits (pentest, architecture review, compliance mappi
ng)  
  **Deliverable:** Audit-ready documentation \+ remediation backlog.

**Week 15: SLA, Operations Handoff & Support Model**  
**Activity:**

* Draft SLA templates (uptime, response time, severity levels, maintenance windows, e
xclusions)  
* Produce runbooks (install, upgrade, rollback, incident response, backup/DR)  
* Stand up monitoring/alerting for production use  
* Define packaging and pricing for support subscription \+ analytics add-ons  
  **Deliverable:** SLA-ready operational playbook and support system.

**Week 16: Open-Source Contribution \+ Marketing Enablement (No Overpromise)**  
**Activity:**

* Begin upstream contributions (docs, bug fixes, integration guides)  
* Prepare marketing materials focused on pilots: demo scripts, ROI calculator, one-pa
gers, technical blog posts  
* Execute demos and build a pipeline for post-internship paid pilots  
  **Deliverable:** Market-ready materials, OSS contribution workflow, and a responsib
le commercialization plan.

### **Conclusion**

By the end of this internship, Iron Horse will not just have prototypes—we will have 
an **audit-ready, pilot-ready platform package** with SLAs, runbooks, pricing, and ma
rketing materials that allow us to commercialize responsibly immediately after third-
party validation.
