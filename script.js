"use strict";

// DOM selection
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const section3 = document.querySelector("#section--3");
const navLinks = document.querySelector(".nav__links");
const tabContainer = document.querySelector(".operations__tab-container");
const operationsContents = document.querySelectorAll(".operations__content");
const mainNav = document.querySelector(".nav");
const mainLogo = document.querySelector(".nav__logo");
const header = document.querySelector('.header');

const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--open-modal");
const btnScroll = document.querySelector(".btn--scroll-to");
const btnTabs = document.querySelectorAll(".operations__tab");

const toSections = document.querySelectorAll(".nav__link");

// initial variables
const section1Coor = section1.getBoundingClientRect().top;
const mainNavHeight = getComputedStyle(mainNav).height;
// or
// const mainNavHeight = mainNav.getBoundingClientRect().height;

// Modal Window
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// scroll to section
btnScroll.addEventListener("click", function () {
    // scroll to section
    // old way
    // the location of the section 1
    // const s1coords = section1.getBoundingClientRect();
    // window.scrollTo({
    //     left: s1coords.left + window.scrollX,
    //     top: s1coords.top + window.scrollY,
    //     behavior: "smooth",
    // });
    // new way
    section1.scrollIntoView({ behavior: "smooth" });
});

// nav links
// this can create too many event listeners and there is a button there in the end giving error
// toSections.forEach(function (el) {
//     el.addEventListener("click", function (e) {
//         e.preventDefault();
//         const id = this.getAttribute("href");
//         document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//     });
// });
// with event delegation
// 1. add the EventListener into the parent element that contain all the elements we want
navLinks.addEventListener("click", function (e) {
    e.preventDefault();
    // 2. determine where did the event came from
    const source = e.target;
    // matching strategy
    if (source.classList.contains("nav__link")) {
        const id = source.getAttribute("href");
        if (id !== "#") {
            document.querySelector(id).scrollIntoView({ behavior: "smooth" });
        }
    }
});

// the tab windows
tabContainer.addEventListener("click", function (e) {
    const source = e.target.closest(".operations__tab");
    // prevent source is null
    if (!source) return;
    // activate tab
    btnTabs.forEach(btn => btn.classList.remove("operations__tab--active"));
    source.classList.add("operations__tab--active");
    // activate content area
    operationsContents.forEach(content =>
        content.classList.remove("operations__content--active")
    );
    document
        .querySelector(`.operations__content--${source.dataset.tab}`)
        .classList.add("operations__content--active");
});

// fading nav
const changeOpacity = function (e) {
    const source = e.target;
    if (!e.target.classList.contains("nav__link")) return;
    const siblings = source.closest(".nav").querySelectorAll(".nav__link");
    siblings.forEach(link => {
        if (link !== source) {
            link.style.opacity = this;
        }
    });
    mainLogo.style.opacity = this;
};
// not the best with only a function call inside of a function
// mainNav.addEventListener("mouseover", function (e) {
//     changeOpacity(e, 0.5);
// });
// mainNav.addEventListener("mouseout", function (e) {
//     changeOpacity(e, 1);
// });
// better way, by setting "this" to the input value we can just use that
mainNav.addEventListener("mouseover", changeOpacity.bind(0.5));
mainNav.addEventListener("mouseout", changeOpacity.bind(1));

// sticky nav
// this should be avoided "scroll" is very not efficient
// this also breaks if the page is reloaded not at the top
// window.addEventListener("scroll", function () {
//     console.log(window.scrollY);
//     console.log(section1Coor);
//     if (window.scrollY >= section1Coor) {
//         mainNav.classList.add("sticky");
//     }
//     else {
//         mainNav.classList.remove("sticky");
//     }
// });
// WITH intersection observer API we can improve the stick nav
const obsOption = {
    root: null,
    threshold: 0,
    rootMargin: `-${mainNavHeight}`,
};
const obsFunction = function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            mainNav.classList.remove("sticky");
        }
        else {
            mainNav.classList.add("sticky");
        }
    });
}
const observerHeader = new IntersectionObserver(obsFunction, obsOption);
observerHeader.observe(header);
