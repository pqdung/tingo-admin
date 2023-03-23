import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';

interface Props {
  border?: boolean;
  boxShadow?: boolean;
  contentSX?: any;
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  secondary?: any;
  shadow?: string;
  sx?: any;
  title?: string;
  codeHighlight?: boolean;
  content?: boolean;
  children?: any;
  ref?: any;
}

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
};

const MainCard = forwardRef(
  ({
    border,
    boxShadow,
    children,
    content,
    contentSX,
    darkTitle,
    divider,
    elevation,
    secondary,
    shadow,
    sx,
    title,
    codeHighlight,
    ref,
    ...others
  }: Props) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          ...sx,
          border: border ? '1px solid' : 'none',
          borderRadius: 2,
          borderColor:
            theme.palette.mode === 'dark'
              ? theme.palette.divider
              : theme.palette.grey.A700,
          boxShadow:
            boxShadow && (!border || theme.palette.mode === 'dark')
              ? shadow || theme.shadows
              : 'inherit',
          ':hover': {
            boxShadow: boxShadow ? shadow || theme.shadows : 'inherit',
          },
          '& pre': {
            m: 0,
            p: '16px !important',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.75rem',
          },
        }}>
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: 'subtitle1' }}
            title={title}
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h3">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}

        {/* card footer - clipboard & highlighter  */}
        {codeHighlight && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            {children}
          </>
        )}
      </Card>
    );
  }
);

export default MainCard;
