"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"

type KTAStatus =
  | "Proses Cetak"
  | "Proses Packing"
  | "Pengiriman"
  | "Diterima"

type Siswa = {
  id: string
  nama: string
  asalSekolah: string
  asalWilayah: string
  asalDaerah: string
  statusPembayaran: "Lunas" | "Tidak Lunas"
  statusKTA: KTAStatus
}

export function StatusKTA() {
  const [data, setData] = React.useState<Siswa[]>([
    {
      id: "1",
      nama: "Aldi Pratama",
      asalSekolah: "SMA 1 Bandung",
      asalWilayah: "Wilayah 1",
      asalDaerah: "Kota Bandung",
      statusPembayaran: "Lunas",
      statusKTA: "Proses Cetak",
    },
    {
      id: "2",
      nama: "Dina Lestari",
      asalSekolah: "SMA 3 Bekasi",
      asalWilayah: "Wilayah 2",
      asalDaerah: "Kota Bekasi",
      statusPembayaran: "Tidak Lunas",
      statusKTA: "Pengiriman",
    },
    {
      id: "3",
      nama: "Rian Nugroho",
      asalSekolah: "SMA 5 Cirebon",
      asalWilayah: "Wilayah 3",
      asalDaerah: "Kabupaten Cirebon",
      statusPembayaran: "Lunas",
      statusKTA: "Diterima",
    },
  ])

  const updateKTAStatus = (id: string, status: KTAStatus) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, statusKTA: status } : row))
    )
  }

  const columns: ColumnDef<Siswa>[] = [
    {
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1,
      },
    { accessorKey: "nama", header: "Nama" },
    { accessorKey: "asalSekolah", header: "Asal Sekolah" },
    { accessorKey: "asalWilayah", header: "Asal Wilayah" },
    { accessorKey: "asalDaerah", header: "Asal Daerah" },
    {
      accessorKey: "statusPembayaran",
      header: "Status Pembayaran",
      cell: ({ row }) => {
        const status = row.original.statusPembayaran
        return (
          <Badge
            className={
              status === "Lunas"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "statusKTA",
      header: "Status KTA",
      cell: ({ row }) => {
        const status = row.original.statusKTA
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {status}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["Proses Cetak", "Proses Packing", "Pengiriman", "Diterima"].map(
                (s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => updateKTAStatus(row.original.id, s as KTAStatus)}
                  >
                    {s}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => alert(`View ${row.original.nama}`)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Edit ${row.original.nama}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setData(data.filter((item) => item.id !== row.original.id))
              }
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
