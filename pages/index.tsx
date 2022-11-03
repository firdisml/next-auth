import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useUser } from "../context/user.context";
import Router from "next/router";
import { useEffect } from "react";
import { fetcher } from "../lib/fether";

export default function Home() {
  const { user, setUser } = useUser();

interface UserDocument {
    id: string
    email: string
    password: string
    refresh_token: string
    created_at: Date
    updated_at:Date
    balance: number
}
  

  const getMe = async () => {
    const [error, user] = await fetcher<UserDocument>(
      `https://api.firdausismail.online/user/profile`
    );
    if (!error && user){
      console.log(user)
      setUser(user)
    } 
    else Router.push("/");
  };

  useEffect(() => {
    if (!user) getMe();
  });

  return (
   <>
       <main className="flex items-center justify-center h-full">
      <div className="space-y-4 text-center">
        <h1 className="px-4 py-2 text-lg font-medium bg-gray-200 rounded">
          Client side authentication
        </h1>
        {user ? <p>Hi, {user.email} 👋</p> : <p>Loading...</p>}
      </div>
    </main></>
  );
}
