const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */
const imageFileNames = [
  "pic1.jpg",
  "pic2.jpg",
  "pic3.jpg",
  "pic4.jpg",
  "pic5.jpg",
];
/* Declaring the alternative text for each image file */
const imageFileNamesAlternativeText = [
  "pic 1",
  "pic 2",
  "pic 3",
  "pic 4",
  "pic 5",
];

/* Looping through images */

for (let i = 0; i < imageFileNames.length; i++) {
  const newImage = document.createElement("img");
  newImage.setAttribute("src", `images/${imageFileNames[i]}`);
  newImage.setAttribute("alt", imageFileNamesAlternativeText[i]);
  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", (e) => {
    displayedImage.setAttribute("src", e.target.getAttribute("src"));
    displayedImage.setAttribute("alt", e.target.getAttribute("alt"));
  });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", (e) => {
  if (e.target.getAttribute("class") === "dark") {
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    e.target.setAttribute("class", "light");
    e.target.textContent = "Lighten";
  } else {
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
    e.target.setAttribute("class", "dark");
    e.target.textContent = "Darken";
  }
});
