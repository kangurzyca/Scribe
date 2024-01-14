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
interface IPhoneNumbers {
    name: string;
    type: string;
    data: string[];
}
interface IProducts {
    name: string;
    type: string;
    data: {
        productName: string;
        productNumber: string;
        productSortCode: string;
        isProductOpen: boolean;
    }[];
}
export { IProducts, IPhoneNumbers, IRequiredData, IPreFilteredData };
