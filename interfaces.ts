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
    data: string[]
}

interface IProducts{
     name: string;
    type: string;
    data: IProduct[]
}

interface IProduct{
    productName: string;
    productNumber: string;
    productSortCode: string;
    isProductOpen: string;
}

interface IFilteredData{
    name: string;
    type: string;
    data?: IProduct[] | string | string[]
}


export { IFilteredData, IProduct, IProducts, IPhoneNumbers, IRequiredData, IPreFilteredData }