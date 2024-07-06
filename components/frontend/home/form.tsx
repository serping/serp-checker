"use client"

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
import { countries } from "@/country";
import { language } from "@/language";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  Search
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

 
const formSchema = z.object({
  query: z.string().min(2, {
    message: "query must be at least 2 characters.",
  }),
  lang: z.string(),
  country: z.string(),
  location: z.string().min(2, {
    message: "location must be at least 2 characters.",
  }),
})


export function SerpForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
      lang: "en",
      country: "us",
      location: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex px-4">
          <div className="grid grid-cols-5 gap-4 w-full">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem nospace={true} className="relative">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input type="search" className="pl-10" placeholder="openai" {...field} />
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
                      frameworks={language.map(item => { return { value: item.code, label: `${item.name}  (${item.code.toUpperCase()})` } })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem> 
                  <FormControl>
                    <Combobox
                      className="w-full"
                      defaultValue={field.value as string}
                      onValueChange={(e) => {field.onChange(e);} }
                      frameworks={countries.map(item => { return { value: item.code, label: `${item.flag} ${item.name} (${item.code.toUpperCase()})` } })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem nospace={true} className="relative">
                  <MapPin size={20} className="absolute left-3.5 top-3 text-muted-foreground" />
                  <FormControl>
                    <Input type="search" className="pl-10" placeholder="sera" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Look Up</Button>
        </div>
      </form>
      
    </Form>
  );
}
