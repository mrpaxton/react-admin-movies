import React from "react";
import { List, Datagrid, EmailField, TextField } from "react-admin";
import URLField from "./URLField";

export default props => (
  <List title="Here are all users" {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <URLField source="website" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);
