export class CourseTree {
    constructor(rootNode, childNodes) {
        this.rootNode = rootNode || new CourseNode()
        this.childNodes = childNodes || []
    }

    // returns node if in tree, otherwise returns null
    // uses preorder traversal
    getNode(targetIdentifier) {
        return this.#preorderTraversal(this.rootNode, targetIdentifier);
    }

    #preorderTraversal(currentNode, targetIdentifier) {
        // Base case: if current node is null, return null
        if (!currentNode) {
            return null;
        }

        // Check if current node matches the target
        if (currentNode.courseIdentifier === targetIdentifier) {
            return currentNode;
        }

        // Recursively search children
        for (let childNode of currentNode.childNodes) {
            const result = this.#preorderTraversal(childNode, targetIdentifier);
            if (result) {
                return result;
            }
        }

        // If not found in any children, return null
        return null;
    }

    convertToD3Hierarchy() {
        function convertNode(node) {
          return {
            name: node.courseIdentifier,
            title: node.courseTitle,
            isComplete: node.isComplete,
            children: node.childNodes.map(convertNode)
          };
        }
        return convertNode(this.rootNode);
      }
}