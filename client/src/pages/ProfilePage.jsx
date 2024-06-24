import React, { useEffect, useState } from "react";
import { getUser } from "../utils/getApi";
import ProfilePageTab from "../views/ProfilePageTab";
import UserProfileChangeSettingModal from "../views/UserProfileChangeSettingModal";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  console.log(userDetails);

  useEffect(() => {
    const fetchUserData = async () => {
      await getUser().then((res) => {
        setUserDetails(res.data.data);
      });
    };
    fetchUserData();
  }, []);

  return (
    <div className="bg-[#292376] p-3  h-fit min-h-[calc(100vh-88px)]">
      {userDetails ? (
        <div className="flex w-full h-fit min-h-[calc(100vh-80px)] bg-[url('/images/loginImage.jpeg')] rounded-md bg-no-repeat bg-cover overflow-hidden">
          <div className="w-[60%] mt-[120px] bg-[#19154f] text-white px-10">
            <div className="flex gap-4">
              <img
                src={userDetails.profileImage}
                alt="profilePic"
                className="h-[90px] w-[90px] rounded-full -mt-7"
              />
              <div className="flex justify-between w-full mt-2">
                <div>
                  <h1 className="text-xl font-bold tracking-wide">
                    {userDetails.fullName}{" "}
                    <span className="text-xs text-white/60">
                      ({userDetails.userName})
                    </span>
                  </h1>
                  <p className="text-text-2 text-sm ">{userDetails.email}</p>
                </div>
                <UserProfileChangeSettingModal />
              </div>
            </div>
            <div className="mt-8 py-5">
              <ProfilePageTab userDetails={userDetails} />
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
