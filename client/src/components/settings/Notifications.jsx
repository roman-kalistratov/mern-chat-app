import React from "react";
import useNotifications from "../../zustand/useNotifications";
import notificationSound from "../../assets/sound/call.mp3";
import notificationSound1 from "../../assets/sound/bell.mp3";
import notificationSound2 from "../../assets/sound/positive.mp3";
import notificationSound3 from "../../assets/sound/sci_fi_reject.mp3";
import notificationSound4 from "../../assets/sound/door_bell.mp3";
import { IoIosClose } from "react-icons/io";

const Notifications = () => {
  const { notifications, update } = useNotifications();
  const tones = [
    new URL(notificationSound, import.meta.url).href,
    new URL(notificationSound1, import.meta.url).href,
    new URL(notificationSound2, import.meta.url).href,
    new URL(notificationSound3, import.meta.url).href,
    new URL(notificationSound4, import.meta.url).href,
  ];

  const handleTonesChange = () => {
    update({ ...notifications, tones: !notifications.tones });
  };

  const handleTonesNameChange = (tone) => {
    update({ ...notifications, tonePath: tone });
    const sound = new Audio(tone);
    sound.play();
  };

  return (
    <div className="px-5 flex flex-col items-start justify-start gap-3">
      <div className="form-control w-full">
        <label className="label cursor-pointer py-2 px-0 ">
          <span className="label-text text-light dark:text-dark">
            Conversation tones
          </span>
          <input
            type="checkbox"
            checked={notifications.tones}
            onChange={handleTonesChange}
            className="checkbox checkbox-sm border-green dark:border-dark [--chkbg:#f2f2f2] dark:[--chkbg:#202C33] [--chkfg:green]"
          />
        </label>
        <p className="text-xs text-light2 dark:text-dark2">
          Play sounds for incoming and outgoing messages.
        </p>
      </div>

      <button
        className="w-full flex items-center justify-between label-text text-light dark:text-dark"
        onClick={() => document.getElementById("notification").showModal()}
      >
        Notification tone
        <span className="text-sm text-light dark:text-green">
          {notifications.tonePath.split("/").pop().split(".")[0]}
        </span>
      </button>

      <dialog id="notification" className="modal max-w-[350px] m-auto">
        <div className="modal-box bg-white dark:bg-dark2 rounded-md p-0">
          <div className="w-full flex items-center justify-between p-3 bg-green dark:bg-dark3">
            <h2 className="text-dark font-semibold">Notification tone</h2>
            <IoIosClose
              className="block cursor-pointer text-2xl text-dark bg-iconDark hover:bg-iconHoverDark rounded-md"
              onClick={() => document.getElementById("notification").close()}
            />
          </div>
          <div className="py-3 flex flex-col gap-3">
            {tones.map((tone, index) => (
              <div
                key={tone}
                className="flex items-start justify-between px-3"
                onClick={() => handleTonesNameChange(tone)}
              >
                <label htmlFor={`tone-${index}`} className="dark:text-dark">
                  {tone.split("/").pop().split(".")[0]}
                </label>
                <input
                  type="radio"
                  id={tone}
                  name="options"
                  value={tone}
                  checked={notifications.tonePath === tone}
                  onChange={() => handleTonesNameChange(tone)}
                  className="radio border-green dark:border-dark [--chkbg:#f2f2f2] dark:[--chkbg:#202C33] [--chkfg:green] checked:bg-green radio-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Notifications;
