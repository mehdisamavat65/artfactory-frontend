import React from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {IoMdAddCircleOutline} from 'react-icons/io';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  sendToRight: {
    textAlign: "right"
  },
  containerGrid: {
    marginTop: "50px"
  }
}));
const Courses = (props) => {
  const classes = useStyles();
  const addClickHandler = () =>{
      props.history.push('/admin/addcourse');
  }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.sendToRight}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<IoMdAddCircleOutline />}
            onClick={addClickHandler}
           
          >
            Add New Course
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Courses;
