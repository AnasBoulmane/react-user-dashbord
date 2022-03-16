import React from 'react';
import { render } from '@testing-library/react';
import { advanceTo, clear } from 'jest-date-mock';

import WelcomeBanner from './WelcomeBanner';

describe('WelcomeBanner test', () => {
  afterAll(() => {
    clear(); // reset to date time.
  });

  test('Should render an H1', () => {
    const { getByRole } = render(<WelcomeBanner />);
    const h1 = getByRole('heading');
    expect(h1).toBeInTheDocument();
  });

  test('Should render morning greetings at 00AM', () => {
    advanceTo(new Date(2022, 3, 16, 0, 0, 0)); // set to date time.
    expect(new Date().getHours()).toBe(0);
    const { getByText } = render(<WelcomeBanner />);
    expect(getByText('Good morning, Proexe Inc. 👋')).toBeInTheDocument();
  });

  test('Should render morning greetings at 11AM', () => {
    advanceTo(new Date(2022, 3, 16, 11, 0, 0)); // set to date time.
    expect(new Date().getHours()).toBe(11);
    const { getByText } = render(<WelcomeBanner />);
    expect(getByText('Good morning, Proexe Inc. 👋')).toBeInTheDocument();
  });

  test('Should render afternoon greetings at 01PM', () => {
    advanceTo(new Date(2022, 3, 16, 13, 0, 0)); // set to date time.
    expect(new Date().getHours()).toBe(13);
    const { getByText } = render(<WelcomeBanner />);
    expect(getByText('Good afternoon, Proexe Inc. 👋')).toBeInTheDocument();
  });

  test('Should render afternoon greetings at 10PM', () => {
    advanceTo(new Date(2022, 3, 16, 22, 0, 0));
    expect(new Date().getHours()).toBe(22);
    const { getByText } = render(<WelcomeBanner />);
    expect(getByText('Good afternoon, Proexe Inc. 👋')).toBeInTheDocument();
  });
});
