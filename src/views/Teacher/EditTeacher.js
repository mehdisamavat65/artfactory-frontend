import React, { useState, useMemo } from "react";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Grid, Button, Paper, TextField } from "@material-ui/core";
import { MdUpdate } from "react-icons/md";
import PicturesWall from "components/PictureWall/PicturesWall";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
    marginTop: "40px"
  },
  textfiled: {
    marginTop: "30px"
  },
  quill: {
    height: "300px"
  }
}));

const EditTeacher = props => {
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

  const [teacherState, setTeacherState] = useState({
    id: "",
    name: "",
    mobile: "",
    password: "",
    picture: "",
    active: ""
  });

  const [resumeState, setResumeState] = useState("");

  const { loading: load, data } = useQuery(GET_A_TEACHER, {
    variables: { id: props.match.params.id }
  });

  useMemo(() => {
    if (data) {
      setTeacherState(data.getATeacher);
      setResumeState(data.getATeacher.resume);
    }
  }, [data]);

  const [updateTeacher, { loading }] = useMutation(UPDATE_TEACHER, {
    update(proxy, result) {
       const teachersData =  proxy.readQuery({
         query:GET_ALL_TEACER
       });

       teachersData.getAllTeacher = teachersData.getAllTeacher.map(teach => teach.id === result.data.updateTeacher.id ? teach = result.data.updateTeacher : teach);

        proxy.writeQuery({
          query:GET_ALL_TEACER,
          data:teachersData
        });

        props.history.push('/admin/teachers');
    },
    onError(err) {
      console.log(err.graphQLErrors[0].message);
    },
    variables: { ...teacherState, resume: resumeState }
  });
  const ChangeHandler = e => {
    setTeacherState({ ...teacherState, [e.target.name]: e.target.value });
  };
  const activeChangeState = e => {
    setTeacherState({ ...teacherState, active: !teacherState.active });
  };

  const resumeChangeHandler = value => {
    setResumeState(value);
  };
  const setUrl = url => {
    setTeacherState({ ...teacherState, picture: url });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateTeacher();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.sendToRight}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<MdUpdate />}
              type="submit"
            >
              Update Teacher
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
                onChange={ChangeHandler}
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
                onChange={ChangeHandler}
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
                onChange={ChangeHandler}
              />
              <FormControlLabel
                className={classes.textfiled}
                control={
                  <Switch
                    checked={teacherState.active}
                    onChange={activeChangeState}
                    color="primary"
                  />
                }
                label="Active Teacher"
              />
            </Paper>
            <Paper
              elevation={3}
              className={classes.paper}
              style={{ paddingBottom: "100px" }}
            >
              <h4>Teacher Information</h4>
              <ReactQuill
                modules={moduless}
                formats={formats}
                className={classes.quill}
                value={resumeState}
                onChange={resumeChangeHandler}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} className={classes.paper}>
              <h4>Teacher Picture</h4>
              {teacherState.picture ? (
                <PicturesWall
                  setUrl={setUrl}
                  defaultImage={teacherState.picture}
                />
              ) : null}
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const GET_A_TEACHER = gql`
  query getATeacher($id: ID!) {
    getATeacher(id: $id) {
      id
      name
      mobile
      password
      active
      picture
      resume
    }
  }
`;

const UPDATE_TEACHER = gql`
mutation updateTeacher($id:ID!,$name:String,$mobile:String,$password:String,$picture:String,$active:Boolean,$resume:String){
 
  updateTeacher(id:$id,name:$name,mobile:$mobile,password:$password,picture:$picture,active:$active,resume:$resume){
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
export default EditTeacher;
