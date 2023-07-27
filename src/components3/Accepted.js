import React from 'react';
import Navbar3 from './Navbar3';

const Accepted = () => {
  const handleClearDatabase = async () => {
    try {
      const res = await fetch('https://swap-ease-backend.vercel.app/clearDatabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        alert('Database cleared successfully.');
      } else {
        alert('Failed to clear the database.');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleFormDelete = async () => {
    try {
      const res = await fetch('https://swap-ease-backend.vercel.app/clearForms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        alert('All Forms Removed successfully.');
      } else {
        alert('Failed to clear the database.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar3 />
      <h5 align='center'>Accepting invites here....</h5>
      <div className='text-center my-3'>
        <button className='btn bg-danger text-white' onClick={handleClearDatabase}>
          Clear Database
        </button>
      </div>
      <div className='text-center my-3'>
        <button className='btn bg-danger text-white' onClick={handleFormDelete}>
          Clear All Form Details
        </button>
      </div>
    </>
  );
};

export default Accepted;
