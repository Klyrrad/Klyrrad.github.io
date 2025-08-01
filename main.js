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
    updateFooterClass();
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

show(1);

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
    var x = document.querySelectorAll('.description');
    var z = document.querySelectorAll("time")

    const typeBowling = document.querySelector('.bowlingType');

    for (i = 0; i < x.length; i++)
    {
        // returns an object that bounds to the contents of the range
        //check if element has scrolled far enough to add the class
        if (x[i].getBoundingClientRect().top < window.innerHeight / 1.1)
        {
            x[i].classList.add('show');
            z[i].classList.add('show');

        }
        
        if (currentPage !== 1)
        {
            x[i].classList.remove('show');
            z[i].classList.remove('show');
        }
    }

    if (document.querySelector(".bowlingType").getBoundingClientRect().top < window.innerHeight / 1.2)
    {
        typeBowling.classList.add('show');
    }

    if (currentPage !== 1)
    {
        typeBowling.classList.remove('show');
    }

}

function updateFooterClass()
{
    const footer = document.querySelector("footer");

    if (currentPage === 2)
    {
        footer.classList.add("page2Footer");
    }

    else
    {
        footer.classList.remove("page2Footer");
    }
}

window.addEventListener("load", changeHistoryImage);
window.addEventListener("resize", changeHistoryImage);
var historyBowlingImage = 0;
const bcHistoryBowlingImgList = ["Images/HistoryBowling5200BC.jpg", "Images/HistoryBowlingMobile5200BC.jpg"]

function changeHistoryImage()
{
    const hamIcon = document.querySelector("#hamIcon");
    const hamIconDisplay = window.getComputedStyle(hamIcon).display;

    if (hamIconDisplay === "block")
    {
        historyBowlingImage = 1;
    }

    else
    {
        historyBowlingImage = 0;
    }

    document.querySelector("#history5200BC").src = bcHistoryBowlingImgList[historyBowlingImage];
}

const bannerImgList = ["Images/NavBanner.jpg", "Images/NavBanner2.jpg", "Images/NavBanner3.jpg", "Images/NavBanner4.jpg"]
let bannerPic = document.querySelector(".nav-background");
let bannerNum = 0;

function rotateBG()
{
    bannerPic.style.backgroundImage = `url('${bannerImgList[bannerNum]}')`;
    bannerNum = (bannerNum + 1) % bannerImgList.length;
    console.log(bannerNum)
}

rotateBG()
setInterval(rotateBG, 3000);

//#region Type Of Bowling Function & Audio
var bowlingprevBtn = document.getElementById("typeBowlingprev");
var bowlingnextBtn = document.getElementById("typeBowlingnext");
const bowlingImgList = ["Images/TenPin-Bowling.png", "Images/Duckpin-Bowling.png", "Images/CandlePin-Bowling.png"]
let typeBowlingPic = document.querySelector("#typeBowlingpic");

var typeBowlingaudio = new Audio();
var playlist = new Array("Audio/TenPinBowling.mp3", "Audio/DuckPinBowling.mp3", "Audio/CandlePinBowling.mp3");
var listenbtn = document.getElementById('audioTypeBowling');

var typeBowlingpgno = 1;

bowlingprevBtn.addEventListener("click", function()
{
    typeBowlingpgno--;
    if (typeBowlingpgno  < 1) 
    {
        typeBowlingpgno  = 3;
    }

    typeBowlingaudio.pause();
    typeBowlingaudio.currentTime = 0
    typeBowlingaudio.src = playlist[typeBowlingpgno - 1];
    changeTypeBowling(typeBowlingpgno);
});

bowlingnextBtn.addEventListener("click", function()
{
    typeBowlingpgno++;
    if (typeBowlingpgno  > 3) 
    {
        typeBowlingpgno  = 1;
    }
    
    typeBowlingaudio.pause();
    typeBowlingaudio.currentTime = 0
    typeBowlingaudio.src = playlist[typeBowlingpgno - 1];
    changeTypeBowling(typeBowlingpgno);
});

