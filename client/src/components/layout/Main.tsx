import React, { FC, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Row, Col, Button } from 'antd';
import CarParts from './CarParts';

const { Header, Content } = Layout;

interface IProps {
  onLogout: () => void;
}

const Main: FC<IProps> = ({ onLogout }) => {
  const [selectedTab, setSelectedTab] = useState<string>('1');

  const onMenuClick = (e: any) => {
    setSelectedTab(e.key);
  };
  const renderTab = () => {
    switch (selectedTab) {
      case '1':
        return <div>1</div>;
      case '2':
        return <div>2</div>;
      case '3':
        return <CarParts />;
      case '4':
        return <div>4</div>;
      case '5':
        return <div>5</div>;
      case '6':
        return <div>6</div>;
      case '7':
        onLogout();
        return null;

      default:
        return null;
    }
  };
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[selectedTab]} onClick={onMenuClick}>
          <Menu.Item key="1">Главная</Menu.Item>
          <Menu.Item key="2">Услуги</Menu.Item>
          <Menu.Item key="3">Запчасти</Menu.Item>
          <Menu.Item key="4">Юр.лицам</Menu.Item>
          <Menu.Item key="5">Контакты</Menu.Item>
          <Menu.Item key="6">Акции</Menu.Item>
          <Menu.Item key="7">Выход</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Row justify="space-around" align="middle">
          <Col span={22}>
            <div className="site-layout-content">{renderTab()}</div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Main;
