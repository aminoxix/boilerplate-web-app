import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import SubTitle from "../components/SubTitle";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase/firebase-config";
import { v4 } from "uuid";
import MenuPage from "../layout/MenuPage";

const Gallery = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [fileName, setFileName] = useState("");

  const imagesListRef = ref(storage, "images/");

  // Function to upload file to firebase storage
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
    setFileName("No file chosen.");
    setImageUpload(null);
  };

  useEffect(() => {
    // Retrieve all images from firebase storage and update the imageUrls state
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <MenuPage>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col pt-14">
          <Title innerText="Add Image" />
          <p className="text-slate-400">
            Upload an image and it'll be displayed below:
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-6 justify-center items-center pt-8">
          <div className="flex w-60 h-9">
            <label className="relative w-1/2 block text-sm bg-black rounded-sm cursor-pointer">
              <input
                className="opacity-0 text-white"
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                  setFileName(event.target.files[0].name);
                }}
              />
              <p className="absolute top-2 right-5">Choose File</p>
            </label>
            <div className="w-1/2 text-sm flex justify-center items-center">
              {fileName ? fileName : `No file chosen.`}
            </div>
          </div>
          <Button handleClick={uploadFile} innerText="Upload Image" />
        </div>
        <div className="flex flex-1 flex-col pt-14">
          <SubTitle innerText="Images List" />
          <div className="flex flex-wrap gap-4 pt-8 justify-center items-center">
            {imageUrls.map((url) => {
              return (
                <img
                  key={imageUrls.indexOf(url)}
                  className="bg-slate-400 w-[280px] h-40 rounded-md"
                  src={url}
                />
              );
            })}
          </div>
        </div>
      </div>
    </MenuPage>
  );
};

export default Gallery;
