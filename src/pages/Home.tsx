import { useEffect, useState } from "react";
import { useChatStore, type User } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const {
    getUsers,
    users,
    selectedUser,
    isUsersLoading,
    setSelectedUser,
  }: {
    getUsers: () => Promise<void>;
    users: User[];
    selectedUser: User | null;
    setSelectedUser: (selectedUser: User) => void;
    isUsersLoading: boolean;
  } = useChatStore();

  const { onLineUser, authUser }: { onLineUser: string[]; authUser: User } =
    useAuthStore();

  const [showOnlineUsers, setShowOnLineUsers] = useState<boolean>(true);

  useEffect(() => {
    getUsers();
  }, []);

  const activeUser = showOnlineUsers
    ? users.filter((user) => onLineUser.includes(user._id))
    : users;

  console.log("activeUser", activeUser);
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
              .filter((user) => authUser.data?._id !== user._id)
              .map((user, idx) => (
                <span
                  className="text-black flex items-center text-[10px] gap-5 pl-2 py-2 cursor-pointer hover:bg-primary w-[90%] hover:text-white"
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
    </div>
  );
};

export default Home;
