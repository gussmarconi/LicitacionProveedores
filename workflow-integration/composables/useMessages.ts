import { watchOnce } from "@vueuse/core";

export const useMessages = () => {
  const alertState = useState<{ type: string; message: string; show: boolean; }>("bnb-alert", () => ({ type: "INFO", message: "", show: false}));
  const loadingState = useState<{ message: string; show: boolean; }>("bnb-loading", () => ({ message: "", show: false }));
  const confirmState = useState<{ message: string; show: boolean; }>("bnb-confirm", () => ({ message: "", show: false }));
  const confirmCallbackState = useState<boolean | undefined>("bnb-confirm-callback");

  const showInfo = (message: string) => {
    alertState.value.type = "INFO";
    alertState.value.message = message;
    alertState.value.show = true;
  };
  const hideInfo = () => alertState.value.show = false;

  const showError = (message: string) => {
    alertState.value.type = "ERROR";
    alertState.value.message = message;
    alertState.value.show = true;
  };
  const hideError = () => alertState.value.show = false;

  const showLoading = (message: string) => {
    loadingState.value.message = message;
    loadingState.value.show = true;
  };
  const hideLoading = () => loadingState.value.show = false;

  const showConfirm = (message: string, callback: (response: boolean | undefined) => void) => {
    confirmState.value.message = message;
    confirmState.value.show = true;

    confirmCallbackState.value = undefined;
    
    watchOnce(confirmCallbackState, callback);
  };
  const hideConfirm = () => confirmState.value.show = false;

  return {
    showInfo,
    showError,
    hideInfo,
    hideError,
    showLoading,
    hideLoading,
    showConfirm,
    hideConfirm,
  }
};
