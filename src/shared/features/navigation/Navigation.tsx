import "./assets/navigation.css";
import ProjectIcon from "../../assets/zairyAirMonitoring.svg";
import HamburgerMenuIcon from "./assets/hamburger.png";
import { useState } from "react";
import { urls } from "../../consts/urls.ts";

export default function Navigation() {
    const [ isMenuOpen, setIsMenuOpen ] = useState( false ); // Step 2

    const toggleMenu = () => {
        setIsMenuOpen( !isMenuOpen );
    };

    return (
        <div className="navigation-wrapper">
            <div className="images-wrapper">
                <img className="project-icon" src={ ProjectIcon } alt="project icon"/>
                <img className="hamburger-menu" src={ HamburgerMenuIcon } alt="Rozwijalne menu" onClick={ toggleMenu }/>
            </div>
            <div className={ `navigation-buttons ${ isMenuOpen ? 'show' : '' }` }>
                { urls.map( ( { label, url }, index ) => (
                    <a key={ index } href={url} > { label } </a>
                ) ) }
            </div>
        </div>
    )
}
