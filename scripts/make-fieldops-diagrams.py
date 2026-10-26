"""Generate the Field Operations Platform diagrams into public/assets/diagrams/.

Run:  python scripts/make-fieldops-diagrams.py

Plain SVG, white background, no external fonts or scripts. The style (palette, rounded boxes, dashed
zones, arrowheads) matches the homelab and IT-stack diagrams. Facts come from the FieldOps repo docs and
code; addresses, hostnames, account ids and credentials are deliberately not drawn.
"""
import os
from xml.sax.saxutils import escape

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'assets', 'diagrams')
PALETTE = {  # fill, stroke
    "home": ("#eef6ff", "#2b6cb0"), "pi": ("#e8f7ee", "#2f855a"), "winb": ("#fff5e6", "#c05621"),
    "vm": ("#fdf2f8", "#b83280"), "cloud": ("#f3f0ff", "#6b46c1"), "cf": ("#fff7e0", "#b7791f"),
    "ext": ("#f7f7f7", "#718096"), "key": ("#fff0f0", "#c53030"), "ok": ("#ffffff", "#4a5568"),
}


class Svg:
    def __init__(self, w, h, title, desc):
        self.w, self.h, self.parts, self.title, self.desc = w, h, [], title, desc

    def box(self, x, y, w, h, label, kind="ok", sub=None):
        f, s = PALETTE[kind]
        self.parts.append('<rect x="%d" y="%d" width="%d" height="%d" rx="8" fill="%s" stroke="%s" stroke-width="1.6"/>' % (x, y, w, h, f, s))
        lines = label.split("\n")
        if sub:
            for i, l in enumerate(lines):
                self.parts.append('<text x="%d" y="%d" text-anchor="middle" font-size="13" font-weight="700" fill="#1a202c">%s</text>' % (x + w / 2, y + 22 + i * 16, escape(l)))
            for i, l in enumerate(sub.split("\n")):
                self.parts.append('<text x="%d" y="%d" text-anchor="middle" font-size="11" fill="#4a5568">%s</text>' % (x + w / 2, y + 22 + len(lines) * 16 + i * 14, escape(l)))
        else:
            top = y + h / 2 + 4 - (len(lines) - 1) * 8
            for i, l in enumerate(lines):
                self.parts.append('<text x="%d" y="%d" text-anchor="middle" font-size="13" font-weight="700" fill="#1a202c">%s</text>' % (x + w / 2, top + i * 16, escape(l)))

    def zone(self, x, y, w, h, label, kind="ext"):
        f, s = PALETTE[kind]
        self.parts.append('<rect x="%d" y="%d" width="%d" height="%d" rx="12" fill="%s" fill-opacity="0.45" stroke="%s" stroke-width="1.2" stroke-dasharray="5 4"/>' % (x, y, w, h, f, s))
        self.parts.append('<text x="%d" y="%d" font-size="12" font-weight="700" fill="%s">%s</text>' % (x + 12, y + 18, s, escape(label)))

    def arrow(self, x1, y1, x2, y2, label=None, color="#4a5568", dash=False, lx=0, ly=0):
        d = ' stroke-dasharray="6 4"' if dash else ""
        self.parts.append('<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="%s" stroke-width="1.8"%s marker-end="url(#a)"/>' % (x1, y1, x2, y2, color, d))
        if label:
            self.parts.append('<text x="%d" y="%d" text-anchor="middle" font-size="11" fill="%s" paint-order="stroke" stroke="#fff" stroke-width="3">%s</text>'
                              % ((x1 + x2) / 2 + lx, (y1 + y2) / 2 - 5 + ly, color, escape(label)))

    def seg(self, x1, y1, x2, y2, color="#718096"):
        self.parts.append('<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="%s" stroke-width="1.8" stroke-dasharray="6 4"/>' % (x1, y1, x2, y2, color))

    def text(self, x, y, s, size=12, anchor="start", color="#1a202c", weight="400"):
        self.parts.append('<text x="%d" y="%d" text-anchor="%s" font-size="%d" font-weight="%s" fill="%s">%s</text>' % (x, y, anchor, size, weight, color, escape(s)))

    def save(self, name):
        head = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d" font-family="Segoe UI, Helvetica, Arial, sans-serif" role="img" aria-labelledby="t d">'
                '<title id="t">%s</title><desc id="d">%s</desc>'
                '<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#4a5568"/></marker></defs>'
                '<rect width="100%%" height="100%%" fill="#ffffff"/>' % (self.w, self.h, self.w, self.h, escape(self.title), escape(self.desc)))
        path = os.path.join(OUT, name)
        os.makedirs(OUT, exist_ok=True)
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(head + "\n" + "\n".join(self.parts) + "\n</svg>\n")
        print("wrote", name)


