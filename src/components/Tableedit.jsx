import React, { useContext, useState } from "react";
import { useRef, useEffect } from "react";
import Appcontext from "./context/Appcontext";

const Tableedit = ({
  id,
  name,
  product,
  amount,
  remarks,
  date,
  trans,
  color,
  back,
  editItem,
  hndtgl,
}) => {
  const { handlechange, closeCall, handleClosecall, isSave, handleisSave } =
    useContext(Appcontext);

  const [name1, changeName] = useState(name);
  const [product1, changeproduct] = useState(product);
  const [amount1, changeamount] = useState(amount);
  const [remarks1, changeremarks] = useState(remarks);
  const [trans1, changetrans] = useState(trans);
  const [color1, changecolor] = useState(color);
  const [back1, changeback] = useState(back);
  const credRef = useRef(null);
  const debtRef = useRef(null);

  //Animation code start
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    if (trans === "Credit") {
      credRef.current.classList.add("active");
    } else {
      debtRef.current.classList.add("active");
    }
  }, []);

  useEffect(() => {
    if (closeCall) {
      hndtgl();
      handlechange("zero");
      handleClosecall(false);
    }
  }, [closeCall]);

  useEffect(() => {
    if (isSave) {
      editItem(id, name1, product1, amount1, remarks1, trans1, color1, back1);
      hndtgl();
      handleisSave(false);
    }
  }, [isSave]);

  function handleName(event) {
    changeName(event.target.value);
  }
  function handleProduct(event) {
    changeproduct(event.target.value);
  }
  function handleAmount(event) {
    changeamount(event.target.value);
  }

  function handleRemarks(event) {
    changeremarks(event.target.value);
  }

  const handlesave = (event) => {
    event.preventDefault();
    editItem(id, name1, product1, amount1, remarks1, trans1, color1, back1);
    hndtgl();
    handlechange("close");
  };

  const handleclose = () => {
    hndtgl();
    handlechange("close");
  };

  function handlecred() {
    const cred = document.querySelector(".cred2");
    const debt = document.querySelector(".debt2");

    if (debt.classList.contains("active")) {
      debt.classList.remove("active");

      cred.classList.add("active");

      changetrans("Credit");
      changecolor("#48f748");
      changeback("#083308");
    }
  }

  function handledebt() {
    const cred = document.querySelector(".cred2");
    const debt = document.querySelector(".debt2");

    if (cred.classList.contains("active")) {
      cred.classList.remove("active");
      debt.classList.add("active");

      changetrans("Debit");
      changecolor("#ff3636");
      changeback("#3f0808");
    }
  }

  return (
    <div className={`animate2 ${rendered ? "rendered" : ""}`}>
      <div className="transform tabledata">
        <div className="framedata">
          <div className="edt xx fr name">
            <input
              autoFocus
              className="edt xx ip"
              value={name1}
              onChange={handleName}
              placeholder="Name"
            />
          </div>
          <div className="edt xx fr products">
            <input
              className="edt xx ip"
              value={product1}
              onChange={handleProduct}
              placeholder="Product"
            />
          </div>
          <div className="edt xx fr amount">
            <input
              className="edt xx ip"
              value={amount1}
              onChange={handleAmount}
              placeholder="Amount"
            />
          </div>
          <div className="edt xx fr remarks">
            <input
              className="edt xx ip"
              value={remarks1}
              onChange={handleRemarks}
              placeholder="Remarks"
            />
          </div>
          <div className="edt xx fr date">
            <p style={{ opacity: 0.5 }}>{date}</p>
          </div>
          <div className="edt xx fr lenden">
            <button
              ref={credRef}
              className="cred2 btn"
              onClick={handlecred}
              title="Credit"
            >
              C
            </button>
            <button
              ref={debtRef}
              className="debt2 btn"
              onClick={handledebt}
              title="Debit"
            >
              D
            </button>
            <div className="tranalert">
              <p>Please select Transaction type</p>
            </div>
          </div>
          <div className=" xx action">
            <div className="edit-div">
              <button className="sz save" onClick={handlesave} title="Save">
                <i class="bx bx-check"></i>
              </button>
            </div>
            <div className="delete-div">
              <button className="sz close" onClick={handleclose} title="Cancel">
                <i class="bx bx-x"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tableedit;
