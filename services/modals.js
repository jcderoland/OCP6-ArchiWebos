import { projectsList } from "./fetchProjects.js";
import { deletePhoto } from "./deleteProject.js";

const modal = document.getElementById("modal");
const editBtn = document.getElementById("editBtn");
const closeBtn = document.getElementsByClassName("close")[0];
const addProjectBtn = document.getElementById("add-project-btn");
const modal2 = document.getElementById("addPhotoPage");
const closeBtn2 = document.getElementsByClassName("close")[1];
const photoFileInput = document.querySelector("#photoFileInput");

editBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Add the icon for adding image
let iconContainer = document.createElement("div");
iconContainer.style = "height: 100px; width: 100px;";
let icon = document.createElement("i");
icon.className = "fa-regular fa-image";
icon.style = "font-size: 100px;";
iconContainer.appendChild(icon);

// Get the parent of the photo file input
let modalContent = photoFileInput.parentNode;

// Insert icon container before the photo file input
modalContent.insertBefore(iconContainer, photoFileInput);

// Add event listener to the input
photoFileInput.addEventListener("change", (event) => {
  let file = event.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onloadend = () => {
      // When file is read, set it as background of the icon
      iconContainer.style.backgroundImage = `url(${reader.result})`;
      iconContainer.style.backgroundSize = "contain";
      iconContainer.style.backgroundRepeat = "no-repeat";
      iconContainer.style.backgroundPosition = "center";
      icon.style.backgroundPosition = "center";
      icon.style.display = "none";
    };
    reader.readAsDataURL(file);
  }
});

addProjectBtn.addEventListener("click", function (event) {
  event.preventDefault();
  modal.style.display = "none";
  modal2.style.display = "block";
});

closeBtn2.addEventListener("click", function () {
  modal2.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
});

function handleImageError(event) {
  console.error("Image loading failed:", event.target.src);
}

function displayPhotos(photos) {
  console.log("displayPhotos called with", photos);

  let galleryPhotos = document.getElementById("modal-gallery");
  galleryPhotos.innerHTML = "";

  photos.forEach((photo) => {
    console.log("Processing photo", photo);

    let card = document.createElement("div");
    card.className = "card";
    let img = document.createElement("img");
    img.src = photo.imageUrl;
    img.alt = photo.title;
    let editBtn = document.createElement("p");
    editBtn.innerText = "éditer";
    img.addEventListener("error", handleImageError);
    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash-can delete-icon";
    deleteIcon.addEventListener("click", function () {
      deletePhoto(photo.id);
    });
    card.appendChild(img);
    card.appendChild(editBtn);
    card.appendChild(deleteIcon);
    galleryPhotos.appendChild(card);
  });
}

let editButton = document.getElementById("editBtn");
editButton.addEventListener("click", async () => {
  console.log("Edit button clicked");

  let modal = document.getElementById("modal");
  modal.style.display = "block";

  try {
    console.log("About to fetch and display photos");
    displayPhotos(projectsList);
    console.log("Finished fetching and displaying photos");
  } catch (error) {
    console.error("Error fetching and displaying photos:", error);
  }
});
