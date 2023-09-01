import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MainApplication() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [isLoggedIn, router]);

  return (
    <div className="font-bold underline">
      Hello World
    </div>
  )
}
