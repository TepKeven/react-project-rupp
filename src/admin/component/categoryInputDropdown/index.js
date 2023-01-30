import React, { useState } from "react";
import "./index.css"

function CategoryInputDropdownComponent({ listItems, inputName, displayID}) {

  const displayItem = listItems.find((item) => Object.values(item)[0] == displayID)
  const [dropdownID,setDropdownID] = useState(displayID || 0)
  const [dropdownName,setDropdownName] = useState(displayItem == null ? "" : displayItem.category_description_assoc[0].name) // compare between id pass and id in list of items

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
          <li data-value={Object.values(listItem)[0]} onClick={selectChoiceDropdown}>
            <a href="#">{listItem.category_description_assoc[0].name}</a>
          </li>
        ))}
      </ul>
      <input type="hidden" name={inputName} value={dropdownID} />
    </div>
  );
}

export default CategoryInputDropdownComponent;
