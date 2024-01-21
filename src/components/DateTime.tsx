// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com
"use client";
import { useEffect, useState } from "react";

interface DateTimeProps {
  onInputChange: (value: string) => void;
}

const DateTime: React.FC<DateTimeProps> = ({ onInputChange }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onInputChange(value);
  };

  return (
    <>
      <input
        type="datetime-local"
        className="block w-full px-3 py-2 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        placeholder="시작 시간"
        value={inputValue || new Date().toISOString().slice(0, 16)}
        onChange={handleInputChange}
      />
    </>
  );
};

export default DateTime;
