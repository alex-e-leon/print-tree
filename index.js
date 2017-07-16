// @flow

/* eslint-disable no-console, prefer-template */

// The official way to annotate overloaded functions: https://github.com/facebook/flow/issues/60
declare function printNodeType(node: *): string;
// eslint-disable-next-line no-redeclare
declare function printNodeType(node: *, branch: string): void;

function printTree(
  initialTree: *,
  printNode: printNodeType,
  getChildren: (node: *) => Array<*>,
): void {
  function printBranch(tree: *, branch: *): void {
    const isGraphHead = branch.length === 0;
    const children = getChildren(tree);
    let branchHead = '';

    if (!isGraphHead) {
      branchHead = children && children.length !== 0 ? '┬ ' : '─ ';
    }

    if (printNode.length === 2) {
      printNode(tree, `${branch}${branchHead}`);
    } else {
      console.log(`${branch}${branchHead}${printNode(tree)}`);
    }

    if (children) {
      let baseBranch = branch;

      if (!isGraphHead) {
        const isChildOfLastBranch = branch.slice(-2) === '└─';
        baseBranch = branch.slice(0, -2) + (isChildOfLastBranch ? '  ' : '| ');
      }

      const nextBranch = baseBranch + '├─';
      const lastBranch = baseBranch + '└─';

      children.forEach((child, index) => {
        printBranch(child, children.length - 1 === index ? lastBranch : nextBranch);
      });
    }
  }

  printBranch(initialTree, '');
}

module.exports = printTree;
