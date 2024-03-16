import Navigation from "../shared/features/navigation/Navigation.tsx";
import Footer from "../shared/features/footer/Footer.tsx";
import PillBanner from "../shared/features/pillBanner/PillBanner.tsx";
import { PALE_BLUE } from "../shared/consts/colors.ts";
import ViewProps from "../shared/types/ViewProps.ts";

export default function Mobile( { isLoading, errorOccurred, heatmaps, heatmapsDatetimes, sensors }: ViewProps ) {
    return (
        <div className="mobile-wrapper">
            <Navigation/>
            <PillBanner title={ "Innowacyjny projekt dla miasta Żary" } background={ PALE_BLUE }/>
            <Footer/>
        </div>
    )
}
