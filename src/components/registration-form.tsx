'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
} from './ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient, ClientSession } from '@/lib/auth-client';
import { db } from '@/db';
import { profile, User } from '@/db/schema';
import { submitRegistration } from '@/lib/actions';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { NewProfile, newProfileSchema } from '@/lib/validations';
import LoadingButton from './loading-button';
import { Session } from '@/lib/auth';
import { useEffect } from 'react';
import { DropdownNavProps, DropdownProps } from 'react-day-picker';
import DatePicker from './date-picker';
import { toast } from 'sonner';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { CommandEmpty } from 'cmdk';
import { redirect } from 'next/navigation';

interface Props {
  user: User;
  profile: NewProfile | undefined;
  sekolah: { id: number; nama: string }[];
  region: { id: number; nama: string }[];
}

export function RegistrationForm({ user, profile, sekolah, region }: Props) {
  const form = useForm<NewProfile>({
    resolver: zodResolver(newProfileSchema),
    defaultValues: {
      nama_lengkap: profile?.nama_lengkap ?? '',
      tempat_lahir: profile?.tempat_lahir ?? '',
      tanggal_lahir: profile?.tanggal_lahir ?? new Date(),
      jenis_kelamin: profile?.jenis_kelamin ?? '',
      agama: profile?.agama ?? '',
      no_hp: profile?.no_hp ?? '',
      instagram: profile?.instagram ?? '',
      alamat: profile?.alamat ?? '',
      asal_sekolah: profile?.asal_sekolah ?? '',
      kota_kabupaten: profile?.kota_kabupaten ?? '',
      kelas: profile?.kelas ?? '',
      jenjang_pendidikan: profile?.jenjang_pendidikan ?? '',
    },
  });

  const onSubmit = async (values: NewProfile) => {
    console.log('values:', values);
    const result = await submitRegistration(values, user?.id ?? '');

    if (result.success) {
      form.reset();
      toast.success('Pendaftaran berhasil');
      redirect('/dashboard');
    } else {
      toast.error('Pendaftaran gagal');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-background mx-auto max-w-4xl space-y-6 rounded-xl p-6 shadow'
      >
        <h2 className='text-center text-2xl font-bold'>Form Pendaftaran</h2>

        <div className='grid gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='nama_lengkap'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='nama' className='mb-2 block'>
                  Nama Lengkap
                </FormLabel>
                <FormControl>
                  <Input id='nama' placeholder='Nama Lengkap' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='tempat_lahir'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='tempat-lahir' className='mb-2 block'>
                  Tempat Lahir
                </FormLabel>

                <FormControl>
                  <Input
                    id='tempat-lahir'
                    placeholder='Tempat lahir'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='tanggal_lahir'
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
                    <DatePicker date={field.value} onChange={field.onChange} />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='jenis_kelamin'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='jenis-kelamin' className='mb-2 block'>
                  Jenis Kelamin
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='laki-laki'>Laki-laki</SelectItem>
                    <SelectItem value='perempuan'>Perempuan</SelectItem>
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
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='islam'>Islam</SelectItem>
                    <SelectItem value='kristen'>Kristen</SelectItem>
                    <SelectItem value='katolik'>Katolik</SelectItem>
                    <SelectItem value='hindu'>Hindu</SelectItem>
                    <SelectItem value='buddha'>Buddha</SelectItem>
                    <SelectItem value='lainnya'>Lainnya</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='mt-2'>
            <Label htmlFor='email' className='mb-2 block'>
              Email
            </Label>
            <Input id='email' type='email' value={user.email} disabled />
          </div>

          {/* <FormField
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
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name='no_hp'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='no-hp' className='mb-2 block'>
                  No HP
                </FormLabel>

                <FormControl>
                  <Input id='no-hp' placeholder='08xxxxxx' {...field} />
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
                  <Input id='instagram' placeholder='@username' {...field} />
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
                      placeholder='Alamat lengkap'
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
            name='asal_sekolah'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='asal-sekolah' className='mb-2 block'>
                  Asal Sekolah
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? sekolah.find(({ nama }) => nama === field.value)
                              ?.nama
                          : 'Asal Sekolah'}
                        <ChevronsUpDown className='opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command>
                      <CommandInput
                        placeholder='Cari sekolah...'
                        className='h-9'
                      />
                      <CommandList>
                        <CommandEmpty>Sekolah tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                          {sekolah.map((item) => (
                            <CommandItem
                              value={item.nama}
                              key={item.id}
                              onSelect={() => {
                                form.setValue('asal_sekolah', item.nama, {
                                  shouldDirty: true,
                                });
                              }}
                            >
                              {item.nama}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  item.nama === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='kota_kabupaten'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='kota' className='mb-2 block'>
                  Kota atau Kabupaten Sekolah
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
            name='jenjang_pendidikan'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='jenjang' className='mb-2 block'>
                  Jenjang Pendidikan
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='sma'>SMA</SelectItem>
                    <SelectItem value='smk'>SMK</SelectItem>
                    <SelectItem value='ma'>MA</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='pt-4'>
          <LoadingButton
            pending={form.formState.isSubmitting}
            disabled={!form.formState.isDirty}
          >
            Submit
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
