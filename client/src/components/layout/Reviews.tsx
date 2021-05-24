import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Col, Row, Tabs } from 'antd';
import Review from './Review';

const mapState = (state: IRootState) => ({
  reviews: state.reviews.data,
});

const mapDispatch = (dispatch: Dispatch) => ({
  getReviews: dispatch.reviews.getReviews,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {};

const Reviews: FC<IProps> = ({ reviews, getReviews }) => {
  useEffect(() => {
    getReviews();
  }, [getReviews]);

  const onTabChange = (activeKey: string) => {};

  return (
    <Row justify="center" align="middle" className="page-wrapper">
      <Col span={22}>
        <Tabs defaultActiveKey={reviews && reviews.length ? reviews[0].id.toString() : 'new'} onChange={onTabChange} type="card">
          {reviews &&
            reviews.map((review) => (
              <Tabs.TabPane tab={review.fullName} key={review.id}>
                <Review review={review} />
              </Tabs.TabPane>
            ))}
          <Tabs.TabPane tab="+" key="new">
            <Review />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default connect(mapState, mapDispatch)(Reviews);
