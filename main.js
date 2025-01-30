$(window).on('load', function() {
    function Form(){
        let dataOne   = document.getElementById("data-1");
        let dataTwo   = document.getElementById("data-2");
        let dataThree = document.getElementById("data-3");
        let dataFour  = document.getElementById("data-4");

        document.querySelector("#send-btn").addEventListener("click", function(){
            if(dataOne.value == "" || dataTwo.value == "" || dataThree.value == "" || dataFour.value == ""){
                alert("Please write your needs correctly");
            } else {
                alert("Done, and thank you for visiting my site!");
            }
        });
    }

    function loading(){
        $(".loading-page span").fadeOut(800 , function(){
            $(this).parent().fadeOut(800 , function(){
                $(this).remove();
            })
        });
    }
    
    function numbersPart() {
        let numbers = document.querySelectorAll(".box .number");
        let section = document.querySelector(".section-numbers");
        let started = false;
    
        window.onscroll = function(){
            if(window.scrollY >= section.offsetTop){
                if(!started) numbers.forEach((num) => startCount(num));
                started = true;
            }
        }
    
        function startCount(element){
            let goal = parseInt(element.dataset.goal);
        
            let counter = setInterval(() => {
                element.textContent++;
                
                if(element.textContent == goal) 
                    clearInterval(counter);

            }, 2000 / goal);
        }
    }

    function counterDownEvent(){

        let dayPart    = document.querySelector(".day-unit");
        let hourPart   = document.querySelector(".hour-unit");
        let secondPart = document.querySelector(".second-unit");
        let minutePart = document.querySelector(".minute-unit");
        
        // target date be as AUG 10, 2024
        let counterDate = new Date("FEB 10, 2025 23:59:59").getTime();
        
        let counter = setInterval(() => {
            
            // current date ( date now )
            let dateNow = new Date().getTime();

            // to find the difference between target dates and current date ( this interval ! )
            let intervalTime = counterDate - dateNow;

            // now interval Time in days and hours and minutes and seconds
            let day  = Math.floor(intervalTime / (1000 * 60 * 60 * 24));
            // 1000 : mile seconds
            // 60 ( first 60 ) : in minutes
            // 60 (second 60 ) : in hours
            // 24 : in days per - day

            let hour    = Math.floor(intervalTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            let minutes = Math.floor((intervalTime % (1000 * 60 * 60)) / (1000 * 60));
            let second  = Math.floor((intervalTime % (1000 * 60)) / (1000));
            
            dayPart.innerHTML = day;
            hourPart.innerHTML = hour;

            minutePart.innerHTML = minutes; // to be 01 rather than normal 0 minutes < 10 ? `0{$minutes}` : minutes
            secondPart.innerHTML = second;

            if(intervalTime <= 0){
                clearInterval(counter);
            }

        } , 1000);
    }

    // related to the website issue
    function inputPart(){
        let inputParents = document.querySelectorAll(".fName-part, .lName-part");
    
        inputParents.forEach(inputParent => {
            let inputElement = inputParent.querySelector("input");
            let counterElement = inputParent.querySelector(".count");
            let progressElement = inputParent.querySelector(".progress");
            
            let maxLength = inputElement.getAttribute("maxlength");
            
            // Starting the logic
            counterElement.innerHTML = maxLength;
            
            inputElement.oninput = function() {
                counterElement.innerHTML = (maxLength - this.value.length);
                
                counterElement.innerHTML == 0 ? counterElement.classList.add("zero-access") : counterElement.classList.remove("zero-access");
                progressElement.style.width = `${(this.value.length * 100) / maxLength}%`;
            };

        });
    }    
    
    
    function goStackSOFT(){
        let stackSOFT = document.querySelector(".stackSOFT");
        stackSOFT.addEventListener("click",function(){
            open("https://www.facebook.com/StackSoftSSS", "_blank");
        })
    }

    Form();
    loading();
    numbersPart();    
    counterDownEvent();
    inputPart();
    goStackSOFT();
});

let scrollerBtn = document.querySelector(".scrollerBtn")
let progressBtn = document.querySelector(".progressBtn")

window.addEventListener("scroll",() =>{

    //progress part 
    let allHeight = document.documentElement.scrollHeight -document.documentElement.clientHeight;
    let currentScroll = document.documentElement.scrollTop;
    progressBtn.style.width = `${(currentScroll / allHeight) * 100 }%`;

    // arrow part
    if(this.scrollY >= 700) {
        scrollerBtn.classList.add("show");
    }else {
        scrollerBtn.classList.remove("show");
    }
})

scrollerBtn.addEventListener("click",() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})

function preventDefault(className){
    document.querySelector(`.${className}`).addEventListener("click",function(Event){
        Event.preventDefault();
    })
}

preventDefault("logo");
preventDefault("page-info");


let searchInput = document.querySelector(".search-input");
searchInput.addEventListener("keyup", function() {
    let searchValue = searchInput.value.toLowerCase();
    document.querySelectorAll(".section-title h2").forEach((header) => {    
        let titleText = header.innerText.toLowerCase();        
        if (searchValue !== '' && titleText.includes(searchValue)) {
            document.querySelector(header.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        }    
    });
});

