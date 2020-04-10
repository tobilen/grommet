import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { hpe } from 'grommet-theme-hpe';
import { Add } from 'grommet-icons';

import {
  Grommet,
  Anchor,
  Box,
  Button,
  Text,
  TextInput,
} from '../../components';
import { dark } from '..';

const colors = [
  'accent-1',
  'accent-2',
  'accent-3',
  'brand',
  'dark-1',
  'dark-2',
  'dark-3',
  'dark-4',
  'dark-5',
  'dark-6',
  'focus',
  'light-1',
  'light-2',
  'light-3',
  'light-4',
  'light-5',
  'light-6',
  'neutral-1',
  'neutral-2',
  'neutral-3',
  'status-critical',
  'status-disabled',
  'status-ok',
  'status-unknown',
  'status-warning',
];

const customTheme = {
  global: {
    input: {
      // test backwards compatibility that string value works for input pad
      padding: '12px',
    },
    colors: {
      custom: '#cc6633',
    },
  },
  button: {
    disabled: {
      color: 'red',
      border: {
        color: 'red',
      },
      opacity: 1.0,
    },
  },
};

describe('Grommet', () => {
  test('default theme', () => {
    const component = renderer.create(
      <Grommet>
        {colors.map(color => (
          <Box key={color} background={color}>
            <Text>{color}</Text>
          </Box>
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('dark theme', () => {
    const component = renderer.create(
      <Grommet theme={dark}>
        {colors.map(color => (
          <Box key={color} background={color}>
            <Text>{color}</Text>
          </Box>
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('hpe theme', () => {
    const component = renderer.create(
      <Grommet theme={hpe}>
        {colors.map(color => (
          <Box key={color} background={color}>
            <Text>{color}</Text>
          </Box>
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('custom theme', () => {
    const component = renderer.create(
      <Grommet theme={customTheme}>
        <Box>
          <Anchor icon={<Add />} label="Add" />
          <Anchor icon={<Add />} label="Add" color="custom" />
        </Box>
        <Box background="dark-1">
          <Anchor icon={<Add />} label="Add" />
          <Anchor icon={<Add />} label="Add" color="custom" />
        </Box>
        <Box>
          <TextInput />
        </Box>
        <Box>
          <Button label="button" disabled />
        </Box>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
