import  React from 'react';
import {act} from 'react';
import {render, screen} from '@testing-library/react';
import StreamedList from "../StreamedList";
import testData from "./testData.json";
import userEvent from '@testing-library/user-event';

test('renders event log header', () => {
  render(<StreamedList alternateUrl={'./testData.json'}/>);
  const linkElement = screen.getByText(/Event Log/i);
  expect(linkElement).toBeInTheDocument();
});

test('shows proper number of lines', async () => {
  render(<StreamedList testData={testData}/>);

  // Use waitFor to wait for the async data to be displayed
  const dataElement = await screen.findByText(/MetricsStore/i);
  expect(dataElement).toBeInTheDocument();

  const lineElements = screen.getAllByTestId('table-line');
  expect(lineElements).toHaveLength(5);
});

test('expands and contracts properly', async () => {
  render(<StreamedList testData={testData}/>);

  // Use waitFor to wait for the async data to be displayed
  const dataElement = await screen.findByText(/MetricsStore/i);
  expect(dataElement).toBeInTheDocument();

  // make sure the preview is showing:
  isShowing('itemPreview-1');

  // now: click the button:
  const secondButton = screen.getByTestId('expander-1');
  checkText('expander-1', '+');

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.click(secondButton);
  });

  isShowing('itemDetail-1');

  // preview should no longer be in the doc; detail should be showing:
  isShowing('itemPreview-1', false);
  checkText('expander-1', '>');
  isShowing('itemDetail-1');

  // ok; now click it again:  preview should show and detail should be hidden:
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.click(secondButton);
  });
  // make sure the preview is showing:
  isShowing('itemPreview-1');
  isShowing('itemDetail-1', false);
  checkText('expander-1', '+');
});

const isShowing = (id: string, shouldBeThere=true) => {
       const preview = screen.queryByTestId(id);
       if (shouldBeThere) {
         expect(preview).toBeInTheDocument();
       } else {
         expect(preview).not.toBeInTheDocument();
       }
};

const checkText = (id: string, expectedText: string) => {
  const element = screen.getByTestId(id); // Replace with your test ID

  // Get the text content of the element
  const content = element.textContent;

  expect(content).toBe(expectedText);
};


