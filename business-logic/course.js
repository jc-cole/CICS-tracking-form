class CourseNode {
    constructor(courseIdentifier, courseTitle, isComplete, childNodes) {
        // ex "CICS 210", "MATH 233", assumed to be unique
        this.courseIdentifier = courseIdentifier
        // ex "Data Structures", "Multivariable Calc"
        this.courseTitle = courseTitle
        this.isComplete = isComplete
        // child nodes are the classes which have the current class as a prerequisite
        this.childNodes = childNodes || []
    }

    addChild(node) {
        this.childNodes.push(node)
    }

    removeChild(node) {
        this.childNodes.filter((node) => {
            node.courseIdentifier !== this.courseIdentifier
        })
    }
}