import React, { FC, useState } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import CarParts from './CarParts';
import Offices from './Offices';
import Reviews from './Reviews';
import MainPage from './MainPage';
import Services from './Services';
import CorporateClients from './CorporateClients';
import Promos from './Promos';

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
        return <MainPage />;
      case '2':
        return <Services />;
      case '3':
        return <CarParts />;
      case '4':
        return <CorporateClients />;
      case '5':
        return <Offices />;
      case '6':
        return <Promos />;
      case '7':
        return <Reviews />;
      case '8':
        onLogout();
        return null;

      default:
        return null;
    }
  };
  return (
    <Layout className="main__layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[selectedTab]} onClick={onMenuClick}>
          <Menu.Item key="1">Главная</Menu.Item>
          <Menu.Item key="2">Услуги</Menu.Item>
          <Menu.Item key="3">Запчасти</Menu.Item>
          <Menu.Item key="4">Юр.лицам</Menu.Item>
          <Menu.Item key="5">Контакты</Menu.Item>
          <Menu.Item key="6">Акции</Menu.Item>
          <Menu.Item key="7">Отзывы</Menu.Item>
          <Menu.Item key="8">Выход</Menu.Item>
        </Menu>
      </Header>
      <Content className="main__content">
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
