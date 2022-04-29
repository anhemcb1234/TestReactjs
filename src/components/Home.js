import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
export default function About() {
  const [show, setShow] = useState(false);
  const [lists, setLists] = useState([]);
  const [text, setText] = useState("");
  const [listText, setListText] = useState([]);
  let unsub = null;
  useEffect(() => {
    handlerText();
  }, [text]);
  const handlerKT = async () => {
    console.log(1);
    const collectionRef = collection(db, "list");
    const collectionQuery = query(
      collectionRef,
      where("category", "==", "Kinh tế")
    );
    unsub = onSnapshot(collectionQuery, (snapShot) => {
      const list = [];
      snapShot.forEach((doc) => {
        list.push({
          id: doc.id,
          category: doc.data().category,
          content: doc.data().content,
          title: doc.data().title,
          time: doc.data().time,
        });
      });
      setLists(list);
    });
  };
  const handlerXH = async () => {
    console.log(1);
    const collectionRef = collection(db, "list");
    const collectionQuery = query(
      collectionRef,
      where("category", "==", "Xã hội")
    );
    unsub = onSnapshot(collectionQuery, (snapShot) => {
      const list = [];
      snapShot.forEach((doc) => {
        list.push({
          id: doc.id,
          category: doc.data().category,
          content: doc.data().content,
          title: doc.data().title,
          time: doc.data().time,
        });
      });
      setLists(list);
    });
  };
  const handlerDX = async () => {
    console.log(1);
    const collectionRef = collection(db, "list");
    const collectionQuery = query(
      collectionRef,
      where("category", "==", "Đời sống")
    );
    unsub = onSnapshot(collectionQuery, (snapShot) => {
      const list = [];
      snapShot.forEach((doc) => {
        list.push({
          id: doc.id,
          category: doc.data().category,
          content: doc.data().content,
          title: doc.data().title,
          time: doc.data().time,
        });
      });
      setLists(list);
    });
  };
  const handlerText = async () => {
    const collectionRef = collection(db, "list");
    const collectionQuery = query(collectionRef, where("title", "==", text));
    unsub = onSnapshot(collectionQuery, (snapShot) => {
      const list = [];
      snapShot.forEach((doc) => {
        list.push({
          id: doc.id,
          category: doc.data().category,
          content: doc.data().content,
          title: doc.data().title,
          time: doc.data().time,
        });
      });
      setListText(list);
    });
  };
  const handlerShow = () => {
    setShow(!show);
  };
  const test = () => {
    console.log(listText);
  };
  return (
    <div>
      <div>
        <button onClick={test}>test</button>
        <label>Tìm kiếm</label>
        <input onChange={(e) => setText(e.target.value)} />
        <div>
          Xem theo danh mục tin
          <div className="mx-10">
            <button onClick={handlerXH}>Xã hội</button>
            <button className="mx-2" onClick={handlerKT}>
              Kinh tế
            </button>
            <button onClick={handlerDX}>Đời sống</button>
          </div>
        </div>
      </div>
      <div>
        {lists?.map((item, index) => (
          <div key={index}>
            <h1 onClick={handlerShow}>title: {item.title}</h1>
            {show ? <p>content: {item.content}</p> : ""}
          </div>
        ))}
      </div>
      <div>
        <h1>List theo input</h1>
        {listText?.map((item, index) => (
          <div key={index}>
            <h1 onClick={handlerShow}>title: {item.title}</h1>
            {show ? <p>content: {item.content}</p> : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
