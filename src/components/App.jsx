import React, { useContext } from "react";
import Header from "./Header";
import Mainbody from "./Mainbody";
import ModalSave from "./ModalSave";
import Appcontext from "./context/Appcontext";
import UndoBar from "./UndoBar";

const App = () => {
  const { isModalOpen, showUndoBar } = useContext(Appcontext);
  return (
    <div>
      <Header />
      <Mainbody />
      {isModalOpen && <ModalSave />}
      {showUndoBar && <UndoBar />}
    </div>
  );
};

export default App;
