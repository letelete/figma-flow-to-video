import { Text } from 'figma-kit';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react';
import { cn } from '~/ui/utils/styles';

const AppBar = forwardRef<
  ElementRef<'header'>,
  ComponentPropsWithoutRef<'header'> & {
    leading?: ReactNode;
    title?: ReactNode;
    actions?: ReactNode;
  }
>(({ leading, title, actions, children, className, ...rest }, ref) => {
  return (
    <header
      ref={ref}
      className={cn('w-full flex-col gap-y-4 bg-component', className)}
      {...rest}
    >
      <div className='flex flex-nowrap items-center gap-x-1 min-h-12 px-4'>
        {leading ? (
          <div className='min-h-4 min-w-4 shrink-0'>{leading}</div>
        ) : null}
        <Text className='shrink whitespace-pre-wrap text-wrap text-large font-strong'>
          {title}
        </Text>
        {actions ? (
          <div className='shrink-0 ml-auto flex items-center gap-x-4 min-h-4 min-w-4'>
            {actions}
          </div>
        ) : null}
      </div>

      {children}
    </header>
  );
});
AppBar.displayName = 'AppBar';

export { AppBar };
