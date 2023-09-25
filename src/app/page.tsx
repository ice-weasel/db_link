'use client'
import React, { useEffect, useState } from "react";
import { collection, addDoc, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from './firebase';

export default function Home() {
  // Initialize the Firebase App
  const [items, setItems] = useState<Array<{ id: string; name: string; price: number }>>([]);
  const [newItem, setNewItem] = useState({ name: '', price: 0 });
  const [total, setTotal] = useState<number>(0);

  // Calculate total directly from the updated itemsArr
  const calculateTotal = () => {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalPrice);
  };

  // Add item to database
  const addItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newItem.name !== '' && newItem.price !== 0) {
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price,
      });

      // Clear the form after adding an item
      setNewItem({ name: '', price: 0 });
    }
  };

  // Read items from database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsArr: Array<{ id: string; name: string; price: number }> = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.get("name"),
        price: doc.get("price"),
      }));
      setItems(itemsArr);

      // Calculate total after updating itemsArr
      calculateTotal();
    });

    return () => {
      unsubscribe();
    };
  }, [calculateTotal]);
 
  // Delete items from database
  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'items', id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      <div className="flex-col w-full z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="mt-16 bg-slate-700 rounded-lg p-4">
          <form onSubmit={addItem} className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item"
            />
            <input
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Enter $"
            />
            <button
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>{item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
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
