import React from "react";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  cancelSelectActivity: (id: String) => void;
  openForm: (id: String) => void;
}
export const ActivityDetails = ({
  activity,
  cancelSelectActivity,
  openForm,
}: Props) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => openForm(activity.id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => cancelSelectActivity(activity.id)}
          />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};
