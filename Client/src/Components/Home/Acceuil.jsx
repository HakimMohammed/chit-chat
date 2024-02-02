import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import WorldChat from "./WorldChat";
import myPusher from "../../SocketTest/NodeSocketTest";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Acceuil() {
  const [selected, setSelected] = useState("World Chat");
  const dispatch = useDispatch();
  const [pusher, setPusher] = useState(null);
  const [presenceChannel, setPresenceChannel] = useState(null);
  const [me, setMe] = useState("");
  const [loading, setLoading] = useState(true); // Introduce loading state
  const [showFriendRequests, setShowFriendRequests] = useState(false);

  const handleMemberAdded = useCallback((member) => {
    var userId = member.id;
    var userInfo = member.info;
    const user = {
      id: userId,
      username: userInfo.username,
      thumbnail: userInfo.thumbnail,
    };
    dispatch({ type: "added", payload: user });
    console.log("pusher:member_added");
  }, []);

  const handleMemberRemoved = useCallback((member) => {
    dispatch({ type: "removed", payload: member.id });
  }, []);

  

  useEffect(() => {
    console.log("inside presence channle useEffect ");
    setPusher(myPusher);

    const myPresenceChannel = myPusher.subscribe("presence-channel");

    myPresenceChannel.bind("pusher:subscription_succeeded", (members) => {
      setMe(members.me.id);
      dispatch({ type: "subscribed" });
      console.log("this are the members :");
      members.each(function (member) {
        console.log(JSON.stringify(member));
        var userId = member.id;
        var userInfo = member.info;
        const user = {
          id: userId,
          username: userInfo.username,
          thumbnail: userInfo.thumbnail,
        };
        dispatch({ type: "added", payload: user });
      });
      console.log("pusher:subscription_succeeded");
      setLoading(false); // Set loading to false after processes are done
    });

    myPresenceChannel.bind("pusher:member_removed", handleMemberRemoved);
    myPresenceChannel.bind("pusher:member_added", handleMemberAdded);

    setPresenceChannel(myPresenceChannel);

    return () => {
      if (presenceChannel) {
        presenceChannel.unbind();
      }
    };
  }, []);

  useEffect(() => {
    try {
      console.log(" ME ! " + me)
      console.log("subscribed to the private channel");
      const channel = myPusher.subscribe(`private-friendsrequest-${me}`);

      channel.bind("send-request", (data) => {
        console.log("Friend Request received:");
        toast('Friend Requet recieved!', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
        console.log(data.message);
        console.log("Friend Request received:");
      });

      return () => {
        myPusher.unsubscribe(`private-friendsrequest-${me}`);
      };
    } catch (error) {
      console.log(
        "Error occurred while trying to listen to channel 'sendMessage:'"
      );
      console.log(error);
    }
  }, [myPusher,me]);

  useEffect(() => {
    if (pusher && !presenceChannel) {
      const newPresenceChannel = pusher.subscribe("presence-channel");
      setPresenceChannel(newPresenceChannel);
    }
  }, [pusher]);

  const handleSelectedChange = (newSelected) => {
    setSelected(newSelected);
  };

  const hadnleFriendRequests = (newValue) => {
    setShowFriendRequests(newValue);
  }

  return (
    <div className="flex h-screen flex space-x-6 items-center py-12 px-6 lg:px-8 bg-[#181818] relative">
      <Navbar onValueChange={handleSelectedChange} handleRequests={hadnleFriendRequests} requests={showFriendRequests} me={me} />
      <div className={`text-white h-full bg-[#1f1f1f] outline outline-2 outline-[#2a2a2a] rounded-lg ${showFriendRequests ? "visible w-full" : "invisible w-0"} transition duration-300`}>
        ok lets try this
      </div>
      <>
        {loading ? (
          <p>Loading</p>
        ) : (
          (() => {
            switch (selected) {
              case "World Chat":
                return <WorldChat selected={selected} me={me} />;
              case "Groups":
                return <p>Groups</p>;
              case "Friends":
                return <p>Friends</p>;
              case "Account":
                return <p>Account</p>;
              default:
                return null;
            }
          })()
        )} 
      </>
      <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
    </div>
  );
}
