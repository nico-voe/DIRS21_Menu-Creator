import { useState } from "react";
import { useForm, useController } from "react-hook-form";
import { apiPost } from "../APIS";

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
  const { register, handleSubmit, reset } = useForm();

  const post = async (formValues) => {
    const data = await apiPost(formValues);
    reset();
  };

  return (
    <div className="formInput">
      <form className="formInput" onSubmit={handleSubmit(post)}>
        <h1>Add Dish To Menu</h1>

        <div className="formInput">
          <label>Dish Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="Dish"
            maxLength="18"
          />
        </div>
        <div className="formInput">
          <label>Description</label>
          <input
            {...register("description", { required: true })}
            placeholder="Description"
            maxLength="60"
          />
        </div>
        <div className="formInput">
          <label>Price</label>
          <input
            {...register("price", { required: true })}
            placeholder="Price"
            type="number"
            min="0"
            max="1000"
          />
        </div>

        <div className="formInput">
          <label>Category</label>
          <select {...register("category", { required: true })}>
            {categories.map((category, i) => (
              <option key={i} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="formInput">
          <label>Available for</label>
          <select {...register("availability", { required: true })}>
            {availabilities.map((time, i) => (
              <option key={i} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>

        <div className="formInput">
          <label>Waiting time in minutes</label>
          <input
            {...register("waitingTime", { required: true })}
            type="number"
            min="0"
            max="100"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
