import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Button, Form, Input } from 'antd';
import { IOffices } from '../../models/offices';

const mapState = (state: IRootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
  addOffices: dispatch.offices.addOffices,
  updateOffices: dispatch.offices.updateOffices,
  deleteOffices: dispatch.offices.deleteOffices
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {
  office?: IOffices;
};

const Office: FC<IProps> = ({ office, addOffices, updateOffices, deleteOffices }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (office) {
      form.setFieldsValue({
        address: office.address,
        fullAddress: office.fullAddress,
        tel: office.tel,
        fullTel: office.fullTel,
        telegram: office.telegram,
        viber: office.viber,
        whatsapp: office.whatsapp,
        email: office.email,
        description: office.description,
        locationLat: office.locationLat,
        locationLon: office.locationLon,
        workingHours: office.workingHours
      });
    }
  }, [office]);

  const onFinish = (values: IOffices) => {
    if (office) {
      updateOffices({ ...values, id: office.id });
    } else {
      addOffices(values);
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onDeleteOffice = () => {
    if (office) {
      deleteOffices(office.id);
    }
  };

  return (
    <Form form={form} layout="vertical" name="office" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="Адрес" name="address" rules={[{ required: true, message: 'Введите заголовок' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Полный адрес" name="fullAddress" rules={[{ required: true, message: 'Введите подзаголовок' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Короткий телефон" name="tel" rules={[{ required: true, message: 'Укажите телефон' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Полный телефон" name="fullTel" rules={[{ required: true, message: 'Укажите полный телефон' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Укажите email' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Telegram" name="Telegram" rules={[{ required: true, message: 'Укажите Telegram' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Viber" name="viber" rules={[{ required: true, message: 'Укажите viber' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Whatsapp" name="whatsapp" rules={[{ required: true, message: 'Укажите whatsapp' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Описание" name="description" rules={[{ required: true, message: 'Введите описание' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Часы работы" name="workingHours">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
        {office && (
          <Button type="primary" danger style={{ marginLeft: '10px' }} onClick={onDeleteOffice}>
            Удалить
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default connect(mapState, mapDispatch)(Office);
