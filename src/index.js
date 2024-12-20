import "./styles.css";
import weather from "./weather.js";
import errorFunction from "./error.js";

document.getElementById("search-btn").addEventListener("click", () => {
  const innerFrame = document.getElementById("inner-frame");
  const frames = innerFrame.children;

  // Hide all child elements inside the inner-frame
  for (let frame of frames) {
    frame.style.display = "none";
  }
});

weather();
errorFunction();
