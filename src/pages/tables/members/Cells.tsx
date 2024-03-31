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

const renderMenu = ({ onClose, left, top, className }: any, ref) => {
  const handleSelect = eventKey => {
    if (eventKey == 2) {
    }
    onClose();
    console.log(eventKey);
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
  return (
    <Cell {...props} className="link-group">
      <Whisper placement="autoVerticalEnd" trigger="click" speaker={renderMenu}>
        <IconButton appearance="subtle" icon={<MoreIcon />} />
      </Whisper>
    </Cell>
  );
};
