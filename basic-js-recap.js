const myHeading = document.querySelector("h1");
myHeading.textContent = "Hello world! added by js";

const myImage = document.querySelector("img");

myImage.onclick = () => {
  console.log("clicked");
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "https://picsum.photos/200/300") {
    myImage.setAttribute(
      "src",
      "https://images.pexels.com/photos/29498845/pexels-photo-29498845.jpeg"
    );
    myImage.setAttribute("width", "200px");
  } else {
    myImage.setAttribute("src", "https://picsum.photos/200/300");
  }
};

let myButton = document.querySelector("button");
// let myHeading = document.querySelector("h1");

function setUserName() {
  const myName = prompt("Please enter your name.");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Welcome, ${myName}`;
  }
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `welcome, ${storedName}`;
}

myButton.onclick = function () {
  setUserName();
};
