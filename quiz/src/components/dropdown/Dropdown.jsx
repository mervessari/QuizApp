import React from "react";
import "./Dropdown.css";

const Dropdown = ({ data, setDifficultyChange }) => {
  return (
    <div className="dropdown">
      <select
        style={{ backgroundColor: "#F6D400" }}
        onChange={(e) => setDifficultyChange(e.target.value)}
        name=""
        id=""
      >
        {data.map((dt, i) => (
          <option value={dt}>{dt}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
