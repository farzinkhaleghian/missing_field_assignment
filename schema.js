/**
 * A schema defines the structure and required fields in an object should be validated against.
 * It must be an object.
 *
 */

const colonelPolicyRequiredFields = {
  policyHolder: {
    name: {
      firstName: "",
      lastName: "",
    },
    address: {
      number: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    email: "",
  },
  operators: [
    {
      gender: "",
      driversLicenseNumber: "",
      birthdayRange: {
        start: "",
        end: "",
      },
    },
  ],
};

const rancherslPolicyRequiredFields = {
  policyHolder: {
    name: {
      firstName: "",
      lastName: "",
    },
    address: {
      number: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    email: "",
    phoneNumber: "",
  },
  operators: [
    {
      driversLicenseNumber: "",
      birthdayRange: {
        start: "",
        end: "",
      },
    },
  ],
};

exports.colonelPolicyRequiredFields = colonelPolicyRequiredFields;
exports.rancherslPolicyRequiredFields = rancherslPolicyRequiredFields;
