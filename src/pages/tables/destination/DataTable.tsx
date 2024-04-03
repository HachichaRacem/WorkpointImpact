import React, { useEffect, useState } from 'react';
import {
  Input,
  InputGroup,
  Table,
  Button,
  DOMHelper,
  Checkbox,
  Stack,
} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MoreIcon from '@rsuite/icons/legacy/More';
import DrawerView from './DrawerView';
import { mockUsers } from '@/data/mock';
import { NameCell, CheckCell, ActionCell } from './Cells';

const data = mockUsers(1);

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DataTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (_value, checked) => {
    const keys = checked ? data.map(item => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
    setCheckedKeys(keys);
  };
  const loadUsersData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    try {
      const response = await fetch('http://localhost:4000/destinations', options);
      setUsersData(await response.json());
    } catch (e) {
      console.log('ERROR: ' + e);
    }
  };

  useEffect(() => {
    loadUsersData();
  }, []);

  return (
    <>
      <Stack className="table-toolbar" justifyContent="space-between">
        <Button appearance="primary" onClick={() => setShowDrawer(true)}>
          Add Member
        </Button>

        <Stack spacing={6}>
          <InputGroup inside>
            <Input placeholder="Search" value={searchKeyword} onChange={setSearchKeyword} />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>
      </Stack>

      <Table height={Math.max(getHeight(window) - 200, 400)} data={usersData}>
        <Column width={50} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={50} fixed>
          <HeaderCell style={{ padding: 0 }}>
            <div style={{ lineHeight: '40px' }}>
              <Checkbox
                inline
                checked={checked}
                indeterminate={indeterminate}
                onChange={handleCheckAll}
              />
            </div>
          </HeaderCell>
          <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
        </Column>
        

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Name</HeaderCell>
          <NameCell dataKey="name" />
        </Column>

        <Column width={300}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>

        <Column width={300}>
          <HeaderCell>Phone Number</HeaderCell>
          <Cell dataKey="phoneNumber" />
        </Column>

        <Column width={300}>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="type" />
        </Column>

        <Column width={300}>
          <HeaderCell>Address</HeaderCell>
          <Cell dataKey="address" />
        </Column>

        <Column width={150}>
          <HeaderCell>Postal Code</HeaderCell>
          <Cell dataKey="postalcode" />
        </Column>

        <Column width={150}>
          <HeaderCell>Zone</HeaderCell>
          <Cell dataKey="zone" />
        </Column>

        <Column width={120}>
          <HeaderCell>
            <MoreIcon />
          </HeaderCell>
          <ActionCell dataKey="id" />
        </Column>
      </Table>

      <DrawerView setShowDrawer={setShowDrawer} isOpen={showDrawer} />
    </>
  );
};

export default DataTable;
