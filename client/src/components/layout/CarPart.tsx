import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Button, Form, Input, Select } from 'antd';
import { IOficesCarparts } from '../../models/offices';
import { ICarPartsOffices } from '../../models/carPartsOffices';
import SingleUpload from '../common/SingleUpload';

const iconContainer: React.CSSProperties = {
  marginBottom: '20px',
  position: 'relative'
};
const icon: React.CSSProperties = {
  position: 'absolute',
  top: '14px',
  left: '14px',
  zIndex: 1,
  cursor: 'pointer'
};

const mapState = (state: IRootState) => ({
  offices: state.offices.data
});

const mapDispatch = (dispatch: Dispatch) => ({
  addCarPartsOffices: dispatch.carPartsOffices.addCarPartsOffices,
  updateCarPartsOffices: dispatch.carPartsOffices.updateCarPartsOffices,
  deleteCarPartsOffices: dispatch.carPartsOffices.deleteCarPartsOffices,
  getOffices: dispatch.offices.getOffices
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {
  oficesCarparts: IOficesCarparts[];
  office?: IOficesCarparts;
  carPartId: number;
};

const CarPart: FC<IProps> = ({
  oficesCarparts,
  office,
  carPartId,
  addCarPartsOffices,
  updateCarPartsOffices,
  deleteCarPartsOffices,
  getOffices,
  offices
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      description: office && office.carPartOffice.description,
      image: ''
    });
  }, [office]);

  useEffect(() => {
    getOffices();
  }, []);

  const onFinish = (values: ICarPartsOffices) => {
    if (office) {
      updateCarPartsOffices({ ...values, id: office.carPartOffice.id });
    } else {
      addCarPartsOffices({ ...values, carPartId, officeId: values.officeId });
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onDeleteOffice = () => {
    if (office) {
      deleteCarPartsOffices(office.carPartOffice.id);
    }
  };

  return (
    <Form form={form} name="carpart" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {!office && offices && (
        <Form.Item name="officeId" label="Офис" rules={[{ required: true, message: 'Выберите офис' }]}>
          <Select placeholder="Выберите офис" notFoundContent="Все офисы использованы, добавьте новый">
            {offices.map(item => {
              if (oficesCarparts.some(oficesCarpart => oficesCarpart.id === item.id)) {
                return null;
              }
              return (
                <Select.Option value={item.id} key={item.id}>
                  {item.address}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      )}
      <Form.Item label="Описание" name="description" rules={[{ required: true, message: 'Введите описание' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      {office && (
        <Form.Item label="Картинка" name="image">
          <SingleUpload form={form} url={office.carPartOffice.image} />
        </Form.Item>
      )}
      {!office && (
        <Form.Item label="Картинка" name="image">
          <SingleUpload form={form} />
        </Form.Item>
      )}
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

export default connect(mapState, mapDispatch)(CarPart);
