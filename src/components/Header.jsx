import React from "react";

const Header = () => {
  function handleclick() {
    const img = document.querySelector("#mode-img");

    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      img.classList.add("bx-sun");
      img.classList.remove("bx-moon");
    } else {
      img.classList.add("bx-moon");
      img.classList.remove("bx-sun");
    }
  }

  return (
    <div className="header">
      <div className="left-sec">
        <p className="hh">
          <span>Finance.</span>app
        </p>
        <p className="hd">Dashboard</p>
      </div>
      <div className="right-sec">
        <button onClick={handleclick} id="mode">
          <i id="mode-img" class="bx bx-moon"></i>
        </button>
      </div>
    </div>
  );
};

export default Header;
