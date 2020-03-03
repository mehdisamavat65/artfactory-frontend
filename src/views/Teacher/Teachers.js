import React from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {IoMdAddCircleOutline} from 'react-icons/io';
import {GET_ALL_TEACER} from '../../graphql/graphql';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
import { useQuery } from "@apollo/react-hooks";
import TeacherItem from "./TeacherItem";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  sendToRight:{
      textAlign:"right"
  },
  containerGrid:{
    marginTop:"50px"
  }
}));

const Teachers = (props) => {
  const classes = useStyles();
    const addteacherHandler = e => {
        props.history.push('/admin/addteacher');
    }
    const {loading , data} = useQuery(GET_ALL_TEACER);
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
            onClick={addteacherHandler}
          >
            Add New Teacher
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.containerGrid}>
        {data && data.getAllTeacher.map(teacher => <TeacherItem key={teacher.id} teacher={teacher}/>)}
        
      </Grid>
    </div>
  );
};

export default Teachers;
