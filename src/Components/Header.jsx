function Header({
  searchQuery,
  onSearchQueryChange,
  setModelOptions,
  contacts,
}) {
  const handleAdd = () => {
    setModelOptions({
      mode: "add",
      display: true,
      selected: {
        name: "",
        phone: "",
      },
    });
  };

  return (
    <div className="d-flex justify-content-between gap-3">
      <h3 className="d-flex align-items-start">
        Contacts
        <span className="badge rounded-pill bg-primary fs-6 d-flex justify-content-center align-items-center">
          {contacts.length}
          <span className="visually-hidden">unread messages</span>
        </span>
      </h3>
      <input
        type="text"
        className="form-control rounded-3"
        placeholder="search contacts"
        value={searchQuery}
        onChange={onSearchQueryChange}
      />
      <button
        className="btn btn-sm btn-primary px-3 rounded-3"
        data-bs-toggle="modal"
        data-bs-target="#model"
        onClick={handleAdd}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

export default Header;
