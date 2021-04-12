import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import marked from 'marked';
import SingleUpload from '../common/SingleUpload';
import { IServicesForm, IServicesFromServer, IServicesToServer } from '../../models/services';
import { IOffices } from '../../models/offices';
import NoContent from '../common/NoContent';
import MarkdownTooltip from '../common/MarkdownTooltip';
import { tooltipText } from '../../constants/tooltipText';

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

const mapState = (state: IRootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
  addServices: dispatch.services.addServices,
  updateServices: dispatch.services.updateServices,
  deleteServices: dispatch.services.deleteServices
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {
  service?: IServicesFromServer;
  offices: IOffices[] | null;
};

const Service: FC<IProps> = ({ addServices, updateServices, deleteServices, service, offices }) => {
  const [descriptionHTML, setDescriptionHTML] = useState<string>((service && service.description) || '');
  const [form] = Form.useForm();

  useEffect(() => {
    if (service) {
      form.setFieldsValue({
        title: service.title,
        cost: service.cost,
        description: service.description,
        text: service.text,
        image: service.image,
        icon: service.icon,
        officesIds: [...service.offices.map(item => item.serviceOffice.isAvailable && item.serviceOffice.officeId)]
      });
      setDescriptionHTML(service.description || '');
    }
  }, [service]);

  const onFinish = ({ officesIds, ...values }: IServicesForm) => {
    if (!offices) {
      return;
    }
    if (service) {
      const updateData: IServicesToServer = {
        ...values,
        servicesOffices: service.offices.map(office => ({
          id: office.serviceOffice.id,
          officeId: office.serviceOffice.officeId,
          isAvailable: officesIds.some(id => id === office.serviceOffice.officeId)
        }))
      };
      updateServices({ ...updateData, id: service.id });
    } else {
      const addData: IServicesToServer = {
        ...values,
        servicesOffices: offices.map(office => ({
          officeId: office.id,
          isAvailable: officesIds.some(id => id === office.id)
        }))
      };
      addServices(addData);
    }
    form.resetFields();
    setDescriptionHTML('');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onDeleteService = () => {
    if (service) {
      deleteServices(service.id);
    }
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionHTML(event.target.value || '');
  };

  return (
    <Form form={form} name="service" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="Заголовок" name="title" rules={[{ required: true, message: 'Введите заголовок' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Стоимость" name="cost" rules={[{ required: true, message: 'Введите стоимость' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Текст" name="text" rules={[{ required: true, message: 'Введите текст' }]}>
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
            style={{ backgroundColor: 'white', border: '1px solid #d9d9d9', padding: '10px', margin: '10px 0px 20px 0px' }}
          />
        </div>
      )}
      <Form.Item name="officesIds" label="Услуга доступна:">
        <Checkbox.Group>
          {offices && (
            <Row>
              {offices && !offices.length && <NoContent text="Чтобы указать доступность услуг в офисах добавьте контакты" />}
              {offices.map(office => (
                <Col key={office.id}>
                  {service ? (
                    <Checkbox value={office.id}>{office.address}</Checkbox>
                  ) : (
                    <Checkbox value={office.id}>{office.address}</Checkbox>
                  )}
                </Col>
              ))}
            </Row>
          )}
        </Checkbox.Group>
      </Form.Item>
      {service && (
        <>
          <Form.Item label="Картинка" name="image">
            <SingleUpload form={form} url={service.image} />
          </Form.Item>
          <Form.Item label="Иконка" name="icon">
            <SingleUpload form={form} url={service.icon} formName="icon" />
          </Form.Item>
        </>
      )}
      {!service && (
        <>
          <Form.Item label="Картинка" name="image">
            <SingleUpload form={form} />
          </Form.Item>
          <Form.Item label="Иконка" name="icon">
            <SingleUpload form={form} formName="icon" />
          </Form.Item>
        </>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
        {service && (
          <Button type="primary" danger style={{ marginLeft: '10px' }} onClick={onDeleteService}>
            Удалить
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default connect(mapState, mapDispatch)(Service);
