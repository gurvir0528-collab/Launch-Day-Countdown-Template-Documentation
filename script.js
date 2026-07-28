
async function loadPage(page){
    const response = await fetch("pages/" + page);
    const html = await response.text();
    const htmlPage = document.getElementById("content")
    htmlPage.innerHTML = html;
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

        loadPage(pageName);
    });
})
loadPage("introduction/overview.html");
