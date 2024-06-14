import React from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  return <div>Hello {username}</div>;
};

export default ProfilePage;
