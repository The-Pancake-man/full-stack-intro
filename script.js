const projects = [
  {
    "title": "Full Stack Intro.",
    "description": "從零開始認識前後端開發！從環境設定、HTML、CSS、JavaScript 等基礎打好地基，並逐步學習版面切版、網頁動態效果實作，讓大家都能獨立完成屬於自己、能「動起來」的互動式履歷網站。",
    "date": "2025/09/22",
    "url": "https://github.com/NYCU-SDC/full-stack-intro-frontend"
  },
  {
    "title": "Full Stack Advanced",
    "description": "這門課會透過實作任務管理工具，熟悉 React 的開發生態系，了解前端的實作細節。下學期則會延續專案，完成 Golang 後端，學習完整的前後端開發。",
    "date": "2025/08/29",
    "url": "https://github.com/NYCU-SDC/full-stack-advanced-frontend"
  },
  {
    "title": "Core System",
    "description": "一站式完成大部分行政操作，不必在表單、試算表和群組訊息間來回切換。\n從真實需求出發，逐步迭代。\n讓行政變簡單，把時間留給更有價值的活動與交流。",
    "date": "2025/05/29",
    "url": "https://github.com/NYCU-SDC/core-system-frontend"
  },
  {
    "title": "Clustron",
    "description": "Clustron 是一個計算機叢集與異質計算管理的可視化解決方案，結合實驗室與課程的實務需求，提供一個可實際運作的解決方案。",
    "date": "2025/04/16",
    "url": "https://github.com/NYCU-SDC/clustron-frontend"
  }
]

const projectsList = document.querySelector(".project-list");

function renderProjects(list) { //list 傳進去(現在它是project)，包含所有本來在html的東西
    projectsList.innerHTML = list //最後得到的字串名稱 HTML 內容，由 projectsList 告訴你現在塞
        .map(p => { //去做map，把所有title description之類的，全都放入要回傳的字串
            return ` 
            <div class="project-item" data-url="${p.url}" target="_blank">
                <div class="content">
                    <h3>${p.title}</h3>
                    <p>${p.description.replace(/\n/g, "<br>")}</p> 
                    <p class="meta">Created on ${p.date}</p>
                </div>
            </div>
            `;  //把字串裡的所有換行符號 \n，替換成 HTML 的 <br> 標籤。
        })
        .join(""); //接合所有字串，中間間隔""沒有東西
    attachProjectClickListener();    
}

// first time load all projects
renderProjects(projects); //把 project 傳進去作為 list

//////////////////////////////////////////////////////////////////////////////////////////
function attachProjectClickListener(){
    const projectItems = document.querySelectorAll(".project-item"); // 選取所有 project 卡片

    projectItems.forEach(item => {
        item.addEventListener("click", function() { //當 element上 Event 發生時，執行函式 
            const url = this.getAttribute("data-url"); // 在 HTML 加入的連結(如果它存在)，this觸發這個事件的物件
            if (url) {
                window.open(url, "_blank"); // 在新分頁開啟
            }
        });
    });
}

//////////////////////////////////////////////////////////////////////////////////////////
// Search functionality
const searchInput = document.getElementById("project-search-input");
const searchBtn = document.getElementById("project-search-btn");

function searchProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm)
    );
    renderProjects(filteredProjects);
}
//傳給renderProjects

searchBtn.addEventListener("click", searchProjects); //後面那個是傳入函式
searchInput.addEventListener("keypress", (e)=> { //在文字欄輸入Enter後觸發
    if(e.key==="Enter"){
        searchProjects(); //這邊是真的去呼叫函式
    }
    console.log("keypress enter")
}) //這裡括號整個也是傳入函式


//////////////////////////////////////////////////////////////////////////////////////////

// Typewriter effect
const typewriterElement = document.querySelector(".typewriter");
const texts = [ "Major in Industrial Engineering and Management.", "National Yang Ming Chiao Tung University.", "NYCU Software Development Club.", "NTHU Data Science Club (Project student)."];
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

//////////////////////////////////////////////////////////////////////////////////////////

// 觸發 -> 檢查現在位置 -> 更新狀態

const sections = document.querySelectorAll("section"); 
const navLinks = document.querySelectorAll(".nav-item a");

function updateActiveNav() {
    let currentSection = "";
    
    // 找到現在在哪個 section
    sections.forEach(section => {

        // 從頁面最頂端到當前關注的 section 的距離
        const sectionTop = section.offsetTop;
        
        // 從頁面最頂端到現在捲動位置的距離       
        // window.scrollY

        // 如果畫面捲動位置在這個 section 的範圍內
        if (window.scrollY >= sectionTop - 100) { // 100 是一個緩衝
            currentSection = section.getAttribute("id");
        }
    });
    
    // 更新 nav 連結的 active 狀態
    navLinks.forEach(link => {
        // 先把所有連結的 active 樣式移除，也就是底線
        link.classList.remove("active");
        // 檢查這個連結的 href 屬性是否等於目前所在區塊的 id
        if (link.getAttribute("href") === `#${currentSection}`) {
            // 如果符合，就加上 active 樣式(底線)
            link.classList.add("active");
        }
    });
}

// 每次滑動時都呼叫一次
window.addEventListener("scroll", updateActiveNav);
// 第一次打開網頁時滑動
updateActiveNav();


// 接著處理 Fade in/out 的效果

const observerOptions = {
    //root: null,          // 觀察的容器，null 表示瀏覽器視窗
    threshold: 0.15, // 當 section 有 15% 進入畫面時觸發
    rootMargin: "0px" // 擴大或縮小根元素的邊界從而改變被視為「可見」的區域。
    // Margin 是向外擴增的
};

// 傳入的物件 entries 有很多資訊，其中包含 target 
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // 當元素和觀察範圍（由 observerOptions.root 定義）有交集時 → true
        if (entry.isIntersecting) {
            // 當 section 進入畫面時淡入(加上 visible 的 class)
            entry.target.classList.add("visible");
        } else {
            // 當 section 離開畫面時淡出
            entry.target.classList.remove("visible");
        }
    });
}, observerOptions); //依照 observerOptions，來決定何時加上或移除 visible class

// // 觀察所有 section
// sections.forEach(section => {
//     sectionObserver.observe(section);
// });

// 觀察除了 #home 以外的 section
sections.forEach(section => {
    if (section.id !== "home") {
        sectionObserver.observe(section);
    }
});

// 觀察 About section 裡的子區塊（About Me, Tech Stack, Timeline）
const fadeInSections = document.querySelectorAll(".fade-in-section");
fadeInSections.forEach(section => {
    sectionObserver.observe(section);
});

//////////////////////////////////////////////////////////////////////////////////////////

// 先抓出所有 skill-item
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
  const header = item.querySelector('.skill-header');
  const arrow  = item.querySelector('.skill-arrow');

  header.addEventListener('click', () => {
    // 切換 open class，
    const isOpen = item.classList.toggle('open');
    arrow.textContent = isOpen ? '▸' : '▸';
  });
});
