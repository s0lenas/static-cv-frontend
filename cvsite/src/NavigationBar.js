import React from "react"
import "./NavigationBar.css"

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-center">
                <ul className="nav-links">
                    <li>
                        <a href="/about">ABOUT</a>
                    </li>
                    <li>
                        <a href="/experience">EXPERIENCE</a>
                    </li>
                    <li>
                        <a href="/skills">SKILLS</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavigationBar;