'use strict'

const apiKey = '1baef04384504c8bb691c2a06e542dd9';

fetch(`https://api.bls.gov/publicAPI/v2/timeseries/data/APU0300702111?registrationkey=${apiKey}`,
    {
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok -- WHY');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.results.series);
    })
    .catch(error => {
        console.error(error);
    });

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