// We don't need to mutate props as TimePicker is stateless component

import React                      from 'react';
import chai, { expect }           from 'chai';
import chaiEnzyme                 from 'chai-enzyme';
import Enzyme, { shallow, mount, render } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { timeToInt }              from 'time-number';
import TimePicker                 from '../dist/bundle';

Enzyme.configure({ adapter: new EnzymeAdapter() });
chai.use(chaiEnzyme());

describe('className and style props are propagated', () => {
  it('className: "temp"', () => {
    const component = render(<TimePicker className="temp" />);

    expect(component).to.have.attr('class').match(/temp/);
  });

  it('style: {{ zIndex: "-9999" }}', () => {
    const component = render(<TimePicker style={{ zIndex: '-9999' }} />);

    expect(component).to.have.attr('style').match(/\-9999/);
  });
});

describe('initialValue and value', () => {
  it('initialValue: 3600 => "3600"', () => {
    const component = render(<TimePicker initialValue={3600} />);

    expect(component.find('option[selected]')).to.have.attr('value').equal("3600");
  });

  it('value: 3600 => "3600"', () => {
    const component = render(<TimePicker value={3600} />);

    expect(component.find('option[selected]')).to.have.attr('value').equal("3600");
  });


  it('initialValue: "undefined", value: "04:00" => 3600 * 4', () => {
    const component = render(<TimePicker value="04:00" />);

    expect(component.find('option[selected]')).to.have.attr('value').equal((4 * 3600).toString());
  });

  it('initialValue: "03:00", value: "04:00" => 3600 * 4', () => {
    const component = render(<TimePicker initialValue="03:00" value="04:00" />);

    expect(component.find('option[selected]')).to.have.attr('value').equal((4 * 3600).toString());
  });

  it('initialValue: "03:00", value: 3600 => 3600', () => {
    const component = render(<TimePicker initialValue="03:00" value={3600} />);

    expect(component.find('option[selected]')).to.have.attr('value').equal("3600");
  });

  it('initialValue: "03:00", value: "3600" => 3600', () => {
    const component = render(<TimePicker initialValue="03:00" value="3600" />);

    expect(component.find('option[selected]')).to.have.attr('value').equal("3600");
  });

  it('initialValue: undefined, value: undefined => "00:00"', () => {
    const component = render(<TimePicker />);

    expect(component.find('option[selected]')).to.have.attr('value').equal("0");
  });

  it('initialValue: undefined, value: undefined, min="03:00" => "03:00"', () => {
    const component = render(<TimePicker start="03:00" />);

    expect(component.find('option[selected]')).to.have.attr('value').equal((3 * 3600).toString());
  });
});

describe('hour format', () => {
  it('format: 12, "00:00" => "12:00 AM"', () => {
    const component = render(<TimePicker />);

    expect(component.find('option[selected]')).to.have.text("12:00 AM");
  });

  it('format: 12, "01:00" => "01:00 AM"', () => {
    const component = render(<TimePicker value="01:00" />);

    expect(component.find('option[selected]')).to.have.text("01:00 AM");
  });

  it('format: 12, "12:00" => "12:00 PM"', () => {
    const component = render(<TimePicker value="12:00" />);

    expect(component.find('option[selected]')).to.have.text("12:00 PM");
  });

  it('format: 12, "13:00" => "01:00 PM"', () => {
    const component = render(<TimePicker value="13:00" />);

    expect(component.find('option[selected]')).to.have.text("01:00 PM");
  });

  it('format: 24, "00:00" => "00:00"', () => {
    const component = render(<TimePicker format={24} />);

    expect(component.find('option[selected]')).to.have.text("00:00");
  });

  it('format: 24, "01:00" => "01:00"', () => {
    const component = render(<TimePicker format={24} value="01:00" />);

    expect(component.find('option[selected]')).to.have.text("01:00");
  });

  it('format: 24, "13:00" => "13:00"', () => {
    const component = render(<TimePicker format={24} value="13:00" />);

    expect(component.find('option[selected]')).to.have.text("13:00");
  });
});

describe('onChange', () => {
  it('onChange is called', () => {
    let testVal = '';

    const onChangeTest = (val) => testVal = 'called';

    const component = mount(<TimePicker onChange={onChangeTest} />);

    component.find('option[value=3600]').simulate('change', '3600');

    expect(testVal).to.equal('called');
  });

  it('onChange changes value properly', () => {
    let testVal = '';

    const onChangeTest = (val) => testVal = val;

    const component = mount(<TimePicker onChange={onChangeTest} />);

    component.find('option[value=3600]').simulate('change', '3600');

    expect(testVal).to.equal(3600);
  });
});

describe('start, end and step', () => {
  it('number of options is equal to (end - start) / step, test 1', () => {
    const component = render(<TimePicker start="00:00" end="12:00" step={10} />);

    expect(component.find('option')).to.have.length(1 + Math.floor((timeToInt("12:00") - timeToInt("0:00")) / 600));
  });

  it('number of options is equal to (end - start) / step, test 2 ', () => {
    const component = render(<TimePicker start="00:00" end="11:59" step={10} />);

    expect(component.find('option')).to.have.length(1 + Math.floor((timeToInt("11:59") - timeToInt("0:00")) / 600));
  });

  it('first element === start', () => {
    const component = render(<TimePicker start="4" />);

    expect(component.find('option').first()).to.have.attr('value').equal((4 * 3600).toString());
  });

  it('last element might be equal end', () => {
    const component = render(<TimePicker start="3:30" end="04:00" />);

    expect(component.find('option').last()).to.have.attr('value').equal((4 * 3600).toString());
  });

  it('last element might be less than end', () => {
    const component = render(<TimePicker start="03:30:00" end="03:59" />);

    expect(component.find('option')).to.have.length(1);
  });

});
