import { createPhoneSchema } from "./phone.shema";
import { createLaptopInput, createLaptopSchema } from "./laptop.shema";
import { z } from "zod";
import { createPhoneInput } from "./phone.shema";

export const createProductSchema = {
  name: z.string({ required_error: "Product name is required" }),
  price: z.number({ required_error: "Price is required" }),
  brand: z.string({ required_error: "Brand name is required" }),
  description: z.string().optional(),
  color: z.string(),
  releaseDate: z.number({ required_error: "Release date is required" }),
  imagePaths: z.array(z.string()).optional()
};

export type CreateProductInput = createPhoneInput | createLaptopInput;

export const productTypeSchemas = {
  smartphones: createPhoneSchema,
  laptops: createLaptopSchema
};

export const addProductImagesSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Product id is required to update images" })
  })
});

export type AddProductImagesInput = z.infer<
  typeof addProductImagesSchema
>["params"];

export const findProductSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Product id is required"
    })
  })
});

export type FindProductInput = z.infer<typeof findProductSchema>["params"];

export const findManyProductsSchema = z.object({
  query: z.object({
    type: z.string().optional()
  })
});

export type FindManyProductInput = z.infer<
  typeof findManyProductsSchema
>["query"];
