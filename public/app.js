'use strict'

const userWageButton = document.getElementById('submit--latest');
userWageButton.addEventListener('click', onWageSubmit, false);

const dateButton = document.getElementById('submit--historical');
dateButton.addEventListener('click', onDateSubmit, false);

const blsApiKey = '1baef04384504c8bb691c2a06e542dd9';
const blsApiUrl = `https://api.bls.gov/publicAPI/v2/timeseries/data/APU0000702111?registrationkey=${blsApiKey}`;

const fredApiKey = 'b681ac4182da99f6769bab0d9b2c01da';
const fredApiUrl = `https://api.stlouisfed.org/fred/series/observations?file_type=json&series_id=FEDMINNFRWG&observation_start=1980-01-01&api_key=${fredApiKey}`;

//Calculation based on latest average price of white bread in a US city
function onWageSubmit() {
    const userHourlyWage = document.getElementById('user-hourly-wage');
    const latestPrice = document.getElementById('price-of-bread--latest');
    const calculatedLoaves = document.getElementById('user-loaves');

    fetch(blsApiUrl + '&latest=true')
        .then(response => {
            if (!response.ok) {
                console.error(error);
            }
            response.json()
                .then(json => {
                    let latestBreadPrice = json['Results']['series'][0]['data'][0]['value'];
                    latestPrice.innerHTML = '$' + latestBreadPrice;
                    let userBread = calculateLoaves(userHourlyWage.value, latestBreadPrice);
                    calculatedLoaves.innerHTML = userBread + ' whole loaves of bread';
                })
                .catch(error => { console.error(error); })
        })
        .catch(error => { console.error(error); })
    return false;
}

//Calculation based on 1980-2023 data for average price of white bread in a US city
function onDateSubmit() {
    const date = document.getElementById('date-picker').value;
    const histMinWage = document.getElementById('min-wage');
    const historicalPrice = document.getElementById('price-of-bread--historical');
    const histCalculatedLoaves = document.getElementById('historical-loaves');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    fetch(blsApiUrl)
        .then(response => {
            if (!response.ok) {
                console.error(error);
            }
            response.json()
                .then(json => {
                    const dateInput = convertDate(date);
                    // console.log("Month name: " + monthNames[dateInput.getMonth()]);
                    // console.log("Year: " + dateInput.getFullYear());                    
                    fetch(blsApiUrl + `&startyear=${dateInput.getFullYear()}` + `&endyear=${dateInput.getFullYear()}`)
                        .then(response => {
                            response.json()
                                .then(json => {
                                    const histJsonData = json['Results']['series'][0]['data'];
                                    const selectedData = histJsonData.filter((entry) => entry.periodName === monthNames[dateInput.getMonth()]);

                                    const textForHistPrice = document.getElementById('text-price-bread--historical');
                                    textForHistPrice.innerHTML = `The average cost of a loaf of white bread in ${monthNames[dateInput.getMonth()]} ${dateInput.getFullYear()} was `
                                    historicalPrice.innerHTML = '$' + selectedData[0].value;

                                    
                                })
                                .catch(error => { console.error(error); })
                        })
                        .catch(error => { console.error(error); })
                })
                .catch(error => { console.error(error); })
        })
        .catch(error => { console.error(error); })
    return false;
}

function calculateLoaves(hourlyWage, breadPrice) {
    return Math.trunc(hourlyWage / breadPrice);
}

function convertDate(date) {
    const [year, month, day] = date.split('-');
    return new Date(year, month - 1, day);
}

// async function fetchFred() {
//     try {
//         const response = await fetch(fredApiUrl);
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         response.json()
//             .then(json => {
//                 console.log(json);
//             })
//             .catch(error => { console.error(error); });
//     } catch (error_1) {
//         console.error(error_1);
//     }
// }
