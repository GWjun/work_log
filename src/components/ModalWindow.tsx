// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com
"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/context";

import dynamic from "next/dynamic";
import { supabase } from "@/utils/supabaseClient";

const DateTime = dynamic(() => import("./DateTime"), {
  ssr: false,
});

interface ModalWindowProps {
  fetcherTime: () => Promise<void>;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ fetcherTime }) => {
  const { time, setTime } = useAppContext();
  const { user, setUser } = useAppContext();
  const [newTime, setNewTime] = useState<string[]>([]);

  const insertDataToDatabase = async () => {
    try {
      const date1: Date = new Date(newTime[0]);
      const date2: Date = new Date(newTime[1]);

      const timeDifferenceInMillis: number = Math.abs(
        date2.getTime() - date1.getTime()
      );

      const totalMinutes: number = timeDifferenceInMillis / (1000 * 60);
      const hours: number = Math.floor(totalMinutes / 60);
      const minutes: number = Math.floor(totalMinutes % 60);
      let sum: number = totalMinutes;
      if (time.length !== 0) sum = totalMinutes + time[time.length - 1].sum;

      const newData: Time = {
        username: user[0],
        date: newTime[0].slice(0, 10),
        start: newTime[0].slice(11, 16),
        end: newTime[1].slice(11, 16),
        time: `${hours}시간 ${minutes}분`,
        sum: sum,
      };

      const { data, error } = await supabase.from(`time`).upsert([newData]);
      if (error) {
        console.error("Error inserting data to Supabase:", error.message);
        throw error;
      }
    } catch (error) {
      alert("데이터 삽입에 실패하였습니다.");
      throw error;
    }
  };

  const handleInputChange = (value: string, index: number) => {
    setNewTime((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  useEffect(() => {
    const init = async () => {
      const { Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Modal, Ripple });
    };
    init();
  }, []);

  return (
    <>
      <button
        type="button"
        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-toggle="modal"
        data-te-target="#exampleModal"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        시간 추가
      </button>

      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalLabel"
              >
                시간을 입력해 주세요!
              </h5>

              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="relative flex-auto p-4" data-te-modal-body-ref>
              <DateTime
                onInputChange={(value) => {
                  handleInputChange(value, 0);
                }}
              />
              <DateTime
                onInputChange={(value) => {
                  handleInputChange(value, 1);
                }}
              />
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                닫기
              </button>
              <button
                type="button"
                className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                data-te-modal-dismiss
                onClick={async () => {
                  try {
                    await insertDataToDatabase();
                    fetcherTime();
                  } catch (error) {
                    console.error("Error inserting data to database:", error);
                  }
                }}
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalWindow;
