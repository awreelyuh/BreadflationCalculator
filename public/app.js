'use strict'

const apiKey = '1baef04384504c8bb691c2a06e542dd9';
const apiUrl = `https://api.bls.gov/publicAPI/v2/timeseries/data/APU0300702111?registrationkey=${apiKey}`;
const pokeApi = 'https://pokeapi.co/api/v2/ability/150/'

fetch(apiUrl)
    .then(response => {
        // if (!response.ok) {
        //     console.error(error);
        // }
        response.json()
            .then(json => { console.log(json); })
            //.catch(error => { console.error(error); });
    })
    // .then(data => {
    //     console.log(data);
    // })
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