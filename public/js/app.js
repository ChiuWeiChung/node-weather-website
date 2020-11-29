console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form');

const weatherContent = document.querySelectorAll('.weather-content');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(e.target.children[0].value)
    const address = e.target.children[0].value
    e.target.children[0].value = "";
    fetch(`http://localhost:3000/weather?address=${address}`).then(res => {
        // console.log(res);
        res.json().then(data => {
            // console.log(data);
            if (data.error) {
                weatherContent[0].textContent = data.error;
                weatherContent[1].textContent = "";
            } else if (data.info) {
                weatherContent[0].textContent = data.info;
                weatherContent[1].textContent = "";
            } else {
                weatherContent[0].textContent = data.location;
                weatherContent[1].textContent = data.forecast;
            }
        })
    })
})
