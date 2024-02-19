// import some interfaces
import { IFilteredData } from "./interfaces.js";

export function saveToLocalStorage(arg: IFilteredData):IFilteredData{

    const dataToSave: IFilteredData = {
        name: "",
        type: "",
        data: "",
    };

    return dataToSave
}

//export some functions