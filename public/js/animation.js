const animation_index = {
    intro: {
        init: (callback, ...args) => {
            window.scrollTo({top: 0});

            section_1 = 0;
            section_2 = document.getElementById("section_2").offsetTop;
            section_3 = document.getElementById("section_3").offsetTop;
            section_4 = document.getElementById("section_4").offsetTop;

            Array.from(document.querySelectorAll("#section_3>.box_available>.right>.profileList>.profile")).forEach(e => {
                profiles.push(e.offsetLeft);
            });

            document.getElementById("btn_apply").style.opacity = 0;
            document.getElementById("scroll_guide").style.opacity = 0;
            document.querySelector(".container>.section._1>.context>.intro>.description").innerText = "";
            document.querySelector(".container>.section._1>.context>.intro>.name").innerText = "";
            if (typeof callback === "function") callback(...args);
        },
        title: (callback, ...args) => {
            const sub = "빛을 프로그래밍하다,";
            const main = "STUDIO_LUMEN";
            const ele_sub = document.querySelector(".container>.section._1>.context>.intro>.description");
            const ele_main = document.querySelector(".container>.section._1>.context>.intro>.name");

            let i = 0;
            const subInterval = setInterval(() => {
                ele_sub.innerHTML += sub.charAt(i);
                i++;

                if (i === sub.length) {
                    i = 0;
                    clearInterval(subInterval);
                    const mainIneterval = setInterval(() => {
                        ele_main.innerHTML += main.charAt(i);
                        i++;

                        if (i === main.length) {
                            clearInterval(mainIneterval);
                        }
                    }, 100);
                }
            }, 100);
            if (typeof callback === "function") setTimeout(() => callback(...args), 3000);
        },
        showBtn: (callback, ...args) => {
            document.getElementById("btn_apply").animate([ { opacity: "0" }, {opacity: "1" } ], {duration: 2000, fill: "both", easing: "ease-in" });
            if (typeof callback === "function") setTimeout(() => callback(...args), 2000);
        },
        scroll_guide: (callback, ...args) => {
            document.getElementById("scroll_guide").animate([ { transform: "translateY(100px)", opacity: "0" }, { transform: "translateY(-10px)", opacity: "0.6" } ], {duration: 1000, fill: "both", easing: "ease-out" });
            setTimeout(() => {document.getElementById("scroll_guide").animate([ { transform: "translateY(-10px)" }, { transform: "translateY(0px)" } ], {duration: 1000, fill: "both", easing: "ease-in-out" });}, 1100);
            if (typeof callback === "function") setTimeout(() => callback(...args), 2100);
        }
    },
    events: {
        click: [
            {
                selector: "#btn_logo",
                animation: (e, el) => {
                    window.scrollTo({top: section_1, behavior: "smooth"});
                }
            },
            {
                selector: "#btn_about",
                animation: (e, el) => {
                    window.scrollTo({top: section_2, behavior: "smooth"});
                }
            },
            {
                selector: "#btn_team",
                animation: (e, el) => {
                    window.scrollTo({top: section_3, behavior: "smooth"});
                }
            },
            {
                selector: "#btn_project",
                animation: (e, el) => {
                    window.scrollTo({top: section_4, behavior: "smooth"});
                }
            },
            {
                selector: "#section_3>.box_available>.left>.upper>.menu>img",
                animation: (e, el) => {
                    document.querySelector("#section_3>.box_available>.right").scrollTo({left: document.querySelector("#section_3>.box_available>.right>.profileList>.profile."+el.alt).offsetLeft, behavior: "smooth"});
                },
                all: null
            }
        ],
        mouseover: [
            {
                selector: ".clickable",
                animation: (e, el) => {
                    el.classList.add("hover");
                    el.classList.remove("hoverCancel");
                },
                all: null
            },
            {
                selector: ".clickableMenu",
                animation: (e, el) => {
                    el.classList.add("menuHover");
                    el.classList.remove("menuHoverCancel");
                },
                all: null
            },
            {
                selector: ".section._2 .menu>.m_element",
                animation: (e, el) => {
                    Array.from(el.children).forEach(elc => {
                        elc.animate([{ left: "calc(100% - "+elc.getBoundingClientRect().width+"px)" }], {duration: 500, fill: "both", easing: "ease-in-out" });
                    });
                    const whatMenu = Array.from(el.classList).filter(c => c !== "m_element")[0];
                    const menus = Array.from(document.querySelector("#section_2>.box_available").children).filter(ce => ce.classList.contains("showbox"));
                    menus.forEach((menu) => {
                        if (menu.classList.contains(whatMenu))
                            menu.animate([{opacity: "1"}], {duration: 500, fill: "both", easing: "ease-in-out" });
                        else
                            menu.animate([{opacity: "0"}], {duration: 500, fill: "both", easing: "ease-in-out" });
                    });
                },
                all: null
            },
            {
                selector: "#section_3>.box_available>.right>.profileList>.profile",
                animation: (e, el) => {
                    Array.from(Array.from(el.children).filter(ce => ce.classList.contains("main"))[0].children).filter(ce => ce.classList.contains("nickname")).forEach(ce => ce.animate([{height: "100%", borderRadius: "40px"}], {duration: 500, fill: "both", easing: "ease-in-out" }));
                    Array.from(Array.from(Array.from(el.children).filter(ce => ce.classList.contains("main"))[0].children).filter(ce => ce.classList.contains("head"))[0].children).filter(ce => ce.classList.contains("right"))[0].animate([{bottom: "30%"}], {duration: 500, fill: "both", easing: "ease-in-out" });
                    setTimeout(() => {
                        Array.from(Array.from(Array.from(el.children).filter(ce => ce.classList.contains("main"))[0].children).filter(ce => ce.classList.contains("nickname"))[0].children).filter(ce => ce.classList.contains("text"))[0].animate([{maxWidth: "0", right: "40%"}], {duration: 500, fill: "both", easing: "ease-in-out" });
                        Array.from(Array.from(Array.from(el.children).filter(ce => ce.classList.contains("main"))[0].children).filter(ce => ce.classList.contains("nickname"))[0].children).filter(ce => ce.classList.contains("guide"))[0].animate([{maxWidth: "100%"}], {duration: 500, fill: "both", easing: "ease-in-out" });
                    }, 600);
                },
                all: null
            }
        ],
        mouseout: [
            {
                selector: ".clickable",
                animation: (e, el) => {
                    el.classList.add("hoverCancel");
                    el.classList.remove("hover");
                },
                all: null
            },
            {
                selector: ".clickableMenu",
                animation: (e, el) => {
                    el.classList.add("menuHoverCancel");
                    el.classList.remove("menuHover");
                },
                all: null
            },
            {
                selector: ".section._2 .menu>.m_element",
                animation: (e, el) => {
                    Array.from(el.children).forEach(elc => {
                        elc.animate([{ left: "0%", transfrom: "translateX(0%)" }], {duration: 500, fill: "both", easing: "ease-in-out" });
                    });
                },
                all: null
            },
            {
                selector: "#section_3>.box_available>.right>.profileList>.profile",
                animation: (e, el) => {
                    Array.from(Array.from(el.children).filter(ce => ce.classList.contains("main"))[0].children).filter(ce => ce.classList.contains("nickname"))[0].animate([{height: "20%", borderBottomLeftRadius: "0", borderBottomRightRadius: "0"}], {duration: 700, fill: "both", easing: "ease-in-out" });
                    Array.from(Array.from(Array.from(el.children).filter(ce => ce.classList.contains("main"))[0].children).filter(ce => ce.classList.contains("head"))[0].children).filter(ce => ce.classList.contains("right"))[0].animate([{bottom: "0%"}], {duration: 500, fill: "both", easing: "ease-in-out" });
                    setTimeout(() => {
                        Array.from(Array.from(Array.from(el.children).filter(ce => ce.classList.contains("main"))[0].children).filter(ce => ce.classList.contains("nickname"))[0].children).filter(ce => ce.classList.contains("text"))[0].animate([{maxWidth: "100%", right: "0%"}], {duration: 500, fill: "both", easing: "ease-in-out" });
                        Array.from(Array.from(Array.from(el.children).filter(ce => ce.classList.contains("main"))[0].children).filter(ce => ce.classList.contains("nickname"))[0].children).filter(ce => ce.classList.contains("guide"))[0].animate([{maxWidth: "0"}], {duration: 500, fill: "both", easing: "ease-in-out" });
                    }, 600);
                },
                all: null
            }
        ],
        scroll: [
            {
                selector: "#section_3>.box_available>.right",
                animation: (e, el) => {
                    const adjustBlock = ((document.querySelector("#section_3>.box_available>.left>.upper>.menu").getBoundingClientRect().width-50*7)/7+50);
                    const profilesTmp = profiles.slice();
                    const scrollX = document.querySelector("#section_3>.box_available>.right").scrollLeft + document.querySelector("#section_3>.box_available>.right").getBoundingClientRect().width/7;
                    profilesTmp.sort((a, b) => Math.abs(a - scrollX) - Math.abs(b - scrollX));
                    console.log(scrollX);
                    document.querySelector("#section_3>.box_available>.left>.upper>.menubar>.adjuster").animate([{width: (adjustBlock*(profiles.indexOf(profilesTmp[0])))+"px"}], {duration: 500, fill: "both", easing: "ease-in-out" });
                }
            }
        ],
        scrollend: [
            {
                selector: "document",
                animation: (e, el) => {
                    const scrollList = [section_1, section_2, section_3, section_4];
                    const scrollY = window.scrollY;
                    scrollList.sort((a, b) => Math.abs(a - scrollY) - Math.abs(b - scrollY));
                    window.scrollTo({top: scrollList[0], behavior: "smooth"});
                }
            }
            // {
            //     selector: "#section_3>.box_available>.right",
            //     animation: (e, el) => {
            //         const profilesTmp = profiles.slice();
            //         const scrollX = document.querySelector("#section_3>.box_available>.right").scrollLeft + document.querySelector("#section_3>.box_available>.right").getBoundingClientRect().width/7;
            //         profilesTmp.sort((a, b) => Math.abs(a - scrollX) - Math.abs(b - scrollX));
            //         console.log(scrollX);
            //         document.querySelector("#section_3>.box_available>.right").scrollTo({left: profilesTmp[0], behavior: "smooth"});
            //     }
            // }
        ]
    }
};