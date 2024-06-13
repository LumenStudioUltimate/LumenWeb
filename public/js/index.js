let timer;

let section_1;
let section_2;
let section_3;
let section_4;

// eslint-disable-next-line
let profiles = [];

function init() {
    document.querySelector("#section_3>.box_available>.left>.upper>.menubar").style.width = document.querySelector("#section_3>.box_available>.left>.upper>.menu").getBoundingClientRect().width+"px";
    document.querySelector("#section_3>.box_available>.left>.upper>.menubar>.pointerWrapper").style.width = ((document.querySelector("#section_3>.box_available>.left>.upper>.menu").getBoundingClientRect().width-(50*7))/14+50-1)+"px";

    animation_index.intro.init(animation_index.intro.title, (...args) => {animation_index.intro.showBtn(), animation_index.intro.scroll_guide(...args);});

    Object.keys(animation_index.events).forEach(eventName => {
        Array.from(animation_index.events[eventName]).forEach(eventHandler => {
            if (eventHandler.selector === "document") {
                document.addEventListener(eventName, (e) => eventHandler.animation(e, document));
                return;
            }
            if (eventHandler.hasOwnProperty("all"))
                document.querySelectorAll(eventHandler.selector).forEach(element => element.addEventListener(eventName, (e) => eventHandler.animation(e, element)));
            else
                document.querySelector(eventHandler.selector).addEventListener(eventName, (e) => eventHandler.animation(e, document.querySelector(eventHandler.selector)));
        });
    });
}