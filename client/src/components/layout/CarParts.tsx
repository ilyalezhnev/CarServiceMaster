import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Button, Col, Form, Input, Row } from 'antd';
import { ICarParts } from '../../models/carParts';

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
  useEffect(() => {
    getCarParts();
  }, []);

  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      title: carParts && carParts.title,
      subtitle: carParts && carParts.subtitle
    });
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

  return (
    <Row justify="center" align="middle" className="login-wrapper">
      <Col span={10}>
        <Form form={form} layout="vertical" name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item label="Заголовок" name="title" rules={[{ required: true, message: 'Введите заголовок' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Подзаголовок" name="subtitle" rules={[{ required: true, message: 'Введите подзаголовок' }]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default connect(mapState, mapDispatch)(CarParts);
