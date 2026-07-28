const buttons = document.querySelectorAll('button');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
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