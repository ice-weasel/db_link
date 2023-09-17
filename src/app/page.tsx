'use client';

import React, { useState } from "react";
import Router from "next/router";

import "firebase/auth";
import { collection, addDoc,   } from "firebase/firestore";
import "firebase/auth";
import "@firebase/firestore";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore, Firestore } from "firebase/firestore";

export default function Home() {
  const [items, setItems] = useState([
    { name: 'Coffee', price: 4.95 },
    { name: 'Movie', price: 7.95 },
    { name: 'candy', price: 3.95 },
  ]);
  const [newItem, setNewItem] = useState({name: '',price: ''});
  const [total, setTotal] = useState(0);

 // Initialize Firestore and assign it to db

 const db: Firestore = firebase.firestore();
  const addItem = async (e:React.FormEvent) => {
    e.preventDefault()
  
  if(newItem.name!= '' && newItem.price! == '')
  {
      await addDoc(collection(db,"items"), {
      name: newItem.name.trim(),
      price: newItem.price,
    })
  }
};
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      <div className="flex-col w-full z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="mt-16 bg-slate-700 rounded-lg p-4">
          <form className="grid grid-cols-6 items-center text-black">
            <input value={newItem.name} onChange={(e) => setNewItem({...newItem,name: e.target.value})} className="col-span-3 p-3 border" type="text" placeholder="Enter Item" />
            <input value={newItem.price} onChange={(e) => setNewItem({...newItem,price: e.target.value})} className="col-span-2 p-3 border mx-3" type="number" placeholder="Enter $" />
            <button onClick={addItem} className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl" type="submit">+</button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className="my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>{item.price}</span>
                </div>
                <button className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">X</button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? '' : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
