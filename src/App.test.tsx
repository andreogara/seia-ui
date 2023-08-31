import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import { batteryConfigurationMap} from './constants';
import userEvent from '@testing-library/user-event';

test('renders the battery selectors correctly', () => {
  render(<App />);
  const batterySelectors = screen.getByRole("group");
  expect(batterySelectors).toMatchSnapshot();
});

test('updates table of estimates correctly when one selects a battery amount', () => {
  render(<App />);
  const megapackXL = screen.getByLabelText(batteryConfigurationMap[0].name.toUpperCase());
  userEvent.type(megapackXL, "5");
  const table = screen.getByRole("table");
  const estimates = within(table).getAllByRole("row");
  expect(estimates).toMatchSnapshot();
});

test('updates table of estimates correctly when one selects a battery amount', () => {
  render(<App />);
  const megapackXL = screen.getByLabelText(batteryConfigurationMap[0].name.toUpperCase());
  userEvent.type(megapackXL, "5");
  const table = screen.getByRole("table");
  const estimates = within(table).getAllByRole("row");
  expect(estimates).toMatchSnapshot();
});

test('clears the estimate button when reset button is clicked', () => {
  render(<App />);
  const clearButton = screen.getByRole("button", {name: "Reset fields"});
  userEvent.click(clearButton);
  const table = screen.getByRole("table");
  expect(table).toMatchSnapshot();
});

test('generates UI layout depending on selected configuration when appropriate button is clicked', async () => {
  render(<App />);
  const siteMapButton = screen.getByRole("button", {name: "Generate Site Map"});
  userEvent.click(siteMapButton);
  const layout = await screen.findByRole("region", {name: "Site equipment layout"});
  expect(layout).toBeInTheDocument();
});
