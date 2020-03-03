import React, { useState } from "react";
import { Table, TableRow, TableCell, IconButton,Button, TableHead, TableBody } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import {FaEdit} from 'react-icons/fa';
import {MdSubscriptions} from 'react-icons/md';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DepartemantSubItem from "./DepartemantSubItem";
import {withRouter} from 'react-router-dom'
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const DepartemantItem = props => {
  const { item, index } = props;
  const [open,setOpen] = useState(false);
  const [activeDep,setActiveDep] = useState(item.active);

  const handleClose = e =>{
      setOpen(false);
  }

  const subDepartemantHandelr = e => {
      setOpen(true);

  }
  const updateDepartemantHanlder = () => {
      props.history.push(`/admin/updatedepartemant/${item.id}`)
  }

  const [updateActiveDepartemant,{error}] = useMutation(UPDATE_ACTIVE,{
    update(_,result){
      
    },
    onError(err){
      console.log(err.graphQLErrors[0].message);
    },
    variables: {id:item.id,active:!activeDep}

  })
  const changeActiveHandler =  e =>{
     setActiveDep(!activeDep);
     updateActiveDepartemant();
  }
  return (
      <>
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: `${item.color}`
          }}
        ></div>
      </TableCell>
      <TableCell>
        <Switch
          checked={activeDep}
          onChange={changeActiveHandler}
          color="primary"
        />

      </TableCell>
      <TableCell>
          <IconButton onClick={updateDepartemantHanlder}>
             <FaEdit/>
          </IconButton>
          <IconButton onClick={subDepartemantHandelr} >
             <MdSubscriptions/>
          </IconButton>
      </TableCell>
    </TableRow>

    <Dialog 
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Sub Departemant Items"}</DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum voluptas rerum corporis itaque animi quibusdam magnam nostrum nulla aspernatur consequatur, nisi iusto possimus maiores veniam laborum vel expedita sunt ea placeat at ab hic, incidunt debitis! Laborum, labore? Corporis maxime exercitationem possimus similique explicabo, nulla sint nam atque dolorem aperiam.</p>
                

                        <Table>
                            <TableHead>
                                <TableCell>No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Active</TableCell>
                               
                            </TableHead>
                            <TableBody>
                            {item && item.subDepartemant.length > 0 && item.subDepartemant.map( (departemant,index) => (

                                <DepartemantSubItem key={index} index={++index} item={departemant} />
                            ))} 

                             
                            </TableBody>
                        </Table>

              
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
          </>

  );
};

const UPDATE_ACTIVE = gql`
mutation  updateActiveDepartemant($id:ID!,$active:Boolean)  {
  updateActiveDepartemant(id:$id,active:$active){
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
export default withRouter(DepartemantItem);
