import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Paper } from "@material-ui/core";
import {MdQueuePlayNext} from 'react-icons/md';

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


const CourseInformation = () => {
  const classes = useStyles();
  const [courseState,setCourseState] = useState({
      id:'',
    description:''
   
  })
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
      ["link", "image","video"],
      [{ direction: "rtl" }],

      [{ color: [] }, { background: [] }],
      [{ font: ['', 'times-new-roman', 'arial','tahoma'] }],
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
    "video",
    "direction",
    "size",
    "color",
    "font",
    "align"
  ];


  const descriptionHanlder = value =>{
      setCourseState({...setCourseState,description:value});
  }


  return (
    <div>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.sendToRight}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<MdQueuePlayNext />}
              type="submit"
            >
              Save Course Information And Next
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper elevation={3} className={classes.paper} style={{paddingBottom:"100px"}}>
                    <h4>Course Description</h4>
                    <ReactQuill modules={moduless} formats={formats} className={classes.quill}
                    value={courseState.description}
                    onChange={descriptionHanlder}
                
                 />
                </Paper>
            </Grid>
            
        </Grid>
      </form>
    </div>
  );
};

export default CourseInformation;
