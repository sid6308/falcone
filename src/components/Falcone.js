import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles.css";

const Falcone = () => {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState({});
  const [selectedVehicles, setSelectedVehicles] = useState({});
  const [token, setToken] = useState([]);
  const [showmessage, setShowmessage] = useState(false);
  const [planetres, setPlanetRes] = useState("");
  const [time, setTime] = useState(0);
  const [finalreq, setFinalreq] = useState({});

  useEffect(() => {
    axios
      .get("https://findfalcone.herokuapp.com/planets")
      .then((response) => setPlanets(response.data))
      .then((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("https://findfalcone.herokuapp.com/vehicles")
      .then((response) => setVehicles(response.data))
      .then((error) => console.log(error));
  }, []);

  const handleDestSelect = (e, destIndex) => {
    setSelectedPlanets({
      ...selectedPlanets,
      [destIndex]: e.target.value,
    });
  };

  const handleVehicleSelect = (e, destIndex) => {
    setSelectedVehicles({
      ...selectedVehicles,
      [destIndex]: e.target.value,
    });
  };

  useEffect(() => {
    let time = 0;
    for (let i = 1; i <= 4; i++) {
      const dest = planets.find((one) => one.name === selectedPlanets[i]);
      const veh = vehicles.find((onev) => onev.name === selectedVehicles[i]);
      if (dest && veh) {
        time += dest.distance / veh.speed;
      }
    }
    setTime(time);
  }, [selectedPlanets, selectedVehicles, planets, vehicles]);

  useEffect(() => {
    const asyncPostCallToken = async () => {
      try {
        const response = await fetch(
          "https://findfalcone.herokuapp.com/token",
          {
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: "",
          }
        );
        const data = await response.json();

        setTimeout(() => {
          setToken(data.token);
        });

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    asyncPostCallToken();
  }, []);

  const findfalcon = () => {
    setShowmessage(true);
    const newreq = {
      token: token,
      planet_names: Object.values(selectedPlanets),
      vehicle_names: Object.values(selectedVehicles),
    };
    setFinalreq(newreq);
    const asyncPostCallFind = async () => {
      try {
        const response = await fetch("https://findfalcone.herokuapp.com/find", {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(newreq),
        });
        const data = await response.json();
        console.log(data);
        if (data.planet_name) {
          setPlanetRes(data.planet_name);
        } else {
          setPlanetRes(data.status);
        }

        console.log(planetres);
      } catch (error) {
        console.log(error);
      }
    };

    asyncPostCallFind();
  };

  const planetDropdown = planets.map((a) => {
    if (Object.values(selectedPlanets).indexOf(a.name) !== -1) {
      return { ...a, disabled: true };
    }
    return a;
  });

  const vehiclesDropdown = vehicles.map((a) => {
    const counts = {};
    Object.values(selectedVehicles).forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });
    return { ...a, total_no: a.total_no - (counts[a.name] || 0) };
  });

  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Finding the Falcone!</h1>
      {showmessage ? (
        <div className="message">
          {planetres === "" ? (
            <div>
              <h3>Fetching Data</h3>
            </div>
          ) : (
            <div>
              {planetres !== false ? (
                <div className="success">
                  <h4>
                    Success! Congratulation on Finding Falcone. King Shah is
                    mighty pleased.
                  </h4>
                  <p>Time: {time}</p>
                  <p>Planet Found: {planetres}</p>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => window.location.reload()}
                  >
                    Start Again
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <h3>Select the planet you want to search in:</h3>
          <div className="destination">
            <div className="box">
              <h5>Destination 1:</h5>
              <div className="selectitem">
                <select
                  name="seldes1"
                  value={selectedPlanets[1]}
                  onChange={(e) => handleDestSelect(e, 1)}
                >
                  <option value="">--Select--</option>
                  {planetDropdown.map((d1, index) => {
                    return (
                      <option
                        key={index}
                        value={d1.name}
                        disabled={d1.disabled}
                      >
                        {d1.name + "" + d1.distance}
                      </option>
                    );
                  })}
                </select>
              </div>
              {selectedPlanets[1] && (
                <div className="optionitem">
                  {vehiclesDropdown.map((d1v, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <input
                            type="radio"
                            name="des1"
                            id={d1v.name}
                            onClick={(e) => handleVehicleSelect(e, 1)}
                            value={d1v.name}
                            disabled={d1v.total_no === 0}
                          />
                          <label htmlFor={d1v.name}>
                            {d1v.name + " " + d1v.speed}({d1v.total_no})
                          </label>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="box">
              <h5>Destination 2:</h5>
              <div className="selectitem">
                <select
                  name="seldes2"
                  value={selectedPlanets[2]}
                  onChange={(e) => handleDestSelect(e, 2)}
                >
                  <option value="">--Select--</option>
                  {planetDropdown.map((d2, index) => {
                    return (
                      <option
                        key={index}
                        value={d2.name}
                        disabled={d2.disabled}
                      >
                        {d2.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {selectedPlanets[2] && (
                <div className="optionitem">
                  {vehiclesDropdown.map((d2v, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <input
                            type="radio"
                            name="des2"
                            onClick={(e) => handleVehicleSelect(e, 2)}
                            id={d2v.name + 2}
                            disabled={d2v.total_no === 0}
                            value={d2v.name}
                          />
                          <label htmlFor={d2v.name + 2}>
                            {d2v.name}({d2v.total_no})
                          </label>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="box">
              <h5>Destination 3:</h5>
              <div className="selectitem">
                <select
                  name="seldes3"
                  value={selectedPlanets[3]}
                  onChange={(e) => handleDestSelect(e, 3)}
                >
                  <option value="">--Select--</option>
                  {planetDropdown.map((d3, index) => {
                    return (
                      <option
                        key={index}
                        value={d3.name}
                        disabled={d3.disabled}
                      >
                        {d3.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {selectedPlanets[3] && (
                <div className="optionitem">
                  {vehiclesDropdown.map((d3v, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <input
                            type="radio"
                            name="des3"
                            id={d3v.name + 3}
                            onClick={(e) => handleVehicleSelect(e, 3)}
                            disabled={d3v.total_no === 0}
                            value={d3v.name}
                          />
                          <label htmlFor={d3v.name + 3}>
                            {d3v.name}({d3v.total_no})
                          </label>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="box">
              <h5>Destination 4:</h5>
              <div className="selectitem">
                <select
                  name="seldes4"
                  value={selectedPlanets[4]}
                  onChange={(e) => handleDestSelect(e, 4)}
                >
                  <option value="">--Select--</option>
                  {planetDropdown.map((d4, index) => {
                    return (
                      <option
                        key={index}
                        value={d4.name}
                        disabled={d4.disabled}
                      >
                        {d4.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {selectedPlanets[4] && (
                <div className="optionitem">
                  {vehiclesDropdown.map((d4v, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <input
                            type="radio"
                            name="des4"
                            id={d4v.name + 4}
                            onClick={(e) => handleVehicleSelect(e, 4)}
                            disabled={d4v.total_no === 0}
                            value={d4v.name}
                          />
                          <label htmlFor={d4v.name + 4}>
                            {d4v.name}({d4v.total_no})
                          </label>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="box">
              <h2>Time taken: {time}</h2>
            </div>
          </div>
          <button className="btn" onClick={findfalcon}>
            Find Falcone
          </button>
        </div>
      )}
    </div>
  );
};
export default Falcone;
