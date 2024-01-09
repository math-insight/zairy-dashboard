import ProjectIconSVG from "../../assets/zairyAirMonitoring.svg";
import HamburgerMenuIcon from "../../assets/hamburger.png";
import "./styles.css"
import { useState } from "react";

export function Navbar() {
    const [ isMenuOpen, setIsMenuOpen ] = useState( false );

    const toggleMenu = () => {
        setIsMenuOpen( !isMenuOpen );
    };

    return (
        <div className="navbar">
            <div className="navbar-top">
                <img className="project-icon" src={ ProjectIconSVG } alt="project icon"/>
                <img className="hamburger-icon" src={ HamburgerMenuIcon } alt="hamburger menu icon"
                     onClick={ toggleMenu }/>
            </div>
            <div className={ `navigation-items ${ isMenuOpen ? "show" : '' }` }>
                <a href="https://mathinsight.xyz/">Mapa</a>
                <a href="https://mathinsight.xyz/">O projekcie</a>
                <a href="https://mathinsight.xyz/">Technologia</a>
                <a href="https://mathinsight.xyz/">Edukacja</a>
                <a href="https://mathinsight.xyz/">Kontakt</a>
            </div>
        </div>
    )
}
