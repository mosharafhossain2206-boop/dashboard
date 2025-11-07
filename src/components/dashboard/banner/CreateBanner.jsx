import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { api } from "../../../utils/axios";

// 🧠 1. Zod validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  targetUrl: z
    .string()
    .url({ message: "Please enter a valid URL (e.g. https://...)" }),
  targetType: z.enum(["category", "product", "custom"], {
    errorMap: () => ({
      message: "Target type must be 'category', 'product', or 'custom'.",
    }),
  }),
  priority: z
    .number({ invalid_type_error: "Priority must be a number." })
    .min(1, { message: "Priority must be at least 1." }),
  isActive: z.boolean(),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid start date.",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid end date.",
  }),
  image: z.any().refine((file) => file instanceof FileList && file.length > 0, {
    message: "Please upload an image.",
  }),
});

export function CreateBanner({ defaultValues }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      targetUrl: "",
      targetType: "category",
      priority: 1,
      isActive: true,
      startDate: "",
      endDate: "",
      image: null,
    },
  });

  // 🧩 3. Handle submit
  async function onSubmit(values) {
    const formData = new FormData();
    for (const key in values) {
      if (key === "image") {
        formData.append("image", values.image[0]);
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      const response = await api.post(
        "/banner/create-banner",
        { ...values, image: values.image[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Summer Offer" {...field} />
              </FormControl>
              <FormDescription>Enter banner title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Big weekend sale is live now! Hurry up and grab the best deals."
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter banner description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Target URL */}
        <FormField
          control={form.control}
          name="targetUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Target URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://yourwebsite.com/product"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the target link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Target Type */}
        <FormField
          control={form.control}
          name="targetType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Target Type</FormLabel>
              <FormControl>
                <Input placeholder="category / product / custom" {...field} />
              </FormControl>
              <FormDescription>Type of banner target</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priority */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Higher number = higher priority</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Date */}
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full md:col-span-2">
              <FormLabel>Banner Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormDescription>Upload your banner image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" className="w-full md:w-auto">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
