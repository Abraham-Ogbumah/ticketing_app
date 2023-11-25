"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = () => {
    
    const router = useRouter();
  
    const handleChange = (e) => {
    e.preventDefault();
    const res = await fetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify({formData}),
        "content-type": "application/json"
    })

    if (!res.ok) {
        throw new Error("Failed to create ticket");
    }

    router.refresh()
    router.push('/')

    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("submitted");
  }

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware problem",
  };
  const [FormData, setFormData] = useState(startingTicketData);
  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "CREATE YOUR TICKET"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          values={FormData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          values={FormData.description}
          rows="5"
        />
        <label>Category</label>
        <select
          name="category"
          values={FormData.category}
          onChange={handleChange}
        ></select>
        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={FormData.priority === 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={FormData.priority === 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={FormData.priority === 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={FormData.priority === 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={FormData.priority === 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          id="progress"
          name="progress"
          type="range"
          onChange={handleChange}
          values={FormData.progress}
          min="0"
          max="100"
        />
        <label>Status</label>
        <select name="status" value={FormData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
