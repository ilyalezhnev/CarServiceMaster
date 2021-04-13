import React, { FC, useState } from 'react';
import { Upload, message } from 'antd';
import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { IUploads } from '../../models/uploads';
import { imageUploadUrl } from '../../constants/urls';
import { ICorporatesClientImages } from '../../models/corporateClientsImages';

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
  images?: ICorporatesClientImages[];
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
  const handleRemove = (id: number) => () => {
    if (id) {
      deleteImage(id);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </div>
  );
  return (
    <div className="imageGalaryUpload">
      {images &&
        images.map(image => (
          <div key={image.corporateClientImage.id} className="imageGalaryUpload__imageContainer">
            <div className="imageGalaryUpload__imageCover">
              <div className="imageGalaryUpload__deleteButton" onClick={handleRemove(image.corporateClientImage.imageId)}>
                <DeleteOutlined style={{ fontSize: '20px' }} />
                <div>Удалить</div>
              </div>
            </div>
            <div className="imageGalaryUpload__image">
              <img src={image.url} alt="avatar" style={{ width: '100%' }} />
            </div>
          </div>
        ))}
      <div>
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
          {uploadButton}
        </Upload>
      </div>
    </div>
  );
};

export default ImageGalaryUpload;
