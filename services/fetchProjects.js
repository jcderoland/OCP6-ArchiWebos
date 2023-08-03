export let projectsList;

// Fetch API URL
const API_URL = "http://localhost:5678/api/works";

export async function updateGallery(projects = projectsList) {
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";

  for (var i = 0; i < projects.length; i++) {
    const project = projects[i];
    const projectElement = document.createElement("article");
    const imageProject = document.createElement("img");
    imageProject.src = project.imageUrl;
    const titleElement = document.createElement("p");
    titleElement.innerText = project.title;
    sectionGallery.appendChild(projectElement);
    projectElement.appendChild(imageProject);
    projectElement.appendChild(titleElement);
  }
}

export async function fetchProjects() {
  try {
    const response = await fetch(API_URL);
    projectsList = await response.json();
    updateGallery();
  } catch (error) {
    console.error("Error while fetching projects:", error);
    alert("Erreur lors du chargement de la gallerie.");
  }
}

fetchProjects();
