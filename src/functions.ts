import { Counter, errClassSelector, inputPlaceholder, inputTypes } from './store';
import { FormInput, FormInputEvent } from './types';
const handleFormSubmit = (ev: SubmitEvent) => {
  Counter.final = 0; //reset count
  if (ev.target) {
    const inputs: FormInput[] = Array.from(
      (ev.target as HTMLFormElement).querySelectorAll(
        'input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea',
      ),
    ); //selects all form input elements
    inputs.forEach((input: FormInput) => input.value && (input.value = input.value.trim())); //Trims leading and trailing spaces
    document.querySelectorAll('form').forEach((form) => {
      Counter.final += form.querySelectorAll(
        'input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea',
      ).length;
    });
    inputs.filter((input: FormInput) => !isValid(input)).length > 0 &&
    Counter.init === Counter.final
      ? ev.preventDefault()
      : null;
  }
};
export const isValid = (el: FormInput | HTMLFormElement): boolean => {
  const tag = el.tagName.toLowerCase();
  (el.dataset.type || el.type).toLowerCase() === 'true'
    ? 'text'
    : (el.dataset.type || el.type).toLowerCase();
  if (el instanceof HTMLFormElement) {
    //Allows for passing in an entire FORM tag and validating all inputs where as checkAllValidity checks all forms on the page
    const inputs: FormInput[] = Array.from(
      el.querySelectorAll(
        'input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea',
      ),
    );
    let isFormValid = true;
    inputs.forEach((input) => {
      const { required, name } = input;
      const type = resolveType(input);
      const isValidInput = isValid(input);
      isValidInput
        ? console.log(
            `Input Name: ${name}\r\nInput Type: ${type}\r\nRequired: ${required}\r\nisValid: ${isValid} \r\nDepricated form-submit-required: ${input.dataset.formSubmitRequired}`,
          )
        : console.error(
            `Input Name: ${name}\r\nInput Type: ${type}\r\nRequired: ${required}\r\nisValid: ${isValid} \r\nDepricated form-submit-required: ${input.dataset.formSubmitRequired}`,
          );
      if (!isValidInput) isFormValid = false;
    });
    return isFormValid;
  } else {
    const type = resolveType(el);
    if (!type) {
      throw new Error(`Invalid Element Type: ${tag}\r\nValid input elements only`);
    }
    return ['select-one', 'select-multiple'].includes(type)
      ? handleSelect(el as HTMLSelectElement, true)
      : ['radio', 'checkbox'].includes(type)
        ? handleRadiosCheckboxes(el as HTMLInputElement, true)
        : handleInput(el as HTMLInputElement, true);
  }
};

export const checkAllValidity = () => {
  const forms = document.querySelectorAll('form');
  const validInputs: FormInput[] = [];
  const invalidInputs: FormInput[] = [];
  forms.forEach((form) => {
    const inputs: FormInput[] = Array.from(
      form.querySelectorAll(
        'input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea',
      ),
    );
    inputs.forEach((input) => {
      const resolvedType = resolveType(input);
      inputTypes[resolvedType].value.test(input.value)
        ? validInputs.push(input)
        : invalidInputs.push(input);
    });
  });
  console.group('Valid Inputs:');
  validInputs.forEach((el) => console.info(el, el.value));
  console.groupEnd();
  console.group('Invalid Inputs:');
  invalidInputs.forEach((el) => console.error(el, el.value));
  console.groupEnd();
  return;
};
const resolveType = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) =>
  (el.dataset.formSubmitRequired || el.dataset.formSubmitOptional || el.dataset.type || el.type) ===
  'true'
    ? 'text'
    : el.dataset.formSubmitRequired || el.dataset.formSubmitOptional || el.dataset.type || el.type;

