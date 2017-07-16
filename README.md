# print-tree

prints any js data structure as a tree

## Usage

```js
$ npm install print-tree
const printTree = require('print-tree');

const objectTree = {
  head: {
    branchA: {
      branchC: {},
    },
    branchB: {},
  },
};

printTree(objectTree);

// head
// ├─┬ branchA
// | └── branchC
// └── branchB

const customTree = {
  name: 'head',
  children: [
    { name: 'branchA' },
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

### Arguments

#### tree: *

The object to traverse. Expects an object of objects during default execution,
but it can be any tree-like structure if the optional functions are passed in.

#### printNode: function(node: *): string | function(node: *, branch: string): null

An optional function to customize the output.
By default `print-tree` will `console.log` the object keys of any nested objects.
To change this behaviour you can pass in either:

- a function that takes the current node and returns the string representation.
- a function that takes the current node and the branchGraphic and returns nothing -
    this lets you customize the ouput method

#### getChildren: function(node: *): array

An optional function to help `print-tree` traverse custom data structures.
It takes the current head of the tree/sub-tree and returns a list of the children
