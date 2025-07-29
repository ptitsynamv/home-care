"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)

        console.log(data)
      });
  }, []);

  return (
    <>
      <p>Here home</p>

    </>
  );
}
