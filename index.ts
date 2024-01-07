const fetchedDataRequirements: FetchedData[] = [];

interface FetchedData {
    name: string;
    type: string;
    regexRule: any;
    lookFor: (source: string) => string;
}
class FetchedData {
    constructor(name: string, type: string, regexRule: any) {
        this.name = name;
        this.type = type;

        this.regexRule = new RegExp(regexRule);
    }
}

let inputString: string =
    "Exit ID asdkfj asd 22-feb-2021 EXT1234567890 aasstop pause, extend on hold,      brand       Paribas kartofle  Customer ID (CIN)     2244668819 cala masa         ronz234234 23456 r2 2 Title         Mr. next another thing   address line 1 1 beck Avenue de rue 1         address Line 2 warwick self church   ciTY/tOwn marlborough postcode we4 cj7              first name Mc SHISH ashfd EXT0987654321 last name de AZAZ 43 4 fdf date of birth   12-feb-2023    telephone number (optional) 02345678901   fax number (optional) 56473829102 mobile number (optional) +442243568920 mobile number (optional) 44275937584632  ActOne reference 13245212,12345678,23487961,123024561,119900311,52345567547  expiry date MTA 123234 12345678 No ISA 223234 2345623 Yes CreditCard 57685768576857685 No account open";
let productsNames: string[] = ["MTA", "ISA", "BBLS", "BBILS", "CreditCard"];

fetchedDataRequirements.push(
    new FetchedData("Case Number", "caseNumber", /EXT\d{10}/i)
);
fetchedDataRequirements.push(
    new FetchedData("Brand", "brandName", /(?:\bbrand\s+)(\w+)/i)
);
fetchedDataRequirements.push(
    new FetchedData("CIN", "cin", /\bCustomer\s+\bID\s+\D*(\d{10})/i)
);
fetchedDataRequirements.push(
    new FetchedData("Title", "title", /(?:\bTitle\s+)(\w+)/i)
);
fetchedDataRequirements.push(
    new FetchedData(
        "First Name",
        "firstName",
        /(?:first\s+name\s+)(\w+(?:\s+\w+)?)/i
    )
);
fetchedDataRequirements.push(
    new FetchedData(
        "Middle Name",
        "middleName",
        /(?:middle\s+name\s+)(\w+(?:\s+\w+)?)/i
    )
);
fetchedDataRequirements.push(
    new FetchedData(
        "Last Name",
        "lastName",
        /(?:last\s+name\s+)(\w+(?:\s+\w+)?)/i
    )
);
fetchedDataRequirements.push(
    new FetchedData(
        "Address Line 1",
        "addressLineOne",
        /address line 1\s*([\w\s]+)\s*address line 2/i
    )
);
fetchedDataRequirements.push(
    new FetchedData(
        "Address Line 2",
        "addressLineTwo",
        /\baddress line 2\b\s*([\w\d\s]+)\s*\bcity\/town\b/i
    )
);
fetchedDataRequirements.push(
    new FetchedData(
        "City/Town",
        "addressTown",
        /\bcity\/town\b\s*([\w\d\s]+)\s*\bpostcode\b/i
    )
);
fetchedDataRequirements.push(
    new FetchedData(
        "Postcode",
        "addressPostcode",
        /\bpostcode\b\s*(\b[a-zA-Z0-9]{2,4}\s[a-zA-Z0-9]{3}\b)/i
    )
);
fetchedDataRequirements.push(
    new FetchedData(
        "Date of Birth",
        "dob",
        /\bdate of birth\s*(\d{1,2}-[a-zA-Z]{3}-\d{4})\s*/
    )
);
fetchedDataRequirements.push(
    new FetchedData(
        "Phone Number",
        "phoneNumber",
        /\bnumber\s*\(optional\)\s*((?:\d{11}|\+44\s?\d{12})(?:\s+(?:\d{11}|\+44\s?\d{12}))*)/g
    )
);
fetchedDataRequirements.push(
    new FetchedData(
        "ActOne Refrenece",
        "actone",
        /reference\s*([\d,]*)\s*expiry/gi
    )
);
fetchedDataRequirements.push(
    new FetchedData(
        "Products",
        "products",
        /((?<=expiry date)(.*))(?=account open)/gi
    )
);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

interface filteredDataInterface {
    name: string;
    type: string;
    data: string;
}
let filteredData: filteredDataInterface[] = [];

function pasteText() {
    // Read text from the clipboard
    navigator.clipboard
        .readText()
        .then((text) => {
            // Paste the text into the input field
            fetchedDataRequirements.forEach((el) => {
                let temp: filteredDataInterface = {
                    name: el.name,
                    type: el.type,
                    data: el.lookFor(text),
                };

                filteredData.push(temp);
            });
            createDataElements(filteredData);
        })
        .catch((err) => {
            console.error("Unable to read clipboard data", err);
        });
}

function createDataElements(dataObject: filteredDataInterface[]) {
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

        el.splice(1).forEach((element) => {
            let temporaryElementSpan = document.createElement("span");
            temporaryElement.appendChild(temporaryElementSpan);
            temporaryElementSpan.classList.add("copiable");

            if (element.toString().toLowerCase() !== "n/a") {
                temporaryElementSpan.classList.add("hoverable");
                temporaryElementSpan.addEventListener("click", (x) => {
                    copyToClipboard(x);
                });
            }
            temporaryElementSpan.textContent = element;
        });
        resultsContainer.appendChild(temporaryElement);
    });
}

function copyToClipboard(e) {
    const text = e.target.textContent;
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    e.target.style.backgroundColor = "hsla(260, 40%, 80%, 1)";
    e.target.style.color = "black";

    setTimeout(() => {
        e.target.style.backgroundColor = "";
        e.target.style.color = "white";
    }, 600);
}
