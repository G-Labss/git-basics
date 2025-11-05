const dateInput = document.getElementById("dateInput");
const getApodBtn = document.getElementById("getApodBtn");
const apodDisplay = document.getElementById("apodDisplay");

// Set default date to today
const today = new Date().toISOString().split("T")[0];
dateInput.value = today;

getApodBtn.addEventListener("click", async () => {
    const date = dateInput.value;
    
    // Input validation
    if (!date) {
        apodDisplay.innerHTML = `<p>Please select a date</p>`;
        return;
    }

    const key = "LimRmVhTVOamgWjzSmSH9GIDkpwzpnTjVUhmw6pU"; 
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`;

    // Display loading state
    apodDisplay.innerHTML = `<p>Loading astronomy picture...</p>`;

    try {
        const response = await fetch(apodUrl);
        if (!response.ok) {
            throw new Error(`APOD API error: ${response.status}`);
        }
        const data = await response.json();

        // Display APOD data
        apodDisplay.innerHTML = `
            <div class="apod-content">
                <h2>${data.title}</h2>
                <p>Date: ${data.date}</p>
                ${data.media_type === "image" 
                    ? `<img src="${data.url}" alt="${data.title}" class="apod-image">`
                    : `<iframe src="${data.url}" class="apod-video" frameborder="0" allowfullscreen></iframe>`
                }
                <p>${data.explanation}</p>
                ${data.copyright ? `<p>Copyright: ${data.copyright}</p>` : ""}
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        apodDisplay.innerHTML = `<p>Error: Unable to fetch APOD data for ${date}. Please try another date.</p>`;
    }
});

// Add enter key support
dateInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getApodBtn.click();
    }
});