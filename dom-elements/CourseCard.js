export class CourseCard {
    constructor(courseNode) {
        this.courseNode = courseNode
        // holds the dom element representing the courseNode
        this.element = document.createElement("div")
    }

    makeDomElement() {
        // Create the main div
        this.element = document.createElement("div")
        this.element.className = "course-card";

        // Create and append course identifier
        const identifier = document.createElement("h2");
        identifier.className = "course-identifier";
        identifier.textContent = this.courseNode.courseIdentifier;
        this.element.appendChild(identifier);

        // Create and append course name
        const name = document.createElement("h3");
        name.className = "course-name";
        name.textContent = this.courseNode.courseTitle;
        this.element.appendChild(name);

        // Create and append semester label
        const semester = document.createElement("h3");
        semester.className = "semester-label";
        semester.textContent = `Semester: ${this.courseNode.semester || 'N/A'}`;
        this.element.appendChild(semester);

        // Create and append grade
        const grade = document.createElement("h3");
        grade.className = "grade";
        grade.textContent = `Grade: ${this.courseNode.grade || 'N/A'}`;
        this.element.appendChild(grade);

        return this.element;
    }
}