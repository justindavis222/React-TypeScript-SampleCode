import React from 'react';
import { AvatarGroup as AvatarGroupMUI, AvatarGroupProps } from '@mui/material';
import {
  AvatarColor,
  AvatarColorStyles,
  AvatarSize,
  AvatarSizeStyles,
} from '../Avatar';

type IAvatarGroupProps = AvatarGroupProps & {
  max?: number;
  total?: number;
  size?: AvatarSize;
  color?: AvatarColor.Purple;
  renderSurplus?: (surplus: any) => JSX.Element;
};

const AvatarGroup = ({
  sx,
  children,
  size = AvatarSize.Medium,
  color = AvatarColor.Purple,
  renderSurplus,
  ...other
}: IAvatarGroupProps) => {
  return (
    <AvatarGroupMUI
      renderSurplus={renderSurplus}
      sx={{
        '&.MuiAvatarGroup-root': {
          justifyContent: 'start',
        },
        '.MuiAvatar-root.MuiAvatarGroup-avatar:first-child': {
          ...AvatarSizeStyles[size],
          ...AvatarColorStyles[color],
          '> *': {
            ...AvatarSizeStyles[size],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        '.MuiAvatar-root': {
          border: 'none',
          marginLeft: -0.5,
        },
        '> *': {
          marginLeft: -0.5,
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </AvatarGroupMUI>
  );
};

export default AvatarGroup;
