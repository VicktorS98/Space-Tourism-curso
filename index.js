// para navigation
const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", function() {
    const visibility = nav.getAttribute("data-visible");
    // si está cerrado, hay que abrirlo
    if (visibility == "false") {
        nav.style.transform = "translateX(0)";
        navToggle.style.backgroundImage = "url(assets/shared/icon-close.svg)";
        nav.setAttribute("data-visible", "true");
    } if (visibility == "true") {
        nav.style.transform = "translateX(100%)";
        navToggle.style.backgroundImage = "url(assets/shared/icon-hamburger.svg)";
        nav.setAttribute("data-visible", "false");
    }
}); 

// si la nav está abierta en mobile, al tocar fuera de la nav(en el documento en sí), que se cierre la nav
document.addEventListener("click", function(e) {
    if(screen.width > 500 && e.target != nav && e.target != navToggle) {
        nav.style.transform = "translateX(100%)";
        navToggle.style.backgroundImage = "url(assets/shared/icon-hamburger.svg)";
        nav.setAttribute("data-visible", "false");
    }
});

// para que funcionen los tabs
const tabList = document.querySelector("[role='tablist']");
const tabs = tabList.querySelectorAll("[role='tab']");


tabList.addEventListener("keydown", changeTabFocus);

let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    // cambiar tabindex del current tab a -1
    if (e.keyCode == keydownLeft || e.keyCode == keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", "-1");

        if (e.keyCode == keydownRight) {
        tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            } 
        }   else if (e.keyCode == keydownLeft) {
        tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length -1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();

    }     
};

tabs.forEach((tab) => {  //"tabs" puede ser cualquier nombre
    tab.addEventListener("click", changeTabPanel);
});

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    mainContainer.querySelectorAll("[aria-selected='true']").forEach((tab) => {
        tab.setAttribute("aria-selected", "false");
    });
    targetTab.setAttribute("aria-selected", "true");

    hideContent(mainContainer, "[role='tabpanel']");
    showContent(mainContainer, [`#${targetPanel}`]);

    hideContent(mainContainer, "picture");
    showContent(mainContainer, [`#${targetImage}`]);

};

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => { 
            item.classList.add("hidden"); 
        });
}


function showContent(parent, content) {
    parent
        .querySelector(content)
        .classList.remove("hidden");
}


//reemplazado por la función hecha durante el refactoring
/* mainContainer.querySelectorAll("[role='tabpanel']").forEach((panel) => {
        panel.classList.add("hidden");
});
mainContainer.querySelector(`#${targetPanel}`).classList.remove("hidden"); */

/* mainContainer.querySelectorAll("picture").forEach((picture) => {
    picture.classList.add("hidden");
});
mainContainer.querySelector(`#${targetImage}`).classList.remove("hidden"); */
