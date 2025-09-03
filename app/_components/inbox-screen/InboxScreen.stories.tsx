
import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  within
} from '@storybook/test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { Provider } from 'react-redux';
import store from '../../_lib/store/store';
import { MockedState } from '../task-list/TaskList.stories';
import InboxScreen from './InboxScreen';

const queryClient = new QueryClient();

const meta = {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [(story) =>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{story()}</Provider>
    </QueryClientProvider>
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof InboxScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
          return HttpResponse.json(MockedState.tasks);
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Waits for the component to transition from the loading state
    await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
    // Waits for the component to be updated based on the store
    await waitFor(async () => {
      // Simulates pinning the first task
      await fireEvent.click(canvas.getByLabelText('pinTask-1'));
      // Simulates pinning the third task
      await fireEvent.click(canvas.getByLabelText('pinTask-3'));
    });
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};
