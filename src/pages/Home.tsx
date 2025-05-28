import { useEffect, useState } from "react";
import { useChatStore, type Message, type User } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const {
    getUsers,
    messages,
    users,
    selectedUser,
    subscribeMessage,
    getMessages,
    isUsersLoading,
    setSelectedUser,
  }: {
    messages: Message[];
    users: User[];
    selectedUser: User | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    subscribeMessage: () => void;
    unSubscribeMessage: () => void;
    getUsers: () => void;
    getMessages: (userId: string) => Promise<void>;
    sendMessage: (messageData: { content: string }) => Promise<void>;
    setSelectedUser: (selectedUser: User) => void;
  } = useChatStore();

  const {
    onLineUser,
    authUser,
  }: { onLineUser: string[]; authUser: User | null } = useAuthStore();

  const [showOnlineUsers, setShowOnLineUsers] = useState<boolean>(true);

  useEffect(() => {
    getUsers();
  }, []);

  const activeUser = showOnlineUsers
    ? users.filter((user) => onLineUser.includes(user._id))
    : users;

  useEffect(() => {
    console.log(selectedUser);
    if (!selectedUser) return;
    getMessages(selectedUser._id);
    subscribeMessage();

    return () => subscribeMessage();
  }, [getMessages, selectedUser, subscribeMessage, subscribeMessage]);

  console.log("messages", messages);
  console.log("onLineUser", onLineUser);

  return (
    <div className="flex h-full w-full">
      {/* user sidebar */}
      <div className="w-[15rem] flex bg-red-100 h-full items-center justify-center">
        {isUsersLoading && (
          <div className="text-gray-500">Loading users...</div>
        )}
        <div className="flex items-start ml-2 h-[70%] w-full flex-col gap-5">
          {users &&
            users
              ?.filter((user) => authUser?.data?._id !== user._id)
              ?.map((user: User, idx) => (
                <span
                  onClick={() => setSelectedUser(user)}
                  className={`${
                    selectedUser?._id === user?._id && "!bg-primary text-white"
                  } text-black flex items-center text-[10px] gap-5 pl-2 py-2 cursor-pointer hover:bg-primary w-[90%] hover:text-white`}
                  key={idx}
                >
                  <img
                    src={user.profilePic}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  {user.name}
                  <br />
                  {user.email}
                  <br />
                  {onLineUser.includes(user._id) ? (
                    <span className="text-green-500">Online</span>
                  ) : (
                    <span className="text-red-500">Offline</span>
                  )}
                </span>
              ))}
        </div>
      </div>

      <div className="p-10 flex w-full h-full">
        <span>Chat Messages</span>
        <div className="w-full relative bg-green-100 flex gap-5 flex-col h-full">
          {messages &&
            messages?.data?.map((message: any, idx: number) => (
              <span
                key={idx}
                className={`text-black ${
                  selectedUser?._id === message.sender && "!ml-auto"
                }`}
              >
                {message.content}
              </span>
            ))}
          <div className="absolute bottom-5 flex w-full items-center justify-center">
            <div className="flex w-[90%] gap-2">
              <input
                type="text"
                placeholder="Enter your message"
                className="w-full border-1 rounded text-black border-black"
              />
              <button className="border-black border p-2 rounded text-black">
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
