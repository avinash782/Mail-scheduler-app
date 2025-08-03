import React from 'react'
import { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs,deleteDoc,doc } from 'firebase/firestore';
import { db } from '../Firebase/index' 

import AcceptMail from '../Email/AcceptMail';


const UserInfo = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  
  const [candidate, setCandidate] = useState(null);
  const [candidateList, setCandidateList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

 const fetchAllCandidates = async () => {
      const snapshot = await getDocs(collection(db, 'candidates'));
      const names = snapshot.docs.map((doc) => doc.data().name);
      setCandidateList(names);
};


  // Fetch all candidate names
  useEffect(() => {
    fetchAllCandidates();
  }, []);

  // Fetch current candidate data by name
  useEffect(() => {
    const fetchCandidateByName = async () => {
      const q = query(collection(db, 'candidates'), where('name', '==', name));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setCandidate({ id: doc.id, ...doc.data() });

        // Also update current index
        const index = candidateList.indexOf(doc.data().name);
        setCurrentIndex(index);
      } else {
        console.log('Candidate not found');
      }
    };

    if (candidateList.length > 0) {
      fetchCandidateByName();
    }
    console.log(candidateList);
  }, [name, candidateList]);



  //Delete functionality
  const handleDelete = async (candidate) => {
  try {
    // Delete the candidate from Firestore
    console.log(candidate)
    await deleteDoc(doc(db, "candidates", candidate.id));
    setCandidateList((prev) => prev.filter((n) => n !== candidate.name));

    
    // Prepare to navigate
    const nextIndex = currentIndex + 1;
    const prevIndex = currentIndex - 1;
    if (nextIndex < candidateList.length) {
      // Navigate to next candidate
      const nextName = candidateList[nextIndex];
      navigate(`/userinfo/${nextName}`);
    } else if (prevIndex >= 0) {
      // No next, so go to previous
      const prevName = candidateList[prevIndex];
      navigate(`/userinfo/${prevName}`);
    } else {
      // No candidates left, navigate to a fallback page
      navigate(`/`);
    }
  } catch (error) {
    console.error("Error deleting candidate:", error);
  }
};


  // Navigate to previous
  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevName = candidateList[currentIndex - 1];
      navigate(`/userinfo/${prevName}`);
    }
  };

  // Navigate to next
  const goToNext = () => {
    if (currentIndex < candidateList.length - 1) {
      const nextName = candidateList[currentIndex + 1];
      navigate(`/userinfo/${nextName}`);
    }
  };

  if (!candidate) return <p>Loading...</p>;



  return (
   <div className="p-4">
      <h2 className="text-xl font-bold">Candidate Details</h2>
      <p><strong>Name:</strong> {candidate.name}</p>
      <p><strong>Email:</strong> {candidate.email}</p>
      <p><strong>Status:</strong> {candidate.experience}</p>
      <p><strong>Status:</strong> {candidate.jobRole}</p>


      <div className='w-[300px] space-x-3 my-6' >
          <button onClick={() => AcceptMail(candidate)} className="bg-green-500 text-white px-3 py-1 rounded transition duration-300 ease-in-out active:bg-white active:text-green-500 ">
            Accept
          </button>
          <button onClick={() => handleDelete(candidate)} className='bg-red-500 text-white px-3 py-1 rounded transition-all duration-300 active:bg-white active:text-red-500'>
            Reject
          </button>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={goToPrevious}
          disabled={currentIndex <= 0}
          className="bg-blue-500 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={goToNext}
          disabled={currentIndex >= candidateList.length - 1}
          className="bg-green-500 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
   </div>




  )
}

export default UserInfo