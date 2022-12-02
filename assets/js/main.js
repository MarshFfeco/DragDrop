class DragCard {
    constructor(cards, dropZone) {
        this.cards = cards;
        this.dropZone = dropZone;

        this.event();
    }

    event() {
        this.cards.forEach(card => {
            card.addEventListener("dragstart", () => this.dragStart(card));
            card.addEventListener("drag",  () => this.drag(card));
            card.addEventListener("dragend",  () => this.dragEnd(card))
        });

        this.dropZone.forEach(zone => {
            zone.addEventListener("dragenter",  () => this.dragEnter(zone));
            zone.addEventListener("dragover",  () => this.dragOver(zone));
            zone.addEventListener("dragleave",  () => this.dragLeave(zone));
            zone.addEventListener("drop",  () => this.drop(zone));
        });
    }

    dragStart(card) {
        this.dropZone.forEach( zone => zone.classList.add("hightlight"));

        card.classList.add("isdragging")
    }

    drag(card) {
        
    }

    dragEnd(card) {
        this.dropZone.forEach( zone => zone.classList.remove("hightlight"));

        card.classList.remove("isdragging")
    }


    dragEnter(zone){

        console.log()
    }

    dragOver(zone){
        zone.classList.add("dragover")

        const dragBeingDragged = document.querySelector(".isdragging") 

        zone.appendChild(dragBeingDragged)
    }

    dragLeave(zone){
        zone.classList.remove("dragover")
    }

    drop(zone){
        zone.classList.remove("dragover")
    }
}

const cards = document.querySelectorAll(".card");
const dropZone = document.querySelectorAll(".dropzone")

const clss = new DragCard(cards, dropZone);