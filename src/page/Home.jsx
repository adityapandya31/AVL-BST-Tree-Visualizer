import React, { useState, useEffect,useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Stage, Layer, Line, Circle, Text } from "react-konva";

class Node {
  constructor(data, x = 0, y = 0) {
    this.data = data; // The value stored in the node
    this.left = null; // Reference to the left child
    this.right = null; // Reference to the right child
    this.height = 1; // Height of the node (important for AVL tree balancing)
    this.x = x; // X-coordinate for rendering the node in a tree visualizer
    this.y = y; // Y-coordinate for rendering the node in a tree visualizer
  }
}


class BST {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (this.root == null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data > node.data) {
      if (node.right === null) {
      node.right = newNode;
      } else {
      this.insertNode(node.right, newNode);
      }
    } else if (newNode.data < node.data) {
      if (node.left === null) {
      node.left = newNode;
      } else {
      this.insertNode(node.left, newNode);
      }
    }
    // If newNode.data is equal to node.data, do nothing (no duplicates allowed)
  }
   
  delete(data) {
    this.root = this.deleteNode(this.root, data);
  }

  deleteNode(node, data) {
    if (node === null) return node;

    if (data < node.data) {
      node.left = this.deleteNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.deleteNode(node.right, data);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Node with two children: Get the inorder successor (smallest in the right subtree)
      node.data = this.minValue(node.right);

      // Delete the inorder successor
      node.right = this.deleteNode(node.right, node.data);
    }

    return node;
  }

  minValue(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  assignCoordinates(node = this.root, x = 400, y = 50, level = 1) {
    if (node === null) return;

    // Assign x and y coordinates to the node
    node.x = x;
    node.y = y;

    // Calculate spacing between nodes at this level
    const offset = 200 / level;

    // Assign coordinates for left and right children
    this.assignCoordinates(node.left, x - offset, y + 100, level + 1);
    this.assignCoordinates(node.right, x + offset, y + 100, level + 1);
  }
}

class AVL {
  constructor() {
    this.root = null;
  }

  // A utility function to get the height of the node
  getHeight(node) {
    return node ? node.height : 0;
  }

  // A utility function to calculate the balance factor of the node
  getBalanceFactor(node) {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // A utility function for a right rotation
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    // Return new root
    return x;
  }

  // A utility function for a left rotation
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    // Return new root
    return y;
  }

  // Insert a node into the AVL tree
  insert(data) {
    this.root = this.insertNode(this.root, data);
  }

  insertNode(node, data) {
    // Step 1: Perform normal BST insertion
    if (!node) return new Node(data);

    if (data < node.data) {
      node.left = this.insertNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.insertNode(node.right, data);
    } else {
      // Duplicate data is not allowed in AVL
      return node;
    }

    // Step 2: Update the height of the ancestor node
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // Step 3: Get the balance factor
    const balance = this.getBalanceFactor(node);

    // Step 4: Balance the node
    // Left Left Case
    if (balance > 1 && data < node.left.data) {
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && data > node.right.data) {
      return this.leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && data > node.left.data) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && data < node.right.data) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    // Return the unchanged node pointer
    return node;
  }
  delete(data) {
    this.root = this.deleteNode(this.root, data);
  }
   
  
  deleteNode(node, data) {
    if (node === null) return node;

    if (data < node.data) {
      node.left = this.deleteNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.deleteNode(node.right, data);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Node with two children: Get the inorder successor (smallest in the right subtree)
      node.data = this.minValue(node.right);

      // Delete the inorder successor
      node.right = this.deleteNode(node.right, node.data);
    }

    // Update height of the current node
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

    // Get the balance factor
    const balance = this.getBalanceFactor(node);

    // Balance the node
    // Left Left Case
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }

    // Left Right Case
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }

    // Right Left Case
    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  // Utility function to find the node with the minimum value
  minValue(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }
 

  // Assign coordinates to visualize the tree (same as in BST)
  assignCoordinates(node = this.root, x = 400, y = 50, level = 1) {
    if (node === null) return;

    // Assign x and y coordinates to the node
    node.x = x;
    node.y = y;

    // Calculate spacing between nodes at this level
    const offset = 200 / level;

    // Assign coordinates for left and right children
    this.assignCoordinates(node.left, x - offset, y + 100, level + 1);
    this.assignCoordinates(node.right, x + offset, y + 100, level + 1);
  }
}


