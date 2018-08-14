import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import VerticalTimelineDisplay from "./VerticalTimelineDisplay";

export default () => (
  <Card>
    <CardHeader title="Movie Timeline" />
    <CardContent>
      <VerticalTimelineDisplay />
    </CardContent>
  </Card>
);
