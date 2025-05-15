'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient, ClientSession } from '@/lib/auth-client';
import { db } from '@/db';
import { profile, User } from '@/db/schema';
import { submitRegistration } from '@/lib/actions/submit-registration';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  CalendarIcon,
  Check,
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDown,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { NewProfile, newProfileSchema } from '@/lib/validations';
import LoadingButton from '@/components/loading-button';
import { Session } from '@/lib/auth';
import { useEffect, useRef, useState } from 'react';
import { DropdownNavProps, DropdownProps } from 'react-day-picker';
import DatePicker from '@/components/date-picker';
import { toast } from 'sonner';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { CommandEmpty } from 'cmdk';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  user: User | null;
  profile: NewProfile | null;
  sekolah: { id: number; nama: string }[];
  region: { id: number; nama: string }[];
}

export function InformasiDataForm({ user, profile, sekolah, region }: Props) {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<NewProfile>({
    resolver: zodResolver(newProfileSchema),
    defaultValues: {
      namaLengkap: user?.name ?? '',
      email: user?.email ?? '',
      nomorWhatsapp: user?.nomorWhatsapp ?? '',
      tempatLahir: profile?.tempatLahir ?? '',
      tanggalLahir: profile?.tanggalLahir ?? new Date(),
      jenisKelamin: profile?.jenisKelamin ?? '',
      agama: profile?.agama ?? '',
      instagram: profile?.instagram ?? '',
      asalSekolah: profile?.asalSekolah ?? '',
      asalKota: profile?.asalKota ?? '',
      kelas: profile?.kelas ?? '',
      jenjangPendidikan: profile?.jenjangPendidikan ?? '',
      alamat: profile?.alamat ?? '',
    },
  });

  const onSubmit = async (values: NewProfile) => {
    console.log('values:', values);
    const result = await submitRegistration(values, user);

    if (result.success) {
      toast.success('Pendaftaran berhasil');
    } else {
      toast.error('Pendaftaran gagal');
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    form.reset();
    setIsEdit(false);
  };

  return (
    <Card className='mx-auto max-w-5xl'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Informasi Data Diri</CardTitle>
        {!isEdit && (
          <Button
            onClick={handleEdit}
            className='bg-green-600 text-white hover:bg-green-700'
          >
            Edit Biodata
          </Button>
        )}
      </CardHeader>
      <CardContent className='space-y-6 pb-10'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-5 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='namaLengkap'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='nama' className='mb-2 block'>
                      Nama Lengkap
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='nama'
                        placeholder='Nama Lengkap'
                        disabled={!isEdit}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='tempatLahir'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='tempat-lahir' className='mb-2 block'>
                      Tempat Lahir
                    </FormLabel>

                    <FormControl>
                      <Input
                        id='tempat-lahir'
                        placeholder='Tempat lahir'
                        disabled={!isEdit}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='tanggalLahir'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='tanggal-lahir' className='mb-2 block'>
                      Tanggal Lahir
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                            disabled={!isEdit}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <DatePicker
                          date={field.value}
                          onChange={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='jenisKelamin'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='jenis-kelamin' className='mb-2 block'>
                      Jenis Kelamin
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Laki-laki'>Laki-laki</SelectItem>
                        <SelectItem value='Perempuan'>Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='agama'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='agama' className='mb-2 block'>
                      Agama
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Islam'>Islam</SelectItem>
                        <SelectItem value='Kristen'>Kristen</SelectItem>
                        <SelectItem value='Katolik'>Katolik</SelectItem>
                        <SelectItem value='Hindu'>Hindu</SelectItem>
                        <SelectItem value='Buddha'>Buddha</SelectItem>
                        <SelectItem value='Lainnya'>Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className='mt-2'> */}
              {/*   <Label htmlFor='email' className='mb-2 block'> */}
              {/*     Email */}
              {/*   </Label> */}
              {/*   <Input id='email' type='email' value={user.email} disabled /> */}
              {/* </div> */}

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='email' className='mb-2 block'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        type='email'
                        placeholder='Email'
                        disabled={!isEdit}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='nomorWhatsapp'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='no-hp' className='mb-2 block'>
                      Nomor Whatsapp
                    </FormLabel>

                    <FormControl>
                      <Input
                        id='no-hp'
                        placeholder='628xxx'
                        disabled={!isEdit}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='instagram'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='instagram' className='mb-2 block'>
                      Instagram
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='instagram'
                        placeholder='@username'
                        disabled={!isEdit}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='md:col-span-2'>
                <FormField
                  control={form.control}
                  name='alamat'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='alamat' className='mb-2 block'>
                        Alamat
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id='alamat'
                          placeholder='Jl. Merdeka No. 123, Bandung'
                          disabled={!isEdit}
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='asalSekolah'
                render={({ field }) => {
                  const filteredOptions = sekolah.filter((item) =>
                    item.nama.toLowerCase().includes(field.value.toLowerCase())
                  );
                  return (
                    <FormItem>
                      <FormLabel htmlFor='asal-sekolah' className='mb-2 block'>
                        Asal Sekolah
                      </FormLabel>

                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger disabled={!isEdit}>
                          <FormControl>
                            <div className='relative flex items-center justify-start'>
                              <Input
                                id='asal-sekolah'
                                ref={inputRef}
                                placeholder='Cari sekolah...'
                                disabled={!isEdit}
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e.target.value);
                                  setOpen(true);
                                  requestAnimationFrame(() => {
                                    inputRef.current?.focus();
                                  });
                                }}
                                onFocus={() => {
                                  setOpen(true);
                                  requestAnimationFrame(() => {
                                    inputRef.current?.focus();
                                  });
                                }}
                              />
                              <ChevronsUpDown className='absolute right-3 ml-3 size-4 opacity-50' />
                            </div>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className='my-1 w-[var(--radix-popover-trigger-width)] p-1'
                          align='start'
                        >
                          <div className='max-h-[180px] overflow-y-auto'>
                            {filteredOptions.length > 0 ? (
                              filteredOptions.map((option) => (
                                <div
                                  key={option.id}
                                  className='hover:bg-accent cursor-pointer p-2 text-sm text-wrap'
                                  onClick={() => {
                                    setOpen(false);
                                    form.setValue('asalSekolah', option.nama, {
                                      shouldDirty: true,
                                    });
                                  }}
                                >
                                  <div className='flex items-center justify-start'>
                                    <Check
                                      className={cn(
                                        'pr-2',
                                        field.value === option.nama ||
                                          profile?.asalSekolah === option.nama
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    {option.nama}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div
                                className='hover:bg-accent cursor-pointer px-4 py-2 text-sm'
                                onClick={() => {
                                  setOpen(false);
                                  form.setValue('asalSekolah', 'Lainnya', {
                                    shouldDirty: true,
                                  });
                                }}
                              >
                                Lainnya
                              </div>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name='asalKota'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='kota' className='mb-2 block'>
                      Kota atau Kabupaten Sekolah
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih Kab/Kota' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {region.map((item) => (
                          <SelectItem value={item.nama} key={item.id}>
                            {item.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='kelas'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='kelas' className='mb-2 block'>
                      Kelas
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='10'>10</SelectItem>
                        <SelectItem value='11'>11</SelectItem>
                        <SelectItem value='12'>12</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='jenjangPendidikan'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='jenjang' className='mb-2 block'>
                      Jenjang Pendidikan
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='SMA'>SMA</SelectItem>
                        <SelectItem value='SMK'>SMK</SelectItem>
                        <SelectItem value='MA'>MA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='pt-8'>
              {isEdit ? (
                <div className='flex flex-col space-y-2'>
                  <LoadingButton
                    pending={form.formState.isSubmitting}
                    disabled={!form.formState.isDirty}
                  >
                    Submit
                  </LoadingButton>
                  <Button variant='outline' onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              ) : null}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
