// Declaration of the projectsList variable outside the function
let projectsList;

// DEFINITION UPDATE GALLERY FUNCTION
async function updateGallery(projects = projectsList) {
  // Retrieving the DOM element that will host the projects
  const sectionGallery = document.querySelector(".gallery");

  // Clear the gallery by removing all child elements
  sectionGallery.innerHTML = "";

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    // Creating a tag dedicated to a project
    const projectElement = document.createElement("article");

    // Creating tags
    const imageProject = document.createElement("img");
    imageProject.src = project.imageUrl;
    const titleElement = document.createElement("p");
    titleElement.innerText = project.title;

    // Attaching the article tag to the Gallery section
    sectionGallery.appendChild(projectElement);

    // Attaching the image to projectElement (the article tag)
    projectElement.appendChild(imageProject);
    projectElement.appendChild(titleElement);
  }
}

// Initial call to the updateGallery function to load the projects
async function fetchProjects() {
  const response = await fetch("http://localhost:5678/api/works");
  projectsList = await response.json();
  updateGallery();
}

fetchProjects();

// FILTER BUTTONS

// Filter All
const filtrerTous = document.querySelector(".filter-tous");
filtrerTous.addEventListener("click", function () {
  updateGallery();
});

// Filter Objets
const filtrerObjets = document.querySelector(".filter-objets");
filtrerObjets.addEventListener("click", function () {
  const projetsFiltres = projectsList.filter(function (project) {
    return project.category.name === "Objets";
  });
  updateGallery(projetsFiltres);
});

// Filter Appartements
const filtrerAppartements = document.querySelector(".filter-appartements");
filtrerAppartements.addEventListener("click", function () {
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";

  const projetsFiltres = projectsList.filter(function (project) {
    return project.category.name === "Appartements";
  });
  updateGallery(projetsFiltres);
});

// Filter Hôtels & restaurants
const filtrerHotelRestaurants = document.querySelector(
  ".filter-hotel-restaurants"
);
filtrerHotelRestaurants.addEventListener("click", function () {
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";

  const projetsFiltres = projectsList.filter(function (project) {
    return project.category.name === "Hotels & restaurants";
  });
  updateGallery(projetsFiltres);
});

// MODAL WINDOW

// Get the DOM elements
const modal = document.getElementById("modal");
const editBtn = document.getElementById("editBtn");
const closeBtn = document.getElementsByClassName("close")[0];

// Open the modal when the "Edit" button is clicked
editBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// Close the modal when the user clicks the close button (x)
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Close the modal when the user clicks outside of it
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// PHOTOS INTO MODAL WINDOW

// Function to display the photos in the modal window
function displayPhotos(photos = projectsList) {
  let galleryPhotos = document.getElementById("modal-gallery");

  // Clear existing content
  galleryPhotos.innerHTML = "";

  // Iterate through the photos and display them
  photos.forEach((photo) => {
    let card = document.createElement("div");
    card.className = "card";

    let img = document.createElement("img");
    img.src = photo.imageUrl;
    img.alt = photo.title;

    let editBtn = document.createElement("p");
    editBtn.innerText = "éditer";

    // Add an event listener to handle image load errors
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

// FUNCTION "DELETE PHOTO"

function deletePhoto(photoId) {
  let token = localStorage.getItem("token");

  fetch(`http://localhost:5678/api/works/${photoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        fetchProjects();
      } else {
        console.error("Erreur lors de la suppression de la photo.");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de la photo:", error);
    });
}

// Handle image load errors
function handleImageError(event) {
  console.error("Error loading image:", event.target.src);
}

// Code to open the modal window and fetch the photos when the button is clicked
let editButton = document.getElementById("editBtn");
editButton.addEventListener("click", async () => {
  let modal = document.getElementById("modal");
  modal.style.display = "block";

  try {
    // Display the photos in the modal window
    displayPhotos();
  } catch (error) {
    console.error("Error fetching and displaying photos:", error);
  }
});

// OPEN MODAL PAGE 2

// Get the DOM elements
const addProjectBtn = document.getElementById("add-project-btn");
const modal2 = document.getElementById("addPhotoPage");
const closeBtn2 = document.getElementsByClassName("close")[1];

// Close modal1 and open modal2 when the "Add project" button is clicked
addProjectBtn.addEventListener("click", function (event) {
  event.preventDefault();
  modal.style.display = "none";
  modal2.style.display = "block";
});

// Close the modal when the user clicks the close button (x)
closeBtn2.addEventListener("click", function () {
  modal2.style.display = "none";
});

// Close the modal when the user clicks outside of it
window.addEventListener("click", function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
});

// ADD PROJECT MODAL PAGE

// Create a FormData object to send the data as multipart/form-data
const submitPhotoBtn = document.querySelector("#add-project-confirm");

submitPhotoBtn.addEventListener("click", function () {
  const photoFile = document.querySelector("#photoFileInput").files[0];
  const projectName = document.querySelector("#projectNameInput").value;
  const category = document.querySelector("#categorySelect").value;

  const formData = new FormData();
  formData.append("image", photoFile);
  formData.append("title", projectName);
  formData.append("category", category);

  token = localStorage.getItem("token");

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Photo added successfully:", data);
      const addPhotoPage = document.querySelector("#addPhotoPage");
      addPhotoPage.classList.remove("active");
      fetchProjects();
    })
    .catch((error) => {
      console.error("Error adding photo:", error);
    });
});
