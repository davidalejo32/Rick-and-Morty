import "./sass/app.scss";
import "./components/my-card.js";
import { getData } from "./utils/getData.js";
import arrow from "./icons/arrow.svg";

window.addEventListener("DOMContentLoaded", () => {
  location.hash = `#1`;
});

window.addEventListener("hashchange", () => {
  document.documentElement.scrollTop = 0;
  let pageId = location.hash.replace("#", "");

  if (Number(pageId) > 42 || Number(pageId) < 1) {
    pageId = "1";
    location.hash = "#1";
  }

  loadCards(pageId);
  paintPage(`${pageId}`);
});

const baseUrl = `https://rickandmortyapi.com/api/`;

const $card = document.querySelector(".cards");

// funcion que carga las cards
async function loadCards(getHash) {
  $card.innerHTML = "";
  const data = await getData(`${baseUrl}character/?page=${getHash}`);

  // cards
  data.results.map(async (element) => {
    const myCard = document.createElement("my-card");
    myCard.img = `${element.image}`;
    myCard.alt = `${element.name}`;
    myCard.status = `${element.status}`;
    myCard.setAttribute("name-per", `${element.name}`);
    myCard.species = `${element.species}`;
    myCard.setAttribute("last-location", `${element.location.name}`);

    if (element.status === "Alive") {
      myCard.color = "#27AE60";
    } else if (element.status === "Dead") {
      myCard.color = "#C0392B";
    } else {
      myCard.color = "#D5DBDB";
    }

    const lastEpisode = await getData(
      element.episode[element.episode.length - 1]
    );

    myCard.setAttribute("first-location", `${lastEpisode.name}`);

    $card.appendChild(myCard);
  });
}

loadCards(location.hash);

// pagination

let page = 1;

// arrows
const $arrowLeft = document.createElement("img");
$arrowLeft.src = `${arrow}`;

// evento de la flecha izquierda
$arrowLeft.addEventListener("click", () => {
  page -= 2;
  loadPages();
});

const $arrowRigth = document.createElement("img");
$arrowRigth.src = `${arrow}`;

// evento de la flecha derecha
$arrowRigth.addEventListener("click", () => {
  page += 2;
  loadPages();
});

// pinto las flechas
document.querySelector(".page__arrow-left").appendChild($arrowLeft);
document.querySelector(".page__arrow-rigth").appendChild($arrowRigth);

const pageContainer = document.querySelector(".page__nums");

// funcion que carga las paginas
async function loadPages() {
  pageContainer.innerHTML = " ";
  const data = await getData(`${baseUrl}character/`);
  const totalPages = data.info.pages;

  if (page < 1) {
    page = totalPages - 5;
  }

  if (page > totalPages - 5) {
    page = 1;
  }

  for (let i = page; i <= page + 5; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.className = "page__num";
    a.className = "page__item";
    a.href = `#${i}`;
    a.textContent = `${i}`;
    a.id = `${i}`;
    li.appendChild(a);
    pageContainer.appendChild(li);
  }

  let hashLocation = location.hash.replace("#", "");
  paintPage(`${hashLocation}`);
}

loadPages();

// funcion que pinta las paginas
function paintPage(id) {
  const pageItems = document.querySelectorAll(".page__item");

  pageItems.forEach((element) => {
    if (element.classList.contains("page__active")) {
      element.classList.remove("page__active");
    }
  });

  if (document.getElementById(`${id}`) !== null) {
    document.getElementById(`${id}`).classList.add("page__active");
  }
}
