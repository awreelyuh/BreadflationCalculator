'use strict'

const apiKey = '1baef04384504c8bb691c2a06e542dd9';
const apiUrl = `https://api.bls.gov/publicAPI/v2/timeseries/data/APU0300702111?registrationkey=${apiKey}`;

fetch(apiUrl,
    {
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            console.error(error);
        }
        response.json();
        console.log(response.json)
    })
    .catch(error => { console.error(error); });

// fetch('https://api.bls.gov/publicAPI/v1/timeseries/data/APU0300702111')
//     .then(response => {
//         response.json()
//             .then(json => {
//                 let results = json.results.series.data;

//                 console.log(results);
//             }).catch(error => {
//                 console.error(error);
//             });
//     }).catch(error => {
//         console.error(error);
//     });