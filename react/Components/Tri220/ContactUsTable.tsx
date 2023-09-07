import React, { useEffect, useState } from "react";
import { useLazyQuery } from "react-apollo";
import documents from '../../graphql/getContactUstable.graphql'

const ContactUsTable = () => {
    const [contactData, setContactData] = useState<any>([]);
    const [pageTrue, setPageTrue] = useState(false);
    const [pageno, setPageNo] = useState(1);
    const [err, setErr] = useState<any>(null);
    const [getContact, { data,error }] = useLazyQuery(documents, {
      variables: {
        acronym: 'YF',
        fields: [
          'firstname',
          'lastname',
          'subject',
          'age',
        ],
        schema: 'akshay',
        page: pageno,
        pageSize: 10
      },
      notifyOnNetworkStatusChange: true,
      ssr: false,
    })
    useEffect(() => {
      if (pageTrue) {
        getContact();
        setPageTrue(false);
      }else{
        getContact();
      }
    }, [ pageTrue]);
  
    useEffect(() => {
      if (data) {
        console.log(data,'akshay')
        setContactData([ ...data.documents]);
      }
      if (error) {
        setErr('There is an error');
      }
    }, [data, error]);
  
  
  
    return (
      <table className='w-100' >
        <thead className='bg-action-primary c-danger--faded pa4 text-white'>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Subject </th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {console.log(contactData)}
          {
          
          
          contactData ? contactData.map((item: any, index: any) => (
            <tr key={index} className='bg-black-60 c-on-base--inverted text-white'>
              <td className='tc'>{index}</td>
              <td className='tc'>{item.fields.find((field: any) => field.key === "firstname").value}</td>
              <td className='tc'>{item.fields.find((field: any) => field.key === "lastname").value}</td>
              <td className='tc'>{item.fields.find((field: any) => field.key === "subject").value}</td>
              <td className='tc'>{item.fields.find((field: any) => field.key === "age").value}</td>
            </tr>
          )) : <>{err}</>}
          {!contactData.length && <div>
            Contact Data not found </div>}
        
        </tbody>
        <div className="flex justify-center">
         <button type="button" className='b--black-0125 bg-muted-2 br4 pa3 white' onClick={() => {setPageNo(pageno + 1);setPageTrue(true)}}>
            See More
          </button>
          <button type="button" className='b--white-025 ba bg-red br4 pa3 white' onClick={() => {setPageNo(pageno - 1);setPageTrue(true)}}>
            See Less  
          </button>
         </div>
        
      </table>
    
     
      
    );
  }

export default ContactUsTable;