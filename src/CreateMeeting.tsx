import { useState } from "react";

interface CreateMeetingProps {
    setMeetingData: (data: unknown) => void;
}

export const CreateMeeting = ({ setMeetingData }: CreateMeetingProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const createZoomMeeting = async () => {
        setIsLoading(true);
        const url = "http://localhost:4000/creareMeeting";
        const bearerToken = "eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImU3N2NmNjg0LTllYWItNDlmNy04NDg2LTc1MDQzNDJkMDg5NiJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiItWjJzU0ZHaVRfR1dVQnVmZ25EdGFnIiwidmVyIjo5LCJhdWlkIjoiMGVlYjk5MWM1ODZjZjIxM2IyYjkzZGY1ODUxZmQwNDYiLCJuYmYiOjE3MjY3NTk3MDksImNvZGUiOiJzLXVHVlRRblRJMmE3V3IwMFo4a2JRMmF6S21xMTdEaGIiLCJpc3MiOiJ6bTpjaWQ6cDladnlPTE1UX2loVzJlOG5hTWdpUSIsImdubyI6MCwiZXhwIjoxNzI2NzYzMzA5LCJ0eXBlIjozLCJpYXQiOjE3MjY3NTk3MDksImFpZCI6IkdQNWJnTW5GUlVHdHV6WHVFY19SdUEifQ.GCaaMyPdyIr5YLa32aSExNfnTwmydcfOycTs7CgiPYDH7EVVoksdakGqGCtO2-wrlinja29q6eTMHthDYKUsqA"; // Update with your token

        const requestBody = {
            topic: "zoom1",
            type: 2,
            start_time: "2024-09-19T10:00:00",
            duration: 60,
            timezone: "Africa/Cairo",
            password: "123456",
            agenda: "testing",
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,
                mute_upon_entry: true,
                breakout_room: {
                    enable: true,
                },
            },
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response) {
                throw new Error("Failed to create Zoom meeting");
            }

            const meetingData = await response.json();
            console.log("Meeting created:", meetingData.response);

            // Save the meeting data in the parent state
            setMeetingData(meetingData.response);

        } catch (error) {
            console.error("Error creating Zoom meeting:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={createZoomMeeting} disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Room"}
            </button>
        </div>
    );
};
