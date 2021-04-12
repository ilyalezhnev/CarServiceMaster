import React, { FC } from 'react';

interface IProps {
  text?: string;
}

const NoContent: FC<IProps> = ({ text }) => {
  return <div className="noContent">{text || 'Нет контента'}</div>;
};

export default NoContent;
