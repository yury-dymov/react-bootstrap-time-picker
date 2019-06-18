import React                      from 'react';
import PropTypes                  from 'prop-types';
import FormControl                from 'react-bootstrap/FormControl';
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
  ...rest
}) {
  function generateFormattedTime(time) {
    const ret = timeFromInt(time, false);

    if (format === 24) {
      return ret;
    }

    const found = ret.match(/^(\d+):/);
    const hour  = parseInt(found[1], 10);

    if (hour === 0) {
      return `${ret.replace(/^\d+/, '12')} AM`;
    }

    if (hour < 12) {
      return `${ret} AM`;
    }

    if (hour === 12) {
      return `${ret} PM`;
    }

    const newHour = hour < 22 ? `0${hour - 12}` : (hour - 12).toString();

    return `${ret.replace(/^\d+/, newHour)} PM`;
  }

  function generateTimeRange() {
    const times = [];
    const iend  = timeToInt(end, false);

    for (let i = timeToInt(start, false); i <= iend; i += step * 60) {
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

  const timeOptions   = listTimeOptions();
  const optionWidgets = timeOptions.map(({ key, val }) => (
    <option key={key} value={key}>
      {val}
    </option>
  ));

  let currentValue = value || initialValue;

  try {
    currentValue = timeToInt(currentValue);
  } catch (ex) {
    currentValue = parseInt(currentValue, 10);
  }

  if (!timeOptions.filter(({ key }) => currentValue === key).length) {
    currentValue = timeToInt(start);
  }

  return (
    <FormControl
      as = "select"
      onChange = {(e) => { onChange(parseInt(e.target.value, 10)); }}
      value = {currentValue}
      {...rest}
    >
      {optionWidgets}
    </FormControl>
  );
}

TimePicker.propTypes = propTypes;

export default TimePicker;
