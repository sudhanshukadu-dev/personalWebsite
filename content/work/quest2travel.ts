// Quest2Travel case study copy. Source: Downloads/Quest2Travel_Case_Study_FINAL_v11.md,
// with the em dashes rewritten as commas, colons or full stops to match the site's voice.
// Lives at /work/expense-management-system, the link on the home page's Featured Work card.

export const quest2travel = {
  slug: "expense-management-system",
  meta: {
    title: "Expense Management System, Quest2Travel",
    description:
      "Redesigning Quest2Travel's legacy expense platform around a simple truth: expenses happen in motion, submissions happen at a desk.",
  },

  // Sticky nav; ids match each section's id below.
  sectionNav: {
    label: "Case study sections",
    menuLabel: "Current section",
    items: [
      { id: "summary", label: "Summary" },
      { id: "context", label: "Context", number: "01" },
      { id: "problem", label: "Problem", number: "02" },
      { id: "discovery", label: "Discovery", number: "03" },
      { id: "users", label: "Users", number: "04" },
      { id: "process", label: "Process", number: "05" },
      { id: "solution", label: "Solution", number: "06" },
      { id: "impact", label: "Impact", number: "07" },
      { id: "reflection", label: "Reflection", number: "08" },
    ],
  },

  hero: {
    backLink: { label: "All work", href: "/#work" },
    tag: "Case study",
    title: "Logging expenses shouldn't wait for a desk.",
    subtitle:
      "Redesigning Quest2Travel's legacy expense platform around a simple truth: expenses happen in motion, submissions happen at a desk.",
    facts: [
      { label: "Role", value: "Sole Product Designer" },
      { label: "Company", value: "Quest2Travel by MakeMyTrip" },
      { label: "Duration", value: "11–12 months" },
      { label: "Platform", value: "Responsive web, desktop-first" },
    ],
    // TODO: swap the skeleton screens for the real desktop and mobile expense-creation screens.
    showcase: {
      label: "Preview on",
      views: [
        {
          id: "desktop" as const,
          label: "Desktop",
          caption: "One screen. OCR-first. Designed to a sub-30-second capture target.",
          description:
            "Desktop expense creation: a receipt upload read by OCR, the expense fields, and the Tips panel beside them.",
        },
        {
          id: "mobile" as const,
          label: "Mobile",
          caption: "Capture it, build the report, submit it. All from a phone.",
          description: "Mobile expense capture: the camera framing a receipt, with the expense details sheet below.",
        },
      ],
    },
  },

  summary: {
    tag: "Summary",
    title: "The 90-second version",
    intro: "Everything that matters, before you decide to read on. The full case study follows.",
    problems: [
      {
        label: "The business problem",
        text: "Quest2Travel earns its revenue from travel fulfillment. The expense module isn't sold standalone: it's the bundled lock-in that keeps a client's entire travel spend booking in-platform. The module was weak, so not every travel client adopted it, and every client running expenses on a competitor's tool had a wedge in the account that a full T&E suite could widen to take the travel business too.",
      },
      {
        label: "The user problem",
        text: "The platform was report-first: a report had to exist before a single expense could be logged. On-the-go filing was architecturally impossible, there was no policy guidance at the point of entry, and the product felt nothing like the travel tool the same users already knew.",
      },
    ],
    did: {
      label: "What I did",
      lead: "Sole designer, 4 roles, 11–12 months, discovery to handoff.",
      items: [
        {
          title: "Shipped a hygiene pass on the legacy system first",
          text: "So live enterprise clients weren't stranded during the months-long rebuild.",
        },
        { title: "Standalone expense creation", text: "Log the moment it happens, compile the report later." },
        {
          title: "Borrowed the travel product's 3-step mental model",
          text: "For expense reports: near-zero learning curve, no training rollout.",
        },
        {
          title: "Split enforcement by context",
          text: "Save freely in motion, block at submission, because creation and submission happen in different environments.",
        },
        {
          title: "Turned a static OCR prompt into the Tips panel",
          text: "Category-aware policy guidance at the moment of entry. It came from a live client session, not a brief.",
        },
      ],
    },
    result: {
      label: "The result",
      figure: "4 → 1",
      figureSpoken: "From 4 to 1",
      caption: "steps to log an expense",
      line: "Designed to a sub-30-second capture target. Employee of the Quarter, twice.",
    },
    landed: {
      label: "Where it landed",
      items: [
        "Hygiene pass live in production",
        "Standalone creation and the Reports dashboard developed",
        "The rest handed off with complete flow diagrams, walked through in person",
        "Validated in prototype sessions with Adani, Toyota and Dr. Reddy's contacts",
        "Dashboard charts shipped as production-ready Recharts code",
      ],
    },
    measure: {
      label: "What I'd measure",
      note: "Defined, not yet collected: I left before launch metrics accrued.",
      items: [
        { metric: "Expense-module adoption", test: "The lock-in test" },
        { metric: "Expenses logged within 24h of spend", test: "The on-the-go test" },
        { metric: "First-submission rejection rate", test: "The Tips panel test" },
        { metric: "Time-to-reimbursement", test: "The pipeline test" },
      ],
    },
    change: {
      label: "What I'd change",
      text: "The Tips panel insight arrived in month 8, from a client session. It belonged in month 1, from research I should have owned.",
    },
  },

  context: {
    tag: "01 · Context",
    title: "A modern travel product, and an expense module that wasn't",
    intro:
      "Quest2Travel is one of India's largest corporate travel platforms, operating within the MakeMyTrip ecosystem and trusted for over 15 years by enterprises across 20+ industries.",
    stats: [
      { value: "500+", label: "Enterprise clients" },
      { value: "20M+", label: "Cumulative employee trips managed" },
      { value: "20+", label: "Industries served" },
      { value: "15+", label: "Years of industry trust" },
    ],
    clients: {
      label: "Trusted by",
      names: ["Sony", "Infosys", "PepsiCo", "HDFC Bank", "Air India", "Tata Motors", "Adani", "Toyota", "Dr. Reddy's"],
      more: "and hundreds more",
    },
    urgency: {
      label: "Why it was urgent",
      lead: "The travel booking product was modern, fast, and mobile-ready. The expense module attached to it was not.",
      paragraphs: [
        "A broken expense system doesn't just frustrate users. It stalls reimbursement cycles across thousands of employees per organisation.",
        "Quest2Travel earns the overwhelming majority of its revenue from travel fulfillment: commissions and fees on flights, hotels, and ground transport. The expense module isn't sold standalone. It's bundled into the T&E platform as the lock-in that keeps 100% of a client's travel spend booking through Quest2Travel. A weak expense module broke that lock. Not every enterprise that bought travel adopted expense, and clients running expenses on a standalone competitor had a wedge in the account, one any full T&E suite could widen to take the travel spend too.",
      ],
      punchline:
        "Fixing the expense experience wasn't about selling expense software. It was about defending the travel revenue, and completing the bundle sales could lead with.",
    },
    reality: {
      label: "Product reality",
      text: "Quest2Travel is B2B2C. Enterprises buy it, but the end users are employees who expect consumer-app speed. Enterprise compliance on one side, consumer-grade usability on the other: that dual pressure shaped every decision in this project.",
    },
    scope: {
      label: "My scope",
      text: "The only designer on the product. Four stakeholder workflows (Employee, Approver, Financial Auditor, and Admin) from discovery through complete development handoff.",
    },
  },

  problem: {
    tag: "02 · Problem",
    title: "The daily reality, and a platform making it worse",
    frustrationsTitle: "Manohar's four frustrations",
    frustrations: [
      { label: "Manual entry", quote: "Another trip. Another pile of receipts to log, one by one." },
      { label: "Lost receipts", quote: "I know I kept the hotel receipt right here. It's gone." },
      { label: "Unclear policies", quote: "Is this client meal reimbursable? The platform gives no hint." },
      { label: "Approval delays", quote: "Still waiting. Finance hasn't responded. Again." },
    ],
    issuesTitle: "The platform was making it worse",
    issues: [
      {
        issue: "Report-first architecture",
        impact: "A report had to exist before a single expense could be logged. Impossible in motion.",
      },
      { issue: "Zero mobile UX", impact: "Layouts broke on small screens, the exact environment travelers work in." },
      {
        issue: "No policy guidance",
        impact: "Employees guessed what was reimbursable and discovered rejections weeks later.",
      },
      { issue: "Disconnected from Travel", impact: "Same login, completely different product. Jarring at every crossing." },
    ],
    question: {
      label: "The design problem underneath the business case",
      text: "How do you rebuild an enterprise expense platform without breaking the mental models of employees already using the travel product?",
    },
  },

  discovery: {
    tag: "03 · Discovery",
    title: "The insight that changed the product came later",
    research: [
      {
        label: "What existing customers told us",
        text: "Alongside my PM, I participated in one-on-one calls with corporate points-of-contact across the enterprise client base: the people running travel and expense operations for their organisations. The pattern was consistent. Everything useful was buried under too many clicks, the UI felt dated, and the travel–expense disconnect made one product feel like two. Customers wanted the polish of Concur or Zoho, inside the platform they already used.",
      },
      {
        label: "Closing the gap informally",
        text: "The formal research was inherited and the project moved fast, so I closed the gap the way the constraints allowed. Quest2Travel's own employees used the platform for their business travel, so I asked colleagues, informally rather than in scripted sessions, where the product felt dated and where they struggled to find functionality. The same themes surfaced from the inside: buried actions, too many clicks, a UI that felt a generation old. Not a substitute for formal user research (I address that honestly in Reflection), but it meant the redesign wasn't built purely on second-hand accounts.",
      },
    ],
    platformsTitle: "What five platforms taught me, and why",
    platformLabels: { took: "What I took", why: "Why" },
    platforms: [
      {
        name: "Navan",
        took: "OCR-first approach, standalone expense creation",
        why: "The old system's biggest friction was report-first logging. Navan's standalone model made on-the-go filing structurally possible.",
      },
      {
        name: "SAP Concur",
        took: "Policy flagging logic",
        why: "It validated that enterprise users expected flagging. I avoided their navigation: critical actions buried under layers, the exact complaint our customers raised.",
      },
      {
        name: "Zoho Expense",
        took: "2-tier flagging, comment threads, audit log",
        why: "Flagging to surface violations before submission, not after. Threads to replace context-free email back-and-forth. An audit log so every action has a traceable record.",
      },
      {
        name: "Expensify",
        took: "OCR speed validation",
        why: "It confirmed OCR execution was achievable at the speed on-the-go filing demands.",
      },
      {
        name: "Happay",
        took: "India-specific approval complexity",
        why: "Then a separate platform within the MakeMyTrip group, serving a different corporate segment. The closest reference point for how Indian enterprises actually structure multi-level approvals, and confirmation that generic global patterns don't fit this market.",
      },
    ],
    finding: {
      label: "Central finding",
      text: "Every platform offered similar features. The real challenge was presenting them inside an ecosystem users already knew, something no competitor had solved, because none of them were embedded in a travel platform.",
    },
    insight: {
      label: "The insight that changed the product",
      lead: "The Tips panel didn't exist in any brief or benchmark. It came from a live prototype session with enterprise clients, where one concern surfaced independently from multiple contacts:",
      quote: "Our employees aren't submitting wrong expenses to cheat. They genuinely don't know what the policy allows.",
      after: "One sentence. New feature. More on it in the Solution.",
    },
  },

  users: {
    tag: "04 · Users",
    title: "Not a single-user app: four roles, one reimbursement pipeline",
    personaTitle: "The traveler at the center",
    persona: {
      initial: "M",
      name: "Manohar",
      meta: "37 · Corporate professional · Mumbai",
      summary: "Frequent business traveler. High travel frequency, limited time, zero patience for desktop-only tools.",
      basis:
        "A composite built from buyer-side customer calls, client conversations, and informal conversations with Quest2Travel colleagues who used the platform for their own business travel. Every source described the same core frustration: a desk-bound, document-heavy workflow for a job that happens in transit. The evidence base has limits, and I name them in Reflection rather than let a reader find them.",
      goals: {
        label: "Goals",
        items: [
          "Log expenses in motion, not at a desk days later",
          "Know reimbursable limits before spending, not after a rejection",
          "Track claim status after submission",
        ],
      },
      frustrations: {
        label: "Frustrations",
        items: [
          "Report-first flow made on-the-go filing impossible by design",
          "Policy silence meant guessing, and guessing meant rejections",
          "Zero visibility once a report was submitted",
        ],
      },
    },
    rolesTitle: "The ecosystem",
    roles: [
      { role: "Employee", need: "Log expenses in motion, request advances, submit reports in 3 steps" },
      { role: "Approver / Manager", need: "Action reports fast, with policy flags pre-highlighted" },
      { role: "Financial Auditor", need: "Validate compliance, manage aging claims, override when needed" },
      { role: "Travel / Finance Admin", need: "Configure policies, roles, branding, and approval chains per enterprise" },
    ],
  },

  process: {
    tag: "05 · Process",
    title: "The most important decision came from the ecosystem, not the competitors",
    phase0: {
      label: "Phase 0",
      title: "Stabilise the old before building the new",
      text: "A full redesign takes months, and live enterprise clients can't wait that long. So before the redesign work, I shipped a hygiene pass on the legacy system: targeted, low-risk usability fixes that could go live without structural or backend change, keeping the current experience workable while the real fix was built. It also forced me deep into every corner of the legacy product early, which paid off throughout the redesign. I wasn't designing against a system I'd only seen in screenshots.",
      // TODO: replace with the before/after hygiene pass screens.
      visual: "Hygiene pass: a legacy screen beside the same screen after the fixes",
    },
    v1: {
      label: "V1",
      title: "The wrong benchmark",
      text: "My first design was clean and well-executed: OCR-first, standalone creation, modelled closely on Navan. By expense-platform standards, it worked. My PM's feedback was precise:",
      quote: "It looks like a modern expense platform. But it doesn't feel like Quest2Travel.",
      quoteBy: "My PM, on V1",
      after: "That sentence forced the question the competitive analysis never could.",
      // TODO: replace with the V1 screenshot.
      visual: "V1: the Navan-style iteration that prompted this feedback",
    },
    pattern: {
      label: "The structural insight",
      title: "Design for the ecosystem, not the screen",
      text: "The travel platform had a 3-step mental model existing users already knew instinctively. I applied it directly to expense reports.",
      legend: { travel: "Travel request", expense: "Expense report" },
      steps: [
        { step: "Step 1", travel: "Travel Info", expense: "Report Info" },
        { step: "Step 2", travel: "Add Services", expense: "Add Expenses" },
        { step: "Step 3", travel: "Review & Submit", expense: "Review & Submit" },
      ],
      after:
        "Same pattern. Two products. Near-zero learning curve, with no training rollout needed across enterprise clients. This wasn't aesthetic consistency; it was cognitive consistency. The most important decision of the project, and it came from looking at the ecosystem, not the competitors.",
    },
    flagging: {
      label: "Corrected mid-flight",
      title: "The flagging architecture",
      text: "My initial proposal surfaced warnings during creation and critical issues only at submission. My PM's correction produced the final architecture: both tiers surface during expense creation, and the same deviations reappear at final review and in the report screens. The user is never surprised at submission.",
      tiers: { warning: "Warning", critical: "Critical" },
      moments: ["At creation", "At final review", "At submission"],
      versions: [
        {
          name: "My initial proposal",
          cells: [
            { warning: true, critical: false },
            { warning: false, critical: false, note: "Nothing surfaces" },
            { warning: false, critical: true, note: "First sight" },
          ],
        },
        {
          name: "Final, after my PM's correction",
          cells: [
            { warning: true, critical: true },
            { warning: true, critical: true },
            { warning: false, critical: false, note: "No surprises" },
          ],
        },
      ],
    },
    constraintsTitle: "Constraints as design direction",
    constraintLabels: { constraint: "Constraint", response: "Design response" },
    constraints: [
      {
        constraint: "OCR API cost per scan",
        response: "A Primary Receipt selector: one OCR scan per expense, with remaining files kept as supporting docs.",
      },
      {
        constraint: "No side panel in the layout system",
        response: "Moved all primary navigation into the top bar, leaving the full width of the screen to the working area.",
      },
      {
        constraint: "Travelers needed the flow to work on the go",
        response: "Designed desktop and mobile in parallel: a card-based UI with thumb-friendly CTAs on mobile screens.",
      },
      {
        constraint: "S3-hosted icons couldn't be colour-themed dynamically",
        response: "Made the Figma component library non-negotiable, not a nice-to-have.",
      },
      {
        constraint: "Dev team built on Tailwind CSS",
        response: "Structured the design system to mirror Tailwind's exact values and naming. Spacing, colour, and type tokens matched 1:1, so devs could read a Figma inspect panel and write the class from it.",
      },
    ],
    constraintsClose: "Every significant constraint produced a cleaner solution than the default approach would have.",
  },

  solution: {
    tag: "06 · Solution",
    title: "Travelers think in receipts, not reports",
    storyTitle: "After: the new experience",
    story: ["The meal happens", "The bill arrives", "Camera ready", "Logged in under 30 seconds"],
    standalone: {
      label: "01",
      title: "Standalone expense creation",
      text: "Expenses are logged the moment they happen, no report required. Reports are compiled later, at a desk, with time to review. On-the-go filing went from architecturally impossible to possible by design. Travelers think in receipts, not reports; the architecture finally agreed.",
      // TODO: replace the skeleton phone with the strongest 2–3 mobile frames.
      visual: "Mobile expense capture: the camera framing a receipt, with the expense details sheet below.",
    },
    responsive: {
      title: "Responsive where the work moves, desktop where the work sits",
      text: "An employee can capture an expense, build a report, and submit it from a phone, and an approver can review and action reports the same way. Auditors work across dense data tables and aging-claim queues; admins configure policies, roles, and approval chains where one wrong toggle affects an entire organisation. Both are high-stakes, low-frequency, wide-canvas tasks done at a desk, and compressing them onto a phone would add risk without adding value.",
      groups: [
        { label: "Fully responsive", roles: ["Employee", "Approver"] },
        { label: "Desktop-only by design", roles: ["Financial Auditor", "Admin"] },
      ],
    },
    reportFlow: {
      label: "02",
      title: "The 3-step report flow",
      text: "Matching the travel platform's mental model meant enterprise employees needed zero onboarding to submit their first report. Continuity is a feature.",
    },
    hardestCall: {
      label: "03",
      title: "The hardest call: save with critical issues",
      parts: [
        {
          label: "The tension",
          text: "Block saving to keep data clean, or allow saving to protect the on-the-go use case?",
        },
        {
          label: "The resolution",
          text: "Creation happens in motion: airports, taxis, between meetings. Submission happens at a desk, with time to act. The same enforcement applied to both moments destroys one of them. The right friction belongs where the user can actually respond to it.",
        },
      ],
      decisionLabel: "The decision",
      decisions: [
        { context: "In motion", rule: "Save freely during travel" },
        { context: "At a desk", rule: "Block report submission until every critical issue is resolved" },
      ],
    },
    flagging: {
      label: "04",
      title: "2-tier policy flagging",
      tiers: [
        {
          level: "critical" as const,
          name: "Critical",
          when: "Surfaced at creation, hard-blocked at submission.",
          text: "Over-limit amounts, missing documentation, out-of-policy categories: errors finance cannot process.",
        },
        {
          level: "warning" as const,
          name: "Warning",
          when: "Surfaced at creation, never blocked.",
          text: "Near-limit spends, receipts that appear altered, categories needing notes: judgment calls, not violations. The user is informed, and responsibility shifts to them.",
        },
      ],
      after: "Enforcement severity matches issue severity, and every flag appears at the moment it can be acted on.",
    },
    tips: {
      label: "05",
      title: "The Tips panel: from OCR prompt to policy intelligence",
      text: "Originally a static prompt nudging users to try OCR. The client-session insight transformed it into a dynamic, category-aware policy guide: the moment OCR identifies a receipt as “Client Meal”, the panel surfaces the reimbursable limit, exclusions, and documentation requirements, before the user hits save.",
      shift: [
        { label: "Before: reactive", text: "A rejection three weeks later" },
        { label: "After: proactive", text: "Guidance at the moment of decision" },
      ],
      // TODO: replace the skeleton laptop with the full expense form and live Tips panel.
      visual: "The full expense form, with the Tips panel updating beside the fields.",
    },
    roles: {
      title: "Designing for four roles, where roles are relative, not fixed",
      text: "A structural reality shaped this system: hierarchy is recursive. An employee can be an approver for the people under them, and every approver is an employee to the approver above them. So Employee and Approver don't get separate products. They share one dashboard, and approvers gain an additional My Approvals section. Capabilities layer onto a single interface instead of forking it, which is what keeps the system scalable as enterprises reshape their approval chains.",
      layers: {
        added: "My Approvals",
        addedNote: "Layered on for approvers",
        base: "One shared dashboard",
        baseItems: ["Log expense", "Submit report", "Check status"],
      },
      details: [
        {
          role: "Employee",
          text: "The most mobile-critical flow. Every primary action (log expense, submit report, check status) reachable within two taps of home. Coach marks onboard first-time users inline.",
        },
        {
          role: "Approver",
          text: "Same dashboard, plus a My Approvals section built for decisions under time pressure: pending reports surfaced immediately, policy flags pre-highlighted so approvers don't read every line, comments at the individual-expense level before returning a report.",
        },
        {
          role: "Financial Auditor",
          text: "Authority without administrative clutter: override approvals, skip levels, request re-approvals. Aging-claim prioritisation surfaces the oldest unresolved reports first for high-volume finance teams.",
        },
        {
          role: "Admin",
          text: "The hardest role, because admins configure what everyone else uses: policies, roles, approval chains, per-client branding, card-provider integrations. The design principle: every admin change must be immediately legible in the employee-facing UI, so configuration can be verified without waiting for breakage reports.",
        },
      ],
    },
    dashboard: {
      label: "Q2T Reports Corner",
      title: "The Accountant Dashboard",
      text: "A Personal tab for individual history and an Organisation tab for finance teams, both filterable across Flight, Hotel, Cab, Bus, Train, and Other.",
      question:
        "The Organisation view is built around one question: what does a finance lead need to answer within 30 seconds of opening it? How much are we spending, how many claims deviate from policy, and how much savings are we leaving on the table. Those three answers own the first row: Net Booking Value, Policy Deviations, and Savings vs. Missed Savings. Travel patterns, lead-time benchmarks, and compliance rates live behind tabs and filters.",
      tabs: ["Personal", "Organisation"],
      filters: ["Flight", "Hotel", "Cab", "Bus", "Train", "Other"],
      kpis: ["Net Booking Value", "Policy Deviations", "Savings vs. Missed Savings"],
    },
    charts: {
      label: "Beyond handoff",
      title: "Shipping the charts myself",
      text: "As a Computer Engineering graduate, I didn't stop at specs for the dashboard's data visualisations. I customised the Recharts configurations (colours, sizing, styling) to match the Figma designs exactly and handed working code to the dev team, eliminating the usual gap where complex visualisations get simplified during implementation.",
      highlight: "1:1 fidelity between design and shipped product.",
    },
  },

  impact: {
    tag: "07 · Impact",
    title: "What shipped, and what changed",
    shipped: {
      label: "What shipped",
      text: "The hygiene pass on the legacy system shipped to production early in the project: real fixes, live for real clients, while the redesign was underway. By the time I left, standalone expense creation was developed and the Reports dashboard was fully developed, with the remaining modules in active development against a complete, documented handoff. Every flow, edge case, and screen state was walked through with the dev team in person, supported by complete flow diagrams for each module.",
      statuses: [
        { item: "Hygiene pass on the legacy system", status: "Live", kind: "live" as const },
        { item: "Standalone expense creation", status: "Developed", kind: "developed" as const },
        { item: "Reports dashboard", status: "Developed", kind: "developed" as const },
        { item: "Remaining modules", status: "In development", kind: "progress" as const },
      ],
    },
    changedTitle: "What changed",
    changeLabels: { before: "Before", after: "After" },
    changes: [
      {
        before:
          "Logging took 4 sequential steps (create report, fill details, create expense, fill details), with desktop context required",
        afterHeadline: "4 steps → 1",
        afterHeadlineSpoken: "From 4 steps to 1.",
        after:
          "Standalone OCR capture designed to a sub-30-second target, the number we set for on-the-go entry, and hit consistently in live client demos",
      },
      { before: "On-the-go filing architecturally impossible", after: "Feasible by design via standalone creation" },
      {
        before: "Zero policy guidance, with violations discovered weeks later",
        after: "Category-specific limits surface in the Tips panel the moment OCR reads the receipt",
      },
      {
        before: "Policy flags appeared only at submission, too late to act",
        after: "Both tiers surface at creation and reappear at review. No surprises at submission",
      },
      { before: "Visualisation handoff via written specs", after: "1:1 fidelity via production-ready Recharts code" },
    ],
    outcomes: [
      {
        label: "Enterprise validation",
        text: "Adani, Toyota, and Dr. Reddy's contacts confirmed during prototype reviews that the redesign addressed their core compliance and usability concerns: the same clients who had flagged the legacy system as a blocker.",
      },
      {
        label: "Accessibility",
        text: "I contrast-checked the primary colours (CTAs, flag indicators, body text) against WCAG 2.1 AA and AAA thresholds and adjusted the palette where they fell short. It matters for an enterprise user base that skews senior in age. I also pushed for dark mode, though it never got past discussion.",
      },
      {
        label: "Strategically",
        text: "The redesign gave the sales team what they were missing: an expense module that could be sold alongside the travel product instead of apologised for. A direct answer to the lock-in gap that motivated the project.",
      },
    ],
    recognition: {
      label: "Recognition",
      title: "Employee of the Quarter, twice",
      text: "Awarded by the IT Head for cross-functional design leadership on the redesign.",
      polaroid: {
        src: "/images/experience/employee-of-the-quarter.jpg",
        alt: "Sudhanshu receiving the Employee of the Quarter certificate at Quest2Travel",
        caption: "Employee of the Quarter",
        width: 3120,
        height: 4160,
      },
    },
    testimonials: [
      {
        quote: "His handoff process is top-tier. It significantly reduced our development time.",
        name: "Shiv",
        role: "Sr. Software Engineer",
      },
      {
        quote: "He doesn't just hand over screens. He shares the logic and user thinking behind them.",
        name: "Suraj Jadhav",
        role: "React JS Developer",
      },
      {
        quote: "He collaborates well, is open to feedback, and consistently delivers on time.",
        name: "Faiz Kazi",
        role: "Frontend Developer",
      },
    ],
    measureTitle: "How I'd measure success",
    measureIntro:
      "I left before launch metrics could accrue, so here are the four numbers I designed toward, and would pull first. Defining them was part of the design work.",
    measures: [
      {
        metric: "Expense-module adoption",
        text: "Share of travel clients actively using expense. The direct test of the lock-in thesis: is the bundle finally complete?",
      },
      {
        metric: "% of expenses logged within 24h of spend",
        text: "The on-the-go signal. If capture happens same-day instead of end-of-trip, standalone creation is doing its job.",
      },
      {
        metric: "First-submission rejection rate",
        text: "The Tips panel and 2-tier flagging test. If guidance at the moment of entry works, fewer reports bounce back.",
      },
      {
        metric: "Time-to-reimbursement",
        text: "The full-pipeline test. If approvers and auditors receive clean, pre-flagged reports, cycle time falls end to end.",
      },
    ],
  },

  reflection: {
    tag: "08 · Reflection",
    title: "The Tips panel arrived in month 8. It belonged in month 1.",
    paragraphs: [
      "The Tips panel became one of the most impactful features in the redesign, and it was discovered in month 8, in a prototype session, not in week 1, in research.",
      "That timing is the specific thing I would change. Because I didn't own the research process from the start, a feature that fundamentally changed how employees understand reimbursement policy was retrofitted onto an existing form rather than built into the information architecture from the beginning. The panel works. Had the insight surfaced in month one, it would have shaped how the entire expense form was structured.",
      "The pace played a role. There was never a formal deadline, but the culture was ship-as-soon-as-possible, and I inherited the research rather than owning it. My informal conversations with colleagues who used the platform were my attempt to close that gap within the constraints: real input, honestly gathered, but not the structured research this product deserved. Given more room, I would have pushed harder for it.",
    ],
    again: {
      label: "If I ran this project again",
      text: "I'd conduct user interviews personally before any design work begins, with actual traveling employees, not only the buyers who administer their expenses. And I'd include the support team, the people with the most unfiltered picture of where a product fails its users. That one conversation might have surfaced the policy-awareness problem before a single frame existed.",
    },
    lessonsTitle: "What this project taught me",
    lessons: [
      {
        title: "Design for the ecosystem, not just the screen.",
        text: "The most important decision came from the product users already knew, not from any competitor.",
      },
      {
        title: "Context determines where constraints belong.",
        text: "The same enforcement at the wrong moment destroys a use case; the right friction at the right moment is the actual design problem.",
      },
      {
        title: "The best insights come from being in the room.",
        text: "Build the sessions that create those moments. Don't wait for them.",
      },
      {
        title: "Constraints are design direction in disguise.",
        text: "Every hard limit in this project produced a cleaner solution than the default would have.",
      },
    ],
    signoff: "Sudhanshu Kadu · Sole Product Designer · Quest2Travel by MakeMyTrip · 11–12 months",
  },
};
