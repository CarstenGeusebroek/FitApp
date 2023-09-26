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
    startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));

    var weekNumber = Math.ceil(days / 7);

    var today = formatDate(date);
    if (localStorage.getItem("lastSavedverbrandDay") !== today) {
        //Vandaag nog niet gesaved
        localStorage.setItem("lastSavedverbrandDay", today);
        localStorage.setItem("calverbrandToday", calVerbrand);
    } else {
        //Vandaag al wel gesaved
        localStorage.setItem("calverbrandToday", Number(localStorage.getItem("calverbrandToday")) + calVerbrand);
    }

    var calVerbrandVandaag = localStorage.getItem("calverbrandToday");
    var highscore = Number(localStorage.getItem("dagHighScore"));

    if (highscore < calVerbrandVandaag) {
        output.innerHTML = `Nieuwe highscore van de dag!!! Je hebt nu ${calVerbrand} calorieën verbrand. Je zit vandaag al op ${calVerbrandVandaag} calorieën, goed bezig!`;
        localStorage.setItem("dagHighScore", calVerbrandVandaag);
    } else {
        output.innerHTML = `Je hebt nu ${calVerbrand} calorieën verbrand. Je zit vandaag al op ${calVerbrandVandaag} calorieën, goed bezig! Nog ${highscore - calVerbrand} en dan heb je een nieuw highscore!`;
    }
    saveVerbrandWeek(weekNumber, date.getDay());
}

function saveVerbrandWeek(currentWeek, currentWeekDay) {
    var week;
    if (localStorage.getItem("currentverbrandWeek") == currentWeek) {
        console.log("Deze week is gesaved");
        week = JSON.parse(localStorage.getItem("weekverbrandCal"));
        week[currentWeekDay - 1] = localStorage.getItem("calverbrandToday");
        localStorage.setItem("weekverbrandCal", JSON.stringify(week));
    } else {
        console.log("Deze week is niet gesaved")
        week = [0, 0, 0, 0, 0, 0, 0];
        week[currentWeekDay - 1] = localStorage.getItem("calverbrandToday");
        localStorage.setItem("weekverbrandCal", JSON.stringify(week));
        localStorage.setItem("currentverbrandWeek", currentWeek);
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

    const date = new Date();
    startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));

    var weekNumber = Math.ceil(days / 7);

    var today = formatDate(date);
    if (localStorage.getItem("lastSavedtellerDay") !== today) {
        //Vandaag nog niet gesaved
        localStorage.setItem("lastSavedtellerDay", today);
        localStorage.setItem("caltellerToday", totalCal);
    } else {
        //Vandaag al wel gesaved
        localStorage.setItem("caltellerToday", Number(localStorage.getItem("caltellerToday")) + totalCal);
    }

    saveTellerWeek(weekNumber, date.getDay());
}

function saveTellerWeek(currentWeek, currentWeekDay) {
    var week;
    if (localStorage.getItem("currenttellerWeek") == currentWeek) {
        console.log("Deze week is gesaved");
        week = JSON.parse(localStorage.getItem("weektellerCal"));
        week[currentWeekDay - 1] = localStorage.getItem("caltellerToday");
        localStorage.setItem("weektellerCal", JSON.stringify(week));
    } else {
        console.log("Deze week is niet gesaved")
        week = [0, 0, 0, 0, 0, 0, 0];
        week[currentWeekDay - 1] = localStorage.getItem("caltellerToday");
        localStorage.setItem("weektellerCal", JSON.stringify(week));
        localStorage.setItem("currenttellerWeek", currentWeek);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const graphs = document.getElementsByClassName("grafiek");
    var ctxs = [graphs[0].getContext("2d"), graphs[1].getContext("2d")];

    //Verbrander

    var weekverbrandCal = JSON.parse(localStorage.getItem("weekverbrandCal"));

    if (weekverbrandCal === null) {
        weekverbrandCal = [0, 0, 0, 0, 0, 0, 0];
    }

    for (let i = 0; i < weekverbrandCal.length; i++) {
        weekverbrandCal[i] = Number(weekverbrandCal[i] / 7.5);
    }


    //Teller
    var weektellerCal = JSON.parse(localStorage.getItem("weektellerCal"));

    if (weektellerCal === null) {
        weektellerCal = [0, 0, 0, 0, 0, 0, 0];
    }

    for (let i = 0; i < weektellerCal.length; i++) {
        weektellerCal[i] = Number(weektellerCal[i] / 7.5);
    }

    // Data for the graph (x and y values)
    const dataverbrand = [
        { x: 20, y: weekverbrandCal[0] },
        { x: 70, y: weekverbrandCal[1] },
        { x: 120, y: weekverbrandCal[2] },
        { x: 170, y: weekverbrandCal[3] },
        { x: 220, y: weekverbrandCal[4] },
        { x: 270, y: weekverbrandCal[5] },
        { x: 320, y: weekverbrandCal[6] },
    ];

    const datateller = [
        { x: 20, y: weektellerCal[0] },
        { x: 70, y: weektellerCal[1] },
        { x: 120, y: weektellerCal[2] },
        { x: 170, y: weektellerCal[3] },
        { x: 220, y: weektellerCal[4] },
        { x: 270, y: weektellerCal[5] },
        { x: 320, y: weektellerCal[6] },
    ];

    const data = [dataverbrand, datateller];


    // Function to draw the graph
    function drawGraph(graphNumber) {
        ctxs[graphNumber].clearRect(0, 0, graphs[graphNumber].width, graphs[graphNumber].height);

        // Define graph properties (line color, width, etc.)
        ctxs[graphNumber].strokeStyle = "#0077FF";
        ctxs[graphNumber].lineWidth = 2;

        // Move to the first data point
        ctxs[graphNumber].beginPath();
        ctxs[graphNumber].moveTo(data[graphNumber][0].x, graphs[graphNumber].height - data[graphNumber][0].y);

        // Loop through the data and draw the graph
        for (let i = 1; i < data[graphNumber].length; i++) {
            ctxs[graphNumber].lineTo(data[graphNumber][i].x, graphs[graphNumber].height - data[graphNumber][i].y);
        }

        // Stroke the path to draw the line
        ctxs[graphNumber].stroke();
    }

    // Call the drawGraph function to draw the initial graph
    for (let i = 0; i < graphs.length; i++) {
        drawGraph(i);
    }
});