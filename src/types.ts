export type FormInput = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type PlaceholderObject = { [key: string]: string };
export type InputControlObject = { [key: string]: { keys: RegExp; value: RegExp; error: string } };
export type FormInputEvent = Event | InputEvent | FocusEvent | KeyboardEvent;
