"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export type KtaStatus = {
  id: string
  nama: string
  asalSekolah: string
  asalWilayah: string
  statusKta: "Proses Cetak" | "Proses Packing" | "Pengiriman" | "Diterima"
  resi: string
}

const data: KtaStatus[] = [
  {
    id: "1",
    nama: "Rizki Hidayat",
    asalSekolah: "SMA Negeri 1 Bandung",
    asalWilayah: "Wilayah I",
    statusKta: "Pengiriman",
    resi: "JNE123456789",
  },
  {
    id: "2",
    nama: "Siti Aminah",
    asalSekolah: "SMK Negeri 2 Cirebon",
    asalWilayah: "Wilayah III",
    statusKta: "Diterima",
    resi: "POSINDO987654",
  },
]

export function KtaTrackingTable() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Tracking Proses KTA</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Asal Sekolah</TableHead>
            <TableHead>Asal Wilayah</TableHead>
            <TableHead>Status KTA</TableHead>
            <TableHead>Resi</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.nama}</TableCell>
              <TableCell>{item.asalSekolah}</TableCell>
              <TableCell>{item.asalWilayah}</TableCell>
              <TableCell>{item.statusKta}</TableCell>
              <TableCell>{item.resi}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
