/* eslint-disable no-undef */
import DataInput from '../DataInput';

it('Renders the upload field correctly', () => {
  const spy = sinon.spy();
  const input = mount(<DataInput handleFile={spy} />);
  expect(input).toBeTruthy();
  const file = input.find('input[type="file"]');
  expect(file).toBeTruthy();
});

it('Contains upload text', () => {
  const spy = sinon.spy();
  const element = mount(<DataInput handleFile={spy} />);
  const uploadText = element.find('button').text();
  expect(uploadText).toBeTruthy();
});

it('matches snapshot', () => {
  const spy = sinon.spy();
  const tree = shallow(<DataInput handleFile={spy} />);
  expect(tree).toMatchSnapshot();
});
