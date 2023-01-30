import React, { useState } from "react";
import "./index.css"

function CategoryMultiInputDropdownComponent({ listItems = [], inputName, selectedIds = []}) {


  const [displayIDs, setDisplayIDs]  = useState(selectedIds)

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
    if(displayIDs.indexOf(parseInt(target.getAttribute("data-value"))) == -1){
      setDisplayIDs([...displayIDs, parseInt(target.getAttribute("data-value"))])
    }
    target.parentNode.classList.remove("d-block");
    target.parentNode.classList.add("d-none");
  }

  function removeCategory(event){
    var categoryItem = event.target.parentNode
    const categoryID = categoryItem.getAttribute("id").split(inputName)[1]
    setDisplayIDs(displayIDs.filter(displayID => displayID != parseInt(categoryID)))
  }

  return (
    <div class="col-md-10 col-12 position-relative">
      <input
        type="text"
        placeholder="Please Select"
        id={inputName}
        class="form-control"
        autocomplete="off"
        defaultValue=""
        onMouseDown={displayChoiceDropdown}
      />
      <ul class="dropdown-menu d-none" style={{ top: 36 }}>
        {listItems.map((listItem) => (
          <li data-value={listItem.category_id} onClick={selectChoiceDropdown}>
            <a href="#">{listItem.category_description_assoc[0].name}</a>
          </li>
        ))}
      </ul>
      <div className="chosen-items" id="chosen-items">
        <div id="product-category" class="well well-sm" style={{height: 150, overflow: "auto"}}>   
            {listItems.length != 0 && displayIDs && displayIDs.map((displayID) => {
              if(listItems.find(item => item.category_id == displayID) != null){
                return (
                  <div id={inputName + displayID}>
                    <i class="fa fa-minus-circle" onClick={removeCategory}></i>
                    <span className="ms-3">{listItems.find(item => item.category_id == displayID).category_description_assoc[0].name}</span>
                    <input type="hidden" name={`${inputName}[]`} value={displayID} />
                  </div>  
                )
              }
            }  
            )}
        </div>
      </div>
    </div>
  );
}

export default CategoryMultiInputDropdownComponent;
