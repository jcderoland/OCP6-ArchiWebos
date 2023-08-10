// Fetch API URL
const API_URL = "http://localhost:5678/api/works";

function deletePhoto(photoId, projectsList, updateGallery) {
  let token = localStorage.getItem("token");

  fetch(`${API_URL}/${photoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        // Remove the deleted photo from the projectsList
        projectsList = projectsList.filter((project) => project.id !== photoId);

        // Update the gallery with the updated projectsList
        updateGallery();

        // Close the modal if needed
        const modal = document.getElementById("modal");
        if (modal.style.display === "block") {
          modal.style.display = "none";
        }
      } else {
        console.error("Error while deleting the photo.");
      }
    })
    .catch((error) => {
      console.error("Error while deleting the photo:", error);
    });
}

export { deletePhoto }; // Export deletePhoto function
