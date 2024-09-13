import React from 'react';

const Text: React.FC<{ variant: 'title' | 'body'; children: React.ReactNode }> = ({ variant, children }) => {
  const classNames =
    variant === 'title' ? 'text-3xl font-bold mb-8' : 'text-lg font-semibold';
  return <span className={classNames}>{children}</span>;
};

export default Text;