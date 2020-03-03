import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

const DepartemantSubItem = props => {
  const { item, index } = props;
  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>
        <Switch
          checked={item.active}
          color="primary"
        />
      </TableCell>
    </TableRow>
  );
};

export default DepartemantSubItem;
