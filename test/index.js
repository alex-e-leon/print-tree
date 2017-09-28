// @flow

import test from 'ava';
import sinon from 'sinon';
import printTree from '../index';

function validateTree(t, tree, output) {
  const consoleLog = sinon.spy();

  printTree(
    tree,
    (node, branch) => { consoleLog(node.name, branch); },
    node => node.children,
  );

  output.forEach((branch, index) => {
    if (branch.length === 1) {
      t.is(consoleLog.getCall(index).args[0], branch[0]);
    } else {
      t.is(consoleLog.getCall(index).args[0], branch[1]);
      t.is(consoleLog.getCall(index).args[1], branch[0]);
    }
  });
}

test(
  'prints a simple tree',
  validateTree,
  {
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
  },
  [
    ['head'],
    ['├─┬ ', 'branchA'],
    ['| └── ', 'branchC'],
    ['└── ', 'branchB'],
  ],
);

test(
  'prints the children of last branches correctly',
  validateTree,
  {
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
  },
  [
    ['head'],
    ['├── ', 'branchA'],
    ['└─┬ ', 'branchB'],
    ['  └── ', 'branchC'],
  ],
);
