import Navigation from "../shared/features/navigation/Navigation.tsx";
import Footer from "../shared/features/footer/Footer.tsx";
import PillBanner from "../shared/features/pillBanner/PillBanner.tsx";
import { PALE_BLUE } from "../shared/consts/colors.ts";
import IViewProps from "../shared/types/IViewProps.ts";
import MobilePollutionDataWrapper from "./pollutionDataFeatureGroup/MobilePollutionDataWrapper.tsx";
import Loading from "../shared/features/loading/Loading.tsx";
import DataDownloadError from "../shared/features/error/DataDownloadError.tsx";

export default function Mobile( { isLoading, errorOccurred, heatmaps, heatmapsDatetimes, sensors }: IViewProps ) {
    return (
        <div className="mobile-wrapper">
            { errorOccurred ?
                <DataDownloadError/> :
                <>
                    <Navigation/>
                    { isLoading ?
                        <Loading/> :
                        <MobilePollutionDataWrapper heatmaps={ heatmaps } heatmapsDatetimes={ heatmapsDatetimes }
                                                    sensors={ sensors }/>
                    }
                    <PillBanner title={ "Innowacyjny projekt dla miasta Żary" } background={ PALE_BLUE }/>
                    <Footer/>
                </>
            }
        </div>
    )
}
