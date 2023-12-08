import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [token]);

  // Update isAuthenticated when loggedIn changes
  useEffect(() => {
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
