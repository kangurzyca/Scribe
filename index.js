var fetchedDataRequirements = [];
var inputString = "Exit ID asdkfj asd 22-feb-2021 EXT1234567890 aasstop pause, extend on hold,      brand       Paribas kartofle  Customer ID (CIN)     2244668819 cala masa         ronz234234 23456 r2 2 Title         Mr. next another thing   address line 1 1 beck Avenue de rue 1         address Line 2 warwick self church   ciTY/tOwn marlborough postcode we4 cj7              first name Mc SHISH ashfd EXT0987654321 last name de AZAZ 43 4 fdf date of birth   12-feb-2023    telephone number (optional) 02345678901   fax number (optional) 56473829102 mobile number (optional) +442243568920 mobile number (optional) 44275937584632  ActOne reference 13245212,12345678,23487961,123024561,119900311,52345567547  expiry date MTA 123234 12345678 No ISA 223234 2345623 Yes CreditCard 57685768576857685 No account open";
var productsNames = ["MTA", "ISA", "BBLS", "BBILS", "CreditCard"];
fetchedDataRequirements.push({ name: "Case Number", type: "caseNumber", regexRule: "EXT\\d{10}" });
fetchedDataRequirements.push({ name: "Brand", type: "brandName", regexRule: "/(?:\\bbrand\\s+)(\\w+)/i" });
function searchText(inputData) {
    console.log(inputData.name);
    return "placki";
}
searchText(fetchedDataRequirements[1]);
var filteredData = [];
function pasteText() {
    // Read text from the clipboard
    navigator.clipboard
        .readText()
        .then(function (text) {
        console.log(text);
    })
        .catch(function (err) {
        console.error("Unable to read clipboard data", err);
    });
}
function createDataElements(dataObject) {
    var _a;
    document.querySelectorAll(".results-container *").forEach(function (el) {
        el.remove();
    });
    document.querySelectorAll(".results-container").forEach(function (el) {
        el.remove();
    });
    var resultsContainer = document.createElement("div");
    resultsContainer.classList.add("results-container");
    if (document.querySelector(".container") === null) {
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.appendChild(resultsContainer);
    }
    dataObject.forEach(function (el) {
        var temporaryElement = document.createElement("p");
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
function copyToClipboard(e) {
    var text = e.target.textContent;
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    e.target.style.backgroundColor = "hsla(260, 40%, 80%, 1)";
    e.target.style.color = "black";
    setTimeout(function () {
        e.target.style.backgroundColor = "";
        e.target.style.color = "white";
    }, 600);
}
