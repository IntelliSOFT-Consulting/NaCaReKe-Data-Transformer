import ColModal from '../ColModal';
import codes from '../../NCIcodes';
import { setData, data, visible, setVisible, positions } from '../../tableData';

it('renders correctly', () => {
  const spy = sinon.spy();
  const tree = shallow(
    <ColModal
      handleChange={spy}
      visible={visible}
      setVisible={setVisible}
      cols={data[0]}
      onFinish={spy}
      form={{}}
    />
  );
  expect(tree).toMatchSnapshot();
});

it('shows modal', () => {
  const spy = sinon.spy();
  const tree = shallow(
    <ColModal
      handleChange={spy}
      visible={visible}
      setVisible={setVisible}
      cols={data[0]}
      onFinish={spy}
      form={{}}
    />
  );

  expect(tree.find('Modal').props().visible).toBe(true);
  expect(tree.find('Modal').props().title).toBe('Edit data');
});
