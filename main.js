import { CourseCard } from "./dom-elements/CourseCard.js";
import { CourseTree } from "./business-logic/CourseTree.js";
import { CourseNode } from "./business-logic/CourseNode.js";
import { D3TreeMaker } from "./d3/d3TreeMaker.js";
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

let treeMaker = new D3TreeMaker(csCourseTree)

document.querySelector("body").appendChild(treeMaker.makeTree())