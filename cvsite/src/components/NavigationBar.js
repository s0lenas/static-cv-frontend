import React from "react"
import "../NavigationBar.css"
import { Link } from "react-router-dom"

const NavigationBar = ({ visitorCount }) => {
    return (
        <nav className="navbar">
            <div className="navbar-center">
                <ul className="nav-links">
                    <li>
                        <Link to="">HOME</Link>
                    </li>
                    <li>
                        <Link to="about">ABOUT</Link>
                    </li>
                    <li>
                        <Link to="experience">EXPERIENCE</Link>
                    </li>
                    <li>
                        <Link to="skills">SKILLS</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                <p>VISITOR COUNT: {visitorCount}</p>
            </div>
        </nav>
    );
};

export default NavigationBar;