import { requiredData } from "./requiredData.js"
import { IRequiredData, IPreFilteredData } from "./interfaces.js"
import {inputString} from "./inputString.js"

const preFilteredData: IPreFilteredData[] = [];


let productsNames: string[] = ["MTA", "ISA", "BBLS", "BBILS", "CreditCard", "CBILS", "CLBILS", "RLS", "EFG", "unsecured loan"];


    
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

        let length: any
        if(inputString.match(el.regexRule) !== null && typeof inputString.match(el.regexRule) !== "undefined"){
           length  = inputString.match(el.regexRule)?.length
        }
        

        if(length === 1 ){
            temp.data = inputString.match(el.regexRule)?.at(0)
        }
        if(length > 1){
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
