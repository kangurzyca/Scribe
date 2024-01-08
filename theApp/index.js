import { requiredData } from "./requiredData.js";
console.log(requiredData);
const fetchedDataRequirements = [];
let inputString = "Exit ID asdkfj asd 22-feb-2021 EXT1234567890 aasstop pause, extend on hold,      brand       Paribas kartofle  Customer ID (CIN)     2244668819 cala masa         ronz234234 23456 r2 2 Title         Mr. next another thing   address line 1 1 beck Avenue de rue 1         address Line 2 warwick self church   ciTY/tOwn marlborough postcode we4 cj7              first name Mc SHISH ashfd EXT0987654321 last name de AZAZ 43 4 fdf date of birth   12-feb-2023    telephone number (optional) 02345678901   fax number (optional) 56473829102 mobile number (optional) +442243568920 mobile number (optional) 44275937584632  ActOne reference 13245212,12345678,23487961,123024561,119900311,52345567547  expiry date MTA 123234 12345678 No ISA 223234 2345623 Yes CreditCard 57685768576857685 No account open";
let productsNames = ["MTA", "ISA", "BBLS", "BBILS", "CreditCard"];
fetchedDataRequirements.push({ name: "Case Number", type: "caseNumber", regexRule: new RegExp("EXT\\d{10,10}", "i") });
requiredData.forEach(el => {
    fetchedDataRequirements.push(el);
});
// fetchedDataRequirements.push({ name: "Brand", type: "brandName", regexRule: new RegExp("(?:\\bbrand\\s+)(\\w+)", "i") })
// fetchedDataRequirements.push({name: "CIN", type: "cin", regexRule: new RegExp("\\bCustomer\\s+\\bID\\s+\\D*(\\d{10})", "i")})
// fetchedDataRequirements.push({name: "Title", type: "title", regexRule: new RegExp("\\b(?:\\bTitle\\s+)(\\w+)", "i")})
// fetchedDataRequirements.push({name: "First Name", type: "firstName", regexRule: new RegExp("(?:first\\s+name\\s+)(\\w+(?:\\s+\\w+)?", "i")})
// fetchedDataRequirements.push({name: "Middle Name", type: "middleName", regexRule: new RegExp("(?:first\\s+name\\s+)(\\w+(?:\\s+\\w+)?)", "i")})
// fetchedDataRequirements.push({name: "Last Name", type: "lastName", regexRule: new RegExp("(?:last\\s+name\\s+)(\\w+(?:\\s+\\w+)?)", "i")})
// fetchedDataRequirements.push({name: "Address Line 1", type: "addressLineOne", regexRule: new RegExp("address line 1\\s*([\\w\\s]+)\\s*address line 2", "i")})
// fetchedDataRequirements.push({name: "Address Line 2", type: "addressLineTwo", regexRule: new RegExp("\\baddress line 2\\b\\s*([\\w\\d\\s]+)\\s*\\bcity\\/town\\b", "i")})
// fetchedDataRequirements.push({name: "City/Town", type: "addressTown", regexRule: new RegExp("\\bcity\\/town\\b\\s*([\\w\\d\\s]+)\\s*\\bpostcode\\b", "i")})
// fetchedDataRequirements.push({name: "Postcode", type: "addressPostcode", regexRule: new RegExp("\\bpostcode\\b\\s*(\\b[a-zA-Z0-9]{2,4}\\s[a-zA-Z0-9]{3}\\b)", "i")})
// fetchedDataRequirements.push({name: "Date of Birth", type: "dob", regexRule: new RegExp("\\bdate of birth\\s*(\\d{1,2}-[a-zA-Z]{3}-\\d{4})\\s*/", "i")})
// fetchedDataRequirements.push({name: "Phone Number", type: "phoneNumber", regexRule: new RegExp("\\bnumber\s*\\(optional\\)\\s*((?:\\d{11}|\\+44\\s?\\d{12})(?:\\s+(?:\\d{11}|\\+44\\s?\\d{12}))*)", "g")})
// fetchedDataRequirements.push({name: "ActOne Refrenece", type: "actone", regexRule: new RegExp("reference\\s*([\\d,]*)\\s*expiry", "gi")})
// fetchedDataRequirements.push({name: "Products", type: "products", regexRule: new RegExp("((?<=expiry date)(.*))(?=account open)", "gi")})
// fetchedDataRequirements.push({name: "", type: "", regexRule: new RegExp("", "i")})
// fetchedDataRequirements.push({name: "", type: "", regexRule: new RegExp("", "i")})
function searchText(inputData) {
    console.log(inputData.name);
    const found = inputString.match(inputData.regexRule);
    console.log(typeof inputData.regexRule);
    console.log(found);
    return "placki";
}
fetchedDataRequirements.forEach(el => {
    console.log(el.name);
    console.log(inputString.match(el.regexRule));
});
let filteredData = [];
function pasteText() {
    // Read text from the clipboard
    navigator.clipboard
        .readText()
        .then((text) => {
        console.log(text);
    })
        .catch((err) => {
        console.error("Unable to read clipboard data", err);
    });
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