import { useState } from "react";
import { useForm, useController } from "react-hook-form";
import "./Form.css";
import Select from "react-select";

const Form = () => {
  const { register, control, handleSubmit } = useForm();

  const { field } = useController(
    { name: "category", control },
    { name: "availability", control }
  );

  const apiPost = (formValues) => {
    console.log("formValues", formValues);
  };

  const handleSave = (formValues) => {
    apiPost(formValues);
  };

  const handleSelect = (option) => {
    field.onChange(option.value);
  };

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
          <Select
            className="select"
            options={categories}
            value={categories.find(({ value }) => value === field.value)}
            onChange={handleSelect}
          />
        </div>

        <div className="formInput">
          <label>Available for</label>
          <Select
            className="select"
            options={availabilities}
            value={availabilities.find(({ value }) => value === field.value)}
            onChange={handleSelect}
          />
        </div>

        <div className="formInput">
          <label>Waiting time in minutes</label>
          <input {...register("number")} type="number" min="0" max="100" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
