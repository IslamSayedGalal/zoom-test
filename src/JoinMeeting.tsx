import { ZoomMtg } from "@zoom/meetingsdk";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

interface JoinMeetingProps {
  meetingData: {
    id: string;
    password: string;
  };
  id: unknown;
}

export const JoinMeeting = ({ meetingData, id }: JoinMeetingProps) => {
  console.log("id: ", id);
  console.log("meetingData: ", meetingData);
  console.log("typeof : ", typeof id);
  const sdkKey = "ripqfBNqQ5e8dSdrWMKpA";
  // const sdkKey = "p9ZvyOLMT_ihW2e8naMgiQ";
  const leaveUrl = "http://localhost:5173";

  // let userUsed = {
  //   id: 1,
  //   name: "",
  //   email: ""
  // };

  // if (id === "1") {
  //   userUsed ={
  //     id: 1,
  //     name: "Islam Galal 1",
  //     email: "islamgalal1@gmail.com"
  //   };
  //   console.log("user1", userUsed);
  // } else if (id === "2") {
  //   userUsed = {
  //     id: 0,
  //     name: "Islam Galal 2",
  //     email: "islamgalal2@gmail.com"
  //   };
  //   console.log("user2", userUsed);
  // } else if (id === "3") {
  //   userUsed = {
  //     id: 0,
  //     name: "Islam Galal 3",
  //     email: "islamgalal3@gmail.com"
  //   };
  //   console.log("user3", userUsed);
  // } else if (id === "4") {
  //   userUsed = {
  //     id: 0,
  //     name: "Islam Galal 4",
  //     email: "islamgalal4@gmail.com"
  //   };
  //   console.log("user4", userUsed);
  // }

  const getSignature = async () => {
    if (!meetingData) {
      console.error("No meeting data available.");
      return;
    }

    let userData = {
      id: 1,
      name: "test",
      email: "test@gmail.com",
    };

    if (id === 1) {
      userData = {
        id: 1,
        name: "Islam Galal 1",
        email: "islamgalal@gmail.com",
      };
    } else if (id === 2) {
      userData = {
        id: 0,
        name: "Islam Galal 2",
        email: "islamgalal2@gmail.com",
      };
    } else if (id === 3) {
      userData = {
        id: 0,
        name: "Islam Galal 3",
        email: "islamgalal3@gmail.com",
      };
    } else if (id === 4) {
      userData = {
        id: 0,
        name: "Islam Galal 4",
        email: "islamgalal4@gmail.com",
      };
    }

    // const authEndpoint = "http://localhost:4000";
    const authEndpoint = "https://back-zoom-production-4477.up.railway.app";

    const meetingNumber = meetingData?.id;

    try {
      const req = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: userData?.id || 1,
        }),
      });

      const res = await req.json();
      console.log("res", res.signature);
      const signature = res.signature as string;
      startMeeting(signature, meetingNumber, meetingData.password, userData);
    } catch (e) {
      console.log(e);
    }

    // const signature = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBLZXkiOiJyaXBxZkJOcVE1ZThkU2RyV01LcEEiLCJzZGtLZXkiOiJyaXBxZkJOcVE1ZThkU2RyV01LcEEiLCJtbiI6IjkyNzM1MDMxNDQ2Iiwicm9sZSI6MSwiaWF0IjoxNzI3ODk4NjExLCJleHAiOjE3Mjc5MDU4MTEsInRva2VuRXhwIjoxNzI3OTA1ODExfQ.3iA4fxhzw54gBJ0jYJkrRPMz1jIWAccTV2n1boLKccw";
    // const meetingNumber = '92735031446';
    // const meetingPassword = '123456';

    // startMeeting(signature, meetingNumber, meetingPassword);
  };

  function startMeeting(
    signature: string,
    meetingId: string,
    password: string,
    userData: { id: number; name: string; email: string }
  ) {
    document.getElementById("zmmtg-root")!.style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: (success: unknown) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingId, // Use the new meeting ID
          passWord: password, // Use the created meeting password
          userName: userData.name,
          userEmail: userData.email,
          success: (success: unknown) => {
            console.log(success);
            ZoomMtg.inMeetingServiceListener(
              "onMeetingStatus",
              async (data: { meetingStatus: number }) => {
                console.log("Meeting Status Change:", data);

                // Meeting status codes:
                // 0 - Meeting not started
                // 1 - Meeting connecting
                // 2 - Meeting connected
                // 3 - Meeting ended or the participant left

                if (data.meetingStatus === 3) {
                  console.log(
                    "Meeting status 3 triggered, determining if meeting ended for all or just user left..."
                  );

                  // Optional: Get the current user's role (1 = host, 0 = participant)
                  const isHost = await ZoomMtg.getCurrentUser({
                    success: (res: { result: { role: number } }) => {
                      console.log("Current user info:", res.result);
                      return res.result.role === 1; // return true if host
                    },
                  });
                  console.log("isHost:", isHost);
                }
              }
            );
          },

          error: (error: unknown) => {
            console.log("error ::>>> ", error);
          },
        });
      },
      error: (error: unknown) => {
        console.log(error);
      },
    });
  }

  return (
    <div>
      <button onClick={getSignature}>Join Meeting</button>
    </div>
  );
};
