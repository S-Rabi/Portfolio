import database from "./Data.js";

let intervalId;
const menu = document.querySelector("#menu-icon");
const navList = document.querySelector(".navList");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navList.classList.toggle("open");
};

const sr = ScrollReveal({
  distance: "65px",
  duration: 2000,
  delay: 450,
  reset: true,
});
sr.reveal(".hero-text", { delay: 200, origin: "top" });
sr.reveal(".icons", { delay: 400, origin: "left" });
sr.reveal(".spinner-wrapper", { delay: 400, origin: "bottom" });
sr.reveal("#contact", { delay: 800, origin: "bottom" });
let typed = new Typed(".auto-type", {
  strings: ["Web Designer.", "Frontend Developer."],
  typeSpeed: 110,
  backSpeed: 100,
  loop: true,
});
//------------Sticky Navbar
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

//--------------------Modal codes ----------

function createCard(image, title) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("img");
  img.src = image;
  card.appendChild(img);

  const projectTitle = document.createElement("h1");
  projectTitle.classList.add("project-title", "pr-title");
  projectTitle.textContent = title;
  card.appendChild(projectTitle);

  card.appendChild(projectTitle);

  const info = document.createElement("div");
  info.classList.add("info");
  card.appendChild(info);
  const projectTitle2 = document.createElement("h3");
  projectTitle2.classList.add("project-title2");
  projectTitle2.textContent = title;
  info.appendChild(projectTitle2);

  const btn = document.createElement("button");
  btn.classList.add("myBtn");
  btn.textContent = "View Project";

  info.appendChild(btn);

  return card;
}

const cardWrapper = document.querySelector(".card-wrapper");

database.forEach((item) => {
  const cardItem = createCard(item.image, item.title);
  cardWrapper.appendChild(cardItem);
});

function showModal(nestedObj) {
  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector(".modal-content");
  const modalContainer = document.querySelector(".modal-container");
  const modalTitle = document.querySelector(".project-name");
  const modalInfo = document.querySelector(".modal-info");
  const details = document.querySelector(".details");
  const tech = document.querySelector(".tech");
  const date = document.querySelector(".date");

  modalContainer.innerHTML = ""; // Clear previous modal content

  nestedObj.modal.forEach((nestedItem) => {
    nestedItem.images.forEach((imageSrc) => {
      const img = document.createElement("img");
      img.src = imageSrc;
      modalContainer.appendChild(img);
    });

    details.textContent = nestedItem.name;

    tech.textContent = nestedItem.Technologies;

    date.textContent = nestedItem.date;

    modalContent.appendChild(modalContainer);
    modalContainer.appendChild(modalInfo.cloneNode(true));
  });

  modalTitle.textContent = nestedObj.title;

  modal.style.display = "block";
}

function hideModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

document.querySelectorAll(".myBtn").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".card");
    const nestedObj = database.find(
      (obj) => obj.title === item.querySelector(".project-title").textContent
    );
    showModal(nestedObj);
  });
});

document.querySelector(".close").addEventListener("click", hideModal);
window.addEventListener("click", (event) => {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    hideModal();
  }
});

//-------Contact Background ----------

particlesJS("particles-js", {
  particles: {
    number: {
      value: 100,
      density: {
        enable: !0,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: !1,
      anim: {
        enable: !1,
        speed: 1,
        opacity_min: 0.1,
        sync: !1,
      },
    },
    size: {
      value: 3,
      random: !0,
      anim: {
        enable: !1,
        speed: 40,
        size_min: 0.1,
        sync: !1,
      },
    },
    line_linked: {
      enable: !0,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: !0,
      speed: 6,
      direction: "none",
      random: !1,
      straight: !1,
      out_mode: "out",
      bounce: !1,
      attract: {
        enable: !1,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: !0,
        mode: "grab",
      },
      onclick: {
        enable: !0,
        mode: "push",
      },
      resize: !0,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
});

//-----Contact Message --------

const contactForm = document.querySelector(".contact-form");
const submitBtn = document.querySelector(".contact-btn");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const numberInput = document.querySelector("#number");
const messageInput = document.querySelector("#message");

const publicKey = "w-xjcGn8hKVUero0E";
const serviceID = "service_ra5yt8e";
const templateID = "template_jbn89vu";

emailjs.init(publicKey);
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.innerText = "Message sent Successfully!";
  const inputFields = {
    name: nameInput.value,
    email: emailInput.value,
    number: numberInput.value,
    message: messageInput.value,
  };
  emailjs.send(serviceID, templateID, inputFields).then(
    () => {
      submitBtn.innerText = "SEND";
      nameInput.value = "";
      emailInput.value = "";
      numberInput.value = "";
      messageInput.value = "";
    },
    (error) => {
      console.log(error);
      submitBtn.innerText = "Something went wrong!";
    }
  );
});
