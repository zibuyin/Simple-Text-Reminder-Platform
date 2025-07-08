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
    identifier = "note-" + this.id; // Get the ID of the note being hovered
    let text = document.getElementById(identifier)
    text.style.textDecoration = "line-through"; // Strike through the text
    text.style.color = "gray"; // Change text color to gray

}
function changeIconLeave() {
    this.classList.remove("fa-circle-check");
    this.classList.add("fa-circle");
    identifier = "note-" + this.id; // Get the ID of the note being hovered
    let text = document.getElementById(identifier)
    text.style.textDecoration = "none"; // Strike through the text
    text.style.color = "var(--accent)"; // Change text color to gray


}
// Prompt user to confirm and clear all notes
function dataDeletion() {
    var confirm = prompt("Please type (case sensitive): I confirm that I want to delete all my notes")
    if (confirm === "I confirm that I want to delete all my notes") {
        deleteAllNotes(); // Call the delete function if the confirmation is correct
        alert("Confirmation succeeded. All notes are deleted")
        location.reload()
    } else {
        alert("Confirmation failed. No notes were deleted.");
    }
}
function deleteAllNotes() {
    currentDarkMode = document.documentElement.getAttribute('data-theme');
    storeMode = currentDarkMode || localStorage.getItem('theme') || 'light'; // Fallback to light mode if not set

    localStorage.clear(); // Clear all notes from localStorage
    localStorage.setItem('noteCount', -1); // Reset note count
    localStorage.setItem('theme', storeMode); // Store the current theme
    document.documentElement.setAttribute('data-theme', storeMode); // Set the theme back to the stored value
    // Add a new note
}

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
        notes.prepend(noteDisplay);

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



        const StarButton = document.createElement("i"); // Create star icon
        StarButton.className = "fa-regular fa-star star-button";
        StarButton.id = "star-" + i;
        StarButton.onmousehover = function () {
            this.classList.remove("fa-regular");
            this.classList.add("fa-solid");
        }; // Change icon on hover
        StarButton.onmouseleave = function () {
            this.classList.remove("fa-solid");
            this.classList.add("fa-regular"); // Change icon back on mouse leave
        };


        notes.appendChild(deleteButton);
        // notes.appendChild(StarButton); // Add the star button to the note
        reminderContainer.appendChild(notes);
    }

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
    const reminderCounter = document.getElementById("reminder-counter")
    reminderCounter.innerHTML = "You have " + counter + " reminders";

    //Show or hide the day clear prompt based on the counter
    const dayClearPrompt = document.getElementById("day-clear-prompt");

    if (counter === 0) {
        dayClearPrompt.style.display = "block"; // Show the prompt
        reminderCounter.innerHTML = "Day Clear!";
    }
    else {
        dayClearPrompt.style.display = "none"; // Hide the prompt
        reminderCounter.style.display = "block"; // Show the counter
    }


}

// Dark mode toggle listener
const checkbox = document.querySelector('.switch input[type="checkbox"]');
checkbox.addEventListener('change', function () {
    if (this.checked) {
        console.log("Dark mode enabled")
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        //document.cookie = "theme=dark; path=/; expires=Thu, 1 Jan 5000 12:00:00 UTC";
    } else {
        console.log("Dark mode disabled")
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        //document.cookie = "theme=light; path=/; expires=Thu, 1 Jan 5000 12:00:00 UTC";
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