import React from 'react';
import renderer from 'react-test-renderer';

import AppLoader from "./app-loader";

it('Loader status: [loading]', () => {
  const statusLoading = renderer
      .create(<AppLoader status={'loading'} />)
      .toJSON();
  expect(statusLoading).toMatchSnapshot();
});

it('Loader status: [error]', () => {
  const statusError = renderer
      .create(<AppLoader status={'error'} />)
      .toJSON();
  expect(statusError).toMatchSnapshot();
});

it('Loader status: [idle]', () => {
  const statusIdle = renderer
      .create(<AppLoader status={'idle'} />)
      .toJSON();
  expect(statusIdle).toMatchSnapshot();
});
