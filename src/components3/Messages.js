import React, { useEffect, useState } from 'react';
import Navbar3 from './Navbar3';

const Messages = () => {
  const [messages, setMessages] = useState([]); // initialize state with empty messages array

  const getAllMessages = () => {
    fetch('https://swap-ease-backend.vercel.app/messages', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'messagesData');
        setMessages(data.messages); // set the messages array
      });
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const handleDelete = (name) => {
    fetch(`https://swap-ease-backend.vercel.app/messages/${name}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getAllMessages(); // update messages state after deleting message
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar3 />
      <div className='wrapper10'>
        <h5>
          <strong>Messages Received from students</strong>
        </h5>
        <h6> </h6>

        <div className='col-md-6'>
          <table style={{ width: 1100 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px'}}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px'}}>Enrollment No.</th>
                <th style={{ border: '1px solid #ddd', padding: '8px'}}>Email</th>
                <th style={{ border: '1px solid #ddd', padding: '8px'}}>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.length ? (
                messages.map(m => {
                  return (
                    <tr>
                      <td style={{ border: '1px solid #ddd', padding: '8px'}}>{m[0].name}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px'}}>{m[0].enrollment}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px'}}>{m[0].email}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px'}}>{m[0].message}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan='5'>No messages found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Messages;
