// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com
"use client";
import { useEffect } from "react";

const DateTime = () => {
  useEffect(() => {
    const init = async () => {
      const { Datetimepicker, initTE } = await import("tw-elements");
      initTE({ Datetimepicker });
    };
    init();
  }, []);

  return (
    <div
      className="relative mb-3"
      data-te-date-timepicker-init
      data-te-input-wrapper-init
    >
      <input
        type="text"
        readOnly
        className="peer block min-h-[auto] w-0 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="form6"
      />
    </div>
  );
};

export default DateTime;
