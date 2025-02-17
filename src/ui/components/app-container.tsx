import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '~/ui/utils/styles';

const AppContainer = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex w-full flex-col p-4 gap-y-4', className)}
      {...rest}
    >
      {children}
    </div>
  );
});
AppContainer.displayName = 'AppContainer';

export { AppContainer };