function Home() {
  const [selectedOption, setSelectedOption] = useState("BST");
  const [tree, setTree] = useState(null);
  const [val, setVal] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const stageRef = useRef(null);
  const [scale, setScale] = useState(1); // Scale state for zooming
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position state for panning

  const handleWheel = (e) => {
    e.evt.preventDefault()
    const scaleBy = 1.1
    const stage = e.target.getStage()
    const oldScale = stage.scaleX()
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    }

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy

    setScale(newScale)
    setPosition({
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    })
  }

  const handleDragEnd = (e) => {
    setPosition({
      x: e.target.x(),
      y: e.target.y(),
    })
  }


  const buildBST = (values) => {
    const bst = new BST();
    values.forEach((value) => bst.insert(value));
    bst.assignCoordinates(); // Assign x, y coordinates to nodes
    return bst;
  };
  const buildAVL = (values) => {
    const avl = new AVL();
    values.forEach((value) => avl.insert(value));
    avl.assignCoordinates();
    return avl;
  };

  const onAdd = () => {
    if (val.trim() !== "") {
      const newValue = isNaN(Number(val)) ? val.trim() : Number(val.trim());
      if (selectedOption == "BST") {
        let bst = tree;

        if (!bst) {
          bst = buildBST([newValue]);
        } else {
          bst.insert(newValue);
          bst.assignCoordinates(); // Recalculate coordinates
        }

        setTree(bst);
      }
      else {
        let avl = tree || buildAVL([newValue]);
        avl.insert(newValue);
        avl.assignCoordinates();
        setTree(avl);
      }
      setVal("");
    }
  };
  const onDelete = () => {
    if (val.trim() !== "") {
      const delValue = isNaN(Number(val)) ? val.trim() : Number(val.trim());
      if (selectedOption == "BST") {
        let bst = tree;
        if (bst) {
          bst.delete(delValue);
          bst.assignCoordinates(); // Recalculate coordinates
          setTree(bst);
        }
      } else {
        let avl = tree;
        if (avl) {
          avl.delete(delValue);
          avl.assignCoordinates();
          setTree(avl);
        }
      }
      setVal("");
    }
  };

  const renderTree = (node) => {
    if (!node) return null;

    return (
      <>
        {/* Render the node */}
        <Circle x={node.x - 1} y={node.y - 7} radius={20} fill="blue" />
        <Text x={node.x - 11} y={node.y - 11} text={node.data} fill="white" />

        {/* Render edges and children */}
        {node.left && (
          <>
            <Line
              points={[node.x -20, node.y , node.left.x - 5, node.left.y]}
              stroke="black"
              strokeWidth={1.5}
            />
            {renderTree(node.left)}
          </>
        )}
        {node.right && (
          <>
            <Line
              points={[node.x+18, node.y, node.right.x-5, node.right.y]}
              stroke="black"
              strokeWidth={1.5}
            />
            {renderTree(node.right)}
          </>
        )}
      </>
    );


  };

  return (
    <div className="min-h-screen bg-gray-100 w-screen">
      <div className="sticky top-0 w-full bg-green-300 bg-opacity-90 backdrop-blur-md shadow-lg p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="Enter a number or string..."
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onAdd()}
                aria-label="Enter a value for the tree"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105"
                onClick={onAdd}
              >
                ADD
              </button>
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105"
                onClick={onDelete}
              >
                Delete
              </button>
              <div className="relative">
                <div className="relative inline-block">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    {selectedOption}
                  </button>
                  {menuOpen && (
                    <ul className="absolute mt-2 bg-white border rounded shadow-lg z-10">
                      {["BST", "AVL"].map((opt) => (
                        <li
                          key={opt}
                          onClick={() => {
                            setSelectedOption(opt);
                            setMenuOpen(false); // Close the dropdown after selection
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen mx-auto mt-8 p-4">
        <Stage width={window.innerWidth} height={window.innerHeight - 200}
          ref={stageRef}
          scaleX={scale}
          scaleY={scale}
          x={position.x}
          y={position.y}
          onWheel={handleWheel}
          draggable
          onDragEnd={handleDragEnd}>
          <Layer>{tree && renderTree(tree.root)}</Layer>
        </Stage>
      </div>
    </div>
  );
}

export default Home;
