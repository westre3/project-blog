'use client';
import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

const CYCLE_TIME = 1000;

function CircularColorsDemo() {
  const [cyclingEnabled, setCyclingEnabled] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const id = React.useId();

  React.useEffect(() => {
    if (cyclingEnabled) {
      const intervalId = window.setInterval(() => {
        setTimeElapsed(curValue => curValue + 1);
      }, CYCLE_TIME);

      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [cyclingEnabled]);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <Card as='section' className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && <motion.div layoutId={id} className={styles.selectedColorOutline} />}
              <div
                className={clsx(styles.colorBox, isSelected && styles.selectedColorBox)}
                style={{
                  backgroundColor: color.value,
                }}>
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={() => {
              cyclingEnabled ? setCyclingEnabled(false) : setCyclingEnabled(true);
            }}>
            {cyclingEnabled ? <Pause /> : <Play />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setCyclingEnabled(false);
              setTimeElapsed(0);
            }}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
