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
import { DeviceType } from "@/config";
import { countries } from "@/country";
import { language } from "@/language";
import { HomeFormSchema, type HomeFormValues } from "@/shema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  Monitor,
  Search,
  Smartphone
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
 
export function SerpForm({
  onSubmit
}:{
  onSubmit?: (values: HomeFormValues) => void;
}) {
  const defaultValues =  {
    query: "",
    lang: "en",
    country: "us",
    location: "",
    device: "desktop" as DeviceType,
  }
  const devices: {
    value: DeviceType;
    label: string;
    disabled?: boolean;
    icon: React.ReactNode;
  }[] = [
    {
      value: "desktop",
      label: "Desktop",
      icon: <Monitor size={20} className="text-muted-foreground" />
    },
    {
      value: "mobile",
      label: "Mobile (Coming Soon..)",
      disabled: true,
      icon: <Smartphone size={20} className="text-muted-foreground" />
    }
  ]
  const [submited, setSubmited] = useState<boolean>(false);
  const [values, setValues] = useState<HomeFormValues>(defaultValues);
  const form = useForm<HomeFormValues>({
    resolver: zodResolver(HomeFormSchema),
    defaultValues
  })

  useEffect(()=>{
    if(submited){
      if(onSubmit) onSubmit(values);
      setSubmited(false)
    }
  },[submited])

  function handleSubmit(values: HomeFormValues) {
    setValues(values);
    setSubmited(true);
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
              name="device"
              render={({ field }) => (
                <FormItem> 
                  <FormControl>
                    <Combobox
                      className="w-full"
                      defaultValue={field.value as string}
                      onValueChange={(e) => {field.onChange(e);} }
                      frameworks={devices}
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
          <Button type="submit" className="ml-4">Look Up</Button>
        </div>
      </form>
      
    </Form>
  );
}
