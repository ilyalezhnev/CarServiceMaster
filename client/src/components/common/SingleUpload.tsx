import React, { FC, useEffect, useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { IUploads } from '../../models/uploads';
import { FormInstance } from 'antd/lib/form/Form';
import { imageUploadUrl } from '../../constants/urls';

function beforeUpload(file: RcFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml';
  if (!isJpgOrPng) {
    message.error('Можно загружать только JPG/PNG/SVG файлы!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Картинка должна быть меньше 5MB!');
  }
  return isJpgOrPng && isLt2M;
}

interface IProps {
  form: FormInstance<any>;
  formName?: string;
  url?: string;
}

const SingleUpload: FC<IProps> = ({ form, url, formName }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(url || '');
  useEffect(() => {
    if (url) {
      setImageUrl(url);
    }
  }, [url]);
  const handleChange = (info: UploadChangeParam<UploadFile<IUploads>>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      if (info.file.response) {
        setImageUrl(info.file.response.url);
        form.setFieldsValue(formName ? { [formName]: info.file.response.url } : { image: info.file.response.url });
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </div>
  );
  return (
    <Upload
      style={{ width: '200px', height: '200px' }}
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      action={imageUploadUrl}
      headers={{ Authorization: localStorage.jwtToken }}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default SingleUpload;
