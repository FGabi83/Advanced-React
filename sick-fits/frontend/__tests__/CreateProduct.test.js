import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import Router from 'next/router'; // we will mock this
import wait from 'waait';
import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from '../components/CreateProduct';
import { fakeItem, makePaginationMocksFor } from '../lib/testUtils';
import { ALL_PRODUCTS_QUERY } from '../components/Products';

const item = fakeItem();

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

describe('<CreateProduct/>', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('handles the updating', async () => {
    // 1. render the from out
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    // 2. type into the boxes
    await userEvent.type(screen.getByPlaceholderText(/name/i), item.name);
    await userEvent.type(
      screen.getByPlaceholderText(/price/i),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText(/description/i),
      item.description
    );
    // 3. check that those boxes are populated
    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });
  it('creates the item when the form is submitted', async () => {
    // create the mocks for this one
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: item.name,
            description: item.description,
            image: '',
            price: item.price,
          },
        },
        result: {
          data: {
            createProduct: {
              ...item, // all fake item fiedls
              id: 'abc123',
              __typename: 'Product',
            },
          },
        },
      },
      {
        request: {
          query: ALL_PRODUCTS_QUERY,
          variables: {
            skip: 0,
            first: 2,
          },
        },
        result: {
          data: {
            allProducts: [item], // could be an array of items, but just one is fine for the test}
          },
        },
      },
    ];
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <CreateProduct />
      </MockedProvider>
    );
    // type into the boxes
    await userEvent.type(screen.getByPlaceholderText(/name/i), item.name);
    await userEvent.type(
      screen.getByPlaceholderText(/price/i),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText(/description/i),
      item.description
    );
    // submit the form
    await userEvent.click(screen.getByText('+ Add Product'));
    await waitFor(() => wait(0));
    expect(Router.push).toHaveBeenCalled();
    expect(Router.push).toHaveBeenCalledWith({ pathname: '/product/abc123' });
  });
});
