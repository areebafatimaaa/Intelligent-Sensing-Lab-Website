document.addEventListener("DOMContentLoaded", function(){
    var bsdHead = document.getElementById('bsdHead');
    var osdHead = document.getElementById('osdHead');
    var ssdHead = document.getElementById('ssdHead');
    var divArray = document.querySelectorAll('.division');
    var groupArray = document.querySelectorAll('.group');
    var btnArray= document.querySelectorAll('.rankBtn');
    var TotalGroups = 0;   
    var lastChangeTime;
    var submitLink = document.getElementById('submitBtn');
    var clearLink = document.getElementById('clearBtn');
    var errorContain = document.getElementById('tableError');
    var totalDisp =document.getElementById('totalNumDisplay');
    var divList = new Map;                                                // maps class name to division name
    divList.set("osdDiv", "Optical Sensing Division");
    divList.set("bsdDiv", "Bio-Sensing Division");
    divList.set("ssdDiv", "Smart Sensing Division");

    window.onload = osdClick;
    osdHead.onclick = osdClick;
    bsdHead.onclick = bsdClick;
    ssdHead.onclick = ssdClick;

    btnArray.forEach(function(element, index) {
        element.onclick = function () {
            event.preventDefault();
            var rankNum = parseFloat(this.parentNode.children[2].value);   // 2 -> input
            var groupName = this.parentNode.children[1].innerHTML;
            var divName = divList.get(this.parentNode.getAttribute("class"));
            if (rankNum == NaN){
                alert("Please enter the rank of the chosen group");
                return;
            }
            if ((!rankNum && rankNum!=0 )|| Math.floor(rankNum)!=rankNum){
                alert("Please enter the rank of the chosen group");
                return;
            } 
            if (1>rankNum || rankNum>10) {
                alert("Please enter the rank of chosen between 1 and 10");
                return;
            }
            if (groupArray[rankNum-1].innerHTML == groupName){
                alert("You have already chosen this group");
                return;
            }
            for (let i = 0; i<groupArray.length;i++){
                if (groupArray[i].innerHTML == groupName){
                    alert("You have already chosen this group");
                    return;
                }
            }
            if (groupArray[rankNum-1].innerHTML != "") {
                alert("You have already chosen this rank");
                return;
            }
            switch (rankNum) {
                case 1:
                    rankFormatted ="1st";
                    break;
                case 2:
                    rankFormatted ="2nd";
                    break;
                case 3:
                    rankFormatted ="3rd";
                    break;
                default:
                    rankFormatted = rankNum+"th";
            }
            alert('You have chosen ' + groupName + ' as your '+ rankFormatted  +' chosen group in ' + divName + " successfully");
            divArray[rankNum-1].innerHTML = divName;
            groupArray[rankNum-1].innerHTML = groupName;
            updateTable();
        }
    })

    function updateTable(){ 
        TotalGroups+=1;
        lastChangeTime = new Date();
        totalDisp.innerHTML = "Total number of completed choices: " + TotalGroups;
    }

    function bsdClick() {
        osdHead.setAttribute('style', 'background-color:rgb(140, 167, 207);');
        ssdHead.setAttribute('style', 'background-color:rgb(140, 167, 207);');
        bsdHead.setAttribute('style', 'background-color:white;');
        document.querySelector('.bsdForm').setAttribute('style', 'display: block;');
        document.querySelector('.ssdForm').setAttribute('style', 'display: none;');
        document.querySelector('.osdForm').setAttribute('style', 'display: none;');
        
    }

    function ssdClick() {
        osdHead.setAttribute('style', 'background-color:rgb(140, 167, 207);');
        bsdHead.setAttribute('style', 'background-color:rgb(140, 167, 207);');
        ssdHead.setAttribute('style', 'background-color:white;');
        document.querySelector('.ssdForm').setAttribute('style', 'display: block;');
        document.querySelector('.bsdForm').setAttribute('style', 'display: none;');
        document.querySelector('.osdForm').setAttribute('style', 'display: none;');
        
    }


    function osdClick() {
        ssdHead.setAttribute('style', 'background-color:rgb(140, 167, 207);');
        bsdHead.setAttribute('style', 'background-color:rgb(140, 167, 207);');
        osdHead.setAttribute('style', 'background-color:white;');
        document.querySelector('.osdForm').setAttribute('style', 'display: block;');
        document.querySelector('.bsdForm').setAttribute('style', 'display: none;');
        document.querySelector('.ssdForm').setAttribute('style', 'display: none;');
    }

    submitLink.onclick = function() {
        event.preventDefault();
        tempStr = [];
        if (TotalGroups==0){
            errorContain.innerHTML = "You have not chosen any group";
            return;
        }

        lastRank = 0;
        for (let i=0;i<groupArray.length;i++){
            if (groupArray[i].innerHTML != ""){
                lastRank = i;
            }
        }

        for (let i=0;i<lastRank;i++){
            if (groupArray[i].innerHTML==""){
                switch (i) {
                    case 0:
                        tempStr.push("1st chosen group");
                        break;
                    case 1:
                        tempStr.push("2nd chosen group");
                        break;
                    case 2:
                        tempStr.push("3rd chosen group");
                        break;
                    default:
                        tempStr.push((i+1)+"th chosen group");
                }
            }
        }

        if (tempStr.length!=0){
            gapStr = tempStr[0];
            for (let i=1;i<tempStr.length;i++){
                if (i == tempStr.length - 1){
                    gapStr = gapStr + " and " + tempStr[i];
                } else {
                    gapStr =  gapStr +", " + tempStr[i];
                }
            }
            errorContain.innerHTML = "You have not chosen your " + gapStr + ", you can not leave any gap between your chosen groups.";
        } else {
            errorContain.innerHTML = "You have successfully submitted you application at time " + new Date();
        }
    }

    clearLink.onclick = function(){
        event.preventDefault();
        TotalGroups = 0;
        totalDisp.innerHTML = "Total number of completed choices: " + TotalGroups;
        errorContain.innerHTML="";
        for (let i = 0; i<groupArray.length;i++){
            groupArray[i].innerHTML = "";
            divArray[i].innerHTML = "";
        }
        lastChangeTime = new Date();
    }
    
})
