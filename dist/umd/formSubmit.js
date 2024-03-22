(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FormSubmit = {}));
})(this, (function (exports) { 'use strict';

    const errClassSelector = '.error';
    const inputPlaceholder = {
        color: '#000000',
        date: 'yyyy-mm-dd',
        'datetime-local': 'yyyy-mm-ddThh:mm',
        email: 'user@domain.com',
        file: '',
        image: '',
        month: 'yyyy-mm',
        number: '0',
        password: '',
        range: '0',
        search: 'Begin searching...',
        tel: '(000)000-0000',
        time: 'hh:mm',
        url: 'https://www.domain.com/',
        week: 'yyyy-W00',
        text: '',
        radio: '',
        checkbox: '',
        hidden: '',
        'select-one': 'Choose an option...',
        'select-multiple': 'Choose multiple...',
        textarea: 'Begin typing...',
        alpha: 'Enter alpha characters only...',
        int: '0',
        float: '0.0',
        currency: '0.00',
        zipcode: '00000',
        zip: '00000',
        zip4: '0000',
        zipfull: '00000-0000',
        urlhttp: 'https://www.domain.com/',
        urlpart: 'path/to/resource.txt',
        hostname: 'www.domain.com',
        domain: 'domain.com',
        ip: '0.0.0.0',
        timestamp: 'mm/dd/yyyy hh:mm:ss.ms',
        datemmddyyyy: 'mm/dd/yyyy',
        dateyyyymmdd: 'yyyy-mm-dd',
        routing: '000000000',
        cc: '0000 0000 0000 0000',
        cvv: '000 or 0000',
        ssn: '000-00-0000',
        parcel: '00-000-00-00-000.00 00',
    };
    const inputTypes = {
        color: {
            keys: /[0-9]|#|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^#([0-9a-fA-F]{6})$/,
            error: 'Please select a valid color.',
        },
        date: {
            keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d{4}-\d{2}-\d{2}$/,
            error: `Please enter a valid date (${inputPlaceholder.date}).`,
        },
        'datetime-local': {
            keys: /[0-9]|[T]|:|-|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^([0-9]{4})\-(1[0-2]|0[0-9])\-(0[0-9]|1[0-9]|2[0-9]|3[0-1])T(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/,
            error: `Please enter a valid timestamp (${inputPlaceholder['datetime-local']}).`,
        },
        email: {
            keys: /[a-zA-Z0-9.!#$%&'*+_\/=?^\-`\{\|\}"\(\),:'<>@\[\]\\]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            error: `Please enter a valid email (${inputPlaceholder.email}).`,
        },
        file: {
            keys: /./,
            value: /^(.*)\.[\w+|\d+|\W+]{0,5}$/,
            error: 'Please choose a valid file.',
        },
        image: {
            keys: /./,
            value: /.+/,
            error: 'Please choose a valid image.',
        },
        month: {
            keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d{4}-\d{2}$/,
            error: `Please enter a valid month (${inputPlaceholder.month}).`,
        },
        number: {
            keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d+$/,
            error: 'Please enter a valid number.',
        },
        password: {
            keys: /[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@\[\]\\\^_`\{\|\}~]|Space|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /./,
            error: 'Please enter a valid password.',
        },
        range: {
            keys: /[0-9]/,
            value: /\d+/,
            error: 'Please select a valid value.',
        },
        search: {
            keys: /./,
            value: /.+/,
            error: 'Please enter a valid search string.',
        },
        tel: {
            keys: /[0-9\-()]|Tab|Backspace/,
            value: /^((\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/,
            error: `Please enter a valid telephone number i.e. ${inputPlaceholder.tel}.`,
        },
        time: {
            keys: /[0-9]|:|Tab|Backspace/,
            value: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/,
            error: `Please enter a valid time (${inputPlaceholder.time}).`,
        },
        url: {
            keys: /[a-zA-Z0-9.;,/?:@&=+$-_!~*'()#]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /\b(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]\b/,
            error: `Please enter a valid URL (${inputPlaceholder.url}).`,
        },
        week: {
            keys: /[0-9]|-|W|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d{4}-W\d{2}$/,
            error: `Please enter a valid week (${inputPlaceholder.week}).`,
        },
        text: {
            keys: /./,
            value: /.+/,
            error: 'Please enter valid text only.',
        },
        radio: {
            keys: /./,
            value: /.+/,
            error: 'Please select an option.',
        },
        checkbox: {
            keys: /./,
            value: /.+/,
            error: 'Please select an option',
        },
        hidden: {
            keys: /./,
            value: /.+/,
            error: '',
        },
        'select-one': {
            keys: /./,
            value: /.+/,
            error: 'Please make a valid selection from the dropdown.',
        },
        'select-multiple': {
            keys: /./,
            value: /.+/,
            error: 'Please make valid selections.',
        },
        textarea: {
            keys: /./,
            value: /.+/,
            error: 'Please enter valid text.',
        },
        alpha: {
            keys: /[a-z]|[A-Z]|Space|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\w+$/,
            error: 'Please enter valid text only.',
        },
        int: {
            keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d+$/,
            error: `Please enter a valid whole number (${inputPlaceholder.int}).`,
        },
        float: {
            keys: /[0-9]|\.|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d+\.{1}\d+$/,
            error: `Please enter a valid decimal number (${inputPlaceholder.float}).`,
        },
        currency: {
            keys: /[0-9]|\.|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d+\.{1}\d{2}$/,
            error: `Please enter a valid currency value (${inputPlaceholder.currency}).`,
        },
        zipcode: {
            keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^[0-9]{5}$/,
            error: `Please enter a valid zipcode (${inputPlaceholder.zipcode}).`,
        },
        zip: {
            keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^[0-9]{5}$/,
            error: `Please enter a valid zipcode (${inputPlaceholder.zip}).`,
        },
        zip4: {
            keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^[0-9]{4}$/,
            error: `Please enter a valid zipcode (${inputPlaceholder.zip4}).`,
        },
        zipfull: {
            keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^[0-9]{5}-[0-9]{4}$/,
            error: `Please enter a valid zipcode (${inputPlaceholder.zipfull}).`,
        },
        urlhttp: {
            keys: /[a-zA-Z0-9.;,/?:@&=+$-_!~*'()#]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /\b(https?):\/\/(\w|\d){3}\.(\w+|\d+)\.(\w|\d){3}\/\b/,
            error: `Please enter a valid full URL (${inputPlaceholder.urlhttp}).`,
        },
        urlpart: {
            keys: /[a-zA-Z0-9.;,/?:@&=+$-_!~*'()#]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /\b[\w+|\d+|\W+\/]*\.[\w+|\d+|\W+]{0,5}\b/,
            error: `Please enter a valid partial url (${inputPlaceholder.urlpart}).`,
        },
        hostname: {
            keys: /[a-zA-Z0-9.;,/?:@&=+$-_!~*'()#]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /\b(.){1,}\.(\w+|\d+)\.(.){3}\b/,
            error: `Please enter a valid hostname (${inputPlaceholder.hostname}).`,
        },
        domain: {
            keys: /[a-zA-Z0-9.;,/?:@&=+$-_!~*'()#]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /\b(\w+|\d+)\.(.){3}\b/,
            error: `Please enter a valid domain name (${inputPlaceholder.domain}).`,
        },
        ip: {
            keys: /[0-9]|\.|Tab|Backspace/,
            value: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
            error: `Please enter a valid IP address (${inputPlaceholder.ip}).`,
        },
        timestamp: {
            keys: /[0-9]|\/|:|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^(1[0-2]|0[0-9])\/(0[0-9]|1[0-9]|2[0-9]|3[0-1])\/([0-9]{4})\s(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])[\.][0-9]{3}$/,
            error: `Please enter a valid timestamp value (${inputPlaceholder.timestamp}).`,
        },
        datemmddyyyy: {
            keys: /[0-9]|\/|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^(1[0-2]|0[0-9])\/(0[0-9]|1[0-9]|2[0-9]|3[0-1])\/([0-9]{4})$/,
            error: `Please enter a valid date (${inputPlaceholder.datemmddyyyy}).`,
        },
        dateyyyymmdd: {
            keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^([0-9]{4})\-(1[0-2]|0[0-9])\-(0[0-9]|1[0-9]|2[0-9]|3[0-1])$/,
            error: `Please enter a valid date (${inputPlaceholder.dateyyyymmdd}).`,
        },
        routing: {
            keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d{9}$/,
            error: `Please enter a valid ABA Routing number (${inputPlaceholder.routing}).`,
        },
        cc: {
            keys: /[0-9]|Space|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d{4} \d{4} \d{4} \d{4}$/,
            error: `Please enter a valid credit card number (${inputPlaceholder.cc}).`,
        },
        cvv: {
            keys: /[0-9]|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d{3,4}$/,
            error: `Please enter a valid CVV (${inputPlaceholder.cvv}).`,
        },
        ssn: {
            keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d{3}-\d{2}-\d{4}$/,
            error: `Please enter a valid SSN (${inputPlaceholder.ssn}).`,
        },
        parcel: {
            keys: /[0-9]|-|\.|Space|Tab|Backspace|ArrowLeft|ArrowRight/,
            value: /^\d{2}-\d{3}-\d{2}-\d{2}-\d{3}\.\d{2}\s{1}\d{2}$/,
            error: `Please enter a valid parcel number (${inputPlaceholder.parcel})`,
        },
    };
    const Counter = {
        init: 0,
        final: 0,
    };

    const handleFormSubmit = (ev) => {
        Counter.final = 0;
        if (ev.target) {
            const inputs = Array.from(ev.target.querySelectorAll('input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea'));
            inputs.forEach((input) => input.value && (input.value = input.value.trim()));
            document.querySelectorAll('form').forEach((form) => {
                Counter.final += form.querySelectorAll('input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea').length;
            });
            inputs.filter((input) => !isValid(input)).length > 0 &&
                Counter.init === Counter.final
                ? ev.preventDefault()
                : null;
        }
    };
    const isValid = (el) => {
        const tag = el.tagName.toLowerCase();
        const type = (el.dataset.type || el.type).toLowerCase() === 'true'
            ? 'text'
            : (el.dataset.type || el.type).toLowerCase();
        if (el instanceof HTMLFormElement) {
            const inputs = Array.from(el.querySelectorAll('input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea'));
            let isFormValid = true;
            inputs.forEach((input) => {
                const { required, name } = input;
                const isValidInput = isValid(input);
                isValidInput
                    ? console.log(`Input Name: ${name}\r\nInput Type: ${type}\r\nRequired: ${required}\r\nisValid: ${isValid}`)
                    : console.error(`Input Name: ${name}\r\nInput Type: ${type}\r\nRequired: ${required}\r\nisValid: ${isValid}`);
                if (!isValidInput)
                    isFormValid = false;
            });
            return isFormValid;
        }
        else {
            if (!type) {
                throw new Error(`Invalid Element Type: ${tag}\r\nValid input elements only`);
            }
            return ['select-one', 'select-multiple'].includes(type)
                ? handleSelect(el, true)
                : ['radio', 'checkbox'].includes(type)
                    ? handleRadiosCheckboxes(el, true)
                    : handleInput(el, true);
        }
    };
    const checkAllValidity = () => {
        const forms = document.querySelectorAll('form');
        const validInputs = [];
        const invalidInputs = [];
        forms.forEach((form) => {
            const inputs = Array.from(form.querySelectorAll('input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea'));
            inputs.forEach((input) => {
                const { type, dataset } = input;
                const { type: dataType } = dataset;
                const resolvedType = (dataType || type).toLowerCase() === 'true' ? 'text' : (dataType || type).toLowerCase();
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
    const inputEventHandler = (ev) => {
        const { target } = ev;
        if (target) {
            if (target instanceof HTMLSelectElement)
                handleSelect(target);
            if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
                const { type, dataset } = target;
                const { type: dataType } = dataset;
                const resolvedType = (dataType || type) === 'true'
                    ? (dataType || type).toLowerCase()
                    : (dataType || type).toLowerCase();
                if (['radio', 'checkbox'].includes(resolvedType) &&
                    !(target instanceof HTMLTextAreaElement)) {
                    handleRadiosCheckboxes(target);
                }
                if (['file', 'image'].includes(resolvedType) && !(target instanceof HTMLTextAreaElement))
                    handleFileInput(target);
                if (!['file', 'image', 'hidden'].includes(resolvedType))
                    handleInput(target);
            }
        }
        else {
            throw new Error('No event target found');
        }
    };
    const handleSelect = (input, cb) => {
        const { required, multiple } = input;
        const selections = input.selectedOptions;
        const type = input.dataset.type || input.type || multiple ? 'select-multiple' : 'select-one';
        const val = multiple
            ? Array.from(selections)
                .map((selection) => selection.value)
                .join(',')
            : selections[0].value;
        const valid = required ? (val ? true : false) : true;
        const parent = input.parentNode;
        if (!valid && !cb) {
            if (parent) {
                if (!parent.querySelector(errClassSelector)) {
                    appendErrEl(input);
                }
                const inputErrorField = parent.querySelector(errClassSelector);
                if (inputErrorField) {
                    inputErrorField.textContent = input.dataset.error || inputTypes[type].error;
                }
                else {
                    console.warn(`Error message field not found for Input Name:${input.name}`);
                }
            }
            else {
                throw new Error(`Parent element not found for Input Name:${input.name}`);
            }
            const inputErrorField = input.parentNode.querySelector(errClassSelector);
            if (inputErrorField) {
                inputErrorField.textContent = input.dataset.error || inputTypes[type].error;
            }
            else {
                console.warn(`Error message field not found for Input Name:${input.name}`);
            }
        }
        if (valid && !cb) {
            if (parent) {
                const errFld = parent.querySelector(errClassSelector);
                if (errFld) {
                    errFld.remove();
                }
            }
        }
        if (cb)
            return valid;
        return valid;
    };
    const handleRadiosCheckboxes = (input, cb) => {
        const { type } = input.dataset || input;
        if (!type)
            throw new Error('Invalid HTML detected, type attribute required on input elements.');
        const controlGroup = input?.parentNode?.parentNode?.nodeName.toLowerCase() !== 'form' &&
            input?.parentNode?.parentNode?.querySelectorAll(`input[type=${type}]`).length !== 0
            ? input?.parentNode?.parentNode?.querySelectorAll(`input[type=${type}]`)
            : input.parentNode.querySelectorAll(`input[type=${type}]`);
        const container = input?.parentElement?.parentElement?.nodeName.toLowerCase() !== 'form' &&
            input?.parentElement?.parentElement?.querySelectorAll(`input[type=${type}]`).length !== 0
            ? input.parentElement?.parentElement
            : input.parentElement;
        if (controlGroup && container) {
            const isRequired = Array.from(controlGroup).find((el) => el.required) ? true : false;
            const valid = isRequired
                ? Array.from(controlGroup).filter((el) => el.checked === true).length > 0
                    ? true
                    : false
                : true;
            if (!valid && !cb) {
                if (!container.querySelector(errClassSelector)) {
                    appendErrEl(container, true);
                }
                const inputErrorField = container.querySelector(errClassSelector);
                if (inputErrorField) {
                    inputErrorField.textContent = input.dataset.error || inputTypes[type].error;
                }
                else {
                    console.warn(`Error message field not found for Input Name:${input.name}`);
                }
            }
            if (valid && !cb) {
                const inputErrorField = container.querySelector(errClassSelector);
                if (inputErrorField) {
                    inputErrorField.remove();
                }
            }
            if (cb)
                return valid;
            return valid;
        }
        else {
            throw new Error(`Invalid html formatting at InputName: ${input.name}. Radios/checkboxes must be correctly wrapped with <label> and a container element.\r\n
      I.E. <div>\r\n\t<div>\r\n\t\t<input type="checkbox/radio"/>\r\n\t\t<label>Label Text</label>\r\n\t</div>\r\n\t<div>\r\n\t\t<input type="checkbox/radio"/>\r\n\t\t<label>Label Text</label>\r\n\t</div>\r\n</div>`);
        }
    };
    const controlRadios = (e) => {
        const input = e instanceof Event ? e.target : e;
        const radioGroup = input?.parentNode?.parentNode?.nodeName.toLowerCase() !== 'form' &&
            input?.parentNode?.parentNode?.querySelectorAll('input[type=radio]').length !== 0
            ? input.parentNode?.parentNode?.querySelectorAll('input[type=radio]')
            : input.parentNode.querySelectorAll('input[type=radio]');
        if (radioGroup) {
            Array.from(radioGroup)
                .filter((el) => el !== input)
                .forEach((el) => (el.checked = false));
        }
    };
    const handleInput = (input, cb) => {
        const { type } = input.dataset || input;
        const inputType = type === 'true' ? 'text' : input.dataset.type || input.type;
        const isNull = input.value.trim().length === 0;
        const { required } = input;
        if (!cb) {
            const parent = input.parentNode;
            if (!parent)
                throw new Error(`Parent element not found for Input Name:${input.name}`);
            if (parent) {
                if (!parent.querySelector(errClassSelector)) {
                    appendErrEl(input);
                }
                const inputErrorField = parent.querySelector(errClassSelector);
                if (inputErrorField) {
                    const { error: errMsg } = input.dataset || inputTypes[inputType];
                    if (errMsg) {
                        required && isNull
                            ? (inputErrorField.textContent = errMsg)
                            : required && !isNull && !inputTypes[inputType].value.test(input.value)
                                ? (inputErrorField.textContent = errMsg)
                                : !required && !isNull && !inputTypes[inputType].value.test(input.value)
                                    ? (inputErrorField.textContent = errMsg)
                                    : (inputErrorField.textContent = '');
                    }
                    else {
                        throw new Error(`Error initializing error message value for Input Name: ${input.name}`);
                    }
                    if (inputErrorField.textContent === '')
                        inputErrorField.remove();
                }
                else {
                    throw new Error(`Error initializing error field for Input Name: ${input.name}`);
                }
            }
        }
        if (cb)
            return required && isNull
                ? false
                : required && !isNull && !inputTypes[inputType].value.test(input.value)
                    ? false
                    : !required && !isNull && !inputTypes[inputType].value.test(input.value)
                        ? false
                        : true;
        return required && isNull
            ? false
            : required && !isNull && !inputTypes[inputType].value.test(input.value)
                ? false
                : !required && !isNull && !inputTypes[inputType].value.test(input.value)
                    ? false
                    : true;
    };
    const handleFileInput = (input, cb) => {
        const { type, accept, required, files } = input;
        if (type !== 'file')
            throw new Error(`Invalid input type`);
        if (!accept)
            throw new Error(`Missing accept attribute on file input element. Set accept to '*' to allow all file types.`);
        const acceptedTypes = accept.split(',').map((type) => type.trim());
        const regexCheck = [];
        if (!cb) {
            const parent = input.parentNode;
            if (!parent)
                throw new Error(`Parent element not found for Input Name:${input.name}`);
            if (!parent.querySelector(errClassSelector)) {
                appendErrEl(input);
            }
            const inputErrorField = parent.querySelector(errClassSelector);
            if (!inputErrorField)
                throw new Error(`Error initializing error field for Input Name: ${input.name}`);
            const { error: errMsg } = input.dataset || inputTypes.file;
            if (files) {
                if (files.length > 0) {
                    const fileTypeErr = [];
                    for (const file of Array.from(files)) {
                        const { name, type } = file;
                        const isValidType = acceptedTypes[0] === '*'
                            ? true
                            : acceptedTypes.some((atype) => atype.endsWith('/*')
                                ? type.startsWith(atype.slice(0, -2))
                                : type.includes(atype.replace('.', '')));
                        !isValidType && fileTypeErr.push(`${name} - Invalid file type, ${type.toLowerCase()}.`);
                        regexCheck.push(inputTypes.file.value.test(name));
                    }
                    if (errMsg) {
                        required && files.length === 0
                            ? (inputErrorField.textContent = errMsg)
                            : required && files.length > 0 && fileTypeErr.length > 0
                                ? (inputErrorField.textContent = fileTypeErr.join('\r\n'))
                                : !required && files.length > 0 && fileTypeErr.length > 0
                                    ? (inputErrorField.textContent = fileTypeErr.join('\r\n'))
                                    : (inputErrorField.textContent = '');
                    }
                    else {
                        throw new Error(`Error initializing error message value for Input Name: ${input.name}`);
                    }
                    if (fileTypeErr.length > 0)
                        input.value = '';
                }
                inputErrorField.textContent === '' && inputErrorField.remove();
            }
        }
        if (cb) {
            if (files) {
                return required && files.length === 0
                    ? false
                    : required && files.length > 0 && !regexCheck.includes(false)
                        ? false
                        : !required && files.length > 0 && !regexCheck.includes(false)
                            ? false
                            : true;
            }
        }
    };
    const handleInputKeys = (evt) => {
        const { key, target } = evt;
        if (!target)
            return;
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
            const { dataset } = target;
            const type = (dataset.type || target.type) === 'true' ? 'text' : dataset.type || target.type;
            if (!inputTypes[type].keys.test(key)) {
                evt.preventDefault();
            }
        }
    };
    const appendErrEl = (el, isRadioCheckbox) => {
        const div = document.createElement('div');
        div.classList.add('error');
        !isRadioCheckbox ? el.insertAdjacentElement('afterend', div) : el.appendChild(div);
    };
    const addCounter = () => Counter.init++;
    const addMultipleEventListeners = (el, eTypes) => {
        eTypes.forEach((eType) => {
            el.addEventListener(eType, inputEventHandler);
        });
    };
    const removeAllEventListeners = (input) => {
        const events = ['keydown', 'input', 'change', 'blur'];
        const handlers = [handleInputKeys, inputEventHandler];
        for (let i = 0; i < events.length; i++) {
            for (let j = 0; j < handlers.length; j++) {
                input.removeEventListener(events[i], handlers[j]);
            }
        }
    };
    const initialize = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach((form) => {
            const inputs = Array.from(form.querySelectorAll('input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea'));
            for (let i = 0; i < inputs.length; i++) {
                addCounter();
            }
            inputs.forEach((input) => {
                const { type, dataset } = input;
                const { type: dataType } = dataset;
                const resolvedType = (dataType || type) === 'true'
                    ? (dataType || type).toLowerCase()
                    : (dataType || type).toLowerCase();
                if (!['file', 'image', 'hidden', 'select-one', 'select-multiple', 'radio', 'checkbox'].includes(resolvedType)) {
                    !(input instanceof HTMLSelectElement) &&
                        !input.placeholder &&
                        (input.placeholder = inputPlaceholder[resolvedType]);
                    if (resolvedType === 'ssn')
                        input.setAttribute('type', 'password');
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
                    input.addEventListener('change', controlRadios);
                    addMultipleEventListeners(input, ['input', 'blur']);
                }
                if (resolvedType === 'checkbox') {
                    addMultipleEventListeners(input, ['input', 'change', 'blur']);
                }
            });
            form.addEventListener('submit', handleFormSubmit);
        });
    };
    const reinitialize = () => {
        Counter.init = 0;
        const forms = document.querySelectorAll('form');
        forms.forEach((form) => {
            const inputs = Array.from(form.querySelectorAll('input:not([type=button]):not([type=reset]):not([type=submit]):not([type=image]),select,textarea'));
            inputs.forEach((input) => removeAllEventListeners(input));
            form.removeEventListener('submit', handleFormSubmit);
        });
        initialize();
    };

    async function init() {
        try {
            await new Promise((resolve) => {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => resolve());
                }
                else {
                    resolve();
                }
            });
            initialize();
        }
        catch (error) {
            throw new Error(`${error.message}\r\nFailed to initialize mark down editor.`);
        }
    }
    init();
    window.isValid = isValid;
    window.checkAllValidity = checkAllValidity;
    window.reinitialize = reinitialize;

    exports.init = init;

}));
//# sourceMappingURL=formSubmit.js.map
