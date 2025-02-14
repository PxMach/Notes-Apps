const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
   notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage() {
   localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
   let inputBox = document.createElement("p");
   let img = document.createElement("img");
   inputBox.className = "input-box";
   inputBox.setAttribute("contenteditable", "true");
   img.src = "images/delete.png";
   notesContainer.appendChild(inputBox).appendChild(img);
   updateStorage();
});

notesContainer.addEventListener("click", function (e) {
   if (e.target.tagName === "IMG") {
      e.target.parentElement.remove();
      updateStorage();
   } else if (e.target.tagName === "P") {
      notes = document.querySelectorAll(".input-box");
      notes.forEach((nt) => {
         nt.onkeyup = function () {
            updateStorage();
         };
      });
   }
});

document.addEventListener("keydown", (event) => {
   if (event.key === "Enter") {
      event.preventDefault();

      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      range.deleteContents();

      // Créer un élément de saut de ligne
      const br = document.createElement("br");
      range.insertNode(br);

      // Déplacer le curseur après le saut de ligne
      range.setStartAfter(br);
      range.setEndAfter(br);
      selection.removeAllRanges();
      selection.addRange(range);
   }
});
