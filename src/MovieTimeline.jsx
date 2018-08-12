import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import VerticalTimelineDisplay from "./VerticalTimelineDisplay";

export default () => (
  <Card>
    <CardHeader title="Top 20 Movies Timeline, since 2000" />
    <CardContent>
      <VerticalTimelineDisplay />
    </CardContent>
  </Card>
);
