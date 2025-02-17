import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const DEFAULT_VIEWBOX = '0 0 24 24';

type Options = {
  path: React.ReactElement;
  displayName?: string;
  viewBox?: string;
};

const icon = cva('block shrink-0 pointer-events-none', {
  variants: {
    size: {
      xs: 'size-4',
      sm: 'size-6',
      md: 'size-8',
      lg: 'size-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type IconElement = React.ElementRef<'svg'>;
type IconProps = React.ComponentPropsWithoutRef<'svg'> &
  VariantProps<typeof icon>;

function createIcon(options: Options) {
  const { path, viewBox = DEFAULT_VIEWBOX, displayName } = options;

  const Component = React.forwardRef<IconElement, IconProps>((props, ref) => {
    const { size, className, ...iconProps } = props;

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        ref={ref}
        viewBox={viewBox}
        className={icon({ className, size })}
        fill='none'
        {...iconProps}
      >
        {path}
      </svg>
    );
  });

  Component.displayName = displayName || 'Icon';

  return Component;
}

export type { IconProps };
export { createIcon };
