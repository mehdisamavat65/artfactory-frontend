import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Grid, Button, Paper, TextField, IconButton, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { CirclePicker } from "react-color";
import SubItem from "./SubItem";
import gql from 'graphql-tag';
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
    padding: "50px"
  },
  alignPaper: {
    padding: "65px"
  },
  textInPut: {
    marginTop: "30px"
  },
  alignCenter:{
      display:"flex",
      alignItems:"flex-end",
      
  }
}));

const AddNewDepartemant = () => {
  const classes = useStyles();
  const [departemantState, setDepartemantState] = useState({
    name: "",
    color: ""
  });
  const [subName,setSubName] = useState({
      name:'',
      active:true
  })
  const [subDepartemant,setSubDepartemant] = useState([]);

  const changeColorHandler = color => {
    setDepartemantState({ ...departemantState, color: color.hex });
  };
  const changeNameHanlder = e =>{
      setSubName({...subName,name:e.target.value});
  }

  const changeDepartemantHanlder = e => {
    setDepartemantState({ ...departemantState, name: e.target.value });
  };
  const updateSub = (item,name) => {
    const result = subDepartemant.map(departemant => departemant.name == item.name ? 
        departemant = {...departemant,name}
        : departemant
      );

      setSubDepartemant([...result]);
  }
  const addSubHandler = e => {
      
        setSubDepartemant([...subDepartemant,subName]);
       setSubName({
           name:'',
           active:true
       })
        
     
  }

  const changeSubActive = (item,active) => {
      const result = subDepartemant.map(departemant => departemant.name == item.name ? 
        departemant = {...departemant,active}
        : departemant
        );

        setSubDepartemant([...result]);
  }

  const deleteSubItem = item =>{
      const result = subDepartemant.filter(subitem => subitem.name != item.name);
      setSubDepartemant([...result]);
  }
  const [addDepartemant,{loading}] =useMutation(ADD_DEPARTENABT,{
      update(_,result){
        console.log(result.data.addDepartemant);
      },
      onError(err){
          console.log(err.graphQLErrors[0].message);
      },
      variables:{...departemantState,subDepartemant:[...subDepartemant]}
  });

  const onSubmit = e =>{
      e.preventDefault();
      addDepartemant();
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
              startIcon={<IoMdAddCircleOutline />}
              type="submit"
            >
              Add New Departemant
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
                value={departemantState.name}
                onChange={changeDepartemantHanlder}
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
                    value={subName.name}
                    onChange={changeNameHanlder}
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
                            {subDepartemant.length > 0 && subDepartemant.map((departemant,index) => <SubItem key={index} index={++index} departemant={departemant} deleteItem={deleteSubItem} updateSub={updateSub} changeSubActive={changeSubActive}/>)}
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
              <CirclePicker onChangeComplete={changeColorHandler} />
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const ADD_DEPARTENABT = gql `
mutation  addDepartemant($name:String!,$color:String,$subDepartemant:[ISubDepartemant]) {
  addDepartemant(name:$name,color:$color,subDepartemant:$subDepartemant){
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
export default AddNewDepartemant;
