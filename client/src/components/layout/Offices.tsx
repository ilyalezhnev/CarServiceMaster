import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Col, Row, Tabs } from 'antd';
import Office from './Office';

const mapState = (state: IRootState) => ({
  offices: state.offices.data,
});

const mapDispatch = (dispatch: Dispatch) => ({
  getOffices: dispatch.offices.getOffices,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {};

const Offices: FC<IProps> = ({ offices, getOffices }) => {
  useEffect(() => {
    getOffices();
  }, [getOffices]);

  const onTabChange = (activeKey: string) => {};

  return (
    <Row justify="center" align="middle" className="page-wrapper">
      <Col span={22}>
        {offices && (
          <Tabs
            defaultActiveKey={offices && offices.length ? offices[0].id.toString() : 'new'}
            onChange={onTabChange}
            type="card"
          >
            {offices &&
              offices.map((office) => (
                <Tabs.TabPane tab={office.address} key={office.id}>
                  <Office office={office} />
                </Tabs.TabPane>
              ))}
            <Tabs.TabPane tab="+" key="new">
              <Office />
            </Tabs.TabPane>
          </Tabs>
        )}
      </Col>
    </Row>
  );
};

export default connect(mapState, mapDispatch)(Offices);
