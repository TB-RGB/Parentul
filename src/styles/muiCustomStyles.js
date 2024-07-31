import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export const muiCustomStyles = {
  card: {
    color: 'white',
    backgroundColor: '#1E1E1E',
    borderRadius: '1em',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(4),
    boxShadow: '0px 0px 20px black',
    border: '2px outset orange'
  },
  textField: {
    color: 'white',
    borderRadius: '1em',
    width: '100%',
    '& .MuiInputBase-input': {
      color: 'white',
      boxShadow: '1px 1px 1px black',
      borderRadius: '1em'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px outset orange',
      boxShadow: '1px 1px 1px black',
      borderRadius: '1em'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '2px outset white',
      boxShadow: '1px 1px 1px black',
      borderRadius: '1em'
    },
    '& .MuiInputLabel-root': {
      color: 'orange'
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'orange'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '2px outset orange',
      boxShadow: '1px 1px 1px black',
      borderRadius: '1em'
    },
    '& input::-webkit-calendar-picker-indicator': {
      filter: 'invert(1)'
    }
  },
  stepLabel: {
    '&&&': {
      '.MuiStepLabel-label': {
        color: theme.palette.common.white,
      },
      '.MuiStepLabel-label.Mui-active': {
        color: '#FFA500',
      },
      '.MuiStepLabel-label.Mui-completed': {
        color: '#4CAF50',
      },
    },
  },
  continueButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: 'white',
    backgroundColor: '#FFA500',
    '&:hover': {
      backgroundColor: '#FF8C00',
    },
  },
  backButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
    '&:hover': {
      borderColor: '#FFA500',
      color: '#FFA500',
    },
  },
  loginContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: '1em',
    padding: theme.spacing(3),
    boxShadow: '0px 0px 20px black',
    border: '2px outset orange'
  },
  checkbox: {
    color: 'orange', 
    '&.Mui-checked': {
        color: 'orange'
    }
  },
  large: {
    fontSize: '50px'
  },
  medium: {
    fontSize: '30px'
  },
  select: {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: 'orange',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'orange',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'orange',
      '&.Mui-focused': {
        color: 'orange',
      },
    },
    '& .MuiSelect-icon': {
      color: 'orange',
    },
  },
  menu: {
    '& .MuiPaper-root': {
      backgroundColor: '#1E1E1E',
      color: 'white',
    },
    '& .MuiList-root': {
      padding: 0,
    },
  },
  menuItem: {
    backgroundColor: '#1E1E1E',
    color: 'orange',
    '&:hover': {
      backgroundColor: 'black',
    },
    '&.Mui-selected': {
      backgroundColor: '#1E1E1E',
      '&:hover': {
        backgroundColor: 'black',
      },
    },
  },
  button: {
    backgroundColor: 'orange',
    color: 'black',
    '&:hover': {
      backgroundColor: 'darkorange',
    },
  },
  accordion: {
    backgroundColor: "#1E1E1E",
    border: "2px outset orange",
    boxShadow: "0px 0px 20px black",
    borderRadius: "1em",
    color: "white",
  }
};


export default muiCustomStyles;