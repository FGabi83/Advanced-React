import { render, screen } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('renders', () => {
    render(<CartCount count={5} />);
  });
  it('matches snapshot', () => {
    const { container } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });
  it('updates via props', async () => {
    const { container, rerender, debug } = render(<CartCount count={11} />);
    expect(container.textContent).toBe('11'); // vanilla JS way to get the text content of the component
    expect(container).toHaveTextContent('11'); // jest-dom way to get the text content of the component
    // update the props
    rerender(<CartCount count="12" />);
    expect(container).toHaveTextContent('1211');
    // wait for __ ms
    await wait(400);
    // await screen.findByText('12');
    expect(container).toHaveTextContent('12');
    expect(container).toMatchSnapshot();
  });
});
