import React from 'react'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {withRouter} from 'react-router-dom'
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";



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
const TeacherItem = (props) => {
    const classes = useStyles();
    const {teacher} = props;
    const editTeacherHandler = e => {
      props.history.push(`/admin/editteacher/${teacher.id}`);
    }
    return (
        <Grid item  xs={12} sm={12} md={6} lg={3}>
        <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={teacher.picture} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              
              <h4 className={classes.cardTitle}>{teacher.name}</h4>
              
              <Button variant="contained" color="secondary" round onClick={editTeacherHandler}>
                Edit
              </Button>
            </CardBody>
          </Card>
        </Grid>
    )
}

export default  withRouter(TeacherItem)
