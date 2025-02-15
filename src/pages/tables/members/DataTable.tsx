import React, { useEffect, useState } from 'react';
import { Input, InputGroup, Table, Button, DOMHelper, Checkbox, Stack, Loader, useToaster, Message } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MoreIcon from '@rsuite/icons/legacy/More';
import DrawerView from './DrawerView';
import { NameCell, CheckCell, ActionCell } from './Cells';
import { getMembers } from '@/services/member.service';
import {getVehicule} from '@/services/vehicle.service';
import {getProfile} from '@/services/profile.service'

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DataTable = () => {
  const toaster = useToaster();

  const [usersData, setUsersData] = useState<any>([]);
  const [transportsData, setTransportsData] = useState<any>([]);
  const [profilesData, setProfilesData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [formValue, setFormValue] = useState<any>({});
  const [isUpdateForm, setIsUpdateForm] = useState(false);

  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === usersData.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < usersData.length) {
    indeterminate = true;
  }

  const handleCheckAll = (_value, checked) => {
    const keys = checked ? usersData.map(item => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
    setCheckedKeys(keys);
  };
  const loadUsersData = async () => {
    try {
      const usersResult = await getMembers();
      setUsersData(usersResult);

    } catch (e:any) {
      console.log('e',e.message)
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

  const loadTransportsData = async () => {
    try {
      const vehiculeResult = await getVehicule();
      setTransportsData(vehiculeResult);

    } catch (e:any) {
      console.log('e',e.message)
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

  const loadProfileData = async () => {
    try{
      const profileResult = await getProfile();
      console.log('profile',profileResult)
      setProfilesData(profileResult);
    }
    catch(e:any) {
      console.log('e',e.message)
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

  const loadData = async () => {
    try {
      await loadUsersData();
      await loadTransportsData();
      await loadProfileData();
      setIsLoading(false);
    } catch (e) {
      console.log('ERROR : ' + e);
    }
  };

  useEffect(() => {
    loadData();
    console.log('transports:', JSON.stringify(transportsData));
  }, [isLoading]);

  if (isLoading) {
    return <Loader center content="Fetching data.." />;
  } else {
    return (
      <>
        <Stack className="table-toolbar" justifyContent="space-between">
          <Button
            appearance="primary"
            onClick={() => {
              setShowDrawer(true);
              setIsUpdateForm(false);
            }}
          >
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
            <CheckCell dataKey="_id" checkedKeys={checkedKeys} onChange={handleCheck} />
          </Column>

          <Column minWidth={160} flexGrow={1} sortable>
            <HeaderCell>Name</HeaderCell>
            <NameCell dataKey="fullName" />
          </Column>

          <Column width={300}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column width={300}>
            <HeaderCell>Address</HeaderCell>
            <Cell dataKey="address" />
          </Column>

          <Column width={150}>
            <HeaderCell>Postal Code</HeaderCell>
            <Cell dataKey="postalCode" />
          </Column>

          <Column width={300}>
            <HeaderCell>Assigned Vehicle</HeaderCell>
             {/*<Cell dataKey="vehicle" /> */}
            <Cell>
              {rowData => {
                return (
                  <p>
                    {rowData.vehicle?.brand} {rowData.vehicle?.model} {/*rowData.vehicle?.matricule*/}
                  </p>
                );
              }}
            </Cell>
          </Column>

          <Column width={150}>
            <HeaderCell>profile</HeaderCell>
            <Cell>
              {rowData => {
                return (
                  <p>
                    {rowData.profile?.name}
                  </p>
                );
              }}
            </Cell>
          </Column>

          <Column width={120}>
            <HeaderCell>
              <MoreIcon />
            </HeaderCell>
            <ActionCell
              dataKey="id"
              setShowDrawer={setShowDrawer}
              setFormValue={setFormValue}
              setIsUpdateForm={setIsUpdateForm}
            />
          </Column>
        </Table>

        <DrawerView
          setShowDrawer={setShowDrawer}
          isOpen={showDrawer}
          formValue={formValue}
          setFormValue={setFormValue}
          isUpdateForm={isUpdateForm}
          loadUsersData={loadUsersData}
          transportsData={transportsData}
          profileData={profilesData}
          usersData={usersData}
        />
      </>
    );
  }
};

export default DataTable;