function changeTypeBowling(i)
{
    switch(i)
    {
        case 1:
            document.querySelector("#typebowlingHeader").innerHTML = "Ten-Pin Bowling"
            document.querySelector("#typebowlingDescription").innerHTML = `
            Ten-pin bowling is a type of bowling in which a bowler rolls a bowling ball down a 
            wood or synthetic lane toward ten pins positioned evenly in four rows in an equilateral 
            triangle. The objective is to knock down all ten pins on the first roll of the ball a 
            strike  or failing that, on the second roll a spare.
            `;
            
            break;
        case 2:
            document.querySelector("#typebowlingHeader").innerHTML = "DuckPin Bowling"
            document.querySelector("#typebowlingDescription").innerHTML = `
            Duckpin bowling follows rules similar to ten-pin, but uses balls without thumbholes and allows three rolls per frame.
            Players aim to knock down 10 pins per frame. A strike is knocking all pins on the first roll, 
            a spare in two, and a "ten" if cleared in all three.
            `;
            break;
        case 3:
            document.querySelector("#typebowlingHeader").innerHTML = "CandlePin Bowling"
            document.querySelector("#typebowlingDescription").innerHTML = `
            Candlepin bowling is similar to duckpin bowling. Candlepins are thinner than duckpins and thus harder to knock down. 
            The candlepin pinsetter is triggered manually with a reset button after each frame rather than automatically.
            In addition, there are no finger holes on the candlepin ball unlike ten pin bowling.
            `;
            break;      
    }

    typeBowlingPic.src = bowlingImgList[i-1];
}

listenbtn.addEventListener("click", function()
{
    typeBowlingaudio.src = playlist[typeBowlingpgno - 1];
    typeBowlingaudio.play();
});
//#endregion

//#region Bowling Ball Core Functions
var coreprevBtn = document.getElementById('coreNavprev');
var corenextBtn = document.getElementById('coreNavnext');
const coreImgList = ["Images/Symmetrical.jpg","Images/Asymmetrical.jpg","Images/sym_vs_asym.jpg"]
let bowlingCorePic = document.getElementById('typeCorePic')
var corePgNo = 1;

coreprevBtn.addEventListener("click", function()
{
    corePgNo--;
    if (corePgNo  < 1) 
    {
        corePgNo  = 3;
    }

    changeBowlingCore(corePgNo);
});

corenextBtn.addEventListener("click", function()
{
    corePgNo++;
    if (corePgNo  > 3) 
    {
        corePgNo  = 1;
    }
    
    changeBowlingCore(corePgNo);
});

function changeBowlingCore(i)
{
    switch(i)
    {
        case 1:
            document.getElementById('typeCoreHeader').innerHTML = "Symmetrical";
            document.getElementById('typeCoreDescription').innerHTML = `
            A symmetrical core in a bowling ball refers to a core with a uniform shape, 
            where the mass is distributed equally around the ball's center. 
            This results in a predictable and consistent ball motion down the lane, 
            making it ideal for bowlers seeking control and repeatability
            `;
            break;

        case 2:
            document.getElementById('typeCoreHeader').innerHTML = "Assymetrical";
            document.getElementById('typeCoreDescription').innerHTML = `
            An asymmetrical core bowling ball has an unevenly shaped core, 
            creating imbalance, which leads to earlier and more exaggerated reactions 
            on the lane compared to symmetrical cores. This imbalance is measured by the 
            intermediate differential, with higher numbers indicating greater asymmetry. 
            `;
            break;

        case 3:
            document.getElementById('typeCoreHeader').innerHTML = "Symmetrical vs Asymmetrical";
            document.getElementById('typeCoreDescription').innerHTML = `
            In summary, asymmetrical cores offer stronger, earlier, and more angular motion—ideal for 
            bowlers seeking aggressive ball reactions on challenging lane conditions. Symmetrical cores, 
            on the other hand, provide smoother, more controllable motion, making them better suited for 
            consistency and predictability. Bowlers should choose based on their play style: go asymmetrical 
            for power and hook potential, or symmetrical for control and versatility.
            `;
            break;

    }

    bowlingCorePic.src = coreImgList[i-1];
}
//#endregion

//#region Bowling Ball CoverStock Function
var coverPrevbtn = document.getElementById('coverNavprev');
var coverNextbtn = document.getElementById('coverNavnext');
const coverImgList = ["Images/SolidCoverStock.png","Images/HybridCoverStock.png","Images/PearlCoverStock.png","Images/UrethraneCoverStock.png","Images/CoverStock.jpg"];
let bowlingCoverPic = document.getElementById('typeCoverStockPic')
var coverPgNo = 1;

coverPrevbtn.addEventListener("click", function()
{
    coverPgNo--;
    if (coverPgNo  < 1) 
    {
        coverPgNo  = 5;
    }

    changeCoverStock(coverPgNo);
});

coverNextbtn.addEventListener("click", function()
{
    coverPgNo++;
    if (coverPgNo  > 5) 
    {
        coverPgNo  = 1;
    }
    
    changeCoverStock(coverPgNo);
});

