import React from 'react';
import { Table, Panel } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const DataTable = ({ data }) => {
  return (
    <Panel className="card" header="All The Delegates With Carbon Impact">
      <Table height={300} data={data} rowKey="id">
        <Column width={150}>
          <HeaderCell>Member Name </HeaderCell>
          <Cell>
            {rowData => {
              return <p>{rowData.fullName}</p>;
            }}
          </Cell>
        </Column>

        <Column flexGrow={1} minWidth={100}>
          <HeaderCell>Assigned Vehicule</HeaderCell>
          <Cell>
            {rowData => {
              return <p>{rowData.vehicle}</p>;
            }}
          </Cell>
        </Column>

        <Column width={100}>
          <HeaderCell>Carbon Impact</HeaderCell>
          <Cell dataKey="carburant_impact" />
        </Column>

        <Column width={130}>
          <HeaderCell>Date</HeaderCell>
          <Cell dataKey="date" />
        </Column>
      </Table>
    </Panel>
  );
};

export default DataTable;
