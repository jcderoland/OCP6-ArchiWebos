(async () => {
  const response = await fetch("http://localhost:5678/api/works");
  const projectsList = await response.json();
  console.log(projectsList);

  // Récupération de l'élément du DOM qui accueillera les projets
  const sectionGallery = document.querySelector(".gallery");

  // Vider la galerie en supprimant tous les éléments enfants
  sectionGallery.innerHTML = "";

  for (let i = 0; i < projectsList.length; i++) {
    const project = projectsList[i];

    // Création d’une balise dédiée à un projet
    const projectElement = document.createElement("article");

    // Création des balises
    const imageProject = document.createElement("img");
    imageProject.src = project.imageUrl;
    const titleElement = document.createElement("p");
    titleElement.innerText = project.title;

    // On rattache la balise article a la section Gallery
    sectionGallery.appendChild(projectElement);

    // On rattache l’image à projectElement (la balise article)
    projectElement.appendChild(imageProject);
    projectElement.appendChild(titleElement);
  }
})();
