import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import InputField from "../components/InputField";
import SubTitle from "../components/SubTitle";
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import MenuPage from "../layout/MenuPage";


const Notes = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "text"));
    const unSub = onSnapshot(q, (querySnapshot) => {
      const tempArray = [];
      querySnapshot.forEach((doc) => {
        tempArray.push({ ...doc.data(), id: doc.id });
      });
      setData(tempArray);
    });
    return () => unSub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text !== "") {
      await addDoc(collection(db, "text"), {
        text,
      });
    }
    setText("");
  };

  return (
    <MenuPage>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col pt-14">
          <Title innerText="Add Text" />
          <p className="text-slate-400">
            Write some text and it’ll be displayed below:
          </p>
        </div>
        <div className="flex flex-col gap-[90px] pt-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 justify-center items-center 2xl:items-start xl:items-start lg:justify-start md:justify-start"
          >
            <InputField
              label="Enter Text"
              onChange={(event) => {
                setText(event.target.value);
              }}
              type="text"
              value={text}
              required
            />
          </form>
          <div className="flex flex-col gap-2">
            <SubTitle innerText="Fetched Text" />
            <div className="text-white">
              {data.map((text) => {
                return <li key={text.id}>{text.text}</li>;
              })}
            </div>
          </div>
        </div>
      </div>
    </MenuPage>
  );
};

export default Notes;
