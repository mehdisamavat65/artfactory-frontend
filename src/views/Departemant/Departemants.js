import React from "react";
import { Grid, Button, TableCell, TableHead, TableRow,Table, TableBody } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {IoMdAddCircleOutline} from 'react-icons/io';
import {GET_ALL_DEPARTEMANT} from '../../graphql/graphql';
import { useQuery } from "@apollo/react-hooks";
import DepartemantItem from "./DepartemantItem";
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


const Departemants = (props) => {
  const classes = useStyles();

const addDepartemantHandler = () => {
    props.history.push('/admin/adddepartemant');
}

const {loading,data} = useQuery(GET_ALL_DEPARTEMANT);
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
            onClick={addDepartemantHandler}
            
          >
            Add New Departemant
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {data && data.getAllDepartemant.map((departemant,index) =>  (<DepartemantItem key={departemant.id} item={departemant}  index={++index}/>))}
              </TableBody>
            </Table>
        </Grid>
      </Grid>
    </div>
  );
};


export default Departemants;
