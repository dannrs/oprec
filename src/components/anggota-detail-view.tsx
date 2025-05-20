'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface BiodataFormProps {
  defaultValues?: {
    id: string;
    namaLengkap: string;
    tempatLahir: string;
    tanggalLahir: string;
    jenisKelamin: string;
    agama: string;
    email: string;
    noHp: string;
    instagram: string;
    asalSekolah: string;
    asalKota: string;
    asalWilayah: string;
    kelas: string;
    jenjangPendidikan: string;
    alamat: string;
  };
}

export function AnggotaDetailView({ defaultValues }: BiodataFormProps) {
  const [formData, setFormData] = useState(
    defaultValues ?? {
      id: '',
      namaLengkap: '',
      tempatLahir: '',
      tanggalLahir: '',
      jenisKelamin: '',
      agama: '',
      email: '',
      noHp: '',
      instagram: '',
      asalSekolah: '',
      asalKota: '',
      asalWilayah: '',
      kelas: '',
      jenjangPendidikan: '',
      alamat: '',
    }
  );

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='grid grid-cols-1 gap-6 rounded-xl bg-white p-6 shadow-md md:grid-cols-2 dark:bg-black'
    >
      <div className='flex flex-col gap-2'>
        <Label htmlFor='namaLengkap'>Nama Lengkap</Label>
        <Input
          id='namaLengkap'
          value={formData.namaLengkap}
          onChange={(e) => handleChange('namaLengkap', e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='tempatLahir'>Tempat Lahir</Label>
        <Input
          id='tempatLahir'
          value={formData.tempatLahir}
          onChange={(e) => handleChange('tempatLahir', e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='tanggalLahir'>Tanggal Lahir</Label>
        <Input
          id='tanggalLahir'
          type='date'
          value={formData.tanggalLahir}
          onChange={(e) => handleChange('tanggalLahir', e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='jenisKelamin'>Jenis Kelamin</Label>
        <Select
          value={formData.jenisKelamin}
          onValueChange={(val) => handleChange('jenisKelamin', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Pilih' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Laki-laki'>Laki-laki</SelectItem>
            <SelectItem value='Perempuan'>Perempuan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='agama'>Agama</Label>
        <Select
          value={formData.agama}
          onValueChange={(val) => handleChange('agama', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Pilih' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Islam'>Islam</SelectItem>
            <SelectItem value='Kristen'>Kristen</SelectItem>
            <SelectItem value='Hindu'>Hindu</SelectItem>
            <SelectItem value='Budha'>Budha</SelectItem>
            <SelectItem value='Lainnya'>Lainnya</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='noHp'>No HP</Label>
        <Input
          id='noHp'
          value={formData.noHp}
          onChange={(e) => handleChange('noHp', e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='instagram'>Instagram</Label>
        <Input
          id='instagram'
          value={formData.instagram}
          onChange={(e) => handleChange('instagram', e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2 md:col-span-2'>
        <Label htmlFor='alamat'>Alamat</Label>
        <Textarea
          id='alamat'
          value={formData.alamat}
          onChange={(e) => handleChange('alamat', e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='asalSekolah'>Asal Sekolah</Label>
        <Input
          id='asalSekolah'
          value={formData.asalSekolah}
          onChange={(e) => handleChange('asalSekolah', e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='asalKota'>Kota atau Kabupaten Sekolah</Label>
        <Select
          value={formData.asalKota}
          onValueChange={(val) => handleChange('asalKota', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Pilih Kab/Kota' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Bandung'>Bandung</SelectItem>
            <SelectItem value='Garut'>Garut</SelectItem>
            <SelectItem value='Tasikmalaya'>Tasikmalaya</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='kelas'>Kelas</Label>
        <Select
          value={formData.kelas}
          onValueChange={(val) => handleChange('kelas', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Pilih' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='X'>X</SelectItem>
            <SelectItem value='XI'>XI</SelectItem>
            <SelectItem value='XII'>XII</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='jenjangPendidikan'>Jenjang Pendidikan</Label>
        <Select
          value={formData.jenjangPendidikan}
          onValueChange={(val) => handleChange('jenjangPendidikan', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Pilih' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='SMA'>SMA</SelectItem>
            <SelectItem value='SMK'>SMK</SelectItem>
            <SelectItem value='MA'>MA</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* <div className="md:col-span-2 pt-4">
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div> */}
    </form>
  );
}
