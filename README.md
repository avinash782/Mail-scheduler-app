# 📧 Mail Scheduler

A simple full-stack project that allows collecting candidate information via a form, validating the data, storing it in Firestore, and enabling **accept** or **reject** candidates. Based on the action, an email is automatically sent to the candidate.

---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS, Yup (form validation)
- **Backend:** Node.js, Express.js, Nodemailer
- **Database:** Firebase Firestore
- **Email Service:** Gmail via Nodemailer

---

## ✅ Features

- Candidate data collection form with **Yup** validation
- Stores submitted data in **Firestore**
- Send email to candidate when **accepted** or **rejected**
- View all candidates in a **table format**
- Navigate between candidates using **pagination**
- View individual candidate data on a separate page
- Accept or reject a candidate via buttons
---

## 📷 UI Overview

- `Welcome` page with navigation
- `Candidate Form` for new data entry
- `Candidate Table` listing all entries
- `User Detail` page with accept/reject and pagination controls
---


Note:
firebase need to be signed in and create a separate project for this application.Include firebase auth folders in your interview-app folder.
Then create a .env folder in your Email-Backend folder include email user and email passkey for sending mail.


## How to Run This Project

### 1. Clone the repository

````
git clone https://github.com/your-username/mail-scheduler.git
cd mail-scheduler
cd interview-app
then run "npm run dev"

then cd ..
cd Email-Backend
then run node server.js
````
