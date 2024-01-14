import { requiredData } from "./requiredData.js";
import { inputString } from "./inputString.js";
const preFilteredData = [];
let productsNames = ["MTA", "ISA", "BBLS", "BBILS", "CreditCard", "CBILS", "CLBILS", "RLS", "EFG", "unsecured loan"];
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
    getPhoneNumbers(preFilteredData);
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
function getPhoneNumbers(inputData) {
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
    return phoneNumbers;
}
//get numbers strings in prefiltered data
//filter
//extract numbers
//put numbers in an array with a correct formatting, no spaces no prefixes.
//if the prefix is not +44 nor 0 save a number with this prefix.
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
