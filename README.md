# react-bootstrap-time-picker
Time Picker with bootstrap flavor

[![react-bootstrap-time-picker](https://github.com/yury-dymov/react-bootstrap-time-picker/raw/master/docs/rbtp.png)](https://github.com/yury-dymov/react-bootstrap-time-picker)

[![npm version](https://img.shields.io/npm/v/react-bootstrap-time-picker.svg?style=flat)](https://www.npmjs.com/package/react-bootstrap-time-picker)
[![Downloads](http://img.shields.io/npm/dm/react-bootstrap-time-picker.svg?style=flat-square)](https://npmjs.org/package/react-bootstrap-time-picker)
[![Build Status](https://img.shields.io/travis/yury-dymov/react-bootstrap-time-picker/master.svg?style=flat)](https://travis-ci.org/yury-dymov/react-bootstrap-time-picker)
[![Coverage Status](https://coveralls.io/repos/github/yury-dymov/react-bootstrap-time-picker/badge.svg?branch=master)](https://coveralls.io/github/yury-dymov/react-bootstrap-time-picker?branch=master)

# Versions
* v2 supports React Bootstrap v1.0.0+
* v1 supports React Bootstrap v0.x.x

# Demo
Demo and playground are available [here](https://yury-dymov.github.io/react-bootstrap-time-picker/)

# Install
```bash
npm i react-bootstrap-time-picker --save
```

# Usage Example
```
import TimePicker from 'react-bootstrap-time-picker';

<TimePicker start="10:00" end="21:00" step={30} />
```

# Configurable Props
*Note*: All props are optional.

## end: string, default "23:59"
Time Picker renders options with range between `start` and `end` time values with `step` (inclusive).

Should be provided in the following format: "HH?(:mm?(:ss?))".

#### Valid examples
"4", "04", "4:0", "04:00", "4:0:0", "04:00:00". All these are equal to "4 hours".

#### Invalid example
"11:00 PM". Should be provided in 24-hour format only

## format: number, default "23:59"
Time Format of rendered options. Supported values: `12` or `24`.

## initialValue: any, default: "00:00"
Initial selected option. Used if `value` prop is either `undefined` or `null`. Can be provided either in "HH?(:mm?(:ss?))" format or as int `(hours * 3600 + minutes * 60 + seconds)`. If `initialValue` is less than `start` property value, then `start` value is used instead.

#### Valid examples
"1:00", "01:00", "3600", 3600

#### Invalid examples
"11:00 PM"

## onChange: func, default: () => {}
Function, which is triggered after one of options is selected. Return selected time in int format: `(hours * 3600 + minutes * 60 + seconds)`.

#### Example
```
class Parent extends React.Component {
  constructor() {
    super();

    this.handleTimeChange = this.handleTimeChange.bind(this);

    this.state = { time: 0 };
  }

  handleTimeChange(time) {
    console.log(time);     // <- prints "3600" if "01:00" is picked
    this.setState({ time });
  }

  render() {
    return <TimePicker onChange={this.handleTimeChange} value={this.state.time} />;
  }
}
```

## start: string, default: "00:00"
See `end` property description.

## step: number, default: 30
Step between time options in minutes. See `end` property description.

## value
Current value. See `initialValue` description.

# Validations
Library doesn't validate provided props much. If you are doing something strange like setting `start="10:00", end="05:00"`, then behavior is undefined, which means that it might render component differently in the future versions. Also underlying library [time-number](https://github.com/yury-dymov/time-number) throws exceptions if provided time is not in a proper format, i.e. `adl` is considered invalid.

# License
MIT (c) Yury Dymov
