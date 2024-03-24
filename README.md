# FormSubmit - Basic Form Control

This is a client-side form input control and validation library. Built in typescript and compiled with tsc and rollup.
The idea behind this library is to make input control and validation as native as possible for developers utilizing as many native HTML attributes as possible.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

To get started with formSubmit, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/sbcguard/formSubmit.git
```

2. Make any necessary type attribute changes.
3. Rebuild with:

```bash
npm run build
```

4. Utilize the csj, esm, or umd modules at a page level by placing a script tag in the head tag of the page.

```html
<script type="text/javascript" src="path/to/formSubmit.js"></script>
```

Alternately, you can use the prebuilt versions provided in the '/dist' folder of the repository.

## Usage

formSubmit.js will key off of native HTML 'type' attribute to apply controls on page load, the HTML required attribute to require non-null (blank) input. For non-native type, apply the 'data-type' dataset attribute to the element to use a custom defined type.<br/>

Attached to the window object are 3 methods:

1. window.isValid() - Pass in any html input element to check its validity.
2. window.checkAllValidity() - Check the validity of all inputs on all forms present on the page and returns the results to the console.
3. window.reinitialize() - Resets form submit. This is for use when the DOM has been programmatically changed and needs to be re-applied.

## License

Simple Markdown Editor is [MIT licensed](./LICENSE).
