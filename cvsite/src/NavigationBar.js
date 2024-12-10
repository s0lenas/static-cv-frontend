import React from "react"
import "./NavigationBar.css"

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-center">
                <ul className="nav-links">
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/experience">Experience</a>
                    </li>
                    <li>
                        <a href="/skills">Skills</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavigationBar;