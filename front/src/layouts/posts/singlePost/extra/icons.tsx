import React from 'react';
import { Icon, IconElement, useTheme } from '@ui-kitten/components';

export const ClockIcon = (): IconElement => {
  const theme = useTheme();

  return (
    <Icon
      width='24'
      height='24'
      fill={theme['text-hint-color']}
      name='clock-outline'
    />
  );
};

export const HeartIcon = (style: any): IconElement => (
  <Icon {...style} name='heart'/>
);

export const MessageCircleIcon = (style: any): IconElement => (
  <Icon {...style} name='message-circle-outline'/>
);
