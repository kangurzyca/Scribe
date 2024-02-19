// import some interfaces
import { IFilteredData } from "./interfaces.js";

export function saveToLocalStorage(arg: IFilteredData):void{

    const dataToSave: IFilteredData = {
        name: "Alakazam",
        type: "Pokemon",
        data: "Psychic",
    };

    localStorage.setItem("ExitCasesScribeAppData", JSON.stringify(dataToSave))
    console.log("saved to local storage")

}

export function readFromLocalStorage(arg: IFilteredData):IFilteredData{

    const myValue = localStorage.getItem("ExitCasesScribeAppData");

    // Check if the value exists
    if (myValue !== null) {
        console.log("Value found in localStorage:", myValue);
    } else {
        console.log("Value not found in localStorage");
    } 

    const dataFromLocalStorage: IFilteredData = {
        name: "",
        type: "",
        data: "",
    };

    console.log("reading data:\n....data read")

    return dataFromLocalStorage
}

export function checkForLocalStorage():void{
    // this function checks for local storage.
    // - if there is a local storage it enables read data button
    // -if there is nothing in local storage then button reads "Nothing svaed?"
    console.log("enabling read button")
}

export function checkForDataCompleteness():  void{
    //function checks whether ther is a minimum of requirements fulfilled to accept case data to be saved
    // until reuired minimum is not fulfilled save button is disabled
    // function enables the button when case is ready to be saved
    console.log("enabling save button")
}

//export some functions