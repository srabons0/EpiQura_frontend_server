import React, { useEffect, useState } from "react";
import useDataLoader from "../../hooks/useDataLoader";
const CategoryData = () => {
    const [categories, setCategories] = useState([]);
  const data = useDataLoader();
  useEffect(() => {
    data.get("/category").then((res) => setCategories(res.data));
  }, [data]);
//   console.log(categories);
    return categories;
};

export default CategoryData;