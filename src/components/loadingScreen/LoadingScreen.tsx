import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="dot" style={ { animationDelay: '0s' } }></div>
            <div className="dot" style={ { animationDelay: '0.2s' } }></div>
            <div className="dot" style={ { animationDelay: '0.4s' } }></div>
        </div>
    );
};

export default LoadingScreen;
