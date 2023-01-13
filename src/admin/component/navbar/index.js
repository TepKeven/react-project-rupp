import React from "react";
import { useDispatch} from "react-redux";
import { toggleSidebarAction } from "../../../store/admin/action/sidebarAction";

function NavbarComponent(){

  const showSidebarDispatch = useDispatch()

    return (
        <header className="mb-3">
          <a href="#" className="burger-btn d-block" onClick={() => showSidebarDispatch(toggleSidebarAction())}>
            <i className="bi bi-justify fs-3"></i>
          </a>
        </header>
    )
}

export default NavbarComponent;