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

    if (highscore < calVerbrandVandaag) {
        output.innerHTML = `Nieuwe highscore van de dag!!! Je hebt nu ${calVerbrand} calorieën verbrand. Je zit vandaag al op ${calVerbrandVandaag} calorieën, goed bezig!`;
        localStorage.setItem("dagHighScore", calVerbrandVandaag);
    } else {
        output.innerHTML = `Je hebt nu ${calVerbrand} calorieën verbrand. Je zit vandaag al op ${calVerbrandVandaag} calorieën, goed bezig! Nog ${highscore - calVerbrand} en dan heb je een nieuw highscore!`;
    }
    saveWeek(weekNumber, date.getDay());
}

function saveWeek(currentWeek, currentWeekDay) {
    var week;
    if(localStorage.getItem("currentWeek") == currentWeek) {
        console.log("Deze week is gesaved");
        week = JSON.parse(localStorage.getItem("weekCal"));
        week[currentWeekDay - 1] = localStorage.getItem("calToday");
        localStorage.setItem("weekCal", JSON.stringify(week));
    } else {
        console.log("Deze week is niet gesaved")
        week = [0, 0, 0, 0, 0, 0, 0];
        week[currentWeekDay - 1] = localStorage.getItem("calToday");
        localStorage.setItem("weekCal", JSON.stringify(week));
        localStorage.setItem("currentWeek", currentWeek);
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
}

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    var weekCal = JSON.parse(localStorage.getItem("weekCal"));

    if(weekCal === null) {
        weekCal = [0, 0, 0, 0, 0, 0, 0];
    }
    
    for(let i = 0; i < weekCal.length; i++) {
        console.log(Number(weekCal[i]));
        weekCal[i] = Number(weekCal[i] / 10);
    }

    // Data for the graph (x and y values)
    const data = [
        { x: 50, y: weekCal[0] },
        { x: 150, y: weekCal[1] },
        { x: 200, y: weekCal[2] },
        { x: 250, y: weekCal[3] },
        { x: 300, y: weekCal[4] },
        { x: 350, y: weekCal[5] },
        { x: 400, y: weekCal[6] },
    ];

        // const data = [
        //     { x: 50, y: 150 },
        //     { x: 150, y: 200 },
        //     { x: 200, y: 250 },
        //     { x: 250, y: 300 },
        //     { x: 300, y: 350 },
        //     { x: 350, y: 400 },
        //     { x: 400, y: 450},
        // ];

    console.log(data.length);

    // Function to draw the graph
    function drawGraph() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Define graph properties (line color, width, etc.)
        ctx.strokeStyle = "#0077FF";
        ctx.lineWidth = 1;

        // Move to the first data point
        ctx.beginPath();
        ctx.moveTo(data[0].x, canvas.height - data[0].y);

        // Loop through the data and draw the graph
        for (let i = 1; i < data.length; i++) {
            console.log(data[i].x);
            ctx.lineTo(data[i].x, canvas.height - data[i].y);
        }

        // Stroke the path to draw the line
        ctx.stroke();
    }

    // Call the drawGraph function to draw the initial graph
    drawGraph();
});