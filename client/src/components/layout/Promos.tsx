import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Col, Row, Tabs } from 'antd';
import Promo from './Promo';

const mapState = (state: IRootState) => ({
  promos: state.promos.data
});

const mapDispatch = (dispatch: Dispatch) => ({
  getPromos: dispatch.promos.getPromos
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {};

const Promos: FC<IProps> = ({ promos, getPromos }) => {
  useEffect(() => {
    getPromos();
  }, []);

  const onTabChange = (activeKey: string) => {};

  return (
    <Row justify="center" align="middle" className="page-wrapper">
      <Col span={22}>
        <Tabs defaultActiveKey={promos && promos.length ? promos[0].id.toString() : 'new'} onChange={onTabChange} type="card">
          {promos &&
            promos.map(promos => (
              <Tabs.TabPane tab={promos.title} key={promos.id}>
                <Promo promo={promos} />
              </Tabs.TabPane>
            ))}
          <Tabs.TabPane tab="+" key="new">
            <Promo />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default connect(mapState, mapDispatch)(Promos);
