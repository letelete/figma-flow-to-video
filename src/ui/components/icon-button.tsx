import {
  IconButton as FGKIT_IconButton,
  TooltipProvider as FGKIT_TooltipProvider,
} from 'figma-kit';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

const IconButton = forwardRef<
  ElementRef<typeof FGKIT_IconButton>,
  ComponentPropsWithoutRef<typeof FGKIT_IconButton>
>(({ ...rest }, ref) => {
  return (
    <FGKIT_TooltipProvider>
      <FGKIT_IconButton ref={ref} {...rest} />
    </FGKIT_TooltipProvider>
  );
});
IconButton.displayName = 'IconButton';

export { IconButton };
