
let deferredPrompt = null;

// Save the event so we can trigger it later
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault(); // Prevent auto prompt
    deferredPrompt = event; // Save the event for later
    console.log("Install prompt saved and ready to trigger.");
});

function installHandler() {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // Show the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the install prompt");
            } else {
                console.log("User dismissed the install prompt");
            }
            deferredPrompt = null; // Clear after use
        });
    } else {
        console.log("No install prompt available.");
    }
}
