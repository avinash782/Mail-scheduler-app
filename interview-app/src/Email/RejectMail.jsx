import React from 'react'


const RejectMail = async (candidate) => {
  try{
        const response = await fetch('http://localhost:5000/reject-email',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                to:candidate.email,
                subject:'Interview Application',
                text:`Hi, ${candidate.name},\n We are sorry to inform we cannot proceed with your application at this time.\n\nBest regards`
            })
        })

        const result = await response.json();
        if(result){
            alert('Email sent successfully,check the console for response message');
            console.log(result.message);
        }
    } catch (error) {
        console.error('error sending mail');
        alert('failed to send mail');
    }

 
};

export default RejectMail;