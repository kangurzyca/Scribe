import { requiredData } from "./requiredData.js"
import { IProducts, IPhoneNumbers, IRequiredData, IPreFilteredData } from "./interfaces.js"
import {inputString} from "./inputString.js"

const preFilteredData: IPreFilteredData[] = [];


let productsNames: string[] = ["MTA", "ISA", "BBLS", "BBILS", "CreditCard", "CBILS", "CLBILS", "RLS", "EFG", "unsecured loan", "investment", "investments"];


    
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

    formatPhoneNumbers(preFilteredData)


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

function formatPhoneNumbers(inputData: IPreFilteredData[]): IPhoneNumbers{
    let phoneNumbersRegex: any = new RegExp("(?:\\+?\\d{2}\\s*|0\\s*)?\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d", "gi")

    let phoneNumbers: IPhoneNumbers ={
             name: "",
      type: "",
      data: [""]
    }   
    
    // find phone nubmers in 
    inputData.forEach(el=>{
        for (const [key, value] of Object.entries(el)){
            if (key === "type" && value === "phoneNumber"){
                phoneNumbers.data = el.data?.match(phoneNumbersRegex) || []
                phoneNumbers.name = el.name
                phoneNumbers.type = el.type
            }
        }
    })
 //put numbers in an array with no spaces.
    phoneNumbers.data?.forEach((el, index)=>{
        phoneNumbers.data[index] = el.replace(new RegExp("\\s", "g"), "")
    })
//put numbers in an array with no prefixes - no zeros and +44s, others have to be kept.
    phoneNumbers.data?.forEach((el, index)=>{
        if(el[0]==="0"){
            phoneNumbers.data[index] = el.slice(1, el.length)
        }
        if (el[0] === "+" &&el[1]==="4"  &&el[2]==="4" && el.length === 13){
            phoneNumbers.data[index] = el.slice(3, el.length)
        }
       
    })
     return phoneNumbers
}    

function formatProducts(inputData: IPreFilteredData[]): number{

    let producutsRegexLevelTwo: any = new RegExp("\\b(\\d{8,8}\\s\\d{6,6}|\\d{16,16})\\s(.*?)(?=\\b\\d{8,8}\\s\\d{6,6}|\\b\\d{16,16}$)", "gi")

    let productNumberRegex = new RegExp("\\d\\d\\d\\d\\d\\d\\d\\d|\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d")
    let productSortCodeRegex = new RegExp("\\d\\d\\d\\d\\d\\d")

    let productIsOpen = "string.filter(account open) or something"
    let productName = "productsNames.forEach(el=productsstring.filter(e)?thenproducts name = el."

    let products: IProducts = {
     name: "",
    type: "",
    data: [],
}

    inputData.forEach(el=>{
        for(const [key, value] of Object.entries(el)){
            if(key === "type" && value === "products"){
                products.name = el.name
                products.type = el.type
            }
        }
    })



    return 3
}

function formatActoneReferences(inputData: IPreFilteredData[]): number{
   
    let actoneReferences: string[] = []

    inputData.forEach(el=>{
        for(const [key, value] of Object.entries(el)){
            if(key === "type" && value === "actone"){
              actoneReferences = el.data?.split(",")|| []
            }
        }
    })



    return 3
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
