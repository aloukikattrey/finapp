import { useContext } from "react";
import Appcontext from "./context/Appcontext";
import Button from "./elements/Button";

export default function ModalSave() {
  const {
    activeEdits,
    handleisSave,
    handleIsModalOpen,
    handleClosecall,
    handlechange,
  } = useContext(Appcontext);

  function handlesave() {
    handleisSave(true);
    handleIsModalOpen(false);
    handlechange("zero");
  }
  function handleclose() {
    handleIsModalOpen(false);
  }
  function handlecancelEdits() {
    handleClosecall(true);
    handlechange("zero");
    handleIsModalOpen(false);
  }

  return (
    <div className="modal-boss">
      <div className="model-content">
        <div className="modal-title-head">
          <p style={{ color: "white" }}>
            {activeEdits} {activeEdits == 1 ? "row is" : "Rows are"} currently
            in Edit Mode
          </p>
        </div>
        <div>
          <Button bcolor="transparent" text="white" onclick={handleclose}>
            Close
          </Button>
          <Button bcolor="red" text="white" onclick={handlecancelEdits}>
            Close All Edits
          </Button>
          <Button bcolor="white" text="black" onclick={handlesave}>
            Save All Edits
          </Button>
        </div>
      </div>
    </div>
  );
}
