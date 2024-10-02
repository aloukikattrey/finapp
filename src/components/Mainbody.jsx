import React, { useContext, useEffect, useState } from "react";
import NewEntry from "./NewEntry";
import Table from "./Table";
import Tabledata from "./Tabledata";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Nodata from "./Nodata";
import Appcontext from "./context/Appcontext";

const Mainbody = () => {
  const [entries, addentries] = useState([]);
  const { keyword } = useContext(Appcontext);
  const [listRef] = useAutoAnimate();
  const [insearch, chngInsearch] = useState(false);
  const [iseZeroRes, chngIsZeroRes] = useState(false);

  function getentry(entry) {
    addentries((prevvalue) => {
      return [entry, ...prevvalue];
    });
  }

  //save in local storage

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("entries"));
    if (savedNotes) {
      addentries(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  //save in local storage ends

  function deleteNote(id) {
    addentries((prevNotes) => {
      return prevNotes.filter((entry, index) => {
        return id !== index;
      });
    });
  }

  function getBufferItem(index) {
    return entries[index];
  }

  const editItem = (
    new_id,
    new_name,
    new_product,
    new_amount,
    new_remarks,
    new_trans,
    new_color,
    new_back
  ) => {
    const editedarray = entries.map((entry, index) => {
      if (index == new_id) {
        return {
          ...entry,
          name: new_name,
          product: new_product,
          amount: new_amount,
          remarks: new_remarks,
          trans: new_trans,
          color: new_color,
          back: new_back,
        };
      }
      return entry;
    });
    addentries(editedarray);
  };

  function recoverItem(deletedItem) {
    console.log("recovered item in mainbody is ", deletedItem);
    const newItems = [...entries];
    newItems.splice(deletedItem.index, 0, deletedItem.item);
    addentries(newItems);
  }

  var cnt;
  let showrows = (
    <div className="animate" ref={listRef}>
      {entries.map((entryitem, index) => {
        return (
          <Tabledata
            id={index}
            key={index}
            name={entryitem.name}
            product={entryitem.product}
            amount={entryitem.amount}
            remarks={entryitem.remarks}
            date={entryitem.date}
            trans={entryitem.trans}
            color={entryitem.color}
            backg={entryitem.back}
            ondelete={deleteNote}
            editItem={editItem}
            getBufferItem={getBufferItem}
            recoverItem={recoverItem}
          />
        );
      })}
    </div>
  );

  var showsearched = (
    <div>
      {entries.map((entryitem, index) => {
        if (
          entryitem.name.toLowerCase().includes(keyword.toLowerCase()) ||
          entryitem.product.toLowerCase().includes(keyword.toLowerCase()) ||
          entryitem.amount.toLowerCase().includes(keyword.toLowerCase()) ||
          entryitem.remarks.toLowerCase().includes(keyword.toLowerCase())
        ) {
          return (
            <Tabledata
              id={index}
              key={index}
              name={entryitem.name}
              product={entryitem.product}
              amount={entryitem.amount}
              remarks={entryitem.remarks}
              date={entryitem.date}
              trans={entryitem.trans}
              color={entryitem.color}
              backg={entryitem.back}
              ondelete={deleteNote}
              editItem={editItem}
              getBufferItem={getBufferItem}
              recoverItem={recoverItem}
            />
          );
        }
      })}
    </div>
  );

  useEffect(() => {
    console.log(keyword);
    if (keyword != "") {
      console.log(showsearched);
      chngInsearch(true);
    } else {
      chngInsearch(false);
      console.log(showsearched);
    }
  }, [keyword]);

  function checkifnoelement(arr) {
    for (let obj of arr) {
      for (let key in obj) {
        if (obj[key] !== undefined) {
          return false;
        }
      }
    }
    return true;
  }

  useEffect(() => {
    if (keyword != "") {
      if (checkifnoelement(showsearched.props.children)) {
        chngIsZeroRes(true);
      } else {
        chngIsZeroRes(false);
      }
    }
  }, [showsearched]);

  var cnt = Object.keys(entries).length;

  return (
    <div className="mainbody" ref={listRef}>
      <NewEntry onadd={getentry} />
      {cnt >= 1 ? <Table total={cnt} /> : <Nodata />}
      {insearch ? (
        iseZeroRes ? (
          <p>No Search Results for "{keyword}"</p>
        ) : (
          showsearched
        )
      ) : (
        showrows
      )}
      {/* {insearch ? showsearched : showrows} */}
    </div>
  );
};
export default Mainbody;
