// @flow

/* eslint-disable no-console, prefer-template */

type PrintNode<T> = (node: T, branch: ?string) => ?string;
type GetChildren<T> = (node: T) => Array<T>;

function printTree<T>(
  initialTree: T,
  printNode: PrintNode<T>,
  getChildren: GetChildren<T>,
) {
  function printBranch(tree, branch) {
    const isGraphHead = branch.length === 0;
    const children = getChildren(tree) || [];

    let branchHead = '';

    if (!isGraphHead) {
      branchHead = children && children.length !== 0 ? '┬ ' : '─ ';
    }

    if (printNode.length === 2) {
      printNode(tree, `${branch}${branchHead}`);
    } else {
      console.log(`${branch}${branchHead}${printNode(tree) || ''}`);
    }

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

  printBranch(initialTree, '');
}

module.exports = printTree;
