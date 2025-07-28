//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const mainPage=document.querySelector("#page5btn");
var allpages=document.querySelectorAll(".page");
const allNavButtons = document.querySelectorAll(".navHover");
let currentPage = 1;

//select all subtopic pages
function hideall(){ //function to hide all pages
    for(let onepage of allpages){ //go through all subtopic pages
    onepage.style.display="none"; //hide it
    clearActiveButtons();
    }
}
function clearActiveButtons() {
  for (let btn of allNavButtons) {
    btn.classList.remove("active");
  }
}
function show(pgno){ //function to show selected page no
    hideall();

    currentPage = pgno;
    //select the page based on the parameter passed in
    let onepage=document.querySelector("#page"+pgno);
    onepage.style.display="block"; //show the page

    document.querySelector("#page" + pgno + "btn").classList.add("active");
    window.scrollTo(0,0);

    loadContent();
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
show(1);
});
page2btn.addEventListener("click", function () {
show(2);
});
page3btn.addEventListener("click", function () {
show(3);
});
page4btn.addEventListener("click", function () {
show(4);
});
mainPage.addEventListener("click", function () {
show(5);
});
hideall();

show(2);

/*JS for hamMenu */
const hamBtn=document.querySelector("#hamIcon");
const menuItemsList=document.querySelector("nav ul");
hamBtn.addEventListener("click",toggleMenus);

function toggleMenus(){ /*open and close menu*/
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    // menuItemsList.classList.toggle("menuShow");
    //if menu is showing (has the class “menuShow”)

    if(menuItemsList.classList.contains("menuShow")){
    menuItemsList.classList.remove("menuShow");
    hamBtn.innerHTML="<b>Close Menu</b>"; //change button text to chose menu
    }
    
    else{ //if menu NOT showing
    menuItemsList.classList.add("menuShow");
    hamBtn.innerHTML="<b>Open Menu</b>"; //change button text open menu
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=> {
        if (entry.isIntersecting)
        {
            entry.target.classList.add('show');
        }
        else
        {
            entry.target.classList.remove('show');
        }
    })
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

window.addEventListener('scroll', loadContent);
window.addEventListener('load', loadContent);
function loadContent()
{
    const page1 = document.querySelector("#page1");
    var x = document.querySelectorAll('.description');
    var z = document.querySelectorAll("time")
    for (i = 0; i < x.length; i++)
    {

        if (x[i].getBoundingClientRect().top < window.innerHeight / 1.1)
        {
            x[i].classList.add('show');
            z[i].classList.add('show');

        }

        if (currentPage !== 1)
        {
            x[i].classList.remove('show');
            z[i].classList.remove('show');
            continue;
        }
    }
}