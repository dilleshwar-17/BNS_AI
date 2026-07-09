/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';

interface StreamingTextProps {
  text: string;
  onComplete?: () => void;
  speed?: number; // base speed per character in ms
}

export default function StreamingText({ text, onComplete, speed = 8 }: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const textRef = useRef(text);
  const onCompleteRef = useRef(onComplete);

  // Keep refs up-to-date
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setDisplayedText('');
    setIsDone(false);

    let currentIndex = 0;
    let timerId: NodeJS.Timeout | null = null;

    const tick = () => {
      const fullText = textRef.current;
      if (currentIndex < fullText.length) {
        const nextChar = fullText[currentIndex];
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;

        // Staggered frame delay calculation:
        // Punctuation (., ?, !) gets a slightly longer pause, spaces get a minor pause, normal letters are fast
        let delay = speed;
        if (['.', '?', '!'].includes(nextChar)) {
          delay = speed * 6; // Noticeable breath at the end of sentences
        } else if ([',', ';', ':'].includes(nextChar)) {
          delay = speed * 3.5; // Short pause on commas
        } else if (nextChar === '\n') {
          delay = speed * 5; // Pause on paragraph break
        } else if (nextChar === ' ') {
          delay = speed * 1.2; // Minor space stagger
        } else {
          // Add small random jitter (+/- 15% of base speed) to look organically streamed
          delay = speed * (0.85 + Math.random() * 0.3);
        }

        timerId = setTimeout(tick, delay);
      } else {
        setIsDone(true);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    };

    // Begin streaming
    timerId = setTimeout(tick, speed);

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [text, speed]);

  return (
    <span className="font-sans text-sm leading-relaxed whitespace-pre-wrap relative text-slate-200">
      {displayedText}
      {!isDone && (
        <span 
          className="inline-block w-2 h-4 ml-1 bg-sky-400 rounded-sm align-middle animate-pulse shadow-[0_0_10px_#38bdf8,0_0_20px_#0284c7] border border-sky-300/50"
          style={{
            animationDuration: '0.8s',
          }}
        />
      )}
    </span>
  );
}
