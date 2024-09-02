import popupSlice, {popupShow, popupHide} from"./popup-slice";
import {DataDefault} from './store';


let defaultState;
beforeEach(() => {
  defaultState = DataDefault.popup;
});


test('POPUP INITIAL STATE', () => {
  expect(popupSlice(undefined, {type: 'unknown'}))
      .toEqual(defaultState);
});

test('POPUP SHOW', () => {
  const data = {
    data: {},
    title: 'Детали ингредиента',
  } ;
  const equalState = {
    ...data,
    show: true,
  };

  expect(popupSlice(defaultState, popupShow({...data})))
      .toEqual(equalState);
});

test('POPUP HIDE', () => {
  expect(popupSlice(defaultState, popupHide()))
      .toEqual(DataDefault.popup);
});
