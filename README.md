# print-tree [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status]

prints any js data structure as a tree

## Usage

```js
$ npm install print-tree
const printTree = require('print-tree');

const customTree = {
  name: 'head',
  children: [
    {
      name: 'branchA'
      children: [
        { name: 'branchC' },
      ],
    },
    { name: 'branchB' },
  ],
};

printTree(
  customTree,
  node => node.name.toUpperCase(),
  node => node.children,
);

// HEAD
// ├─┬ BRANCHA
// | └── BRANCHC
// └── BRANCHB
```

`printTree(tree, [printNode], [getChildren])`

## Arguments

### tree: T

The object to traverse.

### printNode: function<T>(node: T, branch: string): ?string

A function to customize the output.
You can pass in either:

- a function that takes the current node and returns the string representation.
- a function that takes the current node and the branchGraphic and returns nothing -
    this lets you customize the ouput method

### getChildren: function<T>(node: T): Array<T>

A function to help `print-tree` traverse custom data structures.
It takes the current head of the tree/sub-tree and returns a list of the children

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/alex-e-leon/print-tree.svg

[build-status]: https://travis-ci.org/alex-e-leon/print-tree

[coverage-badge]: https://img.shields.io/codecov/c/github/alex-e-leon/print-tree.svg

[coverage-status]: https://codecov.io/github/alex-e-leon/print-tree
