//---Date code---

// Used to fetch and pharse current time
function getTime() {
    let time = new Date()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    return {
        "date": time,
        "year": time.getFullYear(),
        "month": time.getMonth() + 1,
        "monthText": months[time.getMonth()],
        "day": time.getDate(),
        "dayText": days[time.getDay()],
        "hour": time.getHours(),
        "minutes": time.getMinutes(),
        "seconds": time.getSeconds(),
        "milisec": time.getMilliseconds()

    }

}

async function displayDate() {
    dateNow = getTime()
    display = dateNow.dayText + " " + dateNow.monthText + " " + dateNow.day + " " //Pharse it
    document.getElementById('date').innerHTML = display //Dispay it (yee)
}

setInterval(displayDate, 1000)






