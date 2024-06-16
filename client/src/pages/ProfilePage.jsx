import React, { useEffect, useState } from "react";
import { getUser } from "../utils/getApi";
import { Button } from "../components/ui/button";
import { FaEdit } from "react-icons/fa";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      await getUser().then((res) => {
        setUserDetails(res.data.data);
      });
    };
    fetchUserData();
  }, []);

  return (
    <div className="bg-[#292376] p-3 min-h-[calc(100vh-88px)]">
      {userDetails ? (
        <div className="flex w-full min-h-full bg-[url('/images/loginImage.jpeg')] rounded-md bg-no-repeat bg-cover overflow-hidden">
          <div className="w-[70%] mt-[120px] bg-[#19154f] text-white px-10">
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
                <Button variant="outline">
                  <FaEdit className="mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[30%] mt-[120px] bg-[#19154f]"></div>
        </div>
      ) : (
        <h1>No User Found!</h1>
      )}
    </div>
  );
};

export default ProfilePage;
