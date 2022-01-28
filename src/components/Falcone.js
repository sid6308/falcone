import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles.css";

const Falcone = () => {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
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
  // console.log(planets);
  // console.log(vehicles);
  const [planetdes2, setPlanetDes2] = useState(planets);
  const [planetdes3, setPlanetDes3] = useState(planets);
  const [planetdes4, setPlanetDes4] = useState(planets);
  const [vehicles2, setVehicles2] = useState(vehicles);
  const [vehicles3, setVehicles3] = useState(vehicles);
  const [vehicles4, setVehicles4] = useState(vehicles);
  const [showopt1, setShowopt1] = useState(false);
  const [showopt2, setShowopt2] = useState(false);
  const [showopt3, setShowopt3] = useState(false);
  const [showopt4, setShowopt4] = useState(false);
  const [token, setToken] = useState([]);
  const [showmessage, setShowmessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [planetres, setPlanetRes] = useState("");
  const [p1v, setP1v] = useState("");
  const [p2v, setP2v] = useState("");
  const [p3v, setP3v] = useState("");
  const [p4v, setP4v] = useState("");
  const [des1opt, setDes1Opt] = useState("");
  const [des2opt, setDes2Opt] = useState("");
  const [des3opt, setDes3Opt] = useState("");
  const [des4opt, setDes4Opt] = useState("");
  const [time, setTime] = useState(0);
  const [finalreq, setFinalreq] = useState({});

  const handledes1drop = (e) => {
    setDes1Opt(e.target[e.target.selectedIndex].value);
    setShowopt1(true);
  };
  const handledes2drop = (e) => {
    setDes2Opt(e.target[e.target.selectedIndex].value);
    setShowopt2(true);
  };
  const handledes3drop = (e) => {
    setDes3Opt(e.target[e.target.selectedIndex].value);
    setShowopt3(true);
  };
  const handledes4drop = (e) => {
    setDes4Opt(e.target[e.target.selectedIndex].value);
    setShowopt4(true);
  };
  const handlevec1opt = (e) => {
    setP1v(e.target.value);
  };
  const handlevec2opt = (e) => {
    setP2v(e.target.value);
  };
  const handlevec3opt = (e) => {
    setP3v(e.target.value);
  };
  const handlevec4opt = (e) => {
    setP4v(e.target.value);
  };

  useEffect(() => {
    const newdes1 = planets.filter((t) => t.name != des1opt);
    setPlanetDes2(newdes1);
    const newdes2 = planetdes2.filter((g) => g.name != des2opt);
    setPlanetDes3(newdes2);
    const newdes3 = planetdes3.filter((l) => l.name != des3opt);
    setPlanetDes4(newdes3);
  }, [des1opt, des2opt, des3opt, des4opt]);
  useEffect(() => {
    const p2vs = vehicles.map((a) => {
      if (a.name === p1v) {
        a.total_no = a.total_no - 1;
      }
      return a;
    });
    setVehicles2(p2vs);
  }, [p1v]);
  useEffect(() => {
    const p3vs = vehicles2.map((b) => {
      if (b.name === p2v) {
        b.total_no = b.total_no - 1;
      }
      return b;
    });
    setVehicles3(p3vs);
  }, [p2v]);
  useEffect(() => {
    const p4vs = vehicles3.map((c) => {
      if (c.name === p3v) {
        c.total_no = c.total_no - 1;
      }
      return c;
    });
    setVehicles4(p4vs);
  }, [p3v]);
  useEffect(() => {
    if (des1opt && p1v) {
      const firstoned = planets.find((one) => one.name === des1opt);
      const firstonev = vehicles.find((onev) => onev.name === p1v);

      setTime((prevState) => prevState + firstoned.distance / firstonev.speed);
    } else {
      console.log("No problem");
    }
  }, [des1opt, p1v]);
  useEffect(() => {
    if (des2opt && p2v) {
      const twooned = planets.find((two) => two.name === des2opt);
      const twoonev = vehicles.find((twov) => twov.name === p2v);

      setTime((prevState) => prevState + twooned.distance / twoonev.speed);
    } else {
      console.log("No problem");
    }
  }, [des2opt, p2v]);
  useEffect(() => {
    if (des3opt && p3v) {
      const threeoned = planets.find((three) => three.name === des3opt);
      const threeonev = vehicles.find((threev) => threev.name === p3v);

      setTime((prevState) => prevState + threeoned.distance / threeonev.speed);
    } else {
      console.log("No problem");
    }
  }, [des3opt, p3v]);
  useEffect(() => {
    if (des4opt && p4v) {
      const fouroned = planets.find((four) => four.name === des4opt);
      const fouronev = vehicles.find((fourv) => fourv.name === p4v);

      setTime((prevState) => prevState + fouroned.distance / fouronev.speed);
    } else {
      console.log("No problem");
    }
  }, [des4opt, p4v]);

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
  useEffect(() => {});
  const findfalcon = () => {
    setShowmessage(true);
    const newreq = {
      token: token,
      planet_names: [des1opt, des2opt, des3opt, des4opt],
      vehicle_names: [p1v, p2v, p3v, p4v],
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

  // const handleDestination = (e) => {
  //   console.log(e.target.value);
  // };
  // const handleVehicle = (e) => {
  //   console.log(e.target.value);
  // };
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
            <div>{planetres !== false ? <p>{planetres}</p> : null}</div>
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
                  value={des1opt}
                  onChange={handledes1drop}
                >
                  <option>--Select--</option>
                  {planets.map((d1, index) => {
                    return (
                      <option key={index} value={d1.name}>
                        {d1.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {showopt1 && (
                <div className="optionitem">
                  {vehicles.map((d1v, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <input
                            type="radio"
                            name="des1"
                            id={d1v.name}
                            onClick={handlevec1opt}
                            value={d1v.name}
                            disabled={d1v.total_no === 0}
                          />
                          <label htmlFor={d1v.name}>
                            {d1v.name}({d1v.total_no})
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
                  value={des2opt}
                  onChange={handledes2drop}
                >
                  <option>--Select--</option>
                  {planetdes2.map((d2, index) => {
                    return (
                      <option key={index} value={d2.name}>
                        {d2.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {showopt2 && (
                <div className="optionitem">
                  {vehicles2.map((d2v, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <input
                            type="radio"
                            name="des2"
                            onClick={handlevec2opt}
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
                  value={des3opt}
                  onChange={handledes3drop}
                >
                  <option>--Select--</option>
                  {planetdes3.map((d3, index) => {
                    return (
                      <option key={index} value={d3.name}>
                        {d3.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {showopt3 && (
                <div className="optionitem">
                  {vehicles3.map((d3v, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <input
                            type="radio"
                            name="des3"
                            id={d3v.name + 3}
                            onClick={handlevec3opt}
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
                  value={des4opt}
                  onChange={handledes4drop}
                >
                  <option>--Select--</option>
                  {planetdes4.map((d4, index) => {
                    return (
                      <option key={index} value={d4.name}>
                        {d4.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {showopt4 && (
                <div className="optionitem">
                  {vehicles4.map((d4v, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <input
                            type="radio"
                            name="des4"
                            id={d4v.name + 4}
                            onClick={handlevec4opt}
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
      <p>Des1: {des1opt}</p>
      <p>Des2: {des2opt}</p>
      <p>Des3: {des3opt}</p>
      <p>Des4: {des4opt}</p>
      <p>P1V: {p1v}</p>
      <p>P2V : {p2v}</p>
      <p>P3v: {p3v}</p>
      <p>P4v: {p4v}</p>
      <p>Token: {token} </p>
      <p>Res: {planetres}</p>
      <p>Success: {success}</p>
      <p>request: {JSON.stringify(finalreq)}</p>
      <button
        className="btn"
        type="button"
        onClick={() => window.location.reload()}
      >
        Play Again
      </button>
    </div>
  );
};
export default Falcone;
