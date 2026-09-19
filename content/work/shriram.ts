import type { CaseStudy } from "@/components/work/CaseStudyPage";

// Shriram Life Insurance case study copy. Source: Downloads/Shriram_Case_Study_v4.md, with the
// em dashes rewritten to match the site's voice. Lives at /work/shriram-life-insurance, the link
// on the home page's Featured Work card. TODO: every visual is a placeholder until the screens
// are exported.

export const shriram: CaseStudy = {
  slug: "shriram-life-insurance",
  theme: "yellow",
  meta: {
    title: "Shriram Life Insurance, payment and verification",
    description:
      "Rebuilding the payment and verification journeys of Shriram Life Insurance, and the design system underneath them.",
  },

  hero: {
    backLink: { label: "All work", href: "/#work" },
    tag: "Case study",
    title: "Insurance is a promise. The interface has to keep it.",
    subtitle:
      "Rebuilding the payment and verification journeys of Shriram Life Insurance, and the design system underneath them.",
    facts: [
      { label: "Role", value: "Product Designer" },
      { label: "Client", value: "Shriram Life Insurance, via Schbang" },
      { label: "Duration", value: "March to June 2026" },
      { label: "Platform", value: "Responsive web, mobile-first" },
    ],
    visual: "Quick Pay: mobile number and OTP to payment, desktop and mobile",
  },

  sections: [
    {
      id: "summary",
      nav: "Summary",
      title: "The 90-second version",
      intro: "Everything that matters, before you decide to read on. The full case study follows.",
      blocks: [
        {
          type: "cards",
          items: [
            {
              label: "The brief",
              tone: "tint",
              text: "Schbang's CRO team ran the analysis that defined the engagement. The problem wasn't traffic: the site draws over 450,000 sessions a month, 83% of organic traffic arriving through blogs. The problem was everything downstream. The **single largest drop-off in the entire payment funnel** sat at its very first step: a form asking for a policy number and date of birth.",
            },
            {
              label: "The diagnosis",
              tone: "tint",
              text: "The leakage wasn't only a usability problem. On the surfaces where users hand over money and identity, it was a **confidence** problem: an interface that asked for trust before it had earned any.",
            },
          ],
        },
        {
          type: "text",
          label: "What I owned",
          paragraphs: [
            "Two designers split the account; each of us owned our streams end to end. Mine: the complete design system, the Quick Pay payment flow, the KYC and Bank Update verification flows, the blog detail template, and eight financial calculators.",
          ],
        },
        {
          type: "numbered",
          label: "The decisions",
          items: [
            {
              title: "Removed the blocking field",
              text: "Mobile number and OTP replaced policy number and date of birth as the primary path into Quick Pay: the exact field carrying the funnel's largest drop-off.",
            },
            {
              title: "One decision point, not three",
              text: "The old flow scattered three separate \"proceed\" actions across three screens plus a mid-flow browser popup. The new flow has one, at the end, with the amount in the button.",
            },
            {
              title: "Designed the failure paths as first-class journeys",
              text: "KYC has a 3-step happy path and three distinct failure branches (expired OTP, max attempts, name mismatch), each with its own message and its own next action.",
            },
            {
              title: "Added a rider cross-sell moment",
              text: "Unprompted, because riders are a major revenue line. Placed after the details are confirmed, before the CTA, with a visible Skip so it never blocks a payment.",
            },
            {
              title: "Built the design system from scratch",
              text: "Five atomic levels and a palette derived from the brand's own logo colour, now the single source of truth for designers and developers.",
            },
          ],
        },
        {
          type: "cards",
          items: [
            {
              label: "What shipped",
              tone: "blue",
              text: "The blog detail template, the page type carrying 83% of organic traffic, went live along with the calculators. Quick Pay and the KYC flows were in development when the engagement ended on 26 June 2026.",
            },
            {
              label: "What I'd change",
              tone: "ink",
              text: "Front-end capability shaped the output more than I'd have liked. Next time I'd establish that ceiling in week one and design to it deliberately, instead of discovering it mid-delivery.",
            },
          ],
        },
      ],
    },

    {
      id: "context",
      nav: "Context",
      number: "01",
      title: "An established insurer, a mobile audience",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Shriram Life Insurance is an established private life insurer in India and part of the Shriram Group, selling protection, savings, retirement and ULIP products through a website that handles over 450,000 sessions a month.",
            "Schbang was engaged as the creative and technology partner. I joined the account as a product designer alongside one other designer. We split the work and each owned our streams end to end: there was no shared canvas and no ambiguity about who decided what.",
          ],
        },
        {
          type: "stats",
          items: [
            { figure: "450K+", caption: "Sessions a month" },
            { figure: "85.9%", caption: "Of users on mobile" },
            { figure: "83%", caption: "Of organic traffic arrives through blogs" },
          ],
        },
        {
          type: "table",
          label: "My scope",
          head: ["Stream", "What it covers"],
          rows: [
            ["Design system", "Built from scratch, tokens through templates, now the single source of truth"],
            ["Quick Pay", "The full premium payment flow, desktop and mobile, including failure and no-dues states"],
            [
              "KYC & Bank Update",
              "e-KYC verification with all failure branches, plus the bank account update flow that reuses the same pattern",
            ],
            ["Blog detail template", "The page type carrying 83% of the site's organic traffic"],
            ["Calculators", "Eight financial calculators and the template routing their results toward relevant plans"],
          ],
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: [
            "The client's own development team built the work. We ran regular sessions with them explaining the UI and supporting handoff, and met client stakeholders throughout.",
          ],
        },
      ],
    },

    {
      id: "brief",
      nav: "Brief",
      number: "02",
      title: "A conversion problem, not a traffic problem",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "The engagement didn't start with a design request. It started with **an analysis run by Schbang's own CRO team**: the account had analysts working the funnel data alongside the design streams, so the brief I designed against came from measured behaviour rather than opinion or a client wishlist.",
            "The top of the funnel was working. Blogs alone drove 83% of organic traffic. What wasn't working was everything below it, specifically the transactional surfaces where a visitor stops reading and starts *doing*.",
            "Quick Pay, the tool existing policyholders use to pay their premiums, was the **highest-volume transactional surface on the site**, used by more people each month than the entire new-policy purchase journey. And its **single largest point of loss was its first screen**: a form asking for a policy number and date of birth, before anything else could happen.",
          ],
        },
        {
          type: "statement",
          text: "A drop-off that big, that early, isn't a flow problem spread across a journey. It's one field.",
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: [
            "The analysis also showed payment failure was a frequent enough outcome to need a designed recovery path, not a dead end.",
            "That was the brief: find where people give up, and fix the specific thing making them give up.",
          ],
        },
      ],
    },

    {
      id: "diagnosis",
      nav: "Diagnosis",
      number: "03",
      title: "A confidence problem wearing a usability costume",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "The obvious read on a first-step drop-off that size is friction: too many fields, bad layout, fix the form. But that reading doesn't explain the *shape* of the loss across the funnel: people leaving at identity verification, at payment, at the exact moments where nothing is wrong with the interface mechanically.",
            "My read: on these surfaces, **users weren't only struggling, they were hesitating.** Insurance is a promise you can't inspect. The interface is the only evidence a customer has that the promise is real. When a screen asks for an Aadhaar number and gives nothing back, or a payment fails with no explanation of what happened to the money, the friction isn't cognitive. It's a confidence failure.",
            "That framing unified the work. Every surface I owned sits at a moment where trust is actively being tested, and underneath all of them, the design system builds trust through consistency, so that everything behaves like one company.",
          ],
        },
        {
          type: "cards",
          columns: 3,
          items: [
            { label: "Quick Pay", title: "Trust under transaction", text: "*Will my money arrive where it should?*" },
            { label: "KYC and Bank Update", title: "Trust under failure", text: "*What happens when the system says no to my identity?*" },
            { label: "Blog detail pages", title: "Trust before commitment", text: "*Should I believe what I'm reading?*" },
          ],
        },
        {
          type: "statement",
          tone: "blue",
          label: "The hypothesis for the biggest leak",
          text: "People weren't confused. They didn't have the policy number to hand. It lives in a document in a drawer; a mobile number lives in the pocket of the person trying to pay.",
        },
      ],
    },

    {
      id: "quick-pay",
      nav: "Quick Pay",
      number: "04",
      title: "Quick Pay, the anchor",
      blocks: [
        { type: "subheading", text: "The old flow" },
        {
          type: "flow",
          label: "Three screens, three proceed actions, one interruption",
          steps: [
            "Policy number + DOB",
            "Dense two-panel payment table",
            "Expanded form: mobile, email, WhatsApp consent",
            "Browser popup if WhatsApp = Yes",
            "Pay now",
          ],
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: [
            "Three chances to reconsider, one interruption that throws the user out of their own transaction, and a data-dense table designed for a desktop that 85.9% of users weren't using.",
          ],
        },

        { type: "subheading", text: "Decision 1: remove the blocking field" },
        {
          type: "text",
          paragraphs: [
            "Mobile number and OTP became the primary path in, with policy number kept as a secondary tab for people who have it.",
            "This isn't a convenience upgrade. It targets the exact field carrying the largest loss in the funnel. Everything else on that page could have been polished and the blocker would still have been there: the fix had to remove the requirement, not decorate around it.",
            "Because the number is now the identifier, the flow gains a step it didn't have before: **Select Policy**, shown only when several policies are linked, and deliberately scoped (*\"We're only showing policies with unpaid renewal dues\"*) so a user paying one premium isn't made to read their entire portfolio.",
          ],
        },
        { type: "visual", label: "Login, OTP, verified, Select Policy" },

        { type: "subheading", text: "Decision 2: one decision point, not three" },
        {
          type: "text",
          paragraphs: [
            "The screen count went *up*, not down. I'm stating that plainly because the honest claim isn't \"fewer steps\": **three separate proceed actions became one**, at the end, with the amount printed in the button, and the mid-flow popup was removed entirely.",
          ],
        },
        {
          type: "statement",
          text: "Steps are cheap when each one does a single clear thing. Decision points are expensive. A longer flow with one decision beats a shorter one with three.",
        },

        { type: "subheading", text: "Decision 3: make the money legible" },
        {
          type: "text",
          paragraphs: [
            "The old two-panel table became one policy summary plus an **installment-level breakdown**: each installment expandable, tagged **Overdue / Due / Upcoming**, showing premium, late fee (GST included) and net payable separately, with multiple installments selectable and a running total.",
            "Late fees are the most common reason a payment amount surprises someone. Hiding them inside a total is how a payment becomes a support call. Showing them itemised means the number in the CTA is never a shock.",
          ],
        },
        { type: "visual", label: "Payment details and installment breakdown" },

        { type: "subheading", text: "Decision 4: the rider moment" },
        {
          type: "text",
          paragraphs: [
            "**This wasn't briefed. I proposed it.** Riders are a significant revenue line for the business, and the payment flow is the one moment a policyholder is already thinking about their cover. So I added a dedicated rider step, gated so it can never cost a payment.",
          ],
        },
        {
          type: "list",
          tone: "tint",
          items: [
            "**After** the details are confirmed, **before** the final CTA",
            "Social proof at the point of decision: *\"Added by 80% of customers\"*",
            "The exact price delta stated (*\"+₹1,199/year\"*), never buried in a recalculated total",
            "A visible **Skip**, always",
          ],
        },
        { type: "visual", label: "Rider step" },

        { type: "subheading", text: "Decision 5: designing the outcomes" },
        {
          type: "text",
          paragraphs: [
            "Payments were routed through an external gateway, so failure was a real and frequent outcome outside our control. Failure states are usually where design attention runs out. Here they're where the trust thesis pays off.",
          ],
        },
        {
          type: "cards",
          columns: 3,
          items: [
            {
              label: "Failure",
              text: "\"Payment Couldn't Be Completed\", with the one sentence people need: *any deducted amount will be refunded to your bank account.* Then Retry Payment and Contact Support. The real question after a failed payment isn't \"what went wrong\", it's \"where is my money\".",
            },
            {
              label: "Success",
              text: "Amount, policy number, confirmation the policy remains In Force, next due date, and a downloadable receipt.",
            },
            {
              label: "All dues cleared",
              text: "A state whose whole job is to say you need to do nothing: policy active, no action needed, next installment date, and **Remind Me** instead of a CTA. Not every screen in a payment flow should be trying to take a payment.",
            },
          ],
        },
        { type: "visual", label: "Success, failure and all dues cleared" },
      ],
    },

    {
      id: "kyc",
      nav: "KYC",
      number: "05",
      title: "Designing for the paths that fail",
      intro:
        "The KYC and Bank Update flows are where the work got structurally hardest, because here the rules aren't mine and the failures aren't edge cases.",
      blocks: [
        { type: "subheading", text: "The happy path is the small part" },
        {
          type: "flow",
          label: "Three steps",
          steps: [
            "KYC details: policy, KYC type, beneficiary, DOB, Aadhaar",
            "OTP to the Aadhaar-linked mobile",
            "Verified, with date and reference ID",
          ],
        },
        {
          type: "table",
          label: "Then reality: three failure branches, each its own journey",
          head: ["Failure", "Why it's different", "What the user gets"],
          rows: [
            [
              "OTP expired / invalid",
              "A retry problem: the user can fix it now",
              "\"We couldn't verify your details\" and **Retry Verification**",
            ],
            ["Max attempts reached", "A lockout: retrying isn't available", "A cool-down message, with no false retry"],
            [
              "Name mismatch",
              "A data problem no retry can solve",
              "Routed into **document upload**: Aadhaar front and back, each with its own Pending / Uploaded status, then **KYC Status: Under Review**",
            ],
          ],
        },
        {
          type: "statement",
          text: "An expired OTP, a lockout and a name mismatch are three different problems. Collapsing them into one \"Something went wrong\" strands people, because the right next step is different in each case.",
        },
        { type: "visual", label: "The three failure branches" },

        { type: "subheading", text: "Working inside constraints I couldn't design away" },
        {
          type: "text",
          paragraphs: [
            "The Aadhaar-linked OTP, the two-attempt limit, the mandatory document fallback when e-KYC fails, and the two-business-day manual review window are all **regulatory requirements**, not product choices. None of them could be simplified. So the job wasn't reducing steps. It was making fixed constraints feel legible rather than arbitrary.",
          ],
        },
        {
          type: "list",
          tone: "tint",
          items: [
            "**Set expectations before the flow starts:** *\"Please keep your Aadhaar-linked mobile number handy\"*, so nobody discovers the requirement halfway through",
            "**Show the constraint instead of hiding it:** *\"0 of 2 Attempts Left.\"* A limit you can see feels like a rule; one you hit invisibly feels like a punishment",
            "**Per-document status, not a bulk upload:** Aadhaar front and back verify independently, each with its own state",
            "**Hold async states honestly:** \"Under Review\" with a stated two-day window, so waiting reads as progress",
            "**Auto-redirect countdowns** on transitional screens, with a manual link, so momentum never depends on guessing what's next",
          ],
        },

        { type: "subheading", text: "Built once, used twice" },
        {
          type: "text",
          paragraphs: [
            "KYC and Bank Update are different tasks with the same shape: verify by OTP, fail, upload documents, wait for review. I designed the branching as **one reusable pattern across both flows** rather than two bespoke solutions.",
            "For the user, a returning policyholder never re-learns a mental model for a task they've already done once. For the business, the next verification flow that needs building already has its pattern.",
          ],
        },
        { type: "visual", label: "The shared pattern across KYC and Bank Update" },
      ],
    },

    {
      id: "blog",
      nav: "Blog",
      number: "06",
      title: "The blog detail page, where 83% of the traffic lands",
      intro:
        "Every other surface here sits at the bottom of the funnel. This one sits at the top, and it's the highest-leverage page type on the site.",
      blocks: [
        { type: "subheading", text: "The old template" },
        {
          type: "text",
          paragraphs: [
            "A plain content page: hero image, body copy, a table of contents, and a single generic *\"Get a Call Back\"* form parked in the sidebar. No author, no reviewer, no credibility signals, no multimedia, and one ask at the edge of the page, easy to scroll past.",
            "The structural problem: it treated the reader as an audience rather than a prospect. Someone reading 2,000 words on wealth tax has declared their interest, and the page did almost nothing with that.",
          ],
        },
        {
          type: "table",
          label: "Page anatomy, before and after",
          head: ["", "Old template", "New template"],
          rows: [
            [
              "Credibility",
              "None",
              "Author and reviewer attribution; a trust bar (20+ yrs, 9 Cr+ lives, 98.31% claims settled)",
            ],
            ["Content access", "Body copy only", "Table of contents; a \"Listen to this article\" audio player"],
            ["Asks inside the content", "None", "Calculator module, plan banner, video, featured plan card with Buy Now"],
            [
              "Asks at the edge",
              "One generic \"Get a Call Back\" form",
              "Plans worth exploring (with price framing), People also read, topics, a cleaner lead form",
            ],
            ["Reader treated as", "An audience", "A prospect with a declared interest"],
          ],
        },

        { type: "subheading", text: "Credibility before conversion" },
        {
          type: "list",
          items: [
            "**Author and reviewer attribution**, with names and photographs. Financial advice with nobody's name on it is advice nobody has to stand behind",
            "**A trust bar high on the page:** 20+ years, 9 Cr+ lives covered, 98.31% claims settled. Claims settlement ratio is the number Indian insurance buyers check, so it's stated, not buried in a footer",
            "**\"Listen to this article\"**, a full audio player with scrubbing and speed control, for a mostly mobile audience served in four languages",
            "**\"In this article\"**, a table of contents that lets people jump to the answer they came for",
          ],
        },

        { type: "subheading", text: "An escalating ladder of asks, inside the content" },
        {
          type: "table",
          head: ["Depth", "The ask", "Commitment"],
          rows: [
            ["Early", "**Salary calculator module**: \"Calculate your in-hand salary\"", "None. A tool, not a pitch"],
            ["Middle", "**\"Secure your family's future\"** banner, then View Plans", "Browse"],
            ["Middle", "**Video embed**", "None. Keeps the reader on the page"],
            ["Late", "**Featured plan card**: ₹50 lakh payout, premiums under ₹500, **Buy Now**", "A purchase"],
          ],
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: [
            "Leading with a calculator rather than a buy button is the whole point. A reader two paragraphs in isn't ready to purchase, but they will use a free tool, and the person who calculates is a warmer prospect by the time the plan card arrives.",
            "The sidebar follows the same logic: **Plans worth exploring** with live price framing (\"From ₹15/day life cover\"), **People also read**, trending searches, topic accordions and a cleaner lead form.",
          ],
        },
        { type: "visual", label: "New blog detail template, full page" },
        { type: "visual", label: "Inline modules: calculator, banner, featured plan card" },
        {
          type: "statement",
          tone: "blue",
          text: "This one shipped. The blog template is now the conversion surface for the majority of the site's organic traffic.",
        },
      ],
    },

    {
      id: "design-system",
      nav: "Design system",
      number: "07",
      title: "The design system: how one designer shipped this much",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Four months. A payment flow, two verification flows with full failure branching, a blog template, eight calculators, desktop and mobile throughout. That volume is only possible on a foundation, and none existed.",
          ],
        },
        {
          type: "table",
          label: "Built from scratch, across five levels",
          head: ["Level", "Contents"],
          rows: [
            ["Design tokens", "Colour, type scale, spacing, grid, indentation, corner radius"],
            ["Atoms", "Buttons, input fields, icons"],
            ["Molecules", "Accordions, tooltips, popups"],
            ["Organisms", "Navbar, footer, UI cards, navigation"],
            ["Templates", "Calculator template built; further categories in progress"],
          ],
        },
        {
          type: "cards",
          columns: 3,
          items: [
            {
              label: "Derived, not borrowed",
              text: "Shriram is protective of its identity, so the full shade range was derived from the brand's own primary logo colour: the system extends the brand rather than sitting beside it.",
            },
            {
              label: "Paired type scale",
              text: "Gilmer, with every level defined for desktop and mobile: Heading 1 at 52/64 on desktop with its mobile counterpart, down through body and label styles at 16/26 and 12/20.",
            },
            {
              label: "Audited before replaced",
              text: "The legacy styles were mapped and tested against the new scale, so adoption was a migration with a known path, not a demand that everyone start over.",
            },
          ],
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: [
            "Unlike my previous project, tokens here weren't mapped to a utility framework: the development team hadn't standardised on one, which left the system free to be defined on its own terms. It is now the single source of truth for both designers and the development team.",
          ],
        },
        { type: "visual", label: "Design system: tokens, levels and type scale" },
      ],
    },

    {
      id: "surfaces",
      nav: "Surfaces",
      number: "08",
      title: "Supporting surfaces",
      blocks: [
        { type: "subheading", text: "Calculators: turning a utility into a route" },
        {
          type: "text",
          paragraphs: [
            "Eight calculators: SSY, PPF, EPF, Gratuity, FD, Simple Interest, Lumpsum and Pension. A calculator is a high-intent moment disguised as a utility. Someone modelling their daughter's Sukanya Samriddhi maturity in 2047 is, by definition, thinking about long-term financial security, and the old pages let them calculate, then leave.",
            "The template pairs each result with a route. Beneath the maturity breakdown sits a plan recommendation framed against the same horizon the user just modelled (*\"a total investment of ₹7.5 lakh can translate into benefits worth ₹14.51 lakh\"*), then supporting content, a comparison table, related calculators and FAQs. The **plan card** is its own conversion unit, tracked as its own event.",
          ],
        },
        {
          type: "text",
          tone: "tint",
          label: "The trade-off, stated honestly",
          paragraphs: [
            "The calculator-to-plan mapping is hard-coded, one fixed plan per calculator, not a dynamic engine choosing on input values. That was a deliberate scope call against a short deadline: a reliable shipped route beats an ambitious unshipped one. The dynamic version is the obvious next iteration.",
          ],
        },
        { type: "visual", label: "Calculator result to plan route" },
        {
          type: "list",
          label: "Also delivered",
          items: ["Campaign page template", "Term insurance plan page template", "Campaign banners"],
        },
      ],
    },

    {
      id: "status",
      nav: "Status",
      number: "09",
      title: "Where it stands",
      blocks: [
        {
          type: "table",
          head: ["Stream", "Where it stands"],
          rows: [
            ["Blog detail pages", "Live"],
            ["Calculators", "Live"],
            ["Design system", "In use, the single source of truth for designers and developers"],
            ["Quick Pay", "In development at the end of the engagement"],
            ["KYC & Bank Update", "In development at the end of the engagement"],
          ],
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: [
            "The engagement ended on 26 June 2026. The client responded positively to the work throughout, and the CRO figures quoted here are the **baseline** our analysts measured before the redesign: the before state, not a result.",
          ],
        },
        {
          type: "list",
          label: "How I'd measure it",
          items: [
            "**First-step abandonment** in Quick Pay, the specific blocker OTP login removes",
            "Completion rate through to payment success",
            "KYC completion split by branch: how many recover via document upload rather than abandoning",
            "Blog-to-lead conversion on the new template against the old",
          ],
        },
      ],
    },

    {
      id: "reflection",
      nav: "Reflection",
      number: "10",
      title: "Reflection",
      blocks: [
        {
          type: "cards",
          items: [
            {
              label: "What I'd fix first, given the data",
              text: "Remove the requirement to know your policy number, which is what the redesign does. Of every change made, it's the one aimed squarely at the largest measured leak, and the one I'd defend first.",
            },
            {
              label: "What I pushed back on",
              text: "I argued with the client to cut steps out of the payment flow, because every extra step is a place to lose someone, and the drop-off data backed the argument rather than my opinion. They agreed, and the flow was consolidated.",
            },
            {
              label: "What got compromised",
              tone: "tint",
              text: "Front-end capability constrained the output. The team needed flattened image exports rather than reading values from Figma, and struggled with complex layouts, so layouts were simplified more than I'd have chosen, to protect delivery.",
            },
            {
              label: "What I'd do differently",
              tone: "tint",
              text: "I found the ceiling mid-delivery instead of at the start. Next time I run a technical capability check in week one (what the team can build, how they consume design, what handoff means to them) and design against that ceiling deliberately.",
            },
          ],
        },
        {
          type: "list",
          label: "What this project taught me",
          items: [
            "**Find the blocking field, not the bad page.** The funnel's largest drop-off had one specific cause. Polishing the page around it would have changed nothing",
            "**Count decisions, not screens.** Shorter isn't better; fewer chances to reconsider is",
            "**Failure states are the product.** In regulated flows, most people meeting a failure branch are ordinary users with an unusual name or an expired code. They deserve a designed path, not an apology",
            "**Constraints you can't remove, you make legible.** \"0 of 2 Attempts Left\" doesn't remove the limit. It turns an arbitrary wall into an understandable rule",
          ],
        },
      ],
    },
  ],
};
