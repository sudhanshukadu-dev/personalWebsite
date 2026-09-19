import type { CaseStudy } from "@/components/work/CaseStudyPage";

// Knode case study copy. Source: Downloads/Knode_Case_Study (1).md. Lives at /work/knode, the
// link on the home page's Featured Work card. TODO: every visual is a placeholder until the
// screens are exported.

export const knode: CaseStudy = {
  slug: "knode",
  theme: "purple",
  meta: {
    title: "Knode, team availability",
    description:
      "Designing Knode: turning scattered team availability into confident staffing decisions. Built solo in two weeks, live for a team of 12.",
  },

  hero: {
    backLink: { label: "All work", href: "/#work" },
    tag: "Case study",
    title: "Designing Knode",
    subtitle: "Turning scattered team availability into confident staffing decisions.",
    facts: [
      { label: "Role", value: "Solo, from problem framing to build" },
      { label: "Type", value: "Self-initiated, for my own team" },
      { label: "Timeline", value: "Two weeks to the first version" },
      { label: "Status", value: "Live, used by a team of 12" },
    ],
    visual: "Who's Available? view: a date range selected, the team grouped by state",
  },

  sections: [
    {
      id: "summary",
      nav: "Summary",
      title: "The 90-second version",
      intro: "Everything that matters, before you decide to read on. The full case study follows.",
      blocks: [
        {
          type: "statement",
          tone: "blue",
          text: "Knode is a team availability platform that helps agencies and project-based teams instantly understand who is available, who isn't, and who can take on the next project.",
        },
        {
          type: "stats",
          items: [
            { figure: "2 wks", caption: "From problem to shipped first version" },
            { figure: "12", caption: "People using it daily" },
            { figure: "1", caption: "Spreadsheet retired" },
          ],
        },
        {
          type: "flow",
          label: "The story in one line",
          steps: [
            "Fragmented information",
            "A coordination problem",
            "One simple availability layer",
            "Knode, connected to Slack",
            "Adopted by the team",
          ],
        },
        {
          type: "numbered",
          label: "The decisions",
          items: [
            {
              title: "Slack as the primary input surface",
              text: "People already say where they'll be. Knode reads the message and updates the record, with two-way sync so the surfaces never disagree.",
            },
            {
              title: "Custom states, defined by the team",
              text: "Binary availability lies. Teams create the states they actually use, and each carries an availability meaning underneath.",
            },
            {
              title: "\"Who's Available?\" as its own view",
              text: "The calendar is where you contribute. The decision view is where you decide. Collapsing them would have lost the decision.",
            },
          ],
        },
      ],
    },

    {
      id: "origin",
      nav: "Origin",
      number: "01",
      title: "Where this started",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "My team ran on a shared Excel file called the leave tracker. Everyone's leave went into it, and staffing decisions came out of it.",
            "It worked in the sense that the information was technically in one place. It failed in every way that mattered at the moment someone needed an answer: it was only current if people remembered to update it, reading it meant scanning rows and dates to work out something a manager could have asked out loud in five seconds, and it answered the wrong question.",
          ],
        },
        {
          type: "statement",
          text: "It recorded who was on leave. Nobody ever wanted to know who was on leave. They wanted to know who could take the next piece of work.",
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: ["That gap between what the sheet stored and what people were trying to find out became the product."],
        },
      ],
    },

    {
      id: "why",
      nav: "Why it matters",
      number: "02",
      title: "Why this problem is worth solving",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "In an agency, profit is a function of utilisation. Every hour of billable capacity that sits idle because nobody knew it was free is margin lost. Every project handed to someone already at capacity becomes a delivery risk that costs more to fix than it earned.",
            "Availability is not an administrative detail. It's the input to the single most repeated decision an agency makes, weekly and sometimes daily, across every account. And that input lives in the least reliable place possible: someone's memory, a side conversation, and a spreadsheet that was last accurate two weeks ago.",
          ],
        },
        { type: "statement", tone: "blue", text: "Who takes the next piece of work?" },
        {
          type: "text",
          tone: "tint",
          paragraphs: ["Knode was built to fix the input, not the decision."],
        },
      ],
    },

    {
      id: "problem",
      nav: "Problem",
      number: "03",
      title: "The information exists. It just isn't visible.",
      blocks: [
        {
          type: "cards",
          items: [
            {
              label: "Availability lives in five places at once",
              points: ["Excel and Google Sheets", "Slack messages", "Leave management systems", "Personal conversations", "Team calendars"],
            },
            {
              label: "The cost compounds quietly",
              points: [
                "Repeated coordination messages that interrupt everyone",
                "Time lost searching for information that already exists",
                "Data that is stale by the time it's read",
                "Staffing decisions made on uncertainty",
                "A dependency on the two or three people who know where everyone is",
              ],
            },
          ],
        },
        {
          type: "text",
          paragraphs: [
            "So a project manager asking \"who is available tomorrow?\" has to check several systems or message several people, and still works from an answer they aren't fully confident in.",
          ],
        },
        {
          type: "statement",
          label: "The reframe",
          text: "Teams aren't missing the information. It simply isn't visible or actionable at the moment the decision is made.",
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: [
            "That moved the problem from data collection to data legibility, and it changed what the product needed to be.",
          ],
        },
      ],
    },

    {
      id: "challenge",
      nav: "Challenge",
      number: "04",
      title: "The design challenge",
      blocks: [
        {
          type: "statement",
          tone: "blue",
          text: "How might we make team availability understandable and actionable at a glance?",
        },
        {
          type: "text",
          paragraphs: [
            "The obvious answer is a calendar. The obvious answer is also wrong, or at least incomplete. **A calendar tells you what happened. A staffing decision needs to know what is possible.**",
            "Most tools in this space build the record and stop there, leaving the user to interpret it: scanning rows, cross-referencing dates, mentally filtering out who's on leave. That interpretation is exactly where the friction lives, and exactly what the leave tracker made my team do every week.",
            "So the central problem wasn't displaying availability. It was **turning availability data into a decision.**",
          ],
        },
      ],
    },

    {
      id: "users",
      nav: "Users",
      number: "05",
      title: "Users, and the tension between them",
      blocks: [
        {
          type: "cards",
          items: [
            {
              label: "Primary: project managers and team leads",
              text: "They arrive with a decision in hand and need capacity clarity fast.",
              points: [
                "Who is available today?",
                "Who can pick up a new project?",
                "Who is unavailable next week?",
                "Who is remote, and who is only partly free?",
              ],
            },
            {
              label: "Secondary: team members",
              text: "They aren't trying to use a product. They're trying to stop answering the same question five times a week, in the words they already use.",
              points: ["Available", "Work from home", "Leave", "Half day", "Client onsite"],
            },
          ],
        },
        {
          type: "statement",
          label: "The tension",
          text: "Leads need complete, current data. Members will only supply it if the effort is close to zero.",
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: [
            "This is the failure mode that kills internal tools, and exactly what happened to the spreadsheet. If logging status feels like admin, people stop doing it, the data goes stale, leads stop trusting it, and the tool quietly dies while still technically working.",
            "**Design consequence:** input cost had to be near zero, and that single constraint drove the most important decision in Knode.",
          ],
        },
      ],
    },

    {
      id: "decisions",
      nav: "Decisions",
      number: "06",
      title: "Product decisions",
      blocks: [
        { type: "subheading", text: "1. Slack as the primary input surface" },
        {
          type: "text",
          paragraphs: [
            "Rather than asking people to open a tool to record something they were already saying out loud, Knode meets them where the message is being written. A team member types \"I'll be working from home tomorrow\" in Slack; Knode interprets it and updates the record.",
            "The sync runs both ways, so a status changed in Knode is reflected back in Slack. The two surfaces never disagree, which matters: the moment someone sees stale data about themselves, they stop trusting the system.",
          ],
        },
        {
          type: "text",
          tone: "tint",
          label: "Trade-off accepted",
          paragraphs: [
            "Interpreting natural language introduces ambiguity and needs confirmation states for anything uncertain. That complexity was worth absorbing on the product side to keep the user's effort close to nothing.",
          ],
        },
        { type: "visual", label: "Slack: message sent, status parsed, confirmed, record updated" },

        { type: "subheading", text: "2. Custom states, defined by the team using them" },
        {
          type: "text",
          paragraphs: [
            "**Binary availability lies.** \"Available or not\" collapses a half day, a client onsite day and a remote day into answers that are technically true and practically useless. A lead giving a full day of work to someone marked available who's on a half day has made a worse decision than if they'd asked.",
            "The fix isn't a longer fixed list. Every team has its own vocabulary, and a fixed taxonomy forces people to pick the closest wrong option. A slightly wrong status is worse than none, because it gets trusted. So states are defined by the workspace, not the product.",
          ],
        },
        {
          type: "text",
          tone: "tint",
          label: "Trade-off accepted",
          paragraphs: [
            "Free vocabulary breaks comparability: if every state is just a label, \"Who's Available?\" stops working. So each custom state carries an availability meaning underneath, which is what the decision view reads. **The team owns the words. The product owns what they mean for staffing.**",
          ],
        },
        { type: "visual", label: "State configuration, and a week of the team's own states" },

        { type: "subheading", text: "3. \"Who's Available?\" as its own view, not a filter" },
        {
          type: "text",
          paragraphs: [
            "This is where the product stops recording and starts deciding. Pick a date or a range, and the team resolves into what matters: who can take work, who is constrained, who is out, and who simply doesn't work that day. Whatever states the workspace defined are read through that lens automatically. No scanning, no cross-referencing.",
            "Non-working days are grouped separately from unavailable ones. Otherwise part-time contributors would read as unavailable every week, which trains leads to ignore the signal entirely.",
          ],
        },
        {
          type: "statement",
          text: "The calendar is where you contribute. \"Who's Available?\" is where you decide. One screen for both jobs, and the decision would have lost.",
        },
        { type: "visual", label: "Who's Available? with a date range, grouped by state" },
      ],
    },

    {
      id: "scope",
      nav: "Scope",
      number: "07",
      title: "What Knode deliberately is not",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Knode doesn't replace HR systems, payroll, official leave management, attendance tracking or performance systems. That restraint is a product decision, not a gap in the roadmap.",
            "The moment availability needs approval, the product inherits compliance, approval chains and consequences for getting it wrong. Logging becomes something people avoid rather than something they do casually in Slack, and once it stops being casual, the data goes stale and every feature built on it loses its value.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "Knode is the team's operational availability layer. It sits beside the HR system, not inside it.",
        },
      ],
    },

    {
      id: "flows",
      nav: "Flows",
      number: "08",
      title: "Core flows",
      blocks: [
        {
          type: "flow",
          label: "Project manager",
          steps: ["Open Knode", "Log in", "View team availability", "Pick a date or range", "See who's available", "Assign work"],
        },
        { type: "flow", label: "Team member", steps: ["Open Knode", "Select a date", "Choose a status", "Done"] },
        {
          type: "flow",
          label: "Slack user",
          steps: ["Send an availability message", "Knode interprets it", "Availability updates", "Change reflects back in Slack"],
        },
      ],
    },

    {
      id: "shipped",
      nav: "Shipped",
      number: "09",
      title: "What shipped in two weeks",
      blocks: [
        {
          type: "list",
          items: [
            "Team availability tracking",
            "Calendar-based status updates",
            "Custom availability states, configured per workspace",
            "Team availability overview",
            "Date and date-range availability",
            "The Who's Available workflow",
            "Workspace and member management, with invitations",
            "Slack integration with two-way status sync",
            "A responsive web experience",
          ],
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: [
            "The two-week constraint did most of the scoping for me. Anything that made the record more complete but didn't make the decision faster got cut, which is why version one has no approval flow, no hours tracking and no reporting layer.",
          ],
        },
        {
          type: "statement",
          label: "Design principle",
          text: "Don't make users search for information that should already be visible.",
        },
        {
          type: "text",
          paragraphs: [
            "Every screen was tested against the two sentences the product exists to eliminate: *\"Where do I find everyone's availability?\"* and *\"I need to message five people before I can assign this project.\"* If a flow left either sentence intact, it wasn't finished.",
          ],
        },
      ],
    },

    {
      id: "outcome",
      nav: "Outcome",
      number: "10",
      title: "Outcome, and where it goes next",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Knode is live and in daily use by a team of 12, and it has replaced the leave tracker it was built against. That's the adoption signal I cared about: internal tools rarely fail loudly, they just get ignored while the old habit carries on beside them. That didn't happen here.",
            "The measure of success was never calendar fill rate, which tracks compliance, not value.",
          ],
        },
        {
          type: "statement",
          tone: "blue",
          text: "Can a project manager answer \"who can take this work?\" in seconds, instead of asking the team?",
        },
        {
          type: "list",
          label: "Signals worth tracking as usage grows",
          items: [
            "Share of statuses set through Slack versus manually, as a proxy for input effort",
            "Freshness of availability data at the moment it's read",
            "Whether \"Who's Available?\" is opened before a staffing decision, or only after",
            "How many availability questions are still asked in team channels",
          ],
        },
        {
          type: "cards",
          columns: 4,
          items: [
            { label: "Next", title: "Capacity, not just presence", text: "Available and free are different things. Load in hours would sharpen the call." },
            { label: "Next", title: "Skill and role tags", text: "So the answer narrows from who is free to who is right." },
            { label: "Next", title: "Forward capacity view", text: "For pipeline planning, not just next week's staffing." },
            { label: "Next", title: "Assignment warnings", text: "When work goes to someone only partly available." },
          ],
        },
      ],
    },

    {
      id: "reflection",
      nav: "Reflection",
      number: "11",
      title: "Reflection",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "The hardest part of this project was resisting the calendar. It's the natural shape for this data, it's what everyone expects, and in two weeks it would have been the safe thing to ship. It also would have left the real work with the user, still scanning and interpreting rows to reach the answer they came for. I would have rebuilt the spreadsheet with better styling.",
            "Building \"Who's Available?\" as its own decision surface meant accepting that the calendar is infrastructure, not the product. The calendar holds the truth. The decision view makes it usable.",
          ],
        },
        { type: "statement", text: "That distinction is the whole of Knode." },
      ],
    },
  ],
};
