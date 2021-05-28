//output structure
const response = {
  errorKey: [],
  errorMessage: [],
};

/**
 * Missing fields validator based on the expected object.
 *
 * @param {Object} inputObject the object beign validated
 * @param {Object} expectedMandatoryKeysObject the expected object to match
 * @return {Object} response object
 */

function validation(inputObject, expectedMandatoryKeysObject) {
  const undefinedValues = [];
  const nullValues = [];
  const blankValues = [];

  /**
   * Missing fields validator based on the expected array.
   *
   * @param {Object} key the key beign validated
   * @return {Object} response object
   */
  function checkValidationArray(key) {
    for (let element of inputObject[key]) {
      validation(element, expectedMandatoryKeysObject[key][0]);
    }
  }

  if (!inputObject || !expectedMandatoryKeysObject)
    throw new Error("Both parametrs must be an object");

  for (let key in expectedMandatoryKeysObject) {
    if (inputObject[key] === undefined) {
      undefinedValues.push(key);
    } else if (inputObject[key] === null) {
      nullValues.push(key);
    } else if (
      typeof expectedMandatoryKeysObject[key] === "string" &&
      inputObject[key].trim() === ""
    ) {
      blankValues.push(key);
    } else if (
      typeof expectedMandatoryKeysObject[key] === "object" &&
      Object.keys(inputObject[key]).length === 0
    ) {
      undefinedValues.push(key);
    } else if (
      typeof expectedMandatoryKeysObject[key] === "object" &&
      !(inputObject[key] instanceof Array)
    ) {
      validation(inputObject[key], expectedMandatoryKeysObject[key]);
    } else if (
      typeof expectedMandatoryKeysObject[key] === "object" &&
      inputObject[key] instanceof Array
    ) {
      checkValidationArray(key);
    }
  }

  if (undefinedValues.length !== 0) {
    response.errorMessage.push(
      "Field(s) '" + undefinedValues.join(",") + "' required is/are missing"
    );
  }
  if (nullValues.length !== 0) {
    response.errorMessage.push(
      "Field(s) '" + nullValues.join(",") + "' value(s) cannot be null"
    );
  }
  if (blankValues.length !== 0) {
    response.errorMessage.push(
      "Field(s) '" + blankValues.join(",") + "' value passed is/are blank"
    );
  }
  response.errorKey.push(...undefinedValues, ...nullValues, ...blankValues);
  return response;
}

module.exports = validation;
