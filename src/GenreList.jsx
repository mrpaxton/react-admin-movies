import React from "react";
import { List, SimpleList } from "react-admin";

export default props => (
  <List perPage={20} {...props}>
    <SimpleList primaryText={record => record.name} />
  </List>
);
