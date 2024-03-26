import React from 'react';
import { Panel, Breadcrumb } from 'rsuite';
import Map from './map';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Map</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Map</Breadcrumb.Item>
          </Breadcrumb>
          <Map />
        </>
      }
    >
    </Panel>
  );
};

export default Page;