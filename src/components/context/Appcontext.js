import { createContext, useEffect, useState } from "react";

const Appcontext = createContext();

function ContextProvider({ children }) {
  const [activeEdits, chngactiveedits] = useState(0);
  const [closeCall, chngClosecall] = useState(false); // for cancelling edits
  const [isSave, chngISSave] = useState(false);
  const [isModalOpen, chngisModalOpen] = useState(false);
  const [isUndoOpen, chngUndoOpen] = useState(false);
  const [keyword, chngkeyword] = useState("");
  const [showUndoBar, chngShowUndoBar] = useState(false);
  const [recoverTrigger, chngRecoverTrigger] = useState(false);

  function handlechange(value) {
    if (value === "edit") {
      chngactiveedits(activeEdits + 1);
    } else if (value === "close") {
      chngactiveedits(activeEdits - 1);
    } else if (value === "zero") {
      chngactiveedits(0);
    }
  }

  function handleClosecall(value) {
    chngClosecall(value);
  }

  function handleisSave(value) {
    chngISSave(value);
  }
  function handleIsModalOpen(value) {
    chngisModalOpen(value);
  }

  function handleUndoOpen(value) {
    chngUndoOpen(value);
  }

  function handlekeyword(value) {
    chngkeyword(value);
  }

  return (
    <Appcontext.Provider
      value={{
        activeEdits,
        handlechange,
        closeCall,
        handleClosecall,
        isSave,
        handleisSave,
        isModalOpen,
        handleIsModalOpen,
        isUndoOpen,
        handleUndoOpen,
        keyword,
        handlekeyword,
        showUndoBar,
        chngShowUndoBar,
        recoverTrigger,
        chngRecoverTrigger,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
}

export { ContextProvider };
export default Appcontext;
