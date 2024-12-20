export default function weather() {
  const searchText = document.getElementById("search-text");
  const searchBtn = document.getElementById("search-btn");
  const searchError = document.getElementById("search-error");

  searchBtn.addEventListener("click", async (event) => {
    const location = searchText.value.trim();
    if (!location) {
      event.preventDefault();
      showError(searchText, searchError, "Please enter a valid location.");
      return;
    }

    const apiKey = "AZTM6UVREGKB96SN3QKWA325H";
    const unitGroup = "metric"; // Units: "metric" or "imperial"
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${apiKey}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.error || !data.currentConditions) {
        showError(searchText, searchError, "Please input a valid location.");
        return;
      }

      console.log(data);

      document.getElementById("outer-frame").style.display = "none";

      displayWeather(data, location);
    } catch (error) {
      console.error(error.message);
      showError(
        searchText,
        searchError,
        "Unable to fetch weather data. Please try again."
      );
    }
  });

  function showError(field, errorElement, message) {
    field.classList.add("error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  // Helper function to clear errors
  function clearError(field, errorElement) {
    field.classList.remove("error");
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }

  function displayWeather(data, location) {
    const body = document.querySelector("body");

    const weatherDiv = document.createElement("div");
    weatherDiv.classList.add("show-weather");

    const currentDay = data.currentConditions || data.days[0]; // Current weather or fallback to first day
    const currentSummary = currentDay.conditions;
    const currentTemp = currentDay.temp;
    const feelsLike = currentDay.feelslike;
    const description =
      currentDay.description || "No detailed description available.";

    const forecast = data.days.slice(1, 8);

    weatherDiv.innerHTML = `
        <img id="weatherIcon" src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" alt="weather-icon">
        <h3>Weather for ${location}</h3>
        <p>${currentSummary}</p>
        <p><strong>${currentTemp}°C</strong></p>
        <p>Feels like: ${feelsLike}°C</p>
        <p>${description}</p>
        <hr>
        <h4>7 Days Forecast</h4>
        <div id="forecast">
          ${forecast
            .map(
              (day) => `
            <div class="forecast-day">
              <p><strong>${new Date(day.datetime).toLocaleDateString("en-US", {
                weekday: "short",
              })}</strong></p>
              <p>${day.tempmin} - ${day.tempmax}°C</p>
              <p>${day.conditions}</p>
            </div>
          `
            )
            .join("")}
        </div>
        <button id="return-btn">Refresh</button>
      `;

    body.appendChild(weatherDiv);

    const returnBtn = document.getElementById("return-btn");
    returnBtn.addEventListener("click", () => {
      // Reload the page to restart
      window.location.reload();
    });
  }
}
