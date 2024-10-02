export default function Button({ children, onclick, bcolor, text }) {
    return (
      <button
        className="modal-button"
        style={{
          backgroundColor: bcolor,
          color: text,
          border: bcolor === "red" ? "1px red solid" : "1px gray solid",
        }}
        onClick={onclick}
      >
        {children}
      </button>
    );
  }
  