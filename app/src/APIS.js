const url = "http://localhost:9000/";

export const fetchDishes = async () => {
  try {
    const res = await fetch(`${url}dishes`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const deleteDish = async (e, id) => {
  e.preventDefault();
  const deleteDish = await fetch(`${url}dishes/${id}`, {
    method: "DELETE",
  });
  const data = await deleteDish.json();
};

export const apiPost = async (formValues) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formValues),
  };
  const response = await fetch(`${url}dishes`, requestOptions);
  const data = await response.json();
  if (!data.status === "OK") return alert("Something went wrong");
};

export const fetchDishForEdit = async (id) => {
  try {
    const res = await fetch(`${url}dishes/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
