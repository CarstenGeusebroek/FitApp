function pageManager(pageId) {

    //Pagina's
    var firstPage = document.getElementsByClassName('Homepage')[0];
    var secondPage = document.getElementsByClassName('CalVerbrand')[0];
    var thridPage = document.getElementsByClassName('BMIBerekenen')[0];

    switch (pageId) {
        case 0:
            pageOn(firstPage);
            pageOff(secondPage);    
            pageOff(thridPage);
            break;
        case 1:
            pageOff(firstPage);
            pageOn(secondPage);
            pageOff(thridPage);
            break;
        case 2:
            pageOff(firstPage);
            pageOff(secondPage);
            pageOn(thridPage)
            break;
        default:
            console.error("page id bestaat niet");
    }
}

//Zet pagina uit
function pageOff(x) {
    x.style.display = "none";
}

//Zet pagina aan
function pageOn(x) {
    x.style.display = "block";
}

function BMIBerekenen() {
    var lengte = document.getElementsByClassName("lengteBMI")[0].value / 100;
    var gewicht = document.getElementsByClassName("gewichtBMI")[0].value;
    
    var bmi = Math.round((gewicht / (lengte * lengte) * 10)) / 10;
    console.log(gewicht / (lengte * lengte));
    IsGezondBMI(bmi)
}

function IsGezondBMI(bmi) {
    var output = document.getElementById("BMIOutput");
    var gezondheid;
    if(bmi <= 20) {
        gezondheid = " Uw heeft ondergewicht. Het is belangrijk dat u gewichtstoename realiseert.";
    } else if(bmi <=  25) {
        gezondheid = " Uw gewicht is gezond. Probeer op dit gewicht te blijven.";
    } else if(bmi <= 30) {
        gezondheid = " U heeft overgewicht. Afvallen is verstandig.";
    } else {
        gezondheid = " Uw gewicht is levensbedreigend. Neem contact op met uw huisarts.";
    }
    output.innerHTML = "Jouw bmi is: " + bmi + "." + gezondheid;
}