# formSubmit

This is a client-side form input control and validation library.
The idea behind this library is to make input control and validation as native as possible for developers utilizing as many native HTML attributes as possible.

# Implementation

To apply the form controls, load the script at the page level in a script tag. The library will key off of native HTML type attribute for apply controls, the HTML required attribute
to require non-null (blank) input. For non-native type, apply the data-type dataset attribute to the element to use a custom defined type.

Basic template for data-type type attribute:
'type attribute name': {
keys: regex value for allowed keys,
value: regex value for allowed value format
error: default error message
}

Please feel free to leave any comments with some pointer or suggestions for improvements.
