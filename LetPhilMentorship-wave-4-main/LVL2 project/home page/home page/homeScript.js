document.addEventListener("DOMContentLoaded", function() {
    const welcomeMessageByTime = document.querySelector("#welcomeMessageByTime");
    const timeOfDay = document.querySelector("#currentLocalTime");
    const homePageImage = document.querySelector(".homePageImage");

    const getTimeGreeting = (hr) => {
        if (hr >= 5 && hr < 12) return "Good morning";
        else if (hr >= 12 && hr < 17) return "Good afternoon";
        else if (hr >= 17 && hr < 21) return "Good evening";
        else return "Good night";
    };

    const setBackgroundImage = (hr) => {
        if (hr >= 7 && hr < 11)
            return "url(https://images.pexels.com/photos/955656/pexels-photo-955656.jpeg)";
        else if (hr >= 11 && hr < 18)
            return "url(https://images.pexels.com/photos/4577771/pexels-photo-4577771.jpeg)";
        else if (hr >= 18 && hr < 21)
            return "url(https://images.pexels.com/photos/34351219/pexels-photo-34351219.jpeg)";
        else
            return "url(https://images.pexels.com/photos/11781462/pexels-photo-11781462.jpeg)";
    };

    const refreshContent = () => {
        let now = new Date();
        let hour = now.getHours();
        welcomeMessageByTime.textContent = getTimeGreeting(hour);
        homePageImage.style.backgroundImage = setBackgroundImage(hour);
        timeOfDay.textContent = `The current local time is: ${now.toLocaleTimeString()}`;
    };

    refreshContent();
    setInterval(refreshContent, 1000);
});