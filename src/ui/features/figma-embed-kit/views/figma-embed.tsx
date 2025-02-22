import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

const FigmaEmbed = forwardRef<
  ElementRef<'iframe'>,
  ComponentPropsWithoutRef<'iframe'>
>(({ ...rest }, ref) => {
  return <iframe ref={ref} {...rest} />;
});
FigmaEmbed.displayName = 'FigmaEmbed';

export { FigmaEmbed };
