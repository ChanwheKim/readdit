/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderAdmin from '../src/client/components/HeaderAdmin';
import Header from '../src/client/components/Header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  it('should render HeaderAdmin Component successfully', () => {
    const wrapper = shallow(<HeaderAdmin />);
    expect(wrapper.length).toBe(1);
  });

  it('should render Header Component successfully', () => {
    let count = 1;
    const onMountCounter = () => { count++; };
    const wrapper = shallow(<Header fetchUser={onMountCounter} />);

    expect(wrapper.length).toBe(1);
    expect(count).toBe(2);
  });
});
