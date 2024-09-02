import passwordSlice, {passwordDefault} from "./password-slice";
import {DataDefault} from "./store";

let defaultState;
beforeEach(() => {
    defaultState = DataDefault.password;
});

test('PASSWORD INITIAL STATE', () => {
    expect(passwordSlice(undefined, {type: 'unknown'}))
        .toEqual(defaultState);
});

test('PASSWORD DEFAULT', () => {
    expect(passwordSlice(defaultState, passwordDefault()))
        .toEqual(DataDefault.password);
});
