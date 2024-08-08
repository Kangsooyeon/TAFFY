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

const SparingPage = () => {
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

  const sessionIDRef = useRef(sessionID);
  const connectionTokenRef = useRef(connectionToken);
  const userdataRef = useRef(userdata);
  const statusRef = useRef(status);

  const handleReceiveMessage = (message) => {
    setReceivedMessage(message);
    setShowMessageBox(true);
  };

  const handleAccept = async () => {
    console.log("Invitation accepted");
    setShowMessageBox(false);

    if (receivedMessage && receivedMessage.sessionId) {
      try {
        // Construct the URL with query string
        const url = `/sparring/game-invitations?sessionId=${encodeURIComponent(
          receivedMessage.sessionId
        )}`;

        // Make the POST request with the sessionId as a query parameter
        const response = await axiosInstance.post(url);

        console.log(
          "Session ID being sent as query:",
          receivedMessage.sessionId
        );
        console.log("Game invitation accepted:", response.data);

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
          alert("Send to Inviter the acceptance message");

          console.log("Acceptance message sent:", acceptanceMessage);
        }

        // Navigate to the game session if successful
        navigate(`/sp/game/${receivedMessage.sessionId}`, {
          state: {
            connectionToken: connectionTokenRef.current,
            userdata: userdataRef.current,
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
    console.log("Invitation denied");
    setShowMessageBox(false);
    // Additional logic for denying the invitation, e.g., notifying the inviter
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
        
        // 초대 메시지 수신
        if (!receivedData.status) joinGame(message);

        // 수락 메시지 수신
        if (receivedData.status === "accepted") {
          console.log("Acceptance message received:", receivedData);

          // Navigate to the game session
          navigate(`/sp/game/${receivedData.sessionId}`, {
            state: {
              connectionToken: connectionTokenRef.current,
              userdata: userdataRef.current,
            },
          });
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

  const joinGame = (message) => {
    const receivedData = JSON.parse(message.body);
    console.log("Game data received: ", receivedData);
    console.log("Received sessionId:", receivedData.sessionId);
    console.log("Current sessionID:", sessionIDRef.current);

    if (
      sessionIDRef.current &&
      connectionTokenRef.current &&
      userdataRef.current &&
      statusRef.current
    ) {
      if (receivedData.sessionId === sessionIDRef.current) {
        console.log("game start!");
        console.log("Connection Token:", connectionTokenRef.current);
        console.log("User Data:", userdataRef.current);
        navigate(`/sp/game/${sessionIDRef.current}`, {
          state: {
            // sessionId: sessionIDRef.current,
            connectionToken: connectionTokenRef.current,
            userdata: userdataRef.current,
            // status: statusRef.current,
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
            <UserInfo userdata={userdata} />
          ) : (
            <div>No profile data</div>
          )}
          {userdata ? (
            <UserRecord userdata={userdata} />
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
            userdata={userdata}
            stompClient={stompClient}
            setSessionID={setSessionID}
            setConnectionToken={setConnectionToken}
            setStatus={setStatus}
          />
        </div>
        <div className="rightSection">
          {showMessageBox && (
            <MessageBox
              inviter={receivedMessage.inviter}
              onAccept={handleAccept}
              onDeny={handleDeny}
            />
          )}
          {stompClient && (
            <Invitation
              stompClient={stompClient}
              onReceiveMessage={handleReceiveMessage}
            />
          )}
        </div>
      </div>
      <button className="helpbutton" onClick={openHelp}>
        ?
      </button>
      {isOpenHelp && <Help closeHelp={closeHelp} />}
    </div>
  );
};

export default SparingPage;
