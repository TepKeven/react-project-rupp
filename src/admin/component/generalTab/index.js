import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TextEditorComponent from "../../component/texteditor";
import "./index.css"

function GeneralTabComponent({tabName, langTabId, generalInfo}) {

  const getLangTab = useSelector((state) => state.getLangTab.lang);
  const getLangId  = useSelector((state) => state.getLangTab.id)

  return (
    <section className={((langTabId == getLangId - 1) ? "row" : "d-none") + (getLangTab == "km" ? " font-khmer" : "")}>
      <div className="mb-4">
        <label for={`${tabName}_name_${langTabId}`} className="form-label">
          {tabName.charAt(0).toUpperCase() + tabName.slice(1)} Name 
        </label>
        <input
          type="text"
          className="form-control"
          id={`${tabName}_name_${langTabId}`}
          name={`${tabName}_description[${langTabId}][name]`}
          defaultValue={generalInfo == undefined ? "" : generalInfo.name}
        />
        <input type="text" name={`${tabName}_description[${langTabId}][language_id]`} value={langTabId + 1} className="d-none" />
      </div>
      <div className="mb-4">
        <label for={`${tabName}_description_${langTabId}`} className="form-label">
          Description
        </label>
        <TextEditorComponent description={generalInfo == undefined ? "" : generalInfo.description} langTabId={langTabId} tabName={tabName} />
      </div>
      <div className="mb-4">
        <label for={`${tabName}_meta_title_${langTabId}`} className="form-label">
          Meta Title
        </label>
        <input
          type="text"
          className="form-control"
          id={`${tabName}_meta_title_${langTabId}`}
          name={`${tabName}_description[${langTabId}][meta_title]`}
          defaultValue={generalInfo == undefined ? "" : generalInfo.meta_title}
        />
      </div>
      <div className="mb-4">
        <label for={`${tabName}_meta_description_${langTabId}`} className="form-label">
          Meta Description
        </label>
        <input
          type="text"
          className="form-control"
          id={`${tabName}_meta_description_${langTabId}`}
          name={`${tabName}_description[${langTabId}][meta_description]`}
          defaultValue={generalInfo == undefined ? "" : generalInfo.meta_description}
        />
      </div>
      <div className="mb-4">
        <label for={`${tabName}_meta_keyword_${langTabId}`} className="form-label">
          Meta Keyword
        </label>
        <input
          type="text"
          className="form-control"
          id={`${tabName}_meta_keyword_${langTabId}`}
          name={`${tabName}_description[${langTabId}][meta_keyword]`}
          defaultValue={generalInfo == undefined ? "" : generalInfo.meta_keyword}
        />
      </div>
    </section>
  );
}

export default GeneralTabComponent;