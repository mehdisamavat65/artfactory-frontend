import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks'
import AuthContext from 'context/authContext';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {AiOutlineLoading} from 'react-icons/ai';
import CircularProgress from '@material-ui/core/CircularProgress';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const [snackState,setSnackState] = useState({
    open:false,
    message:''
  })

  const authContext = useContext(AuthContext);
  const {login} = authContext;
  const [loginState,setLoginState] = useState({
    mobile:'',
    password:''
  })
  const [loginUserAdmin,{loading}] = useMutation(LOGIN_USERADMIN,{
    update(_,result){
      if(result){
        if(result.data.loginUserAdmin.active){
          login(result.data.loginUserAdmin);
          props.history.push('/'); 
        }else{
            setSnackState({open:true,message:"This Admin has no permission to login"})
        }
      }
      
     
       
    },
    onError(err){
      setSnackState({open:true,message:err.graphQLErrors[0].message})
    },
    variables:loginState
  });

  const changeSubmitHandler = (e) =>{
    setLoginState({...loginState,[e.target.name]:e.target.value});
  }

  const onSubmitHandler = e =>{
    e.preventDefault();
    loginUserAdmin();
  }
  
  const handleClose = () =>{
    setSnackState({...snackState,open:false});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile Number"
            name="mobile"
            autoComplete="mobile"
            autoFocus
            value={loginState.mobile}
            onChange={changeSubmitHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginState.password}
            onChange={changeSubmitHandler}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading? <CircularProgress color="secondary" size={18}/>:"Sign In"} 
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={snackState.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {snackState.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

const LOGIN_USERADMIN= gql`
  mutation loginUserAdmin($mobile:String!,$password:String!){
  
  loginUserAdmin(mobile:$mobile,password:$password){
    id
    name
    mobile
    token
    active
    access{
      admin
      teacher
      departemant
      course
      student
      gallery
      offer
      website
      online
      live
    }
  }
}




`;