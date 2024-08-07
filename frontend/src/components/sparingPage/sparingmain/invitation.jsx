import "../../../styles/sparingPage/sparingmain/invitation.css";
import Search from "../../../assets/images/sparingPage/search.png";
import axios from "axios";
import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Invitation = ({ stompClient }) => {
  const token = localStorage.getItem("accessToken");
  const [openViduSessionId, setOpenViduSessionId] = useState("");
  const [connectionToken, setConnectionToken] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [nickname, setNickname] = useState("");
  const { userdata } = useSelector((state) => state.sparingUser);

  useEffect(() => {
    if (stompClient && stompClient.connected) {
      // Subscribe to a topic to receive messages
      const subscription = stompClient.subscribe('/topic/data', (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log('Received message:', receivedMessage);
      });

      // Clean up subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient]);

  const handleInvite = useCallback(async () => {
    // OpenVidu session create API
    const url = "https://i11e104.p.ssafy.io/api/sparring/create";
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(nickname);

      setOpenViduSessionId(response.data.data.sessionId);
      setConnectionToken(response.data.data.connectionToken);
      setUserStatus(response.data.data.status);

      alert("create session success");

      // Emit socket message after setting up session details
      const dataMessage = {
        sessionId: response.data.data.sessionId,
        nickname: nickname,
      };

      if (stompClient && stompClient.connected) {
        stompClient.publish({ destination: '/app/data.send', body: JSON.stringify(dataMessage) });
        alert('Message sent successfully');
        console.log(dataMessage);
        
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      alert("create session failed");
    }
  }, [token, userdata, stompClient, nickname]);


  function InvitationCard() {
    return (
      <div className="invitationcardbox">
        <h1 style={{ margin: "0px" }}>초대하기</h1>
        <div className="invitationcard">
          <p style={{ fontFamily: "HappinessM" }}>야</p>
          <div className="inputcontainer">
            <img src={Search} alt="" className="inputicon" />
            <input
              className="nicknameinput"
              type="text"
              value={nickname} // Bind input value to nickname state
              onChange={(e) => setNickname(e.target.value)} // Update state on change
            />
          </div>
          <p style={{ fontFamily: "HappinessM" }}>겨루자!</p>
        </div>
        <div className="invitationbutton">
          <button className="invitebutton" onClick={handleInvite}>
            초대하기
          </button>
        </div>
      </div>
    );
  }

  function WaitingCard() {
    return (
      <div className="waitingbox">
        <div className="waitingtitle">
          <h3>{nickname} 님의</h3>
          <h3> 승낙을 기다리고 있습니다.</h3>
        </div>
        <div className="timer">
          <p>10:11</p>
        </div>
      </div>
    );
  }

  let invitationContent = userStatus === "waiting" ? <WaitingCard /> : <InvitationCard />;

  return (
    <div className="invitation">
      {invitationContent}
    </div>
  );
};

export default Invitation;
