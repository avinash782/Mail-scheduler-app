import React from 'react'

export default function MainPage({ children }) {
  return (
    <>
      <h1 className='bg-blue-600 text-white text-3xl text-center p-4'>
        Interview App
      </h1>
      <main className='my-4'>
        <section className='w-full'>
          <div className='w-7xl mx-auto rounded shadow-lg p-6 bg-black'>
            <h2 className='text-white text-xl'>Interview scheduled candidates</h2>
            {children}
          </div>
        </section>
      </main>
    </>
  );
}