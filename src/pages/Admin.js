import React, { useEffect, useState, useRef } from "react";
import {useNavigate, Link} from 'react-router-dom'
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import uniqid from 'uniqid';

const Add = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(0);
  const [id, setId] = useState(0);
  let unsub = null;

  const addNote = async () => {
    const collectionRef = collection(db, "list");
    await addDoc(collectionRef, {
      title: title,
      id: uniqid(),
      content: content,
      category: category,
    });
  }
  
  const deleteNote = async (id) => {
    const docRef = doc(db, "list", id);
    await deleteDoc(docRef);
  };
  const hihi = () => {
    console.log(todos);
  };

  useEffect(() => {
    (async () => {
      const collectionRef = collection(db, 'list');
      unsub = onSnapshot(collectionRef, (snapShot) => {
        const localTodos = [];
        snapShot.forEach(doc => {
          localTodos.push({
              id: doc.id,
              title: doc.data().title,
              content: doc.data().content,
              category: doc.data().category,
              id_user: doc.data().id
          });
      });
      setTodos(localTodos);
      setContent('');
      setCategory(0);
      setTitle('');
  });
  })();
  }, [])
  return (
    <div className="container mt-2 mx-auto">
      <div>
        <h1 className="text-center font-bold mt-10 uppercase">Thêm Báo</h1>
        <div className="my-10">
          <label htmlFor="comment" className="text-lg text-gray-600"></label>
          <input
            onChange={(evt) => setTitle(evt.target.value)}
            value={title}
            className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="comment"
            placeholder=""
          ></input>

          <label htmlFor="comment" className="text-lg text-gray-600"></label>
          <input
            onChange={(evt) => setContent(evt.target.value)}
            value={content}
            className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="comment"
            placeholder=""
          ></input>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Xã hội">Xã hội</option>
            <option value="Kinh tế">Kinh tế</option>
            <option value="Đời sống">Đời sống</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={addNote}
            className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
          >
            Thêm công việc
          </button>
        </div>
      </div>
      <div className="mt-10">
        {todos?.map((item, index) => (
                        <div className='flex items-center justify-between my-2' key={index}>
                            <p><span>{index+1}</span>. {item.content}</p> 
                            <p>{item.title}</p>
                            <p>{item.category}</p>
                            <div>
                                <Link to={`/edit?id=${item.id}`}>Sửa</Link>
                                <button onClick={() => deleteNote(item.id)} className='px-3 ml-2 py-2 text-sm text-blue-100 bg-blue-600 rounded'>Xóa</button>
                            </div>
                        </div>
                    ))}
      </div>
    </div>
  );
};

export default Add;
