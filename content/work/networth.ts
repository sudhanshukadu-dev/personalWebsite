import type { CaseStudy } from "@/components/work/CaseStudyPage";

// Networth case study copy. There's no written case study for this project yet, so this is drawn
// from its product requirements (Desktop/NetWorth/NetWorth_PRD.md): the problem, the users, the
// decisions and the roadmap. It makes no claims about usage or results. Lives at /work/networth,
// the link on the home page's Featured Work card. TODO: every visual is a placeholder until the
// screens are exported; confirm the facts in the hero (stack, status) with Sudhanshu.

export const networth: CaseStudy = {
  slug: "networth",
  theme: "green",
  meta: {
    title: "Networth, personal finance",
    description:
      "Networth: one clear view of money spread across several bank accounts, and where it goes. A side project, specified and built solo.",
  },

  hero: {
    backLink: { label: "All work", href: "/#work" },
    tag: "Case study",
    title: "One clear view of money spread across accounts.",
    subtitle:
      "Networth is my own expense log: total balance, where the money goes, and month-on-month comparisons, built without ever pretending to connect to a bank.",
    facts: [
      { label: "Role", value: "Solo: product, design and build" },
      { label: "Type", value: "Side project" },
      { label: "Platform", value: "Responsive web" },
      { label: "Built with", value: "React, TypeScript, Tailwind" },
    ],
    visual: "Dashboard: total balance, accounts and where your money goes",
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
          text: "One clear view of my money across every bank account, and an honest answer to where it's going.",
        },
        {
          type: "cards",
          items: [
            {
              label: "The problem",
              tone: "tint",
              text: "Money in India is spread across salary accounts, savings accounts, secondary accounts and several UPI apps. Answering \"how much do I have?\" or \"where did it go?\" means opening all of them.",
            },
            {
              label: "The approach",
              tone: "tint",
              text: "Manual accounts, manual transactions and CSV bank-statement import feed one ledger. Every balance, category and insight is derived from that ledger, never typed in or hard-coded.",
            },
          ],
        },
        {
          type: "numbered",
          label: "The decisions",
          items: [
            {
              title: "Never fake financial connectivity",
              text: "No bank passwords, no UPI PINs, no scraping payment apps, and no pretending to be connected live. Trust over novelty.",
            },
            {
              title: "Transactions are the source of truth",
              text: "Balances are derived from the ledger, so there's never a second number that can disagree.",
            },
            {
              title: "Insights from real data, and only a few",
              text: "One to three insights on the dashboard, each generated from actual transactions, instead of a wall of charts.",
            },
            {
              title: "Imports that never lose a row",
              text: "Invalid rows are flagged, likely duplicates are marked, and nothing is silently discarded.",
            },
            {
              title: "Built to evolve",
              text: "Storage sits behind a repository layer, so the local prototype can later become a backend with compliant Account Aggregator sync.",
            },
          ],
        },
      ],
    },

    {
      id: "problem",
      nav: "Problem",
      number: "01",
      title: "Money is fragmented, so simple questions get hard",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "People in India commonly run several bank accounts and several UPI apps at once: a salary account, a savings account, a secondary account, and whichever payment app was open at the time. Each shows its own slice. None shows the whole.",
          ],
        },
        {
          type: "list",
          label: "The questions Networth exists to answer",
          items: [
            "How much money do I have in total?",
            "How much is in each account?",
            "Where did I spend my money?",
            "Which category takes the most?",
            "Which merchants do I spend the most with?",
            "Am I spending more than last month?",
            "Which account am I spending from the most?",
          ],
        },
      ],
    },

    {
      id: "users",
      nav: "Users",
      number: "02",
      title: "Who it's for",
      blocks: [
        {
          type: "cards",
          items: [
            {
              label: "Primary",
              title: "Young professionals with 2 to 5 accounts",
              text: "They use UPI constantly and want a quick, honest read on their total money and their spending habits.",
            },
            {
              label: "Secondary",
              title: "Anyone whose money lives in several places",
              points: [
                "Freelancers",
                "Students",
                "Small-business owners",
                "People with a salary and a savings account",
                "People who keep separate accounts for separate purposes",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "trust",
      nav: "Trust",
      number: "03",
      title: "The line it won't cross",
      intro:
        "The fastest way to build a finance app is to ask for access to everything. The fastest way to lose trust is the same.",
      blocks: [
        {
          type: "cards",
          items: [
            {
              label: "Networth never asks for",
              points: ["Bank passwords", "UPI PINs", "Debit or credit card PINs", "Access to Google Pay, PhonePe or Paytm"],
            },
            {
              label: "Networth never pretends to",
              points: [
                "Have a live connection to your bank",
                "Move money or make payments",
                "Value investments or give credit scores",
                "Offer loans or manage insurance",
              ],
            },
          ],
        },
        { type: "statement", text: "Never fake financial connectivity. A number you can't trust is worse than no number at all." },
        {
          type: "list",
          label: "Privacy you can see",
          tone: "tint",
          items: [
            "Account numbers masked to the last four digits",
            "A toggle to hide every balance on screen",
            "No sensitive financial data in logs",
            "Local storage treated honestly as a prototype limitation, not a feature",
          ],
        },
      ],
    },

    {
      id: "data",
      nav: "Data",
      number: "04",
      title: "Where the data comes from",
      blocks: [
        {
          type: "flow",
          label: "Four inputs, one ledger",
          steps: ["Add your accounts", "Log transactions by hand", "Import bank statements as CSV", "Saved on your device"],
        },
        {
          type: "text",
          paragraphs: [
            "The prototype keeps everything on the device. That's a limitation I chose on purpose: it lets the product prove its value without asking anyone to trust a server with their bank data.",
            "Storage sits behind a **repository layer**, so the local version can be swapped for a backend, and later a compliant **Indian Account Aggregator** integration, without rewriting the product on top of it.",
          ],
        },
        {
          type: "table",
          head: ["Repository", "Now", "Later"],
          rows: [
            ["Accounts", "Local storage", "API, then Account Aggregator"],
            ["Transactions", "Local storage", "API, then Account Aggregator"],
            ["Preferences", "Local storage", "API"],
          ],
        },
      ],
    },

    {
      id: "product",
      nav: "Product",
      number: "05",
      title: "Designing for answers, not charts",
      blocks: [
        {
          type: "flow",
          label: "Navigation",
          steps: ["Dashboard", "Accounts", "Transactions", "Spending", "Import", "Insights", "Settings"],
        },

        { type: "subheading", text: "The dashboard" },
        {
          type: "text",
          paragraphs: [
            "The most prominent thing on the screen is one number: the **total balance across every active account**, with how many accounts it covers. It's always the sum of the account balances, never stored separately and never hard-coded.",
            "Below it: a card per account (bank, nickname, type, last four digits, balance), the ten latest transactions, and **one to three insights** rather than a dashboard full of charts.",
          ],
        },
        { type: "visual", label: "Dashboard: total balance, account cards and recent transactions" },

        { type: "subheading", text: "Where the money goes" },
        {
          type: "text",
          paragraphs: [
            "Spending is the core of the product. Transactions are categorised from the merchant name (Blinkit and Zepto to Groceries, Swiggy to Food & Dining, Uber to Transport), using a simple, predictable keyword map that lives apart from the interface so it can be replaced later.",
            "The spending view leads with a sentence, not a chart: *\"You're spending the most on Groceries, ₹8,450, 33% of total spending.\"* Then the category breakdown, the top merchants, spending by account, and the transactions behind it all.",
          ],
        },
        {
          type: "cards",
          columns: 3,
          items: [
            { label: "Category detail", text: "Total, share of spending, number of transactions, top merchants and the account used." },
            { label: "Month on month", text: "This month against last, with a safe rule: if last month was zero, no misleading percentage." },
            { label: "Cash flow", text: "Income, spending and net cash flow, with transfers between your own accounts counted as neither." },
          ],
        },
        { type: "visual", label: "Spending: the main insight, category breakdown and top merchants" },
      ],
    },

    {
      id: "correctness",
      nav: "Correctness",
      number: "06",
      title: "Every number must be explainable",
      intro: "A finance app that is wrong once is never trusted again. So the rules behind the numbers were designed as carefully as the screens.",
      blocks: [
        {
          type: "cards",
          items: [
            {
              label: "Balances come from the ledger",
              text: "An account's balance is its starting balance plus credits minus debits. There's one source of truth, so nothing can drift out of step.",
            },
            {
              label: "Edits reverse, then re-apply",
              text: "Changing a transaction first undoes its old effect, then applies the new one, then recalculates balances, analytics and insights.",
            },
            {
              label: "Money in whole paise",
              text: "Amounts are stored as integer paise, so rupee arithmetic never picks up floating-point errors.",
            },
            {
              label: "Transfers aren't spending",
              text: "Moving money between your own accounts is a linked debit and credit, excluded from both income and spending.",
            },
          ],
        },
      ],
    },

    {
      id: "import",
      nav: "Import",
      number: "07",
      title: "A statement import that never loses a row",
      blocks: [
        {
          type: "flow",
          label: "Import flow",
          steps: ["Choose an account", "Upload a CSV", "Map the columns", "Preview", "Check for problems", "Confirm", "Balances update"],
        },
        {
          type: "list",
          label: "Flagged, never silently dropped",
          items: [
            "Missing or invalid dates",
            "Missing or invalid amounts",
            "Rows where debit and credit are both filled in",
            "Likely duplicates, matched on account, date, amount, type, description and reference",
          ],
        },
        {
          type: "text",
          tone: "tint",
          paragraphs: [
            "Bank statements don't share a format, so columns can be mapped by hand. And a suspected duplicate is marked for you to decide on, not deleted on your behalf.",
          ],
        },
      ],
    },

    {
      id: "principles",
      nav: "Principles",
      number: "08",
      title: "Product principles",
      blocks: [
        {
          type: "numbered",
          items: [
            { title: "Trust over novelty", text: "Nothing is worth a feature that makes the numbers less believable." },
            { title: "Never fake financial connectivity", text: "What's shown is what you entered or imported." },
            { title: "Every number must be explainable", text: "Each figure traces back to the transactions behind it." },
            { title: "Transactions are the source of truth", text: "Everything else is derived from them." },
            { title: "Insights come from actual data", text: "Never hard-coded, never guessed." },
            { title: "Don't overwhelm with charts", text: "Lead with the answer, then show the breakdown." },
            { title: "Privacy must be visible", text: "Masked numbers and a hide-balances switch, always in reach." },
            { title: "Keep it simple, build it to evolve", text: "A small first version on an architecture that can grow." },
          ],
        },
      ],
    },

    {
      id: "roadmap",
      nav: "Roadmap",
      number: "09",
      title: "Where it goes next",
      blocks: [
        {
          type: "cards",
          columns: 4,
          items: [
            { label: "V1", title: "The foundation", text: "Accounts, transactions, CSV import, dashboard, spending and insights, stored locally." },
            { label: "V2", title: "Sync across devices", text: "Sign-in, a backend and a cloud database." },
            { label: "V3", title: "Consent-based bank data", text: "Indian Account Aggregator integration with consent management and automatic refresh." },
            { label: "V4", title: "Planning ahead", text: "Budgets, goals, recurring payments, subscription detection and cash-flow forecasting." },
          ],
        },
      ],
    },
  ],
};
