interface IRequiredData {
    name: string;
    type: string;
    regexRule: any;
}
interface IPreFilteredData {
    name: string;
    type: string;
    data?: string;
}
export { IRequiredData, IPreFilteredData };
