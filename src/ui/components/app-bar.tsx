import { Text } from 'figma-kit';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react';
import { Progress } from '~/ui/components/progress';
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
      className={cn(
        'w-full flex-col gap-y-4 bg-component text-oncomponent ',
        className
      )}
      {...rest}
    >
      <AppBarContainer className='flex flex-nowrap items-center gap-x-1 min-h-12 text-current'>
        {leading ? (
          <div className='min-h-4 min-w-4 shrink-0 text-current'>{leading}</div>
        ) : null}
        <Text className='shrink whitespace-pre-wrap text-wrap text-large font-strong text-current'>
          {title}
        </Text>
        {actions ? (
          <div className='shrink-0 ml-auto flex items-center gap-x-4 min-h-4 min-w-4 text-current'>
            {actions}
          </div>
        ) : null}
      </AppBarContainer>

      {children}
    </header>
  );
});
AppBar.displayName = 'AppBar';

const AppBarContainer = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, children, ...rest }, ref) => {
  return (
    <div ref={ref} className={cn('px-4 w-full', className)} {...rest}>
      {children}
    </div>
  );
});
AppBarContainer.displayName = 'AppBarContainer';

const AppBarProgressInfoFooter = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'> & {
    progressValue: number;
  }
>(({ progressValue, children, className, ...rest }, ref) => {
  return (
    <div ref={ref} className={cn('mt-4', className)} {...rest}>
      {children ? (
        <AppBarContainer className='flex justify-end'>
          <Text className='text-oncomponent-secondary'>{children}</Text>
        </AppBarContainer>
      ) : null}
      <Progress className='rounded-none' value={progressValue} />
    </div>
  );
});
AppBarProgressInfoFooter.displayName = 'AppBarProgressInfoFooter';

export { AppBar, AppBarContainer, AppBarProgressInfoFooter };
