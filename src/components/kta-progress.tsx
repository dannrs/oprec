// components/KTAProgress.tsx
"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type KTAData = {
  id: number
  nama: string
  asalSekolah: string
  wilayah: string
  status: "Proses Cetak" | "Proses Packing" | "Pengiriman" | "Diterima"
  resi: string
}

const dummyData: KTAData[] = [
  {
    id: 1,
    nama: "Ahmad Fauzi",
    asalSekolah: "SMA Negeri 1 Jakarta",
    wilayah: "DKI Jakarta",
    status: "Pengiriman",
    resi: "JNE1234567890"
  },
]

export default function KTAProgressTable() {
  const handleMarkAsReceived = (id: number) => {
    alert(`KTA ID ${id} ditandai sebagai Diterima.`)
    // Tambahkan request ke backend di sini jika perlu
  }

  return (
    <Card className="w-full overflow-auto">
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Asal Sekolah</TableHead>
              <TableHead>Wilayah</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>No. Resi</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.asalSekolah}</TableCell>
                <TableCell>{item.wilayah}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.resi}</TableCell>
                <TableCell>
                  {item.status === "Pengiriman" ? (
                    <Button variant="outline" onClick={() => handleMarkAsReceived(item.id)}>
                      Sudah Diterima
                    </Button>
                  ) : item.status === "Diterima" ? (
                    <span className="text-green-600 font-medium">Selesai</span>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
