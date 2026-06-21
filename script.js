const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const counter = document.getElementById("lightbox-counter");

let imageGallery = [];
let index = 0;

function showImage(i) {
  lightboxImg.src = imageGallery;
}

function openLightbox(image) {
  imageGallery = image;
  lightbox.classList.add("open");
  // starts always with an index 0 (first image form the array)
  showImage(0);
}

function closeLightbox() {
  lightbox.classList.remove("open");
}

//open lightbox on clicking the card
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    console.log(card.dataset.images);
    openLightbox(JSON.parse(card.dataset.images));
  });
});

//close lightbox on clicking the X
document
  .getElementById("lightbox-close")
  .addEventListener("click", closeLightbox);