# --------------------------------------------------------------------------------------------------------------
# 1. System architecture
# --------------------------------------------------------------------------------------------------------------
s = Svg(1200, 660, "Field operations platform architecture",
        "Managers use a web dashboard and crews use WhatsApp. Both reach one TypeScript domain layer on a cloud VM, through a REST facade and an MCP server, backed by PostgreSQL.")
s.text(24, 32, "Field operations platform: system architecture", 20, weight="700")

s.zone(20, 60, 200, 580, "People", "home")
s.box(40, 130, 160, 74, "Managers", "home", "web dashboard\nin a browser")
s.zone(250, 60, 170, 580, "Edge", "cf")
s.box(265, 130, 140, 74, "Cloudflare", "cf", "DNS proxy\nfull-strict TLS")

s.zone(450, 60, 470, 580, "Application server (small cloud VM)", "vm")
s.box(480, 100, 410, 62, "Caddy", "vm", "reverse proxy · origin certificate · serves the dashboard files")
s.box(480, 200, 190, 80, "REST facade", "vm", "login rate limit · lockout\nTOTP multi-factor for admins")
s.box(700, 200, 190, 80, "MCP server", "vm", "typed tools · capability check\nconfirm-before-execute")
s.box(480, 330, 410, 88, "Domain layer (TypeScript)", "vm", "crew · jobs · sites · equipment · inventory\ntimeclock · procurement · payroll · alerts")
s.box(480, 470, 190, 76, "Sovereignty policy", "ext", "which functions may call\nexternal services")
s.box(700, 470, 190, 76, "PostgreSQL", "winb", "container · ordered migrations")

s.zone(950, 60, 230, 580, "Outside services", "cloud")
s.box(970, 100, 190, 60, "Crews", "home", "WhatsApp on their phones")
s.box(970, 210, 190, 76, "WhatsApp gateway", "cloud", "one service credential,\nlimited to tier 2")
s.box(970, 340, 190, 66, "LLM providers", "ext", "external · chosen by policy\nwith fallbacks")
s.box(970, 470, 190, 76, "Object Storage", "cloud", "nightly database backups")

s.arrow(200, 167, 265, 167, "HTTPS", lx=0)
s.arrow(405, 167, 480, 140, None)
s.arrow(575, 162, 575, 200)
s.arrow(575, 280, 575, 330)
s.arrow(795, 280, 795, 330)
s.arrow(795, 418, 795, 470)
s.arrow(670, 508, 700, 508, "policy table", ly=-22)
s.arrow(1065, 160, 1065, 210, "messages")
s.arrow(970, 248, 890, 248, "tool calls (HTTPS)", ly=-8)
s.arrow(1065, 286, 1065, 340, "prompts")
s.arrow(890, 508, 970, 508, "nightly dump")
s.text(24, 656, "Simplified. The dashboard is an open-source construction-ERP frontend, pruned to the modules the business uses.", 11, color="#4a5568")
s.save("fieldops-architecture.svg")

# --------------------------------------------------------------------------------------------------------------
# 2. Agent request flow: capability check and approval
# --------------------------------------------------------------------------------------------------------------
s = Svg(1200, 620, "How a WhatsApp request is checked and approved",
        "A crew message becomes a tool call. The MCP server verifies the caller's signed capability grant against the tool's tier. Reads answer directly; gated writes wait for a manager's approval.")
s.text(24, 32, "WhatsApp agent: how a request is checked, approved and recorded", 20, weight="700")

s.box(30, 80, 190, 76, "1  Crew sends a message", "home", "e.g. check in, log a receipt,\nask for tomorrow's jobs")
s.box(260, 80, 200, 76, "2  Gateway + LLM pick a tool", "cloud", "the agent looks up the sender\nby phone number with a tool")
s.box(500, 80, 210, 76, "3  Gateway calls the MCP server", "cloud", "service credential goes in a\nheader; the LLM never sees it")
s.box(750, 80, 190, 76, "4  Capability check", "cf", "signed grant verified:\nis tool tier <= credential tier?")
s.arrow(220, 118, 260, 118)
s.arrow(460, 118, 500, 118)
s.arrow(710, 118, 750, 118)

s.box(750, 210, 190, 70, "Denied", "key", "e.g. a tier-3 tool called\nwith the tier-2 credential")
s.arrow(845, 156, 845, 210, "not allowed", color="#c53030", lx=0)

s.box(990, 60, 180, 64, "5a  Read or simple tool", "pi", "queries the domain layer;\nthe answer is shown in chat")
s.box(990, 165, 180, 76, "5b  Gated write", "pi", "creates a pending\nconfirmation: awaiting review")
s.arrow(940, 105, 990, 92, "allowed", lx=0, ly=-4)
s.arrow(940, 130, 990, 203, None)

