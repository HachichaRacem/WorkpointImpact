import React from 'react';
import { Popover, Whisper, Checkbox, Dropdown, IconButton, Table, CellProps } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

const { Cell } = Table;

export const NameCell = ({ rowData, dataKey, ...props }: CellProps) => {
  return (
    <Cell {...props}>
      <a>{dataKey ? rowData[dataKey] : null}</a>
    </Cell>
  );
};

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

const renderMenu = (
  { onClose, left, top, className }: any,
  ref,
  setShowDrawer,
  rowData,
  setFormValue,
  setIsUpdateForm
) => {
  const handleSelect = eventKey => {
    if (eventKey == 2) {
      setIsUpdateForm(true);
      setFormValue(rowData);
      setShowDrawer(true);
    }
    onClose();
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item eventKey={1}>View Profile</Dropdown.Item>
        <Dropdown.Item eventKey={2}>Update Member</Dropdown.Item>
        <Dropdown.Item eventKey={3}>Update Vehicle</Dropdown.Item>
        <Dropdown.Item eventKey={4}>Block Member</Dropdown.Item>
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
      <Whisper
        placement="autoVerticalEnd"
        trigger="click"
        speaker={(props, ref) => {
          return renderMenu(props, ref, setShowDrawer, rowData, setFormValue, setIsUpdateForm);
        }}
      >
        <IconButton appearance="subtle" icon={<MoreIcon />} />
      </Whisper>
    </Cell>
  );
};
