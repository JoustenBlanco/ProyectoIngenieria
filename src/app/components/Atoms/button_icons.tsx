import React from 'react';
import Button from './button';
import Icon from './icon';

const IconButton: React.FC<{ iconType: 'user' | 'section' | 'history'; label: string }> = ({ iconType, label }) => {
  return <Button icon={<Icon type={iconType} />} text={label} />;
};

export default IconButton;