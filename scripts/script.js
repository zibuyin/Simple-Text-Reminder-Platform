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