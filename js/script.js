const CALTELLER = new Map();

function onload() {
    CALTELLER.set("appel", 60);
    CALTELLER.set("paprika", 28);
    CALTELLER.set("zilvervliesrijst", 111);
    CALTELLER.set("sperziebonen", 24);
    CALTELLER.set("kabeljauwfilet", 118);
    CALTELLER.set("biefstuk", 115);
    CALTELLER.set("olie", 108);
    CALTELLER.set("halvarine", 90);
    CALTELLER.set("thee", 0);
    CALTELLER.set("coca", 0.6);
}

function pageManager(pageId) {

    //Pagina's
    var firstPage = document.getElementsByClassName('Homepage')[0];
    var secondPage = document.getElementsByClassName('CalVerbrand')[0];
    var thridPage = document.getElementsByClassName('CalTeller')[0];
    var fourthPage = document.getElementsByClassName('BMIBerekenen')[0];
    var fifthPage = document.getElementsByClassName('OverOns')[0];

    switch (pageId) {
        case 0:
            pageOn(firstPage);
            pageOff(secondPage);
            pageOff(thridPage);
            pageOff(fourthPage);
            pageOff(fifthPage);
            break;
        case 1:
            pageOff(firstPage);
            pageOn(secondPage);
            pageOff(thridPage);
            pageOff(fourthPage);
            pageOff(fifthPage);
            break;
        case 2:
            pageOff(firstPage);
            pageOff(secondPage);
            pageOn(thridPage);
            pageOff(fourthPage);
            pageOff(fifthPage);
            break;
        case 3:
            pageOff(firstPage);
            pageOff(secondPage);
            pageOff(thridPage);
            pageOn(fourthPage);
            pageOff(fifthPage);
            break;
        case 4:
            pageOff(firstPage);
            pageOff(secondPage);
            pageOff(thridPage);
            pageOff(fourthPage);
            pageOn(fifthPage);
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
    IsGezondBMI(bmi)
}

function IsGezondBMI(bmi) {
    var output = document.getElementById("BMIOutput");
    var gezondheid;
    if (bmi <= 20) {
        gezondheid = " Uw heeft ondergewicht. Het is belangrijk dat u gewichtstoename realiseert.";
        output.innerHTML = "Jouw bmi is: " + bmi + "." + gezondheid;
    } else if (bmi <= 25) {
        gezondheid = " Uw gewicht is gezond. Probeer op dit gewicht te blijven.";
        output.innerHTML = "Jouw bmi is: " + bmi + "." + gezondheid;
    } else if (bmi <= 30) {
        gezondheid = " U heeft overgewicht. Afvallen is verstandig.";
        output.innerHTML = "Jouw bmi is: " + bmi + "." + gezondheid;
    } else if (bmi > 30) {
        gezondheid = " Uw gewicht is levensbedreigend. Neem contact op met uw huisarts.";
        output.innerHTML = "Jouw bmi is: " + bmi + "." + gezondheid;
    } else {
        output.innerHTML = "U moet de juiste getallen in vullen.";
    }
}

function onCalVerbrand() {
    var activiteit = document.getElementById("activiteitInput");
    var tijd = Number(document.getElementById("tijdInput").value) / 60;
    console.log(tijd);
    switch (activiteit.value) {
        case "wandelen":
            berekenCal(300, tijd);
            break;
        case "rennen":
            berekenCal(700, tijd);
            break;
        case "zwemmen":
            berekenCal(450, tijd);
            break;
        case "roeien":
            berekenCal(500, tijd);
            break;
    }
}

function berekenCal(perUur, aantalUur) {
    var output = document.getElementById("calOutput");
    var calVerbrand = perUur * aantalUur;


    const date = new Date();
    var today = formatDate(date);
    if (localStorage.getItem("lastSavedDay") !== today) {
        //Vandaag nog niet gesaved
        localStorage.setItem("lastSavedDay", today);
        localStorage.setItem("calToday", calVerbrand);
    } else {
        //Vandaag al wel gesaved
        localStorage.setItem("calToday", Number(localStorage.getItem("calToday")) + calVerbrand);
    }

    var calVerbrandVandaag = localStorage.getItem("calToday");
    var highscore = Number(localStorage.getItem("dagHighScore"));
    console.log(highscore);

    if (highscore < calVerbrandVandaag) {
        output.innerHTML = `Nieuwe highscore van de dag!!! Je hebt nu ${calVerbrand} calorieën verbrand. Je zit vandaag al op ${calVerbrandVandaag} calorieën, goed bezig!`;
        localStorage.setItem("dagHighScore", calVerbrandVandaag);
    } else {
        output.innerHTML = `Je hebt nu ${calVerbrand} calorieën verbrand. Je zit vandaag al op ${calVerbrandVandaag} calorieën, goed bezig! Nog ${highscore - calVerbrand} en dan heb je een nieuw highscore!`;
    }
}

function formatDate(date) {
    var correctDate = date.getDate().toString() + (date.getMonth() + 1).toString() + date.getFullYear().toString();
    return correctDate;
}

function onBerekenCal() {
    var checkBoxes = document.getElementsByClassName("calTellerCheckBox");

    var totalCal = 0;

    //Loop door alle checkboxes heen
    for (let i = 0; i < checkBoxes.length; i++) {

        //check of de checkbox is gechecked
        if (checkBoxes[i].checked) {

            var radioInputs = document.getElementsByClassName("radioInput" + checkBoxes[i].id);

            if (radioInputs[0].checked) {
                totalCal += CALTELLER.get(radioInputs[0].id);
            } else if (radioInputs[1].checked) {
                totalCal += CALTELLER.get(radioInputs[1].id);
            } else {
                console.error("Altijd 1 checken");
            }
        }
    }

    console.log(totalCal);
}

// script.js

// Sample data for the chart
const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
        label: 'Monthly Sales',
        data: [50, 30, 60, 70, 45],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
    }]
};

// Configuration options
const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

// Get the canvas element and create the chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});
