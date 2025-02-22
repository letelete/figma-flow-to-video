import { Text } from 'figma-kit';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '~/ui/utils/styles';

const ExportFlowPreviewCard = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'> & { isLoading?: boolean }
>(({ className, isLoading, children, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex w-full rounded-large bg-secondary aspect-video overflow-hidden relative items-center justify-center',
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <Text className='absolute z-0 opacity-60'>Loading preview...</Text>
      ) : null}

      {children}
    </div>
  );
});
ExportFlowPreviewCard.displayName = 'ExportFlowPreviewCard';

export { ExportFlowPreviewCard };
