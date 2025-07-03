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

// change icon of the delete button on hover
function changeIconHover() {
    this.classList.remove("fa-circle");
    this.classList.add("fa-circle-check");
}
function changeIconLeave() {
    this.classList.remove("fa-circle-check");
    this.classList.add("fa-circle");
}
// Prompt user to confirm and clear all notes
function dataDeletion() {
    var confirm = prompt("Please type (case sensitive): I confirm that I want to delete all my notes")
    if (confirm === "I confirm that I want to delete all my notes") {
        localStorage.clear()
        alert("Confirmation succeeded. All notes are deleted")
        location.reload()
    } else {
        alert("Confirmation failed. Aborting data deletion")
    }
}

// Add a new note
function submitEntry() {
    var valueEntry = document.getElementsByClassName("entry-textarea")[0].value.trim();
    var textArea = document.getElementsByClassName("entry-textarea")[0]

    if (valueEntry === "") {
        return
    }

    let noteID = parseInt(localStorage.getItem('noteCount')) + 1;
    localStorage.setItem('noteCount', noteID);
    localStorage.setItem(noteID.toString(), valueEntry); // Store the note
    textArea.value = ""; // Clear the text area after submission

    displayNotes();
    setRemindersCounter();
}

// Display all notes from localStorage
function displayNotes() {
    const reminderContainer = document.getElementById("reminder-container");
    reminderContainer.innerHTML = ""; // Clear previous notes

    const noteCount = parseInt(localStorage.getItem("noteCount") || "-1");
    for (let i = 0; i <= noteCount; i++) {
        const noteValue = localStorage.getItem(i.toString());
        if (!noteValue) continue;

        const notes = document.createElement("div"); // Create a new note container
        notes.id = i;
        notes.className = "notes-container";

        const noteDisplay = document.createElement("h2"); // Create <h2> to show the note text
        noteDisplay.className = "notes-display";
        noteDisplay.id = "note-" + i;
        noteDisplay.innerHTML = noteValue;
        notes.appendChild(noteDisplay);

        const deleteButton = document.createElement("i"); // Create delete icon
        deleteButton.className = "fa-regular fa-circle delete-button";
        deleteButton.onmouseover = changeIconHover; // Change icon on hover
        deleteButton.onmouseleave = changeIconLeave; // Change icon back on mouse leave
        deleteButton.id = i;
        deleteButton.onclick = function () {
            const noteID = this.id;
            localStorage.removeItem(noteID); // Delete the note
            displayNotes(); // Refresh UI
            setRemindersCounter(); // Update count
        };

        notes.appendChild(deleteButton);
        reminderContainer.appendChild(notes);
    }

    console.log("Displayed", noteCount + 1, "notes");
}

// Count and show how many reminders are stored
function setRemindersCounter() {
    let counter = 0;
    const noteCount = parseInt(localStorage.getItem("noteCount") || "-1");
    for (let i = 0; i <= noteCount; i++) {
        if (localStorage.getItem(i.toString()) !== null) {
            counter++;
        }
    }
    document.getElementById("reminder-counter").innerHTML = "There are " + counter + " reminders";

    //Show or hide the day clear prompt based on the counter
    const dayClearPrompt = document.getElementById("day-clear-prompt");
    if (counter === 0) {
        dayClearPrompt.style.display = "block"; // Show the prompt
    }
    else {
        dayClearPrompt.style.display = "none"; // Hide the prompt
    }
}

// Dark mode toggle listener
const checkbox = document.querySelector('.switch input[type="checkbox"]');
checkbox.addEventListener('change', function () {
    if (this.checked) {
        console.log("Dark mode enabled")
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.cookie = "theme=dark; path=/; expires=Thu, 1 Jan 5000 12:00:00 UTC";
    } else {
        console.log("Dark mode disabled")
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.cookie = "theme=light; path=/; expires=Thu, 1 Jan 5000 12:00:00 UTC";
    }
});

// Initial setup (only if not set yet)
if (localStorage.getItem('noteCount') === null) {
    localStorage.setItem('noteCount', -1);
}

// Apply saved theme setting
if (document.documentElement.getAttribute('data-theme') === 'dark' || localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    checkbox.checked = true;
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    checkbox.checked = false;
}

// Load all notes and counter on page load
displayNotes();
setRemindersCounter();