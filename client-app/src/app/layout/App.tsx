import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import { Navbar } from "../layout/Navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      });
  }, []);

  const HandleSelectActivity = (id: String) => {
    setSelectedActivity(activities.find((x) => x.id === id));
    setEditMode(false);
  };

  const HandleCancelActivity = () => {
    setSelectedActivity(undefined);
  };

  const HandleFormOpen = (id?: String) => {
    id ? HandleSelectActivity(id) : HandleCancelActivity();
    setEditMode(true);
  };

  const HandleFormClose = () => {
    setEditMode(false);
  };

  const HandleCreatOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, activity]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  return (
    <>
      <Navbar openForm={HandleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={HandleSelectActivity}
          cancelSelectActivity={HandleCancelActivity}
          editMode={editMode}
          closeForm={HandleFormClose}
          openForm={HandleFormOpen}
          createOrEdit={HandleCreatOrEditActivity}
        />
      </Container>
    </>
  );
}

export default App;
