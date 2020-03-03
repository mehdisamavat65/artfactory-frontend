import React from 'react'
import { Grid,Button,Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {IoIosAddCircleOutline} from 'react-icons/io';
import { makeStyles } from '@material-ui/core/styles';
import {GET_ALL_USER_ADMIN} from '../../graphql/graphql';
import { useQuery } from '@apollo/react-hooks';
import UserInformation from './UserInformation';


const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    sendToRight:{
        textAlign:"right"
    },
    paper:{
      padding:"50px"
    }
  }));

const UserAdmin = (props) => {
    const classes = useStyles();

    const newUserAdminHandler= () =>{
        props.history.push("/admin/addnewuseradmin");
    }

    const {loading,data} = useQuery(GET_ALL_USER_ADMIN);
    return (
        <div>
            
           <Grid container spacing={3}>
               <Grid item xs={12} className={classes.sendToRight}>
               <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<IoIosAddCircleOutline />}
        onClick={newUserAdminHandler}
      >
        Define New User Admin
      </Button>
    
               </Grid>
           </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
              <h3>User Admin List</h3>
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
                  {data && data.getAllUserAdmin.map((user,index) => 
                    <UserInformation key={user.id} number={++index} information={user}/>
                    
                    ) }
                </TableBody>
              </Table>
              </Paper>   
        </Grid>  
        
      </Grid>     
        </div>
    )
}



export default UserAdmin
