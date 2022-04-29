import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db, auth} from "../firebase";
import {useNavigate, Link} from 'react-router-dom'

const Edit = () => {
    let navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const [message, setMessage] = useState('');
    useEffect(() => {
        (async () => {
            const docRef = doc(db, 'list', searchParam.get('id'));
            const docSnapshot = await getDoc(docRef);
            setMessage(docSnapshot.data().content);
        })();
    }, []);

    const editNote = async () => {
        const docRef = doc(db, 'list', searchParam.get('id'));
        await updateDoc(docRef, {content: message});
        alert('Sửa thành công');
        navigate('/')
    };

    return (
        <div className='container mx-auto'>
            <button className="px-3 float-right mt-5 py-2 text-sm text-blue-100 bg-blue-600 rounded">
                <Link to={'/'}>Trở về trang thêm báo</Link>
            </button>
            <h1 className='text-center font-bold my-10 uppercase'>Sửa</h1>
            <div className='flex justify-center'>
                <textarea value={message} onChange={(evt) => setMessage(evt.target.value)} className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    name="comment" placeholder=""></textarea>
            </div>
            <button onClick={editNote} className="px-3 mt-5 py-2 text-sm text-blue-100 bg-blue-600 rounded">Sửa</button>
        </div>
    );
};

export default Edit;