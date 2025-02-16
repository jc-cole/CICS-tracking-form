import { CourseCard } from "./dom-elements/CourseCard.js";
import { CourseTree } from "./business-logic/CourseTree.js";
import { CourseNode } from "./business-logic/CourseNode.js";
// making a tree object to represent cs course prerequisites up to 200 levels

let csCourseTree = new CourseTree()

let csCourseObjects = {
    "110": new CourseNode("CICS 110", "Foundations of Programming", "1", "F-", false, []),
    "160": new CourseNode("CICS 160", "Object Oriented Programming", "1", "F-", false, []),
    "210": new CourseNode("CICS 210", "Data Structures", "1", "F-", false, []),
    "220": new CourseNode("CS 220", "Programming Methodology", "1", "F-", false, []),
    "230": new CourseNode("CS 230", "Computer System Principles", "1", "F-", false, []),
}

csCourseObjects["110"].addChild(csCourseObjects["160"])
csCourseObjects["160"].addChild(csCourseObjects["210"])
csCourseObjects["210"].addChild(csCourseObjects["220"])
csCourseObjects["210"].addChild(csCourseObjects["230"])

let exampleCourseCards = [
    new CourseCard(csCourseObjects["110"]),
    new CourseCard(csCourseObjects["160"]),
    new CourseCard(csCourseObjects["210"]),
    new CourseCard(csCourseObjects["220"]),
    new CourseCard(csCourseObjects["230"]),
]



csCourseTree.rootNode = csCourseObjects["110"]

let d3Data = csCourseTree.convertToD3Hierarchy()

const courseCardMap = new Map(exampleCourseCards.map(card => [card.courseNode.courseIdentifier, card]));

const width = 800;
const height = 600;

const treeLayout = d3.tree()
  .size([window.innerHeight - 100, window.innerWidth - 100]);
const root = d3.hierarchy(d3Data);
const treeData = treeLayout(root);

// Create a container div
const container = d3.select("body").append("div")
  .style("width", "100vw")
  .style("height", "150vh")
  .style("position", "relative")
  .style("margin", "100px")



// Add nodes
const node = container.selectAll(".node")
  .data(treeData.descendants())
  .enter().append(function(d) {
    const courseCard = courseCardMap.get(d.data.name);
    if (courseCard) {
      courseCard.makeDomElement(); // Ensure the DOM element is created
      return courseCard.element.cloneNode(true); // Clone the element to avoid moving it
    }
    // Fallback to a simple div if no CourseCard is found
    return document.createElement('div');
  })
  .attr("class", (d) => {
    const courseCard = courseCardMap.get(d.data.name);
    return `node ${courseCard.element.className}`
})
  .style("position", "absolute")
  .style("left", d => d.x + "px")
  .style("top", d => d.y + "px")
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




// Add links
const linkContainer = container.append("svg")
  .style("position", "absolute")
  .style("top", "0")
  .style("width", "100%")
  .style("height", "100%")
  .style("z-index", "-1");

linkContainer.selectAll(".link")
  .data(treeData.links())
  .enter().append("line")
  .attr("class", "link")
  .attr("x1", d => d.source.x)
  .attr("y1", d => d.source.y)
  .attr("x2", d => d.target.x)
  .attr("y2", d => d.target.y)
  .style("stroke", "black")
  .style("stroke-width", "20px");

// Add some CSS for styling
const style = document.createElement('style');
style.textContent = `
  .node {
    cursor: pointer;
  }
`;
document.head.appendChild(style);

console.log(treeData.links()[2]);

