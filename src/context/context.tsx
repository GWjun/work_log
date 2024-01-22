"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface AppContextProps {
  time: Time[];
  setTime: Dispatch<SetStateAction<Time[]>>;
  user: string[];
  setUser: Dispatch<SetStateAction<string[]>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [time, setTime] = useState<Time[]>([]);
  const [user, setUser] = useState<string[]>([]);

  return (
    <AppContext.Provider value={{ time, setTime, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
