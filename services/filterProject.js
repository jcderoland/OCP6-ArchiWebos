import { projectsList, updateGallery } from "./fetchProjects.js";

const filtrerTous = document.querySelector(".filter-tous");
filtrerTous.addEventListener("click", function () {
  updateGallery();
});

const filtrerObjets = document.querySelector(".filter-objets");
filtrerObjets.addEventListener("click", function () {
  const projetsFiltres = projectsList.filter(function (project) {
    return project.category.name === "Objets";
  });
  updateGallery(projetsFiltres);
});

const filtrerAppartements = document.querySelector(".filter-appartements");
filtrerAppartements.addEventListener("click", function () {
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";
  const projetsFiltres = projectsList.filter(function (project) {
    return project.category.name === "Appartements";
  });
  updateGallery(projetsFiltres);
});

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
