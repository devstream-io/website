import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

import Ripple from '@site/static/img/ripple-mark.svg';
import { useParallax } from 'react-scroll-parallax';

const reasons = [
  'Too much effort integrating and maintaining every piece of DevOps?',
  'Difficult (if not impossible) to track who changed what config?',
  'Too much hassle to replace one of your DevOps tools?',
  'Small team, a lot of tools, and way too few DevOps engineers to fully realize your pipelines?',
];

function throttle(fn) {
  let timer = null;
  return function () {
    if (timer === null) {
      timer = setTimeout(() => {
        fn();
        timer = null;
      }, 100);
    }
  };
}

const useFadeIn = ({ startVh, endVh } = { startVh: 100, endVh: 0 }) => {
  const [startScroll, setStartScroll] = useState(0);
  const [endScroll, setEndScroll] = useState(0);
  const bodyHeightRef = useRef(0);
  const { ref } = useParallax({
    translateY: ['100px', '0px'],
    opacity: [0, 1],
    startScroll,
    endScroll,
  });
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) {
        return;
      }
      const bodyTop = document.body.getBoundingClientRect().top;
      const top = ref.current.getBoundingClientRect().top;
      const bodyHeight = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      const distance = Math.abs(top - bodyTop);
      // only update startScroll when the height of body is changed
      if (bodyHeight !== bodyHeightRef.current) {
        bodyHeightRef.current = bodyHeight;
        const start = distance - viewportHeight * (startVh / 100);
        setStartScroll(start);
        setEndScroll(start + viewportHeight * (1 - endVh / 100));
      }
    };
    window.addEventListener('scroll', throttle(handleScroll));
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startScroll]);
  return ref;
};

export const WhyDevStream = () => {
  const fadeInRef1 = useFadeIn({ startVh: 100, endVh: 50 });
  const fadeInRef2 = useFadeIn({ startVh: 100, endVh: 50 });
  const fadeInRef3 = useFadeIn({ startVh: 100, endVh: 80 });
  const fadeInRef4 = useFadeIn({ startVh: 100, endVh: 80 });
  return (
    <section
      className="bg-primary-100 relative overflow-hidden flex flex-col flex-nowrap items-center justify-start
    py-6
    "
    >
      <h3 className="z-10 section-title" ref={fadeInRef1}>
        Why DevStream
      </h3>
      <div ref={fadeInRef2} className="z-10">
        <MsgBox
          className="mx-4 self-stretch flex flex-col flex-nowrap space-y-3
      sm:mx-6 sm:space-y-1
      lg:space-y-[4px] lg:max-w-[1086px] lg:self-center
      "
        >
          {reasons.map((reason) => (
            <Reason key={reason}>{reason}</Reason>
          ))}
        </MsgBox>
      </div>
      <span
        ref={fadeInRef3}
        className="text-heading2 text-primary font-semibold mt-[10px] z-10
      lg:text-[64px] leading-[1.2] lg:mt-3"
      >
        Worry no more.
      </span>
      <span
        ref={fadeInRef4}
        className="text-heading4 text-neutral-600 font-semibold mt-1 z-10
      lg:text-heading1 lg:mt-3
      "
      >
        DevStream will get you covered.
      </span>
      <Ripple
        className="absolute opacity-50 z-0
       right-[-80px] top-[-50px] w-[200px]
       lg:w-[600px] lg:h-[600px] lg:top-[-170px] lg:right-[-200px]"
      />
      <Ripple
        className="absolute opacity-50 z-0 rotate-90
       left-[-70px] bottom-[-80px] w-[200px]
       lg:w-[400px] lg:h-[400px]"
      />
    </section>
  );
};

const MsgBox = ({ children, className }) => {
  return (
    <div
      className={clsx(
        className,
        'bg-white max-w-full rounded-[20px] px-3 py-4 relative mb-3',
        'sm:px-6',
        'lg:px-8 lg:py-[40px]',
        'drop-shadow-xl shadow-lg shadow-primary-light/10'
      )}
    >
      {children}
      <svg
        className="w-4 h-3 -bottom-3 left-1/2 absolute -translate-x-1/2 translate-y-[-1px]
        lg:w-[36px] lg:h-[24px] lg:-bottom-[24px]
        "
        viewBox="0 0 25 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.5 16.4757L24.5 0.475708H0.5L12.5 16.4757Z" fill="white" />
      </svg>
    </div>
  );
};

const Reason = ({ children, className }) => {
  return (
    <div
      className={clsx(
        className,
        'text-neutral-400 text-label14 flex flex-row flex-nowrap justify-start items-center',
        'lg:text-label18'
      )}
    >
      <span className="rounded-full h-[6px] w-[6px] bg-primary block shrink-0 mr-3"></span>
      {children}
    </div>
  );
};
