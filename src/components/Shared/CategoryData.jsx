import React, { useEffect, useState } from "react";
import useDataLoader from "../../hooks/useDataLoader";
const CategoryData = () => {
  const [categories, setCategories] = useState([]);
  const [time, setTime] = useState(5000);

  const data = useDataLoader();
  useEffect(() => {
    data.get("/category").then((res) => setCategories(res.data));
  }, [time]);
  setTimeout(() => {
    if (categories.length === 0) {
      setTime(0);
    }
    // console.log(categories);
  }, time);
  //   console.log(categories);
  return categories;
};

export default CategoryData;
