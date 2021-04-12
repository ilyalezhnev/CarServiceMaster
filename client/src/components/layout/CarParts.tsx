import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Button, Col, Form, Input, Row, Tabs } from 'antd';
import { ICarParts } from '../../models/carParts';
import CarPart from './CarPart';
import marked from 'marked';
import MarkdownTooltip from '../common/MarkdownTooltip';
import { tooltipText } from '../../constants/tooltipText';

const mapState = (state: IRootState) => ({
  carParts: state.carParts.data
});

const mapDispatch = (dispatch: Dispatch) => ({
  getCarParts: dispatch.carParts.getCarParts,
  addCarParts: dispatch.carParts.addCarParts,
  updateCarParts: dispatch.carParts.updateCarParts
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {};

const CarParts: FC<IProps> = ({ carParts, getCarParts, addCarParts, updateCarParts }) => {
  const [titleHTML, setTitleHTML] = useState<string>((carParts && carParts.title) || '');

  useEffect(() => {
    getCarParts();
  }, []);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: carParts && carParts.title,
      subtitle: carParts && carParts.subtitle
    });
    setTitleHTML((carParts && carParts.title) || '');
  }, [carParts]);

  const onFinish = (values: ICarParts) => {
    if (carParts) {
      updateCarParts({ ...values, id: carParts.id });
    } else {
      addCarParts(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitleHTML(event.target.value || '');
  };

  const onTabChange = (activeKey: string) => {};

  return (
    <>
      <Row justify="center" className="login-wrapper">
        <Col span={22}>
          <Form form={form} layout="vertical" name="carparts" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              label="Заголовок"
              name="title"
              tooltip={<MarkdownTooltip text={tooltipText} />}
              rules={[{ required: true, message: 'Введите заголовок' }]}
            >
              <Input.TextArea rows={2} onChange={onTitleChange} />
            </Form.Item>
            {titleHTML && (
              <div>
                Предпросмотр заголовка
                <div
                  dangerouslySetInnerHTML={{ __html: marked(titleHTML) }}
                  style={{ backgroundColor: 'white', border: '1px solid #d9d9d9', padding: '10px', margin: '10px 0px 20px 0px' }}
                />
              </div>
            )}
            <Form.Item label="Подзаголовок" name="subtitle" rules={[{ required: true, message: 'Введите подзаголовок' }]}>
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center" align="middle" className="page-wrapper">
        <Col span={22}>
          {carParts && carParts.offices && (
            <Tabs
              defaultActiveKey={carParts.offices.length ? carParts.offices[0].id.toString() : 'new'}
              onChange={onTabChange}
              type="card"
            >
              {carParts.offices.map(office => (
                <Tabs.TabPane tab={office.address} key={office.id}>
                  <CarPart oficesCarparts={carParts.offices} office={office} carPartId={carParts.id} />
                </Tabs.TabPane>
              ))}
              <Tabs.TabPane tab="+" key="new">
                <CarPart oficesCarparts={carParts.offices} carPartId={carParts.id} />
              </Tabs.TabPane>
            </Tabs>
          )}
        </Col>
      </Row>
    </>
  );
};

export default connect(mapState, mapDispatch)(CarParts);
