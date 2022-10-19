import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('I am your test', async () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, App!/i);
  expect(linkElement).toBeInTheDocument();

  const table = screen.getAllByRole('columnheader')

  table.forEach((element) => {
    expect(element).not.toHaveTextContent(/residents/i)
    expect(element).toBeInTheDocument();
  });

  const planets = await screen.findAllByRole('cell', {}, { timeout: 2000 });
  planets.forEach((planet) => {
    expect(planet).toBeInTheDocument();
  });

  const inputFilter = screen.getByRole('textbox');
  expect(inputFilter).toBeInTheDocument();
  const kamino = screen.getByRole('cell', {  name: /kamino/i});
  userEvent.type(inputFilter, 'oo');

  const planetss = await screen.findAllByRole('cell', {}, { timeout: 2000 });

  expect(planetss[0]).toHaveTextContent('Tatooine')
  const naboo = screen.getByRole('cell', {
    name: /naboo/i
  });
  
  expect(naboo).toBeInTheDocument();
  expect(kamino).not.toBeInTheDocument();
});
