import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { CreateMeeting } from "./CreateMeeting";
import { JoinMeeting } from "./JoinMeeting";

function App() {
  // const { id } = useParams();
  const id = 1;
  const [meetingData, setMeetingData] = useState<{id: string, password: string}>({ id: "", password: "" });

  console.log("id", id); // Access the userId from the URL params

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        <CreateMeeting setMeetingData={setMeetingData} />
        <JoinMeeting meetingData={meetingData} id={id} />
      </main>
    </div>
  );
}

// function App() {
//   return (
//     <Routes>
//       {/* Define a route with a dynamic userId parameter */}
//       <Route path="/" element={<MeetingPage />} />
//       {/* <Route path="/:id" element={<MeetingPage />} /> */}
//       {/* <Route path="/meeting/:id" element={<MeetingPage />} /> */}
//     </Routes>
//   );
// }

export default App;
