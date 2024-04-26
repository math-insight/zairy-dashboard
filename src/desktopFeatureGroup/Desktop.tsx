import DesktopPollutionDataWrapper from "./pollutionDataFeatureGroup/DesktopPollutionDataWrapper.tsx";
import Navigation from "../shared/features/navigation/Navigation.tsx";
import Footer from "../shared/features/footer/Footer.tsx";
import PillBanner from "../shared/features/pillBanner/PillBanner.tsx";
import IViewProps from "../shared/types/props/IViewProps.ts";
import Loading from "../shared/features/loading/Loading.tsx";
import DataDownloadError from "../shared/features/error/DataDownloadError.tsx";

export default function Desktop( { isLoading, errorOccurred, heatmaps, heatmapsDatetimes, sensors }: IViewProps ) {
    return (
        <div className="desktop-wrapper">
            { errorOccurred ?
                <DataDownloadError/> :
                <>
                    <Navigation/>
                    { isLoading ?
                        <Loading/> :
                        <DesktopPollutionDataWrapper heatmaps={ heatmaps } heatmapsDatetimes={ heatmapsDatetimes }
                                                     sensors={ sensors }/>
                    }
                    <PillBanner title={ "Innowacyjny projekt dla miasta Żary" } background={ "white" }/>
                    <Footer/>
                </>
            }
        </div>
    )
}
