import React, { useEffect, useState } from "react";
import "./styles.css";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import { Navbar } from "../layout/Navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import { agent } from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(response);
      setLoading(false);
    });
  }, []);

  const HandleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
    setEditMode(false);
  };

  const HandleCancelActivity = () => {
    setSelectedActivity(undefined);
  };

  const HandleFormOpen = (id?: string) => {
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
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const HandleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((m) => m.id !== id)]);
  };
  if (loading) return <LoadingComponent content="Loading app" />;

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
          deleteActivity={HandleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
