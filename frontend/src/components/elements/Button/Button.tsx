import { Button as MuiButton } from '@mui/material';
import type { ButtonProps } from '@mui/material';

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <MuiButton variant="contained" {...props}>
      {children}
    </MuiButton>
  );
};

