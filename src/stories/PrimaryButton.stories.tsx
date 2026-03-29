import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import figma from '@figma/code-connect';
import { fn } from 'storybook/test';

import { PrimaryButton } from './PrimaryButton';
import type { PrimaryButtonProps } from './PrimaryButton';

/** Must stay in this file (not imported): Storybook/Code Connect parser only matches top-level declarations here. Not exported → ignored as a Storybook story. */
function PrimaryButtonCodeConnectExample({
  children,
  size,
  shape,
  disabled,
  iconLeft,
  iconRight,
  dropdown,
}: Pick<
  PrimaryButtonProps,
  'children' | 'size' | 'shape' | 'disabled' | 'iconLeft' | 'iconRight' | 'dropdown'
>) {
  return (
    <PrimaryButton
      size={size}
      shape={shape}
      disabled={disabled}
      iconLeft={iconLeft}
      iconRight={iconRight}
      dropdown={dropdown}
    >
      {children}
    </PrimaryButton>
  );
}

const meta = {
  title: 'Components/Button/Primary',
  component: PrimaryButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/OslApqcneRIMzWSg0lWSUI/Stoodio?node-id=76-488',
      examples: [PrimaryButtonCodeConnectExample],
      links: [
        {
          name: 'Storybook',
          url: 'http://localhost:6006/?path=/docs/components-button-primary--docs',
        },
      ],
      props: {
        children: figma.string('Label'),
        size: figma.enum('Size', {
          Small: 'small',
          Medium: 'medium',
          Large: 'large',
        }),
        shape: figma.enum('Shape', {
          Rounded: 'rounded',
          Pill: 'pill',
          Square: 'square',
        }),
        disabled: figma.enum('Status', {
          Idle: false,
          Hover: false,
          Focused: false,
          Pressed: false,
          Dragged: false,
          Disabled: true,
        }),
        iconLeft: figma.boolean('Icon L', {
          true: (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <circle cx="8" cy="8" r="4" />
            </svg>
          ),
        }),
        iconRight: figma.boolean('Icon R', {
          true: (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <rect x="5" y="5" width="6" height="6" rx="1" />
            </svg>
          ),
        }),
        dropdown: figma.boolean('Dropdown', {
          true: (
            <span style={{ fontSize: '0.65em', marginLeft: 2 }} aria-hidden>
              ▾
            </span>
          ),
        }),
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    shape: { control: 'select', options: ['rounded', 'pill', 'square'] },
    disabled: { control: 'boolean' },
    iconLeft: { control: false },
    iconRight: { control: false },
    dropdown: { control: false },
  },
  args: {
    children: 'Label',
    size: 'medium',
    shape: 'rounded',
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'small' } };

export const Large: Story = { args: { size: 'large' } };

export const Pill: Story = { args: { shape: 'pill' } };

export const Square: Story = { args: { shape: 'square' } };

export const Disabled: Story = { args: { disabled: true } };

export const WithDropdown: Story = {
  args: {
    dropdown: (
      <span style={{ fontSize: '0.65em', marginLeft: 2 }} aria-hidden>
        ▾
      </span>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    iconLeft: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <circle cx="8" cy="8" r="4" />
      </svg>
    ),
    iconRight: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <rect x="5" y="5" width="6" height="6" rx="1" />
      </svg>
    ),
  },
};
