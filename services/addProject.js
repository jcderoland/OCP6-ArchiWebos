// Declare and initialize token
let token = localStorage.getItem("token");

// Fetch API URL
const API_URL = "http://localhost:5678/api/works";

// Select elements
const submitPhotoBtn = document.querySelector("#add-project-confirm");
const photoFileInput = document.querySelector("#photoFileInput");
const projectNameInput = document.querySelector("#projectNameInput");
const categorySelect = document.querySelector("#categorySelect");

submitPhotoBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Get form data
  const photoFile = photoFileInput.files[0];
  const projectName = projectNameInput.value;
  const category = categorySelect.value;

  const formData = new FormData();
  formData.append("image", photoFile);
  formData.append("title", projectName);
  formData.append("category", category);

  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur lors de l'ajout de la photo.");
      }
    })
    .then((data) => {
      photoFileInput.value = "";
      projectNameInput.value = "";
      categorySelect.selectedIndex = 0;

      modal2.style.display = "none";

      fetchProjects();
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de la photo:", error);
    });
});
