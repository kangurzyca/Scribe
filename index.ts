import { requiredData } from "./requiredData.js";
import {
    IProducts,
    IPhoneNumbers,
    IRequiredData,
    IPreFilteredData,
    IProduct,
    IFilteredData
} from "./interfaces.js";
import { inputString } from "./inputString.js";
import { saveToLocalStorage, readFromLocalStorage, checkForLocalStorage, checkForDataCompleteness, clearLocalStorage } from "./handleLocalStorage.js";

const preFilteredData: IPreFilteredData[] = [];
const filteredData: IFilteredData[] = []
let allProductsNames: string[] = [
    "MTA",
    "ISA",
    "BBLS",
    "BBILS",
    "CreditCard",
    "CBILS",
    "CLBILS",
    "RLS",
    "EFG",
    "unsecured loan",
    "investment",
    "investments",
];

//MTA|ISA|BBLS|BBILS|CreditCard|BILS|CLBILS|RLS|EFG|unsecured loan|investment|investments


//I will need a variable to use to pass through it an array of cases to save to and read from local storage.
//this array would allow to list cases so user can choose wich one is displayed
//I will need a clickable list of cases to select

//I will need a button for adding phone numbers
//I will need a button for adding products
//something like a long press to amend a detail here in scribe




//adding EVENT LISTENER HERE in a IF statement due to TypeScript reasons
if (typeof document !== "undefined") {
    const pasteTextHere = document.getElementById("pasteTextHere");
    pasteTextHere?.addEventListener("click", () => {

        //clearing out filteredData array
        filteredData.splice(0)

        searchTextForData(requiredData);

        preFilteredData.forEach((el) => {
            switch (el.type) {
                case "phoneNumber":
                    break;
                case "actone":
                    break;
                case "products":
                    break;
                default:
                    filteredData.push(el);
            }
        });
       
        filteredData.push(formatPhoneNumbers(preFilteredData));
        filteredData.push(formatProducts(preFilteredData));
        filteredData.push(formatActoneReferences(preFilteredData));
        console.log("filtered data: ", filteredData)
        displayDataElements(filteredData)
    });
}
if (typeof document !== "undefined") {
    const saveData = document.getElementById("saveData");
    saveData?.addEventListener("click", () => {
        saveToLocalStorage({
            name: "",
            type: "",
            data: ""
        })
    })
}
if (typeof document !== "undefined") {
    const readData = document.getElementById("readData");
    readData?.addEventListener("click", () => {
        readFromLocalStorage({
            name: "",
            type: "",
            data: ""
        })
    })
}
if (typeof document !== "undefined") {
    const readData = document.getElementById("removeData");
    readData?.addEventListener("click", () => {
        clearLocalStorage()
    })
}

checkForDataCompleteness()
checkForLocalStorage()



//below function returns a IPreFilteredData[] type. Prefiltered data is later used to perform second level filtering for specific information
function searchTextForData(inputData: IRequiredData[]): IPreFilteredData[] {

    preFilteredData.splice(0, preFilteredData.length);
    

    inputData.forEach((el) => {
        const temp: IPreFilteredData = {
            name: el.name,
            type: el.type,
        };

        let length: any;
        if (
            inputString.match(el.regexRule) !== null &&
            typeof inputString.match(el.regexRule) !== "undefined"
        ){
            length = inputString.match(el.regexRule)?.length;
        }
        if (length === 1) {
            temp.data = inputString.match(el.regexRule)?.at(0);
        }
        if (length > 1) {
            temp.data = inputString.match(el.regexRule)?.at(1);
        }
        if (inputString.match(el.regexRule) === null) {
            temp.data = "n/a";
        }

        preFilteredData.push(temp);
    });

    return preFilteredData;
}

//------------------------------------------------------------
function pasteText() {
    // Read text from the clipboard
    navigator.clipboard
        .readText()
        .then((text) => {
            // console.log(text)
            searchTextForData(requiredData);
        })
        .catch((err) => {
            console.error("Unable to read clipboard data", err);
        });
}

function formatPhoneNumbers(inputData: IPreFilteredData[]): IPhoneNumbers {
    let phoneNumbersRegex: any = new RegExp(
        "(?:\\+?\\d{2}\\s*|0\\s*)?\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d",
        "gi"
    );

    let phoneNumbers: IPhoneNumbers = {
        name: "",
        type: "",
        data: [""],
    };

    // find phone nubmers in
    inputData.forEach((el) => {
        for (const [key, value] of Object.entries(el)) {
            if (key === "type" && value === "phoneNumber") {
                phoneNumbers.data = el.data?.match(phoneNumbersRegex) || [];
                phoneNumbers.name = el.name;
                phoneNumbers.type = el.type;
            }
        }
    });
    //put numbers in an array with no spaces.
    phoneNumbers.data?.forEach((el, index) => {
        phoneNumbers.data[index] = el.replace(new RegExp("\\s", "g"), "");
    });
    //put numbers in an array with no prefixes - no zeros and +44s, others have to be kept.
    phoneNumbers.data?.forEach((el, index) => {
        if (el[0] === "0") {
            phoneNumbers.data[index] = el.slice(1, el.length);
        }
        if (
            el[0] === "+" &&
            el[1] === "4" &&
            el[2] === "4" &&
            el.length === 13
        ) {
            phoneNumbers.data[index] = el.slice(3, el.length);
        }
    });

    return phoneNumbers;
}

