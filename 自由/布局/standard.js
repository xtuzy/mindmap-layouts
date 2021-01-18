const Layout = require('./layout')
const Node = require('../hierarchy/node')
const nonLayeredTidyTree = require('../algorithms/non-layered-tidy-tree')
//继承自基础布局
class Standard extends Layout {
//实现基类方法
  doLayout () {
    const me = this
//布局的根节点?
    const root = me.root
    const options = me.options
    // separate into left and right trees
//分成左右树
    const leftTree = new Node(root.data, options, true)
    const rightTree = new Node(root.data, options, true)
    //根节点的子节点的数目
const treeSize = root.children.length
//右侧树的大小，即子节点数目的一半
    const rightTreeSize = Math.round(treeSize / 2)
//左右分配节点
    for (let i = 0; i < treeSize; i++) {
      const child = root.children[i]
      if (i < rightTreeSize) {
        rightTree.children.push(child)
      } else {
        leftTree.children.push(child)
      }
    }
    // do layout for left and right trees
//为左右树布局
    nonLayeredTidyTree(rightTree, true)
    nonLayeredTidyTree(leftTree, true)
    leftTree.right2left()
    // combine left and right trees
    rightTree.translate(leftTree.x - rightTree.x, leftTree.y - rightTree.y)
    // translate root
    root.x = leftTree.x
    root.y = rightTree.y
    const bb = root.getBoundingBox()
    if (bb.top < 0) {
      root.translate(0, -bb.top)
    }
    return root
  }
}

module.exports = Standard
