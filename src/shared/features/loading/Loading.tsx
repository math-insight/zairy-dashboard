import "./assets/loading.css";

export default function Loading() {
    return (
        <div className="loading-screen">
            <div className="dot" style={ { animationDelay: '0s' } }></div>
            <div className="dot" style={ { animationDelay: '0.2s' } }></div>
            <div className="dot" style={ { animationDelay: '0.4s' } }></div>
        </div>
    );
}
