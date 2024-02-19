const myKey = "ExitCasesScribeAppData";
export function saveToLocalStorage(arg) {
    const dataToSave = {
        name: "Alakazam",
        type: "Pokemon",
        data: "Psychic",
    };
    localStorage.setItem(myKey, JSON.stringify(dataToSave));
    console.log("saved to local storage");
}
export function readFromLocalStorage(arg) {
    const myValue = localStorage.getItem(myKey);
    // Check if the value exists
    if (myValue !== null) {
        console.log("Value found in localStorage:", myValue);
    }
    else {
        console.log("Value not found in localStorage");
    }
    const dataFromLocalStorage = {
        name: "",
        type: "",
        data: "",
    };
    console.log("reading data:\n....data read");
    return dataFromLocalStorage;
}
export function clearLocalStorage() {
    localStorage.removeItem(myKey);
    console.log("data removed from local storage");
}
export function checkForLocalStorage() {
    // this function checks for local storage.
    // - if there is a local storage it enables read data button
    // -if there is nothing in local storage then button reads "Nothing svaed?"
    console.log("enabling read button");
}
export function checkForDataCompleteness() {
    //function checks whether ther is a minimum of requirements fulfilled to accept case data to be saved
    // until reuired minimum is not fulfilled save button is disabled
    // function enables the button when case is ready to be saved
    console.log("enabling save button");
}
//export some functions
