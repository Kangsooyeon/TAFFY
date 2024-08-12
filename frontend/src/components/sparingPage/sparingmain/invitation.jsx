import "../../../styles/sparingPage/sparingmain/invitation.css";
import Search from "../../../assets/images/sparingPage/search.png";
import axios from "axios";
import { useState, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { div } from "@tensorflow/tfjs";

// 초기 시간 상수
const INIT_MINUTE = 0;
const INIT_SECOND = 30;

const Invitation = ({ stompClient, onReceiveMessage, setInviter, language }) => {
  const token = localStorage.getItem("accessToken");
  const [openViduSessionId, setOpenViduSessionId] = useState("");
  const [connectionToken, setConnectionToken] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [invitee, setInvitee] = useState("");
  const [minutes, setMinutes] = useState(INIT_MINUTE);
  const [seconds, setSeconds] = useState(INIT_SECOND);
  const nickname = useRef("");
  const { userdata } = useSelector((state) => state.sparingUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (stompClient && stompClient.connected) {
      // 겨루자 초대 메시지 구독
      const subscription = stompClient.subscribe("/topic/data", (message) => {
        const receivedMessage = JSON.parse(message.body);

        if (
          receivedMessage.status === "invite" &&
          receivedMessage.nickname === userdata.data.nickname
        ) {
          if (onReceiveMessage) {
            onReceiveMessage(receivedMessage);
          }
        } else if (
          receivedMessage.status === "accepted" &&
          receivedMessage.inviter === userdata.data.nickname
        ) {
          
          navigate(`/sp/game/${receivedMessage.sessionId}`, {
            state: {
              sessionId: receivedMessage.sessionId,
              connectionToken: connectionToken,
              userdata: userdata,
              roomType: "private",
              status : "waiting"
            },
          });
        } else if (
          receivedMessage.status === "denied" &&
          receivedMessage.inviter === userdata.data.nickname
        ) {
          setUserStatus("");
          setInvitee("");
          setMinutes(INIT_MINUTE);
          setSeconds(INIT_SECOND);
          alert("상대방이 초대를 거절했습니다.");
        } else if (
          receivedMessage.status === "timeout" &&
          receivedMessage.nickname === userdata.data.nickname
        ) {
          console.log("받은 초대장의 시간이 만료되었습니다.");
          setInviter("");
        } else {
          console.log("Received message:", receivedMessage);
        }
      });

      // Clean up subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [
    stompClient,
    userdata,
    onReceiveMessage,
    connectionToken,
    navigate,
    setInviter,
  ]);

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

      // console.log(nickname.current);

      setOpenViduSessionId(response.data.data.sessionId);
      setConnectionToken(response.data.data.connectionToken);
      setUserStatus(response.data.data.status);

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
        // console.log("Message sent:", dataMessage);
      }

      setInvitee(nickname.current);
    } catch (error) {
      console.error("Error sending invite:", error);
    }
  }, [token, userdata, stompClient, nickname]);

  // Countdown timer logic
  useEffect(() => {
    let timer;
    if (userStatus === "waiting") {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(timer);
              setInvitee("");
              setMinutes(INIT_MINUTE);
              setSeconds(INIT_SECOND);
              setUserStatus("");

              // 초대 시간 만료 메시지 전송
              if (stompClient && stompClient.connected) {
                const timeoutMessage = {
                  sessionId: openViduSessionId,
                  nickname: invitee,
                  inviter: userdata.data.nickname,
                  status: "timeout",
                };

                stompClient.publish({
                  destination: "/app/data.send",
                  body: JSON.stringify(timeoutMessage),
                });
              }

              return 0;
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              return 59;
            }
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [userStatus, minutes]);

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
          {language === 'ko' ?
            <div>
              <h3>{nickname.current} 님의</h3>
              <h3> 승낙을 기다리고 있습니다.</h3>
            </div>
          :
            <div>
              <h3>Waiting for</h3>
              <h3>{nickname.current}`s approval.</h3>
            </div>  
        }
        </div>
        <div className="timer">
          <p>
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
        </div>
      </div>
    );
  }

  let invitationContent =
    userStatus === "waiting" ? <WaitingCard /> : <InvitationCard />;

  return <div className="invitation">{invitationContent}</div>;
};

export default Invitation;
