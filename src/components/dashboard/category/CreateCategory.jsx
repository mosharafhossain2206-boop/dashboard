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

import axios from "axios";

// 🧠 1. Validation schema
const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters." }),
  image: z.any().refine((file) => file instanceof FileList && file.length > 0, {
    message: "Please upload a category image.",
  }),
});

export function CreateCategory() {
  // 🧾 2. Setup form
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  // 🧩 3. Handle submit
  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image[0]);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/category/create-category",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("✅ Category created:", res.data);
      alert("Category created successfully!");
      form.reset();
    } catch (err) {
      console.error("❌ Error creating category:", err);
      alert("Failed to create category.");
    }
  }

  // 🧱 4. UI
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4"
      >
        {/* Category Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Electronics" {...field} />
              </FormControl>
              <FormDescription>Enter a unique category name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormDescription>
                Upload an image representing this category
              </FormDescription>
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
