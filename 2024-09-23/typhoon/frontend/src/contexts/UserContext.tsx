import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";

type User = {
  id: number;
  name: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const theme = useTheme();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await fetch("http://localhost:8080/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {user ? (
          <Card
            sx={{
              width: "100%",
              maxWidth: 400,
              marginBottom: theme.spacing(2),
            }}
          >
            <CardContent>
              <Typography variant="h5">Welcome, {user.name}!</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ marginTop: theme.spacing(2) }}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="h6">Please log in</Typography>
        )}
        {children}
      </Box>
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
