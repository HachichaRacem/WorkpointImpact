import React from 'react';
import { Popover, Whisper, Checkbox, Dropdown, IconButton, Table, CellProps } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

const { Cell } = Table;

export const NameCell = ({ rowData, dataKey, ...props }: CellProps) => {
  const speaker = (
    <Popover title="Description">
      <p>
        <b>Name:</b> {rowData.name}
      </p>
      <p>
        <b>City:</b> {rowData.city}
      </p>
      <p>
        <b>Street:</b> {rowData.street}
      </p>
    </Popover>
  );

  return (
    <Cell {...props}>
      <Whisper placement="top" speaker={speaker}>
        <a>{dataKey ? rowData[dataKey] : null}</a>
      </Whisper>
    </Cell>
  );
};

export const ImageCell = ({ rowData, dataKey, ...props }: CellProps) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <img src={rowData[dataKey!]} width="40" />
    </div>
  </Cell>
);

export const CheckCell = ({
  rowData,
  onChange,
  checkedKeys,
  dataKey,
  ...props
}: CellProps & {
  checkedKeys: number[];
  onChange: (value: any, checked: boolean) => void;
}) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey!]}
        inline
        onChange={onChange}
        checked={checkedKeys.some(item => item === rowData[dataKey!])}
      />
    </div>
  </Cell>
);

const renderMenu = ({ onClose, left, top, className }: any, 
  ref,
  setShowDrawer,
  rowData,
  setFormValue,
  setIsUpdateForm) => {
  const handleSelect = eventKey => {
    if(eventKey == 2){
      setIsUpdateForm(true);
      console.log('row Data',rowData)
      setFormValue(rowData);
      setShowDrawer(true);
    }
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
      <Dropdown.Item eventKey={1}>Vue Details</Dropdown.Item>
        <Dropdown.Item eventKey={2}>Update Vehicle</Dropdown.Item>
        <Dropdown.Item eventKey={3}>Block Vehicle</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

export const ActionCell = props => {
  const rowData = props['rowData'];
  const setShowDrawer = props['setShowDrawer'];
  const setFormValue = props['setFormValue'];
  const setIsUpdateForm = props['setIsUpdateForm'];
  return (
    <Cell {...props} className="link-group">
      <Whisper placement="autoVerticalEnd" trigger="click" speaker={(props, ref) => {
          return renderMenu(props, ref, setShowDrawer, rowData, setFormValue, setIsUpdateForm);}}>
        <IconButton appearance="subtle" icon={<MoreIcon />} />
      </Whisper>
    </Cell>
  );
};
