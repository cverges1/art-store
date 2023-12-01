import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

function CategorySection() {
  // Fetch products using GraphQL query
  const { loading, error, data } = useQuery(QUERY_CATEGORIES);

  if (loading) {
    // Initial loading state
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Error fetching categories", error);
    return <p>Error: {error.message}</p>;
  }

  const categories = data.categories;

  return (
    <section className="category-section">
      <div>
        {/* Render each Category Card */}
        {categories.map((category) => (
          <div className="category" key={category._id}>
            <Link to={`/category/${category._id}`}>
              <div>
                <Typography>
                  {category.categoryName}
                  {category.image}
                  </Typography>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
