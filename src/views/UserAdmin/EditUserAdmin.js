import React, { useState, useMemo } from "react";
import { Grid, Paper, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MdUpdate } from "react-icons/md";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
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
  switchTop: {
    marginTop: "30px"
  },
  successColor: {
    color: "green"
  }
}));
const EditUserAdmin = props => {
  const classes = useStyles();
  const [userAdminState, setUserAdminState] = useState({
      id:'',
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    active: true,
    access: {
      admin: false,
      teacher: false,
      departemant: false,
      course: false,
      student: false,
      gallery: false,
      offer: false,
      website: false,
      online: false,
      live: false
    }
  });

  const { loading: load, data: adminInfo } = useQuery(GET_A_USER_ADMIN, {
    variables: { id: props.match.params.id }
  });

  useMemo(() => {
    if (adminInfo) {
        
      setUserAdminState({
        ...adminInfo.getAUserAdmin,
        confirmPassword: adminInfo.getAUserAdmin.password
      });
    }
  }, [adminInfo]);

  const [updateUserAdmin, { loading }] = useMutation(UPDATE_USER_ADMIN, {
    update(proxy, result) {
        const dataUpdate = proxy.readQuery({
            query:GET_ALL_USER_ADMIN
        });

        dataUpdate.getAllUserAdmin= dataUpdate.getAllUserAdmin.map(dat => dat.id === result.data.updateUserAdmin.id ? 
            dat = result.data.updateUserAdmin
            : dat);
        proxy.writeQuery({
            query:GET_ALL_USER_ADMIN,
            data:dataUpdate
        })    


      props.history.push('/admin/useradmin')
      //console.log(result.data.updateUserAdmin);
    },
    onError(err) {
      console.log(err.graphQLErrors[0].message);
    },
    variables: {id:userAdminState.id,name:userAdminState.name,mobile:userAdminState.mobile,password:userAdminState.password,confirmPassword:userAdminState.confirmPassword,active:userAdminState.active,access:{admin:userAdminState.access.admin,teacher:userAdminState.access.teacher,departemant:userAdminState.access.departemant,course:userAdminState.access.course,student:userAdminState.access.student,gallery:userAdminState.access.gallery,offer:userAdminState.access.offer,website:userAdminState.access.website,online:userAdminState.access.online,live:userAdminState.access.live}}
  });

  const changeHandler = e => {
    setUserAdminState({ ...userAdminState, [e.target.name]: e.target.value });
  };

  const activechangeHandler = e => {
    setUserAdminState({ ...userAdminState, active: e.target.checked });
  };
  const accessChangeHandler = e => {
    setUserAdminState({
      ...userAdminState,
      access: { ...userAdminState.access, [e.target.name]: e.target.checked }
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    updateUserAdmin();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.sendToRight}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<MdUpdate />}
            >
              Update Admin User
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
                required
              />
              <FormControlLabel
                className={classes.switchTop}
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
                  <FormControlLabel
                    className={classes.switchTop}
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
                  <FormControlLabel
                    className={classes.switchTop}
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
                  <FormControlLabel
                    className={classes.switchTop}
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
                  <FormControlLabel
                    className={classes.switchTop}
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
                  <FormControlLabel
                    className={classes.switchTop}
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
                  <FormControlLabel
                    className={classes.switchTop}
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
                  <FormControlLabel
                    className={classes.switchTop}
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
                  <FormControlLabel
                    className={classes.switchTop}
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
                  <FormControlLabel
                    className={classes.switchTop}
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
                  <FormControlLabel
                    className={classes.switchTop}
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

const GET_A_USER_ADMIN = gql`
  query getAUserAdmin($id: ID!) {
    getAUserAdmin(id: $id) {
      id
      name
      active
      mobile
      password
      access {
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

const UPDATE_USER_ADMIN = gql`
  mutation updateUserAdmin(
    $id:ID!,$name:String!,$mobile:String!,$password:String!,$confirmPassword:String!,$access:InputAccess!,$active:Boolean!
  ){
  updateUserAdmin(id:$id,name:$name,password:$password,mobile:$mobile,
    confirmPassword:$confirmPassword,active:$active,access:$access){
    id
    name
    mobile
    password
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

export default EditUserAdmin;
