import React from 'react'
import { db } from '../Firebase/index' 
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc,doc} from "firebase/firestore";
import { Link } from 'react-router-dom';
import AcceptMail from '../Email/AcceptMail';
import RejectMail from '../Email/RejectMail';

const UserList = () => {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'candidates'));
      const candidatesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCandidates(candidatesData);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDelete = async (candidate) => {
    try {
      console.log(candidate)
      await deleteDoc(doc(db, "candidates", candidate.id));
      await RejectMail(candidate);
      // Option 1: Re-fetch the data
      await fetchCandidates();

    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  return (
    <>
      <section className='my-4'>
        <h1 className='bg-blue-600 text-white text-3xl text-center p-4'>Candidates list</h1>
      </section>

      <div className='container mx-auto p-4 outline-blue-600 '>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">S.No</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Details</th>
                <th className="px-4 py-2 text-left">Application</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={candidate.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{candidate.name}</td>
                  <td className="px-4 py-2">
                    <Link to={`/userinfo/${candidate.name}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded">
                        View Application
                      </button>
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <div className='w-[300px] space-x-3'>
                      <button className="bg-green-500 text-white px-3 py-1 rounded transition duration-300 ease-in-out active:bg-white active:text-green-500"
                      onClick={() => AcceptMail(candidate)}>
                        Accept
                      </button>
                      <button
                        className='bg-red-500 text-white px-3 py-1 rounded transition-all duration-300 active:bg-white active:text-red-500'
                        onClick={() => handleDelete(candidate)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};


export default UserList;