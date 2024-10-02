import React, { useContext, useState } from "react";
import Appcontext from "./context/Appcontext";

const Table = (props) => {
  const { activeEdits, handleIsModalOpen, keyword, handlekeyword } =
    useContext(Appcontext);

  const [show, changeshow] = useState(false);

  function handlekeys(event) {
    if (event.target.value != "") {
      changeshow(true);
    } else {
      changeshow(false);
    }
    handlekeyword(event.target.value);
  }

  function CloseAll() {
    handleIsModalOpen(true);
  }

  const handlecancel = (event) => {
    event.preventDefault();
    handlekeyword("");
    changeshow(false);
  };

  let content = (
    <div className="active-edits-div">
      <p>
        <span>
          {activeEdits} {activeEdits === 1 ? "Row" : "Rows"}{" "}
        </span>{" "}
        in Edit Mode
      </p>
      <button className="close-all" onClick={CloseAll} value="Close All">
        Close All
      </button>
    </div>
  );

  return (
    <div className="table">
      <div className="table-detail">
        {/* //search bar  */}

        <div className="search-boss">
          <i class="bx bx-search"></i>
          <input
            value={keyword}
            onChange={handlekeys}
            className="searchBar"
            placeholder="Search"
          ></input>
          {show && (
            <button className="input-cancel-btn" onClick={handlecancel}>
              <i class="text-lg bx bx-x"></i>
            </button>
          )}
        </div>

        {/* // search-bar end */}
        {activeEdits >= 1 ? content : <span></span>}

        <p className="counttext">
          Total {props.total === 1 ? "Entry" : "Entries"}: {props.total}
        </p>
      </div>
      <div className="frame">
        <div className="xx fr name">
          <p>Name</p>
        </div>
        <div className="xx fr products">
          <p>Product</p>
        </div>
        <div className="xx fr amount">
          <p>Amount</p>
        </div>
        <div className="xx fr remarks">
          <p>Remarks</p>
        </div>
        <div className="xx fr date">
          <p>Date / Time</p>
        </div>
        <div className="xx fr lenden">
          <p>Transaction Type</p>
        </div>
        <div className="xx action">
          <p>Actions</p>
        </div>
      </div>
    </div>
  );
};

export default Table;
