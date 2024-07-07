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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeviceType } from "@/config";
import { countries } from "@/country";
import { language } from "@/language";
import apiClient from "@/lib/api";
import { HomeFormSchema, type HomeFormValues, type Location } from "@/shema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from 'lodash';
import {
  MapPin,
  Monitor,
  Search,
  Smartphone
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export function SerpForm({
  defaultValues,
  loading,
  onSubmit
}:{
  defaultValues: HomeFormValues;
  loading?: boolean;
  onSubmit?: ({values}:{values: HomeFormValues}) => void;
}) {
  
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
  const [locations, setLocations] = useState<Location[]>([]);
  const form = useForm<HomeFormValues>({
    resolver: zodResolver(HomeFormSchema),
    defaultValues
  })

  useEffect(()=>{
    if(submited){
      if(onSubmit) onSubmit({values});
      setSubmited(false)
    }
  },[submited])

  const handleSubmit =(values: HomeFormValues)=>{
    setValues(values);
    setSubmited(true);
  }

  const fetchLocations = (value: string) => {
    apiClient.get('/location', { params: { q: value, num: 20 } })
      .then((res) => {
        if (res.data) {
          setLocations(res.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const debouncedFetchLocations = useCallback(
    debounce((value: string) => {
      fetchLocations(value);
    }, 500),
    []
  );

  const locationOnInputValueChange =(value: string)=>{
    debouncedFetchLocations(value);
  }

  const locationResults = useMemo(()=>{
    return locations.map(item => {
      return { 
        short_label: item["Name"],
        label: item["Canonical Name"],
        value: item["Canonical Name"],
        icon: <MapPin size={20} className="text-muted-foreground" /> 
      }
    } )
  },[locations])

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col md:flex-row mb-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem nospace={true} className="relative">
                  <Search size={20} className="absolute left-3.5 top-3 text-muted-foreground" />
                  <FormControl>
                    <Input type="search" className="pl-11" placeholder="Search ..." {...field} />
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
              name="locale"
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-muted-foreground">{devices.find(item => item.value === field.value)?.icon}</span>
                        <SelectTrigger className="pl-12" > 
                          <SelectValue/> 
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      {devices.map(item => <SelectItem key={item.value} value={item.value} disabled={item.disabled}>{item.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
              </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem nospace={true} className="relative">
                  <FormControl>
                    <Combobox
                      canCancel={true}
                      defaultSelectIcon={<MapPin size={20} className="text-muted-foreground" />}
                      className="w-full"
                      defaultSelectLabel="All Location"
                      onInputValueChange={locationOnInputValueChange}
                      onValueChange={(e) => {field.onChange(e);} }
                      frameworks={locationResults}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button loading={loading} type="submit" className="mt-4 md:mt-0 md:ml-4">Look Up</Button>
        </div>
      </form>
      
    </Form>
  );
}
