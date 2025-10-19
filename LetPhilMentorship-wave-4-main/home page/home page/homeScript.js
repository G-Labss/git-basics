document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessageByTime = document.getElementById("welcomeMessageByTime");
    const timeOfDay = document.getElementById("currentLocalTime");
    const homePageImage = document.querySelector(".homePageImage");

    // Greetings by time
    function localTimeGreeting(hour) {
        if (hour >= 5 && hour < 12) {
            return "Good morning";
        }
        else if (hour >= 12 && hour < 17) {
            return "Good afternoon";
        }
        else if (hour >= 17 && hour < 21) {
            return "Good evening";
        }
        else {
            return "Good night";
        }
    }

    // Background by time
    function backgroundByTime(hour) {
        if (hour >= 7 && hour < 11) {
            return "url(https://images.pexels.com/photos/955656/pexels-photo-955656.jpeg)";
        }
        else if (hour >= 11 && hour < 18) {
            return "url(https://images.pexels.com/photos/4577771/pexels-photo-4577771.jpeg)";
        }
        else if (hour >= 18 && hour < 21) {
            return "url(https://images.pexels.com/photos/34351219/pexels-photo-34351219.jpeg)";
        }
        else {
            return "url(https://images.pexels.com/photos/11781462/pexels-photo-11781462.jpeg)";
        }
    }

    function updateTime() {
        const hour = new Date().getHours();
        const greetingText = localTimeGreeting(hour);
        welcomeMessageByTime.textContent = greetingText;
        homePageImage.style.backgroundImage = backgroundByTime(hour);
        timeOfDay.textContent = `The current local time is: ${new Date().toLocaleTimeString()}`;
    }

    updateTime();

    setInterval(updateTime, 1000);
});