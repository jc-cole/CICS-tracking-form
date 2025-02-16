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



