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
