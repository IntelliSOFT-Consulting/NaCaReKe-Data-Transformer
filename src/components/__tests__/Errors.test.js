/* eslint-disable no-undef */
import { data } from '../../tableData';
import Errors from '../Errors';

it('renders correctly', () => {
  const spy = sinon.spy();
  const wrapper = shallow(
    <Errors
      errors={[]}
      setErrors={spy}
      data={data}
      setData={spy}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});
