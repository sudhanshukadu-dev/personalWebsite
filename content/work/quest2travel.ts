import type { CaseStudy } from "@/components/work/CaseStudyPage";

// Quest2Travel case study copy. Source: Downloads/Quest2Travel_Case_Study_Layout_Spec.md,
// the labelled layout spec, followed block for block. How its labels map here:
//   EYEBROW -> the section's number and nav label, set together as its tag
//   H2 -> the section title       H3 -> a subheading
//   LEAD -> the section intro, under the heading; after an H3, a text block with `lead`
//   BODY -> a text block, consecutive paragraphs kept in one card
//   CALLOUT -> a statement in the site blue   PULL QUOTE + ATTRIBUTION -> a quote card
//   STAT ROW -> stats   TABLE -> table   FLOW DIAGRAM -> flow   BULLETS -> list
//   VISUAL / VIDEO -> an image, video or, until the screens are exported, a labelled slot
//   TESTIMONIAL -> the quote card, three deep   SIGN OFF -> the signoff line
// Lives at /work/expense-management-system, the link on the home page's Featured Work
// card. It keeps the site's blue, since this project is the blue one in Featured Work.
// TODO: thirteen of the sixteen visual slots are placeholders until the screens are
// exported; the image manifest at the end of the spec lists them in order.

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
    visual: "Desktop expense creation flow",
    video: "/video/add-expense.mp4",
  },

  sections: [
    {
      id: "problem",
      nav: "Problem",
      number: "01",
      title: "The part of the product nobody wanted to use",
      intro:
        "Quest2Travel is a corporate travel platform inside the MakeMyTrip group, used by more than 500 enterprises across roughly 20 industries. Employees book their business travel through it, and their companies manage the whole programme from the same place.",
      blocks: [
        {
          type: "text",
          paragraphs: ["Attached to that travel product was an expense module. It was the part nobody wanted to use."],
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

        { type: "subheading", text: "It was never a UX problem first. It was a revenue problem." },
        {
          type: "text",
          paragraphs: [
            "Before getting to what users hated about it, it is worth understanding why the company cared enough to rebuild it, because that shaped every decision that followed.",
            "Quest2Travel earns the overwhelming majority of its revenue from travel fulfillment. Commissions and fees on flights, hotels and ground transport. The expense module is not sold standalone and does not carry a meaningful price of its own. It is bundled into the platform as the lock in that keeps a client's entire travel spend booking through Quest2Travel.",
            "That lock was broken. Not every enterprise that bought travel went on to adopt expense, and any client running their expenses on a competitor's tool had effectively handed that competitor a foothold inside the account. A foothold a full travel and expense suite could widen until it took the travel business too.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "So this was never about selling better expense software. It was about defending travel revenue and completing a bundle the sales team could lead with.",
        },

        { type: "subheading", text: "The product was built backwards" },
        {
          type: "text",
          paragraphs: [
            "The user side of the problem was just as structural.",
            "The platform was report first. Before an employee could log a single expense, a report had to exist to put it in. That one architectural choice is what made everything else difficult, because it meant expense logging could only ever happen in a sitting, at a desk, with time to set things up.",
            "Four failures compounded it.",
          ],
        },
        {
          type: "table",
          head: ["Issue", "Consequence"],
          rows: [
            [
              "Report first architecture",
              "Logging one expense meant creating a report, filling its details, then creating the expense and filling its details. Four steps, desktop only",
            ],
            ["Zero mobile usability", "Layouts broke on the exact screens travelers actually carry"],
            ["No policy guidance", "Employees guessed what was reimbursable, then found out weeks later through a rejection"],
            ["Disconnected from travel", "Same login, completely different product. Jarring at every crossing between the two"],
          ],
        },
        {
          type: "visual",
          label: "2x2 storyboard: manual entry, lost receipts, unclear policies, approval delays",
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
        { type: "text", paragraphs: ["Put together, the brief that emerged was harder than a visual refresh."] },
        {
          type: "statement",
          tone: "blue",
          text: "How do you rebuild an enterprise expense platform without breaking the mental models of employees who already know the travel product?",
        },
      ],
    },

    {
      id: "research",
      nav: "Confirming the problem",
      number: "02",
      title: "Three sources, one pattern",
      intro:
        "I joined the project with research already done by my PM, so my first job was to understand what was actually known rather than assume it. I ended up working from three sources, and each told me something the others did not.",
      blocks: [
        { type: "subheading", text: "What existing customers said" },
        {
          type: "text",
          paragraphs: [
            "Alongside my PM, I sat in on one to one calls with corporate points of contact across the client base. These are the people who run travel and expense programmes inside their organisations, so they see the complaints before we do.",
            "The pattern was consistent. Everything useful was buried under too many clicks. The interface felt a generation old. And the disconnect between travel and expense made one product feel like two, which confused their employees and generated support requests.",
          ],
        },

        { type: "subheading", text: "What colleagues who were also users said" },
        {
          type: "text",
          paragraphs: [
            "There was a gap in that picture. Those contacts administer expense programmes, they do not file expenses from a taxi.",
            "Quest2Travel's own employees used the platform for their business travel, so I asked them informally where it felt dated and where they struggled to find things. The same themes came back from the inside, which mattered because it meant the redesign was not built purely on second hand accounts. It was not formal research, and I say so plainly in the conclusion, but it was better than designing on assumption.",
          ],
        },

        { type: "subheading", text: "What the wider market said" },
        {
          type: "text",
          paragraphs: [
            "I also read what was published about how corporate reimbursement actually works, across Ramp, Digital Edge, Washington State's audit office and practitioner threads.",
            "I had assumed reimbursement was broadly standardised. It is not. Policies, limits, approval chains and even who signs off vary enormously between companies. That finding changed the shape of the product: the system had to be configurable by each client rather than opinionated by us, which is why so much of the later work went into the Admin role.",
          ],
        },

        { type: "subheading", text: "What five platforms taught me" },
        {
          type: "text",
          paragraphs: ["Then I went through the competition, each for a specific reason rather than a general survey."],
        },
        {
          type: "table",
          head: ["Platform", "What I took", "Why"],
          rows: [
            [
              "Navan",
              "OCR first capture, standalone expense creation",
              "Directly addressed the report first problem. It proved on the go filing was structurally possible",
            ],
            [
              "SAP Concur",
              "Policy flagging logic",
              "Confirmed enterprise users expect flagging. I avoided their navigation, where critical actions sit buried under layers, which was our customers' exact complaint",
            ],
            [
              "Zoho Expense",
              "Two tier flagging, comment threads, audit log",
              "Surface violations before submission, replace context free email chains, and keep every action traceable",
            ],
            ["Expensify", "OCR speed", "Confirmed the speed on the go filing demands was actually achievable"],
            [
              "Happay",
              "India specific approval complexity",
              "A separate platform within the MakeMyTrip group. The closest reference for how Indian enterprises structure multi level approvals",
            ],
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "Every platform offered broadly the same features. None had solved presenting them inside an ecosystem users already knew, because none of them were embedded in a travel platform. That gap was the opportunity.",
        },

        { type: "subheading", text: "The insight that changed the product" },
        {
          type: "text",
          paragraphs: [
            "None of that research produced the feature that ended up mattering most. That came later, in a live prototype session with enterprise clients, when the same concern surfaced independently from more than one contact.",
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
        {
          type: "text",
          paragraphs: [
            "That reframed rejections entirely. They were not a compliance problem to police. They were an information problem to solve, and solving it meant telling people the rules at the moment they were spending rather than weeks later. That single sentence created the Tips panel, which I come back to in the design.",
          ],
        },

        { type: "subheading", text: "Who I was designing for" },
        {
          type: "text",
          paragraphs: [
            "**Manohar, 37, corporate professional, Mumbai.** A composite drawn from those calls and conversations. High travel frequency, limited time, no patience for desktop only tools. He needs to log expenses in motion, know his limits before spending rather than after a rejection, and see where his claim has reached once it is submitted.",
            "But he is only one of four roles, and that turned out to matter more than any single persona. Employee, Approver, Financial Auditor and Admin all share one reimbursement pipeline, and a decision that helps one can easily obstruct another.",
          ],
        },
      ],
    },

    {
      id: "process",
      nav: "Process and iteration",
      number: "03",
      title: "The wrong benchmark, the right ecosystem",
      blocks: [
        { type: "subheading", text: "Phase 0. Stabilise the old before building the new" },
        {
          type: "text",
          lead: true,
          paragraphs: [
            "A full redesign takes months. Live enterprise clients cannot wait that long, and the existing system was actively frustrating people every day in the meantime.",
          ],
        },
        {
          type: "text",
          paragraphs: [
            "So before the redesign work began, I shipped a hygiene pass on the legacy platform. Targeted fixes across all three roles, Requester, Approver and Accountant, on desktop and mobile, chosen specifically because they could go live without structural or backend change.",
            "**Named the screen you are on.** Listing pages gained a page title and a back affordance, and those titles became role specific. Expense Management, which everyone saw regardless of what they were doing, became Expense Approvals for approvers and Expense Settlements for accountants.",
            "**Gave the actions a hierarchy.** The old toolbar was a row of identically weighted outline buttons, so nothing read as more important than anything else. Secondary actions collapsed into icons and one filled primary button, Create New, took the lead.",
            "**Put the claim's identity at the top.** Detail screens opened without telling you which claim you were looking at. The claim number and title now head the page.",
            "**Fixed the mobile table.** The listing was a desktop table squeezed onto a phone, with the remaining columns hidden behind a floating overlay card. Expandable rows now reveal those fields in place.",
            "**Grouped the expense form.** Add Expenditure was a loose set of fields ending in a single Save. It became a bounded card with its own instruction and an Add More action beside Save, so logging several expenses no longer meant re reading the whole form each time.",
            "**Stacked the decision buttons on mobile.** Reconsider, Approve and Deny wrapped awkwardly at small widths, which is a bad thing to happen to three buttons that mean very different outcomes. Full width stacked buttons made the choice unambiguous.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "None of it touched the architecture. That was the point. Keep the current experience workable while the real fix is built. It also forced me deep into every corner of the legacy product early, which paid off for the rest of the project.",
        },
        {
          // Paired before and after, so each row of the grid is one screen's pair.
          type: "visual",
          label: "Hygiene pass on desktop, before and after across Requester, Approver and Accountant screens",
          images: [
            {
              src: "/images/work/hygiene/requester-listing-before.png",
              alt: "Requester listing, before",
              caption: "Requester listing, before",
              width: 1347,
              height: 706,
            },
            {
              src: "/images/work/hygiene/requester-listing-after.png",
              alt: "Requester listing, after",
              caption: "Requester listing, after",
              width: 1428,
              height: 706,
            },
            {
              src: "/images/work/hygiene/requester-details-before.png",
              alt: "Requester details, before",
              caption: "Requester details, before",
              width: 1340,
              height: 706,
            },
            {
              src: "/images/work/hygiene/requester-details-after.png",
              alt: "Requester details, after",
              caption: "Requester details, after",
              width: 1336,
              height: 706,
            },
            {
              src: "/images/work/hygiene/approver-listing-before.png",
              alt: "Approver listing, before",
              caption: "Approver listing, before",
              width: 1356,
              height: 706,
            },
            {
              src: "/images/work/hygiene/approver-listing-after.png",
              alt: "Approver listing, after",
              caption: "Approver listing, after",
              width: 1348,
              height: 706,
            },
            {
              src: "/images/work/hygiene/approver-details-before.png",
              alt: "Approver details, before",
              caption: "Approver details, before",
              width: 1352,
              height: 706,
            },
            {
              src: "/images/work/hygiene/approver-details-after.png",
              alt: "Approver details, after",
              caption: "Approver details, after",
              width: 1280,
              height: 674,
            },
            {
              src: "/images/work/hygiene/accountant-listing-before.png",
              alt: "Accountant listing, before",
              caption: "Accountant listing, before",
              width: 1352,
              height: 706,
            },
            {
              src: "/images/work/hygiene/accountant-listing-after.png",
              alt: "Accountant listing, after",
              caption: "Accountant listing, after",
              width: 1348,
              height: 706,
            },
            {
              src: "/images/work/hygiene/accountant-details-before.png",
              alt: "Accountant details, before",
              caption: "Accountant details, before",
              width: 1352,
              height: 706,
            },
            {
              src: "/images/work/hygiene/accountant-details-after.png",
              alt: "Accountant details, after",
              caption: "Accountant details, after",
              width: 1348,
              height: 706,
            },
          ],
        },
        {
          type: "visual",
          label: "The same pass on mobile, where a desktop table had been squeezed onto a phone",
          columns: 4,
          images: [
            {
              src: "/images/work/hygiene/requester-listing-mobile-before.png",
              alt: "Requester listing, before",
              caption: "Requester listing, before",
              width: 332,
              height: 706,
            },
            {
              src: "/images/work/hygiene/requester-listing-mobile-after.png",
              alt: "Requester listing, after",
              caption: "Requester listing, after",
              width: 338,
              height: 706,
            },
            {
              src: "/images/work/hygiene/requester-details-mobile-before.png",
              alt: "Requester details, before",
              caption: "Requester details, before",
              width: 336,
              height: 706,
            },
            {
              src: "/images/work/hygiene/requester-details-mobile-after.png",
              alt: "Requester details, after",
              caption: "Requester details, after",
              width: 332,
              height: 706,
            },
            {
              src: "/images/work/hygiene/approver-listing-mobile-before.png",
              alt: "Approver listing, before",
              caption: "Approver listing, before",
              width: 428,
              height: 912,
            },
            {
              src: "/images/work/hygiene/approver-listing-mobile-after.png",
              alt: "Approver listing, after",
              caption: "Approver listing, after",
              width: 428,
              height: 912,
            },
            {
              src: "/images/work/hygiene/approver-details-mobile-before.png",
              alt: "Approver details, before",
              caption: "Approver details, before",
              width: 428,
              height: 912,
            },
            {
              src: "/images/work/hygiene/approver-details-mobile-after.png",
              alt: "Approver details, after",
              caption: "Approver details, after",
              width: 432,
              height: 912,
            },
            {
              src: "/images/work/hygiene/accountant-listing-mobile-before.png",
              alt: "Accountant listing, before",
              caption: "Accountant listing, before",
              width: 424,
              height: 912,
            },
            {
              src: "/images/work/hygiene/accountant-listing-mobile-after.png",
              alt: "Accountant listing, after",
              caption: "Accountant listing, after",
              width: 428,
              height: 912,
            },
            {
              src: "/images/work/hygiene/accountant-details-mobile-before.png",
              alt: "Accountant details, before",
              caption: "Accountant details, before",
              width: 432,
              height: 912,
            },
            {
              src: "/images/work/hygiene/accountant-details-mobile-after.png",
              alt: "Accountant details, after",
              caption: "Accountant details, after",
              width: 428,
              height: 912,
            },
          ],
        },

        { type: "subheading", text: "My first version, and why it was rejected" },
        {
          type: "text",
          paragraphs: [
            "With the old system stabilised, I started the redesign properly. My first version was clean and well executed. OCR first capture, standalone creation, modelled closely on Navan. By the standards of expense platforms, it worked.",
            "My PM's feedback was short and it stopped me.",
          ],
        },
        {
          type: "testimonials",
          items: [
            {
              quote: "It looks like a modern expense platform. But it doesn't feel like Quest2Travel.",
              name: "PM",
              role: "V1 review",
            },
          ],
        },
        {
          type: "text",
          paragraphs: [
            "He was right, and the reason was that I had benchmarked against the wrong thing. I had been comparing my work to other expense tools when the product users would actually compare it to was sitting one tab away.",
          ],
        },
        { type: "visual", label: "V1 screenshot, the rejected Navan style iteration" },

        { type: "subheading", text: "The structural insight" },
        {
          type: "text",
          paragraphs: [
            "So I went and studied the travel platform instead of the competition.",
            "It had a three step mental model that existing users already knew instinctively, because they used it every time they booked a trip. I applied that same structure directly to expense reports.",
          ],
        },
        { type: "flow", label: "Travel request", steps: ["Travel Info", "Add Services", "Review and Submit"] },
        { type: "flow", label: "Expense report", steps: ["Report Info", "Add Expenses", "Review and Submit"] },
        {
          type: "text",
          paragraphs: [
            "Same pattern, two products. An employee who had ever raised a travel request already knew how to file an expense report, which meant no training rollout across enterprise clients and effectively no learning curve.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "This was not aesthetic consistency, matching colours and components. It was cognitive consistency, matching the shape of the thinking. It was the most important decision of the project, and it came from studying the ecosystem rather than the competitors.",
        },
        { type: "visual", label: "The three step expense report flow" },

        { type: "subheading", text: "Corrected mid flight" },
        {
          type: "text",
          paragraphs: [
            "Not every decision I made survived contact with review, and one correction improved the product significantly.",
            "My initial proposal surfaced warnings during expense creation but held critical issues back until submission. My PM pushed back, and the final architecture surfaces both tiers during creation, with the same deviations reappearing at review and in the report screens.",
            "He was right for a reason worth stating: a user who only learns about a critical problem at submission has already made all their decisions on bad information. Surfacing everything early costs nothing and prevents the unpleasant surprise.",
          ],
        },

        { type: "subheading", text: "Constraints as design direction" },
        {
          type: "text",
          paragraphs: [
            "Alongside the design work ran a set of hard limits. Each one pushed toward a cleaner solution than the default would have been.",
          ],
        },
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
            [
              "Travelers work on the go",
              "Designed desktop and mobile in parallel rather than adapting one down to the other. Card based UI with thumb friendly CTAs on small screens",
            ],
            [
              "S3 hosted icons could not be colour themed dynamically",
              "Made the Figma component library non negotiable rather than a nice to have, since consistency could no longer be patched in later",
            ],
            [
              "The dev team built on Tailwind",
              "Mirrored Tailwind's exact values and naming in the design system, so a developer could read a Figma inspect panel and write the class straight from it",
            ],
          ],
        },
      ],
    },

    {
      id: "design",
      nav: "The design",
      number: "04",
      title: "Five decisions that rebuilt the workflow",
      intro:
        "The redesign came down to five decisions. Each one traces back to a specific failure in the old system rather than a preference of mine.",
      blocks: [
        {
          type: "visual",
          label: "Four frame storyboard: meal happens, bill arrives, camera ready, logged in under 30 seconds",
        },

        { type: "subheading", text: "01. Standalone expense creation" },
        {
          type: "text",
          paragraphs: [
            "Expenses can now be logged the moment they happen, with no report required. Reports are compiled later, at a desk, when there is time to review what has accumulated.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "Solves the report first architecture. On the go filing went from impossible by design to possible by design. Travelers think in receipts, not reports, and the architecture finally agreed with them.",
        },
        {
          type: "text",
          paragraphs: [
            "**Corporate cards feed the same surface.** Card transactions sync in as Incomplete Expenses on both desktop and mobile. Rather than re entering what the bank already knows, the user reviews, edits and links them to a report. Capture by camera and capture by card end up in the same place.",
          ],
        },
        { type: "visual", label: "Card import, Incomplete Expenses on desktop and mobile" },
        {
          type: "text",
          paragraphs: [
            "**Responsive where the work moves, desktop where the work sits.** The employee and approver experiences are fully responsive, so an expense can be captured, built into a report and submitted from a phone. Two roles stay desktop only by design. Financial Auditors work across dense data tables and aging claim queues, and Admins configure policies where one wrong toggle affects an entire organisation. Compressing either onto a phone would add risk without adding value.",
          ],
        },
        { type: "visual", label: "Responsive employee views, strongest 2 to 3 mobile frames" },

        { type: "subheading", text: "02. The three step report flow" },
        {
          type: "text",
          paragraphs: [
            "Because the report flow borrows the travel platform's structure, enterprise employees needed no onboarding to submit their first report.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "Solves the travel to expense disconnect. Continuity is a feature, not a cosmetic choice.",
        },
        {
          type: "text",
          paragraphs: [
            "Step two is where the two products actually meet rather than merely resemble each other. Alongside adding expenses, the user can **link a pre approved travel request** and auto import the expenses already attached to it, and **reconcile advances**, linking approved ones, adding manual entries, or surrendering funds they did not end up spending.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "The three step pattern borrowed the travel platform's shape. Linking the travel request borrowed its data. That is the difference between two products sharing a login and one product.",
        },
        { type: "visual", label: "Report creation step 2, adding expenses, linking a travel request, reconciling advances" },

        { type: "subheading", text: "03. Save with critical issues, the hardest call" },
        {
          type: "text",
          paragraphs: [
            "This was the decision I spent longest on, because both positions were defensible.",
            "**The tension.** If you block saving when an expense breaks policy, your data stays clean and finance never sees nonsense. But you also destroy the on the go use case, which was the entire point of the redesign, because a person in a taxi cannot resolve a policy violation.",
            "**The resolution** came from noticing that creation and submission happen in completely different environments. Creation happens in motion, in airports and between meetings. Submission happens at a desk, with time and context. Applying the same enforcement to both moments necessarily destroys one of them.",
            "**The decision.** Save freely during travel. Block report submission until every critical issue is resolved. Nothing reaches finance until submission anyway, so the data is only ever messy inside the user's own drafts.",
          ],
        },
        { type: "statement", tone: "blue", text: "The right friction belongs where the user can actually act on it." },

        { type: "subheading", text: "04. Two tier policy flagging" },
        {
          type: "text",
          paragraphs: [
            "That decision only works if the system can tell the difference between a real violation and a judgment call, which is what the two tiers do.",
            "**Critical.** Surfaced at creation, hard blocked at submission. Over limit amounts, missing documentation, out of policy categories. These are errors finance genuinely cannot process.",
            "**Warning.** Surfaced at creation, never blocked. Near limit spends, receipts that look altered, categories that need a note. The user is informed and the responsibility shifts to them.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "Enforcement severity matches issue severity, and every flag appears at the moment it can be acted on rather than weeks later.",
        },
        { type: "visual", label: "Critical state beside warning state on the expense form" },

        { type: "subheading", text: "05. The Tips panel" },
        {
          type: "text",
          paragraphs: [
            "This is the feature that came out of the client session, and it began life as something much smaller.",
            "It was originally a static prompt nudging users to try OCR. The insight about employees not knowing the rules turned it into a dynamic, category aware policy guide. The moment OCR identifies a receipt as a client meal, the panel surfaces the reimbursable limit for that category, the exclusions, and what documentation is required, all before the user hits save.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "Solves the absence of policy guidance. Policy awareness moved from reactive, a rejection three weeks later, to proactive, guidance at the moment of decision.",
        },
        { type: "visual", label: "Expense form with the live Tips panel" },
        { type: "visual", label: "Video: end to end employee user flow" },

        { type: "subheading", text: "Designing for four roles, where roles are relative" },
        {
          type: "text",
          paragraphs: [
            "Everything above is the employee's experience. The harder structural problem was the other three roles, and specifically the fact that they are not fixed identities.",
            "Hierarchy in an enterprise is recursive. An employee can be an approver for the people who report to them, and every approver is an employee to the approver above them. The same person switches roles depending on whose report they are looking at.",
            "So Employee and Approver do not get separate products. They share one dashboard, and approvers simply gain an additional My Approvals section.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "Capabilities layer onto a single interface instead of forking it, which is what keeps the system scalable as enterprises reshape their approval chains.",
        },
        {
          type: "text",
          paragraphs: [
            "The dashboard makes that literal. It splits into **Raised by You** and **To Be Approved by You**, so a manager sees both halves of their working life on one screen rather than switching modes or accounts.",
          ],
        },
        { type: "visual", label: "Employee and approver dashboard, Raised by You beside To Be Approved by You" },
        {
          type: "table",
          head: ["Role", "Built for"],
          rows: [
            ["Employee", "Every primary action within two taps of home, with inline coach marks for first time users"],
            [
              "Approver",
              "The same dashboard plus My Approvals. Decisions under time pressure, so flags are pre highlighted and comments can be left at individual expense level rather than only on the whole report",
            ],
            [
              "Financial Auditor",
              "Authority without clutter. Override approvals, skip levels, request re approvals, with aging claim prioritisation surfacing the oldest unresolved reports first",
            ],
            [
              "Admin",
              "Configures what everyone else uses. The governing principle: every admin change must be immediately legible in the employee facing UI, so configuration can be verified without waiting for a breakage report",
            ],
          ],
        },

        { type: "subheading", text: "Also in scope" },
        {
          type: "text",
          paragraphs: [
            "Beyond the core flows, the redesign covered mileage logging with map based route entry and a visible reimbursement calculation, advance requests as a guided two step flow with their own listing and detail views, category driven field defaults the user can override, duplicate expense detection, approval chain visibility showing who has approved and who is next, and a full audit trail with comments on every report.",
          ],
        },

        { type: "subheading", text: "The accountant dashboard" },
        {
          type: "text",
          paragraphs: [
            "Finance teams needed something different again. Not a queue of tasks but an answer to a question.",
            "The Organisation view is built around one thing: what does a finance lead need to know within 30 seconds of opening it. Net Booking Value, Policy Deviations, and Savings versus Missed Savings own the first row. Everything else lives behind tabs and filters.",
            "The approval queue beneath it carries the actions a finance team actually needs, including **assign to self** and **release assignment**, because in a shared queue the first problem is not deciding, it is knowing who owns what.",
          ],
        },
        { type: "visual", label: "Q2T Reports Corner, organisation tab, and the approval queue beneath it" },
        {
          type: "statement",
          tone: "blue",
          label: "Beyond handoff",
          text: "The dev team were building the dashboard graphs in Recharts. Rather than writing a spec and hoping the output matched, I worked directly in the library they had already chosen, altering the configurations myself: colour tokens, corner radii, sizing and styling props, adjusted until the charts rendered exactly as designed. I handed over the configured code rather than a description of it. Complex visualisations usually get simplified in implementation. These did not.",
        },
      ],
    },

    {
      id: "outcome",
      nav: "Outcome",
      number: "05",
      title: "Part live, part handed over",
      blocks: [
        { type: "subheading", text: "What shipped" },
        {
          type: "text",
          lead: true,
          paragraphs: [
            "The hygiene pass went live to production early in the project, which means real fixes were in front of real clients while the redesign was still being built.",
          ],
        },
        {
          type: "text",
          paragraphs: [
            "By the time I left, standalone expense creation was developed and the Reports dashboard was fully developed, with the remaining modules in active development against a complete documented handoff. Every flow, edge case and screen state was walked through with the dev team in person, supported by flow diagrams for each module.",
          ],
        },
        {
          type: "table",
          head: ["Before", "After"],
          rows: [
            [
              "Four sequential steps to log one expense, desktop required",
              "Four steps to one. Standalone OCR capture, designed to a sub 30 second target and hit consistently in live client demos",
            ],
            ["On the go filing architecturally impossible", "Feasible by design"],
            [
              "Zero policy guidance, violations discovered weeks later",
              "Category specific limits surface the moment OCR reads the receipt",
            ],
            ["Flags appeared only at submission, too late to act on", "Both tiers surface at creation and reappear at review"],
            ["Visualisation handoff via written specs", "1:1 fidelity. I configured the Recharts code myself and handed it over"],
          ],
        },
        {
          type: "text",
          paragraphs: [
            "**Validated** in prototype reviews by contacts at Adani, Toyota and Dr. Reddy's, the same clients who had flagged the legacy system as a blocker in the first place.",
            "**Accessibility.** I ran the primary colours, CTAs, flag indicators and body text through Adobe's Color Contrast Analyzer against WCAG 2.1 AA and AAA thresholds and adjusted the palette where they fell short. It matters more than usual here, because the enterprise user base skews senior in age. I also pushed for dark mode, though it never got past discussion.",
            "**Recognition.** Employee of the Quarter, twice.",
          ],
        },
        {
          // The same photograph the home page's experience section uses.
          type: "visual",
          label: "Award photo",
          images: [
            {
              src: "/images/experience/employee-of-the-quarter.jpg",
              alt: "Sudhanshu receiving the Employee of the Quarter certificate at Quest2Travel",
              caption: "Employee of the Quarter",
              width: 3120,
              height: 4160,
            },
          ],
        },

        { type: "subheading", text: "How I would measure it" },
        {
          type: "text",
          paragraphs: [
            "I left before launch metrics could accrue, so I cannot claim outcomes. What I can say is which four numbers I designed toward and would pull first, because defining them was part of the design work rather than an afterthought.",
          ],
        },
        {
          type: "table",
          head: ["Metric", "What it tests"],
          rows: [
            ["Expense module adoption across travel clients", "The lock in thesis. Is the bundle finally complete"],
            [
              "Expenses logged within 24 hours of spend",
              "The on the go signal. Is capture happening same day rather than at end of trip",
            ],
            [
              "First submission rejection rate",
              "The Tips panel and the flagging. Is guidance at the point of entry actually working",
            ],
            ["Time to reimbursement", "The full pipeline. Are approvers and auditors receiving clean, pre flagged reports"],
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
      intro:
        "The Tips panel became one of the most impactful features in the redesign, and it was discovered in a prototype session in month eight rather than in research in week one.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "That timing is the specific thing I would change. Because I did not own the research process from the start, a feature that changed how employees understand reimbursement policy was retrofitted onto a form that already existed rather than shaping the information architecture from the beginning. The panel works. Had the insight surfaced in month one, it would have shaped how the entire expense form was structured.",
            "The pace played a part. There was no formal deadline, but the culture was ship as soon as possible, and I inherited the research rather than owning it. My conversations with colleagues were an attempt to close that gap within the constraints I had. Real input, honestly gathered, but not the structured research this product deserved.",
            "**If I ran this again**, I would conduct user interviews personally before any design work begins, with actual travelling employees rather than only the buyers who administer their expenses. And I would include the support team, who hold the most unfiltered picture of where a product fails, because they hear about it first.",
          ],
        },

        { type: "subheading", text: "What this project taught me" },
        {
          type: "list",
          items: [
            "**Design for the ecosystem, not just the screen.** The most important decision in the project came from studying the product users already knew, not from studying competitors.",
            "**Context determines where constraints belong.** The same enforcement applied at the wrong moment destroys the use case it was meant to protect.",
            "**The best insights come from being in the room.** The one that mattered most could not have come from a document. Build the sessions that create those moments rather than waiting for them to happen.",
            "**Constraints are design direction in disguise.** Every hard limit in this project produced a cleaner solution than the unconstrained default would have.",
          ],
        },

        { type: "signoff", text: "Sudhanshu Kadu · Sole Product Designer · Quest2Travel by MakeMyTrip" },
      ],
    },
  ],
};
