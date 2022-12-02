import { useState, useEffect, useMemo } from "react";
import { AnyZodObject, ZodEffects } from "zod";

export const validateResource = (
  schema: ZodEffects<AnyZodObject> | AnyZodObject,
  input: any,
  setErrors: (errors: any) => void
) => {
  try {
    schema.parse(input);
    setErrors({});
  } catch (e: any) {
    const { errors } = e;
    const result = errors.reduce((acc: any, err: any) => {
      return { ...acc, [err.path[0]]: err.message };
    }, {});
    setErrors(result);
  }
};
export const useValidate = <T>(
  data: T,
  schema: ZodEffects<AnyZodObject> | AnyZodObject
) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const setErrorsWrapper = (errors: any) => setErrors(errors);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  useEffect(() => {
    validateResource(schema, data, setErrorsWrapper);
  }, [data]);

  return { isValid, errors };
};
