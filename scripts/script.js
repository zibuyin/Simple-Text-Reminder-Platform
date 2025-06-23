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
        alert("Confirmation succeeded. All notes are deleted")
    }
    else {
        alert("Confirmation failed. aborting data deletion")


    }
}

function submitEntry() {
    var valueEntry = document.getElementsByClassName("entry-textarea")[0].value
    var textArea = document.getElementsByClassName("entry-textarea")[0]
    var noteID = parseInt(localStorage.getItem('noteCount')) + 1 //Increase the number by 1 to get current count
    localStorage.setItem('noteCount', parseInt(noteID))
    localStorage.setItem(noteID, valueEntry) //store the note
    // console.log(valueEntry)
    textArea.value = "" //Clear the text area after submition
    displayNotes()


}


function displayNotes() {
    var x = localStorage.getItem('0')
    var testing = document.getElementsByClassName("entry-display")[0].innerHTML = x
    for (var i = 0; i < localStorage.length; i++) {
        console.log("Item: ", localStorage.getItem(localStorage.key(i)))
    }
    console.log("-----")
}

function setRemindersCounter() {
    console.log(String(typeof (localStorage.length)))
    document.getElementById("reminders-counter").innerHTML = "There are " + String(localStorage.length - 1) + " reminders"
}



// Initianlization
localStorage.setItem('noteCount', -1)
setRemindersCounter()

displayNotes()
//DEBUG DO NOT PUSH 
// localStorage.clear()

//DEBUG DO NOT PUSH 
