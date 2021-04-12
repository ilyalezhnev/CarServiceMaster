import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Button, Form, Input } from 'antd';
import { IReviews } from '../../models/reviews';
import { IMainPage } from '../../models/mainPage';
import marked from 'marked';
import MarkdownTooltip from '../common/MarkdownTooltip';
import { tooltipText } from '../../constants/tooltipText';

const mapState = (state: IRootState) => ({
  mainPage: state.mainPage.data
});

const mapDispatch = (dispatch: Dispatch) => ({
  getMainPage: dispatch.mainPage.getMainPage,
  addMainPage: dispatch.mainPage.addMainPage,
  updateMainPage: dispatch.mainPage.updateMainPage
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {
  review?: IReviews;
};

const MainPage: FC<IProps> = ({ mainPage, getMainPage, addMainPage, updateMainPage }) => {
  const [descriptionHTML, setDescriptionHTML] = useState<string>((mainPage && mainPage.serviceDescription) || '');
  const [form] = Form.useForm();

  useEffect(() => {
    getMainPage();
  }, []);

  useEffect(() => {
    if (mainPage) {
      form.setFieldsValue({
        title: mainPage.title,
        subtitle: mainPage.subtitle,
        serviceDescription: mainPage.serviceDescription
      });
      setDescriptionHTML(mainPage.serviceDescription || '');
    }
  }, [mainPage]);

  const onFinish = (values: IMainPage) => {
    if (mainPage) {
      updateMainPage({ ...values, id: mainPage.id });
    } else {
      addMainPage(values);
    }
    form.resetFields();
    setDescriptionHTML('');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionHTML(event.target.value || '');
  };

  return (
    <Form form={form} layout="vertical" name="mainPage" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="Заголовок" name="title" rules={[{ required: true, message: 'Введите заголовок' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Подзаголовок" name="subtitle" rules={[{ required: true, message: 'Введите подзаголовок' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Описание сервиса"
        name="serviceDescription"
        rules={[{ required: true, message: 'Введите описание сервиса' }]}
        tooltip={<MarkdownTooltip text={tooltipText} />}
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(mapState, mapDispatch)(MainPage);
