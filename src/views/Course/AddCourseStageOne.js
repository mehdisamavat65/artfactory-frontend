import React, { useState } from "react";
import { Grid, Button, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MdQueuePlayNext } from "react-icons/md";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import courseImgage from "../../assets/img/coureses.jpg";
import workshopImage from "../../assets/img/workshop.jpg";
import eventsImage from "../../assets/img/events.jpg";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  sendToRight: {
    textAlign: "right"
  },
  containerGrid: {
    marginTop: "50px"
  },
  paper: {
    padding: "50px",
    marginTop: "30px"
  },
  text: {
    marginTop: "30px"
  },
  img: {
    objectFit: "cover",
    objectPosition: "top"
  },
  checkIcon:{
      display:"none",
      justifyContent:"center"
      
  }
}));

const AddCourseStageOne = props => {
  const classes = useStyles();
    const [courseState,setCourseState] = useState({
        title:'',
        courseType:''
    })

    const titleCourseHandler = e =>{
        setCourseState({...courseState,title:e.target.value});
    }
  const clickActionHander = name =>{
      
      if(name === "course"){
        document.querySelector('.courses').style.display= "flex";
        document.querySelector('.workshop').style.display = "none";
        document.querySelector('.events').style.display="none"
        setCourseState({...courseState,courseType:"دوره آموزشی"});
      }
      if(name === "workshops"){
          document.querySelector('.workshop').style.display = "flex";
          document.querySelector('.courses').style.display= "none";
          document.querySelector('.events').style.display="none"
          setCourseState({...courseState,courseType:"کارگاه"});
      }
      if(name === "events"){
          document.querySelector('.workshop').style.display = "none";
          document.querySelector('.courses').style.display= "none";
          document.querySelector('.events').style.display="flex"
          setCourseState({...courseState,courseType:"رویداد"});
      }
       
  }

  const [addCourseTitleAndType,{loading}] = useMutation(ADD_COURSE_ONE,{
      update(_,result){
         props.history.push(`/admin/courseinformation/${result.data.addCourseTitleAndType.id}`)
      },
      onError(err){
          console.log(err.graphQLErrors[0].message);
      },
      variables:courseState
  });

  const onSubmit = e =>{
      e.preventDefault();
      addCourseTitleAndType();
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
              startIcon={<MdQueuePlayNext />}
              type="submit"
            >
              Save And Next Stage
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
              <h4>Add Course Title</h4>
              <TextField
                name="title"
                label="Course Title"
                fullWidth
                required
                variant="outlined"
                className={classes.text}
                value={courseState.title}
                onChange={titleCourseHandler}
                
              />
            </Paper>
            <Paper elevation={3} className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Card className={classes.root}>
                    <CardActionArea  onClick={() => clickActionHander('course')}>
                      <CardMedia 
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={courseImgage}
                        title="Contemplative Reptile"
                        
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Course
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                            <div className={`${classes.checkIcon} courses`}>
                          <div class="svg-box">
                            <svg class="circular green-stroke">
                              <circle
                                class="path"
                                cx="75"
                                cy="75"
                                r="50"
                                fill="none"
                                stroke-width="5"
                                stroke-miterlimit="10"
                              />
                            </svg>
                            <svg class="checkmark green-stroke">
                              <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                                <path
                                  class="checkmark__check"
                                  fill="none"
                                  d="M616.306,283.025L634.087,300.805L673.361,261.53"
                                />
                              </g>
                            </svg>
                          </div>
                          </div>
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.root}>
                    <CardActionArea onClick={() => clickActionHander('workshops')}>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={workshopImage}
                        title="Contemplative Reptile"
                        className={classes.img}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Workshop
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                             <div className={`${classes.checkIcon} workshop`}>
                          <div class="svg-box">
                            <svg class="circular green-stroke">
                              <circle
                                class="path"
                                cx="75"
                                cy="75"
                                r="50"
                                fill="none"
                                stroke-width="5"
                                stroke-miterlimit="10"
                              />
                            </svg>
                            <svg class="checkmark green-stroke">
                              <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                                <path
                                  class="checkmark__check"
                                  fill="none"
                                  d="M616.306,283.025L634.087,300.805L673.361,261.53"
                                />
                              </g>
                            </svg>
                          </div>
                          </div>
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.root}>
                    <CardActionArea onClick={() => clickActionHander('events')}>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={eventsImage}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Events
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                             <div className={`${classes.checkIcon} events`}>
                          <div class="svg-box">
                            <svg class="circular green-stroke">
                              <circle
                                class="path"
                                cx="75"
                                cy="75"
                                r="50"
                                fill="none"
                                stroke-width="5"
                                stroke-miterlimit="10"
                              />
                            </svg>
                            <svg class="checkmark green-stroke">
                              <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                                <path
                                  class="checkmark__check"
                                  fill="none"
                                  d="M616.306,283.025L634.087,300.805L673.361,261.53"
                                />
                              </g>
                            </svg>
                          </div>
                          </div>
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const ADD_COURSE_ONE = gql`
mutation addCourseTitleAndType($title:String!,$courseType:String!) {
  addCourseTitleAndType(title:$title,courseType:$courseType){
    id
    title
    courseType
  }
}

`;
export default AddCourseStageOne;
