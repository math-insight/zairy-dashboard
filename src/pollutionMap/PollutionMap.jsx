import {Component} from "react";

class PollutionMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null, // Przechowuj dane w stanie
            isLoading: false, // Flaga do śledzenia statusu ładowania
            error: null, // Przechowuj informacje o błędach
        };
    }

    async fetchData() {
        try {
            this.setState({isLoading: true});
            const response = await fetch('URL_API'); // Podmień 'URL_API' na właściwy adres URL API
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.setState({data, isLoading: false});
        } catch (error) {
            this.setState({error, isLoading: false});
        }
    }
}
