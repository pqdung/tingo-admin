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
  MSelect: {
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
  MDataGridPaginationTop: {
    '& .MuiDataGrid-columnHeaderTitleContainer': {
      height: '56px'
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      alignItems: 'center',
      color: '#1A2038',
      textAlign: 'center',
      whiteSpace: 'break-spaces !important',
      lineHeight: 'normal',
      fontWeight: '600 !important',
    },
    '& .MuiDataGrid-root': {
      fontFamily: 'Kanit',
      borderRadius: '10px !important',
      overflow: 'hidden',
      display: 'flex !important',
      flexDirection: 'column-reverse',
      '& .MuiDataGrid-columnsContainer': {
        justifyContent: 'center',
      },
      '& .MuiDataGrid-row': {
        maxHeight: 'none !important',
        '& .MuiDataGrid-cell': {
          // padding: '5px',
          overflowWrap: 'anywhere',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          lineHeight: '120% !important',
          maxHeight: 'none !important',
          whiteSpace: 'unset !important',
          overflow: 'unset !important',
        },
        '& .MuiDataGrid-cell--textRight': {
          justifyContent: 'flex-end',
        },
        '& .MuiDataGrid-cell--textLeft': {
          justifyContent: 'flex-start',
        },
        '&:last-child': {
          '&.Mui-selected': {
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          },
        }
      },
      '& .MuiDataGrid-cell:focus-within,& .MuiDataGrid-cell:focus,& .MuiDataGrid-columnHeader:focus-within,& .MuiDataGrid-columnHeader:focus':
        {
          outline: 'none',
        },
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '5px',
      fontSize: '14px',
    },
    '& .MuiDataGrid-footerContainer': {
      borderBottom: '1px solid #E5E5E5 !important',
      // height: '50px',
    },
    '& .MuiTablePagination-toolbar': {
      color: '#AEAEAE',
      '& .MuiTypography-body2': {
        fontFamily: 'Kanit',
      },
    },

    '& .MuiCheckbox-colorPrimary.Mui-checked': {
      color: '#1A2038',
    },
  },
});

export { useStyles };
