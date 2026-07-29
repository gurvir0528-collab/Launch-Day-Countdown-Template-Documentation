const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const pages = [
    "introduction/overview.html", "introduction/credits.html", "introduction/usefulTools.html"
]

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
    mainContainer.scrollTo(0, 0);
    htmlPage.classList.remove("fade")
    await sleep(400);
    pageLoading = false;
}

const buttons = document.querySelectorAll('button');

buttons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        const buttonTarget = button.dataset.bsTarget; 

        const subtopic = document.querySelector(buttonTarget);

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


const intervalId = setInterval(() => {
    const animation = document.getElementById("smoothAnimation1");

    if(animation){
        animation.classList.toggle("open");
    }   
}, 2000);

loadPage("introduction/overview.html");
