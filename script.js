const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const counter = document.getElementById("lightbox-counter");

let imageGallery = [];
let index = 0;

function showImage(i) {
  // turns images around
  // if 2 images in total, next button will return to the first one
  // if on the first image, previous button will go to the second image
  index = (i + imageGallery.length) % imageGallery.length;
  lightboxImg.src = imageGallery[index];
}

function updateArrows() {
  if (imageGallery.length <= 1) {
    //removes the arrow buttons (display: none)
    //this is added only when gallery has images <= 1
    lightbox.classList.add("single");
  } else {
    lightbox.classList.remove("single");
  }
}

function openLightbox(image) {
  imageGallery = image;
  lightbox.classList.add("open");
  // starts always with an index 0 (first image form the array)
  // not adding index instead of 0 because if I close gallery and open again,
  // images will show from the last image I had,
  // but should always start from the first image when opening the gallery
  showImage(0);
  updateArrows();
}

function closeLightbox() {
  lightbox.classList.remove("open");
}

//open lightbox on clicking the card
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    openLightbox(JSON.parse(card.dataset.images));
  });
});

//close lightbox on clicking the X
document
  .getElementById("lightbox-close")
  .addEventListener("click", closeLightbox);

// image next arrow buttons
document.getElementById("lightbox-next").addEventListener("click", () => {
  showImage(index + 1);
});

// image previous arrow buttons
document.getElementById("lightbox-prev").addEventListener("click", () => {
  showImage(index - 1);
});
