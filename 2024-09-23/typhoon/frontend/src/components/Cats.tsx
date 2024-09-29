import {
  Box,
  List,
  ListItem,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitCat from "./SubmitCat";
import UpdateCat from "./UpdateCat";
import DeleteCat from "./DeleteCat";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  const fetchCats = async () => {
    const response = await fetch("http://localhost:8080/cats");
    const data = await response.json();
    setCats(data);
  };

  const handleSelectCat = (cat: Cat) => {
    setSelectedCat(cat);
  };

  const handleUpdateSuccess = () => {
    setSelectedCat(null);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <Box>
      <Typography variant="h3">Cats</Typography>
      <List>
        {cats.map((cat) => (
          <ListItem key={cat.id}>
            <Card sx={{ width: "300px", marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5">{cat.name}</Typography>
                <Typography color="text.secondary">ID: {cat.id}</Typography>
                <Typography color="text.secondary">
                  Created At: {new Date(cat.createdAt).toLocaleString()}
                </Typography>
                <Typography color="text.secondary">
                  Updated At:{" "}
                  {cat.updatedAt
                    ? new Date(cat.updatedAt).toLocaleString()
                    : "Not updated"}
                </Typography>
                <Typography color="text.secondary">
                  Deleted: {cat.deleted ? "Yes" : "No"}
                </Typography>
                <Button onClick={() => handleSelectCat(cat)}>Update</Button>
                <DeleteCat catId={cat.id} fetchCats={fetchCats} />
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <SubmitCat fetchCats={fetchCats} />
      {selectedCat && (
        <UpdateCat
          cat={selectedCat}
          fetchCats={fetchCats}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </Box>
  );
};

export default Cats;
