import { InputControlObject, PlaceholderObject } from './types';

export const errClassSelector = '.error';
export const inputPlaceholder: PlaceholderObject = {
  //native html input types except for 'button', 'reset', 'submit'
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
  //custom types define by 'data-type=""'
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
export const inputTypes: InputControlObject = {
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
    error: 'Please select a valid color.',
  },
  date: {
    keys: /[0-9]|-|Tab|Backspace|ArrowLeft|ArrowRight/,
    value: /^\d{4}-\d{2}-\d{2}$/,
    error: `Please enter a valid date (${inputPlaceholder.date}).`,
  },
  'datetime-local': {
    keys: /[0-9]|[T]|:|-|Tab|Backspace|ArrowLeft|ArrowRight/,
    value:
      /^([0-9]{4})\-(1[0-2]|0[0-9])\-(0[0-9]|1[0-9]|2[0-9]|3[0-1])T(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/,
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
    // Allow all for now, can be set to require special characters and minimum length with,
    // note for this regex, testing against it should fail for a valid value as it is looking
    // for the missing requirements to make for a shorter regex (1 upper, 1 lower, 1 special, at least 8 char long)
    // /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/
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
  //custom types define by 'data-type=""' attribute
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
    value:
      /^(1[0-2]|0[0-9])\/(0[0-9]|1[0-9]|2[0-9]|3[0-1])\/([0-9]{4})\s(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])[\.][0-9]{3}$/,
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
export const Counter = {
  init: 0,
  final: 0,
};
