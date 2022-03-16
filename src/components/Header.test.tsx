import React from 'react';
import { render } from '@testing-library/react';

import Header from './Header';

describe('Header test', () => {
  test('Should render the specified label and header tag', () => {
    const label = 'This is a header';

    const { getByText, getByRole } = render(<Header>{label}</Header>);

    const header = getByRole('banner');

    expect(getByText(label)).toBeInTheDocument();
    expect(header).toBeInTheDocument();
  });
});
