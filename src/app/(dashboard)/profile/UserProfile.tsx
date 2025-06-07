import { FC } from "react";

type UserPageProps = {
  user: {
    email?: string;
  };
};

const UserPage: FC<UserPageProps> = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.email || "Guest"}</h1>
    </div>
  );
};

export default UserPage;
