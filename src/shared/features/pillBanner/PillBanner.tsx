import "./assets/banner.css";

interface PillBannerProps {
    title: string;
    background: string;
}

export default function PillBanner( { title, background }: PillBannerProps ) {
    return (
        <div className="banner-wrapper" style={ { backgroundColor: background } }>
            <div className="pill">
                <h1>{ title }</h1>
                <a href="https://antoniolago.github.io/react-gauge-component/">{ "Dowiedz się więcej" }</a>
            </div>
        </div>
    )
}
