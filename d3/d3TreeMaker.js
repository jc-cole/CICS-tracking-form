import { CourseCard } from "../dom-elements/CourseCard.js"

export class D3TreeMaker {
    constructor(courseTree) {
        this.courseTree = courseTree
    }

    // 90% AI generated code. not good but functional. somehow.
    makeTree() {
        let d3Data = this.courseTree.convertToD3Hierarchy()

        let courseNodes = this.courseTree.getAllNodes()

        let courseCards = courseNodes.map((node) => {
            return new CourseCard(node)
        })

        const courseCardMap = new Map(courseCards.map(card => [card.courseNode.courseIdentifier, card]));

        const treeLayout = d3.tree()
        .size([window.innerHeight - 100, window.innerWidth - 100]);
        const root = d3.hierarchy(d3Data);
        const treeData = treeLayout(root);

        const container = document.createElement('div');
        container.style.width = "100vw";
        container.style.height = "150vh";
        container.style.position = "relative";
        container.style.margin = "100px 100px";

        // Use D3 to select the container
        const d3Container = d3.select(container);

        // Add nodes
        const node = d3Container.selectAll(".node")
            .data(treeData.descendants())
            .enter().append(function(d) {
                const courseCard = courseCardMap.get(d.data.name);
                if (courseCard) {
                    courseCard.makeDomElement();
                    return courseCard.element.cloneNode(true);
                }
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

        // Add links
        const linkContainer = d3Container.append("svg")
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
            .style("stroke-width", "15px");

        return container;
    }
}