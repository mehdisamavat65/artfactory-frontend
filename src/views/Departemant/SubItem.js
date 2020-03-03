import React, { useState,useEffect } from "react";
import { TableCell, TableRow, IconButton,Button, TextField,Grid } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { MdRemoveCircleOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TiWarningOutline} from 'react-icons/ti';


const SubItem = props => {
  const { index, departemant,deleteItem ,updateSub,changeSubActive} = props;
  const [active, setActive] = useState(true);
  const [open,setOpen] =useState(false);
  const [updateOpen,setUpdateOpen] = useState(false);
  const [updateValue,setUpdatevalue] = useState('');

  useEffect(() => {
    changeSubActive(departemant,active);

  },[active])

  const changeActiveHandler = e => {
    setActive(!active);
   
  }

  const handleClose = e => {
        setOpen(false);
  }

  const agreeHandle = e => {
    deleteItem(departemant);
    setOpen(false);
  }

  const updatehandleClose = () =>{
    setUpdateOpen(false);
  }

  const updateSubhandle = () => {
    updateSub(departemant,updateValue);
    setUpdateOpen(false);
  }


  const updateOpenHandler = e =>{
    setUpdateOpen(true);
    setUpdatevalue(departemant.name);
  }

  const  changesubUpdateHandler = e =>{
      setUpdatevalue(e.target.value);
  }
  return (
      <>
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{departemant.name}</TableCell>
      <TableCell>
        <Switch
          checked={active}
          onChange={changeActiveHandler}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={updateOpenHandler}>
          <FaEdit/>
        </IconButton>
        <IconButton onClick={() => {setOpen(true)}}>
          <MdRemoveCircleOutline color="red" />
        </IconButton>
      </TableCell>
    </TableRow>
    
    <Dialog open={updateOpen} onClose={updatehandleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="name"
            label="SubDepartemant Name"
            type="text"
            fullWidth
            value={updateValue}
            onChange = {changesubUpdateHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={updatehandleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateSubhandle} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>


     <Dialog
     open={open}
     onClose={handleClose}
     aria-labelledby="alert-dialog-title"
     aria-describedby="alert-dialog-description"
   >
     <DialogTitle id="alert-dialog-title">{"Do You Want To Delete This Item?"}</DialogTitle>
     <DialogContent>
       <DialogContentText id="alert-dialog-description">
         <div style={{textAlign:"center"}}>
             <TiWarningOutline style={{fontSize:"50px", color:"#ff5722"}} />
         </div>
       </DialogContentText>
     </DialogContent>
     <DialogActions>
       <Button onClick={handleClose} color="primary">
         Disagree
       </Button>
       <Button onClick={agreeHandle} color="primary" autoFocus >
         Agree
       </Button>
     </DialogActions>
   </Dialog>
   </>
  );
};

export default SubItem;
