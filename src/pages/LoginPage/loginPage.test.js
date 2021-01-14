/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './index';
import store from '../../store/store';

const renderWithWrapper = (children) => (
  <Provider store={store}>{children}</Provider>
);
jest.mock('axios');

describe('Login page', () => {
  it('show error message in login form', async () => {
    render(renderWithWrapper(<LoginPage />));
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.queryByText(/Enter your email/i)).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.queryByText(/Enter your password/i)).not.toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);
    fireEvent.focus(passwordInput);
    fireEvent.blur(passwordInput);
    expect(await screen.findByText(/Enter your email/i)).toBeInTheDocument();
    expect(await screen.findByText(/Enter your password/i)).toBeInTheDocument();
  });

  it('show error message in sing up form', async () => {
    render(renderWithWrapper(<LoginPage />));
    const goToSingUpBtn = screen.getByText('SIGN UP');
    userEvent.click(goToSingUpBtn);

    expect(screen.queryByText(/Enter your email/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Enter your password/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please repeat/i)).not.toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByLabelText('Password', {
      selector: 'input'
    });
    const confirmPasswordInput = screen.getByLabelText('Confirm Password', {
      selector: 'input'
    });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();

    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);
    fireEvent.focus(passwordInput);
    fireEvent.blur(passwordInput);
    fireEvent.focus(confirmPasswordInput);
    fireEvent.blur(confirmPasswordInput);

    expect(await screen.findByText(/Enter your email/i)).toBeInTheDocument();
    expect(await screen.findByText(/Enter your password/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please repeat/i)).toBeInTheDocument();

    userEvent.paste(passwordInput, 'asdasdasd');
    expect(passwordInput).toHaveValue('asdasdasd');
    userEvent.paste(confirmPasswordInput, 'asdasdasd1');
    expect(confirmPasswordInput).toHaveValue('asdasdasd1');

    expect(await screen.findByText(/Password's not/i)).toBeInTheDocument();
  });

  it('open sing up, or login form', () => {
    render(renderWithWrapper(<LoginPage />));
    expect(
      screen.queryByPlaceholderText(/Confirm Password/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText('SIGN UP')).toBeInTheDocument();
    const goToSingUpBtn = screen.getByText('SIGN UP');
    userEvent.click(goToSingUpBtn);
    expect(
      screen.getByPlaceholderText(/Confirm Password/i)
    ).toBeInTheDocument();
    const goToLoginBtn = screen.getByText('LOGIN');
    userEvent.click(goToLoginBtn);
    expect(
      screen.queryByLabelText('Confirm Password', {
        selector: 'input'
      })
    ).not.toBeInTheDocument();
  });

  it('async tests error response', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject(new Error()));
    const { findByText } = render(renderWithWrapper(<LoginPage />));
    const emailInput = screen.getByLabelText('Email', {
      selector: 'input'
    });
    const passwordInput = screen.getByLabelText('password', {
      selector: 'input'
    });
    const loginBtn = screen.getByText('LOGIN');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    userEvent.click(loginBtn);

    expect(await screen.findByText(/Enter your email/i)).toBeInTheDocument();
    expect(await screen.findByText(/Enter your password/i)).toBeInTheDocument();

    userEvent.paste(emailInput, 'asdasd@as.ds');
    expect(emailInput).toHaveValue('asdasd@as.ds');

    userEvent.paste(passwordInput, 'asdasdasd1');
    expect(passwordInput).toHaveValue('asdasdasd1');

    userEvent.click(loginBtn);

    const errorMessage = await findByText(/Error on Email or password/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
