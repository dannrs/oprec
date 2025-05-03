import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function RegistrationForm() {
  return (
    <form className="bg-background max-w-4xl mx-auto rounded-xl shadow p-6 space-y-6">
  <h2 className="text-2xl font-bold text-center">Form Pendaftaran</h2>

  <div className="grid md:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="nama" className="mb-2 block">Nama Lengkap</Label>
      <Input id="nama" placeholder="Nama Lengkap" required />
    </div>

    <div>
      <Label htmlFor="tempat-lahir" className="mb-2 block">Tempat Lahir</Label>
      <Input id="tempat-lahir" placeholder="Tempat lahir" required />
    </div>

    <div>
      <Label htmlFor="tanggal-lahir" className="mb-2 block">Tanggal Lahir</Label>
      <Input id="tanggal-lahir" type="date" required />
    </div>

    <div>
      <Label htmlFor="jenis-kelamin" className="mb-2 block">Jenis Kelamin</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pilih" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="laki-laki">Laki-laki</SelectItem>
          <SelectItem value="perempuan">Perempuan</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label htmlFor="agama" className="mb-2 block">Agama</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pilih" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="islam">Islam</SelectItem>
          <SelectItem value="kristen">Kristen</SelectItem>
          <SelectItem value="katolik">Katolik</SelectItem>
          <SelectItem value="hindu">Hindu</SelectItem>
          <SelectItem value="budha">Budha</SelectItem>
          <SelectItem value="lainnya">Lainnya</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label htmlFor="email" className="mb-2 block">Email</Label>
      <Input id="email" type="email" placeholder="Email" required />
    </div>

    <div>
      <Label htmlFor="no-hp" className="mb-2 block">No HP</Label>
      <Input id="no-hp" placeholder="08xxxxxx" required />
    </div>

    <div>
      <Label htmlFor="instagram" className="mb-2 block">Instagram</Label>
      <Input id="instagram" placeholder="@username" />
    </div>

    <div className="md:col-span-2">
      <Label htmlFor="alamat" className="mb-2 block">Alamat</Label>
      <Textarea id="alamat" placeholder="Alamat lengkap" rows={3} required />
    </div>

    <div>
      <Label htmlFor="asal-sekolah" className="mb-2 block">Asal Sekolah</Label>
      <Input id="asal-sekolah" placeholder="Nama sekolah" required />
    </div>

    <div>
      <Label htmlFor="kota" className="mb-2 block">Kota atau Kabupaten Sekolah</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pilih Kab/Kota" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bandung">Bandung</SelectItem>
          <SelectItem value="bogor">Bogor</SelectItem>
          <SelectItem value="bekasi">Bekasi</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label htmlFor="kelas" className="mb-2 block">Kelas</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pilih" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="11">11</SelectItem>
          <SelectItem value="12">12</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label htmlFor="jenjang" className="mb-2 block">Jenjang Pendidikan</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pilih" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sma">SMA</SelectItem>
          <SelectItem value="smk">SMK</SelectItem>
          <SelectItem value="ma">MA</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>

  <div className="pt-4">
    <Button type="submit" className="w-full">
      Submit
    </Button>
  </div>
</form>

  )
}
