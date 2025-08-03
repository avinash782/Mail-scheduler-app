import React from 'react'


const AcceptMail = async (candidate) => {
  try{
        const response = await fetch('http://localhost:5000/send-email',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                to:candidate.email,
                subject:'Call for Interview',
                text:`Hi, ${candidate.name},\n We have to inform that,you have shortlisted for the next phase,you'll get the interview meeting link later`
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

export default AcceptMail;