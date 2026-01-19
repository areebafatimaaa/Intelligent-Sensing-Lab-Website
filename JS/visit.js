document.addEventListener("DOMContentLoaded", function(){
    var checkAvailButton = document.getElementById('availBtn');
    var resetButton = document.getElementById('resetBtn');
    var dateIn = document.getElementById('date1');
    var timeIn = document.getElementById('time1');
    var visitNum = document.getElementById('visitors');
    var errormsg = document.getElementById('errormessage');


    function validityChecker(visitorNum) {
        if (visitorNum < 1 || Math.floor(visitorNum)!=visitorNum){
            return false;
        } else {
            return true;
        }
    }

    function blankCheck() {
        if (!dateIn.value||!timeIn.value||!visitNum.value||!visitNum.value.trim()){
            return true;
        } else {
            return false;
        }
    }

    checkAvailButton.addEventListener("click", function overall(){
        let errorText="";
        errormsg.innerHTML = errorText;
        let isBlank = blankCheck();
        let isValid;
        event.preventDefault();     // makes sure that the page doesnt load & to cancel form submission
        if (isBlank) {
            errorText = "Data not completed; please re-enter";
        } else {
            isValid = validityChecker(Number(visitNum.value));
            if (!isValid){
                errorText = "Please enter a valid number of people!";
            } else {
                if (reserve(dateIn.value, timeIn.value, Number(visitNum.value))) {
                    alert("Your reservation is successful!");
                } else {
                    
                    alert("Sorry, the reservation is full!");
                }
            }
        }
        errormsg.innerHTML = errorText;
    })
     
    resetButton.onclick=function(){
        errormsg.innerHTML="";
    }
})
