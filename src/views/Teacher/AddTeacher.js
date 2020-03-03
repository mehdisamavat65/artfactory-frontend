import React, { useState } from "react";
import { Grid, Button, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IoMdAddCircleOutline } from "react-icons/io";
import PicturesWall from "components/PictureWall/PicturesWall";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {GET_ALL_TEACER} from '../../graphql/graphql';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  sendToRight: {
    textAlign: "right"
  },
  paper: {
    padding: "50px",
    marginTop:"40px"
  },
  textfiled: {
    marginTop: "30px"
  },
  quill:{
      height:"300px"
  }
}));

const AddTeacher = props => {
  const classes = useStyles();
  const moduless = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      [{ direction: "rtl" }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"]
    ]
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "direction",
    "size",
    "color",
    "font",
    "align"
  ];

  const [teacherState,setTeacherState] = useState({
      name:'',
      mobile:'',
      password:'',
      picture:'',
      resume:'',
      active:true
  });
  const changeStateHandler = e =>{
      setTeacherState({...teacherState,[e.target.name]:e.target.value});
  }
  const changeActiveHandler = e => {
      setTeacherState({...teacherState,active:!teacherState.active})
  }
  const changeResumeHandler = value => {
      setTeacherState({...teacherState,resume: value})
  }

  const setUrl = url =>{
      setTeacherState({...teacherState,picture:url});
  }
  const [addnewTeacher,{loading}] = useMutation(ADD_NEW_TEACHER,{
    update(proxy,result){
       const teachers = proxy.readQuery({
         query:GET_ALL_TEACER
       });
       teachers.getAllTeacher = [...teachers.getAllTeacher,result.data.addnewTeacher];
       proxy.writeQuery({
         query:GET_ALL_TEACER,
         data:teachers
       })

       props.history.push('/admin/teachers');
    },
    onError(err){
      console.log(err.graphQLErrors[0].message);
    },
    variables: teacherState
  })

  const onSubmitHandler = e => {
    e.preventDefault();
    addnewTeacher();
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.sendToRight}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<IoMdAddCircleOutline />}
              type="submit"
            >
              Add New Teacher
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper elevation={3} className={classes.paper}>
              <h4>Add Teacher Information</h4>
              <TextField
                variant="outlined"
                name="name"
                label="Teacher Name"
                placeholder="Please Insert Teacher Name"
                fullWidth
                required
                className={classes.textfiled}
                value={teacherState.name}
                onChange={changeStateHandler}
              />
              <TextField
                variant="outlined"
                name="mobile"
                label="Teacher Mobile"
                placeholder="Please Insert Teacher Mobile"
                fullWidth
                required
                className={classes.textfiled}
                value={teacherState.mobile}
                onChange={changeStateHandler}
              />
              <TextField
                variant="outlined"
                name="password"
                type="password"
                label="Teacher Password"
                placeholder="Please Insert Teacher Password"
                fullWidth
                required
                className={classes.textfiled}
                value={teacherState.password}
                onChange={changeStateHandler}
              />
              <FormControlLabel
              className={classes.textfiled}
                control={
                  <Switch
                    checked={teacherState.active}
                    onChange={changeActiveHandler}
                    color="primary"
                  />
                }
                label="Active Teacher"
              />
            </Paper>
            <Paper elevation={3} className={classes.paper} style={{paddingBottom:"100px"}} >
                <h4>Teacher Information</h4>
                <ReactQuill modules={moduless} formats={formats} className={classes.quill}
                 value={teacherState.resume}
                 onChange={changeResumeHandler}   
                 />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} className={classes.paper}>
              <h4>Teacher Picture</h4>
              <PicturesWall setUrl={setUrl}/>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
const ADD_NEW_TEACHER = gql`
mutation  addnewTeacher($name:String!,$mobile:String!,$password:String!,$picture:String,$active:Boolean!,$resume:String) {
  addnewTeacher(name:$name,mobile:$mobile,password:$password,
    picture:$picture,active:$active,resume:$resume){
    id
    name
    mobile
    password
    picture
    active
    resume
  }
}

`;
export default AddTeacher;
