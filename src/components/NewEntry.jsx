import React, { useState, useEffect, useContext } from "react";
import Appcontext from "./context/Appcontext";

const NewEntry = (props) => {
  const { activeEdits, handlechange, handleClosecall, closeCall } =
    useContext(Appcontext);

  const [entry, createentry] = useState({
    name: "",
    product: "",
    amount: "",
    remarks: "",
    date: "",
    trans: "",
    color: "",
    back: "",
  });

  function handleTextchange(event) {
    const { name, value } = event.target;

    createentry((prevvalue) => {
      return {
        ...prevvalue,
        [name]: value,
      };
    });
  }

  function handlesave(event) {
    const cred = document.querySelector(".cred");
    const debt = document.querySelector(".debt");

    if (
      debt.classList.contains("active") == false &&
      cred.classList.contains("active") == false
    ) {
      const wng = document.querySelector(".tranalert");
      wng.style.display = "flex";
      setTimeout(() => {
        wng.style.display = "none";
      }, 3000);
      return;
    }

    if (activeEdits != 0) {
      handleClosecall(true);
      handlechange("zero");
    }

    const date = new Date();
    entry.date =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "   -   " +
      date.getHours() +
      ":" +
      date.getMinutes();

    props.onadd(entry);
    event.preventDefault();

    //reset everything
    createentry({
      name: "",
      product: "",
      amount: "",
      remarks: "",
      date: "",
      color: "",
      back: "",
    });
    debt.classList.remove("active");
    cred.classList.remove("active");
  }

  const cred = document.querySelector(".cred");
  const debt = document.querySelector(".debt");

  function handlecred() {
    if (debt.classList.contains("active")) {
      debt.classList.remove("active");

      cred.classList.add("active");

      entry.trans = "Credit";
      entry.color = "#48f748";
      entry.back = "#083308";
    } else if (cred.classList.contains("active")) {
      cred.classList.remove("active");
    } else {
      cred.classList.add("active");

      entry.trans = "Credit";
      entry.color = "#48f748";
      entry.back = "#083308";
    }
  }

  function handledebt() {
    const cred = document.querySelector(".cred");
    const debt = document.querySelector(".debt");
    if (cred.classList.contains("active")) {
      cred.classList.remove("active");

      debt.classList.add("active");

      entry.trans = "Debit";
      entry.color = "#ff3636";
      entry.back = "#3f0808";
    } else if (debt.classList.contains("active")) {
      debt.classList.remove("active");
    } else {
      debt.classList.add("active");
      entry.trans = "Debit";
      entry.color = "#ff3636";
      entry.back = "#3f0808";
    }
  }

  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  return (
    <div>
      <div className="new-entry">
        <p className="additem">Add Entry</p>

        <input
          id="nm"
          type="text"
          placeholder="Name"
          name="name"
          className="ns ip"
          onChange={handleTextchange}
          value={entry.name}
        ></input>
        <input
          id="prd"
          type="text"
          placeholder="Product"
          name="product"
          className="ip"
          onChange={handleTextchange}
          value={entry.product}
        ></input>
        <input
          id="amnt"
          type="text"
          placeholder="Amount"
          name="amount"
          className="ip"
          onChange={handleTextchange}
          value={entry.amount}
        ></input>
        <input
          id="rmrk"
          type="text"
          placeholder="Remarks"
          name="remarks"
          className="nx ip"
          onChange={handleTextchange}
          value={entry.remarks}
        ></input>

        <div className="cred-debt">
          <button className="cred btn" onClick={handlecred} title="Credit">
            C
          </button>
          <button className="debt btn" onClick={handledebt} title="Debit">
            D
          </button>
          <div className={`animate3 ${rendered ? "rendered" : ""}`}>
            <div className="tranalert">
              <p>Please select Transaction type </p>
            </div>
          </div>
        </div>
        <button className="addbtn" onClick={handlesave} title="Add Entry">
          Add
        </button>
      </div>
    </div>
  );
};

export default NewEntry;