const inputEventHandler: EventListenerOrEventListenerObject = (ev: FormInputEvent) => {
  const { target } = ev;
  if (target) {
    if (target instanceof HTMLSelectElement) handleSelect(target);
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      const resolvedType = resolveType(target);
      if (
        ['radio', 'checkbox'].includes(resolvedType) &&
        !(target instanceof HTMLTextAreaElement)
      ) {
        handleRadiosCheckboxes(target);
      }
      if (['file', 'image'].includes(resolvedType) && !(target instanceof HTMLTextAreaElement))
        handleFileInput(target);
      if (!['file', 'image', 'hidden'].includes(resolvedType)) handleInput(target);
    }
  } else {
    throw new Error('No event target found');
  }
};
const handleSelect = (input: HTMLSelectElement, cb?: (() => void) | boolean) => {
  const { required, multiple } = input;
  const selections = input.selectedOptions;
  const type = resolveType(input); //favor dataset value over native type (to allow for applying 'custom' application of formSubmit checks)
  const val = multiple
    ? Array.from(selections)
        .map((selection) => selection.value)
        .join(',')
    : selections[0].value;
  const valid = input.dataset.formSubmitRequired || required ? (val ? true : false) : true;
  const parent = input.parentNode;
  if (!valid && !cb) {
    if (parent) {
      if (!parent.querySelector(errClassSelector)) {
        appendErrEl(input);
      } //if there is no error message field, create it
      const inputErrorField = parent.querySelector(errClassSelector); //finds to appropriate error field
      if (inputErrorField) {
        inputErrorField.textContent =
          input.dataset.formSubmitErrorMsg || input.dataset.error || inputTypes[type].error;
      } else {
        console.warn(`Error message field not found for Input Name:${input.name}`);
      }
    } else {
      throw new Error(`Parent element not found for Input Name:${input.name}`);
    }
    const inputErrorField = input.parentNode.querySelector(errClassSelector); //finds to appropriate error field
    if (inputErrorField) {
      inputErrorField.textContent =
        input.dataset.formSubmitErrorMsg || input.dataset.error || inputTypes[type].error;
    } else {
      console.warn(`Error message field not found for Input Name:${input.name}`);
    }
  }
  if (valid && !cb) {
    if (parent) {
      const errFld = parent.querySelector(errClassSelector);
      if (errFld) {
        errFld.remove();
      } //Remove the error field if there is no error, reduces impact to CSS
    }
  }
  if (cb) return valid;
  return valid;
};
//Each radio/checkbox and its label should be wrapped in an element for ADA compliance i.e. <div><radio/><radio/></div>
const handleRadiosCheckboxes = (input: HTMLInputElement, cb?: (() => void) | boolean) => {
  const { type } = input.dataset || input; //favor dataset value over native type (to allow for applying 'custom' application of formSubmit checks)
  if (!type) throw new Error('Invalid HTML detected, type attribute required on input elements.');
  //checked for radios contained in 1 element or contained in multiple wrapping elements
  const controlGroup: NodeListOf<HTMLInputElement> | undefined =
    input?.parentNode?.parentNode?.nodeName.toLowerCase() !== 'form' &&
    input?.parentNode?.parentNode?.querySelectorAll(`input[type=${type}]`).length !== 0
      ? input?.parentNode?.parentNode?.querySelectorAll(`input[type=${type}]`)
      : input.parentNode.querySelectorAll(`input[type=${type}]`);
  const container =
    input?.parentElement?.parentElement?.nodeName.toLowerCase() !== 'form' &&
    input?.parentElement?.parentElement?.querySelectorAll(`input[type=${type}]`).length !== 0
      ? input.parentElement?.parentElement
      : input.parentElement;
  if (controlGroup && container) {
    const isRequired = Array.from(controlGroup).find(
      (el) => el.dataset.formSubmitRequired || el.required,
    )
      ? true
      : false; //Checks if any of the group has a required attribute
    const valid = isRequired
      ? Array.from(controlGroup).filter((el) => el.checked === true).length > 0
        ? true
        : false
      : true; //if required is present on any element in the group, check that a selection is made
    if (!valid && !cb) {
      if (!container.querySelector(errClassSelector)) {
        appendErrEl(container, true);
      }
      const inputErrorField = container.querySelector(errClassSelector);
      if (inputErrorField) {
        inputErrorField.textContent =
          input.dataset.formSubmitErrorMsg || input.dataset.error || inputTypes[type].error;
      } else {
        console.warn(`Error message field not found for Input Name:${input.name}`);
      }
    }
    if (valid && !cb) {
      const inputErrorField = container.querySelector(errClassSelector);
      if (inputErrorField) {
        inputErrorField.remove();
      } //Remove the error field if there is no error, reduces impact to CSS
    }
    if (cb) return valid;
    return valid;
  } else {
    throw new Error(
      `Invalid html formatting at InputName: ${input.name}. Radios/checkboxes must be correctly wrapped with <label> and a container element.\r\n
      I.E. <div>\r\n\t<div>\r\n\t\t<input type="checkbox/radio"/>\r\n\t\t<label>Label Text</label>\r\n\t</div>\r\n\t<div>\r\n\t\t<input type="checkbox/radio"/>\r\n\t\t<label>Label Text</label>\r\n\t</div>\r\n</div>`,
    );
  }
};
//Locks radio groups to only 1 selection
const controlRadios = (e: HTMLInputElement | FormInputEvent) => {
  const input = e instanceof Event ? (e.target as HTMLInputElement) : e; //allows for event driven and passing in entire elements
  //checked for radios contained in 1 element or contained in multiple wrapping elements
  const radioGroup: NodeListOf<HTMLInputElement> | undefined =
    input?.parentNode?.parentNode?.nodeName.toLowerCase() !== 'form' &&
    input?.parentNode?.parentNode?.querySelectorAll('input[type=radio]').length !== 0
      ? input.parentNode?.parentNode?.querySelectorAll('input[type=radio]')
      : input.parentNode.querySelectorAll('input[type=radio]');
  //Forces only one radio selection for each group of radio buttons
  if (radioGroup) {
    Array.from(radioGroup)
      .filter((el) => el !== input)
      .forEach((el) => (el.checked = false));
  }
};
//Validates against a regex for the input type, if it doesn't pass the check, returns the error message
const handleInput = (
  input: HTMLInputElement | HTMLTextAreaElement,
  cb?: (() => void) | boolean,
) => {
  const inputType = resolveType(input); //favor dataset value over native type (to allow for applying 'custom' application of formSubmit checks)
  const isNull = input.value.trim().length === 0; //Checks if a value was entered
  const { required } = input;
  if (!cb) {
    const parent = input.parentNode;
    if (!parent) throw new Error(`Parent element not found for Input Name:${input.name}`);
    if (parent) {
      if (!parent.querySelector(errClassSelector)) {
        appendErrEl(input);
      } //if there is no error message field, create it
      const inputErrorField = parent.querySelector(errClassSelector); //finds to appropriate error field
      if (inputErrorField) {
        const { error: errMsg } = input.dataset || inputTypes[inputType];
        if (errMsg) {
          (input.dataset.formSubmitRequired || required) && isNull
            ? (inputErrorField.textContent = input.dataset.formSubmitErrorMsg || errMsg) //if required and has no value
            : (input.dataset.formSubmitRequired || required) &&
                !isNull &&
                !inputTypes[inputType].value.test(input.value)
              ? (inputErrorField.textContent = input.dataset.formSubmitErrorMsg || errMsg) //if required and has an invalid value
              : !(input.dataset.formSubmitRequired || required) &&
                  !isNull &&
                  !inputTypes[inputType].value.test(input.value)
                ? (inputErrorField.textContent = input.dataset.formSubmitErrorMsg || errMsg)
                : (inputErrorField.textContent = ''); //if not required but has an invalid value
          //Remove the error field if there is no error, reduces impact to CSS
        } else {
          throw new Error(`Error initializing error message value for Input Name: ${input.name}`);
        }
        if (inputErrorField.textContent === '') inputErrorField.remove();
      } else {
        throw new Error(`Error initializing error field for Input Name: ${input.name}`);
      }
    }
  }
  if (cb)
    return (input.dataset.formSubmitRequired || required) && isNull
      ? false
      : (input.dataset.formSubmitRequired || required) &&
          !isNull &&
          !inputTypes[inputType].value.test(input.value)
        ? false
        : !input.dataset.formSubmitRequired &&
            !required &&
            !isNull &&
            !inputTypes[inputType].value.test(input.value)
          ? false
          : true;
  return (input.dataset.formSubmitRequired || required) && isNull
    ? false
    : (input.dataset.formSubmitRequired || required) &&
        !isNull &&
        !inputTypes[inputType].value.test(input.value)
      ? false
      : !input.dataset.formSubmitRequired &&
          !required &&
          !isNull &&
          !inputTypes[inputType].value.test(input.value)
        ? false
        : true;
};
const handleFileInput = (input: HTMLInputElement, cb?: (() => void) | boolean) => {
  const { type, accept, required, files } = input;
  if (type !== 'file') throw new Error(`Invalid input type`);
  if (!accept)
    throw new Error(
      `Missing accept attribute on file input element. Set accept to '*' to allow all file types.`,
    );
  const acceptedTypes = accept.split(',').map((type) => type.trim());
  const regexCheck = [];
  if (!cb) {
    const parent = input.parentNode;
    if (!parent) throw new Error(`Parent element not found for Input Name:${input.name}`);
    if (!parent.querySelector(errClassSelector)) {
      appendErrEl(input);
    } //if there is no error message field, create it
    const inputErrorField = parent.querySelector(errClassSelector); //finds to appropriate error field
    if (!inputErrorField)
      throw new Error(`Error initializing error field for Input Name: ${input.name}`);
    const { error: errMsg } = input.dataset || inputTypes.file;
    if (files) {
      if (files.length > 0) {
        const fileTypeErr = [];
        for (const file of Array.from(files)) {
          const { name, type } = file;
          const isValidType =
            acceptedTypes[0] === '*'
              ? true
              : acceptedTypes.some((atype) =>
                  atype.endsWith('/*')
                    ? type.startsWith(atype.slice(0, -2))
                    : type.includes(atype.replace('.', '')),
                );
          !isValidType && fileTypeErr.push(`${name} - Invalid file type, ${type.toLowerCase()}.`);
          regexCheck.push(inputTypes.file.value.test(name));
        }
        if (errMsg) {
          (input.dataset.formSubmitRequired || required) && files.length === 0
            ? (inputErrorField.textContent = errMsg)
            : (input.dataset.formSubmitRequired || required) &&
                files.length > 0 &&
                fileTypeErr.length > 0
              ? (inputErrorField.textContent = fileTypeErr.join('\r\n'))
              : (!input.dataset.formSubmitRequired || !required) &&
                  files.length > 0 &&
                  fileTypeErr.length > 0
                ? (inputErrorField.textContent = fileTypeErr.join('\r\n'))
                : (inputErrorField.textContent = '');
        } else {
          throw new Error(`Error initializing error message value for Input Name: ${input.name}`);
        }
        if (fileTypeErr.length > 0) input.value = '';
      }
      inputErrorField.textContent === '' && inputErrorField.remove();
    }
  }
  if (cb) {
    if (files) {
      return (input.dataset.formSubmitRequired || required) && files.length === 0
        ? false
        : (input.dataset.formSubmitRequired || required) &&
            files.length > 0 &&
            !regexCheck.includes(false)
          ? false
          : !input.dataset.formSubmitRequired &&
              !required &&
              files.length > 0 &&
              !regexCheck.includes(false)
            ? false
            : true;
    }
  }
};
//Based on input type, limits what keys are allowed
const handleInputKeys: EventListenerOrEventListenerObject = (evt) => {
  const { key, target } = evt as KeyboardEvent; //get the key code from the event
  if (!target) return;
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    ///////Need to write code to handle copy and paste shortcuts
    const type = resolveType(target); //sets the input type
    if (!inputTypes[type].keys.test(key)) {
      evt.preventDefault();
    } //passes key code through regex of allowed keys, if not allowed, no action is taken
  }
};
//If there is no client side error field, create one and add as a sibling to input
const appendErrEl = (el: FormInput | HTMLFormElement | HTMLElement, isRadioCheckbox?: boolean) => {
  const div = document.createElement('div'); //Create a div element
  div.classList.add('attention-text'); //applies class to div element
  !isRadioCheckbox ? el.insertAdjacentElement('afterend', div) : el.appendChild(div); //places the div element next to its respective input
};
//Counts all inputs on load and compares count on final to protect against injection
const addCounter = () => Counter.init++;
//Add Multiple event listeners with 1 call
const addMultipleEventListeners = (el: HTMLElement | FormInput, eTypes: Array<string>) => {
  eTypes.forEach((eType) => {
    el.addEventListener(eType, inputEventHandler);
  });
};
const removeAllEventListeners = (input: FormInput) => {
  const events = ['keydown', 'input', 'change', 'blur'];
  const handlers = [handleInputKeys, inputEventHandler];
  for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < handlers.length; j++) {
      input.removeEventListener(events[i], handlers[j]);
    }
  }
};

