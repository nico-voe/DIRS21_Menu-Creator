import { useState } from "react";
import { useForm, useController } from "react-hook-form";
import "./Form.css";

const url = "http://localhost:9000/";

const categories = [
  { value: "Starter", label: "Starter" },
  { value: "Main Course", label: "Main Course" },
  { value: "Dessert", label: "Dessert" },
  { value: "Beverage", label: "Beverage" },
];
const availabilities = [
  { value: "Breakfast", label: "Breakfast" },
  { value: "Lunch", label: "Lunch" },
  { value: "Dinner", label: "Dinner" },
];

const Form = () => {
  const { register, handleSubmit } = useForm();

  const apiPost = async (formValues) => {
    console.log("formValues", formValues);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    };
    const response = await fetch(`${url}dishes`, requestOptions);
    console.log("response", response);
    const data = await response.json();
    console.log("data", data);
  };

  const handleSave = (formValues) => {
    apiPost(formValues);
  };

  return (
    <div className="formInput">
      <form className="formInput" onSubmit={handleSubmit(handleSave)}>
        <h1>Add Dish To Menu</h1>

        <div className="formInput">
          <label>Dish Name</label>
          <input {...register("name")} placeholder="Dish" />
        </div>
        <div className="formInput">
          <label>Description</label>
          <input {...register("description")} placeholder="Description" />
        </div>
        <div className="formInput">
          <label>Price</label>
          <input {...register("price")} placeholder="Price" />
        </div>

        <div className="formInput">
          <label>Category</label>
          <select {...register("category")}>
            {categories.map((category, i) => (
              <option key={i} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="formInput">
          <label>Available for</label>
          <select {...register("availability")}>
            {availabilities.map((time, i) => (
              <option key={i} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>

        <div className="formInput">
          <label>Waiting time in minutes</label>
          <input {...register("waitingTime")} type="number" min="0" max="100" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
