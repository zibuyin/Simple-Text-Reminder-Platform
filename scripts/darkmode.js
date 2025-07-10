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

const theme_color = document.getElementById("theme-color")
// const logo_image = document.querySelector('image[id="-about-logo-image"]')
const logo_image = document.getElementById('-about-logo-image')
// Apply saved theme setting
if (document.documentElement.getAttribute('data-theme') === 'dark' || localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    // logo_image.setAttribute('src', '/images/Apple4/Simple_Reminders-iOS-Dark-1024x1024@2x.png')



    checkbox.checked = true;
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    // logo_image.setAttribute('src', '/images/Apple4/Simple_Reminders-iOS-Default-1024x1024@2x.png')

    checkbox.checked = false;
}

function setLogoTheme() {
    if (document.documentElement.getAttribute('data-theme') === 'dark' || localStorage.getItem('theme') === 'dark') {
        logo_image.setAttribute('src', '/images/Apple4/Simple_Reminders-iOS-Dark-1024x1024@2x.png')



        checkbox.checked = true;
    } else {
        logo_image.setAttribute('src', '/images/Apple4/Simple_Reminders-iOS-Default-1024x1024@2x.png')

        checkbox.checked = false;
    }
}

function setThemeColor(color) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute('content', color);
    }
}

// Example: watch data-theme and update meta tag
const html = document.documentElement;

const observer = new MutationObserver(() => {
    const theme = html.getAttribute('data-theme');
    if (theme === 'dark') setThemeColor('rgb(30, 30, 30)');
    else setThemeColor('rgb(248, 231, 200)');
});

observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });

function summerizeReminder() {
    textarea = document.getElementsByClassName("entry-textarea")[0]
    alert(textarea.value)
}