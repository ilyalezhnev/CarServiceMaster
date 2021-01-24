import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Row, Col } from 'antd';
import { Dispatch, IRootState } from '../../redux/store';
import Login from '../auth/Login';
import Main from './Main';
import Spiner from '../common/Spiner';

const mapState = (state: IRootState) => ({
  onGlobalLoading: state.loading.global
});

const mapDispatch = (dispatch: Dispatch) => ({ onLogin: dispatch.auth.onLogin, onLogout: dispatch.auth.onLogout });

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {};

const Layout: FC<IProps> = ({ onGlobalLoading, onLogout }) => {
  let isEligible = false;

  if (localStorage.jwtToken) {
    const decoded = jwt_decode<JwtPayload>(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;
    if (decoded && decoded.exp && decoded.exp > currentTime) {
      isEligible = true;
    }
  }

  return (
    <>
      <Row justify="space-around" className="main-wrapper">
        <Col span={24}>
          <Switch>
            {!isEligible && <Route exact path="*" component={Login}></Route>}
            {isEligible && <Route path="/" render={() => <Main onLogout={onLogout} />}></Route>}
          </Switch>
        </Col>
      </Row>
      {onGlobalLoading && <Spiner loading={onGlobalLoading} />}
    </>
  );
};

export default connect(mapState, mapDispatch)(Layout);
