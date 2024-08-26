import {feedReducer} from "./reducer";
import {DataDefault} from "../redux/store";
import {wsConnecting, wsOnClose, wsOnError, wsOnMessage} from "./actions";


describe('FEED REDUCER', () => {

  it('initial state', () => {
    expect(feedReducer(undefined, {}))
        .toEqual(DataDefault.feed)
  })

  it('wsConnecting', () => {
    expect(
        feedReducer(DataDefault.feed, wsConnecting)
    ).toEqual({
        ...DataDefault.feed,
        status: 'loading',
        error: null,
        wasClean: null,
    });
  });

  it('wsOnError', () => {
      const errText = 'Some error text';

    expect(
        feedReducer(DataDefault.feed, wsOnError(errText))
    ).toEqual({
        ...DataDefault.feed,
        status: 'error',
        error: errText,
        orders: [],
        success: false,
    });
  });

  it('wsOnClose', () => {
      const payload = {
          wasClean: false,
          code: 302,
      };

    expect(
        feedReducer(DataDefault.feed, wsOnClose(payload))
    ).toEqual({
        ...DataDefault.feed,
        ...payload,
        status: 'closed',
    });
  });

  it('wsOnMessage:0', () => {
      const payload = {
          orders: [],
          total: 0,
          totalToday: 0,
      };

    expect(
        feedReducer(DataDefault.feed, wsOnMessage(payload))
    ).toEqual({
        ...DataDefault.feed,
        ...payload,
        status: 'idle',
        success: false,
    });
  });

  it('wsOnMessage:2', () => {
      const payload = {
          orders: [{id: 1}, {id: 2}],
          total: 2,
          totalToday: 2,
      };

    expect(
        feedReducer(DataDefault.feed, wsOnMessage(payload))
    ).toEqual({
        ...DataDefault.feed,
        ...payload,
        status: 'idle',
        success: true,
    });
  });

})
