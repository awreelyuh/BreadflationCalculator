'use strict'

const apiKey = '1baef04384504c8bb691c2a06e542dd9';
const apiUrl = 'https://api.bls.gov/publicAPI/v2/timeseries/data/APU0000702111?registrationkey=';

const userWageButton = document.getElementById('submit--latest');
userWageButton.addEventListener('click', onWageSubmit, false);

const dateButton = document.getElementById('submit--historical');
dateButton.addEventListener('click', onDateSubmit, false);

//Calculation based on latest average price of white bread in a US city
function onWageSubmit() {
    const userHourlyWage = document.getElementById('user-hourly-wage');
    const latestPrice = document.getElementById('price-of-bread--latest');
    const calculatedLoaves = document.getElementById('user-loaves');

    fetch(apiUrl + apiKey + '&latest=true')
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
fetch(apiUrl + apiKey)
    .then(response => {
        if (!response.ok) {
            console.error(error);
        }
        response.json()
            .then(json => {
                console.log(json);
                let loafCost = json["Results"]["series"];
                console.log(loafCost[0].data[1].value);
                // series.data.forEach(period => {
                //     fetch(period.value)
                //         .then(response => {
                //             response.json()
                //                 .then(json => { console.log(json); })
                //                 .catch(error => { console.error(error); })
                //         }).catch(error => { console.error(error); })
                // })
            })
            .catch(error => { console.error(error); });
    })
    .catch(error => { console.error(error); });

function calculateLoaves(hourlyWage, breadPrice) {
    return Math.trunc(hourlyWage / breadPrice);
}

function convertDate(date) {
    const [year, month, day] = date.split('-');
    return new Date(year, month - 1, day);
}