function changeCoverStock(i)
{
    switch(i)
    {
        case 1:
            document.getElementById('typeCoverStockHeader').innerHTML = "Solid CoverStock";
            document.getElementById('typeCoverStockDescription').innerHTML = `
            Solid coverstocks are characterized by their matte finish, devoid of any glossy sheen (unless polished). 
            These coverstocks provide maximum traction on the lane surface, generating significant friction for an 
            early and strong hook motion. The lack of polish creates a higher friction coefficient, allowing the ball 
            to grip the lane surface more aggressively, especially in heavy oil conditions. Solid coverstocks excel in 
            providing a smooth and predictable arc, making them suitable for bowlers who prefer a controlled motion with 
            a strong mid-lane read. They are particularly effective on fresh oil patterns where a consistent hook is crucial 
            for performance.
            `;
            break;

        case 2:
            document.getElementById('typeCoverStockHeader').innerHTML = "Hybrid CoverStock";
            document.getElementById('typeCoverStockDescription').innerHTML = `
            Hybrid coverstocks combine the characteristics of both pearl and solid coverstocks, 
            offering a balanced performance on the lanes. They feature a combination of solid and pearl materials, 
            typically with the solid material as the base and the pearl additive providing enhanced length and 
            backend reaction. This blend results in a coverstock that offers versatility, providing traction in 
            the mid-lane while still offering a strong backend motion. Hybrid coverstocks are favored by bowlers 
            who need a ball that can adapt to a variety of lane conditions, making them a versatile option for 
            different playing styles.
            `;
            break;

        case 3:
            document.getElementById('typeCoverStockHeader').innerHTML = "Pearl CoverStock";
            document.getElementById('typeCoverStockDescription').innerHTML = `
            Pearl coverstocks are known for their glossy appearance, resembling the luster of a pearl. 
            These coverstocks feature a polished finish, which allows the ball to glide smoothly across 
            the lane surface. The pearl surface creates less friction, resulting in a longer skid phase before 
            the ball begins to hook. As a result, pearl coverstocks are ideal for bowlers who prefer a sharper 
            backend reaction or when encountering dry lane conditions. Their enhanced length and angularity make 
            them popular choices for bowlers seeking a strong down-lane motion.   
            `;
            break;
        case 4:
            document.getElementById('typeCoverStockHeader').innerHTML = "Urethrane CoverStock";
            document.getElementById('typeCoverStockDescription').innerHTML = `
            Urethane coverstocks have been a staple in the bowling world since the 1980s, 
            prized for their unmatched control and predictability. Unlike reactive resin coverstocks, 
            urethane coverstocks displace oil rather than absorbing it. Urethane balls offer a consistent 
            and controllable hook, making them a popular choice for spare shooting and playing on shorter 
            oil patterns. While they may lack the angularity of reactive balls, urethane coverstocks excel in 
            providing a more traditional and precise shot-making experience, favored by bowlers who prioritize 
            accuracy over power.
            `;
            break;

        case 5:
            document.getElementById('typeCoverStockHeader').innerHTML = "Which to go for?";
            document.getElementById('typeCoverStockDescription').innerHTML = `
            In conclusion, the choice of coverstock significantly influences a bowling ball's performance on the lanes. 
            Whether seeking length, versatility, traction, or control, bowlers can find the ideal coverstock to suit their 
            playing style and lane conditions. Understanding the characteristics of pearl, hybrid, solid, and urethane 
            coverstocks empowers bowlers to make informed decisions, unlocking their full potential on the bowling alley.
            `;
            break;

    }

    bowlingCoverPic.src = coverImgList[i-1];
}
//#endregion

//#region Bowling Ball Number Functions
var numberPrevbtn = document.getElementById('numberNavprev');
var numberNextbtn = document.getElementById('numberNavnext');
const numberImgList = ["Images/RG.jpg","Images/Differential.jpg", "Images/PSA.jpg", "Images/RGandDiff.png"];
let bowlingNumberPic = document.getElementById('typeNumberPic');
var numberPgNo = 1;

numberPrevbtn.addEventListener("click", function()
{
    numberPgNo--;
    if (numberPgNo  < 1) 
    {
        numberPgNo = 4;
    }

    changeNumbers(numberPgNo);
});

numberNextbtn.addEventListener("click", function()
{
    numberPgNo++;
    if (numberPgNo  > 4) 
    {
        numberPgNo = 1;
    }
    
    changeNumbers(numberPgNo);
});

