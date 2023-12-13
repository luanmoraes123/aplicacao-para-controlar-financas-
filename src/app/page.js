'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export const DashBoard = () => {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    }
    router.push('/dashboard');
  })

  return (
    <div>
    </div>
  )
}

export default DashBoard;