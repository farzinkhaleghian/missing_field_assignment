const validator = require("./validator");
const { colonelPolicyRequiredFields } = require("./schema");
const fs = require("fs");

//provide a json policy
const policiesRawData = fs.readFileSync("./policies.json");
const policy = JSON.parse(policiesRawData)[0];

//call validator function
const result = validator(policy, colonelPolicyRequiredFields);
console.log(result);
