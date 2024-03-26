import React from 'react';
import * as images from '../../images/logo';
export default function Logo() {
  return (
    <div style={{ display: 'flex' }}>
      <img src={images.LogoText} style={{height: 45, width: 150, marginLeft: 20 }} />
    </div>
  );
}
