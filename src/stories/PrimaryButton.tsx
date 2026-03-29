import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './primary-button.css';

export type StoodioButtonSize = 'small' | 'medium' | 'large';
export type StoodioButtonShape = 'rounded' | 'pill' | 'square';

export interface PrimaryButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  size?: StoodioButtonSize;
  shape?: StoodioButtonShape;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  dropdown?: ReactNode;
  children: ReactNode;
}

const sizeClass = {
  small: 'stoodio-primary-button--size-small',
  medium: 'stoodio-primary-button--size-medium',
  large: 'stoodio-primary-button--size-large',
} as const;

const shapeClass = {
  rounded: 'stoodio-primary-button--shape-rounded',
  pill: 'stoodio-primary-button--shape-pill',
  square: 'stoodio-primary-button--shape-square',
} as const;

/** Bouton rempli — équivalent composant Figma *Button / Primary*. */
export function PrimaryButton({
  size = 'medium',
  shape = 'rounded',
  iconLeft,
  iconRight,
  dropdown,
  children,
  className = '',
  type = 'button',
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={[
        'stoodio-primary-button',
        sizeClass[size],
        shapeClass[shape],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {iconLeft ? (
        <span className="stoodio-primary-button__icon" aria-hidden>
          {iconLeft}
        </span>
      ) : null}
      <span className="stoodio-primary-button__label">{children}</span>
      {iconRight ? (
        <span className="stoodio-primary-button__icon" aria-hidden>
          {iconRight}
        </span>
      ) : null}
      {dropdown ? (
        <span className="stoodio-primary-button__dropdown" aria-hidden>
          {dropdown}
        </span>
      ) : null}
    </button>
  );
}
