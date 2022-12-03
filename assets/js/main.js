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

//////////////////////
//// ADD MORE BOARD
/////////////////////

class Board {
    constructor(btn_open, btn_close, form_style, form, zone) {
        this.open = btn_open
        this.close = btn_close;

        this.formS = form_style;
        this.form = form;

        this.zone = zone;

        this.event();
    }

    event() {
        this.open.addEventListener("click", () => this.openForm());

        this.close.addEventListener("click", () => this.closeForm());

        this.form.addEventListener("submit", e => {
            e.preventDefault()
            this.formValid()
            this.closeForm()
        })
    }

    formValid() {
        var title = "";
        var priority = ";"

        for(let input of this.form) {
            switch(input.type){
                case "text":
                    title = input.value;
                    break;
                case "radio":
                    if(input.checked) {
                        priority = input.value;
                    }
                    break;
            }

        }

        this.createBoard(title, priority);
    }

    createBoard(title, color) {
        const board = `
            <div class="card" draggable="true">
                <div class="card__status ${color}"></div>
                <div class="card__contents">${title}</div>
            </div>
            `;

        this.zone.insertAdjacentHTML("afterbegin", board)
    }

    closeForm() {
        this.formS.style.display = "none";
    }

    openForm() {
        this.formS.style.display = "flex";
    }
}

const btn_open = document.getElementById("open_board")
const btn_close = document.getElementById("btn_close");
const formS = document.getElementById("form");
const form = document.getElementById("make-board");
const zone = document.getElementById("add-zone")

new Board(btn_open, btn_close, formS, form, zone);