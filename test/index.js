const sinon = require('sinon');
const assert = require('assert');
const printTree = require('../index');

function validateTree(consoleFunc, tree) {
  tree.forEach((branch, index) => {
    if (branch.length === 1) {
      assert.equal(consoleFunc.getCall(index).args[0], branch[0]);
    } else {
      assert.equal(consoleFunc.getCall(index).args[0], branch[1]);
      assert.equal(consoleFunc.getCall(index).args[1], branch[0]);
    }
  });
}

describe('print-tree', () => {
  it('prints a simple tree', () => {
    const consoleLog = sinon.spy();
    const customTree = {
      name: 'head',
      children: [
        {
          name: 'branchA',
          children: [
            { name: 'branchC' },
          ],
        },
        { name: 'branchB' },
      ],
    };

    printTree(
      customTree,
      (node, branch) => { consoleLog(node.name, branch); },
      node => node.children,
    );

    validateTree(consoleLog, [
      ['head'],
      ['├─┬ ', 'branchA'],
      ['| └── ', 'branchC'],
      ['└── ', 'branchB'],
    ]);
  });

  it('prints the children of last branches correctly', () => {
    const consoleLog = sinon.spy();
    const customTree = {
      name: 'head',
      children: [
        { name: 'branchA' },
        {
          name: 'branchB',
          children: [
            { name: 'branchC' },
          ],
        },
      ],
    };

    printTree(
      customTree,
      (node, branch) => { consoleLog(node.name, branch); },
      node => node.children,
    );

    validateTree(consoleLog, [
      ['head'],
      ['├── ', 'branchA'],
      ['└─┬ ', 'branchB'],
      ['  └── ', 'branchC'],
    ]);
  });
});
