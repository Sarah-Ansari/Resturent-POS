import React, { useState } from "react";
import "../styles/MenuPanel.scss";
import { useNavigate } from "react-router-dom";


export const MenuPanel = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const navigate = useNavigate();
  return (
    <div className={`menu-panel ${isPanelOpen ? "open" : ""}`}>
      <div className="menu-panel__toggle" onClick={togglePanel}>
      {!isPanelOpen?<img
          height={70}
          width={70}
          src="assets/My_project.png"
          alt="Logo"
          className="menu_logo"
          
        />:<img
        height={120}
        width={120}
        src="assets/My_project.png"
        alt="Logo"
        className="menu_logo"
        
      />}
      </div>
      <div className="space"><span></span></div>
      <div className="menu-panel__content">
        <ul className={isPanelOpen ? "open_menu_ul" : "menu-panel__content_ul"}>
          <li data-name="Home" onClick={() => navigate("/Home")} className="menu-item__open-li">
            <i className="fas fa-home"></i>{isPanelOpen && <p className="menu-panel__content_p">Home</p>} {/* Home icon */}
          </li>
          <li data-name="Orders" onClick={() => navigate("/Orders")} className="menu-item__open-li">
            <i className="fa fa-book" aria-hidden="true"></i>{isPanelOpen && <p className="menu-panel__content_p">Orders</p>}
          </li>
          <li data-name="Reservation" onClick={() => navigate("/Reservations")} className="menu-item__open-li">
            <i className="fa fa-bookmark" aria-hidden="true"></i>{isPanelOpen && <p className="menu-panel__content_p">Reservations</p>}
          </li>
          <li data-name="Inventory" onClick={() => navigate("/Inventory")} className="menu-item__open-li">
            <i className="fa fa-server" aria-hidden="true"></i>{isPanelOpen && <p className="menu-panel__content_p">Inventries</p>}
          </li>
          <li data-name="Menu" onClick={() => navigate("/Menu")} className="menu-item__open-li">
            <i className="fas fa-cutlery"></i>{isPanelOpen && <p className="menu-panel__content_p">Menu</p>}
          </li>
          <li data-name="Customers" onClick={() => navigate("/Customers")} className="menu-item__open-li">
            <i className="fas fa-address-book"></i>{isPanelOpen && <p className="menu-panel__content_p">About</p>}
          </li>
          <li data-name="About" onClick={() => navigate("/Staff")} className="menu-item__open-li">
            <i className="fas fa-info-circle"></i>{isPanelOpen && <p className="menu-panel__content_p">About</p>}
          </li>
          {/* <li data-name="Services" onClick={() => navigate("/Services")} className="menu-item__open-li">
            <i className="fas fa-cogs"></i>{isPanelOpen && <p className="menu-panel__content_p">Services</p>}
          </li> */}
          <li data-name="Contact" onClick={() => navigate("/Contact")} className="menu-item__open-li">
            <i className="fas fa-envelope"></i>{isPanelOpen && <p className="menu-panel__content_p">Contact</p>}
          </li>
        </ul>
      </div>
    </div>
  );
};
