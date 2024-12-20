export default function errorFunction() {
  const searchError = document.getElementById("search-error");
  const searchText = document.getElementById("search-text");
  const searchBtn = document.getElementById("search-btn");

  // Helper function to display errors
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

  // Validate input field
  searchText.addEventListener("input", () => {
    if (searchText.value.trim()) {
      clearError(searchText, searchError);
    } else {
      showError(searchText, searchError, "Please enter a valid location.");
    }
  });

  // Prevent form submission if the input is invalid
  searchBtn.addEventListener("click", (event) => {
    if (!searchText.value.trim()) {
      event.preventDefault();
      showError(searchText, searchError, "Please enter a valid location.");
    }
  });
}
