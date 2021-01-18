class WrappedTree {
  // Width and height.
  w = 0;
  h = 0;

  x = 0;
  y = 0;
  prelim = 0;
  mod = 0;
  shift = 0;
  change = 0;

  // Left and right thread.
  tl = null;
  tr = null;

  // Extreme left and right nodes.
  el = null;
  er = null;

  // Sum of modifiers at the extreme nodes.
  msel = 0;
  mser = 0;

  // Array of children and number of children.
  c = [];
  cs = 0;

  constructor (w, h, y, c = []) {
    this.w = w
    this.h = h
    this.y = y
    this.c = c
    this.cs = c.length
  }
}
//从某节点开始的树，意思就是重新构建一个树，节点的属性只有位置大小
WrappedTree.fromNode = (root, isHorizontal) => {
  if (!root) return null
  const children = []
//获取子节点，将子节点的树放入数组
  root.children.forEach((child) => {
    children.push(WrappedTree.fromNode(child, isHorizontal))
  })
  if (isHorizontal) return new WrappedTree(root.height, root.width, root.x, children)
  return new WrappedTree(root.width, root.height, root.y, children)
}

module.exports = WrappedTree
