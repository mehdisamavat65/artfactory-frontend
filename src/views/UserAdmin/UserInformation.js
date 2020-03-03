import React,{useState} from "react";
import { TableRow, TableCell, Table, IconButton } from "@material-ui/core";
import { FaRegEdit } from "react-icons/fa";
import Switch from '@material-ui/core/Switch';
import {withRouter} from 'react-router-dom'
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';

const UserInformation = props => {
  const { information, number } = props;

  const editClickHandler = () =>{
    props.history.push(`/admin/edituseradmin/${information.id}`)
  }
  const [active,setActive] = useState({
    active:information.active
  })
  const [updateUserActive,{loading}] = useMutation(UPDATE_ACTIVE,{
    update(_,result){
      console.log(result.data.updateUserActive);
    },
    onError(err){
      console.log(err.graphQLErrors[0].message);
    },
    variables:{id:information.id,active:!active.active}
  })
  const changeActiveHandler = e => {
      setActive({active:!active.active});
      updateUserActive();
  }
  return (
    <TableRow>
      <TableCell>{number}</TableCell>
      <TableCell>{information.name}</TableCell>
      <TableCell>

      <Switch
       
        checked={active.active}
        onChange={changeActiveHandler}
        color="primary"
       
      />
      </TableCell>
      <TableCell>
        <IconButton onClick={editClickHandler}>
          <FaRegEdit />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
const UPDATE_ACTIVE = gql`
  mutation updateUserActive($id:ID!,$active:Boolean!){
  updateUserActive(id:$id,active:$active){
    id
    name
    mobile
    password
    active
    
  }
}

`;
export default withRouter(UserInformation) ;
