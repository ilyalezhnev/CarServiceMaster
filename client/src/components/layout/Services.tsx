import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Col, Row, Tabs } from 'antd';
import Service from './Service';
import NoContent from '../common/NoContent';

const mapState = (state: IRootState) => ({
  services: state.services.data,
  offices: state.offices.data,
});

const mapDispatch = (dispatch: Dispatch) => ({
  getServices: dispatch.services.getServices,
  getOffices: dispatch.offices.getOffices,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {};

const Services: FC<IProps> = ({ services, getServices, offices, getOffices }) => {
  useEffect(() => {
    getServices();
    getOffices();
  }, []);

  const onTabChange = (activeKey: string) => {};

  return (
    <Row justify="center" align="middle" className="page-wrapper">
      <Col span={22}>
        {offices && !offices.length ? (
          <NoContent text="Чтобы добавлять услуги сначала нужно добавить контакты" />
        ) : (
          <Tabs
            defaultActiveKey={services && services.length ? services[0].id.toString() : 'new'}
            onChange={onTabChange}
            type="card"
          >
            {services &&
              services.map((service) => (
                <Tabs.TabPane tab={service.title} key={service.id}>
                  <Service service={service} offices={offices} />
                </Tabs.TabPane>
              ))}
            <Tabs.TabPane tab="+" key="new">
              <Service offices={offices} />
            </Tabs.TabPane>
          </Tabs>
        )}
      </Col>
    </Row>
  );
};

export default connect(mapState, mapDispatch)(Services);
