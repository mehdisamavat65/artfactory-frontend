import React, { useState,useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  Grid,
  Button,
  Paper,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { CirclePicker } from "react-color";
import SubItem from "./SubItem";

import { MdUpdate } from "react-icons/md";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

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
    padding: "50px"
  },
  alignPaper: {
    padding: "65px"
  },
  textInPut: {
    marginTop: "30px"
  },
  alignCenter: {
    display: "flex",
    alignItems: "flex-end"
  }
}));

const UpdateNewDepartemant = (props) => {
  const classes = useStyles();
    const [departemant,setDepartemant] = useState({
        id:'',
        name:'',
        color:'',
        active:true,
        subDepartemant:[]
    });

    const [subState,setSubState] = useState({
        id:'',
        name:'',
        active:true
    });

    const {loading,data} = useQuery(GET_A_DEPARTEMANT,{
        variables:{id:props.match.params.id}
    });

    

    useMemo(() => {
        if(data){
            setDepartemant(data.getADepartemant);
        }
    },[data])

    const [updateDepartemant,{error}] = useMutation(UPDATE_DEPARTEMANT,{
        update(_,result){
            console.log(result.data.updateDepartemant);
        },
        onError(err){
            console.log(err.graphQLErrors[0].message);
        },

        variables:{...departemant,subDepartemant:departemant.subDepartemant.map(p => {
            return {
                name:p.name,
                active:p.active

            }
        })}
    })

    const changeSubActive = (item,active) => {
        const result = departemant.subDepartemant.map(departemantt => departemantt.name == item.name ? 
          departemantt = {...departemantt,active}
          : departemantt
          );
  
          setDepartemant({...departemant,subDepartemant:[...result]});
    }
    const updateSub = (item,name) => {
        const result = departemant.subDepartemant.map(departemantt => departemantt.name == item.name ? 
            departemantt = {...departemantt,name}
            : departemantt
          );
    
          setDepartemant({...departemant,subDepartemant:[...result]});
      }
    const deleteSubItem = item =>{
        const result = departemant.subDepartemant.filter(subitem => subitem.name != item.name);
        setDepartemant({...departemant,subDepartemant:[...result]});
    }

    const onSubmit = e =>{
        e.preventDefault();
        updateDepartemant();
    }
    const changeHandlerDep = e =>{
        setDepartemant({...departemant,name:e.target.value});
    }

    const changeColorHandler = color => {
        setDepartemant({...departemant,color:color.hex});
    }

    const changeSubStateHandler = e =>{
        setSubState({...subState,name:e.target.value});
    }
    const addSubHandler = () => {
       
        setDepartemant({...departemant,subDepartemant:[...departemant.subDepartemant,subState]})
    }
  return (
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
            Update Departemant
          </Button>
        </Grid>
      </Grid>
      
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper
              elevation={3}
              className={`${classes.alignPaper} ${classes.textInPut}`}
            >
              <h4>Add Departemant Name</h4>
              <TextField
                name="name"
                placeholder="Add Departemant Name"
                label="Add Name"
                fullWidth
                variant="outlined"
                className={classes.textInPut}
                required
                value={departemant.name}
                onChange={changeHandlerDep}
               
              />
            </Paper>
            <Paper
              elevation={3}
              className={`${classes.paper} ${classes.textInPut}`}
            >
              <h4>Add Sub Departemant</h4>
              <Grid container spacing={0}>
                <Grid item xs={8}>
                  <TextField
                    name="subname"
                    placeholder="Add Sub Departemant Name"
                    label="Add Sub Departemant Name"
                    fullWidth
                    variant="outlined"
                    className={classes.textInPut}
                    
                    value={subState.name}
                    onChange={changeSubStateHandler}
                    id="subname"
                  />
                </Grid>
                <Grid item xs={4} className={classes.alignCenter}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<IoMdAddCircleOutline />}
                    style={{padding:"10px"}}
                    onClick={addSubHandler}
                   
                  >
                    Add Sub Departemant
                  </Button>
                </Grid>
                <Grid item xs={12} className={classes.alignPaper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                           {departemant && departemant.subDepartemant.length > 0 &&  departemant.subDepartemant.map((dep,index) => (<SubItem key={index} index={++index} departemant={dep} deleteItem={deleteSubItem} updateSub={updateSub} changeSubActive={changeSubActive}/>))}
                        </TableBody>
                    </Table>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper
              elevation={3}
              className={`${classes.paper} ${classes.textInPut}`}
            >
              <h4>Departemant Color</h4>
              <CirclePicker color={departemant.color} onChangeComplete={changeColorHandler}/>
            </Paper>
          </Grid>
        </Grid>
    </form>
  );
};
const GET_A_DEPARTEMANT = gql`

query getADepartemant($id:ID!)  {
getADepartemant(id:$id){
  id
  name
  active
  color
  subDepartemant{
    id
    name
    active
  }
}
}

`;

const UPDATE_DEPARTEMANT = gql`
    mutation updateDepartemant($id:ID!,$name:String!,$color:String,$subDepartemant:[ISubDepartemant],$active:Boolean){
  updateDepartemant(id:$id,name:$name,color:$color,subDepartemant:$subDepartemant,active:$active){
    id
    name
    color
    active
    subDepartemant{
      id
      name
      active
    }
  }
}
`;
export default UpdateNewDepartemant;
