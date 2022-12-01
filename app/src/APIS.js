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
