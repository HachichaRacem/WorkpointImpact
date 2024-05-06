import React, { useEffect, useState } from 'react';
import {
  Input,
  InputGroup,
  Table,
  Button,
  DOMHelper,
  Checkbox,
  Stack,
  useToaster,
  Message,
} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MoreIcon from '@rsuite/icons/legacy/More';
import DrawerView from './DrawerView';
import { mockUsers } from '@/data/mock';
import { NameCell, CheckCell, ActionCell } from './Cells';
import {getDestination} from '@/services/destination.service';
import { ca } from 'date-fns/locale';

const data = mockUsers(1);

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DataTable = () => {
  const toaster = useToaster();
  const [destinationData, setDestinationData] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [formValue, setFormValue] = useState<any>({});
  const [isUpdateForm, setIsUpdateForm] = useState(false);
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
  const loadDestinationData = async () => {
    try{
      const destinationResult = await getDestination();
      setDestinationData(destinationResult);
    }catch(e:any){
      toaster.push(
        <Message closable showIcon type="error" duration={9000}>
        {e.message}
      </Message>,
      {
        placement: 'topCenter'
      }
      );
      
    }
    
  };

  useEffect(() => {
    loadDestinationData();
  }, []);

  return (
    <>
      <Stack className="table-toolbar" justifyContent="space-between">
        <Button appearance="primary" onClick={() => setShowDrawer(true)}>
          Add Destination
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

      <Table height={Math.max(getHeight(window) - 200, 400)} data={destinationData}>
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
          <ActionCell dataKey="id" 
          setShowDrawer={setShowDrawer}
          setFormValue={setFormValue}
          setIsUpdateForm={setIsUpdateForm}
          />
        </Column>
      </Table>

      <DrawerView 
      setShowDrawer={setShowDrawer} 
      isOpen={showDrawer} 
      formValue = {formValue}
      setFormValue={setFormValue}
      isUpdateForm={isUpdateForm}
      loadDestinationData={loadDestinationData}
      />
    </>
  );
};

export default DataTable;
