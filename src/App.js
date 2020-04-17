import React from "react";
import { randomWorld, evolution, makeGlider, worldWidth } from "./Helper";
import "./styles.scss";

export default function App() {
  const [world, setWorld] = React.useState(randomWorld());
  const [isStart, setIsStart] = React.useState(false);

  const globalInterval = React.useRef(null);

  const startEvolution = () => {
    const interval = setInterval(() => {
      setWorld(evolution);
    }, 200);
    globalInterval.current = interval;
    setIsStart(true);
  };

  const stopEvolution = () => {
    clearInterval(globalInterval.current);
    setIsStart(false);
  };

  const generateGlider = () => {
    setWorld(makeGlider());
    startEvolution();
  };
  const generateRandomWorld = () => {
    setWorld(randomWorld());
    startEvolution();
  };

  return (
    <div className={"container d-flex flex-column flex-wrap align-content-center mt-3"}>
      <div className={"text-center text-white"}>
        <h2>Game of Life (RIP John Horton Conway)</h2>
      </div>
      <div className={"world"} style={{ width: `${worldWidth * 15}px` }}>
        {world.map((cell, i) => {
          return <div className={cell ? "live" : "dead"} key={i} />;
        })}
      </div>
      <div className="mt-2 text-center">
        <div class="btn-group" role="group" aria-label="Control buttons">
          <button className="btn btn-outline-info" onClick={startEvolution} disabled={isStart}>
            Start
        </button>
          <button className="btn btn-outline-info" onClick={stopEvolution} disabled={!isStart}>
            Stop
        </button>
          <button className="btn btn-outline-info" onClick={generateGlider} disabled={isStart}>
            Generate Glider
        </button>
          <button className="btn btn-outline-info" onClick={generateRandomWorld} disabled={isStart}>
            Generate Random World
        </button>
        </div>
      </div>
      <div className="card mt-2" style={{ width: `${worldWidth * 15}px` }}>
        <div className="card-body">
          <h5 className="card-title">Rules</h5>
          <div className="card-text">
            <ul>
              <li><span>Any live cell with two or three live neighbors survives.</span></li>
              <li><span>Any dead cell with three live neighbors becomes a live cell.</span></li>
              <li><span>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</span></li>

            </ul>
          </div>
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Conway's Game of Life (Wikipedia)</a>
        </div>
      </div>
    </div>
  );
}
