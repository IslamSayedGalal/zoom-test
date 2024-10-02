import { ZoomMtg } from "@zoom/meetingsdk";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

interface JoinMeetingProps {
  meetingData: unknown;
  id: unknown;
}

export const JoinMeeting = ({ meetingData, id }: JoinMeetingProps) => {
  console.log("id: ", id);
  console.log("meetingData: ", meetingData);
  console.log("typeof : ", typeof id);

  const sdkKey = "ripqfBNqQ5e8dSdrWMKpA";
  // const sdkKey = "p9ZvyOLMT_ihW2e8naMgiQ";
  const leaveUrl = "http://localhost:5173";

  const user1 = {
    id: 1,
    name: "Islam Galal",
    email: "islam.galal@mobidevlabs.com",
  };

  const user2 = {
    id: 0,
    name: "Islam Sayed Galal",
    email: "eslamgalal0312@gmail.com",
  };

  const user3 = {
    id: 0,
    name: "Islam Sayed Galal 2",
    email: "eslamgalal312@gmail.com",
  };

  let userUsed = user1;

  if (id === "1") {
    console.log("user1", user1);
    userUsed = user1;
  } else if (id === "2") {
    console.log("user2", user2);
    userUsed = user2;
  } else if (id === "3") {
    console.log("user3", user3);
    userUsed = user3;
  }

  const getSignature = async () => {
    // if (!meetingData) {
    //   console.error("No meeting data available.");
    //   return;
    // }

    // const authEndpoint = "http://localhost:4000";
    // const meetingNumber = meetingData?.id;

    // try {
    //     const req = await fetch(authEndpoint, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             meetingNumber: meetingNumber,
    //             role: userUsed.id || 1,
    //         }),
    //     });

    //     const res = await req.json();
    //     console.log("res", res.signature);
    //     const signature = res.signature as string;
    //     startMeeting(signature, meetingNumber, meetingData.password);
    // } catch (e) {
    //     console.log(e);
    // }

    const signature = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBLZXkiOiJyaXBxZkJOcVE1ZThkU2RyV01LcEEiLCJzZGtLZXkiOiJyaXBxZkJOcVE1ZThkU2RyV01LcEEiLCJtbiI6IjkyNzM1MDMxNDQ2Iiwicm9sZSI6MSwiaWF0IjoxNzI3ODk4NjExLCJleHAiOjE3Mjc5MDU4MTEsInRva2VuRXhwIjoxNzI3OTA1ODExfQ.3iA4fxhzw54gBJ0jYJkrRPMz1jIWAccTV2n1boLKccw";
    const meetingNumber = '92735031446';
    const meetingPassword = '123456';


    startMeeting(signature, meetingNumber, meetingPassword);
  };

  function startMeeting(
    signature: string,
    meetingId: string,
    password: string
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
          userName: userUsed.name,
          userEmail: userUsed.email,
          success: (success: unknown) => {
            console.log(success);
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
