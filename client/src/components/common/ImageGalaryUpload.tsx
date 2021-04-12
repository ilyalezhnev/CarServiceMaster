import React, { FC, useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { IUploads } from '../../models/uploads';
import { imageUploadUrl } from '../../constants/urls';
import { ICorporatesClientImages, IImageGalaryUpload } from '../../models/corporateClientsImages';

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
  images?: UploadFile<IUploads>[];
  saveImage: (image: IUploads) => void;
  deleteImage: (imageId: number) => void;
}

const ImageGalaryUpload: FC<IProps> = ({ images, saveImage, deleteImage }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (info: UploadChangeParam<UploadFile<IUploads>>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      if (info.file.response) {
        saveImage(info.file.response);
      }
    }
  };
  const handleRemove = (file: UploadFile<IUploads>) => {
    if (file.response) {
      deleteImage(file.response.id);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </div>
  );
  return (
    <>
      {/* {images &&
        images.map(image => (
          <Upload style={{ width: '200px', height: '200px' }} name="avatar" listType="picture-card" showUploadList={false}>
            {<img src={image.url} alt="avatar" style={{ width: '100%' }} />}
          </Upload>
        ))} */}
      <Upload
        style={{ width: '200px', height: '200px' }}
        name="avatar"
        listType="picture-card"
        fileList={images}
        action={imageUploadUrl}
        headers={{ Authorization: localStorage.jwtToken }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {uploadButton}
      </Upload>
    </>
  );
};

export default ImageGalaryUpload;
