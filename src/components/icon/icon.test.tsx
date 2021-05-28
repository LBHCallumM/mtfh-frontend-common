import React, { useEffect } from 'react';
import { render } from '@testing-library/react';

import { Icon } from './icon';

test('it renders a icon with defaults', () => {
  const { container } = render(
    <Icon viewBox="0 0 200 200">
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );
  expect(container).toMatchSnapshot();
});

test('it renders a icon with inline color', () => {
  const { container } = render(
    <Icon viewBox="0 0 200 200" color="red">
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );
  expect(container).toMatchSnapshot();
});

test('it accepts a ref', () => {
  const callback = jest.fn();
  const Comp = () => {
    const ref = React.createRef<SVGSVGElement>();

    useEffect(() => {
      if (ref.current) {
        callback(ref.current);
      }
    }, [ref]);
    return (
      <Icon ref={ref} viewBox="0 0 200 200">
        <path
          fill="currentColor"
          d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
        />
      </Icon>
    );
  };
  render(<Comp />);
  expect(callback).toBeCalledTimes(1);
});
