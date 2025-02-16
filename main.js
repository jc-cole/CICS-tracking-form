import { CourseCard } from "./dom-elements/CourseCard.js";
import { CourseTree } from "./business-logic/CourseTree.js";
import { CourseNode } from "./business-logic/CourseNode.js";
import { D3TreeMaker } from "./d3/d3TreeMaker.js";
// making a tree object to represent cs course prerequisites up to 200 levels

let csCourseTree = new CourseTree()

let csCourseObjects = {
    "000": new CourseNode("CS 000", "Placeholder Course", "", "", false, []),
    "110": new CourseNode("CICS 110", "Foundations of Programming", "", "", false, []),
    "160": new CourseNode("CICS 160", "Object Oriented Programming", "", "", false, []),
    "198": new CourseNode("198C", "Intro to C", "", "", false, []),
    "210": new CourseNode("CICS 210", "Data Structures", "", "", false, []),
    "220": new CourseNode("CS 220", "Programming Methodology", "", "", false, []),
    "230": new CourseNode("CS 230", "Computer System Principles", "", "", false, []),
    "240": new CourseNode("CS 240", "Reasoning Under Uncertainty", "", "", false, []),
    "250": new CourseNode("CS 250", "Intro to Computation", "", "", false, []),
    "131": new CourseNode("MATH 131", "Calculus I", "", "", false, []),
    "132": new CourseNode("MATH 132", "Calculus II", "", "", false, []),
    "233": new CourseNode("MATH 233", "Multivariable Calc", "", "", false, []),
    "235": new CourseNode("MATH 235", "Linear Algebra", "", "", false, []),
}

csCourseObjects["000"].addChild(csCourseObjects["110"])
csCourseObjects["000"].addChild(csCourseObjects["131"])

csCourseObjects["110"].addChild(csCourseObjects["160"])
csCourseObjects["160"].addChild(csCourseObjects["210"])
csCourseObjects["160"].addChild(csCourseObjects["198"])
csCourseObjects["160"].addChild(csCourseObjects["240"])
csCourseObjects["160"].addChild(csCourseObjects["250"])
csCourseObjects["198"].addChild(csCourseObjects["230"])
csCourseObjects["210"].addChild(csCourseObjects["220"])
csCourseObjects["210"].addChild(csCourseObjects["230"])
csCourseObjects["131"].addChild(csCourseObjects["132"])
csCourseObjects["132"].addChild(csCourseObjects["233"])
csCourseObjects["132"].addChild(csCourseObjects["235"])
csCourseObjects["132"].addChild(csCourseObjects["240"])
csCourseObjects["132"].addChild(csCourseObjects["250"])

const gridContainer = document.querySelector("#grid-container")

function grid(num, row, col) {
    let card = new CourseCard(csCourseObjects[num])
    card.makeDomElement()
    card.element.style.gridRow = row.toString()
    card.element.style.gridColumn = col.toString()
    gridContainer.appendChild(card.element)
}



function addRowSpan(row, startColumn, endColumn, color, marginLeft, marginRight) {
    const spanDiv = document.createElement('div');
    spanDiv.style.backgroundColor = 'black';
    spanDiv.style.gridRow = row;
    spanDiv.style.gridColumn = `${startColumn} / ${endColumn + 1}`;
    spanDiv.style.height = '100%';
    spanDiv.style.backgroundColor = color || "black"
    spanDiv.style.marginLeft = marginLeft || "60px"
    spanDiv.style.marginRight = marginRight || "60px"
    
    gridContainer.appendChild(spanDiv);
}

addRowSpan(4, 1, 4,)
addRowSpan(4, 5, 6,)
addRowSpan(2, 4, 6,)
addRowSpan(2, 2, 2,)



grid("131", 1, 2)
grid("132", 3, 2)
grid("110", 1, 4)
grid("160", 1, 5)
grid("210", 3, 5)
grid("198", 3, 6)
grid("233", 5, 1)
grid("235", 5, 2)
grid("240", 5, 3)
grid("250", 5, 4)
grid("220", 5, 5)
grid("230", 5, 6)

gridContainer.appendChild(makeLine())




csCourseTree.rootNode = csCourseObjects["000"]
