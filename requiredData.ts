import { IRequiredData } from "./interfaces.js"

export const requiredData: IRequiredData[]= [
    {
        name: "Case Number",
        type: "caseNumber",
        regexRule: new RegExp("(?:\\bExit ID\\s+)(EXT\\d{10,10}(?:\\s+)*)\\s+Date Created", "i"),
    },
    {
        name: "Brand",
        type: "brandName",
        regexRule: new RegExp("(?:\\bbrand\\s+)(\\w+(?:\\s+\\w+)*)\\s+Type of relationship", "i"),
    },
    {
        name: "CIN",
        type: "cin",
        regexRule: new RegExp("customer\\s+id\\s+\\(cin\\)\\s+(\\d{10})\\s+customer\\s+status", "i"),
    },
    {
        name: "Case level",
        type: "caseLevel",
        regexRule: new RegExp("(?:\\bReason for exit\\s+)(\\w+(?:\\s+\\w+)*)\\s+Exceptional", "i"),
    },
    {
        name: "Business Name",
        type: "businessName",
        regexRule: new RegExp("(?:\\bBusiness Name\\s+)(\\w+(?:\\s+\\w+)*)\\s+Exceptional", "i"),
    },
    {
        name: "Title",
        type: "title",
        regexRule: new RegExp("\\b(?:\\bTitle\\s+)(\\w+)", "i"),
    },

    {
        name: "First Name",
        type: "firstName",
        regexRule: new RegExp("(?:\\bfirst name\\s+)(\\w+(?:\\s+\\w+)*)\\s+middle name", "i"),
    },
    {
        name: "Middle Name",
        type: "middleName",
        regexRule: new RegExp("(?:\\bmiddle name \\(optional\\)\\s+)(\\w+(?:\\s+\\w+)*)\\s+last name", "i"),
    },

    {
        name: "Last Name",
        type: "lastName",
        regexRule: new RegExp("(?:\\blast name\\s+)(\\w+(?:\\s+\\w+)*)\\s+Address line 1", "i"),
    },

    {
        name: "Address Line 1",
        type: "addressLineOne",
        regexRule: new RegExp("(?:\\bAddress line 1\\s*)(\\w+(?:\\s+\\w+)*)\\s+Address line 2", "i"),
    },
    {
        name: "Address Line 2",
        type: "addressLineTwo",
        regexRule: new RegExp("(?:\\bAddress line 2\\s*\\(Optional\\)\\s+)(\\w+(?:\\s+\\w+)*)\\s+City\\/Town", "i"),
    },
    {
        name: "City/Town",
        type: "addressTown",
        regexRule: new RegExp("City\\/Town\\s+([\\w\\s]+)\\s+Post\\s+code", "i"),
    },
    {
        name: "Postcode",
        type: "addressPostcode",
        regexRule: new RegExp("post\\s+code\\s+([A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2})\\s+date\\s+of\\s+birth", "i"),
    },
    {
        name: "Date of Birth",
        type: "dob",
        regexRule: new RegExp(
            "Date\\s+of\\s+birth\\s+(\\d{2}-[a-zA-Z]{3}-\\d{4})","i"),
    },
    {
        name: "Phone Number",
        type: "phoneNumber",
        regexRule: new RegExp(
            "\\b(?:\\+?\\d{10,}|\\(\\d{5,}\\)\\s?\\d{5,}|\\d{11,})\\b",
            "g"
        ),
    },
    {
        name: "ActOne Reference",
        type: "actone",
        regexRule: new RegExp("reference\\s*([\\d,]*)\\s*expiry", "gi"),
    },
    {
        name: "Products",
        type: "products",
        regexRule: new RegExp("((?<=expiry date)(.*))(?=account open)", "gi"),
    },
];

// fetchedDataRequirements.push({name: "", type: "", regexRule: new RegExp("", "i")})