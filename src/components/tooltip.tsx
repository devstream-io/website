import { arrow, flip, offset } from '@floating-ui/react-dom';
import {
  useFloating,
  useInteractions,
  useHover,
} from '@floating-ui/react-dom-interactions';
import React, { ReactNode, useRef, useState } from 'react';
import { PropsWithChildren } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Tooltip =
  ({
     content,
     children
   }: PropsWithChildren<{ content?: ReactNode }>) => {
    const arrowRef = useRef(null);
    const [open, setOpen] = useState(false);
    const {
      x,
      y,
      reference,
      floating,
      strategy,
      placement,
      context,
      middlewareData
    } = useFloating({
      open,
      onOpenChange: setOpen,
      placement: 'top',
      middleware: [offset(5), flip(), arrow({ element: arrowRef })],
    });
    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]];
    const { x: arrowX, y: arrowY } = middlewareData?.arrow || {};
    const { getReferenceProps, getFloatingProps } = useInteractions([
      useHover(context),
    ]);
    getReferenceProps({ ref: reference });
    getFloatingProps({ ref: floating });

    return <>
      <AnimatePresence>
        {open && <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'tween', duration: 0.2, ease: 'easeInOut' }}
          className='
        absolute
        top-[0]
        left-[0]
        py-1 px-[10px] bg-primary-500 text-white text-body rounded-[4px]'
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
        >
          {content}
          <div className='absolute bg-primary-500 w-1 h-1 rotate-45'
               style={{
                 left: arrowX != null ? `${arrowX}px` : '',
                 top: arrowY != null ? `${arrowY}px` : '',
                 right: '',
                 bottom: '',
                 [staticSide]: '-4px',
               }}
               ref={arrowRef}/>
        </motion.div>}
      </AnimatePresence>
      <span ref={reference}>{children}</span>
    </>;
  };
