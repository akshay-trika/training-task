import React, { useEffect, useState } from 'react';
import 'whatwg-fetch'

function ContactTableService() {
  const [contactData, setContactData] = useState([]);
  const [error, setErr] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const res = await fetch('/contact');
    if (res.ok) {
      const response = await res.json();
      setContactData(response);
    } else {
      setErr('Failed to recieve contact details due to some error');
    }
  };


  return (
    <div>
      <table className='w-100'>
        <thead className='bg-action-primary c-danger--faded pa4 text-white'>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Message </th>
            <th>Age</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {contactData.length ? contactData.map((item: any, index: any) => (
            <tr key={index} className='bg-black-60 c-on-base--inverted text-white'>
              <td className='tc w-10'>{index}</td>
              <td className='tc'>{item.firstname}</td>
              <td className='tc'>{item.lastname}</td>
              <td className='tc'>{item.message}</td>
              <td className='tc'>{item.age}</td>
              <td className='tc'>{item.subject}</td>
            </tr>)) : <>{error}</>}
        </tbody>
      </table>
    </div>
  );
}






export default ContactTableService;