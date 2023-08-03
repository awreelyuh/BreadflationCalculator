'use strict'

const apiKey = '1baef04384504c8bb691c2a06e542dd9';
const apiUrl = 'https://api.bls.gov/publicAPI/v2/timeseries/data/APU0000702111?registrationkey=';

const currentPrice = document.getElementById('price-of-bread');

//Latest average price of white bread in a US city
fetch(apiUrl + apiKey + '&latest=true')
        .then(response => {
            if (!response.ok) {
                console.error(error);
            }
            response.json()
                .then(json => {
                    let latestBreadPrice = json["Results"]["series"][0]["data"][0]["value"];
                    currentPrice.innerHTML = "$" + latestBreadPrice;
                })
                .catch(error => { console.error(error); })
        })
    .catch(error => { console.error(error); })

//Average price of white bread in a US city, 1980 to 2023
fetch(apiUrl + apiKey)
    .then(response => {
        if (!response.ok) {
            console.error(error);
        }
        response.json()
            .then(json => {
                console.log(json);
                let loafCost = json["Results"]["series"];
                console.log(loafCost[0].data[0].value);
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