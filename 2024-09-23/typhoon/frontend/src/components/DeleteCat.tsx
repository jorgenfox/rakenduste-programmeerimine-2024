import React from "react";
import { Button } from "@mui/material";

type DeleteCatProps = {
  catId: string;
  fetchCats: () => void;
};

const DeleteCat = ({ catId, fetchCats }: DeleteCatProps) => {
  const deleteCat = async () => {
    try {
      const response = await fetch(`http://localhost:8080/cats/${catId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Cat deleted successfully!");
        fetchCats();
      } else {
        console.warn("Failed to delete cat");
      }
    } catch (error) {
      console.warn("Error deleting cat:", error);
    }
  };

  return <Button onClick={deleteCat}>Delete</Button>;
};

export default DeleteCat;
