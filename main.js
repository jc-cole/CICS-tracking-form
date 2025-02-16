import { CourseCard } from "./dom-elements/CourseCard.js";
import { CourseTree } from "./business-logic/CourseTree.js";
import { CourseNode } from "./business-logic/CourseNode.js";
// making a tree object to represent cs course prerequisites up to 200 levels

let csCourseTree = new CourseTree()

let csCourseObjects = {
    "110": new CourseNode("CICS 110", "Foundations of Programming", false, []),
    "160": new CourseNode("CICS 160", "Object Oriented Programming", false, []),
    "210": new CourseNode("CICS 210", "Data Structures", false, []),
    "220": new CourseNode("CS 220", "Programming Methodology", false, []),
    "230": new CourseNode("CS 230", "Computer System Principles", false, []),
}

csCourseObjects["110"].addChild(csCourseObjects["160"])
csCourseObjects["160"].addChild(csCourseObjects["210"])
csCourseObjects["210"].addChild(csCourseObjects["220"])
csCourseObjects["210"].addChild(csCourseObjects["230"])

csCourseTree.rootNode = csCourseObjects["110"]

let d3Data = csCourseTree.convertToD3Hierarchy()


const width = 800;
const height = 600;

const treeLayout = d3.tree().size([height, width - 160]);
const root = d3.hierarchy(d3Data);
const treeData = treeLayout(root);

// Create a container div
const container = d3.select("body").append("div")
  .style("width", width + "px")
  .style("height", height + "px")
  .style("position", "relative")
  .style("transform", "translate(80px, 0)");

// Add nodes
const node = container.selectAll(".node")
  .data(treeData.descendants())
  .enter().append("div")
  .attr("class", "node")
  .style("position", "absolute")
  .style("left", d => d.y + "px")
  .style("top", d => d.x + "px")
  .style("transform", "translate(-50%, -50%)");

// Add labels

/* "d.data" object looks like this: {
  "name": "CICS 110",
  "title": "Foundations of Programming",
  "isComplete": false,
  "children": [
    {
      "name": "CICS 160",
      "title": "Object Oriented Programming",
      "isComplete": false,
      "children": [
        {
          "name": "CICS 210",
          "title": "Data Structures",
          "isComplete": false,
          "children": []
        }
      ]
    }
  ]
}

*/


node.append("div")
  .text(d => { console.log(d);
    return d.data.name})
  .style("background-color", d => d.data.isComplete ? "green" : "red")
  .style("padding", "5px")
  .style("border-radius", "5px")
  .style("color", "white");

// Add links
const linkContainer = container.append("svg")
  .style("position", "absolute")
  .style("top", "0")
  .style("left", "0")
  .style("width", "100%")
  .style("height", "100%")
  .style("z-index", "-1");

linkContainer.selectAll(".link")
  .data(treeData.links())
  .enter().append("line")
  .attr("class", "link")
  .attr("x1", d => d.source.y)
  .attr("y1", d => d.source.x)
  .attr("x2", d => d.target.y)
  .attr("y2", d => d.target.x)
  .style("stroke", "#ccc")
  .style("stroke-width", "2px");

// Add some CSS for styling
const style = document.createElement('style');
style.textContent = `
  .node {
    cursor: pointer;
  }
`;
document.head.appendChild(style);