function changeNumbers(i)
{
    switch(i)
    {
        case 1:
            document.getElementById('typeNumberHeader').innerHTML = "Radius Of Gyration (RG)";
            document.getElementById('typeNumberDescription').innerHTML = `
            The RG (Radius of Gyration) number of a ball indicates how readily it will roll or hook. 
            Lower RG numbers (e.g., 2.46-2.51) mean the ball will roll earlier and potentially hook sooner, 
            while higher RG numbers (e.g., 2.57-2.80) indicate the ball will roll later and potentially hook 
            further down the lane. 
            `;
            break;

        case 2:
            document.getElementById('typeNumberHeader').innerHTML = "Differential";
            document.getElementById('typeNumberDescription').innerHTML = `
            Bowling ball differential, often referred to as flare potential, 
            indicates how much the ball's surface will rotate around its axis during 
            its motion down the lane. It's a key factor in determining the hook potential 
            of a ball and how it reacts on the lane. Lower differential balls offer a more 
            controlled, smoother motion, while higher differential balls tend to be more 
            aggressive and hookier. 
            `;
            break;

        case 3:
            document.getElementById('typeNumberHeader').innerHTML = "Preferred Spin Axis (PSA)";
            document.getElementById('typeNumberDescription').innerHTML = `
            It refers to the axis around which a bowling ball's core naturally wants to rotate, 
            especially with asymmetrical cores. This axis influences how the ball transitions from 
            skid to hook to roll. Understanding the PSA and its relationship to the bowler's Positive 
            Axis Point (PAP) is crucial for optimizing ball motion and achieving desired lane reaction.    
            `;
            break;
        case 4:
            document.getElementById('typeNumberHeader').innerHTML = "Choosing the right Option";
            document.getElementById('typeNumberDescription').innerHTML = `
            When selecting a bowling ball, understanding <strong>RG</strong>, <strong>Differential</strong>, 
            and <strong>PSA</strong> can make a big difference in your performance:   

            <ul>
                <li>
                    <strong>Low RG + High Differential:</strong> Choose this combo for early rolling, 
                    aggressive hooking balls — great for heavy oil and players needing stronger backend motion.
                </li>

                <li>
                    <strong>High RG + Low Differential:</strong> Best for length and control — ideal for 
                    drier lanes or bowlers with high rev rates looking for a smoother motion.
                </li>
            </ul>

            <strong>PSA Considerations:</strong> Asymmetrical balls with a marked PSA give more control over layout adjustments. 
            Use the PSA to fine-tune how early or late the ball transitions into a hook phase.

            <br><br>

            <strong>Layout Tips:</strong>
            <ul>
                <li><strong>Pin Above the Fingers + PSA near PAP:</strong> Delivers strong backend and angular motion.</li>
                <li><strong>Pin Below the Fingers + PSA farther from PAP:</strong> Promotes an earlier roll and smoother arc.</li>
                <li><strong>Use Symmetrical Balls</strong> when predictability and control are priorities.</li>
                <li><strong>Use Asymmetrical Balls</strong> for greater versatility and sharper reactions when matched with proper layout.</li>
            </ul>

            Work with a professional ball driller to match these specs and layouts to your <strong>rev rate, axis tilt, and lane conditions</strong>. 
            The right combination maximizes your potential and consistency on the lanes. 
            `;
            break;
    }

    bowlingNumberPic.src = numberImgList[i-1];
}
//#endregion

//#region Oiling Pattern Function
var oilingPrevbtn = document.getElementById('numberNavprev');
var oilingNextbtn = document.getElementById('numberNavnext');
const oilingImgLIst = ["Images/RG.jpg","Images/Differential.jpg", "Images/PSA.jpg", "Images/RGandDiff.png"];
let oilingPic = document.getElementById('oilingPic');
var oilingPgNo = 1;

oilingPrevbtn.addEventListener("click", function()
{
    oilingPgNo--;
    if (oilingPgNo  < 1) 
    {
        oilingPgNo = 4;
    }

    changeOiling(oilingPgNo);
});

oilingNextbtn.addEventListener("click", function()
{
    numberoilingPgNoPgNo++;
    if (oilingPgNo  > 4) 
    {
        oilingPgNo = 1;
    }
    
    changeOiling(oilingPgNo);
});

function changeOiling(i)
{
    switch(i)
    {
        case 1:
            document.getElementById('oilingHeader').innerHTML = "Rule of 31";
            document.getElementById('oilingDescription').innerHTML = `
            The "Rule of 31" in bowling is a guideline for estimating the breakpoint of the bowling
            ball on a given oil pattern. Suggests that you subtract 31 from the length of the oil
            pattern to determine the approximate board where the ball should exit the pattern.
            <br><br>
            For example, on a 45 foot pattern, the breakpoint would be 14 board (45 - 31 = 14). This
            rule is a starting point and doesn't account for lane surface or individual bowler 
            characteristics.
            `;
            break;
    }
}
//#endregion