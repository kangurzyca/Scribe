var requiredData = [
    {
        name: "Case Number",
        type: "caseNumber",
        regexRule: new RegExp("EXT\\d{10,10}", "i"),
    },
    {
        name: "Brand",
        type: "brandName",
        regexRule: new RegExp("(?:\\bbrand\\s+)(\\w+)", "i"),
    },
    {
        name: "CIN",
        type: "cin",
        regexRule: new RegExp("\\bCustomer\\s+\\bID\\s+\\D*(\\d{10})", "i"),
    },
    {
        name: "Title",
        type: "title",
        regexRule: new RegExp("\\b(?:\\bTitle\\s+)(\\w+)", "i"),
    },
    {
        name: "First Name",
        type: "firstName",
        regexRule: new RegExp("(?:first\\s+name\\s+)(\\w+(?:\\s+\\w+)?", "i"),
    },
    {
        name: "Middle Name",
        type: "middleName",
        regexRule: new RegExp("(?:first\\s+name\\s+)(\\w+(?:\\s+\\w+)?)", "i"),
    },
    {
        name: "Last Name",
        type: "lastName",
        regexRule: new RegExp("(?:last\\s+name\\s+)(\\w+(?:\\s+\\w+)?)", "i"),
    },
    {
        name: "Address Line 1",
        type: "addressLineOne",
        regexRule: new RegExp("address line 1\\s*([\\w\\s]+)\\s*address line 2", "i"),
    },
    {
        name: "Address Line 2",
        type: "addressLineTwo",
        regexRule: new RegExp("\\baddress line 2\\b\\s*([\\w\\d\\s]+)\\s*\\bcity\\/town\\b", "i"),
    },
    {
        name: "City/Town",
        type: "addressTown",
        regexRule: new RegExp("\\bcity\\/town\\b\\s*([\\w\\d\\s]+)\\s*\\bpostcode\\b", "i"),
    },
    {
        name: "Postcode",
        type: "addressPostcode",
        regexRule: new RegExp("\\bpostcode\\b\\s*(\\b[a-zA-Z0-9]{2,4}\\s[a-zA-Z0-9]{3}\\b)", "i"),
    },
    {
        name: "Date of Birth",
        type: "dob",
        regexRule: new RegExp("\\bdate of birth\\s*(\\d{1,2}-[a-zA-Z]{3}-\\d{4})\\s*/", "i"),
    },
    {
        name: "Phone Number",
        type: "phoneNumber",
        regexRule: new RegExp("\\bnumbers*\\(optional\\)\\s*((?:\\d{11}|\\+44\\s?\\d{12})(?:\\s+(?:\\d{11}|\\+44\\s?\\d{12}))*)", "g"),
    },
    {
        name: "ActOne Refrenece",
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
module.exports = requiredData;
