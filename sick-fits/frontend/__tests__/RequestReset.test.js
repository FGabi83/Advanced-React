import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';

const email = 'test@example.com';
const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: {
        email,
      },
    },
    result: {
      data: { sendUserPasswordResetLink: null },
    },
  },
];

describe('<RequestReset/>', () => {
  it('renders and matches snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('calls the mutation when submitted', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );
    // Type into the email box
    userEvent.type(screen.getByPlaceholderText(/email/i), email);
    // Click the submit button
    userEvent.click(screen.getByText('Request Reset!'));
    const success = await screen.findByText(/success/i);
    screen.debug(success);
    expect(success).toBeInTheDocument();
  });
});
