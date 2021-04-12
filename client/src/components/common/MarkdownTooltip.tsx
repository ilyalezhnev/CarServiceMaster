import React, { FC } from 'react';
import marked from 'marked';

interface IProps {
  text: string;
}

const MarkdownTooltip: FC<IProps> = ({ text }) => {
  return (
    <div className="markdownTooltip">
      <pre>{text}</pre>
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </div>
  );
};

export default MarkdownTooltip;
