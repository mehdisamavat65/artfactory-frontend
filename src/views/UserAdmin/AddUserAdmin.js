import React, { useState } from "react";
import { Grid, Paper, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IoMdAddCircleOutline } from "react-icons/io";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {GET_ALL_USER_ADMIN} from '../../graphql/graphql';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: "50px"
  },
  button: {
    margin: theme.spacing(1)
  },
  sendToRight: {
    textAlign: "right"
  },
  topSpaceText: {
    marginTop: "30px"
  },
  switchTop:{
      marginTop:"30px"
  },
  successColor:{
      color:"green"
  }
}));
const AddUserAdmin = (props) => {
  const classes = useStyles();
    const [userAdminState,setUserAdminState] = useState({
        name:'',
        mobile:'',
        password:'',
        confirmPassword:'',
        active:true,
        access:{
            admin:false,
            teacher:false,
            departemant:false,
            course:false,
            student:false,
            gallery:false,
            offer:false,
            website:false,
            online:false,
            live:false
        }
    });

    const changeHandler = e =>{
        setUserAdminState({...userAdminState,[e.target.name]:e.target.value});
    }

    const activechangeHandler = e =>{
        setUserAdminState({...userAdminState,active:e.target.checked})
    }
    const accessChangeHandler =  e =>{
         
  
        setUserAdminState({...userAdminState,access:{...userAdminState.access,[e.target.name]:e.target.checked}});
    }

    const [registerUserAdmin,{loading}] = useMutation(REGISTER_ADMIN,{
        update(proxy,result){
                const data = proxy.readQuery({
                    query:GET_ALL_USER_ADMIN
                });

                data.getAllUserAdmin = [...data.getAllUserAdmin,result.data.registerUserAdmin];

                proxy.writeQuery({
                    query:GET_ALL_USER_ADMIN,
                    data
                })

            props.history.push('/admin/useradmin') ;   
        },
        onError(err){
            console.log(err.graphQLErrors[0].message);
        },
        variables:userAdminState
    });

    const onSubmitHandler = e =>{
        e.preventDefault();
        registerUserAdmin();
    }
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.sendToRight}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<IoMdAddCircleOutline />}
            >
              Add Admin User
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper elevation={3} className={classes.paper}>
              <h3>User Admin Information</h3>
              <TextField
                variant="outlined"
                name="name"
                placeholder="Please Insert Name"
                fullWidth
                label="Name"
                className={classes.topSpaceText}
                value={userAdminState.name}
                onChange = {changeHandler}
                required
              />
              <TextField
                variant="outlined"
                name="mobile"
                placeholder="Please Insert Mobile"
                fullWidth
                label="Mobile Number"
                className={classes.topSpaceText}
                value={userAdminState.mobile}
                onChange = {changeHandler}
                required
              />
              <TextField
                variant="outlined"
                type="password"
                name="password"
                placeholder="Please Insert Password"
                fullWidth
                label="Password"
                className={classes.topSpaceText}
                value={userAdminState.password}
                onChange = {changeHandler}
                required
              />
              <TextField
                variant="outlined"
                type="password"
                name="confirmPassword"
                placeholder="Please Insert Confirm Password"
                fullWidth
                label="Confirm Password "
                className={classes.topSpaceText}
                value={userAdminState.confirmPassword}
                onChange = {changeHandler}
                required
              />
              <FormControlLabel className={classes.switchTop} 
                control={
                  <Switch
                  name="active"
                    checked={userAdminState.active}
                    onChange={activechangeHandler}
                    color="primary"
                  />
                }
                label="Active User Admin"
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} className={classes.paper}>
                <h3>User Admin Access</h3>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormControlLabel className={classes.switchTop} 
                control={
                  <Switch
                    name="admin"
                    color="primary"
                    checked={userAdminState.access.admin}
                    onChange={accessChangeHandler}
                  />
                }
                label="Access Admin"
              />
                    </Grid>    
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormControlLabel className={classes.switchTop} 
                control={
                  <Switch
                  name="teacher"
                  checked={userAdminState.access.teacher}
                  onChange={accessChangeHandler}
                    color="primary"
                  />
                }
                label="Access Teacher"
              />
                    </Grid>    
                </Grid>    
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormControlLabel className={classes.switchTop} 
                control={
                  <Switch
                    name="departemant"
                    checked={userAdminState.access.departemant}
                    onChange={accessChangeHandler}
                    color="primary"
                  />
                }
                label="Access Departemant"
              />
                    </Grid>    
                </Grid>    
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormControlLabel className={classes.switchTop} 
                control={
                  <Switch
                  name="course"
                  checked={userAdminState.access.course}
                  onChange={accessChangeHandler}
                    color="primary"
                  />
                }
                label="Access Course"
              />
                    </Grid>    
                </Grid>    
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormControlLabel className={classes.switchTop} 
                control={
                  <Switch
                  name="student"
                  checked={userAdminState.access.student}
                  onChange={accessChangeHandler}
                    color="primary"
                  />
                }
                label="Access Student"
              />
                    </Grid>    
                </Grid>    
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormControlLabel className={classes.switchTop} 
                control={
                  <Switch
                  name="gallery"
                  checked={userAdminState.access.gallery}
                  onChange={accessChangeHandler}
                    color="primary"
                  />
                }
                label="Access Gallery"
              />
                    </Grid>    
                </Grid>    
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormControlLabel className={classes.switchTop} 
                control={
                  <Switch
                  name="offer"
                  checked={userAdminState.access.offer}
                  onChange={accessChangeHandler}
                    color="primary"
                  />
                }
                label="Access Offer"
              />
                    </Grid>    
                </Grid>    
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormControlLabel className={classes.switchTop} 
                control={
                  <Switch
                  name="website"
                  checked={userAdminState.access.website}
                  onChange={accessChangeHandler}
                    color="primary"
                  />
                }
                label="Access Webiste"
              />
                    </Grid>    
                </Grid>    
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormControlLabel className={classes.switchTop} 
                control={
                  <Switch
                  name="online"
                  checked={userAdminState.access.online}
                  onChange={accessChangeHandler}
                    color="primary"
                  />
                }
                label="Access Online"
              />
                    </Grid>    
                </Grid>    
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormControlLabel className={classes.switchTop} 
                control={
                  <Switch
                  name="live"
                  checked={userAdminState.access.live}
                  onChange={accessChangeHandler}
                    color="primary"
                  />
                }
                label="Access Live"
              />
                    </Grid>    
                </Grid>        
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const REGISTER_ADMIN = gql`
    mutation registerUserAdmin($name:String,$password:String,$mobile:String,$confirmPassword:String,$active:Boolean,$access:InputAccess){
  registerUserAdmin(name:$name,mobile:$mobile,password:$password,confirmPassword:$confirmPassword,active:$active,access:$access){
    id
    name
    mobile
    active
    password
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

export default AddUserAdmin;
