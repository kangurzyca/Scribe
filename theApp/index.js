import { requiredData } from "./requiredData.js";
const preFilteredData = [];
// let inputString: string =
//     "Exit ID asdkfj asd 22-feb-2021 EXT1234567890 aasstop pause, extend on hold,      brand       Paribas kartofle  Customer ID (CIN)     2244668819 cala masa         ronz234234 23456 r2 2 Title         Mr. next another thing   address line 1 1 beck Avenue de rue 1         address Line 2 warwick self church   ciTY/tOwn marlborough postcode we4 cj7              first name Mc SHISH ashfd EXT0987654321 last name de AZAZ 43 4 fdf date of birth   12-feb-2023    telephone number (optional) 02345678901   fax number (optional) 56473829102 mobile number (optional) +442243568920 mobile number (optional) 44275937584632  ActOne reference 13245212,12345678,23487961,123024561,119900311,52345567547  expiry date MTA 123234 12345678 No ISA 223234 2345623 Yes CreditCard 57685768576857685 No account open";
let inputString = "Exodus Exits QueueCreate CaseGroupwide Connections SearchExits Data SearchOthers EXT0000003247 Standard RemindersCommentsAttachmentsAudit Case summary Exit ID EXT0000003247 Date Created 09-Mar-2021 Last QC/QA Outcome QCPC Pass Status LETTERS Actual Exit Date Allocated To Location Delhi Team Team 1 No other cases for this customer Linked cases in this wider connection (2) EXT0000003241 KP - QA_STOP  EXT0000003227 (Parent) - CLOSED_QA  Group-Wide Connections GWS Search GWS Audit Franchise/Area (ID) - Brand	Franchise Contacted	Franchise Decision	Response Received	Association	Search Method No connections added yet Discounted Connections Franchise/Area (ID) - Brand	Association	Search Method	Party ID	Discounting Rationale No connections added yet Has the Groupwide Search returned connections/associations to other Business Areas? No / Not Applicable Have all supplier systems been checked for Connections? No / Not Applicable QC/QA Status	Outcome	Notes	User ID	Completed Date/Time	Case Analyst QC Pre-Comms	QCPC Pass		E A_MISHACK	25-Nov-2023 18:14	EUROPA_KIRMA Pagination - Current page. Go to page1of 1 Stop, Pause, Extend, On Hold, Diarised Events Total Pause Duration - 0 days Total Extension Length Elapsed - 0 daysTotal Extension Length Requested - 0 days Total On Hold Duration - 1 days Total Diarisation Duration - days Request Type	S/P/E Relationship	Requestor Name/Mailbox	Request Reason	On Hold Indicator	Request Date	Request Start Date	Request End Date	Request Duration	Request Duration (elapsed) Hold Exit			External	Awaiting Insolvency confirmation	11-Oct-2023		12-Oct-2023	1 days	0Showing 1 of 1 Stop, Pause, Extend, On Hold, Diarised Events Pagination - Current page. Go to page1of 1 Case details Type of customer Individual Customer owning franchise Retail Brand Natwest Type of relationship Customer Type of exit Non-Financial Crime Reason for exit Non Fin Crime Exceptional CircumstancesNo Date exit decision made 15-Feb-2021 Decision making franchise CDD Exit Ops Exit Referral Receipt Date 12-Feb-2021 Date Received in to Exit Operations? 15-Feb-2021 Case origin (Optional) BAU Rationale .  Customer DetailsCustomer ID (CIN) 1178674963 Customer status Active  Customer Identification Number	Active/Inactive	Orphan ID? No additional identifiers added yet Does the customer have a Relationship Manager? No Portfolio code (Optional) Title Mr. First name Steven Middle name (Optional) Michael Last name Petty Address line 1 32 The Close Address line 2 (Optional) Anstey City/Town Leicester Post code LE7 7EP Date of birth 01-Apr-1971 Age: 52 Country of residence United Kingdom 2 Digit ISO Country Code GB 3 Digit ISO Country Code GBR Telephone Number (Optional) 01112 345678 Mobile Number (Optional) 07987654321 Fax Number (Optional) +4412345 67809 Email Address (Optional) jestem-slodki@zrebak.CO.UK Orphan ID? No Additional InformationExternal Records UID (Optional) N/A Is the customer a PEP? No Vulnerable Customer? No Is customer also a Staff member? No Is this case a Key Principal or Legal entity of a parent case Key Principal Please input the Parent Case ID for this connection: EXT0000003227 Innocent Party No Has DAML already been initiated? Case Risk Score 17 Customer Risk Rating High ICE Number Products Product	Account number	Sort code	Outstanding?	CES Note?	Date closure expected	Product Status?	Extension Expiry Date MTA	12473073	560055	No	  Account Open Showing 1 of 1 products Pagination - Current page. Go to page1of 1 Treatment Type of exit Non-Financial Crime Are there any case blockers/blocked products? No Has an RM or Branch relationship been identified? No DAML Exit type Non Financial Crime Frontline Response No response Date first Submitted 12-Oct-2023 Execution Have all Account markers been placed where necessary? Yes Have Exit Letters been Issued for this customer? Yes Date letters issued 22-Nov-2023 Letter review date 21-Jan-2024 Please review PIF & Signature (ISV) Checks. Blocked process Historic reviews Review End Date	Blocked Diary Date	Exit Case Still Blocked	Blocker type	Escalation Required	Escalation Reason	Continue With Escalation	Still Holds Open Products	Escalation Type	 06-Oct-2023 28-Mar-2022	No	Restraint Order	Yes	Restraint order clarification	Yes	Yes	Other	View more Showing 1 to 1 of 1 Historic Blocked Reviews Pagination - Current page. Go to page1of 1 Cancel © 2020 WebSDK   ";
let productsNames = ["MTA", "ISA", "BBLS", "BBILS", "CreditCard", "CBILS", "CLBILS", "RLS", "EFG"];
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
        var _a, _b, _c, _d;
        const temp = {
            name: el.name,
            type: el.type
        };
        if (((_a = inputString.match(el.regexRule)) === null || _a === void 0 ? void 0 : _a.length) === 1) {
            temp.data = (_b = inputString.match(el.regexRule)) === null || _b === void 0 ? void 0 : _b.at(0);
        }
        if (((_c = inputString.match(el.regexRule)) === null || _c === void 0 ? void 0 : _c.length) === 2) {
            temp.data = (_d = inputString.match(el.regexRule)) === null || _d === void 0 ? void 0 : _d.at(1);
        }
        if ((inputString.match(el.regexRule) === null)) {
            temp.data = "n/a";
        }
        preFilteredData.push(temp);
        if (el.type === "phoneNumber") {
            console.log(inputString.match(el.regexRule));
        }
    });
    console.log(preFilteredData);
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
