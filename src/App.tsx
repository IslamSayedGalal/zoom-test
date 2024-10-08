import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { CreateMeeting } from "./CreateMeeting";
import { JoinMeeting } from "./JoinMeeting";

function MeetingPage() {
  // const { id } = useParams();
  const [id, setId] = useState<number>(1);
  const [meetingData, setMeetingData] = useState<{
    id: string;
    password: string;
  }>({ id: "96252223660", password: "123456" });

  // Handler to update the id state when the input changes
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(e.target.value)); // Update the id state with the input value
  };

  console.log("id", id); // Access the userId from the URL params

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        <input
          type="number"
          value={id}
          onChange={handleIdChange} // Update id on input change
          placeholder="Enter Meeting ID"
        />
        <CreateMeeting setMeetingData={setMeetingData} />
        <JoinMeeting meetingData={meetingData} id={id} />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Define a route with a dynamic userId parameter */}
      <Route path="/" element={<MeetingPage />} />
    </Routes>
  );
}

export default App;
