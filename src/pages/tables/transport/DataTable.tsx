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
  const [showDrawer, setShowDrawer] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [usersData, setUsersData] = useState<any>([]);
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
  

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const filteredData = () => {
    const filtered = data.filter(item => {
      if (!item.name.includes(searchKeyword)) {
        return false;
      }

      return true;
    });

    if (sortColumn && sortType) {
      return filtered.sort((a, b) => {
        let x: any = a[sortColumn];
        let y: any = b[sortColumn];

        if (typeof x === 'string') {
          x = x.charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.charCodeAt(0);
        }

        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return filtered;
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
      const response = await fetch('http://localhost:3000/transports', options);
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
          Add Vehicle
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

      <Table
        height={Math.max(getHeight(window) - 200, 400)}
        data={usersData}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        

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
          <HeaderCell>Brand</HeaderCell>
          <NameCell dataKey="brand" />
        </Column>

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Model</HeaderCell>
          <NameCell dataKey="model" />
        </Column>

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Matricule</HeaderCell>
          <NameCell dataKey="matricule" />
        </Column>

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Brand</HeaderCell>
          <NameCell dataKey="brand" />
        </Column>

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Fuel Type</HeaderCell>
          <NameCell dataKey="fueltype" />
        </Column>

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Horsepower</HeaderCell>
          <NameCell dataKey="horspowere" />
        </Column>

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Fuel Consommation 'L/KM'</HeaderCell>
          <NameCell dataKey="fuelcons" />
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