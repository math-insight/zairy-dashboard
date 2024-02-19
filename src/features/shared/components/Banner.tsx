import "../assets/banner.css";

interface BannerProps {
    title: string;
}

export default function Banner( { title }: BannerProps ) {
    return (
        <div className="banner-wrapper">
            <div className="pill">
                <h1>{ title }</h1>
                <a href="https://antoniolago.github.io/react-gauge-component/">{ "Dowiedz się więcej" }</a>
            </div>
        </div>
    )
}
