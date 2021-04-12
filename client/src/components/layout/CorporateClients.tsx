import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Button, Col, Form, Input, Row, Tabs } from 'antd';
import { ICarParts } from '../../models/carParts';
import { ICorporateClients } from '../../models/corporateClients';
import ImageGalaryUpload from '../common/ImageGalaryUpload';
import { IUploads } from '../../models/uploads';

const mapState = (state: IRootState) => ({
  corporateClients: state.corporateClients.data
});

const mapDispatch = (dispatch: Dispatch) => ({
  getCorporateClients: dispatch.corporateClients.getCorporateClients,
  addCorporateClients: dispatch.corporateClients.addCorporateClients,
  updateCorporateClients: dispatch.corporateClients.updateCorporateClients,
  addCorporateClientsImages: dispatch.corporateClientsImages.addCorporateClientsImages,
  deleteCorporateClientsImages: dispatch.corporateClientsImages.deleteCorporateClientsImages
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {};

const CorporateClients: FC<IProps> = ({
  corporateClients,
  getCorporateClients,
  addCorporateClients,
  updateCorporateClients,
  addCorporateClientsImages,
  deleteCorporateClientsImages
}) => {
  useEffect(() => {
    getCorporateClients();
  }, []);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: corporateClients && corporateClients.title,
      description: corporateClients && corporateClients.description,
      info: corporateClients && corporateClients.info
    });
  }, [corporateClients]);

  const onFinish = (values: ICorporateClients) => {
    if (corporateClients) {
      updateCorporateClients({ ...values, id: corporateClients.id });
    } else {
      addCorporateClients(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const saveImageHandler = (image: IUploads) => {
    if (corporateClients && corporateClients.id) {
      addCorporateClientsImages({
        corporateClientId: corporateClients.id,
        imageId: image.id
      });
    }
  };

  const deleteImageHandler = (imageId: number) => {
    deleteCorporateClientsImages(imageId);
  };

  return (
    <>
      <Row justify="center" className="login-wrapper">
        <Col span={22}>
          <Form form={form} layout="vertical" name="carparts" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item label="Заголовок" name="title" rules={[{ required: true, message: 'Введите заголовок' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Описание" name="description" rules={[{ required: true, message: 'Введите описание' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Информация" name="info" rules={[{ required: true, message: 'Введите информацию' }]}>
              <Input.TextArea rows={4} />
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
          <ImageGalaryUpload
            images={corporateClients ? corporateClients.imagesMaped : []}
            saveImage={saveImageHandler}
            deleteImage={deleteImageHandler}
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(mapState, mapDispatch)(CorporateClients);