//Initialization Functions
export const initialize = () => {
  const forms = document.querySelectorAll('form'); //select all forms on the page
  forms.forEach((form) => {
    const inputs: FormInput[] = Array.from(
      form.querySelectorAll(
        'input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea',
      ),
    );
    for (let i = 0; i < inputs.length; i++) {
      addCounter();
    }
    inputs.forEach((input: FormInput) => {
      const resolvedType = resolveType(input); //favor dataset value over native type (to allow for applying 'custom' application of formSubmit checks)
      if (
        !['file', 'image', 'hidden', 'select-one', 'select-multiple', 'radio', 'checkbox'].includes(
          resolvedType,
        )
      ) {
        !(input instanceof HTMLSelectElement) &&
          !input.placeholder &&
          (input.placeholder = inputPlaceholder[resolvedType]); //defaults to native placeholder value over store placeholder
        if (resolvedType === 'ssn') input.setAttribute('type', 'password'); //add native html type to mask enter values on ssn fields
        addMultipleEventListeners(input, ['input', 'change', 'blur']);
        input.addEventListener('keydown', handleInputKeys);
      }
      if (['file', 'image'].includes(resolvedType)) {
        addMultipleEventListeners(input, ['input', 'change', 'blur']);
      }
      if (['select-one', 'select-multiple'].includes(resolvedType)) {
        addMultipleEventListeners(input, ['input', 'change', 'blur']);
      }
      if (resolvedType === 'radio') {
        input.addEventListener('change', controlRadios); //Forces only 1 radio selection, checkboxes should be used for multiselect
        addMultipleEventListeners(input, ['input', 'blur']);
      }
      if (resolvedType === 'checkbox') {
        addMultipleEventListeners(input, ['input', 'change', 'blur']);
      }
    });
    form.addEventListener('submit', handleFormSubmit);
  });
};
export const reinitialize = () => {
  Counter.init = 0;
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    const inputs: FormInput[] = Array.from(
      form.querySelectorAll(
        'input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea',
      ),
    );
    inputs.forEach((input) => removeAllEventListeners(input));
    form.removeEventListener('submit', handleFormSubmit);
  });
  initialize();
};
