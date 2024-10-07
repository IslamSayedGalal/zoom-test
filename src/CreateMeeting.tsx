import { useState } from "react";

interface CreateMeetingProps {
    setMeetingData: (data: {
        id: string;
        password: string;
    }) => void;
}

export const CreateMeeting = ({ setMeetingData }: CreateMeetingProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const createZoomMeeting = async () => {
        setIsLoading(true);
        // const url = "http://localhost:4000/creareMeeting";
        const url = "https://back-zoom-production-4477.up.railway.app/creareMeeting"
        const bearerToken = "eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImIzNjMwYjgxLTlkNDUtNGU0OS1hZDgxLWIwMTUzNTIxMDdjYyJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiItWjJzU0ZHaVRfR1dVQnVmZ25EdGFnIiwidmVyIjoxMCwiYXVpZCI6ImU4ZGUwMzRkNmY3Yjk4NjdlMTZkYjdlMGFhNmNhOThiODlkOTNhMTdmOGUwMTI5YWM0ZjAwYzkwZjg5Yjc4ZWMiLCJuYmYiOjE3MjgyOTEzNDYsImNvZGUiOiJDT0NZdjBOUlJmMnoyUThPSHJmN0tRcWRlZ2ljNFNMOUIiLCJpc3MiOiJ6bTpjaWQ6cDladnlPTE1UX2loVzJlOG5hTWdpUSIsImdubyI6MCwiZXhwIjoxNzI4Mjk0OTQ2LCJ0eXBlIjozLCJpYXQiOjE3MjgyOTEzNDYsImFpZCI6IkdQNWJnTW5GUlVHdHV6WHVFY19SdUEifQ.qA24Oxr_9RSuebPd_ow6JiiP-MzArUshQ8cDG8csZ3mOmjh8KwmfHpktfZ15JbfdwAuLEZPnVPzkSTpstmP4UA"; // Update with your token

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
