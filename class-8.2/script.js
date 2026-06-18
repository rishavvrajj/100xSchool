const axios = require('axios');

async function main() {
    const response = await fetch('https://fake-json-api.mock.beeceptor.com/users');
    const json = await response.json();
    console.log('Fetch: ' + JSON.stringify(json))
}

async function axiosMain() {
    const response = await axios.get('https://fake-json-api.mock.beeceptor.com/users')
    console.log('Axios: ' + JSON.stringify(response.data))
}

main()
axiosMain()