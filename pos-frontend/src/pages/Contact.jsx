import React from 'react';
import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
export const Contact = () => {
    return (
        <>
            <Nav />
            <MenuPanel />
            <div >
                <h1>Contact Us</h1>
                <p>
                    If you have any questions or need assistance, please feel free to contact us:
                </p>
                <div >

                    <p>PackageName: Restuarant-POS</p>
                    <p>Version: 0.9.1</p>
                    <p>Email: support@sharp.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                    <p>Address: 123 Main Street, Pune, India</p>
                </div>
            </div>
        </>
    );
};

export default Contact;
