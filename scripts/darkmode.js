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



// Apply saved theme setting
if (document.documentElement.getAttribute('data-theme') === 'dark' || localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    checkbox.checked = true;
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    checkbox.checked = false;
}


function summerizeReminder() {
    textarea = document.getElementsByClassName("entry-textarea")[0]
    alert(textarea.value)
}