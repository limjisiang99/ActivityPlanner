import React from "react";
import { Segment, Item, ItemContent, Button, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

export const ActivityList = ({
  activities,
  selectActivity,
  deleteActivity,
}: Props) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((m) => (
          <Item key={m.id}>
            <ItemContent>
              <Item.Header as="a">{m.title}</Item.Header>
              <Item.Meta>{m.date}</Item.Meta>
              <Item.Description>
                <div>{m.description}</div>
                <div>
                  {m.city}, {m.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(m.id)}
                  floated="right"
                  content="view"
                  color="blue"
                />
                <Button
                  onClick={() => deleteActivity(m.id)}
                  floated="right"
                  content="delete"
                  color="red"
                />
                <Label basic content={m.category} />
              </Item.Extra>
            </ItemContent>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
