import { makeStyles } from '@mui/styles';
import sidebarBG from '../../assets/images/sidebar/sidebar-bg-dark.jpg';

const useStyles = makeStyles({
  MSideBarContainer: {
    '& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
      backgroundImage: `linear-gradient(to bottom, rgba(34,42,69, 0.96), rgba(34,42,69, 0.96)),url(${sidebarBG})`,
      color: '#ffffff',
    },
    '& .MuiListItemIcon-root': {
      color: '#ffffff',
    },
    '& .MuiButtonBase-root': {
      color: '#ffffff',
    },
  },
  MTopBarContainer: {
    background: '#ffffff',
    color: '#34314c',
    position: 'relative',
  },
  MTopBarUser: {
    position: 'absolute',
    right: '1rem',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '0.1rem',
  },
  MLoginWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#1A2038',
    height: '100vh',
  },
  MLoginContainer: {
    width: '800px !important',
    minHeight: '400px !important',
    margin: '1rem',
    borderRadius: '12px',
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
  },
  MMenuPaperProps: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    marginTop: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
  MTextField: {
    margin: '10px !important',
  },
  MButton: {
    margin: '10px !important',
  },
  MTextValidate: {
    display: 'flex',
    gap: '0.2rem',
    margin: '0 10px !important',
    color: 'red',
    fontSize: 'small',
    fontStyle: 'italic',
  },
  MWarning: {
    width: '16px',
    height: '16px',
    margin: '-2px 5px !important',
    display: 'inline-block',
  },
  Mselect: {
    '& .css-y4ygc1-MuiInputBase-root-MuiOutlinedInput-root': {
      borderRadius: '5px !important',
      // padding: "4px 4px 4px 8px",
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '5px !important',
    },
    '& .Mui-disabled': {
      background: '#EAEBEB',
    },
  },
  MbtnSearch: {
    borderRadius: '4px !important',
    width: '130px',
    height: '40px',
  },
  MbtnClear: {
    borderRadius: '5px !important',
    color: '#fff',
    width: '130px',
    height: '40px',
    '&:hover': {
      backgroundColor: '#676767',
    },
  },
});

export { useStyles };
