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
    <div className="container">
      <div className='shadow p-3'>
       <div className="row">
          <div className="col-md-6">
            <h5>
              <strong>AVAILABLE FOR SWAPPING</strong>
            </h5>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by subject..."
                className="form-control"
              />
              <a className="btn btn-primary" onClick={() => setSearchQuery('')}>
                Clear
              </a>
            </div>
          </div>
        </div>
        <div className='table-responsive'>
          {data.length > 0 ? (
            <table className='table table-bordered'>
              <thead>
              <tr>
                <th><b>Name</b></th>
                <th><b>Sector</b></th>
                <th><b>Desired Subject</b></th>
                <th><b>Existing Subject</b></th>
                <th><b>Mail</b></th>
              </tr>
            </thead>
            <tbody>
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
                </tbody>
            </table>
          ) : (
            <p>No data available.</p>
          )}
        </div>
            </div>
      </div>
    </>
  );
};

export default Swapped;
