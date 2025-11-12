const projectItems = document.querySelectorAll(".project-item"); // 選取所有 project 卡片

projectItems.forEach(item => {
    item.addEventListener("click", function() { //當 element上 Event 發生時，執行函式 
        const url = this.getAttribute("data-url"); // 在 HTML 加入的連結
        if (url) {
            window.open(url, "_blank"); // 在新分頁開啟
        }
    });
});
//////////////////////////////////////////////////////////////////////////////////////////

// Typewriter effect
const typewriterElement = document.querySelector(".typewriter");
const texts = ["NYCU Software Development Club.", "Core System.", "Clustron.", "HPC.", "Commonground."];
let textIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    const typingSpeed = 100; 
    const deletingSpeed = 50; 
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 500;
    
    if (!isDeleting) {
    // typing phase
    let charIndex = 0;
    typewriterElement.textContent = '';
    
    const typingInterval = setInterval(() => {
        typewriterElement.textContent += currentText[charIndex];
        charIndex++;
        
        if (charIndex === currentText.length) { // finished typing
        clearInterval(typingInterval);
        // pause after typing, then start deleting
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, pauseAfterTyping);
        }
    }, typingSpeed);
    
    } else {
    // deleting phase
    let charIndex = currentText.length;
    
    const deletingInterval = setInterval(() => {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
        clearInterval(deletingInterval);
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;//當字數達到當行最大時變回1，這邊用取餘數的技巧
        
        setTimeout(() => {
            typeWriter();
        }, pauseAfterDeleting);
        }
    }, deletingSpeed);
    }
}

// Start the typewriter effect
typeWriter();