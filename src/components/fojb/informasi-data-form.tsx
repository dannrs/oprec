"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function InformasiDataForm() {
  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Informasi Data Diri</CardTitle>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Edit Biodata
        </Button>
      </CardHeader>
      <CardContent className="space-y-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Nama Lengkap</Label>
            <Input defaultValue="Bara Saputra" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Tempat Lahir</Label>
            <Input defaultValue="Bandung" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Tanggal Lahir</Label>
            <Input type="date" defaultValue="2025-05-13" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Jenis Kelamin</Label>
            <Input defaultValue="Laki-laki" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Agama</Label>
            <Input defaultValue="Islam" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue="bara@email.com" readOnly />
          </div>
          <div className="space-y-2">
            <Label>No HP</Label>
            <Input defaultValue="081234567890" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input defaultValue="@barasutra" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Asal Sekolah</Label>
            <Input defaultValue="SMA Negeri 1 Bandung" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Kota atau Kabupaten</Label>
            <Input defaultValue="Bandung" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Asal Wilayah</Label>
            <Input defaultValue="Wilayah 1" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Kelas</Label>
            <Input defaultValue="11" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Jenjang Pendidikan</Label>
            <Input defaultValue="SMA" readOnly />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Alamat</Label>
          <Textarea defaultValue="Jl. Merdeka No. 123, Bandung" readOnly />
        </div>
      </CardContent>
    </Card>
  )
}
