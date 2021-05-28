const validator = require("../validator");

describe("missing fields", () => {
  it("should throw if input parametres are falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        validator(a, a);
      }).toThrowError();
    });
  });
  it("should return empty array if given structure same as an expected structure", () => {
    const input = {
      policyId: "9afe73e5-77c9-4677-ba5f-1b9e807396a0",
      issuer: "nationwide",
      issueDate: "2021-01-21",
      renewalDate: "2021-07-22",
      policyTermMonths: 6,
      premiumCents: 49234,
      policyHolder: {
        name: {
          firstName: "Caroline",
          middleName: "",
          lastName: "White",
        },
        address: {
          number: "292",
          street: "Hillside Way Apt 398",
          suffix: "S",
          city: "Pierce",
          state: "IA",
          zip: "30328",
        },
        email: "Caroline.White897@me.com",
      },
      operators: [
        {
          isPrimary: true,
          name: {
            firstName: "Caroline",
            middleName: "",
            lastName: "White",
          },
          birthdayRange: {
            start: "1988-05-22",
            end: "1989-05-21",
          },
          gender: "female",
          driversLicenseState: "IA",
          driversLicenseStatus: "ValidUSLicense",
          driversLicenseNumber: "XXXXX1633",
          relationship: "Named Insured",
        },
      ],
    };
    const requiredFields = {
      policyHolder: {
        name: {
          firstName: "",
        },
        address: {
          number: "",
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
    const result = validator(input, requiredFields);
    expect(result.errorKey).toHaveLength(0);
  });
  it("should return name if given value is an empty object", () => {
    const input = { name: {} };
    const requiredFields = { name: { firstName: "" } };
    const result = validator(input, requiredFields);
    expect(result.errorKey).toContain("name");
  });
  it("should return name if given value is null, undefined or an empty string for one level object", () => {
    const args = [null, undefined, ""];
    const input = {};
    const requiredFields = { name: "" };
    args.forEach((a) => {
      input["name"] = a;
      const result = validator(input, requiredFields);
      expect(result.errorKey).toContain("name");
    });
  });
  it("should return name if given value is null, undefined or an empty string for nested object ", () => {
    const args = [null, undefined, ""];
    const input = { person: {} };
    const requiredFields = { person: { name: "" } };
    args.forEach((a) => {
      input["person"]["name"] = a;
      const result = validator(input, requiredFields);
      expect(result.errorKey).toContain("name");
    });
  });
  it("should return name if given value is null, undefined or an empty string for array of objects", () => {
    const args = [null, undefined, ""];
    const input = { array: [] };
    const requiredFields = { array: [{ name: "" }] };
    const obj = {};
    args.forEach((a) => {
      obj["name"] = a;
      input["array"].push(obj);
      const result = validator(input, requiredFields);
      expect(result.errorKey).toContain("name");
      input["array"].pop();
    });
  });
});
