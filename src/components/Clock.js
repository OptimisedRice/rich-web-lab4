import React, {useEffect, useState} from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [temp, setTemp] = useState(undefined);
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000)

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
         fetch('https://api.open-meteo.com/v1/forecast?' + new URLSearchParams({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          current: ["temperature_2m", "apparent_temperature"],
          timezone: "GMT",
          forecast_days: 1,
        }))
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            console.log(json)
            setTemp(json);
          });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
    // <-- this will be fired on component's loading
  }, []);
  return (
    <div style={styles.container}>
      <div style={styles.clock}>
        <p style={styles.time}>{time.toLocaleTimeString()}</p>
      </div>
      <div style={styles.temps}>
        <p style={styles.temp}>
          Temp: {temp && temp.current.temperature_2m}
        </p>
        <p style={styles.temp}>
          Feels like: {temp && temp.current.apparent_temperature}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignSelf: "flex-start",
    padding: 20,
    flexDirection: "row",
    height: "10vh"
  },
  clock: {
    display: "flex",
    fontSize: "4rem",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
  },
  time: {
    margin: 0,
  },
  temps: {
    margin: 0,
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "600"
  },
  temp: {
    margin: 0,
    marginTop: 5,
    marginBottom: 5,
  }
}
export default Clock;