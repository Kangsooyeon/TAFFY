import "../../../styles/sparingPage/sparingmain/invitation.css";
import Search from "../../../assets/images/sparingPage/search.png";
import axios from "axios";
import { useState, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Invitation = ({ stompClient, onReceiveMessage }) => {
  const token = localStorage.getItem("accessToken");
  const [openViduSessionId, setOpenViduSessionId] = useState("");
  const [connectionToken, setConnectionToken] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const nickname = useRef("");
  const { userdata } = useSelector((state) => state.sparingUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (stompClient && stompClient.connected) {
      // 겨루자 초대 메시지 구독
      const subscription = stompClient.subscribe("/topic/data", (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log("Received message:", receivedMessage);

        // `status`가 여기서 존재하는지 확인
        console.log("수신한 상태:", receivedMessage.status);

        if (
          receivedMessage.nickname === userdata.data.nickname &&
          receivedMessage.status === "invite"
        ) {
          alert(`초대한 사람이 있습니다: ${receivedMessage.inviter}`);
          if (onReceiveMessage) {
            onReceiveMessage(receivedMessage);
          }
        } else if (
          receivedMessage.status === "accepted" &&
          receivedMessage.inviter === userdata.data.nickname
        ) {
          console.log("Acceptance message received:", receivedMessage);

          // alert(
          //   `connectionToken: ${connectionToken} sessionID: ${receivedMessage.sessionId}`
          // );

          // Navigate to the game session
          // 게임 세션으로 이동
          console.log(`conenctionToken : ${connectionToken}`);

          navigate(`/sp/game/${receivedMessage.sessionId}`, {
            state: {
              connectionToken: connectionToken,
              userdata: userdata,
            },
          });
        }
      });

      // Clean up subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, userdata, onReceiveMessage, connectionToken, navigate]);

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

      console.log(nickname.current);

      setOpenViduSessionId(response.data.data.sessionId);
      setConnectionToken(response.data.data.connectionToken);
      setUserStatus(response.data.data.status);

      alert("create session success");

      // Emit socket message after setting up session details
      const dataMessage = {
        sessionId: response.data.data.sessionId,
        nickname: nickname.current, // invitee's nickname
        inviter: userdata.data.nickname,
        status: "invite",
      };

      if (stompClient && stompClient.connected) {
        stompClient.publish({
          destination: "/app/data.send",
          body: JSON.stringify(dataMessage),
        });
        alert("Message sent successfully");
        console.log("Message sent:", dataMessage);
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
              defaultValue={nickname.current} // Bind input value to nickname state
              onChange={(e) => (nickname.current = e.target.value)} // Update state on change
            />
          </div>
          <p onClick={handleInvite} style={{ fontFamily: "HappinessM" }}>
            겨루자!
          </p>
        </div>
      </div>
    );
  }

  function WaitingCard() {
    return (
      <div className="waitingbox">
        <div className="waitingtitle">
          <h3>{nickname.current} 님의</h3>
          <h3> 승낙을 기다리고 있습니다.</h3>
        </div>
        <div className="timer">
          <p>10:11</p>
        </div>
      </div>
    );
  }

  let invitationContent =
    userStatus === "waiting" ? <WaitingCard /> : <InvitationCard />;

  return <div className="invitation">{invitationContent}</div>;
};

export default Invitation;
