"use client"

import { language } from "@/language";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

 
const formSchema = z.object({
  query: z.string().min(2, {
    message: "query must be at least 2 characters.",
  }),
  lang: z.string(),
  country: z.string()
})


export function SerpForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  
  return (  
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem> 
              <FormControl>
                <Input placeholder="openai" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lang"
          render={({ field }) => (
            <FormItem> 
              <FormControl>
                <Combobox
                  className="w-full"
                  defaultValue={field.value as string}
                  onValueChange={(e) => {field.onChange(e);} }
                  frameworks={language.map(item => { return { value: item.code, label: `${item.name} (${item.code})` } })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
