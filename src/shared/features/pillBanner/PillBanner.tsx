import "./assets/banner.css";
import { MAIN_WORDPRESS_APP } from "../../consts/urls.ts";

interface PillBannerProps {
    title: string;
    background: string;
}

export default function PillBanner( { title, background }: PillBannerProps ) {
    return (
        <div className="banner-wrapper" style={ { backgroundColor: background } }>
            <div className="pill">
                <h1>{ title }</h1>
                <a href={MAIN_WORDPRESS_APP.HOME_PAGE}>{ "Dowiedz się więcej" }</a>
            </div>
        </div>
    )
}
