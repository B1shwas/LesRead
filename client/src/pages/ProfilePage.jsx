import React, { useEffect, useState } from "react";
import ProfilePageTab from "../views/ProfilePageTab";
import UserProfileChangeSettingModal from "../views/UserProfileChangeSettingModal";
import useAuthStore from "../zustand-store/authStore";
import { fetchUserData } from "../utils/fetchUserData";

const ProfilePage = () => {
  const { setUser, user } = useAuthStore();

  useEffect(() => {
    fetchUserData(setUser);
  }, []);

  return (
    <div className="bg-[#292376] p-3  h-fit min-h-[calc(100vh-88px)]">
      {user ? (
        <div className="flex w-full h-fit min-h-[calc(100vh-80px)] bg-[url('/images/loginImage.jpeg')] rounded-md bg-no-repeat bg-cover overflow-hidden">
          <div className="w-[60%] mt-[120px] bg-[#19154f] text-white px-10">
            <div className="flex gap-4">
              <img
                src={user.profileImage}
                alt="profilePic"
                className="h-[90px] w-[90px] rounded-full -mt-7"
              />
              <div className="flex justify-between w-full mt-2">
                <div>
                  <h1 className="text-xl font-bold tracking-wide">
                    {user.fullName}{" "}
                    <span className="text-xs text-white/60">
                      ({user.userName})
                    </span>
                  </h1>
                  <p className="text-text-2 text-sm ">{user.email}</p>
                </div>
                <UserProfileChangeSettingModal />
              </div>
            </div>
            <div className="mt-8 py-5">
              <ProfilePageTab userDetails={user} />
            </div>
          </div>
          <div className="w-[40%] mt-[120px] bg-[#19154f] "></div>
        </div>
      ) : (
        <h1>No User Found!</h1>
      )}
    </div>
  );
};

export default ProfilePage;
