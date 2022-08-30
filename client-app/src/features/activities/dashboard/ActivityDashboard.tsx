import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: String) => void;
  cancelSelectActivity: (id: String) => void;
  editMode: boolean;
  closeForm: () => void;
  openForm: (id: String) => void;
  createOrEdit: (activity: Activity) => void;
}
export const ActivityDashboard = ({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  editMode,
  closeForm,
  openForm,
  createOrEdit,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>

      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            createOrEdit={createOrEdit}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
