const apiKey = '1baef04384504c8bb691c2a06e542dd9';
const apiUrl = `https://api.bls.gov/publicAPI/v2/timeseries/data/APU0300702111?registrationkey=${apiKey}`;

fetch(apiUrl)
  .then(response => {
    response.json()
      .then(json => {
        console.log(json)
        })
      })
      .catch(error => {
        console.error(error)
        throw new Error("Please contact support, it appears we have failed you.")
      })
  .catch(error => console.error(error))