/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useToast } from "@/context";

function cleanObject(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );
}

let addToastFn: (message: string) => void;

const toast = (message: string) => {
  if (addToastFn) {
    addToastFn(message);
  } else {
    console.error("Toast function called before initialization");
  }
};

const useInitializeToast = () => {
  const { addToast } = useToast();
  addToastFn = addToast;
};

function objectToFormData(obj: any, formData = new FormData(), parentKey = "") {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    const fieldKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value instanceof File || value instanceof Blob) {
      formData.append(fieldKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        objectToFormData(item, formData, `${fieldKey}[${index}]`);
      });
    } else if (value !== null && typeof value === "object") {
      objectToFormData(value, formData, fieldKey);
    } else {
      formData.append(fieldKey, value);
    }
  }

  return formData;
}

function formatCurrency(
  value: number | string,
  withSymbol: boolean = true
): string {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) return "Invalid Number";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    currencyDisplay: withSymbol ? "symbol" : "code",
  }).format(number);
}

const encodeName = (name: string) => {
  return btoa(name);
};

const decodeUUID = (uuid: string) => {
  try {
    return atob(uuid);
  } catch {
    return "Invalid UUID";
  }
};

export {
  cleanObject,
  toast,
  useInitializeToast,
  objectToFormData,
  formatCurrency,
  encodeName,
  decodeUUID,
};
