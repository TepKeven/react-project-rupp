import React, { useState } from "react";
import "./index.css"

function ManufacturerInputDropdownComponent({ listItems = [], inputName, displayID}) {

  const displayItem = listItems.find((item) => item.manufacturer_id == displayID)
  const [dropdownID,setDropdownID] = useState(displayID || 0)
  const [dropdownName,setDropdownName] = useState(displayItem == null ? "" : displayItem.name) // compare between id pass and id in list of items

  function displayChoiceDropdown(event) {
    var target = event.target.nextSibling;
    if (target.classList.contains("d-none")) {
      event.target.nextSibling.classList.remove("d-none");
      event.target.nextSibling.classList.add("d-block");
    } else {
      event.target.nextSibling.classList.remove("d-block");
      event.target.nextSibling.classList.add("d-none");
    }
  }

  function selectChoiceDropdown(event) {
    var target = event.target.parentNode; // li tag
    var targetInputName = target.parentNode.previousSibling; // input store item name
    setDropdownID(target.getAttribute("data-value"))
    targetInputName.value = event.target.textContent;
    target.parentNode.classList.remove("d-block");
    target.parentNode.classList.add("d-none");
  }

  return (
    <div class="col-md-10 col-12 position-relative">
      <input
        type="text"
        placeholder="Please Select"
        id={inputName}
        class="form-control"
        autocomplete="off"
        defaultValue={dropdownName}
        onMouseDown={displayChoiceDropdown}
      />
      <ul class="dropdown-menu d-none" style={{ top: 36 }}>
        {listItems.map((listItem) => (
          <li data-value={listItem.manufacturer_id} onClick={selectChoiceDropdown}>
            <a href="#">{listItem.name}</a>
          </li>
        ))}
      </ul>
      <input type="hidden" name={inputName} value={dropdownID} />
    </div>
  );
}

export default ManufacturerInputDropdownComponent;
