import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const { logout } = useAuth(); // Get logout function from context
  const [showModal, setShowModal] = useState(false); // State to show modal
  const [showProfile, setShowProfile] = useState(false); // State to control the visibility of the profile
  const modalRef = useRef(); // Reference to the modal content box
  const profileRef = useRef(); // Reference to the profile content box

  const handleLogout = async () => {
    try {
      console.log("Attempting to log out..."); // Debugging point
      await logout(); // Log the user out using Firebase auth
      console.log('Logged out successfully');
      setShowModal(false); // Close the modal after logout
      setShowProfile(false); // Close the user profile after logout
    } catch (error) {
      console.error('Error logging out:', error); // Log any error encountered
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Close the modal without logging out
  };

  const openModal = () => {
    console.log("Opening modal"); // Debugging: confirm modal is opening
    setShowModal(true); // Show the modal when "Logout" is clicked
  };

  const handleOutsideClick = (e) => {
    // Check if the click happened outside the modal and the user profile
    if (modalRef.current && !modalRef.current.contains(e.target) && !profileRef.current.contains(e.target)) {
      setShowProfile(false); // Close the profile if click is outside the profile and modal
    }
  };

  useEffect(() => {
    // Add event listener for outside click
    if (showProfile) {
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick); // Cleanup listener on component unmount
    };
  }, [showProfile]);

  return (
    <>
      {/* Toggle profile visibility on button click */}
      <Button
        text="User Profile"
        color="white"
        bgColor={currentColor}
        textColor="black"
        onClick={() => setShowProfile(!showProfile)} // Toggle profile visibility
      />

      {showProfile && (
        <div ref={profileRef} className="nav-item absolute right-1 top-16 bg-white dark:bg-[#000000] p-8 rounded-lg w-50">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-md dark:text-gray-200">User Profile</p>
            <Button
              icon={<MdOutlineCancel />}
              color="rgb(153, 171, 180)"
              bgHoverColor="light-gray"
              size="2xl"
              borderRadius="50%"
              onClick={() => setShowProfile(false)}
            />
          </div>
          <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
            <img
              className="rounded-full h-24 w-24"
              src={avatar}
              alt="user-profile"
            />
            <div>
              <p className="font-semibold text-xl dark:text-gray-200">
                Omotayo Odupitan
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400">Administrator</p>
              <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                info@neegles.com
              </p>
            </div>
          </div>
          <div>
            {userProfileData.map((item, index) => (
              <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
                <button
                  type="button"
                  style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                  className="text-xl rounded-lg p-3 hover:bg-light-gray"
                >
                  {item.icon}
                </button>

                <div>
                  <p className="font-semibold dark:text-gray-200">{item.title}</p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Button
              color="white"
              bgColor={currentColor}
              text="Logout"
              borderRadius="10px"
              width="full"
              onClick={openModal}
            />
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div
                ref={modalRef}
                className="bg-white p-6 rounded-lg w-80"
              >
                <p className="text-center text-xl font-semibold">Are you sure you want to leave? 😢</p>
                <div className="flex justify-between mt-4">
                  <Button
                    text="Cancel"
                    color="white"
                    bgColor="gray"
                    borderRadius="10px"
                    width="full"
                    onClick={handleCancel}
                  />
                  <Button
                    text="Logout"
                    color="white"
                    bgColor={currentColor}
                    borderRadius="10px"
                    width="full"
                    onClick={handleLogout}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
