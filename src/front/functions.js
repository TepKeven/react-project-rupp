import { toast } from "react-toastify";

const toastNotificationSuccess = (message = "") => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const toastNotificationError = (message = "") => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

export { toastNotificationSuccess, toastNotificationError };
