import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Button, Col, Form, Input, Row } from 'antd';
import { ICorporateClients } from '../../models/corporateClients';
import ImageGalaryUpload from '../common/ImageGalaryUpload';
import { IUploads } from '../../models/uploads';
import MarkdownTooltip from '../common/MarkdownTooltip';
import { tooltipText } from '../../constants/tooltipText';
import marked from 'marked';

const mapState = (state: IRootState) => ({
  corporateClients: state.corporateClients.data,
});

const mapDispatch = (dispatch: Dispatch) => ({
  getCorporateClients: dispatch.corporateClients.getCorporateClients,
  addCorporateClients: dispatch.corporateClients.addCorporateClients,
  updateCorporateClients: dispatch.corporateClients.updateCorporateClients,
  addCorporateClientsImages: dispatch.corporateClientsImages.addCorporateClientsImages,
  deleteCorporateClientsImages: dispatch.corporateClientsImages.deleteCorporateClientsImages,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {};

const CorporateClients: FC<IProps> = ({
  corporateClients,
  getCorporateClients,
  addCorporateClients,
  updateCorporateClients,
  addCorporateClientsImages,
  deleteCorporateClientsImages,
}) => {
  const [descriptionHTML, setDescriptionHTML] = useState<string>((corporateClients && corporateClients.description) || '');
  const [infoHTML, setInfoHTML] = useState<string>((corporateClients && corporateClients.info) || '');

  useEffect(() => {
    getCorporateClients();
  }, []);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: corporateClients && corporateClients.title,
      description: corporateClients && corporateClients.description,
      info: corporateClients && corporateClients.info,
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
        imageId: image.id,
      });
    }
  };

  const deleteImageHandler = (imageId: number) => {
    deleteCorporateClientsImages(imageId);
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionHTML(event.target.value || '');
  };
  const onInfoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfoHTML(event.target.value || '');
  };

  return (
    <>
      <Row justify="center" className="login-wrapper">
        <Col span={22}>
          <Form form={form} layout="vertical" name="carparts" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item label="Заголовок" name="title" rules={[{ required: true, message: 'Введите заголовок' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Описание"
              name="description"
              tooltip={<MarkdownTooltip text={tooltipText} />}
              rules={[{ required: true, message: 'Введите описание' }]}
            >
              <Input.TextArea rows={4} onChange={onDescriptionChange} />
            </Form.Item>
            {descriptionHTML && (
              <div>
                Предпросмотр описания
                <div
                  dangerouslySetInnerHTML={{ __html: marked(descriptionHTML) }}
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #d9d9d9',
                    padding: '10px',
                    margin: '10px 0px 20px 0px',
                  }}
                />
              </div>
            )}
            <Form.Item
              label="Информация"
              name="info"
              tooltip={<MarkdownTooltip text={tooltipText} />}
              rules={[{ required: true, message: 'Введите информацию' }]}
            >
              <Input.TextArea rows={4} onChange={onInfoChange} />
            </Form.Item>
            {infoHTML && (
              <div>
                Предпросмотр информации
                <div
                  dangerouslySetInnerHTML={{ __html: marked(infoHTML) }}
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #d9d9d9',
                    padding: '10px',
                    margin: '10px 0px 20px 0px',
                  }}
                />
              </div>
            )}
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
            images={corporateClients ? corporateClients.images : []}
            saveImage={saveImageHandler}
            deleteImage={deleteImageHandler}
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(mapState, mapDispatch)(CorporateClients);
