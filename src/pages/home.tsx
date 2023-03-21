// @flow
import * as React from 'react';
import CommissionManage from './dashboard';

type Props = {};

export function Home(props: Props) {
  return (
    <div style={{ backgroundColor: '#fafafb' }}>
      <CommissionManage />
    </div>
  );
}
