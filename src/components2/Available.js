import React, { useEffect, useState } from 'react';
import Navbar2 from './Navbar2';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Swapped = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getAllUser = () => {
    fetch(`https://swap-ease-backend.vercel.app/AllUser?query=${searchQuery}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userData');
        setData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    getAllUser();
  }, [searchQuery]);

  function handleDelete(name) {
    const newList = data.filter((li) => li.name !== name);
    setData(newList);
  }

  return (
    <>
      <Navbar2 />
      <div className='wrapper9'>
       <h5>
          <div className='d-flex justify-content-between'>
          <strong>AVAILABLE FOR SWAPPING</strong>
          <div className='d-flex'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by subject..."
          className='form-control'
        />
        <a className='btn bg-primary text-white ms-2' onClick={() => setSearchQuery('')}>Clear</a>
      </div>
      </div>
        </h5>

        <div className='col-md-6'>
          {data.length > 0 ? (
            <table style={{ width: 1100 }}>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>Name</b></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>Sector</b></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>Desired Subject</b></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>Existing Subject</b></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>Mail</b></td>
              </tr>
              {data.map(i => (
                <tr key={i.name}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{i.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{i.sector}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{i.dsubject}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{i.esubject}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <a href={`mailto:${i.email}`}><FontAwesomeIcon icon={faEnvelope} /></a>
                    {/* Example usage of handleDelete */}
                    {/* <button onClick={() => handleDelete(i.name)}>Delete</button> */}
                  </td>
                </tr>
              ))}
            </table>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Swapped;
