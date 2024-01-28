"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDelete, MdCancel } from "react-icons/md";

const LoadingIcon = () => (
  <div className="absolute inset-0 flex items-center justify-center z-20">
    <div className="bg-gray-50 opacity-80 w-full h-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  </div>
);

export const ItemCard = ({ id, name }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [editedName, setEditedName] = useState("");

  const handleDeleteItem = async () => {
    setLoading(true);
    await fetch("https://v1.appbackend.io/v1/rows/AYTGODb6D7SM", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([id]),
    });
    setTimeout(() => router.refresh(), 1000);
    setLoading(false);
  };

  const handleEditItem = () => {
    setEditedName(name);
    setOnEdit(true);
  };

  const handleCancelItem = () => {
    setEditedName(name);
    setOnEdit(false);
  };

  const handleUpdateItem = async () => {
    setLoading(true);
    await fetch("https://v1.appbackend.io/v1/rows/AYTGODb6D7SM", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, name: editedName }),
    });
    router.refresh();
    setTimeout(() => {
      setLoading(false);
      setOnEdit(false);
    }, 1000);
  };

  //Variable HTML Start
  const NameElement = () => (
    <div className="w-full text-center text-3xl">
      {editedName ? editedName : name}
    </div>
  );

  const SaveButton = () => (
    <button className="rounded w-[50%]" onClick={handleUpdateItem}>
      <FaSave />
    </button>
  );

  const EditButton = () => (
    <button className="rounded w-[50%]" onClick={handleEditItem}>
      <FaEdit />
    </button>
  );

  const CancelButton = () => (
    <button className="rounded w-[50%]" onClick={handleCancelItem}>
      <MdCancel />
    </button>
  );

  const DeleteButton = () => (
    <button className="rounded w-[50%]" onClick={handleDeleteItem}>
      <MdDelete />
    </button>
  );
  //Variable HTML End

  return (
    <div className="group flex flex-col basis-1/2 lg:gap-8 gap-6 relative">
      <div className="p-8 shadow-xl rounded-lg relative bg-white">
        {loading && <LoadingIcon />}
        {onEdit ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full text-center text-3xl border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-black"
          />
        ) : (
          <NameElement />
        )}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-2 top-2">
          <div className="flex flex-col gap-2">
            {onEdit ? <SaveButton /> : <EditButton />}
            {onEdit ? <CancelButton /> : <DeleteButton />}
          </div>
        </div>
      </div>
    </div>
  );
};
