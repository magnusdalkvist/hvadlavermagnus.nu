const scrollBack = document.querySelector("header").scrollHeight + 1;
let today = new Date().toLocaleDateString("en-GB");

document.querySelector(".date").textContent = today;
document.querySelector("#menu").addEventListener("click", openClose);
window.addEventListener("scroll", checkScrollHeight);
document.querySelectorAll(".menu_btn").forEach((e) => e.addEventListener("click", menuClick));

document.querySelector("#home").style.minHeight = `${window.innerHeight}px`;

function checkScrollHeight() {
  document.querySelectorAll("section").forEach((e) => {
    if (window.scrollY >= e.offsetTop - document.querySelector("header").scrollHeight * 2) {
      document.querySelector(".current").classList.remove("current");
      document.querySelector(`.menu_btn[name="${e.id}"]`).classList.add("current");
    }
  });
}

function menuClick(event) {
  const element = document.querySelector(`#${event.target.name}`);
  if (event.target.name == "home") {
    window.scrollTo(0, 0);
  } else {
    const height = element.offsetTop;
    window.scrollTo(0, height - scrollBack);
  }
  document.querySelector(".current").classList.remove("current");
  this.classList.add("current");
  if (document.querySelector("#menu_content").classList.contains("open")) {
    openClose();
  }
}

function openClose() {
  const btn = document.querySelector("#menu");
  const menu = document.querySelector("#menu_content");
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    menu.classList.add("close");
    btn.classList.remove("selected");
  } else {
    menu.classList.add("open");
    menu.classList.remove("close");
    btn.classList.add("selected");
  }
}

const toggleSwitch = document.querySelector(".switch input[type='checkbox']");
toggleSwitch.addEventListener("change", switchTheme);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
  loop();
}

const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

const root = document.querySelector(":root");
const max = 360;
const loopTimeMS = 100000;
let i = 50;
loop();

function loop() {
  if (i <= max && document.documentElement.dataset.theme == "light") {
    root.style.setProperty("--background", `hsl(${i}, 100%, 89%)`);
    // document.querySelector("body").style.filter = `"hue-rotate(${i})"`;
    i++;
    setTimeout(loop, loopTimeMS / max);
    if (i == max) {
      i = 0;
    }
  } else {
    root.style.setProperty("--background", "black");
  }
}

function device() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

if (device() == "desktop") {
  let cursor = document.querySelector(".cursor");
  let cursorImage = document.querySelector(".cursorImage");
  let a = document.querySelectorAll("a");

  document.querySelector(".cursor").style.display = "block";

  document.addEventListener("mouseenter", () => {
    document.querySelector(".cursor").style.display = "block";
  });

  document.addEventListener("mouseleave", () => {
    document.querySelector(".cursor").style.display = "none";
  });

  document.addEventListener("mousemove", function (e) {
    let x = e.clientX;
    let y = e.clientY;
    cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
  });

  document.addEventListener("mousemove", function (e) {
    let x = e.clientX;
    let y = e.clientY;
    cursorImage.style.left = x + "px";
    cursorImage.style.top = y + "px";
  });

  document.addEventListener("mousedown", function () {
    cursor.classList.add("cursorinnerhover");
  });

  document.addEventListener("mouseup", function () {
    cursor.classList.remove("cursorinnerhover");
  });

  a.forEach((item) => {
    item.addEventListener("mouseover", () => {
      cursor.classList.add("hover");
    });
    item.addEventListener("mouseleave", () => {
      resetCursor();
    });
  });

  document.querySelectorAll(".hoverable").forEach((item) => {
    item.addEventListener("mouseover", () => {
      cursor.classList.add("hover");
    });
    item.addEventListener("mouseleave", () => {
      resetCursor();
    });
  });

  document.querySelectorAll(".marquee").forEach((e) => {
    e.addEventListener("mouseover", function (a) {
      cursorImage.style.display = "block";
      cursorImage.style.backgroundImage = `url(images/${e.dataset.image}.png)`;
    });
    e.addEventListener("mouseleave", () => {
      resetCursor();
    });
  });
  function resetCursor() {
    cursor.style.display = "block";
    cursorImage.style.display = "none";
    cursorImage.style.backgroundImage = "none";
    cursor.classList.remove("hover");
    cursor.classList.remove("cursorinnerhover");
  }
}
