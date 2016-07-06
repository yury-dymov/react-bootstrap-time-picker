import React, { PropTypes, Component }  from 'react';
import FormControl                      from 'react-bootstrap/lib/FormControl';

import { timeToInt, timeFromInt }       from 'time-number';

import omit                             from 'lodash/omit';
import isNumber                         from 'lodash/isNumber';

class TimePicker extends Component {
  static propTypes = {
    initialValue: PropTypes.any,
    value:        PropTypes.any,
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

  state = { value: null };

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.props });
  }

  handleChange = (e) => {
    const value = parseInt(e.target.value, 10);

    this.setState({ value });
    this.props.onChange(value);
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

    const newHour = hour < 22 ? `0${hour - 12}` : (hour - 12).toString();

    return `${ret.replace(/^\d+/, newHour)} PM`;
  };

  generateTimeRange = () => {
    const times = [];

    const start = timeToInt(this.props.start);
    const end   = timeToInt(this.props.end);

    for (let i = start; i < end; i += this.props.step * 60) {
      times.push(i);
    }

    return times;
  };

  getInt = (val) => {
    if (isNumber(val)) {
      return val;
    }

    return timeToInt(val);
  };

  getValue = (props = this.props) => {
    if (this.state.value) {
      return this.state.value;
    }

    if (props.value) {
      return this.getInt(props.value);
    }

    if (props.initialValue) {
      return this.getInt(props.initialValue);
    }
  };

  render() {
    const currentValue  = this.getValue();
    const rest          = omit(this.props, ['start', 'end', 'step', 'initialValue', 'format', 'onChange', 'value']);

    const options       = this.listTimeOptions().map(({ key, value }, idx) => (
      <option key={idx} value={key}>
        {value}
      </option>
    ));

    return (
      <FormControl
        componentClass  = 'select'
        value           = {currentValue}
        onChange        = {this.handleChange}
        {...rest}
      >
        {options}
      </FormControl>
    );
  }
}

export default TimePicker;
