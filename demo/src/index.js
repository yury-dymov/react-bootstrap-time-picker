import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import { timeToInt } from 'time-number';
import TimePicker from '../../dist/bundle.js';

class App extends Component {
  constructor() {
    super();

    this.filterState = this.filterState.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);

    this.state = {
      format: 12,
      initialValue: "00:00",
      start: "00:00",
      end: "23:59",
      step: 30,
      onChange: this.handleTimeChange,
    };
  }

  handleTimeChange(value) {
    this.setState({ value });
  }

  filterState() {
    const ret = {...this.state};

    try {
      timeToInt(ret.start);
    } catch(ex) {
      ret.start = "00:00";
    }

    try {
      timeToInt(ret.end);
    } catch(ex) {
      ret.end = "23:59";
    }

    if (ret.step < 1) {
      ret.step = 30;
    }

    return ret;
  }

  render() {
    return (
      <div>
        <div>
          <TimePicker {...this.filterState(this.state)} />
        </div>
        <div style={{ marginTop: '40px' }}>
          <hr />
          <h1>Configurable props</h1>
          <h2>format</h2>
          <div>
            <Button
              children="12"
              disabled={this.state.format === 12}
              onClick={() => { this.setState({ format: 12 }); }}
              style={{ marginRight: '15px' }}
            />
            <Button
              children="24"
              disabled={this.state.format === 24}
              onClick={() => { this.setState({ format: 24 }); }}
            />
          </div>
          <h2>initialValue</h2>
          <FormControl value={this.state.initialValue} onChange={(e) => this.setState({ initialValue: e.target.value })} />
          <h2>value</h2>
          <FormControl value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
          <h2>start</h2>
          <FormControl value={this.state.start} onChange={(e) => this.setState({ start: e.target.value })} />
          <h2>end</h2>
          <FormControl value={this.state.end} onChange={(e) => this.setState({ end: e.target.value })} />
          <h2>step</h2>
          <FormControl value={this.state.step} onChange={(e) => this.setState({ step: parseInt(e.target.value, 10) })} />
          <hr />
          <h2>Reset</h2>
          <Button
            onClick={() => {
              this.setState({
                format: 12,
                initialValue: "00:00",
                start: "00:00",
                end: "23:59",
                step: 30,
                onChange: this.handleTimeChange,
              });
            }}
            style={{ display: 'block' }}
          >
            Reset to initial state
          </Button>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
