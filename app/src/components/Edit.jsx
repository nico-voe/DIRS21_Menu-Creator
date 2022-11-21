import { useState, useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import "./Form.css";
import { useParams } from "react-router-dom";
const url = "http://localhost:9000/";

const Edit = () => {
  //fetch specific dish data from api to display in Form

  const { id } = useParams();

  const [dishForEdit, setDishForEdit] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}dishes/${id}`);
        const data = await res.json();
        setDishForEdit(data.data);
        console.log("dishEdit", data);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchData();
  }, []);

  //Post data to API
  const { register, control, handleSubmit } = useForm();

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
        <h1>Edit Dish</h1>

        <div className="formInput">
          <label>Dish Name</label>
          <input
            {...register("name")}
            placeholder="Dish"
            value={dishForEdit.name}
          />
        </div>
        <div className="formInput">
          <label>Description</label>
          <input
            {...register("description")}
            placeholder="Description"
            value={dishForEdit.description}
          />
        </div>
        <div className="formInput">
          <label>Price</label>
          <input
            {...register("price")}
            placeholder="Price"
            value={dishForEdit.price}
          />
        </div>

        <div className="formInput">
          <label>Category</label>
          <select {...register("category")} value={dishForEdit.category}>
            {categories.map((category, i) => (
              <option key={i} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="formInput">
          <label>Available for</label>
          <select
            {...register("availability")}
            value={dishForEdit.availability}
          >
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
            {...register("waitingTime")}
            type="number"
            min="0"
            max="100"
            value={dishForEdit.waitingTime}
          />
        </div>

        <button className="edit" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default Edit;
