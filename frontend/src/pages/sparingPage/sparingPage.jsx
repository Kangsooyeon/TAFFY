import "../../styles/sparingPage/sparingPage.css";
import Invitation from "../../components/sparingPage/sparingmain/invitation";
import MessageBox from "../../components/sparingPage/sparingmain/messageBox";
import UserInfo from "../../components/sparingPage/sparingmain/userInfo";
import UserCharacter from "../../components/sparingPage/sparingmain/userCharacter";
import UserRecord from "../../components/sparingPage/sparingmain/userRecord";
import QuickButton from "../../components/sparingPage/sparingmain/quickButton";
import Help from "../../components/sparingPage/sparingmain/sparinghelp.jsx";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSparingUserAsync } from "../../store/sparing/sparUser";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/axiosInstance";

let stompClient = null;

const SparingPage = ({language}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenHelp, setIsOpenHelp] = useState(false);
  const { userdata, status: userdataStatus } = useSelector(
    (state) => state.sparingUser
  );
  const [isConnected, setIsConnected] = useState(false);
  const [sessionID, setSessionID] = useState(null);
  const [connectionToken, setConnectionToken] = useState(null);
  const [status, setStatus] = useState(null);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [roomType, setRoomType] = useState(null);

  const sessionIDRef = useRef(sessionID);
  const connectionTokenRef = useRef(connectionToken);
  const userdataRef = useRef(userdata);
  const statusRef = useRef(status);
  const roomTypeRef = useRef(roomType)

  const handleReceiveMessage = (message) => {
    setReceivedMessage(message);
    setShowMessageBox(true);
  };

  const handleAccept = async () => {
    setShowMessageBox(false);

    if (receivedMessage && receivedMessage.sessionId) {
      try {
        const url = `/sparring/game-invitations?sessionId=${encodeURIComponent(
          receivedMessage.sessionId
        )}`;

        // 초대수락 API 호출
        const response = await axiosInstance.post(url);
        // console.log(
        //   "피초대자 connectionToken:",
        //   response.data.data.connectionToken
        // );

        // connectionToken 저장
        setConnectionToken(response.data.data.connectionToken);

        // console.log(
        //   "Session ID being sent as query:",
        //   receivedMessage.sessionId
        // );

        // console.log("Game invitation Accepted:", response.data);

        // Send a message back to the inviter
        if (stompClient && stompClient.connected) {
          const acceptanceMessage = {
            sessionId: receivedMessage.sessionId,
            nickname: receivedMessage.nickname, // invitee's nickname
            inviter: receivedMessage.inviter, // inviter's nickname
            status: "accepted",
          };

          stompClient.publish({
            destination: "/app/data.send",
            body: JSON.stringify(acceptanceMessage),
          });
        }

        // Navigate to the game session if successful
        navigate(`/sp/game/${receivedMessage.sessionId}`, {
          state: {
            connectionToken: response.data.data.connectionToken,
            userdata: userdataRef.current,
            roomType: "private",
          },
        });
      } catch (error) {
        console.error("Error accepting game invitation:", error);
        // Handle error (e.g., show a notification to the user)
        if (error.response) {
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        }
      }
    } else {
      console.error("No valid session ID found in received message");
    }
  };

  const handleDeny = () => {
    // console.log("Invitation denied");
    setShowMessageBox(false);

    if (stompClient && stompClient.connected) {
      const denyMessage = {
        sessionId: receivedMessage.sessionId,
        nickname: receivedMessage.nickname, // invitee's nickname
        inviter: receivedMessage.inviter, // inviter's nickname
        status: "denied",
      };

      stompClient.publish({
        destination: "/app/data.send",
        body: JSON.stringify(denyMessage),
      });
    }
  };

  useEffect(() => {
    dispatch(fetchSparingUserAsync());
  }, [dispatch]);

  useEffect(() => {
    const socket = new SockJS("https://i11e104.p.ssafy.io/ws");
    stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");

        // Subscribe to accept messages
        stompClient.subscribe("/topic/data", (message) => {
          const receivedData = JSON.parse(message.body);

          // 빠른대전
          if (!receivedData.status) {
            joinGame(message);
          }
        });

        setIsConnected(true);
      },
      onStompError: (error) => {
        console.error(
          "Could not connect to WebSocket server. Please refresh this page to try again!",
          error
        );
      },
    });
    stompClient.activate();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    sessionIDRef.current = sessionID;
  }, [sessionID]);

  useEffect(() => {
    connectionTokenRef.current = connectionToken;
  }, [connectionToken]);

  useEffect(() => {
    userdataRef.current = userdata;
  }, [userdata]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    roomTypeRef.current = roomType
  }, [roomType]);

  const joinGame = (message) => {
    const receivedData = JSON.parse(message.body);
    console.log("Game data received: ", receivedData);
    console.log("Received sessionId:", receivedData.sessionId);
    console.log("Current sessionID:", sessionIDRef.current);
    console.log("roomType:", roomTypeRef.current);
    console.log("status:", statusRef.current);
    console.log("connectionToken:", connectionTokenRef.current);
    console.log('userdata:', userdataRef.current)
    
    if (
      sessionIDRef.current &&
      connectionTokenRef.current &&
      userdataRef.current &&
      statusRef.current &&
      roomTypeRef.current
    ) {
      if (receivedData.sessionId === sessionIDRef.current) {
        console.log("game start!");
        // console.log("Connection Token:", connectionTokenRef.current);
        // console.log("User Data:", userdataRef.current);
        navigate(`/sp/game/${sessionIDRef.current}`, {
          state: {
            sessionId: sessionIDRef.current,
            connectionToken: connectionTokenRef.current,
            userdata: userdataRef.current,
            status: statusRef.current,
            roomType: roomTypeRef.current,
          },
        });
      }
    } else {
      console.error("One of the required refs is null");
    }
  };

  const openHelp = () => {
    setIsOpenHelp(true);
  };

  const closeHelp = () => {
    setIsOpenHelp(false);
  };

  if (userdataStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (userdataStatus === "failed") {
    return <div>Error loading data</div>;
  }

  return (
    <div className="sparingtoppage">
      <div className="sparingPage">
        <div className="leftSection">
          {userdata ? (
            <UserInfo userdata={userdata} language={language} />
          ) : (
            <div>No profile data</div>
          )}
          {userdata ? (
            <UserRecord userdata={userdata} language={language} />
          ) : (
            <div>No record data</div>
          )}
        </div>
        <div className="centerSection">
          {userdata ? (
            <UserCharacter userdata={userdata} />
          ) : (
            <div>No profile data</div>
          )}
          <QuickButton
            language={language}
            userdata={userdata}
            stompClient={stompClient}
            setSessionID={setSessionID}
            setConnectionToken={setConnectionToken}
            setStatus={setStatus}
            setRoomType={setRoomType}
          />
        </div>
        <div className="rightSection">
          <MessageBox
            inviter={receivedMessage?.inviter}
            onAccept={handleAccept}
            onDeny={handleDeny}
            language={language}
          />
          {stompClient && (
            <Invitation
              stompClient={stompClient}
              onReceiveMessage={handleReceiveMessage}
              setShowMessageBox={setShowMessageBox}
              language={language}
            />
          )}
        </div>
      </div>
      <button className="helpbutton" onClick={openHelp} >
        ?
      </button>
      {isOpenHelp && <Help closeHelp={closeHelp}  language={language}/>}
    </div>
  );
};

export default SparingPage;
