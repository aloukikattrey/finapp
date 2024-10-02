import React, { useState, useEffect, useContext } from "react";
import Tableedit from "./Tableedit";
import Appcontext from "./context/Appcontext";

const Tabledata = (props) => {
  const [showundo, chngshowundo] = useState(false);
  const [toogle, changeToogle] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);

  const {
    activeEdits,
    handlechange,
    chngShowUndoBar,
    recoverTrigger,
    chngRecoverTrigger,
  } = useContext(Appcontext);

  function handletoogle() {
    changeToogle(false);
  }

  function handledelete() {
    const itemToDelete = props.getBufferItem(props.id);
    console.log(" item to delete is ", itemToDelete);

    setDeletedItem({ item: itemToDelete, index: props.id });
    props.ondelete(props.id);
    chngShowUndoBar(true);
    setTimeout(() => {
      chngShowUndoBar(false);
      setDeletedItem(null);
    }, 5000);
  }

  const handleedit = () => {
    changeToogle(true);
    handlechange("edit");
  };

  useEffect(() => {
    if (recoverTrigger) {
      chngRecoverTrigger(false);
      if (deletedItem) {
        props.recoverItem(deletedItem);
        chngShowUndoBar(false);
        setDeletedItem(null);
      }
    }
  }, [recoverTrigger]);

  let content = (
    <div>
      <div className="tabledata">
        <div
          className={props.id % 2 != 0 ? "framedata gray-back" : "framedata"}
        >
          <div className="xx fr name">
            <p>{props.name}</p>
          </div>
          <div className="xx fr products">
            <p>{props.product}</p>
          </div>
          <div className="xx fr amount">
            <p>{props.amount}</p>
          </div>
          <div className="xx fr remarks">
            <p>{props.remarks}</p>
          </div>
          <div className="xx fr date">
            <p>{props.date}</p>
          </div>
          <div
            className="xx fr lenden"
            style={{ backgroundColor: props.backg }}
          >
            <p className="tratxt" style={{ color: props.color }}>
              {props.trans}
            </p>
          </div>
          <div className="xx action">
            <div className="edit-div">
              <button onClick={handleedit} className="sz edit" title="Edit">
                <i class="bx bx-pencil"></i>
              </button>
            </div>
            <div className="delete-div">
              <button
                disabled={activeEdits >= 1 ? true : false}
                className="sz delete"
                onClick={handledelete}
                title="Delete"
                style={{
                  opacity: activeEdits >= 1 ? "0.5" : "1",
                  cursor: activeEdits >= 1 ? "not-allowed" : "pointer",
                }}
              >
                <i class="bx bx-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (toogle) {
    content = (
      <Tableedit
        id={props.id}
        name={props.name}
        product={props.product}
        amount={props.amount}
        remarks={props.remarks}
        date={props.date}
        trans={props.trans}
        color={props.color}
        back={props.backg}
        editItem={props.editItem}
        hndtgl={handletoogle}
      />
    );
  }

  return <div>{content}</div>;
};

export default Tabledata;
