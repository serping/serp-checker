"use client"

import { Markdown } from '@/components/shared/markdown';
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
import { Switch } from "@/components/ui/switch";
import { DeviceType } from "@/config";
import { countryOptions } from "@/country";
import { languageOptions } from "@/language";
import apiClient from "@/lib/api";
import { HomeFormSchema, type HomeFormValues, type Location } from "@/schema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from 'lodash';
import {
  Camera,
  MapPin,
  Monitor,
  Search,
  Smartphone
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from 'zod';

export function SerpForm({
  defaultValues,
  landing = true,
  loading,
  block1,
  onSubmit
}:{
  block1?: string;
  defaultValues: HomeFormValues;
  loading?: boolean;
  landing?: boolean;
  onSubmit?: ({values}:{values: HomeFormValues}) => void;
}) {
  const t = useTranslations();
  
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
  const HomeFormSchemaOverWrite = HomeFormSchema.extend({
    query: z.string().min(2, {
      message: t("frontend.home.form.query.error.message"),
    })
  })
  const [submited, setSubmited] = useState<boolean>(false);
  const [values, setValues] = useState<HomeFormValues>(defaultValues);
  const [locations, setLocations] = useState<Location[]>([]);
  const form = useForm<HomeFormValues>({
    resolver: zodResolver(HomeFormSchemaOverWrite),
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

  const onDesktopChange =(checked: boolean, field: any)=>{
    if(checked){
      field.onChange("desktop")
    }else{
      field.onChange("mobile")
    }
    console.log("onDesktopChange", checked)
  }

  const onSnapshotChange =(checked: boolean, field: any)=>{
    if(checked){
      field.onChange("on")
    }else{
      field.onChange("off")
    }
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

  const formClassName = landing ? "" : "sticky top-5";

  const LandingForm =()=>{
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={formClassName}>
          <div className="flex flex-col pb-10 max-w-[880px] m-auto gap-8 mt-10">
            <div className="text-center flex justify-center">
              {block1 && <Markdown content={block1} classNames={{ h1: "scroll-m-20 text-2xl tracking-tight lg:text-3xl" }} />
                }
            </div>
            <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem nospace={true} className="relative text-center">
                    <Search size={23} className="absolute left-3.5 top-3 text-muted-foreground" />
                    <FormControl>
                      <Input type="search" className="pl-12 h-13 text-xl" placeholder="Search ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full items-center">
              
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem> 
                    <FormControl>
                      <Combobox
                        useCode={true}
                        className="w-full h-12"
                        defaultValue={field.value as string}
                        onValueChange={(e) => {field.onChange(e);} }
                        frameworks={ countryOptions }
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
                        className="w-full h-12"
                        useCode={true}
                        defaultValue={field.value as string}
                        onValueChange={(e) => {field.onChange(e);} }
                        frameworks={ languageOptions }
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
                    <FormControl>
                      <div className=''>
                        <Combobox
                          canCancel={true}
                          defaultSelectIcon={<MapPin size={20} className="text-muted-foreground" />}
                          className="w-full h-12"
                          defaultSelectLabel="All Location"
                          onInputValueChange={locationOnInputValueChange}
                          onValueChange={(e) => {field.onChange(e);} }
                          frameworks={locationResults}
                        />
                      </div> 
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm text-muted-foreground mt-2 ml-2">Proxy by <a className="text-primary" href="https://get.brightdata.com/proxy-networks" target="_blank" rel="nofollow noreferrer">bright data</a ></div>

            </div>
            <div className='flex items-center justify-center gap-5'>
              <FormField
                control={form.control}
                name="snapshot"
                render={({ field }) => (
                  <FormItem nospace={true} className="flex items-center justify-center">
                      <Switch defaultValue={field.value} defaultChecked={field.value === "on"} onCheckedChange={(e)=> onSnapshotChange(e, field) } className="mr-3" />  <Camera size={18} className="mr-2" /> {t('frontend.snapshot')}
                  </FormItem>
                )}
              /> 
              <FormField
                control={form.control}
                name="device"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-center">
                      <Switch defaultValue={field.value} defaultChecked={field.value === "desktop"} disabled  onCheckedChange={(e)=> onDesktopChange(e, field) } className="mr-3" /> {t('frontend.desktop')}
                  </FormItem>
                )}
              /> 
            </div>
             
            <Button size="icon" loading={loading} type="submit" className="md:w-[200px] w-full mx-auto">{t('frontend.home.look_up')}<Search size={20} className="ml-3" /></Button>
          </div>
        </form>
        
      </Form>
    );
  }


  if(landing) return LandingForm(); 
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={formClassName}>
        <div className="flex flex-col pb-10">
          <div className="grid grid-cols-1  gap-4 w-full">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem nospace={true} className="relative">
                  <Search size={20} className="absolute left-3.5 top-3 text-muted-foreground" />
                  <FormControl>
                    <Input type="search" disabled={loading} className="pl-11" placeholder="Search ..." {...field} />
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
                      frameworks={countryOptions}
                      useCode={true}
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
                      frameworks={languageOptions}
                      useCode={true}
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
                      defaultValue={field.value as string}
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
            <FormField
                control={form.control}
                name="snapshot"
                render={({ field }) => (
                  <FormItem nospace={true} className="flex items-center justify-center">
                      <Switch disabled={loading} defaultValue={field.value} defaultChecked={field.value === "on"} onCheckedChange={(e)=> onSnapshotChange(e, field) } className="mr-3" /> <Camera size={18} className="mr-2" /> <span>{t('frontend.snapshot')}</span>
                  </FormItem>
                )}
              /> 
          </div>
          <Button loading={loading} type="submit" className="mt-4">{t('frontend.home.look_up')}</Button>
        </div>
      </form>
    </Form>
  );
}
