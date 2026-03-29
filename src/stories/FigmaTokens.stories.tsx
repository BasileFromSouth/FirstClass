import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { FigmaTokensReference } from './FigmaTokens';

const meta = {
  title: 'Design tokens/Figma',
  component: FigmaTokensReference,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Collections **Primitives / Color** et **Display** du fichier Stoodio, avec valeurs hex résolues depuis Figma.',
      },
    },
  },
} satisfies Meta<typeof FigmaTokensReference>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Collections: Story = {
  name: 'Primitives & Display',
  render: () => <FigmaTokensReference />,
};
