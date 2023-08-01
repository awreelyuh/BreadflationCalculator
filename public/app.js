'use strict'

const apiKey = '1baef04384504c8bb691c2a06e542dd9';
const apiUrl = `https://api.bls.gov/publicAPI/v2/timeseries/data/APU0300702111?registrationkey=${apiKey}`;

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            console.error(error);
        }
        response.json()
            .then(json => {
                console.log(json);
                let loafCost = json["Results"]["series"];
                console.log(loafCost[0].data[3].value);
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