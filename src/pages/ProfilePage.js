import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import userService from "../services/user.service";
import userImage from "../assets/user.png";

function ProfilePage() {
  const { user } = useOutletContext();

  const [image, setImage] = useState(
    localStorage.getItem("userProfileImage") || userImage
  );

  useEffect(() => {
    if (!localStorage.getItem("userProfileImage")) {
      localStorage.setItem("userProfileImage", userImage);
    }
  }, []);

  const handleImage = async (e) => {
    const file = e.target.files[0];

    try {
      const base64Image = await getBase64Image(file);
      const response = await userService.updateUserProfileImage(
        user._id,
        base64Image
      );
      const newImageUrl = response.data.data.profile.image.url;
      setImage(newImageUrl);
      localStorage.setItem("userProfileImage", newImageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const getBase64Image = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-1/3 h-1/2 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg  mt-10 rounded-lg flex flex-col justify-center items-center">
          <div className="flex items-center justify-center pt-10 flex-col">
            <div
              className="rounded-full w-64 h-64 bg-cover bg-center mb-10"
              style={{ backgroundImage: `url(${image})` }}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded border border-glass mt-5 mb-10"
            >
              Upload new profile image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />

            <h1 className="text-white font-semibold text-xl mt-5">
              {user.name}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
