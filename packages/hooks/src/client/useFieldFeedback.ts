// apps/portal/hooks/useFieldFeedback.ts
import { useState, useCallback } from "react";
import type {
  FieldPath,
  FieldValues,
  UseFormRegisterReturn,
  UseFormReturn,
} from "react-hook-form";

type MinimalForm<T extends FieldValues> = Pick<
  UseFormReturn<T>,
  "register" | "getValues" | "formState" | "clearErrors"
>;

type Kind = "error" | "info" | "success";
export type Feedback = { type: Kind; message: string };

export type FeedbackMessages<T extends FieldValues> = Partial<
  Record<FieldPath<T>, { info: string; success: string }>
>;

export function useFieldFeedback<T extends FieldValues>(
  form: MinimalForm<T>,
  messages: FeedbackMessages<T>,
) {
  const {
    register,
    getValues,
    clearErrors,
    formState: { errors, touchedFields, dirtyFields },
  } = form;

  const [focused, setFocused] = useState<FieldPath<T> | null>(null);

  const getFeedback = useCallback(
    (name: FieldPath<T>): Feedback | undefined => {
      const err = (errors as any)[name];
      if (err?.message) return { type: "error", message: String(err.message) };

      const isFocused = focused === name;
      const isTouchedOrDirty =
        !!(touchedFields as any)[name] || !!(dirtyFields as any)[name];

      const value = getValues(name);
      const hasValue = Array.isArray(value)
        ? value.length > 0
        : value && typeof value === "object"
          ? Object.keys(value).length > 0
          : String(value ?? "").length > 0;

      const isValidNow = isTouchedOrDirty && hasValue;

      if (isFocused && isValidNow) {
        return { type: "success", message: messages[name]?.success ?? "완료." };
      }
      if (isFocused && messages[name]?.info) {
        return { type: "info", message: messages[name]!.info };
      }
      return undefined;
    },
    [dirtyFields, errors, focused, getValues, messages, touchedFields],
  );

  const registerWithFeedback = useCallback(
    (name: FieldPath<T>) => {
      const reg: UseFormRegisterReturn = register(name);
      return {
        ...reg,
        onFocus: () => {
          setFocused(name);
        },
        onBlur: (e: any) => {
          reg.onBlur(e);
          setFocused((f) => (f === name ? null : f));
        },
        onChange: (e: any) => {
          reg.onChange(e);
          setFocused(name);
        },
        feedback: getFeedback(name),
        "aria-invalid": !!(errors as any)[name],
      };
    },
    [errors, getFeedback, register],
  );

  return { registerWithFeedback };
}
