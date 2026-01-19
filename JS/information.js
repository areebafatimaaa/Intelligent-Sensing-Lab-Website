document.addEventListener("DOMContentLoaded", function(){
    const MsgArray = ["Optical Sensing Division has 8 openings for PhD researchers! Develop next-gen imaging systems.", "Bio-Sensing Group offers 5 internship positions in medical sensor development for researchers!", "Smart Sensing Division has 6 internship spots open for applications!"];
    const len = MsgArray.length;
    heading = document.getElementById('loopHead');

    window.onload = f1;
    setInterval(msgLoop, 3000);

    // generates a random number -> index for the array in order to choose a message
    function randomNumGen(max){    
        return Math.floor(Math.random()*max);
    }

    function f1(){
        randInt = randomNumGen(len);
        heading.innerHTML=MsgArray[randInt];
    }

    
    function msgLoop() {
        let cur = randInt;     // good practice to use let
        next = (cur + 1)%3;
        heading.innerHTML = MsgArray[next];
        randInt = next;
    }
})