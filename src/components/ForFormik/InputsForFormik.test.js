/* eslint-disable no-undef */
import React from 'react';
import { Form, Formik } from 'formik';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectForFormik } from './index';

const renderWithWrapper = (children) => {
  return <Formik>{() => <Form>{children}</Form>}</Formik>;
};
const options = [
  { name: 'employee' },
  { name: 'junior' },
  { name: 'middle' },
  { name: 'senior' }
];
describe('events', () => {
  it('select options', async () => {
    const { getByRole, getByText, debug } = render(
      renderWithWrapper(<SelectForFormik options={options} />)
    );
    userEvent.selectOptions(getByRole('combobox'), 'employee');
    expect(getByText(/employee/i).selected).toBeTruthy();
    userEvent.selectOptions(getByRole('combobox'), 'junior');
    expect(getByText(/junior/i).selected).toBeTruthy();
    userEvent.selectOptions(getByRole('combobox'), 'middle');
    expect(getByText(/middle/i).selected).toBeTruthy();
    userEvent.selectOptions(getByRole('combobox'), 'senior');
    expect(getByText(/senior/i).selected).toBeTruthy();
    debug();
  });
});
