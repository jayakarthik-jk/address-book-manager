function Table({ contacts, sortOrder, onSortOrderChange, setModelOptions }) {
  const handleSort = (option) => {
    const sortDirection =
      sortOrder.property === option && sortOrder.direction === "asc"
        ? "desc"
        : "asc";
    onSortOrderChange({ property: option, direction: sortDirection });
  };

  const handleContactClick = (contact) => {
    setModelOptions({
      mode: "edit",
      display: true,
      selected: contact,
    });
  };

  if (contacts.length <= 0) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        No contacts found
      </div>
    );
  }

  return (
    <table className="table table-hover border rounded">
      <thead className="bg-primary text-light">
        <tr>
          <th scope="col">#</th>
          <th
            scope="col"
            className="touchable"
            onClick={() => handleSort("name")}
          >
            Name&nbsp;
            {sortOrder.property === "name" && sortOrder.direction === "asc" && (
              <i className="fa-solid fa-sort-up"></i>
            )}
            {sortOrder.property === "name" &&
              sortOrder.direction === "desc" && (
                <i className="fa-solid fa-sort-down"></i>
              )}
          </th>
          <th
            scope="col"
            className="touchable"
            onClick={() => handleSort("phone")}
          >
            Mobile number&nbsp;
            {sortOrder.property === "phone" &&
              sortOrder.direction === "asc" && (
                <i className="fa-solid fa-sort-up"></i>
              )}
            {sortOrder.property === "phone" &&
              sortOrder.direction === "desc" && (
                <i className="fa-solid fa-sort-down"></i>
              )}
          </th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, index) => (
          <tr
            key={contact.id}
            className="touchable"
            onClick={() => handleContactClick(contact)}
            data-bs-toggle="modal"
            data-bs-target="#model"
          >
            <th scope="row">{index + 1}</th>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
