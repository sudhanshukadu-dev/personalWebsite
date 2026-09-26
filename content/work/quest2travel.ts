import type { CaseStudy } from "@/components/work/CaseStudyPage";

// Quest2Travel case study copy. Source: Downloads/Quest2Travel_Case_Study_Condensed (1).md,
// the condensed rewrite, followed marker for marker: CALLOUT becomes a statement, VISUAL and
// VIDEO become labelled image slots, STAT ROW becomes stats, FLOW DIAGRAM becomes the two
// flows drawn as one diagram. Lives at /work/expense-management-system, the link on the
// home page's Featured Work card. It keeps the site's blue, since this project is the blue
// one in Featured Work. TODO: every visual is a placeholder until the screens are exported.

export const quest2travel: CaseStudy = {
  slug: "expense-management-system",
  chrome: "own",
  meta: {
    title: "Quest2Travel, expense platform",
    description:
      "Redesigning Quest2Travel's expense platform around a simple truth: expenses happen in motion, submissions happen at a desk.",
  },

  hero: {
    backLink: { label: "All work", href: "/#work" },
    tag: "Case study",
    title: "Logging expenses shouldn't wait for a desk",
    subtitle:
      "Redesigning Quest2Travel's expense platform around a simple truth: expenses happen in motion, submissions happen at a desk.",
    facts: [
      { label: "Role", value: "Sole Product Designer" },
      { label: "Client", value: "Quest2Travel by MakeMyTrip" },
      { label: "Timeline", value: "11 to 12 months" },
      { label: "Platform", value: "Responsive web, desktop first" },
      { label: "Scope", value: "My primary project across 1.5 years" },
    ],
    visual: "Prototype: logging an expense on the desktop platform",
    video: "/video/add-expense.mp4",
  },

  sections: [
    {
      id: "problem",
      nav: "The problem",
      number: "01",
      title: "It was never a UX problem first. It was a revenue problem.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Quest2Travel earns the overwhelming majority of its revenue from travel fulfillment: commissions and fees on flights, hotels and ground transport. The expense module is not sold standalone. It is bundled into the platform as the lock in that keeps a client's entire travel spend booking through Quest2Travel.",
            "That lock was broken. Not every enterprise that bought travel adopted expense, and any client running expenses on a competitor's tool handed that competitor a foothold inside the account, one it could widen to take the travel business too.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "Fixing the expense experience was not about selling expense software. It was about defending the travel revenue.",
        },
        {
          type: "stats",
          items: [
            { figure: "500+", caption: "enterprise clients" },
            { figure: "20M+", caption: "cumulative trips" },
            { figure: "20+", caption: "industries served" },
            { figure: "15+", caption: "years" },
          ],
        },
        {
          type: "logos",
          label: "A few of the enterprises on the platform",
          items: [
            { name: "Adani", src: "/images/work/logos/adani.svg", width: 32, height: 11 },
            { name: "Aegon", src: "/images/work/logos/aegon.svg", width: 1134, height: 454 },
            { name: "Air India", src: "/images/work/logos/air-india.svg", width: 2304, height: 674 },
            { name: "Ansys", src: "/images/work/logos/ansys.svg", width: 161, height: 51 },
            { name: "Axis Bank", src: "/images/work/logos/axis-bank.svg", width: 1000, height: 257 },
            { name: "Bandhan Bank", src: "/images/work/logos/bandhan-bank.svg", width: 147, height: 31 },
            { name: "Bharti Airtel", src: "/images/work/logos/bharti-airtel.svg", width: 724, height: 730 },
            { name: "Borosil", src: "/images/work/logos/borosil.svg", width: 495, height: 138 },
            { name: "Dr. Reddy's", src: "/images/work/logos/dr-reddy-s.jpg", width: 812, height: 250 },
            { name: "Elkem", src: "/images/work/logos/elkem.svg", width: 918, height: 231 },
            { name: "Grant Thornton", src: "/images/work/logos/grant-thornton.svg", width: 700, height: 88 },
            { name: "HDFC Bank", src: "/images/work/logos/hdfc-bank.svg", width: 289, height: 50 },
            { name: "HDFC ERGO", src: "/images/work/logos/hdfc-ergo.svg", width: 124, height: 130 },
            { name: "HDFC Life", src: "/images/work/logos/hdfc-life.png", width: 1200, height: 773 },
            { name: "Hapag-Lloyd", src: "/images/work/logos/hapag-lloyd.svg", width: 130, height: 20 },
            { name: "Indian Oil", src: "/images/work/logos/indian-oil.svg", width: 200, height: 239 },
            { name: "Infosys", src: "/images/work/logos/infosys.svg", width: 400, height: 160 },
            { name: "JSW Group", src: "/images/work/logos/jsw-group.svg", width: 300, height: 142 },
            { name: "Jaguar", src: "/images/work/logos/jaguar.svg", width: 162, height: 20 },
            { name: "Land Rover", src: "/images/work/logos/land-rover.svg", width: 227, height: 119 },
            { name: "Nayara Energy", src: "/images/work/logos/nayara-energy.jpg", width: 3540, height: 3024 },
            { name: "Mahindra Logistics", src: "/images/work/logos/mahindra-logistics.jpg", width: 3406, height: 1412 },
            { name: "PepsiCo", src: "/images/work/logos/pepsico.svg", width: 576, height: 133 },
            { name: "Reliance Capital", src: "/images/work/logos/reliance-capital.svg", width: 172, height: 56 },
            { name: "Reserve Bank of India", src: "/images/work/logos/reserve-bank-of-india.svg", width: 13773, height: 4798 },
            { name: "Sony", src: "/images/work/logos/sony.svg", width: 1280, height: 225 },
            { name: "Tata Capital", src: "/images/work/logos/tata-capital.jpg", width: 3334, height: 1334 },
            { name: "Tata Motors", src: "/images/work/logos/tata-motors.svg", width: 602, height: 93 },
            { name: "Tata Play", src: "/images/work/logos/tata-play.svg", width: 1158, height: 136 },
            { name: "Tata Tele", src: "/images/work/logos/tata-tele.svg", width: 150, height: 11 },
            { name: "Toyota", src: "/images/work/logos/toyota.svg", width: 136, height: 24 },
            { name: "UltraTech", src: "/images/work/logos/ultratech.jpg", width: 716, height: 220 },
            { name: "Viacom18 Studios", src: "/images/work/logos/viacom18-studios.png", width: 1071, height: 369 },
            { name: "Vistara", src: "/images/work/logos/vistara.svg", width: 150, height: 108 },
            { name: "Xiaomi", src: "/images/work/logos/xiaomi.svg", width: 60, height: 16 },
            { name: "Yum! Brands", src: "/images/work/logos/yum-brands.svg", width: 120, height: 100 },
          ],
        },

        { type: "subheading", text: "The product was built backwards" },
        {
          type: "text",
          paragraphs: [
            "The platform was report first. A report had to exist before a single expense could be logged, which made filing in motion impossible by design.",
          ],
        },
        {
          type: "table",
          head: ["Issue", "Consequence"],
          rows: [
            ["Report first architecture", "Logging an expense required creating a report first. 4 steps, desktop only"],
            ["Zero mobile UX", "Layouts broke on the exact screens travelers use"],
            ["No policy guidance", "Employees guessed what was reimbursable, then discovered rejections weeks later"],
            ["Disconnected from travel", "Same login, completely different product, jarring at every crossing"],
          ],
        },
        {
          type: "visual",
          label: "The old way, in four moments: manual entry, lost receipts, unclear policies, approval delays",
          images: [
            {
              src: "/images/work/storyboard/manual-entry.png",
              alt: "Manual entry",
              caption: "Manual entry",
              width: 1376,
              height: 768,
            },
            {
              src: "/images/work/storyboard/lost-receipt.png",
              alt: "Lost receipts",
              caption: "Lost receipts",
              width: 1376,
              height: 768,
            },
            {
              src: "/images/work/storyboard/unclear-policy.png",
              alt: "Unclear policies",
              caption: "Unclear policies",
              width: 1376,
              height: 768,
            },
            {
              src: "/images/work/storyboard/approval-delays.png",
              alt: "Approval delays",
              caption: "Approval delays",
              width: 1376,
              height: 768,
            },
          ],
        },
        {
          type: "statement",
          text: "The design problem underneath the business case: how do you rebuild an enterprise expense platform without breaking the mental models of employees already using the travel product?",
        },
      ],
    },

    {
      id: "research",
      nav: "Confirming the problem",
      number: "02",
      title: "Three sources, one pattern",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "**Customer calls.** With my PM, one on one calls with corporate points of contact across the client base. Consistent pattern: everything useful buried under too many clicks, a dated UI, and a travel to expense disconnect that made one product feel like two.",
            "**Colleagues who were also users.** Quest2Travel employees used the platform for their own business travel, so I asked them informally where it felt dated and where they struggled. The same themes surfaced from the inside. Not formal research, which I address in the conclusion, but it meant the redesign was not built purely on second hand accounts.",
            "**Secondary research.** Published material on how corporate reimbursement actually works, across Ramp, Digital Edge, Washington State's audit office and practitioner threads. I had assumed reimbursement was broadly standardised. It is not. Policies, limits and approval chains vary widely between companies, which is why the system had to be configurable by the client rather than opinionated by us.",
            "**Competitive teardown.** Five platforms, each for a specific reason.",
          ],
        },
        {
          type: "table",
          head: ["Platform", "What I took", "Why"],
          rows: [
            ["Navan", "OCR first, standalone expense creation", "Made on the go filing structurally possible"],
            [
              "SAP Concur",
              "Policy flagging logic",
              "Confirmed enterprise users expect flagging. Avoided their buried navigation",
            ],
            [
              "Zoho Expense",
              "Two tier flagging, comment threads, audit log",
              "Surface violations before submission, replace email chains, keep every action traceable",
            ],
            ["Expensify", "OCR speed validation", "Confirmed the speed on the go filing demands was achievable"],
            [
              "Happay",
              "India specific approval complexity",
              "A separate platform in the MakeMyTrip group. The closest reference for how Indian enterprises structure multi level approvals",
            ],
          ],
        },
        {
          type: "statement",
          text: "Every platform offered similar features. None had solved presenting them inside an ecosystem users already knew, because none of them were embedded in a travel platform.",
        },

        { type: "subheading", text: "The insight that changed the product" },
        {
          type: "text",
          paragraphs: [
            "It did not come from any brief or benchmark. It came from a live prototype session with enterprise clients, where the same concern surfaced independently from multiple contacts.",
          ],
        },
        {
          type: "testimonials",
          items: [
            {
              quote: "Our employees aren't submitting wrong expenses to cheat. They genuinely don't know what the policy allows.",
              name: "Enterprise client",
              role: "Live prototype session",
            },
          ],
        },
        { type: "text", paragraphs: ["One sentence created the Tips panel."] },

        { type: "subheading", text: "Who I was designing for" },
        {
          type: "text",
          paragraphs: [
            "**Manohar, 37, corporate professional, Mumbai.** A composite from those calls and conversations. High travel frequency, limited time, zero patience for desktop only tools. He needs to log expenses in motion, know limits before spending rather than after a rejection, and track claim status after submission.",
            "And he is only one of four roles. Employee, Approver, Financial Auditor and Admin all share one reimbursement pipeline.",
          ],
        },
      ],
    },

    {
      id: "process",
      nav: "Process and iteration",
      number: "03",
      title: "Phase 0. Stabilise the old before building the new",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "A full redesign takes months and live enterprise clients cannot wait that long. So before the redesign work began, I shipped a hygiene pass on the legacy system: targeted fixes across all three roles, Requester, Approver and Accountant, on desktop and mobile, that could go live without structural or backend change.",
          ],
        },
        {
          type: "numbered",
          items: [
            {
              title: "Named the screen you are on",
              text: "Listing pages gained a page title and a back affordance, and the titles became role specific. Expense Management, which everyone saw, became Expense Approvals for approvers and Expense Settlements for accountants.",
            },
            {
              title: "Gave the actions a hierarchy",
              text: "The old toolbar was a row of identically weighted outline buttons, so nothing read as more important than anything else. Secondary actions collapsed into icons and one filled primary button, Create New, took the lead.",
            },
            {
              title: "Put the claim's identity at the top",
              text: "Detail screens opened without telling you which claim you were looking at. The claim number and title now head the page.",
            },
            {
              title: "Fixed the mobile table",
              text: "The listing was a desktop table squeezed onto a phone, with the remaining columns hidden behind a floating overlay. Expandable rows now reveal those fields in place.",
            },
            {
              title: "Grouped the expense form",
              text: "Add Expenditure was a loose set of fields ending in a single Save. It became a bounded card with its own instruction and an Add More action beside Save, so logging several expenses no longer meant re reading the whole form each time.",
            },
            {
              title: "Stacked the decision buttons on mobile",
              text: "Reconsider, Approve and Deny wrapped awkwardly at small widths. Full width stacked buttons made the approver's three choices unambiguous on a phone.",
            },
          ],
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: [
            "None of it touched the architecture. That was the point. Keep the current experience workable while the real fix is built. It also forced me deep into every corner of the legacy product early, which paid off through the rest of the project.",
          ],
        },
        { type: "visual", label: "Hygiene pass, before and after across Requester, Approver and Accountant screens" },

        { type: "subheading", text: "V1 was the wrong benchmark" },
        {
          type: "text",
          paragraphs: [
            "My first design was clean and well executed: OCR first, standalone creation, modelled closely on Navan. By expense platform standards it worked.",
          ],
        },
        {
          type: "testimonials",
          items: [
            {
              quote: "It looks like a modern expense platform. But it doesn't feel like Quest2Travel.",
              name: "My PM",
              role: "V1 review",
            },
          ],
        },
        { type: "visual", label: "V1 screenshot, the rejected Navan style iteration" },

        { type: "subheading", text: "The structural insight" },
        {
          type: "text",
          paragraphs: [
            "The travel platform had a three step mental model that existing users already knew instinctively. I applied it directly to expense reports.",
          ],
        },
        { type: "flow", label: "Travel request", steps: ["Travel Info", "Add Services", "Review and Submit"] },
        { type: "flow", label: "Expense report", steps: ["Report Info", "Add Expenses", "Review and Submit"] },
        {
          type: "text",
          paragraphs: ["Same pattern. Two products. Near zero learning curve, and no training rollout needed across enterprise clients."],
        },
        {
          type: "statement",
          tone: "blue",
          text: "This was not aesthetic consistency. It was cognitive consistency. The most important decision of the project, and it came from studying the ecosystem rather than the competitors.",
        },
        { type: "visual", label: "The three step expense report flow" },

        { type: "subheading", text: "Corrected mid flight" },
        {
          type: "text",
          paragraphs: [
            "My initial proposal surfaced warnings during creation and critical issues only at submission. My PM's correction produced the final architecture: both tiers surface during creation, and the same deviations reappear at review. The user is never surprised at submission.",
          ],
        },

        { type: "subheading", text: "Constraints as design direction" },
        {
          type: "table",
          head: ["Constraint", "Response"],
          rows: [
            [
              "OCR ran on a third party service, billed per scan",
              "The business wanted to limit both the cost and the dependency. I designed the Primary Receipt selector: the user nominates one receipt to be scanned, and every other file attaches as a supporting document. One scan per expense, no loss of evidence",
            ],
            [
              "No side panel in the layout system",
              "Split navigation across two rows. The top bar carries identity and primary actions only. A second row below holds filters and view controls, sticky as the user scrolls, so the full width of the screen stays available to the working area",
            ],
            ["Travelers work on the go", "Designed desktop and mobile in parallel, card based UI with thumb friendly CTAs"],
            ["S3 icons could not be themed dynamically", "Made the Figma component library non negotiable"],
            [
              "Dev team built on Tailwind",
              "Mirrored Tailwind's exact values and naming in the design system, so devs could read a Figma inspect panel and write the class from it",
            ],
          ],
        },
      ],
    },

    {
      id: "design",
      nav: "The design",
      number: "04",
      title: "Standalone expense creation",
      blocks: [
        { type: "visual", label: "Four frame storyboard: meal happens, bill arrives, camera ready, logged in under 30 seconds" },
        {
          type: "text",
          paragraphs: [
            "Expenses are logged the moment they happen. No report required. Reports are compiled later, at a desk, with time to review.",
          ],
        },
        {
          type: "statement",
          text: "Solves: report first architecture. On the go filing went from impossible to possible by design. Travelers think in receipts, not reports.",
        },
        {
          type: "text",
          paragraphs: [
            "**Responsive where the work moves, desktop where the work sits.** Employee and approver experiences are fully responsive, so an expense can be captured, built into a report and submitted from a phone. Financial Auditor and Admin stay desktop only by design: dense data tables, aging claim queues, and configuration where one wrong toggle affects an entire organisation. Compressing those onto a phone adds risk without adding value.",
            "**Corporate cards feed the same surface.** Card transactions sync in as Incomplete Expenses on both desktop and mobile. The user reviews, edits and links them to a report rather than re entering what the bank already knows. Capture by camera, capture by card, same destination.",
          ],
        },
        { type: "visual", label: "Card import, Incomplete Expenses on desktop and mobile" },
        { type: "visual", label: "Responsive employee views, strongest 2 to 3 mobile frames" },

        { type: "subheading", text: "02. The three step report flow" },
        {
          type: "text",
          paragraphs: [
            "Matching the travel platform's mental model meant enterprise employees needed zero onboarding to submit their first report.",
          ],
        },
        { type: "statement", text: "Solves: the travel to expense disconnect. Continuity is a feature." },
        {
          type: "text",
          paragraphs: [
            "Step 2 is where the two products actually meet. Alongside adding expenses, the user can **link a pre approved travel request** and auto import the expenses already attached to it, and **reconcile advances**, linking approved ones, adding manual entries, or surrendering funds they did not spend.",
          ],
        },
        {
          type: "statement",
          text: "The three step pattern borrowed the travel platform's shape. Linking the travel request borrowed its data. That is what turns two products sharing a login into one product.",
        },
        { type: "visual", label: "Report creation step 2, adding expenses, linking a travel request, reconciling advances" },

        { type: "subheading", text: "03. Save with critical issues, the hardest call" },
        {
          type: "text",
          paragraphs: [
            "**The tension:** block saving to keep data clean, or allow saving to protect the on the go use case.",
            "**The resolution:** creation happens in motion, in airports and taxis. Submission happens at a desk with time to act. The same enforcement applied to both moments destroys one of them.",
            "**The decision:** save freely during travel. Block report submission until every critical issue is resolved.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "The right friction belongs where the user can actually respond to it.",
        },

        { type: "subheading", text: "04. Two tier policy flagging" },
        {
          type: "cards",
          items: [
            {
              label: "Critical",
              text: "Surfaced at creation, hard blocked at submission. Over limit amounts, missing documentation, out of policy categories. Errors finance cannot process.",
            },
            {
              label: "Warning",
              text: "Surfaced at creation, never blocked. Near limit spends, receipts that appear altered, categories needing notes. Judgment calls, not violations.",
            },
          ],
        },
        {
          type: "statement",
          text: "Enforcement severity matches issue severity, and every flag appears at the moment it can be acted on.",
        },
        { type: "visual", label: "Critical state beside warning state on the expense form" },

        { type: "subheading", text: "05. The Tips panel" },
        {
          type: "text",
          paragraphs: [
            "Originally a static prompt nudging users to try OCR. The client session insight turned it into a dynamic, category aware policy guide. The moment OCR identifies a receipt as a client meal, the panel surfaces the reimbursable limit, exclusions and documentation requirements, before the user hits save.",
          ],
        },
        {
          type: "statement",
          text: "Solves: no policy guidance. Policy awareness moved from reactive, a rejection three weeks later, to proactive, guidance at the moment of decision.",
        },
        { type: "visual", label: "Expense form with the live Tips panel" },
        { type: "visual", label: "Video: end to end employee user flow" },

        { type: "subheading", text: "Designing for four roles, where roles are relative" },
        {
          type: "text",
          paragraphs: [
            "Hierarchy is recursive. An employee can be an approver for people under them, and every approver is an employee to the approver above them. So Employee and Approver do not get separate products. They share one dashboard, and approvers gain an additional My Approvals section.",
          ],
        },
        {
          type: "statement",
          text: "Capabilities layer onto a single interface instead of forking it, which keeps the system scalable as enterprises reshape their approval chains.",
        },
        {
          type: "text",
          paragraphs: [
            "The dashboard makes that literal. It splits into **Raised by You** and **To Be Approved by You**, so a manager sees both halves of their own working life on one screen rather than switching accounts or modes.",
          ],
        },
        { type: "visual", label: "Employee and approver dashboard, Raised by You beside To Be Approved by You" },
        {
          type: "table",
          head: ["Role", "Built for"],
          rows: [
            ["Employee", "Every primary action within two taps of home. Inline coach marks for first time users"],
            [
              "Approver",
              "Same dashboard plus My Approvals. Decisions under time pressure, flags pre highlighted, comments at expense level",
            ],
            [
              "Financial Auditor",
              "Override approvals, skip levels, request re approvals. Aging claim prioritisation surfaces the oldest unresolved reports first",
            ],
            [
              "Admin",
              "Every admin change must be immediately legible in the employee facing UI, so configuration can be verified without waiting for breakage reports",
            ],
          ],
        },

        { type: "subheading", text: "Also in scope" },
        {
          type: "text",
          paragraphs: [
            "Mileage logging with map based route entry and a visible reimbursement calculation. Advance requests as a guided two step flow with their own listing and detail views. Category driven field defaults the user can override, duplicate expense detection, approval chain visibility showing who has approved and who is next, and a full audit trail with comments on every report.",
          ],
        },

        { type: "subheading", text: "The accountant dashboard" },
        {
          type: "text",
          paragraphs: [
            "Built around one question: what does a finance lead need to answer within 30 seconds of opening it. Net Booking Value, Policy Deviations, and Savings versus Missed Savings own the first row. Everything else lives behind tabs and filters. The approval queue beneath it carries the actions a finance team actually needs, including **assign to self** and **release assignment**, because in a shared queue the first problem is not deciding, it is knowing who owns what.",
          ],
        },
        { type: "visual", label: "Q2T Reports Corner, organisation tab, and the approval queue beneath it" },
        {
          type: "text",
          tone: "tint",
          label: "Beyond handoff",
          paragraphs: [
            "The dev team were building the dashboard graphs in Recharts. Rather than writing a spec and hoping the output matched, I worked directly in the library they had already chosen, altering the configurations myself: my colour tokens, corner radii, sizing and styling props, adjusted until the charts rendered exactly as designed. I handed over the configured code rather than a description of it. Complex visualisations usually get simplified in implementation. These did not.",
          ],
        },
      ],
    },

    {
      id: "outcome",
      nav: "Outcome",
      number: "05",
      title: "What shipped",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "The hygiene pass went live to production early in the project. By the time I left, standalone expense creation was developed and the Reports dashboard was fully developed, with remaining modules in active development against a complete documented handoff: every flow, edge case and screen state walked through in person, supported by flow diagrams for each module.",
          ],
        },
        {
          type: "table",
          head: ["Before", "After"],
          rows: [
            [
              "4 sequential steps to log one expense, desktop required",
              "4 steps to 1. Standalone OCR capture, designed to a sub 30 second target and hit consistently in live client demos",
            ],
            ["On the go filing architecturally impossible", "Feasible by design"],
            ["Zero policy guidance, violations found weeks later", "Category limits surface the moment OCR reads the receipt"],
            ["Flags appeared only at submission, too late to act", "Both tiers surface at creation and reappear at review"],
            ["Visualisation handoff via written specs", "1:1 fidelity. I configured the Recharts code myself and handed it over"],
          ],
        },
        {
          type: "text",
          paragraphs: [
            "**Validated** in prototype reviews by Adani, Toyota and Dr. Reddy's contacts, the same clients who had flagged the legacy system as a blocker.",
            "**Accessibility.** Ran the primary colours, CTAs, flag indicators and body text through Adobe's Color Contrast Analyzer against WCAG 2.1 AA and AAA thresholds, adjusting the palette where they fell short. It matters for an enterprise user base that skews senior in age. I also pushed for dark mode, though it never got past discussion.",
            "**Recognition.** Employee of the Quarter, twice.",
          ],
        },
        { type: "visual", label: "Award photo" },

        { type: "subheading", text: "How I would measure it" },
        {
          type: "text",
          paragraphs: [
            "I left before launch metrics could accrue. These are the four numbers I designed toward and would pull first.",
          ],
        },
        {
          type: "table",
          head: ["Metric", "What it tests"],
          rows: [
            ["Expense module adoption", "The lock in thesis. Is the bundle finally complete"],
            ["Expenses logged within 24h of spend", "The on the go signal. Is capture happening same day"],
            ["First submission rejection rate", "The Tips panel and flagging. Is guidance at entry working"],
            ["Time to reimbursement", "The full pipeline. Are approvers receiving clean reports"],
          ],
        },
        {
          type: "testimonials",
          label: "From LinkedIn recommendations by the developers who built the work",
          items: [
            {
              quote: "His handoff process is top tier. It significantly reduced our development time.",
              name: "Shiv",
              role: "Sr. Software Engineer, Quest2Travel",
            },
            {
              quote: "He doesn't just hand over screens. He shares the logic and user thinking behind them.",
              name: "Suraj Jadhav",
              role: "React JS Developer, Quest2Travel",
            },
            {
              quote: "He collaborates well, is open to feedback, and consistently delivers on time.",
              name: "Faiz Kazi",
              role: "Frontend Developer, Quest2Travel",
            },
          ],
        },
      ],
    },

    {
      id: "conclusion",
      nav: "Conclusion",
      number: "06",
      title: "The insight arrived in month 8. It belonged in month 1.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "The Tips panel became one of the most impactful features in the redesign, and it was discovered in a prototype session in month 8, not in research in week 1.",
            "Because I did not own the research process from the start, a feature that changed how employees understand reimbursement policy was retrofitted onto an existing form rather than built into the information architecture. The panel works. Had the insight surfaced in month one, it would have shaped how the entire form was structured.",
            "The pace played a role. There was no formal deadline, but the culture was ship as soon as possible, and I inherited the research rather than owning it. My conversations with colleagues were an attempt to close that gap within the constraints: real input, honestly gathered, but not the structured research this product deserved.",
          ],
        },
        {
          type: "text",
          tone: "tint",
          label: "If I ran this again",
          paragraphs: [
            "I would conduct user interviews personally before any design work begins, with actual traveling employees rather than only the buyers who administer their expenses, and I would include the support team, who hold the most unfiltered picture of where a product fails.",
          ],
        },

        { type: "subheading", text: "What this project taught me" },
        {
          type: "list",
          items: [
            "**Design for the ecosystem, not just the screen.** The most important decision came from the product users already knew, not from any competitor.",
            "**Context determines where constraints belong.** The same enforcement at the wrong moment destroys a use case.",
            "**The best insights come from being in the room.** Build the sessions that create those moments rather than waiting for them.",
            "**Constraints are design direction in disguise.** Every hard limit in this project produced a cleaner solution than the default would have.",
          ],
        },
      ],
    },
  ],
};
