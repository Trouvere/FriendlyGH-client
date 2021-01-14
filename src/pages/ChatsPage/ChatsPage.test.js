/* eslint-disable no-undef */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import axios from 'axios';
import ChatsPageContainer from './index';
import store from '../../store/store';

jest.mock('axios');
const hits = [
  {
    id: 'eSport1',
    name: 'Godel Foosball & XBOX Club',
    link: 'https://join.skype.com/lCmJBppwMZAC',
    messenger: 'skype'
  },
  {
    id: 'eSport2',
    name: 'Godel Counter-strike 192.168.5.203',
    link: 'https://join.skype.com/mOJxNUfBggrc',
    messenger: 'skype'
  },
  {
    id: 'gambling1',
    name: 'Покер',
    link: 'https://join.skype.com/oFXjvhkYVk5m',
    messenger: 'skype'
  },
  {
    id: 'gambling2',
    name: 'Brest Poker',
    link: 'https://join.skype.com/blachtVBJr2x',
    messenger: 'skype'
  },
  {
    id: 'gender1',
    name: 'Dudes',
    link: 'https://join.skype.com',
    messenger: 'skype'
  },
  {
    id: 'gender2',
    name: 'Girls',
    link: 'https://join.skype.com',
    messenger: 'skype'
  }
];

const renderWithWrapper = (children) => (
  <Provider store={store}>{children}</Provider>
);
describe('ChatsPageContainer', () => {
  it('renders buttons in chats page', () => {
    render(renderWithWrapper(<ChatsPageContainer />));
    expect(screen.getByText(/all chats/i)).toBeInTheDocument();
    expect(screen.getByText(/telegram/i)).toBeInTheDocument();
    expect(screen.getByText(/skype/i)).toBeInTheDocument();
    expect(screen.queryByText(/add chat/i)).toBeNull();
  });
  it('renders buttons in chats page', async () => {
    const promise = Promise.resolve({ hits });
    await axios.get.mockImplementationOnce(() => promise);
    const { debug } = act(() =>
      render(renderWithWrapper(<ChatsPageContainer />))
    );
    await act(() => promise);
    expect(await screen.findByText(/Godel Foosball &/i)).toBeInTheDocument();
    debug();
    expect(screen.getByText(/girls/i)).toBeInTheDocument();
  });
});
