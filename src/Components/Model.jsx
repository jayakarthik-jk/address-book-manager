import { useEffect, useState } from "react";

function Model({ options, addContact, updateContact, deleteContact }) {
  const [name, setName] = useState(options.selected?.name);
  const [phone, setPhone] = useState(options.selected?.phone);

  const handleAdd = () => {
    if (!name) {
      alert("Name is required");
      return;
    }
    if (!phone) {
      alert("Phone is required");
      return;
    }
    if (phone.length < 10) {
      alert("Phone number should be 10 digits");
      return;
    }
    if (!/^[0-9]+$/.test(phone)) {
      alert("Phone number should contain only digits");
      return;
    }

    addContact(name, phone);
    setName("");
    setPhone("");
  };

  const handleApplyChanges = () => {
    if (!name) {
      alert("Name is required");
      return;
    }
    if (phone.length < 10) {
      alert("Phone number should be 10 digits");
      return;
    }
    if (!/^[0-9]+$/.test(phone)) {
      alert("Phone number should contain only digits");
      return;
    }
    updateContact(name, phone);
  };

  useEffect(() => {
    setName(options.selected?.name);
    setPhone(options.selected?.phone);
  }, [options.selected?.name, options.selected?.phone]);

  return (
    <div
      className="modal"
      tabIndex="-1"
      id="model"
      style={{ display: options.display ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Contact</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column gap-4">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            {options.mode !== "add" && (
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={deleteContact}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            )}
            {options.mode === "add" ? (
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleAdd}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleApplyChanges}
              >
                Apply Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model;
