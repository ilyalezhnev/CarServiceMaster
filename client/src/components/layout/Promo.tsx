import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Button, Form, Input } from 'antd';
import SingleUpload from '../common/SingleUpload';
import { IPromos } from '../../models/promos';
import marked from 'marked';
import MarkdownTooltip from '../common/MarkdownTooltip';
import { tooltipText } from '../../constants/tooltipText';

const mapState = (state: IRootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
  addPromos: dispatch.promos.addPromos,
  updatePromos: dispatch.promos.updatePromos,
  deletePromos: dispatch.promos.deletePromos,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {
  promo?: IPromos;
};

const Promo: FC<IProps> = ({ promo, addPromos, updatePromos, deletePromos }) => {
  const [titleForMainHTML, setTitleForMainHTML] = useState<string>((promo && promo.titleForMain) || '');

  const [form] = Form.useForm();

  useEffect(() => {
    if (promo) {
      form.setFieldsValue({
        titleForMain: promo.titleForMain,
        title: promo.title,
        description: promo.description,
        shortDescription: promo.shortDescription,
        image: promo.image,
        sliderImage: promo.sliderImage,
      });
      setTitleForMainHTML(promo.titleForMain || '');
    }
  }, [promo, form]);

  const onFinish = (values: IPromos) => {
    if (promo) {
      updatePromos({ ...values, id: promo.id });
    } else {
      addPromos(values);
    }
    form.resetFields();
    setTitleForMainHTML('');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onDeleteReview = () => {
    if (promo && promo.id) {
      deletePromos(promo.id);
    }
  };

  const onTitleForMainChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitleForMainHTML(event.target.value || '');
  };

  return (
    <Form form={form} layout="vertical" name="promo" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        label="Заголовок для главной"
        name="titleForMain"
        tooltip={<MarkdownTooltip text={tooltipText} />}
        rules={[{ required: true, message: 'Введите заголовок для главной' }]}
      >
        <Input.TextArea rows={2} onChange={onTitleForMainChange} />
      </Form.Item>
      {titleForMainHTML && (
        <div>
          Предпросмотр заголовока для главной
          <div
            dangerouslySetInnerHTML={{ __html: marked(titleForMainHTML) }}
            style={{ backgroundColor: 'white', border: '1px solid #d9d9d9', padding: '10px', margin: '10px 0px 20px 0px' }}
          />
        </div>
      )}
      <Form.Item label="Заголовок" name="title" rules={[{ required: true, message: 'Введите заголовок' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Описание" name="description" rules={[{ required: true, message: 'Введите описание' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="Короткое описание"
        name="shortDescription"
        rules={[{ required: true, message: 'Введите короткое описание' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <div className="uploadsBlock">
        {promo && (
          <>
            <Form.Item label="Картинка" name="image">
              <SingleUpload form={form} url={promo.image} />
            </Form.Item>
            <Form.Item label="Картинка для слайдера" name="sliderImage">
              <SingleUpload form={form} formName="sliderImage" url={promo.sliderImage} />
            </Form.Item>
          </>
        )}
        {!promo && (
          <>
            <Form.Item label="Картинка" name="image">
              <SingleUpload form={form} />
            </Form.Item>
            <Form.Item label="Картинка для слайдера" name="sliderImage">
              <SingleUpload form={form} formName="sliderImage" />
            </Form.Item>
          </>
        )}
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
        {promo && (
          <Button type="primary" danger style={{ marginLeft: '10px' }} onClick={onDeleteReview}>
            Удалить
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default connect(mapState, mapDispatch)(Promo);
