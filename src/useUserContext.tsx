import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

// Define the shape of the context data
interface UserContextData {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the shape of user data
interface UserData {
  name: string;
  userId: string;
  // Add other user properties as needed
}

const defaultUserContext: UserContextData = {
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};

const UserContext = createContext<UserContextData>(defaultUserContext);

// Create a custom hook for using the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

interface UserContextProviderProps {
  children: ReactNode; // Define children prop using ReactNode type
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loggedIn, setLoggedIn] = useState(false); // Add loggedIn state
  const [isAuthenticated, setIsAuthenticated] = useState(loggedIn);

  const token = sessionStorage.getItem("token");

  const fetchUserData = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      // Replace with the actual endpoint to fetch user data
      const response = await axios.post("http://localhost:5000/getUser", {
        userId,
      });

      const newUser = {
        name: response.data.name as string,
        userId: userId as string,
      };

      // Assume the response contains user data in the 'data' key
      setUser(newUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle errors, e.g., by setting user to null and isAuthenticated to false
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      fetchUserData();
      setIsAuthenticated(true);
      //setUser(user);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  // Update isAuthenticated when loggedIn changes
  useEffect(() => {
    console.log(user);
    setIsAuthenticated(loggedIn);
  }, [loggedIn]);

  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
