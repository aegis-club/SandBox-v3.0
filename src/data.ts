export const TBA = "To be announced";

export const NAV = [
  { href: "#territories", label: "Territories" },
  { href: "#journey", label: "Journey" },
  { href: "#venue", label: "Venue" },
  { href: "#faq", label: "FAQ" },
  { href: "#sponsors", label: "Sponsors" },
];

export const LOOP = [
  { word: "Build", text: "Ship a working prototype from zero." },
  { word: "Break", text: "Attack your own build before the judges do." },
  { word: "Experiment", text: "Try the idea nobody else will." },
  { word: "Repeat", text: "Until the clock runs out." },
];

export const PILLARS = [
  { name: "Collaborate", text: "Bring a team or find one here. Team finder matches solo entrants by skill and track." },
  { name: "Explore", text: "Choose one of eight security territories, from incident response to Web3." },
  { name: "Create", text: "Ship a working prototype in 24 hours, then present it to mentors and judges." },
];

export const ZONES = [
  { name: "Threat detection and incident response", short: "Threat detection", body: "Spot intrusions early, triage the alerts that matter and coordinate the response before damage spreads.", tags: ["SIEM and log analytics", "Anomaly detection", "Automated playbooks"] },
  { name: "AI security copilot", short: "AI security copilot", body: "Build assistants that help analysts investigate faster, without leaking what they see.", tags: ["Alert summaries", "Prompt-injection guardrails", "Analyst-in-the-loop review"] },
  { name: "Application security", short: "Application security", body: "Find and fix flaws before attackers do, from the pull request to production.", tags: ["Static and dynamic analysis", "Dependency risk", "Secure defaults"] },
  { name: "Web3 security", short: "Web3 security", body: "Harden smart contracts, wallets and the bridges between chains.", tags: ["Contract auditing", "Transaction monitoring", "Wallet safety"] },
  { name: "Data privacy and protection", short: "Data privacy", body: "Keep personal data minimal, encrypted and accountable, from collection to deletion.", tags: ["Consent and minimisation", "Encryption and key management", "Anonymisation"] },
  { name: "Gamification in cybersecurity", short: "Gamification", body: "Teach security through play, with challenges, simulations and capture-the-flag rounds.", tags: ["CTF platforms", "Phishing simulations", "Awareness games"] },
  { name: "Dark web monitoring", short: "Dark web monitoring", body: "Track leaked credentials and threat chatter before they turn into incidents.", tags: ["Leak detection", "Threat intelligence feeds", "Ethical crawling"] },
  { name: "Open innovation", short: "Open innovation", body: "A security idea that fits no other zone belongs here.", tags: ["Hardware and IoT", "Policy tooling", "Anything defensible"] },
];

export const JOURNEY = [
  {
    leg: "Before",
    range: "01 to 03",
    inside: false,
    phases: [
      { n: "01", name: "Registration opens", code: "Open the gates" },
      { n: "02", name: "Registration closes", code: "Seal the perimeter" },
      { n: "03", name: "Participant selection", code: "Clearance check" },
    ],
  },
  {
    leg: "Inside the sandbox",
    range: "24 hours",
    inside: true,
    phases: [
      { n: "04", name: "Hackathon begins", code: "Hour zero" },
      { n: "05", name: "Development sessions", code: "Deep build" },
      { n: "06", name: "Mentoring rounds", code: "Signal boost" },
      { n: "07", name: "Judging", code: "Stress test" },
    ],
  },
  {
    leg: "After",
    range: "08 to 09",
    inside: false,
    phases: [
      { n: "08", name: "Results", code: "Decrypt" },
      { n: "09", name: "Closing ceremony", code: "Exit the sandbox" },
    ],
  },
];

export const RULES = [
  { name: "Respect everyone", text: "No harassment, in person or online. Treat every person on the floor as a teammate." },
  { name: "Hack responsibly", text: "Attack only the targets you are given. Anything outside the sandbox stays off limits." },
  { name: "Protect privacy", text: "Use test data. Never collect, share or publish anyone's personal information." },
  { name: "Speak up", text: "If something feels wrong, tell an organiser. Reports stay confidential." },
];

export const FAQ: { q: string; a: string | null }[] = [
  { q: "What is SandBox?", a: "SandBox is a 24-hour cybersecurity hackathon organised by Aegis at Dayananda Sagar College of Engineering, Bengaluru. Version 3.0 is the third edition." },
  { q: "Who can participate?", a: "Students who design, build or break software can apply. Full eligibility rules are announced with registration." },
  { q: "How do I register?", a: "Fill in the registration form on this page once it opens. The organisers announce the selected teams before hour zero." },
  { q: "Is the hackathon in person?", a: "Yes. SandBox runs on campus at Dayananda Sagar College of Engineering, Bengaluru." },
  { q: "What is the maximum team size?", a: null },
  { q: "Is there a registration fee?", a: null },
  { q: "Can I participate without a team?", a: "Yes. Team finder opens with registration and matches solo entrants by skill and track. Your phone number and email stay private." },
  { q: "What should I bring?", a: "Bring a laptop, its charger and your college ID. Pack anything else you need for 24 hours on campus." },
  { q: "Are food, accommodation and Wi-Fi provided?", a: null },
  { q: "How are teams selected?", a: null },
  { q: "How do I report an incident?", a: "Tell an organiser on the floor. Every report goes to the organising team and stays confidential. The incident contact is announced with registration." },
];

export const TIERS = [
  { name: "Title", text: "Names the edition and opens the ceremony.", slots: 1 },
  { name: "Platinum", text: "Headline partners with a territory of their own.", slots: 2 },
  { name: "Gold", text: "Partners who equip builders with tools and credits.", slots: 3 },
  { name: "Community", text: "Clubs and communities who bring people and mentors.", slots: 4 },
];

export const TAPE = [
  "SandBox v3.0",
  "Containment breach authorised",
  "24h live ops",
  "Bengaluru, DSCE",
  "Beyond the boundary",
  "Build",
  "Break",
  "Experiment",
  "Repeat",
];

export const MLH = "https://mlh.io/code-of-conduct";
export const DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Dayananda%20Sagar%20College%20of%20Engineering%2C%20Bengaluru";
