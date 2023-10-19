'use client'
import React, { useState, useRef, useEffect, useCallback} from 'react';
import styles from './Snowfall.module.css';
import Snowflake from '@/public/snowflakeRegular.svg'
import Image from 'next/image'

export const Snow = () => {

  const [ snowflakes, setSnowflakes ] = useState([] as any)
  const createSnowflake = () => {
    const size = Math.random() * 15 + 2;
    const left = Math.random() * window.innerWidth;
    const opacity = Math.max(0, Math.random() - 0.2);
    const animationDuration = Math.random() * 12 + 3;

    return {
      size,
        left,
        opacity,
        animationDuration,
        ref: React.createRef(),
    }

  }
  const generateSnowflake = useCallback(() => {
    const newSnowflakes = Array.from({length : 5 }, createSnowflake)
      setSnowflakes((snowflakes: any) => [...snowflakes, ...newSnowflakes])

  }
  , [])



  //ref array for snowflakes
  useEffect(() => {
    generateSnowflake()
   
  }, [generateSnowflake])

  useEffect(() => {
    if (snowflakes.length < 100) {
      setTimeout(() => {
        generateSnowflake()
      }, 2000)
    }
  }, [snowflakes, generateSnowflake])
  
  return (
    <div className={styles.snowfallContainer}>
      {snowflakes.map((snowflake: any, i: number) => {

        return (
          <div
            key={i}
            className={styles.snowflake}
            ref={snowflake.ref}
            style={{
              left: `${snowflake.left}px`,
              opacity: `${snowflake.opacity}`,
              animationDuration: `${snowflake.animationDuration}s`,
              transform: `translateY(${snowflake.translateY}px)`,
            }}
          >
            <Image
              src={Snowflake}
              alt="Snowflake"
              width={snowflake.size}
              height={snowflake.size}
            />
          </div>
        );
      })}
    </div>
  );
};
