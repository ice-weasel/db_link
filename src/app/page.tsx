'use client'; // Changed from 'use client' to 'use strict'

import React, { useState } from "react"; // Added { useState }
import Router from "next/router";
import firebase from "firebase/app";
import "firebase/auth";

export default function Home() {
  const [items, setItems] = useState([
    { name: 'Coffee', price: 4.95 },
    { name: 'Movie', price: 7.95 },
    { name: 'candy', price: 3.95 },
  ]);
  const [total, setTotal] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      <div className="flex-col w-full z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="mt-16 bg-slate-700 rounded-lg p-4">
          <form className="grid grid-cols-6 items-center text-black">
            <input className="col-span-3 p-3 border" type="text" placeholder="Enter Item" />
            <input className="col-span-2 p-3 border mx-3" type="number" placeholder="Enter $" />
            <button className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl" type="submit">+</button>
          </form>
        </div>
      </div>
    </main>
  );
}
