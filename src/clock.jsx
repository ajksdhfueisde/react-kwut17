import React, { useState, useEffect } from 'react'
import moment from 'moment'
import './clock.scss'

export default function Clock({ timezone }) {
  const now = timezone ? moment().utcOffset(timezone) : moment();
  const [time, setTime] = useState(now.format('HH:mm:ss'));
  const [date, setDate] = useState(now.format('yyyy-MM-DD'));
  const [hourDeg, setHourDeg] = useState(0);
  const [minuteDeg, setMinuteDeg] = useState(0);
  const [secondDeg, setSecondDeg] = useState(0);


  const updateUI = (_now) => {
    setTime(_now.format('HH:mm:ss'))
    setDate(_now.format('yyyy-MM-DD'));

    const hour = _now.hour() >= 12 ? _now.hour() - 12 : _now.hour();
    setHourDeg(hour * 30 + (_now.minute() / 2));
    setMinuteDeg(_now.minute() * 6 + (_now.second() / 10));
    setSecondDeg(_now.second() * 6);
  }

  useEffect(() => {
    const _now = timezone ? moment().utcOffset(timezone) : moment();
    updateUI(_now);
    const timer = setInterval(() => {
      const _now = timezone ? moment().utcOffset(timezone) : moment();
      updateUI(_now);
    }, 500)
    return () => {
      clearInterval(timer);
    }
  }, [timezone])

  return (
    <div className="widget" style={{ background: 'rgb(51, 102, 255)', color: '#fff', textAlign: 'center',padding:'0px' }}>
      <div className="clock">
        {Array.apply(null, { length: 12 }).map((a, b) => <div key={b} className={`scale scale-${b + 1}`} />)}

        <div className="clock-hour-hand"
        style={{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`, transitionDuration: 0 < hourDeg && hourDeg <= 59 * 6 ? '0.4s' : '0s' }}></div>
        <div className="clock-minute-hand"
        style={{ transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)`, transitionDuration: 0 < minuteDeg && minuteDeg <= 59 * 6 ? '0.4s' : '0s' }}></div>
        <div className="clock-second-hand" style={{ transform: `translate(-50%, -100%) rotate(${secondDeg}deg)` }}></div>
        <div className="clock-second-tail" style={{ transform: `translate(-50%, 0) rotate(${secondDeg}deg)` }}></div>
      </div>
      <h2>{time}</h2>
      <div>(UTC {timezone ? timezone : moment().format('Z')})</div>
      <div>{date}</div>
      {/* <div>{moment().zone}</div> */}
    </div>
  )
}
