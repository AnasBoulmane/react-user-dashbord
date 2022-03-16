import React from 'react';
import { render } from '@testing-library/react';

import DataTable from './DataTable';

describe('DataTable test', () => {
  test('Should render empty Array and the specified heads', () => {
    const { getByText, getAllByRole, queryByRole } = render(<DataTable data={[]} columns={columns} />);
    columns.forEach(({ name }) => expect(getByText(name)).toBeInTheDocument());
    expect(getAllByRole('columnheader').length).toBe(columns.length);
    expect(queryByRole('cell')).not.toBeInTheDocument();
  });

  test('Should render customers data with the specified heads', () => {
    const { getByText, getByRole, getAllByRole } = render(<DataTable data={customers} columns={columns} />);
    columns.forEach(({ name }) => expect(getByText(name)).toBeInTheDocument());
    expect(getAllByRole('columnheader').length).toBe(columns.length);
    expect(getAllByRole('cell').length).toBe(columns.length * customers.length);

    columns.forEach(({ selector }) => expect(getByRole('cell', { name: selector(customers[0]) })).toBeInTheDocument());
  });
});

const customers = [
  {
    id: '0',
    name: 'Alex Shatov',
    email: 'alexshatov@gmail.com',
    location: 'US',
    spent: '$2,890.66',
  },
  {
    id: '1',
    name: 'Philip Harbach',
    email: 'philip.h@gmail.com',
    location: 'DE',
    spent: '$2,767.04',
  },
  {
    id: '2',
    name: 'Mirko Fisuk',
    email: 'mirkofisuk@gmail.com',
    location: 'FR',
    spent: '$2,996.00',
  },
  {
    id: '3',
    name: 'Olga Semklo',
    email: 'olga.s@cool.design',
    location: 'IT',
    spent: '$1,220.66',
  },
  {
    id: '4',
    name: 'Burak Long',
    email: 'longburak@gmail.com',
    location: 'GB',
    spent: '$1,890.66',
  },
];

const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
  },
  {
    name: 'Email',
    selector: (row) => row.email,
  },
  {
    name: 'Spent',
    selector: (row) => row.spent,
  },
  {
    name: 'Country',
    selector: (row) => row.location,
  },
];
