import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import DataTable from './DataTable';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Transport</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Configuration</Breadcrumb.Item>
            <Breadcrumb.Item active>Transport</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <DataTable />
    </Panel>
  );
};

export default Page;