s.box(990, 290, 180, 64, "6  Manager reviews", "home", "approves or rejects\nin the dashboard")
s.arrow(1080, 241, 1080, 290)
s.box(750, 380, 190, 70, "Rejected", "key", "nothing changes;\na note is recorded")
s.arrow(990, 335, 940, 405, "reject", color="#c53030")
s.box(750, 290, 190, 64, "7  Approved: executor runs", "pi", "the domain layer commits\nthe change")
s.arrow(990, 322, 940, 322, "approve")
s.box(510, 290, 190, 64, "8  Outcome recorded", "ok", "history keeps who asked,\nwho approved, and the result")
s.arrow(750, 322, 700, 322)

s.zone(20, 480, 1160, 120, "Capability tiers (every tool declares one)", "ext")
s.box(40, 510, 255, 70, "Tier 0", "ok", "read-only lookups")
s.box(315, 510, 255, 70, "Tier 2", "pi", "crew submissions: time clock, receipts,\nmileage, check-outs (gateway ceiling)")
s.box(590, 510, 255, 70, "Tier 3", "cf", "commits money, schedule\nor inventory")
s.box(865, 510, 295, 70, "Tier 4", "key", "admin and financial actions\n(not reachable by the gateway)")
s.text(24, 616, "Simplified. Grants are signed credentials; revoking a grant is the safety valve if a credential is exposed.", 11, color="#4a5568")
s.save("fieldops-agent-flow.svg")

# --------------------------------------------------------------------------------------------------------------
# 3. Deploy, backup and monitoring
# --------------------------------------------------------------------------------------------------------------
s = Svg(1200, 680, "Deploy, backup and monitoring for the field operations platform",
        "Builds happen on a laptop, code is pulled on the server, and static files are copied across. A nightly timer dumps the database to object storage; a heartbeat and an external check watch uptime.")
s.text(24, 32, "Deploy, backup and monitoring", 20, weight="700")

s.zone(20, 60, 1160, 200, "Deploy", "home")
s.box(40, 100, 230, 80, "Build on my machine", "home", "backend compile + frontend build\n(too heavy for the small server)")
s.box(330, 100, 190, 80, "GitHub", "ext", "app repo + frontend fork")
s.box(590, 100, 250, 80, "Server: update the code", "vm", "fetch · build · migrate\nsync policy · restart the service")
s.box(900, 100, 260, 80, "Frontend files", "vm", "copied across; the current\ncopy is backed up first")
s.arrow(270, 140, 330, 140, "push")
s.arrow(520, 140, 590, 140, "pull")
s.seg(155, 180, 155, 236)
s.seg(155, 236, 1030, 236)
s.arrow(1030, 236, 1030, 182, None, color="#718096", dash=True)
s.text(600, 230, "static files copied directly from my machine", 11, anchor="middle", color="#718096")

s.zone(20, 280, 1160, 170, "Backup", "winb")
s.box(40, 320, 230, 80, "Timer (nightly)", "ok", "a scheduled system service")
s.box(330, 320, 260, 80, "Database dump", "winb", "pg_dump inside the database\ncontainer, compressed")
s.box(650, 320, 250, 80, "Object Storage bucket", "cloud", "upload uses the VM's own identity,\nso no key is stored")
s.box(940, 320, 220, 80, "Restore test", "pi", "restored into a throwaway\ndatabase and checked")
s.arrow(270, 360, 330, 360)
s.arrow(590, 360, 650, 360)
s.arrow(900, 360, 940, 360, "periodic")
s.text(40, 432, "The backup job reports success or failure to the platform's health tools when it exits.", 11, color="#4a5568")

s.zone(20, 470, 1160, 190, "Monitoring", "pi")
s.box(40, 510, 250, 80, "Heartbeat (every 15 min)", "pi", "dashboard reachable · outbound\nconnectivity · disk space")
s.box(350, 510, 250, 80, "Health reports", "vm", "sent to the platform through\nits own MCP health tools")
s.box(660, 510, 220, 80, "Alerts", "cf", "raised in the dashboard\nwhen a check fails")
s.box(940, 510, 220, 80, "External check (5 min)", "cloud", "a separate cloud VM probes\nthe public endpoints")
s.arrow(290, 550, 350, 550)
s.arrow(600, 550, 660, 550)
s.text(940, 614, "Needed because the heartbeat runs on the", 11, color="#4a5568")
s.text(940, 628, "server it is checking.", 11, color="#4a5568")
s.save("fieldops-deploy-ops.svg")
