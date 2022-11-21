import { useState, useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dishForEdit, setDishForEdit] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}dishes/${id}`);
        const data = await res.json();
        setDishForEdit(data.data);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchData();
  }, []);

  const { register, handleSubmit } = useForm();

  const apiPost = async (formValues) => {
    console.log("EDITformValues", formValues);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    };
    const response = await fetch(`${url}dishes`, requestOptions);
    const data = await response.json();
    if (!data.status === "OK") return alert("Something went wrong");
    navigate("/menu");
  };

  const handleSave = (formValues) => {
    apiPost({ ...formValues, ...dishForEdit, _id: id });
  };

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
            onChange={(e) =>
              setDishForEdit({
                ...dishForEdit,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="formInput">
          <label>Description</label>
          <input
            {...register("description")}
            placeholder="Description"
            value={dishForEdit.description}
            onChange={(e) =>
              setDishForEdit({ ...dishForEdit, description: e.target.value })
            }
          />
        </div>
        <div className="formInput">
          <label>Price</label>
          <input
            {...register("price")}
            type="number"
            placeholder="Price"
            value={dishForEdit.price}
            onChange={(e) =>
              setDishForEdit({ ...dishForEdit, price: e.target.value })
            }
          />
        </div>

        <div className="formInput">
          <label>Category</label>
          <select
            {...register("category")}
            value={dishForEdit.category}
            onChange={(e) =>
              setDishForEdit({ ...dishForEdit, category: e.target.value })
            }
          >
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
            onChange={(e) =>
              setDishForEdit({ ...dishForEdit, availability: e.target.value })
            }
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
            onChange={(e) =>
              setDishForEdit({ ...dishForEdit, waitingTime: e.target.value })
            }
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
