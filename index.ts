import { requiredData } from "./requiredData.js";
import {
    IProducts,
    IPhoneNumbers,
    IRequiredData,
    IPreFilteredData,
    IProduct,
} from "./interfaces.js";
import { inputString } from "./inputString.js";

const preFilteredData: IPreFilteredData[] = [];
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

if (typeof document !== "undefined") {
    const pasteTextHere = document.getElementById("pasteTextHere");
    pasteTextHere?.addEventListener("click", () => {
        searchTextForData(requiredData);
    });
}

//below function returns a string for now. It will return IPreFilteredData[] type nominally.
function searchTextForData(inputData: IRequiredData[]): string {
    console.log("searchTextForData()'s arg=inputData here: ", inputData);
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
        ) {
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
       
        preFilteredData.push(temp)
    });

    
    formatPhoneNumbers(preFilteredData)
    formatProducts(preFilteredData);

    return "placki";
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

// below function returns a number 3 for now, it will return an object with products nominally
function formatProducts(inputData: IPreFilteredData[]): number {
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
    
    filteredOutProductsArray = filteredOutProducts.match(
        productsRegexLevelTwo
    );
   
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

        console.log(tempProduct);
    });

    return 3;
}

function formatActoneReferences(inputData: IPreFilteredData[]): number {
    let actoneReferences: string[] = [];

    inputData.forEach((el) => {
        for (const [key, value] of Object.entries(el)) {
            if (key === "type" && value === "actone") {
                actoneReferences = el.data?.split(",") || [];
            }
        }
    });

    return 3;
}

function createDataElements(dataObject: IPreFilteredData[]) {
    document.querySelectorAll(".results-container *").forEach((el) => {
        el.remove();
    });
    document.querySelectorAll(".results-container").forEach((el) => {
        el.remove();
    });

    let resultsContainer: HTMLDivElement = document.createElement("div");
    resultsContainer.classList.add("results-container");
    if (document.querySelector(".container") === null) {
        document.querySelector(".container")?.appendChild(resultsContainer);
    }

    dataObject.forEach((el) => {
        let temporaryElement: HTMLParagraphElement =
            document.createElement("p");
        temporaryElement.textContent = el.data + ": ";

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
