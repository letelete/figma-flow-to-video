import { Loader } from 'lucide-react';
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { cn } from '~/ui/utils/styles';

type Size = 'lg' | 'md' | 'sm' | 'xl' | 'xs';

const sizeToClass: Record<Size, string> = {
  xl: 'h-10 w-10',
  lg: 'h-8 w-8',
  md: 'h-6 w-6',
  sm: 'h-5 w-5',
  xs: 'h-4 w-4',
};

interface LoaderContainerProps extends ComponentPropsWithoutRef<'div'> {
  size: Size;
}

const LoaderContainer = forwardRef<ElementRef<'div'>, LoaderContainerProps>(
  ({ children, className, size, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(sizeToClass[size], className)}
        aria-label='Loading...'
        role='status'
        {...rest}
      >
        {children}
      </div>
    );
  }
);
LoaderContainer.displayName = 'LoaderContainer';

interface SpokeSpinningLoaderProps extends Partial<LoaderContainerProps> {
  size?: Size;
}

const SpokeSpinningLoader = forwardRef<
  ElementRef<typeof LoaderContainer>,
  SpokeSpinningLoaderProps
>(({ className, size = 'md', ...rest }, ref) => {
  return (
    <LoaderContainer
      ref={ref}
      className={cn('text-current', className)}
      size={size}
      {...rest}
    >
      <Loader className='animate-spin size-full text-current' />
    </LoaderContainer>
  );
});
SpokeSpinningLoader.displayName = 'SpokeSpinningLoader';

export { SpokeSpinningLoader };