function formatProducts(inputData: IPreFilteredData[]): IProducts{
    let productsRegexLevelTwo: any = new RegExp(
        "\\b(?:MTA|ISA|BBLS|BBILS|CreditCard|BILS|CLBILS|RLS|EFG|unsecured loan|investment|investments)\\b.*?(?=\\b(?:MTA|ISA|BBLS|BBILS|CreditCard|BILS|CLBILS|RLS|EFG|unsecured loan|investment|investments)\\b|$)",
        "gi"
    );

    let productNumberRegex: any = new RegExp(
        "\\b\\d{8,8}\\b|\\b\\d{16,16}\\b",
        "g"
    );
    let productSortCodeRegex: any = new RegExp("\\b\\d{6,6}\\b", "g");

    let isProductOpen: boolean = false;
    let productName: string = "";

    //below is a function future expected output
    let products: IProducts = {
        name: "",
        type: "",
        data: [],
    };
    //below is a temp variable storing a string with products data
    let filteredOutProducts: string = "";
    let filteredOutProductsArray: any = [];

    inputData.forEach((el) => {
        for (const [key, value] of Object.entries(el)) {
            if (key === "type" && value === "products") {
                products.name = el.name;
                products.type = el.type;
                filteredOutProductsArray = el.data?.match(
                    new RegExp("(?:Expiry Date)(.+)", "i")
                );
            }
        }
    });
    //below is a filtered out string with products data, basically a misued array, I don't know why I did this
    filteredOutProducts = filteredOutProductsArray[1];
    filteredOutProductsArray = [];
    filteredOutProductsArray = filteredOutProducts.match(productsRegexLevelTwo);

    filteredOutProductsArray.forEach((el: any) => {
        const tempProduct: IProduct = {
            productName: "",
            productNumber: "",
            productSortCode: "",
            isProductOpen: "n/a",
        };

        allProductsNames.forEach((name) => {
            if (el.toLowerCase().includes(name.toLowerCase())) {
                tempProduct.productName = name;
            }
        });
        tempProduct.productNumber = el.match(productNumberRegex)[0];

        if (el.match(productSortCodeRegex) === null) {
            tempProduct.productSortCode = "n/a";
        } else {
            tempProduct.productSortCode = el.match(productSortCodeRegex)[0];
        }

        if (el.toLowerCase().includes("open")) {
            tempProduct.isProductOpen = "open";
        }
        if (el.toLowerCase().includes("closed")) {
            tempProduct.isProductOpen = "closed";
        }

        products.data.push(tempProduct);
    });

    return products;
}

function formatActoneReferences(inputData: IPreFilteredData[]): IPhoneNumbers {
    let actoneReferences: IPhoneNumbers = {
        name: "",
        type: "",
        data: [""],
    };

    inputData.forEach((el) => {
        for (const [key, value] of Object.entries(el)) {
            if (key === "type" && value === "actone") {
                actoneReferences.name = el.name
                actoneReferences.type = el.type
                el.data = el.data?.replace(" ", "");
                actoneReferences.data = el.data?.split(",") || [];
                actoneReferences.data.pop();
            }
        }
    });
  
    return actoneReferences;
}

function displayDataElements(dataObject: IFilteredData[]): void {
    // document.querySelectorAll(".results-container *").forEach((el) => {
    //     el.remove();
    // });
    // document.querySelectorAll(".results-container").forEach((el) => {
    //     el.remove();
    // });

    let resultsContainer: HTMLDivElement = document.createElement("div");
    resultsContainer.classList.add("results-container");
    if (document.querySelector(".container") !== null) {
        document.querySelector(".container")?.appendChild(resultsContainer);
    }

    dataObject.forEach((el) => {
        let temporaryElement: HTMLParagraphElement =
            document.createElement("p");
        temporaryElement.innerHTML =`
        <span>${el.name}: </span>
        <span>${el.data}</span>
        ` //backtick here <<<<


        // el.splice(1).forEach((element) => {
        //     let temporaryElementSpan = document.createElement("span");
        //     temporaryElement.appendChild(temporaryElementSpan);
        //     temporaryElementSpan.classList.add("copiable");

        //     if (element.toString().toLowerCase() !== "n/a") {
        //         temporaryElementSpan.classList.add("hoverable");
        //         temporaryElementSpan.addEventListener("click", (x) => {
        //             copyToClipboard(x);
        //         });
        //     }
        //     temporaryElementSpan.textContent = element;
        // });
        resultsContainer.appendChild(temporaryElement);
    });
}
function displayProducts (dataObject: IFilteredData[]): void {
    
}

// function copyToClipboard(e) {
//     const text = e.target.textContent;
//     const textarea = document.createElement("textarea");
//     textarea.value = text;
//     document.body.appendChild(textarea);
//     textarea.select();
//     document.execCommand("copy");
//     document.body.removeChild(textarea);
//     e.target.style.backgroundColor = "hsla(260, 40%, 80%, 1)";
//     e.target.style.color = "black";

//     setTimeout(() => {
//         e.target.style.backgroundColor = "";
//         e.target.style.color = "white";
//     }, 600);
// }
