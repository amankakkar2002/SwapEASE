import React, { useEffect, useState } from 'react';
import Navbar2 from './Navbar2';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Swapped = () => {
  const [data, setData] = useState([]);

  const getAllUser = () => {
    fetch("/AllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  function handleDelete(name) {
    const newList = data.filter((li) => li.name !== name);
    setData(newList);
  }

  return (
    <>
      <Navbar2 />
      <div className='wrapper9'>
        <h5>
          <strong>AVAILABLE FOR SWAPPING</strong>
        </h5>
        <h6> </h6>

        <div className='col-md-6'>
          {data.length > 0 ? (
            <table style={{ width: 1100 }}>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>Name</b></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>Enrollment No.</b></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>Desired Subject</b></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>Existing Subject</b></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><b>Mail</b></td>
              </tr>
              {data.map(i => (
                <tr key={i.name}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{i.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}><a href={`mailto:${i.email}`}>{i.enrollment}</a></td>
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
