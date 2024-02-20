// import some interfaces
import { IFilteredData } from "./interfaces.js";

const myKey:string = "ExitCasesScribeAppData"

// i will need a function that fetches a selected ccase from local storage upon a cases list click
// a popup security measure to ask for saving first an unssaved case

export function saveToLocalStorage(arg: IFilteredData):void{

    //I need to save data saved from clipboard to a variable
    //this funciton reads local storage then
    //parses from string to get an array of cases them
    //checks if case exists then
    //if doesn't exist pushes current case
    //stringifies and saves to local storage

    const dataToSave: IFilteredData = {
        name: "Alakazam",
        type: "Pokemon",
        data: "Psychic",
    };

    localStorage.setItem(myKey, JSON.stringify(dataToSave))
    console.log("saved to local storage")

}

export function readFromLocalStorage(arg: IFilteredData):IFilteredData{

    const myValue = localStorage.getItem(myKey);

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

export function clearLocalStorage():void{
    localStorage.removeItem(myKey);
    console.log("data removed from local storage")
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