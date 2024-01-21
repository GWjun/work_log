"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface AppContextProps {
  time: Time[]; // 이 부분은 실제 데이터 타입으로 바꿔주세요
  setTime: Dispatch<SetStateAction<Time[]>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [time, setTime] = useState<Time[]>([]);

  return (
    <AppContext.Provider value={{ time, setTime }}>
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
