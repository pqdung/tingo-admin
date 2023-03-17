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
  MLoginLeft: {},
  MLoginRight: {
    display: 'flex',
    alignItems: 'center'
  },
  MTextField: {
    margin: '10px !important',
    // '& .MuiInputBase-root.MuiOutlinedInput-root': {
    //   height: '40px !important',
    // }
  },
  MButton: {
    margin: '10px !important',
  }
});

export { useStyles };
