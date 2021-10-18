import Table from '../Table';

const rowData = [
  ['OrgUnit', 'Incid', 'IncidType', 'IncidDesc', 'IncidSeverity'],
  ['OrgUnit', 'Incid', 'IncidType', 'IncidDesc', 'IncidSeverity'],
];

const colData = [
  { key: 0, name: 'A' },
  { key: 1, name: 'B' },
  { key: 2, name: 'C' },
  { key: 3, name: 'D' },
  { key: 4, name: 'E' },
];

it('renders correctly', () => {
  const tree = shallow(<Table data={rowData} cols={colData} />);
  expect(tree).toMatchSnapshot();
});

it('renders the correct rows of data', () => {
  const wrapper = render(<Table data={rowData} cols={colData} />);
  expect(wrapper.find('tr').length).toEqual(2);
});
