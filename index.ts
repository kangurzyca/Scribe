import { requiredData } from "./requiredData.js"
import { IRequiredData, IPreFilteredData } from "./interfaces.js"

const preFilteredData: IPreFilteredData[] = [];

let inputString: string =
    "Exit ID asdkfj asd 22-feb-2021 EXT1234567890 aasstop pause, extend on hold,      brand       Paribas kartofle  Customer ID (CIN)     2244668819 cala masa         ronz234234 23456 r2 2 Title         Mr. next another thing   address line 1 1 beck Avenue de rue 1         address Line 2 warwick self church   ciTY/tOwn marlborough postcode we4 cj7              first name Mc SHISH ashfd EXT0987654321 last name de AZAZ 43 4 fd telephone number  0555 6666668   fax number (optional) 11122233343 mobile number (optional) +4455 56667778 mobile number (optional) 449998887776  f date of birth   12-feb-2023    telephone number (optional) 02345 678901   fax number (optional) 333444 2223 56473829102 mobile number (optional) +4422 43568920 mobile number (optional) 44275937584632 1231231234 5558884449  ActOne reference 13245212,12345678,23487961,123024561,119900311,52345567547  expiry date MTA 123234 12345678 No ISA 223234 2345623 Yes CreditCard 57685768576857685 No account open";  

let productsNames: string[] = ["MTA", "ISA", "BBLS", "BBILS", "CreditCard", "CBILS", "CLBILS", "RLS", "EFG"];


    
if(typeof document !== "undefined"){
    const pasteTextHere = document.getElementById("pasteTextHere")
    pasteTextHere?.addEventListener("click", ()=>{
        searchTextForData(requiredData)
    })
}

//below function returns a string for now. It will return IPreFilteredData[] type nominally.
function searchTextForData(inputData: IRequiredData[]): string{
 
    preFilteredData.splice(0, preFilteredData.length)
    
    inputData.forEach(el=>{
        const temp: IPreFilteredData = {
            name: el.name,
            type: el.type
        }
        if(inputString.match(el.regexRule)?.length === 1 ){
            temp.data = inputString.match(el.regexRule)?.at(0)
        }
        if(inputString.match(el.regexRule)?.length === 2){
            temp.data = inputString.match(el.regexRule)?.at(1)
        }
        if((inputString.match(el.regexRule) === null)){
            temp.data =  "n/a"
        }
        preFilteredData.push(temp)
        if(el.type === "phoneNumber"){
            console.log(inputString.match(el.regexRule))
        }

    })

    console.log(preFilteredData)


 return "placki"
}





//------------------------------------------------------------
function pasteText() {
    // Read text from the clipboard
    navigator.clipboard
        .readText()
        .then((text) => {
           // console.log(text)
           searchTextForData(requiredData)
        })
        .catch((err) => {
            console.error("Unable to read clipboard data", err);
        });
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
