import React, { useEffect, useRef } from 'react'
import s from './SuperRange.module.css'

type SuperDoubleRangePropsType = {
  onChangeRange?: (values: [number, number]) => void
  value?: [number, number]
  // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = ({ onChangeRange, value }) => {
  let minVal = value ? value[0] : 0
  let maxVal = value ? value[1] : 100
  if (minVal >= maxVal) minVal = maxVal

  const range: any = useRef(null)

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (range.current) {
      range.current.style.left = `${minVal + 1}%`
      range.current.style.width = `${maxVal - minVal}%`
    }
  }, [minVal, maxVal])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (range.current) {
      range.current.style.width = `${maxVal - minVal}%`
    }
  }, [maxVal, minVal])

  return (
    <div className={s.container}>
      <input
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
        <div ref={range} className={s.sliderRange} />
      </div>
    </div>
  )
}

export default SuperDoubleRange
