import { CourseCard } from "./dom-elements/CourseCard.js";
import { CourseTree } from "./business-logic/CourseTree.js";
import { CourseNode } from "./business-logic/CourseNode.js";
import { D3TreeMaker } from "./d3/d3TreeMaker.js";
// making a tree object to represent cs course prerequisites up to 200 levels

let csCourseTree = new CourseTree()

let csCourseObjects = {
    "000": new CourseNode("CS 000", "Placeholder Course", "1", "F-", false, []),
    "110": new CourseNode("CICS 110", "Foundations of Programming", "1", "F-", false, []),
    "160": new CourseNode("CICS 160", "Object Oriented Programming", "1", "F-", false, []),
    "198": new CourseNode("198C", "Intro to C", "1", "F-", false, []),
    "210": new CourseNode("CICS 210", "Data Structures", "1", "F-", false, []),
    "220": new CourseNode("CS 220", "Programming Methodology", "1", "F-", false, []),
    "230": new CourseNode("CS 230", "Computer System Principles", "1", "F-", false, []),
    "240": new CourseNode("CS 240", "Reasoning Under Uncertainty", "1", "F-", false, []),
    "250": new CourseNode("CS 250", "Intro to Computation", "1", "F-", false, []),
    "131": new CourseNode("MATH 131", "Calculus I", "1", "F-", false, []),
    "132": new CourseNode("MATH 132", "Calculus II", "1", "F-", false, []),
    "233": new CourseNode("MATH 233", "Multivariable Calc", "1", "F-", false, []),
    "235": new CourseNode("MATH 235", "Linear Algebra", "1", "F-", false, []),
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

let exampleCourseCards = [
    new CourseCard(csCourseObjects["110"]),
    new CourseCard(csCourseObjects["160"]),
    new CourseCard(csCourseObjects["210"]),
    new CourseCard(csCourseObjects["220"]),
    new CourseCard(csCourseObjects["230"]),
]



csCourseTree.rootNode = csCourseObjects["000"]

let treeMaker = new D3TreeMaker(csCourseTree)

document.querySelector("body").appendChild(treeMaker.makeTree())