import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.React = React;
global.renderer = renderer;
global.shallow = shallow;
global.mount = mount;

jest.mock('lodash', () => ({
  uniqueId() {
    return 1;
  },
}));
