import React from 'react';
import { render } from '@testing-library/react';

import Card from './Card';

describe('Card test', () => {
  test('Should render the specified content and title', () => {
    const title = 'This is a title';
    const content = 'This is a content';

    const { getByText, getByRole } = render(<Card title={title}>{content}</Card>);

    const h2 = getByRole('heading', { name: title });

    expect(getByText(content)).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });
});
