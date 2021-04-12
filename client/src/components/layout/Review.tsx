import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, IRootState } from '../../redux/store';
import { Button, Form, Input } from 'antd';
import { IReviews } from '../../models/reviews';
import SingleUpload from '../common/SingleUpload';

const mapState = (state: IRootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
  addReviews: dispatch.reviews.addReviews,
  updateReviews: dispatch.reviews.updateReviews,
  deleteReviews: dispatch.reviews.deleteReviews
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {
  review?: IReviews;
};

const Review: FC<IProps> = ({ review, addReviews, updateReviews, deleteReviews }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      fullName: review && review.fullName,
      text: review && review.text,
      image: ''
    });
  }, [review]);

  const onFinish = (values: IReviews) => {
    if (review) {
      updateReviews({ ...values, id: review.id });
    } else {
      addReviews(values);
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onDeleteReview = () => {
    if (review) {
      deleteReviews(review.id);
    }
  };

  return (
    <Form form={form} layout="vertical" name="review" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="Имя Фамилия" name="fullName" rules={[{ required: true, message: 'Введите имя и фамилию' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Отзыв" name="text" rules={[{ required: true, message: 'Введите отзыв' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      {review && (
        <Form.Item label="Картинка" name="image">
          <SingleUpload form={form} url={review.image} />
        </Form.Item>
      )}
      {!review && (
        <Form.Item label="Картинка" name="image">
          <SingleUpload form={form} />
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
        {review && (
          <Button type="primary" danger style={{ marginLeft: '10px' }} onClick={onDeleteReview}>
            Удалить
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default connect(mapState, mapDispatch)(Review);
