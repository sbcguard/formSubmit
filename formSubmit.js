/* 
formSubmit.js
AJ Rugen
*/
"usr strict";
const formSubmit = new (function () {
  let initCount = 0,
    finalCount = 0;
  const self = this,
    errClassSelector = ".error",
    placeholder = {
      //native html input types except for 'button', 'reset', 'submit'
      color: "#000000",
      date: "yyyy-mm-dd",
      "datetime-local": "yyyy-mm-ddThh:mm",
      email: "user@domain.com",
      file: "",
      image: "",
      month: "yyyy-mm",
      number: "0",
      password: "",
      range: "0",
      search: "Begin searching...",
      tel: "(000)000-0000",
      time: "hh:mm",
      url: "https://www.domain.com/",
      week: "yyyy-W00",
      text: "",
      radio: "",
      checkbox: "",
      hidden: "",
      "select-one": "Choose an option...",
      "select-multiple": "Choose multiple...",
      textarea: "Begin typing...",
      //custom types define by 'data-type=""'
      alpha: "Enter alpha characters only...",
      int: "0",
      float: "0.0",
      currency: "0.00",
      zipcode: "00000",
      zip: "00000",
      zip4: "0000",
      zipfull: "00000-0000",
      urlhttp: "https://www.domain.com/",
      urlpart: "path/to/resource.txt",
      hostname: "www.domain.com",
      domain: "domain.com",
      ip: "0.0.0.0",
      timestamp: "mm/dd/yyyy hh:mm:ss.ms",
      datemmddyyyy: "mm/dd/yyyy",
      dateyyyymmdd: "yyyy-mm-dd",
      routing: "000000000",
      cc: "0000 0000 0000 0000",
      cvv: "000 or 0000",
      ssn: "000-00-0000",
      parcel: "00-000-00-00-000.00 00",
    },
    types = {
      //native html input types except for 'button', 'reset', 'submit'
      /*
      'type attribute name': {
        keys: regex value for allowed keys,
        value: regex value for allowed value format
        error: default error message
      },
      */
      color: {
        keys: /[0-9]|#|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^#([0-9a-fA-F]{6})$/,
        error: "Please select a valid color.",
      },
      date: {
        keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d{4}-\d{2}-\d{2}$/,
        error: `Please enter a valid date (${placeholder.date}).`,
      },
      "datetime-local": {
        keys: /[0-9]|[T]|:|-|Tab|Backspace|ArrowLeft|ArrowRight/,
        value:
          /^([0-9]{4})\-(1[0-2]|0[0-9])\-(0[0-9]|1[0-9]|2[0-9]|3[0-1])T(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/,
        error: `Please enter a valid timestamp (${placeholder["datetime-local"]}).`,
      },
      email: {
        keys: /[a-zA-Z0-9.!#$%&'*+_\/=?^\-`\{\|\}"\(\),:'<>@\[\]\\]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        error: `Please enter a valid email (${placeholder.email}).`,
      },
      file: {
        keys: /./,
        value: /^(.*)\.[\w+|\d+|\W+]{0,5}$/,
        error: "Please choose a valid file.",
      },
      image: {
        keys: /./,
        value: /.+/,
        error: "Please choose a valid image.",
      },
      month: {
        keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d{4}-\d{2}$/,
        error: `Please enter a valid month (${placeholder.month}).`,
      },
      number: {
        keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d+$/,
        error: "Please enter a valid number.",
      },
      password: {
        keys: /[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@\[\]\\\^_`\{\|\}~]|Space|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /./,
        // Allow all for now, can be set to require special characters and minimum length with,
        // note for this regex, testing against it should fail for a valid value as it is looking
        // for the missing requirements to make for a shorter regex (1 upper, 1 lower, 1 special, at least 8 char long)
        // /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/
        error: "Please enter a valid password.",
      },
      range: {
        keys: /[0-9]/,
        value: /\d+/,
        error: "Please select a valid value.",
      },
      search: {
        keys: /./,
        value: /.+/,
        error: "Please enter a valid search string.",
      },
      tel: {
        keys: /[0-9\-()]|Tab|Backspace/,
        value:
          /^((\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/,
        error: `Please enter a valid telephone number i.e. ${placeholder.tel}.`,
      },
      time: {
        keys: /[0-9]|:|Tab|Backspace/,
        value: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/,
        error: `Please enter a valid time (${placeholder.time}).`,
      },
      url: {
        keys: /[a-zA-Z0-9.;,/?:@&=+$-_!~*'()#]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value:
          /\b(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]\b/,
        error: `Please enter a valid URL (${placeholder.url}).`,
      },
      week: {
        keys: /[0-9]|-|W|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d{4}-W\d{2}$/,
        error: `Please enter a valid week (${placeholder.week}).`,
      },
      text: {
        keys: /./,
        value: /.+/,
        error: "Please enter valid text only.",
      },
      radio: {
        keys: /./,
        value: /.+/,
        error: "Please select an option.",
      },
      checkbox: {
        keys: /./,
        value: /.+/,
        error: "Please select an option",
      },
      hidden: {
        keys: /./,
        value: /.+/,
        error: "",
      },
      "select-one": {
        keys: /./,
        value: /.+/,
        error: "Please make a valid selection from the dropdown.",
      },
      "select-multiple": {
        keys: /./,
        value: /.+/,
        error: "Please make valid selections.",
      },
      textarea: {
        keys: /./,
        value: /.+/,
        error: "Please enter valid text.",
      },
      //custom types define by 'data-type=""' attribute
      alpha: {
        keys: /[a-z]|[A-Z]|Space|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\w+$/,
        error: "Please enter valid text only.",
      },
      int: {
        keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d+$/,
        error: `Please enter a valid whole number (${placeholder.int}).`,
      },
      float: {
        keys: /[0-9]|\.|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d+\.{1}\d+$/,
        error: `Please enter a valid decimal number (${placeholder.float}).`,
      },
      currency: {
        keys: /[0-9]|\.|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d+\.{1}\d{2}$/,
        error: `Please enter a valid currency value (${placeholder.currency}).`,
      },
      zipcode: {
        keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^[0-9]{5}$/,
        error: `Please enter a valid zipcode (${placeholder.zipcode}).`,
      },
      zip: {
        keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^[0-9]{5}$/,
        error: `Please enter a valid zipcode (${placeholder.zip}).`,
      },
      zip4: {
        keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^[0-9]{4}$/,
        error: `Please enter a valid zipcode (${placeholder.zip4}).`,
      },
      zipfull: {
        keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^[0-9]{5}-[0-9]{4}$/,
        error: `Please enter a valid zipcode (${placeholder.zipfull}).`,
      },
      urlhttp: {
        keys: /[a-zA-Z0-9.;,/?:@&=+$-_!~*'()#]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /\b(https?):\/\/(\w|\d){3}\.(\w+|\d+)\.(\w|\d){3}\/\b/,
        error: `Please enter a valid full URL (${placeholder.urlhttp}).`,
      },
      urlpart: {
        keys: /[a-zA-Z0-9.;,/?:@&=+$-_!~*'()#]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /\b[\w+|\d+|\W+\/]*\.[\w+|\d+|\W+]{0,5}\b/,
        error: `Please enter a valid partial url (${placeholder.urlpart}).`,
      },
      hostname: {
        keys: /[a-zA-Z0-9.;,/?:@&=+$-_!~*'()#]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /\b(.){1,}\.(\w+|\d+)\.(.){3}\b/,
        error: `Please enter a valid hostname (${placeholder.host}).`,
      },
      domain: {
        keys: /[a-zA-Z0-9.;,/?:@&=+$-_!~*'()#]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /\b(\w+|\d+)\.(.){3}\b/,
        error: `Please enter a valid domain name (${placeholder.domain}).`,
      },
      ip: {
        keys: /[0-9]|\.|Tab|Backspace/,
        value: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
        error: `Please enter a valid IP address (${placeholder.ip}).`,
      },
      timestamp: {
        keys: /[0-9]|\/|:|Tab|Backspace|ArrowLeft|ArrowRight/,
        value:
          /^(1[0-2]|0[0-9])\/(0[0-9]|1[0-9]|2[0-9]|3[0-1])\/([0-9]{4})\s(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])[\.][0-9]{3}$/,
        error: `Please enter a valid timestamp value (${placeholder.timestamp}).`,
      },
      datemmddyyyy: {
        keys: /[0-9]|\/|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^(1[0-2]|0[0-9])\/(0[0-9]|1[0-9]|2[0-9]|3[0-1])\/([0-9]{4})$/,
        error: `Please enter a valid date (${placeholder.datemmddyyyy}).`,
      },
      dateyyyymmdd: {
        keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^([0-9]{4})\-(1[0-2]|0[0-9])\-(0[0-9]|1[0-9]|2[0-9]|3[0-1])$/,
        error: `Please enter a valid date (${placeholder.dateyyyymmdd}).`,
      },
      routing: {
        keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d{9}$/,
        error: `Please enter a valid ABA Routing number (${placeholder.routing}).`,
      },
      cc: {
        keys: /[0-9]|Space|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d{4} \d{4} \d{4} \d{4}$/,
        error: `Please enter a valid credit card number (${placeholder.cc}).`,
      },
      cvv: {
        keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d{3,4}$/,
        error: `Please enter a valid CVV (${placeholder.cvv}).`,
      },
      ssn: {
        keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d{3}-\d{2}-\d{4}$/,
        error: `Please enter a valid SSN (${placeholder.ssn}).`,
      },
      parcel: {
        keys: /[0-9]|-|\.|Space|Tab|Backspace|ArrowLeft|ArrowRight/,
        value: /^\d{2}-\d{3}-\d{2}-\d{2}-\d{3}\.\d{2}\s{1}\d{2}$/,
        error: `Please enter a valid parcel number (${placeholder.parcel})`,
      },
    };
  const initialize = () => {
    const forms = document.querySelectorAll("form"); //select all forms on the page
    forms.forEach((form) => {
      const inputs = form.querySelectorAll(
        "input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea",
      );
      for (let i = 0; i < inputs.length; i++) {
        addCounter();
      }
      inputs.forEach((input) => {
        const { type, dataset } = input;
        const { type: dataType } = dataset;
        const resolvedType =
          (dataType || type) === "true"
            ? (dataType || type).toLowerCase()
            : (dataType || type).toLowerCase(); //favor dataset value over native type (to allow for applying 'custom' application of formSubmit checks)
        if (
          ![
            "file",
            "image",
            "hidden",
            "select-one",
            "select-multiple",
            "radio",
            "checkbox",
          ].includes(resolvedType)
        ) {
          !input.placeholder && (input.placeholder = placeholder[resolvedType]); //defaults to native placeholder value over store placeholder
          if (resolvedType === "ssn") input.type = "password"; //add native html type to mask enter values on ssn fields
          addMultipleEventListeners(
            input,
            ["input", "change", "blur"],
            handleInput,
          );
          input.addEventListener("keydown", handleInputKeys);
        }
        if (["file", "image"].includes(resolvedType)) {
          addMultipleEventListeners(
            input,
            ["input", "change", "blur"],
            handleFileInput,
          );
        }
        if (["select-one", "select-multiple"].includes(resolvedType)) {
          addMultipleEventListeners(
            input,
            ["input", "change", "blur"],
            handleSelect,
          );
        }
        if (resolvedType === "radio") {
          input.addEventListener("change", controlRadios); //Forces only 1 radio selection, checkboxes should be used for multiselect
          addMultipleEventListeners(
            input,
            ["input", "blur"],
            handleRadiosCheckboxes,
          );
        }
        if (resolvedType === "checkbox") {
          addMultipleEventListeners(
            input,
            ["input", "change", "blur"],
            handleRadiosCheckboxes,
          );
        }
      });
      form.addEventListener("submit", handleFormSubmit);
    });
  };
  ///////////////////////////Public Methods/////////////////////////////////////////////
  //Returns all valid form fields (for use with multi-form pages)
  self.checkAllValidity = () => {
    const forms = document.querySelectorAll("form");
    const validInputs = [];
    const invalidInputs = [];
    forms.forEach((form) => {
      const inputs = form.querySelectorAll(
        "input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea",
      );
      inputs.forEach((input) => {
        const { type, dataset } = input;
        const { type: dataType } = dataset;
        const resolvedType =
          (dataType || type).toLowerCase() === "true"
            ? "text"
            : (dataType || type).toLowerCase();
        types[resolvedType].value.test(input.value)
          ? validInputs.push(input)
          : invalidInputs.push(input);
      });
    });
    console.group("Valid Inputs:");
    validInputs.forEach((el) => console.info(el, el.value));
    console.groupEnd("Valid Inputs:");
    console.group("Invalid Inputs:");
    invalidInputs.forEach((el) => console.error(el, el.value));
    console.groupEnd("Invalid Inputs:");
    return;
  };
  //Checks a single input for validity or a single form
  self.isValid = (el) => {
    const tag = el.tagName;
    const type =
      (el.dataset.type || el.type).toLowerCase() === "true"
        ? "text"
        : (el.dataset.type || el.type).toLowerCase();
    if (tag === "FORM") {
      //Allows for passing in an entire FORM tag and validating all inputs where as checkAllValidity checks all forms on the page
      const inputs = el.querySelectorAll(
        "input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea",
      );
      inputs.forEach((input) => {
        const { required, name } = input;
        const isValid = this.isValid(input);
        isValid
          ? console.log(
              `Input Name: ${name}\r\nInput Type: ${type}\r\nRequired: ${required}\r\nisValid: ${isValid}`,
            )
          : console.error(
              `Input Name: ${name}\r\nInput Type: ${type}\r\nRequired: ${required}\r\nisValid: ${isValid}`,
            );
      });
      return;
    } else {
      return !type
        ? console.error(
            `Invalid Element Type: ${tag}\r\nValid input elements only`,
          )
        : ["select-one", "select-multiple"].includes(type)
        ? handleSelect(el, true)
        : ["radio", "checkbox"].includes(type)
        ? handleRadiosCheckboxes(el, true)
        : !["select-one", "select-multiple"].includes(type)
        ? handleInput(el, true)
        : false;
    }
  };
  //Need to create a function that dynamically removes all eventlisteners and reapplied them, generic clear all then run init again should work
  self.reinitialize = () => {
    initCount = 0;
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      const inputs = form.querySelectorAll(
        "input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea",
      );
      inputs.forEach((input) => removeAllEventListeners(input));
      form.removeEventListener("submit", handleFormSubmit);
    });
    initialize();
  };
  ///////////////////////////Private Methods/////////////////////////////////////////////
  ///////////////////////////Handlers///////////////////////////////////////////////////
  const handleFormSubmit = (e) => {
    finalCount = 0; //reset count
    const inputs = e.target.querySelectorAll(
      "input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea",
    ); //selects all form input elements
    inputs.forEach((input) => (input.value = input.value.trim())); //Trims leading and trailing spaces
    document.querySelectorAll("form").forEach((form) => {
      finalCount += form.querySelectorAll(
        "input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea",
      ).length;
    });
    Array.from(inputs).filter((input) => !formSubmit.isValid(input)).length >
      0 && initCount === finalCount
      ? e.preventDefault()
      : null;
  };
  const handleSelect = (e, cb = null) => {
    const input = e.target || e; //allows for event driven and passing in entire elements
    const { type } = input.dataset || input; //favor dataset value over native type (to allow for applying 'custom' application of formSubmit checks)
    const { required } = input;
    const val = Array.from(input.children)
      .filter((child) => child.selected)
      .map((child) => child.value.trim())
      .join(",");
    const valid = required ? (val ? true : false) : true;
    if (!valid && !cb) {
      if (!input.parentNode.querySelector(errClassSelector)) {
        appendErrEl(input);
      } //if there is no error message field, create it
      const inputErrorField = input.parentNode.querySelector(errClassSelector); //finds to appropriate error field
      inputErrorField.textContent = input.dataset.error || types[type].error;
    }
    if (valid && !cb) {
      if (input.parentNode.querySelector(errClassSelector)) {
        input.parentNode.querySelector(errClassSelector).remove();
      } //Remove the error field if there is no error, reduces impact to CSS
    }
    if (cb) return valid ? true : false;
  };
  //Each radio/checkbox and its label should be wrapped in an element for ADA compliance i.e. <div><radio/><radio/></div>
  const handleRadiosCheckboxes = (e, cb = null) => {
    const target = e.target || e; //allows for event driven and passing in entire elements
    const { type } = target.dataset || target; //favor dataset value over native type (to allow for applying 'custom' application of formSubmit checks)
    //checked for radios contained in 1 element or contained in multiple wrapping elements
    const controlGroup =
      target.parentNode.parentNode.tagName.toLowerCase() !== "form" &&
      target.parentNode.parentNode.querySelectorAll(`input[type=${type}]`)
        .length !== 0
        ? target.parentNode.parentNode.querySelectorAll(`input[type=${type}]`)
        : target.parentNode.querySelectorAll(`input[type=${type}]`);
    const container =
      target.parentNode.parentNode.tagName.toLowerCase() !== "form" &&
      target.parentNode.parentNode.querySelectorAll(`input[type=${type}]`)
        .length !== 0
        ? target.parentNode.parentNode
        : target.parentNode;
    const isRequired = Array.from(controlGroup).find((el) => el.required)
      ? true
      : false; //Checks if any of the group has a required attribute
    const valid = isRequired
      ? Array.from(controlGroup).filter((el) => el.checked === true).length > 0
        ? true
        : false
      : true; //if required is present on any element in the group, check that a selection is made
    if (!valid && !cb) {
      if (!container.querySelector(errClassSelector)) {
        appendErrEl(container, type);
      }
      const inputErrorField = container.querySelector(errClassSelector);
      inputErrorField.textContent = target.dataset.error || types[type].error;
    }
    if (valid && !cb) {
      if (container.querySelector(errClassSelector)) {
        container.querySelector(errClassSelector).remove();
      } //Remove the error field if there is no error, reduces impact to CSS
    }
    if (cb) return valid;
  };
  //Locks radio groups to only 1 selection
  const controlRadios = (e) => {
    const target = e.target || e; //allows for event driven and passing in entire elements
    //checked for radios contained in 1 element or contained in multiple wrapping elements
    const radioGroup =
      target.parentNode.parentNode.tagName.toLowerCase() !== "form" &&
      target.parentNode.parentNode.querySelectorAll("input[type=radio]")
        .length !== 0
        ? target.parentNode.parentNode.querySelectorAll("input[type=radio]")
        : target.parentNode.querySelectorAll("input[type=radio]");
    //Forces only one radio selection for each group of radio buttons
    Array.from(radioGroup)
      .filter((el) => el !== target)
      .forEach((el) => (el.checked = false));
  };
  //Validates against a regex for the input type, if it doesn't pass the check, returns the error message
  const handleInput = (e, cb = null) => {
    const input = e.target || e; //allows for event driven and passing in entire elements
    const inputType =
      (input.dataset.type || input.type) === "true"
        ? "text"
        : input.dataset.type || input.type; //favor dataset value over native type (to allow for applying 'custom' application of formSubmit checks)
    const isNull = input.value.trim().length === 0; //Checks if a value was entered
    const { required } = input;
    if (!cb) {
      if (!input.parentNode.querySelector(errClassSelector)) {
        appendErrEl(input);
      } //if there is no error message field, create it
      const inputErrorField = input.parentNode.querySelector(errClassSelector); //finds to appropriate error field
      const { error: errMsg } = input.dataset || types[inputType];
      //console.log(inputErrorField, errMsg)
      required && isNull
        ? (inputErrorField.textContent = errMsg) //if required and has no value
        : required && !isNull && !types[inputType].value.test(input.value)
        ? (inputErrorField.textContent = errMsg) //if required and has an invalid value
        : !required && !isNull && !types[inputType].value.test(input.value)
        ? (inputErrorField.textContent = errMsg)
        : (inputErrorField.textContent = ""); //if not required but has an invalid value
      //Remove the error field if there is no error, reduces impact to CSS
      if (inputErrorField.textContent === "") inputErrorField.remove();
    }
    if (cb)
      return required && isNull
        ? false
        : required && !isNull && !types[inputType].value.test(input.value)
        ? false
        : !required && !isNull && !types[inputType].value.test(input.value)
        ? false
        : true;
  };
  const handleFileInput = (e, cb = null) => {
    const input = e.target || e;
    const acceptedTypes = input.accept
      ? input.accept.split(",").map((type) => type.trim())
      : "*";
    const { required } = input;
    const regexCheck = [];
    if (!cb) {
      if (!input.parentNode.querySelector(errClassSelector)) {
        appendErrEl(input);
      } //if there is no error message field, create it
      const inputErrorField = input.parentNode.querySelector(errClassSelector); //finds to appropriate error field
      const { error: errMsg } = input.dataset || types.file;
      if (input.files.length > 0) {
        const files = input.files;
        const fileTypeErr = [];
        for (const file of files) {
          const { name, type } = file;
          const isValidType =
            acceptedTypes === "*" || acceptedTypes[0] === "*"
              ? true
              : acceptedTypes.some((atype) =>
                  atype.endsWith("/*")
                    ? type.startsWith(atype.slice(0, -2))
                    : type.includes(atype.replace(".", "")),
                );
          !isValidType &&
            fileTypeErr.push(
              `${name} - Invalid file type, ${type.toLowerCase()}.`,
            );
          regexCheck.push(types.file.value.test(name));
        }
        required && input.files.length === 0
          ? (inputErrorField.textContent = errMsg)
          : required && input.files.length > 0 && fileTypeErr.length > 0
          ? (inputErrorField.textContent = fileTypeErr.join("\r\n"))
          : !required && input.files.length > 0 && fileTypeErr.length > 0
          ? (inputErrorField.textContent = fileTypeErr.join("\r\n"))
          : (inputErrorField.textContent = "");
        if (fileTypeErr.length > 0) input.value = "";
      }
      inputErrorField.textContent === "" && inputErrorField.remove();
    }
    if (cb)
      return required && input.files.length === 0
        ? false
        : required && input.files.length > 0 && !regexCheck.includes(false)
        ? false
        : !required && input.files.length > 0 && !regexCheck.includes(false)
        ? false
        : true;
  };
  //Based on input type, limits what keys are allowed
  const handleInputKeys = (e) => {
    const key = e.keyCode === 32 ? "Space" : e.key; //get the key code from the event
    ///////Need to write code to handle copy and paste shortcuts
    const type =
      (e.target.dataset.type || e.target.type) === "true"
        ? "text"
        : e.target.dataset.type || e.target.type; //sets the input type
    if (!types[type].keys.test(key)) {
      e.preventDefault();
    } //passes key code through regex of allowed keys, if not allowed, no action is taken
  };
  ///////////////////////////Helper Functions///////////////////////////////////////////////////
  //Counts all inputs on load and compares count on final to protect against injection
  const addCounter = () => initCount++;
  //Add Multiple event listeners with 1 call
  const addMultipleEventListeners = (el, eTypes, listener) => {
    eTypes.forEach((eType) => {
      el.addEventListener(eType, listener);
    });
  };
  const removeAllEventListeners = (input) => {
    const events = ["keydown", "input", "change", "blur"];
    const handlers = [
      handleInputKeys,
      handleInput,
      handleFileInput,
      handleSelect,
      handleRadiosCheckboxes,
      controlRadios,
    ];
    for (let i = 0; i < events.length; i++) {
      for (let j = 0; j < handlers.length; j++) {
        input.removeEventListener(events[i], handlers[j]);
      }
    }
  };
  //If there is no client side error field, create one and add as a sibling to input
  const appendErrEl = (el, isRadioCheckbox = false) => {
    const div = document.createElement("div"); //Create a div element
    div.classList = "errortext"; //applies class to div element
    !isRadioCheckbox
      ? el.insertAdjacentElement("afterend", div)
      : el.appendChild(div); //places the div element next to its respective input
  };
  document.addEventListener("DOMContentLoaded", initialize); //initializes formSubmit on document load
  if (document.readyState === "complete") {
    initialize();
  } //allows for defer/"lazy" loading
})();
