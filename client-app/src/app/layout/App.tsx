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
  };

  const HandleCancelActivity = () => {
    setSelectedActivity(undefined);
  };

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={HandleSelectActivity}
          cancelSelectActivity={HandleCancelActivity}
        />
      </Container>
    </>
  );
}

export default App;
