"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import {
  fetchGoogleUserInfo,
  googleLogin,
  googleLogout,
} from "@/utils/googleAccount";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("../components/DateTime"), {
  ssr: false,
});

export default function Table() {
  const [time, setTime] = useState<Time[]>([]);
  const [user, setUser] = useState<any | null>(null);

  const fetcherTime = async () => {
    const response: Response = await fetch("/api/time");
    const data: Time[] = await response.json();
    setTime(data);

    const userInfo = await fetchGoogleUserInfo();
    if (userInfo) {
      console.log("Google User Info:", userInfo);
    }

    console.log(localStorage.getItem("access_token"));
  };

  const insertDataToDatabase = async () => {
    try {
      // 가상의 데이터
      const newData: Time = {
        date: new Date().toLocaleTimeString(),
        start: new Date().toLocaleTimeString(),
        end: new Date().toLocaleTimeString(),
        time: new Date().toLocaleTimeString(),
        sum: new Date().toLocaleTimeString(),
      };

      const { data, error } = await supabase.from("time").upsert([newData]);
      if (error) {
        console.error("Error inserting data to Supabase:", error.message);
        throw error;
      }
    } catch (error) {
      alert("데이터 삽입에 실패하였습니다.");
      throw error;
    }
  };

  const handleDelete = async (index: number) => {
    try {
      const deletedItem = time[index];
      const { data, error } = await supabase
        .from("time")
        .delete()
        .eq("id", deletedItem.id);

      if (error) {
        console.error("Error deleting data from Supabase:", error.message);
        throw error;
      }

      setTime((prevTime) => prevTime.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetcherTime();
    setUser(localStorage.getItem("sb-meinnuxtjuwqmpofgqda-auth-token"));
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-10 text-gray-900 font-Roboto pt-4">
            근무일지
          </h1>

          <p className="mt-2 text-sm text-gray-700">복권 당첨!</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {user ? (
            <button
              type="button"
              className="block rounded-md bg-zinc-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={googleLogout}
            >
              로그아웃
            </button>
          ) : (
            <button
              type="button"
              className="block rounded-md bg-zinc-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={googleLogin}
            >
              로그인
            </button>
          )}
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    날짜
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    시작시간
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    종료시간
                  </th>
                  <th
                    scope="col"
                    className="py-3.5  text-center text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    근무시간
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 text-center text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    누적시간
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {time.map((time, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {time.date}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {time.start}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {time.end}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                      {time.time}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                      {time.sum}
                    </td>
                    <td className="whitespace-nowrap p-4 flex items-center justify-center">
                      <button onClick={() => handleDelete(index)}>
                        <img
                          src="/delete-cross.png"
                          alt=""
                          className="w-6 h-auto"
                        ></img>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end py-4">
              {user && (
                <button
                  type="button"
                  className="block rounded-md bg-zinc-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={async () => {
                    try {
                      await insertDataToDatabase();
                      fetcherTime();
                    } catch (error) {
                      console.error("Error inserting data to database:", error);
                    }
                  }}
                >
                  시간 추가
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
