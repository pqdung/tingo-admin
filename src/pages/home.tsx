// @flow
import * as React from 'react';
import CommissionManage from './dashboard';

type Props = {};

export default function Home(props: Props) {
  return (
    <div style={{ backgroundColor: '#fafafb' }}>
      <CommissionManage />
    </div>
  );
}
