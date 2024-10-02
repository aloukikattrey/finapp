import { useContext } from "react";
import Appcontext from "./context/Appcontext";

export default function UndoBar() {
  const { chngRecoverTrigger, recoverTrigger } = useContext(Appcontext);

  function handleclick() {
    chngRecoverTrigger(true);
    // console.log(recoverTrigger);
  }

  return (
    <div className="undo-boss">
      <p style={{ color: "white" }}>Row Deleted</p>
      <button className="undo-btn" onClick={handleclick}>
        <i class="bx bx-undo"></i> Undo
      </button>
    </div>
  );
}
