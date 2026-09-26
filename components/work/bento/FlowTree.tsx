import type { CaseBlock } from "@/components/work/CaseBlocks";
import { rich } from "@/components/work/CaseBlocks";

/*
  User flows as a diagram of pills and lines, after the flow map Sudhanshu shared. A run
  of flows for different people becomes one tree: the product at the root, each person
  branching off a trunk in the project colour, and their steps running on from them. A
  lone flow is just the chain. Everything is nested lists, so a screen reader hears the
  same structure the eye sees. Styles in globals.css (.flow-tree, .flow-chain).

  The lines between steps are drawn to the left of each step, and the list is shifted
  left by one line's length inside a clipping box, so when a long chain wraps onto a
  new line, the line at the start of it is cut off instead of dangling.
*/

type Flow = Extract<CaseBlock, { type: "flow" }>;

export function FlowChain({ steps }: { steps: string[] }) {
  return (
    <div className="flow-chain">
      <ol className="flow-chain__list">
        {steps.map((step) => (
          <li key={step}>
            <span className="flow-node">{rich(step)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FlowTree({ root, flows }: { root: string; flows: Flow[] }) {
  return (
    <div className="flow-tree">
      <div className="flow-tree__root">
        <span className="flow-node">{root}</span>
      </div>
      <ul className="flow-tree__branches">
        {flows.map((flow) => (
          <li key={flow.label} className="flow-tree__branch">
            <span className="flow-node flow-node--role">{flow.label}</span>
            <span aria-hidden className="flow-tree__link" />
            <FlowChain steps={flow.steps} />
          </li>
        ))}
      </ul>
    </div>
  );
}
