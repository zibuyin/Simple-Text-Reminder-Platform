function profileClick() {
    console.log("called")
    var container = document.getElementById("super-popup-container");
    console.log(container)
    if (container.style.display === "block") {
        console.log("displaying popup")
        container.style.display = "none";
    } else {
        console.log("hiding popup")
        container.style.display = "block";
    }
}
function gdprClick() {
    console.log("called")
    var container = document.getElementById("gdpr-super-popup-container");
    console.log(container)
    if (container.style.display === "block") {
        console.log("displaying popup")
        container.style.display = "none";
    } else {
        console.log("hiding popup")
        container.style.display = "block";
    }
}

function dataDeletion() {
    var confirm = prompt("Please type (case sensitive): I confirm that I want to delete all my notes")
    if (confirm === "I confirm that I want to delete all my notes") {
        localStorage.clear()
        location.reload(true)
        displayNotes()

        alert("Confirmation succeeded. All notes are deleted")
    }
    else {
        alert("Confirmation failed. aborting data deletion")


    }
}

function submitEntry() {
    var valueEntry = document.getElementsByClassName("entry-textarea")[0].value
    var textArea = document.getElementsByClassName("entry-textarea")[0]
    if (valueEntry === "") {
        return
    }
    noteID = parseInt(localStorage.getItem('noteCount')) + 1

    localStorage.setItem('noteCount', noteID)
    localStorage.setItem(noteID, valueEntry) //store the note
    // console.log(valueEntry)
    displayNotes()
    setRemindersCounter()
    textArea.value = "" //Clear the text area after submition



}


function displayNotes() {
    for (var i = 0; i < localStorage.length; i++) {
        console.log("Item: ", localStorage.getItem(localStorage.key(i)))
    }
    console.log("-----")


    var noteDisplay = document.createElement("h2")
    let reminderContainer = document.getElementsByClassName("stored-container")[0]
    noteDisplay.className = "entry-display"
    reminderContainer.appendChild(noteDisplay)
    noteID = parseInt(localStorage.getItem('noteCount'))
    console.log("debug2: ", noteID)
    var valueEntry = document.getElementsByClassName("entry-textarea")[0].value
    console.log("debug3", valueEntry)
    document.getElementsByClassName("entry-display")[noteID].innerHTML = valueEntry

}

function setRemindersCounter() {
    console.log("Notes Number: ", String(localStorage.length))
    document.getElementById("reminders-counter").innerHTML = "There are " + String(localStorage.length - 1) + " reminders"

}


//DEBUG DO NOT PUSH 
localStorage.clear()

//DEBUG DO NOT PUSH 

// Initianlization

localStorage.setItem('noteCount', -1)

setRemindersCounter()

// displayNotes()
