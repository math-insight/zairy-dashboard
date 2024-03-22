export default interface ISensorsVisibility {
    meteo: boolean;
    regular: boolean;
    reference: boolean;

    [key: string]: boolean;
}
