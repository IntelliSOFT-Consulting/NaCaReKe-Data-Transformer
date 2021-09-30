/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { data } from '../../tableData';
import ColumnForm from '../ColumnForm';

it('renders correctly', () => {
  const spy = sinon.spy();
  const wrapper = shallow(
    <ColumnForm
      handleChange={spy}
      cols={data[0]}
      onFinish={spy}
      formRef={{}}
      form={{}}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});
