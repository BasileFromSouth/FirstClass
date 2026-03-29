import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './secondary-button.css';

import type { StoodioButtonShape, StoodioButtonSize } from './PrimaryButton';

export interface SecondaryButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  size?: StoodioButtonSize;
  shape?: StoodioButtonShape;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  dropdown?: ReactNode;
  children: ReactNode;
}

const sizeClass = {
  small: 'stoodio-secondary-button--size-small',
  medium: 'stoodio-secondary-button--size-medium',
  large: 'stoodio-secondary-button--size-large',
} as const;

const shapeClass = {
  rounded: 'stoodio-secondary-button--shape-rounded',
  pill: 'stoodio-secondary-button--shape-pill',
  square: 'stoodio-secondary-button--shape-square',
} as const;

/** Bouton outlines — équivalent composant Figma *Button Secondary*. */
export function SecondaryButton({
  size = 'medium',
  shape = 'rounded',
  iconLeft,
  iconRight,
  dropdown,
  children,
  className = '',
  type = 'button',
  ...rest
}: SecondaryButtonProps) {
  return (
    <button
      type={type}
      className={[
        'stoodio-secondary-button',
        sizeClass[size],
        shapeClass[shape],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {iconLeft ? (
        <span className="stoodio-secondary-button__icon" aria-hidden>
          {iconLeft}
        </span>
      ) : null}
      <span className="stoodio-secondary-button__label">{children}</span>
      {iconRight ? (
        <span className="stoodio-secondary-button__icon" aria-hidden>
          {iconRight}
        </span>
      ) : null}
      {dropdown ? (
        <span className="stoodio-secondary-button__dropdown" aria-hidden>
          {dropdown}
        </span>
      ) : null}
    </button>
  );
}
