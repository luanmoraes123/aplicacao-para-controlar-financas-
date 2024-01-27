'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Chart from '../../../components/Chart'

export const DashBoard = () => {

  const router = useRouter();
  const [user, setUser] = useState({id: null});
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    }

    axios.get('http://localhost:8080/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      setUser(res.data.data);
    }).catch(res => {
      router.push('/login');
    })
  
    return () => {
      
    }
  }, [router])
  
  return(
    <div>
      Dashboard
      <div style={{marginLeft: '80px'}}>

      <Chart />
      </div>

    </div>
  )
}

export default DashBoard;