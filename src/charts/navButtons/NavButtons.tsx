import { Button } from "antd";
import "./NavButtons.css"

interface NavButtonsProps {
    toggleChartsView: () => void;
}

export default function NavButtons( { toggleChartsView }: NavButtonsProps ) {
    return (
        <>
            <Button key='go-to-map' className={ 'nav-button' }
                    onClick={ toggleChartsView }>{ '< Wróć do mapy' }</Button>
        </>
    )
}
