import React, { useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";

type UpdateCatProps = {
  cat: { id: string; name: string };
  fetchCats: () => void;
  onUpdateSuccess: () => void;
};

const UpdateCat = ({ cat, fetchCats, onUpdateSuccess }: UpdateCatProps) => {
  const [name, setName] = useState(cat.name);

  const updateCat = async () => {
    try {
      const response = await fetch(`http://localhost:8080/cats/${cat.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });

      if (response.ok) {
        console.log("Cat updated successfully!");
        fetchCats();
        onUpdateSuccess();
      } else {
        console.warn("Failed to update cat");
      }
    } catch (error) {
      console.warn("Error updating cat:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateCat();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Update Cat Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button type="submit">Update</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UpdateCat;
