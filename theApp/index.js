import { requiredData } from "./requiredData.js";
import { inputString } from "./inputString.js";
const preFilteredData = [];
let productsNames = ["MTA", "ISA", "BBLS", "BBILS", "CreditCard", "CBILS", "CLBILS", "RLS", "EFG", "unsecured loan", "investment", "investments"];
if (typeof document !== "undefined") {
    const pasteTextHere = document.getElementById("pasteTextHere");
    pasteTextHere === null || pasteTextHere === void 0 ? void 0 : pasteTextHere.addEventListener("click", () => {
        searchTextForData(requiredData);
    });
}
//below function returns a string for now. It will return IPreFilteredData[] type nominally.
function searchTextForData(inputData) {
    preFilteredData.splice(0, preFilteredData.length);
    inputData.forEach(el => {
        var _a, _b, _c;
        const temp = {
            name: el.name,
            type: el.type
        };
        let length;
        if (inputString.match(el.regexRule) !== null && typeof inputString.match(el.regexRule) !== "undefined") {
            length = (_a = inputString.match(el.regexRule)) === null || _a === void 0 ? void 0 : _a.length;
        }
        if (length === 1) {
            temp.data = (_b = inputString.match(el.regexRule)) === null || _b === void 0 ? void 0 : _b.at(0);
        }
        if (length > 1) {
            temp.data = (_c = inputString.match(el.regexRule)) === null || _c === void 0 ? void 0 : _c.at(1);
        }
        if ((inputString.match(el.regexRule) === null)) {
            temp.data = "n/a";
        }
        preFilteredData.push(temp);
        if (el.type === "phoneNumber") {
            console.log(inputString.match(el.regexRule));
        }
    });
    formatPhoneNumbers(preFilteredData);
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
function formatPhoneNumbers(inputData) {
    var _a, _b;
    let phoneNumbersRegex = new RegExp("(?:\\+?\\d{2}\\s*|0\\s*)?\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d", "gi");
    let phoneNumbers = {
        name: "",
        type: "",
        data: [""]
    };
    // find phone nubmers in 
    inputData.forEach(el => {
        var _a;
        for (const [key, value] of Object.entries(el)) {
            if (key === "type" && value === "phoneNumber") {
                phoneNumbers.data = ((_a = el.data) === null || _a === void 0 ? void 0 : _a.match(phoneNumbersRegex)) || [];
                phoneNumbers.name = el.name;
                phoneNumbers.type = el.type;
            }
        }
    });
    //put numbers in an array with no spaces.
    (_a = phoneNumbers.data) === null || _a === void 0 ? void 0 : _a.forEach((el, index) => {
        phoneNumbers.data[index] = el.replace(new RegExp("\\s", "g"), "");
    });
    //put numbers in an array with no prefixes - no zeros and +44s, others have to be kept.
    (_b = phoneNumbers.data) === null || _b === void 0 ? void 0 : _b.forEach((el, index) => {
        if (el[0] === "0") {
            phoneNumbers.data[index] = el.slice(1, el.length);
        }
        if (el[0] === "+" && el[1] === "4" && el[2] === "4" && el.length === 13) {
            phoneNumbers.data[index] = el.slice(3, el.length);
        }
    });
    console.log(phoneNumbers);
    return phoneNumbers;
}
function formatProducts(inputData) {
    let producutsRegexLevelTwo = new RegExp("\\b(\\d{8,8}\\s\\d{6,6}|\\d{16,16})\\s(.*?)(?=(\\b(?:\\d+|$)))", "gi");
    let productNumberRegex = new RegExp("\\d\\d\\d\\d\\d\\d\\d\\d|\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d", "g");
    let productSortCodeRegex = new RegExp("\\d\\d\\d\\d\\d\\d");
    let productIsOpen = "string.filter(account open) or something";
    let productName = "productsNames.forEach(el=productsstring.filter(e)?thenproducts name = el.";
    //below is target function output
    let products = {
        name: "",
        type: "",
        data: [],
    };
    //below is a temp variable storing a string with products data
    let productsTempString = "";
    let productsTempStringArray = [];
    inputData.forEach(el => {
        var _a;
        for (const [key, value] of Object.entries(el)) {
            if (key === "type" && value === "products") {
                products.name = el.name;
                products.type = el.type;
                productsTempStringArray = ((_a = el.data) === null || _a === void 0 ? void 0 : _a.match(new RegExp("(?:Expiry Date)(.+)", "i")));
            }
        }
    });
    //below is a filtered out string with products data
    productsTempString = productsTempStringArray[1];
    console.log("string tutaj", productsTempString);
    console.log(productsTempString.match(producutsRegexLevelTwo));
    return 3;
}
function formatActoneReferences(inputData) {
    let actoneReferences = [];
    inputData.forEach(el => {
        var _a;
        for (const [key, value] of Object.entries(el)) {
            if (key === "type" && value === "actone") {
                actoneReferences = ((_a = el.data) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
            }
        }
    });
    return 3;
}
function createDataElements(dataObject) {
    var _a;
    document.querySelectorAll(".results-container *").forEach((el) => {
        el.remove();
    });
    document.querySelectorAll(".results-container").forEach((el) => {
        el.remove();
    });
    let resultsContainer = document.createElement("div");
    resultsContainer.classList.add("results-container");
    if (document.querySelector(".container") === null) {
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.appendChild(resultsContainer);
    }
    dataObject.forEach((el) => {
        let temporaryElement = document.createElement("p");
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
