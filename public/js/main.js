console.log('Client side script loaded');

function fetchWeather(address) {
    return new Promise((resolve, reject) => {
        fetch('/weather?address=' + address)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(e => reject(e))
    })
}

const formElement = document.querySelector('form');
const messageElement1 = document.getElementById('msg-1');
const messageElement2 = document.getElementById('msg-2');
const searchElement = document.querySelector('input');

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    messageElement1.textContent = 'Loading...';
    messageElement2.textContent = '';
    fetchWeather(searchElement.value)
        .then(data => {
            if (data.error) {
                messageElement1.textContent = data.error;
            } else {
                messageElement1.textContent = data.location;
                messageElement2.textContent = data.forecast;
            }
        })
        .catch(e => resultElement.innerHTML = JSON.stringify(e))
})