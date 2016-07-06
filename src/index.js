import React, { PropTypes, Component }  from 'react';
import FormControl                      from 'react-bootstrap/lib/FormControl';

import { timeToInt, timeFromInt }       from 'time-number';

import omit                             from 'lodash/omit';

class TimePicker extends Component {
  static propTypes = {
    initialValue: PropTypes.string,
    start:        PropTypes.string,
    end:          PropTypes.string,
    step:         PropTypes.number,
    format:       PropTypes.number,
    onChange:     PropTypes.func
  };

  static defaultProps = {
    start:        '00:00',
    end:          '23:59',
    initialValue: '00:00',
    step:         30,
    format:       12,
    onChange:     () => {}
  };

  state = { value: this.generateFormattedTime(this.props.initialValue) };

  handleChange = (e) => {
    const { key, value } = e.target;

    this.setState({ value });
    this.props.onChange(key);
  };

  listTimeOptions = () => {
    return this.generateTimeRange().map((unformattedTime) => {
      const formattedTime = this.generateFormattedTime(unformattedTime);

      return {
        key:    unformattedTime,
        value:  formattedTime
      };
    });
  };

  generateFormattedTime = (time) => {
    const ret = timeFromInt(time);

    if (this.props.format === 24) {
      return ret;
    }

    const found = ret.match(/^(\d+):/);
    const hour  = parseInt(found[1], 10);

    if (hour < 12) {
      return `${ret} AM`;
    } else if (hour === 12) {
      return `${ret} PM`;
    }

    const newHour = hour < 10 ? `0${hour}` : hour.toString();

    return `${time.replace(/^(\d+)/, newHour)} PM`;
  };

  generateTimeRange = () => {
    const times = [];

    const start = timeToInt(this.props.start);
    const end   = timeToInt(this.props.end);
    const step  = timeToInt(this.props.step);

    for (let i = start; i < end; i += step * 60) {
      times.push(i);
    }

    return times;
  };


  render() {
    const { value } = this.state;

    const rest      = omit(this.props, ['start', 'end', 'step', 'initialValue', 'format', 'onChange']);

    const options   = this.listTimeOptions().map(({ key, ivalue }) => (
      <option key={key} value={ivalue}>
        {this.generateFormattedTime(key)}
      </option>
    ));

    return (
      <FormControl
        componentClass  = 'select'
        value           = {value}
        onChange        = {this.handleChange}
        {...rest}
      >
        {options}
      </FormControl>
    );
  }
}

export default TimePicker;
