import React, { PropTypes }       from 'react';
import FormControl                from 'react-bootstrap/lib/FormControl';
import { timeToInt, timeFromInt } from 'time-number';

const propTypes = {
  end:          PropTypes.string,
  format:       PropTypes.number,
  initialValue: PropTypes.any,
  onChange:     PropTypes.func,
  start:        PropTypes.string,
  step:         PropTypes.number,
  value:        PropTypes.any,
};

function TimePicker({
  end           = '23:59',
  format        = 12,
  initialValue  = '00:00',
  onChange      = () => {},
  start         = '00:00',
  step          = 30,
  value         = null,
  ...rest,
}) {
  function generateFormattedTime(time) {
    const ret = timeFromInt(time);

    if (format === 24) {
      return ret;
    }

    const found = ret.match(/^(\d+):/);
    const hour  = parseInt(found[1], 10);

    if (hour < 12) {
      return `${ret} AM`;
    } else if (hour === 12) {
      return `${ret} PM`;
    }

    const newHour = hour < 22 ? `0${hour - 12}` : (hour - 12).toString();

    return `${ret.replace(/^\d+/, newHour)} PM`;
  }

  function generateTimeRange() {
    const times = [];
    const iend  = timeToInt(end);

    for (let i = timeToInt(start); i < iend; i += step * 60) {
      times.push(i);
    }

    return times;
  }

  function listTimeOptions() {
    return generateTimeRange().map((unformattedTime) => {
      const formattedTime = generateFormattedTime(unformattedTime);

      return {
        key: unformattedTime,
        val: formattedTime,
      };
    });
  }

  const currentValue  = timeToInt(value || initialValue);
  const options       = listTimeOptions().map(({ key, val }) => (
    <option key={key} value={key}>
      {val}
    </option>
  ));

  return (
    <FormControl
      componentClass  = 'select'
      onChange        = {(e) => { onChange(e.target.value); }}
      value           = {currentValue}
      {...rest}
    >
      {options}
    </FormControl>
  );
}

TimePicker.propTypes = propTypes;

export default TimePicker;
