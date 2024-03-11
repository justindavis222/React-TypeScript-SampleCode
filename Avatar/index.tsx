import React from 'react';
import { Avatar as AvatarMUI, AvatarProps, styled } from '@mui/material';

export enum AvatarColor {
  Green = 'green',
  Orange = 'orange',
  Red = 'red',
  Purple = 'purple',
}

export enum AvatarSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export const AvatarSizeStyles = {
  [AvatarSize.Small]: {
    width: 24,
    height: 24,
    fontSize: '12px',
    lineHeight: '18px',
  },
  [AvatarSize.Medium]: {
    width: 32,
    height: 32,
    fontSize: '14px',
    lineHeight: '20px',
  },
  [AvatarSize.Large]: {
    width: 40,
    height: 40,
    fontSize: '18px',
    lineHeight: '28px',
  },
};

export const AvatarColorStyles = {
  [AvatarColor.Green]: { bgcolor: '#E9FFF2', color: '#4A8362' },
  [AvatarColor.Orange]: { bgcolor: '#FFE8CC', color: '#D07306' },
  [AvatarColor.Red]: { bgcolor: '#FFDCE0', color: '#CE4553' },
  [AvatarColor.Purple]: { bgcolor: '#F6DFFF', color: '#4D1A69' },
};

type IAvatarProps = AvatarProps & {
  size?: AvatarSize;
  color?: AvatarColor;
  isIcon?: boolean;
};

const StyledAvatar = styled(AvatarMUI)({
  svg: {
    width: '100%',
    height: 'auto',
  },
});

const Avatar = ({
  sx,
  size = AvatarSize.Medium,
  color = AvatarColor.Purple,
  isIcon,
  children,
  ...other
}: IAvatarProps) => {
  const sizeStyles = {
    ...AvatarSizeStyles[size],
    padding: isIcon ? (size === AvatarSize.Small ? '4px' : '3px') : null,
  };
  const colorStyles = { ...AvatarColorStyles[color] };

  return (
    <StyledAvatar
      sx={{
        fontFamily: 'Inter',
        fontWeight: 500,
        textIndent: 0,
        ...sizeStyles,
        ...colorStyles,
        ...sx,
      }}
      {...other}
    >
      {children}
    </StyledAvatar>
  );
};

export default Avatar;
