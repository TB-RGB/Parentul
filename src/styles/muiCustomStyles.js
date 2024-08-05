import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const muiCustomStyles = {
    box: {
        width: {
            xs: '100vw',
            sm: '100vw',
            md: '800px',
            lg: '800px',
        },
        margin: 'auto',
        marginTop: '3.5em',
        padding: 2
    },
    card: {
        color: 'white',
        backgroundColor: '#1E1E1E',
        borderRadius: '1em',
        margin: theme.spacing(2, 0),
        padding: theme.spacing(4),
        boxShadow: '0px 0px 15px #FFA560',
        border: '2px outset #FFA500'
    },
    faqcard: {
        color: 'white',
        backgroundColor: '#1E1E1E',
        borderRadius: '1em',
        margin: theme.spacing(1, 0, 0, 0),
        padding: theme.spacing(2, 4, 2, 4),
        boxShadow: '0px 0px 5px #FFA560',
        border: '1px outset #FFA500'
    },
    childcard: {
        color: 'white',
        backgroundColor: '#1E1E1E',
        borderRadius: '1em',
        margin: theme.spacing(0, 0),
        padding: theme.spacing(1),
        boxShadow: '0px 0px 5px #FFA560',
        border: '1px outset #FFA500',
        textAlign: 'center'
    },
    deleteButton: {
        border: '1px outset orange',
        '&:hover': {
            borderColor: '#FFA555',
            color: '#FFA500',
        },
        padding: .7,

        borderRadius: '.15em'
    },
    divider: {

        borderColor: 'white',
        my: 2,
        color: 'white',
        fontSize: '25px'
    },
    firstTimeDivider: {

        '&::before, &::after': { borderColor: 'orange' },
        my: 1,
        color: 'white',
        fontSize: '25px'
    },
    gridItem: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
    },
    childGridItem: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
    },
    buttonbox: {
        maxWidth: 800,
        margin: "auto",
        mt: 2,
        display: 'flex',
        justifyContent: 'flex-end'
    },

    snackbarAlert: {
        width: '100%',
        '& .MuiAlert-message': {
            fontSize: '1.3rem',
        },
        backgroundColor: '#ffe482'
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
    textFieldTopEdit: {
        marginTop: 1,
        marginBottom: 1,
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
    textFieldBottomEdit: {
        marginTop: 0,
        marginBottom: 1,
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
        marginBottom: theme.spacing(1),
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
        border: "1px outset orange",

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
    header: {
        textAlign: 'center',
        fontSize: {
            xs: '35px',
            sm: '40px',
            md: '65px',
            lg: '65px',
        }
    },
    large: {
        fontSize: {
            xs: '30px',
            sm: '35px',
            md: '50px',
            lg: '50px',
        },
        textAlign: 'center',
        paddingBottom: 2
    },
    medium: {
        fontSize: {
            xs: '20px',
            sm: '20px',
            md: '30px',
            lg: '30px',
        }
    },
    small: {

        fontSize: {
            xs: '24px',
            sm: '20px',
            md: '25px',
            lg: '25px',
        },
        fontWeight: '400'

    },
    select: {
        '& .MuiOutlinedInput-root': {
            color: 'white',
            borderRadius: '1em',
            '& fieldset': {
                borderColor: 'orange',
                border: '2px outset orange'
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
            borderRadius: '1em'
        },
        '& .MuiList-root': {
            padding: 0,
            borderRadius: '1em'
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

        borderRadius: '1em'
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
        boxShadow: "0px 0px 5px #FFA560",
        borderRadius: "1em",
        color: "white",
        '&:first-of-type': {
            borderTopLeftRadius: '1em',
            borderTopRightRadius: '1em',
        },
        '&:last-of-type': {
            borderBottomLeftRadius: '1em',
            borderBottomRightRadius: '1em',
        },
        '&:before': {
            display: 'none',
        },
    },
    accordionSummary: {
        borderRadius: '1em',
    },
    accordionDetails: {
        borderTop: '1px solid rgba(255, 165, 0, 0.5)',
    },


};


export default muiCustomStyles;