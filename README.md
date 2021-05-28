# Missing Fields

This function is developed for verifying the structure and mandatory fields. This function takes two parameters:

* Provide the input policy.
* Provide the target structure.
## Installation

Please install dependency packages; This module used one dependency (jest) to do some tests.

```bash
npm install
```

## Usage

To run test, in the command line type:

```javascript
npm test

```
## Example

A target schema based on the Colonel Company is provide into the schema.js and a policy is provided in the index.js. To see the output of this function, run this command:


```javascript
node index.js

```
Example of output:

```javascript
{
  errorKey: [ 'driversLicenseNumber' ],
  errorMessage: [ "Field(s) 'driversLicenseNumber' value(s) cannot be null" ]
}

```
