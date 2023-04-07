import { useState, useRef } from "react";

import Header from "./Header";
import Table from "./Table";
import Model from "./Model";
import Pagination from "./Pagination";

function Home() {
  const [contacts, setContacts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [sortOrder, setSortOrder] = useState({
    property: "name",
    direction: "asc",
  });

  const [modelOptions, setModelOptions] = useState({
    mode: "add",
    display: false,
    selected: {
      id: 0,
      name: "",
      phone: "",
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const idRef = useRef(0);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const sortContacts = (contacts) => {
    // This function sorts an array of contacts by the value of a specified property
    // The sortOrder object determines the property and direction to sort by
    const sortedContacts = contacts.sort((contact1, contact2) =>
      contact1[sortOrder.property].localeCompare(contact2[sortOrder.property])
    );
    return sortOrder.direction === "desc"
      ? sortedContacts.reverse()
      : sortedContacts;
  };

  // This function returns the filtered and sorted contacts based on the search query.
  const getFilteredContacts = () => {
    const pattern = new RegExp(searchQuery, "i");
    const filtered = contacts.filter((contact) => {
      return pattern.test(contact.name) || pattern.test(contact.phone);
    });

    // get the paginated contacts based on the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginated = filtered.slice(startIndex, endIndex);

    return sortContacts(paginated);
  };

  const addContact = (name, phone) => {
    const nameExist = contacts.find((contact) => contact.name === name);
    const phoneExist = contacts.find((contact) => contact.phone === phone);
    if (nameExist || phoneExist) {
      return alert("Contact name/number already exist");
    }
    setContacts((oldContacts) => [
      ...oldContacts,
      { id: idRef.current++, name, phone },
    ]);
  };

  //finds the index of the contact with the same id as the selected contact
  //then updates the contactsCopy with the new name and phone number

  const updateContact = (name, phone) => {
    const nameExist = contacts.find((contact) => contact.name === name);
    const phoneExist = contacts.find((contact) => contact.phone === phone);
    if (nameExist || phoneExist) {
      return alert("Contact name/number already exist");
    }
    const contactsCopy = [...contacts];
    const index = contactsCopy.findIndex(
      (contact) => contact.id === modelOptions.selected.id
    );
    contactsCopy[index].name = name;
    contactsCopy[index].phone = phone;
    setContacts(contactsCopy);
  };

  const deleteContact = () => {
    // Filter out the contact that was selected from the array of contacts
    setContacts(contacts.filter((c) => c.id !== modelOptions.selected.id));
  };

  return (
    <div className="container d-flex flex-column gap-2 p-4">
      <Model
        addContact={addContact}
        options={modelOptions}
        updateContact={updateContact}
        deleteContact={deleteContact}
      />
      <Header
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        setModelOptions={setModelOptions}
        contacts={contacts}
      />
      <Table
        contacts={getFilteredContacts()}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        setModelOptions={setModelOptions}
      />
      <Pagination
        itemsCount={contacts.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Home;
