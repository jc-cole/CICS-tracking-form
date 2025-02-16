export class CourseCard {
    constructor(courseNode) {
        this.courseNode = courseNode
        // holds the dom element representing the courseNode
        this.element = document.createElement("div")
    }

    makeDomElement() {
        // Create the main div
        this.element = document.createElement("div");
        this.element.className = "course-card";
    
        // Create and append course identifier and checkbox
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.justifyContent = "space-between";
        container.style.alignItems = "center"
    
        const identifier = document.createElement("h2");
        identifier.className = "course-identifier";
        identifier.textContent = this.courseNode.courseIdentifier;
        container.appendChild(identifier);
    
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "course-completed-checkbox";
        checkbox.addEventListener("change", (event) => {
            if (event.target.checked) {
                this.element.style.borderColor = "lightgreen";
            } else {
                this.element.style.borderColor = ""; // Reset to default
            }
        });
        container.appendChild(checkbox);
        this.element.appendChild(container);
    
        // Create and append course name
        const name = document.createElement("h3");
        name.className = "course-name";
        name.textContent = this.courseNode.courseTitle;
        this.element.appendChild(name);
    
        // Create and append semester label with input field
        const semesterContainer = document.createElement("div");
        semesterContainer.style.display = "flex";
        semesterContainer.style.alignItems = "center";
    
        const semesterLabel = document.createElement("h3");
        semesterLabel.className = "semester-label";
        semesterLabel.textContent = "Semester: ";
        semesterContainer.appendChild(semesterLabel);
    
        const semesterInput = document.createElement("input");
        semesterInput.type = "text";
        semesterInput.value = this.courseNode.semester || '';
        semesterInput.style.marginLeft = "10px";
        semesterContainer.appendChild(semesterInput);
    
        this.element.appendChild(semesterContainer);
    
        // Create and append grade with input field
        const gradeContainer = document.createElement("div");
        gradeContainer.style.display = "flex";
        gradeContainer.style.alignItems = "center";
    
        const gradeLabel = document.createElement("h3");
        gradeLabel.className = "grade";
        gradeLabel.textContent = "Grade: ";
        gradeContainer.appendChild(gradeLabel);
    
        const gradeInput = document.createElement("input");
        gradeInput.type = "text";
        gradeInput.value = this.courseNode.grade || '';
        gradeInput.style.marginLeft = "10px";
        gradeContainer.appendChild(gradeInput);
    
        this.element.appendChild(gradeContainer);
    
        return this.element;
    }
}