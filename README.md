# 🌳 Tree Visualizer - BST & AVL

This is a React-based application that allows users to interactively build and visualize **Binary Search Trees (BST)** and **AVL Trees**. You can insert or delete values, switch between tree types, and view live updates on a zoomable and draggable canvas.

---

## 🚀 Features

- 🔁 **Insert/Delete** nodes in both BST and AVL trees.
- 🌲 **Self-balancing AVL** tree updates in real time.
- 🎨 **Canvas-based rendering** using `react-konva`.
- 🖱️ **Zoom and Pan** support for large trees.
- 🧭 **Dropdown toggle** to switch between BST and AVL.
- 🎯 **Coordinate layout algorithm** for clean node spacing.

---

## 📦 Tech Stack

- **React** – Frontend framework.
- **react-konva** – Canvas-based drawing.
- **Tailwind CSS** – Styling.
- **Lucide React** – Icons.
- **JavaScript (ES6)** – Tree logic.

---
## 🧠 Core Logic

### ✅ Binary Search Tree (BST)

- **Insert**: Follows standard BST logic — values smaller than the current node go left, larger go right. No duplicates allowed.
- **Delete**: Handles all three deletion cases:
  - Leaf node (no children)
  - One child (replace with child)
  - Two children (replace with in-order successor)
- **Coordinate Assignment**: After every operation, node `x` and `y` positions are recalculated for visual spacing using recursive offset logic.

### 🔄
---

## 🛠 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/adityapandya31/AVL-BST-Tree-Visualizer.git
cd AVL-BST-Tree-Visualizer
npm install
npm run dev
