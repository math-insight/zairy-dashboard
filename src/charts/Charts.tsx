import NavButtons from "./navButtons/NavButtons.tsx";

interface ChartsProps {
    toggleChartsView: () => void;
}

export default function Charts( { toggleChartsView }: ChartsProps ) {
    return (
        <>
            <NavButtons toggleChartsView={ toggleChartsView }/>
            <h1>ass</h1>
        </>
    )
}
