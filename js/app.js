window,addEventListener('load', () => {
    let long,
        lat,
        proxy = "https://cors-anywhere.herokuapp.com/",
        temperatureDescription = document.querySelector('.temperature-description'),
        temperatureDegree = document.querySelector('.temperature-degree'),
        locaotionTimezone = document.querySelector('.location-timezone'),
        temperatureSection = document.querySelector('.temperature'),
        temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            long = coords.longitude;
            lat = coords.latitude;

            const api = `${proxy}https://api.darksky.net/forecast/b320851680ce6e4a108a893f472b205f/${lat},${long}`;

            fetch(api)
            .then(res => res.json())
            .then(data => {
                const { temperature, summary, icon } = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locaotionTimezone.textContent = data.timezone;

                let celsius = (temperature - 32) * (5 / 9);

                setIcons(icon, document.querySelector('.icon'));

                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent == 'F'){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            })
        })   
    }

    const setIcons = (icon, iconID) => {
        const skycons = new Skycons({ color: 'white' });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});