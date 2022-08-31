import React, { useEffect, useRef } from 'react'
import s from './SuperRange.module.css'

type SuperDoubleRangePropsType = {
  onChangeRange?: (values: [number, number]) => void
  value: [number, number]
  range: [number, number]
  // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = ({ onChangeRange, value, range }) => {
  let minVal = value[0]
  let maxVal = value[1]
  if (minVal >= maxVal) minVal = maxVal

  const ref: any = useRef(null)

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${minVal + 1}%`
      ref.current.style.width = `${maxVal - minVal}%`
    }
  }, [minVal, maxVal])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (ref.current) {
      ref.current.style.width = `${maxVal - minVal}%`
    }
  }, [maxVal, minVal])

  return (
    <div className={s.container}>
      <input
        min={range[0]}
        max={range[1]}
        type="range"
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1)
          if (onChangeRange) {
            onChangeRange([value, maxVal])
          }
        }}
        className={`${s.thumb} ${s.thumbLeft}`}
      />
      <input
        type="range"
        min={range[0]}
        max={range[1]}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1)
          if (onChangeRange) {
            onChangeRange([minVal, value])
          }
        }}
        className={`${s.thumb} ${s.thumbRight}`}
      />
      <div className={s.slider}>
        <div className={s.sliderTrack} />
        <div ref={ref} className={s.sliderRange} />
      </div>
    </div>
  )
}

export default SuperDoubleRange
