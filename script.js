const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const pages = [
    "introduction/overview.html", 
    "introduction/credits.html", 
    "introduction/usefulTools.html",
    "countdown/overview.html",
    "countdown/math.html",
    "countdown/display.html",
    "screens/overview.html",
    "screens/overlay.html",
    "screens/background.html",
    "screens/items.html"
]

function updateHighlight(newPage){

    const navlinks = document.querySelectorAll('.nav-link');
    navlinks.forEach(navlink => navlink.classList.remove("active"));

    const activeLink = document.querySelector(`.nav-link[data-page="${newPage}"]`);
    if(activeLink){
        activeLink.classList.add("active")
    }
}

function singleShapeMove(shape){
    if (shape){
    shape.style.transition = "none";
        shape.style.opacity = "0";
        shape.style.translate = "0px 0px";
        shape.style.rotate= "0deg";
        void shape.offsetHeight;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                shape.style.transition = "opacity 1s ease";
                shape.style.opacity = "1";
                setTimeout(() => {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.max(window.innerWidth, window.innerHeight)/3

                    const targetX = Math.round(Math.cos(angle) * distance);
                    const targetY = Math.round(Math.sin(angle) * distance);

                    shape.style.transition = "translate 2s linear, rotate 3s linear";
                    shape.style.translate = `${targetX}px ${targetY}px`;
                    shape.style.rotate= "720deg";
                }, 1000);

            });
        });
    }
}

function shapeMove(){
    const shapes = document.querySelectorAll(".smoothAnimation2");
    shapes.forEach(shape => {
        singleShapeMove(shape);
    });
}

let pageLoading = false;

async function loadPage(page){
    pageLoading = true;
    console.log(pageIndex)
    const response = await fetch("pages/" + page);
    const html = await response.text();
    const htmlPage = document.getElementById("content")
    const mainContainer = document.querySelector(".main");
    htmlPage.classList.add("fade");
    await sleep(350);
    htmlPage.innerHTML = html;
    requestAnimationFrame(() => {
        shapeMove();
    });
    mainContainer.scrollTo(0, 0);
    htmlPage.classList.remove("fade")
    updateHighlight(page);
    await sleep(400);
    pageLoading = false;
}

const buttons = document.querySelectorAll('button');

buttons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        const buttonTarget = button.dataset.bsTarget; 
        if (!buttonTarget) return;
        const subtopic = document.querySelector(buttonTarget);
        if (!subtopic) return;
        if (subtopic.classList.contains("open")) {
            subtopic.style.height = "0px";
        } else {
            subtopic.style.height = subtopic.scrollHeight + "px";
        }
        subtopic.classList.toggle("open");
    });
});

const navlinks = document.querySelectorAll(".nav-link")

navlinks.forEach((navlink) => {
    navlink.addEventListener('click', (event) => {

        event.preventDefault();
        const pageName = navlink.dataset.page;
        pageIndex = pages.indexOf(pageName);

        loadPage(pageName);
    });
})

const main = document.querySelector(".main");
let pageIndex = 0;

main.addEventListener('scroll', () =>{
    const totalHeight = main.scrollHeight;
    const clientHeight = main.clientHeight;
    const scrollTop = main.scrollTop;

    if(totalHeight - scrollTop <= clientHeight +2 ){
            if(!pageLoading && pageIndex < pages.length - 1){
            pageIndex += 1
            const pageName = pages[pageIndex];
            loadPage(pageName)
        }
    };
});

document.addEventListener("transitionend", (e) => {
    if (e.target && e.target.classList.contains("smoothAnimation2") && e.propertyName === "translate") {
        singleShapeMove(e.target);
    }
});

loadPage("introduction/overview.html");
