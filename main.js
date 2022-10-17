const addToDoButton = document.querySelector("#addToDoButton");
const addToDoInput = document.querySelector("#toDoInput");
const toDoList = document.querySelector("#toDoList");
const numberOfFinishedToDos = document.querySelector("#numberOfFinishedToDos");
let toDoItems = [];
let currentlyFinishedItems = parseInt(numberOfFinishedToDos.textContent);

addToDoButton.addEventListener("click", toDoListener);

function toDoListener() {
  if (addToDoInput.value === "") {
    alert("Write something");
  } else {
    const toDoId = Date.now();
    toDoItems.push({ text: addToDoInput.value, completed: false, id: toDoId });
    const trashCan = document.createElement("img");
    trashCan.src = "trashcan.svg";
    const toDoItem = document.createElement("li");
    toDoItem.textContent = addToDoInput.value;
    const hiddenToDoId = document.createElement("span");
    hiddenToDoId.setAttribute("hidden", true);
    hiddenToDoId.textContent = toDoId;
    toDoItem.append(trashCan);
    toDoItem.append(hiddenToDoId);
    toDoList.append(toDoItem);
    addToDoInput.value = "";
    setTimeout(()=> {
      toDoItem.classList.add("fadeIn")
    }, 200)

    trashCan.addEventListener("click", (event) => {
      let toDoId = parseInt(trashCan.nextSibling.textContent);
      toDoItems = toDoItems.filter((toDo) => {
        return toDo["id"] !== toDoId
      });
        trashCan.remove();
        toDoItem.remove();
      if (toDoItem.classList.contains("finishedToDo")) {
        currentlyFinishedItems--;
      }
      numberOfFinishedToDos.textContent =
        currentlyFinishedItems >= 0 ? currentlyFinishedItems : 0;
      event.stopPropagation();
    });

    toDoItem.addEventListener("click", () => {
      let toDoId = parseInt(trashCan.nextSibling.textContent);
      if (toDoItem.classList.contains("finishedToDo")) {
        toDoItems.forEach((toDo, index) => {
          if(toDo["id"] === toDoId) {
            toDoItems[index]["completed"] = false;
          }
        });
        toDoItem.classList.remove("finishedToDo");
        currentlyFinishedItems--;
      } else {
        toDoItems.forEach((toDo, index) => {
          if(toDo["id"] === toDoId) {
            toDoItems[index]["completed"] = true;
          }
        });
        toDoItem.classList.add("finishedToDo");
        currentlyFinishedItems++;
      }
      numberOfFinishedToDos.textContent = currentlyFinishedItems;
    });
  }
}
