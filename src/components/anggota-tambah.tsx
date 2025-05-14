"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AnggotaTambah() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tambah Data Anggota</h2>
      <form className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="nama">Nama Lengkap</Label>
          <Input id="nama" placeholder="Nama lengkap" />
        </div>
        <div>
          <Label htmlFor="tempatLahir">Tempat Lahir</Label>
          <Input id="tempatLahir" placeholder="Tempat lahir" />
        </div>
        <div>
          <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
          <Input id="tanggalLahir" type="date" />
        </div>
        <div>
          <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Laki-laki">Laki-laki</SelectItem>
              <SelectItem value="Perempuan">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="agama">Agama</Label>
          <Input id="agama" placeholder="Agama" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Email aktif" />
        </div>
        <div>
          <Label htmlFor="noHp">No HP</Label>
          <Input id="noHp" placeholder="08xxxx" />
        </div>
        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input id="instagram" placeholder="@username" />
        </div>
        <div>
          <Label htmlFor="asalSekolah">Asal Sekolah</Label>
          <Input id="asalSekolah" placeholder="SMA/SMK/MA..." />
        </div>
        <div>
          <Label htmlFor="asalKota">Asal Kota/Kabupaten</Label>
          <Input id="asalKota" placeholder="Contoh: Bandung" />
        </div>
        <div>
          <Label htmlFor="asalWilayah">Asal Wilayah</Label>
          <Input id="asalWilayah" placeholder="Wilayah OSIS Jabar" />
        </div>
        <div>
          <Label htmlFor="kelas">Kelas</Label>
          <Input id="kelas" placeholder="Contoh: 12" />
        </div>
        <div>
          <Label htmlFor="jenjang">Jenjang Pendidikan</Label>
          <Input id="jenjang" placeholder="Contoh: SMA" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="alamat">Alamat</Label>
          <Textarea id="alamat" placeholder="Alamat lengkap" />
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </div>
  )
}
