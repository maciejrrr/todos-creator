import { TodoLists } from '../index';

describe('TodoLists', () => {
  describe('snapshots', () => {
    it('renders TodoLists', () => {
      const tree = renderer.create(<TodoLists />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('enzyme', () => {
    it('has h1', () => {
      const component = shallow(<TodoLists />);
      expect(component.find('h1').length).toEqual(1);
    });
  });
});
