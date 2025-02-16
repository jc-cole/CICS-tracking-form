import { CourseCard } from "./dom-elements/CourseCard.js";
import { CourseTree } from "./business-logic/CourseTree.js";
import { CourseNode } from "./business-logic/CourseNode.js";
// making a tree object to represent cs course prerequisites up to 200 levels

let csCourseTree = new CourseTree()

let csCourseObjects = {
    "110": new CourseNode("CICS 110", "Foundations of Programming", false, []),
    "160": new CourseNode("CICS 160", "Object Oriented Programming", false, []),
    "210": new CourseNode("CICS 210", "Data Structures", false, []),
}

csCourseObjects["110"].addChild(csCourseObjects["160"])
csCourseObjects["160"].addChild(csCourseObjects["210"])

csCourseTree.rootNode = csCourseObjects["110"]

let d3Data = csCourseTree.convertToD3Hierarchy()


const width = 800;
const height = 600;

const treeLayout = d3.tree().size([height, width - 160]);
const root = d3.hierarchy(d3Data);
const treeData = treeLayout(root);

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(80,0)");

// Add links
svg.selectAll(".link")
  .data(treeData.links())
  .enter().append("path")
  .attr("class", "link")
  .attr("d", d3.linkHorizontal()
    .x(d => d.y)
    .y(d => d.x));

// Add nodes
const node = svg.selectAll(".node")
  .data(treeData.descendants())
  .enter().append("g")
  .attr("class", "node")
  .attr("transform", d => `translate(${d.y},${d.x})`);

// Add circles for nodes
node.append("circle")
  .attr("r", 10)
  .style("fill", d => d.data.isComplete ? "green" : "red");

// Add labels
node.append("text")
  .attr("dy", ".35em")
  .attr("x", d => d.children ? -13 : 13)
  .style("text-anchor", d => d.children ? "end" : "start")
  .text(d => d.data.name);
