"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Anggota = {
  id: string
  namaLengkap: string
  tempatLahir: string
  tanggalLahir: string
  jenisKelamin: string
  agama: string
  email: string
  noHp: string
  instagram: string
  asalSekolah: string
  asalKota: string
  asalWilayah: string
  kelas: string
  jenjangPendidikan: string
  alamat: string
}

const data: Anggota[] = [
  {
    id: "1",
    namaLengkap: "Ahmad Rizky Pratama",
    tempatLahir: "Bandung",
    tanggalLahir: "2006-05-12",
    jenisKelamin: "Laki-laki",
    agama: "Islam",
    email: "rizky.ahmad@gmail.com",
    noHp: "081234567890",
    instagram: "@rizkyahmad",
    asalSekolah: "SMA Negeri 1 Bandung",
    asalKota: "Bandung",
    asalWilayah: "Wilayah 1",
    kelas: "XI IPA 1",
    jenjangPendidikan: "SMA",
    alamat: "Jl. Merdeka No. 10, Bandung"
  },
  {
    id: "2",
    namaLengkap: "Siti Nurhaliza",
    tempatLahir: "Depok",
    tanggalLahir: "2007-01-20",
    jenisKelamin: "Perempuan",
    agama: "Islam",
    email: "siti.nurhaliza@yahoo.com",
    noHp: "081298765432",
    instagram: "@sitinurhaliza",
    asalSekolah: "SMA Negeri 2 Depok",
    asalKota: "Depok",
    asalWilayah: "Wilayah 2",
    kelas: "X IPS 3",
    jenjangPendidikan: "SMA",
    alamat: "Jl. Margonda Raya No. 88, Depok"
  },
  {
    id: "3",
    namaLengkap: "Kevin Jonathan",
    tempatLahir: "Bekasi",
    tanggalLahir: "2005-09-15",
    jenisKelamin: "Laki-laki",
    agama: "Kristen",
    email: "kevin.jonathan@mail.com",
    noHp: "082345678901",
    instagram: "@kevinjon",
    asalSekolah: "SMA Kristen Bekasi",
    asalKota: "Bekasi",
    asalWilayah: "Wilayah 3",
    kelas: "XII IPA 2",
    jenjangPendidikan: "SMA",
    alamat: "Jl. Kalimalang No. 25, Bekasi"
  },
  {
    id: "4",
    namaLengkap: "Angelina Putri",
    tempatLahir: "Bogor",
    tanggalLahir: "2006-12-02",
    jenisKelamin: "Perempuan",
    agama: "Katolik",
    email: "angelina.putri@outlook.com",
    noHp: "083412345678",
    instagram: "@angelputri",
    asalSekolah: "SMA Katolik Bogor",
    asalKota: "Bogor",
    asalWilayah: "Wilayah 1",
    kelas: "XI IPS 1",
    jenjangPendidikan: "SMA",
    alamat: "Jl. Pajajaran No. 12, Bogor"
  },
  {
    id: "5",
    namaLengkap: "Fajar Sidik",
    tempatLahir: "Cirebon",
    tanggalLahir: "2007-03-30",
    jenisKelamin: "Laki-laki",
    agama: "Islam",
    email: "fajar.sidik@gmail.com",
    noHp: "081367895421",
    instagram: "@fajarsdk",
    asalSekolah: "SMA Negeri 1 Cirebon",
    asalKota: "Cirebon",
    asalWilayah: "Wilayah 3",
    kelas: "X IPA 4",
    jenjangPendidikan: "SMA",
    alamat: "Jl. Kartini No. 5, Cirebon"
  },
  {
    id: "6",
    namaLengkap: "Dewi Anggraini",
    tempatLahir: "Sukabumi",
    tanggalLahir: "2006-07-14",
    jenisKelamin: "Perempuan",
    agama: "Islam",
    email: "dewi.anggraini@gmail.com",
    noHp: "081223456789",
    instagram: "@dewianggraini",
    asalSekolah: "SMA Negeri 1 Sukabumi",
    asalKota: "Sukabumi",
    asalWilayah: "Wilayah 4",
    kelas: "XI IPA 3",
    jenjangPendidikan: "SMA",
    alamat: "Jl. Bhayangkara No. 9, Sukabumi"
  },
  {
    id: "7",
    namaLengkap: "Michael Saputra",
    tempatLahir: "Tasikmalaya",
    tanggalLahir: "2005-08-08",
    jenisKelamin: "Laki-laki",
    agama: "Budha",
    email: "michael.saputra@mail.com",
    noHp: "082112345678",
    instagram: "@michaelsap",
    asalSekolah: "SMA Budhi Luhur",
    asalKota: "Tasikmalaya",
    asalWilayah: "Wilayah 2",
    kelas: "XII IPS 2",
    jenjangPendidikan: "SMA",
    alamat: "Jl. HZ Mustofa No. 10, Tasikmalaya"
  },
  {
    id: "8",
    namaLengkap: "Rahmawati Aulia",
    tempatLahir: "Garut",
    tanggalLahir: "2007-04-18",
    jenisKelamin: "Perempuan",
    agama: "Islam",
    email: "rahma.aulia@gmail.com",
    noHp: "081334567891",
    instagram: "@rahma.aulia",
    asalSekolah: "SMA Negeri 2 Garut",
    asalKota: "Garut",
    asalWilayah: "Wilayah 4",
    kelas: "X IPS 2",
    jenjangPendidikan: "SMA",
    alamat: "Jl. Ahmad Yani No. 45, Garut"
  },
  {
    id: "9",
    namaLengkap: "Dimas Ardiansyah",
    tempatLahir: "Purwakarta",
    tanggalLahir: "2006-11-09",
    jenisKelamin: "Laki-laki",
    agama: "Islam",
    email: "dimas.ardiansyah@gmail.com",
    noHp: "083845678912",
    instagram: "@dimasard",
    asalSekolah: "SMA Negeri 1 Purwakarta",
    asalKota: "Purwakarta",
    asalWilayah: "Wilayah 3",
    kelas: "XI IPA 2",
    jenjangPendidikan: "SMA",
    alamat: "Jl. Veteran No. 7, Purwakarta"
  },
  {
    id: "10",
    namaLengkap: "Nabila Syifa",
    tempatLahir: "Cimahi",
    tanggalLahir: "2007-02-25",
    jenisKelamin: "Perempuan",
    agama: "Islam",
    email: "nabila.syifa@gmail.com",
    noHp: "081998765432",
    instagram: "@nabilasyf",
    asalSekolah: "SMA Negeri 1 Cimahi",
    asalKota: "Cimahi",
    asalWilayah: "Wilayah 1",
    kelas: "X IPS 1",
    jenjangPendidikan: "SMA",
    alamat: "Jl. Gandawijaya No. 20, Cimahi"
  },
]

export const columns: ColumnDef<Anggota>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "namaLengkap",
    header: "Nama Lengkap",
  },
  {
    accessorKey: "tempatLahir",
    header: "Tempat Lahir",
  },
  {
    accessorKey: "tanggalLahir",
    header: "Tanggal Lahir",
  },
  {
    accessorKey: "jenisKelamin",
    header: "Jenis Kelamin",
  },
  {
    accessorKey: "agama",
    header: "Agama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "noHp",
    header: "No HP",
  },
  {
    accessorKey: "instagram",
    header: "Instagram",
  },
  {
    accessorKey: "asalSekolah",
    header: "Asal Sekolah",
  },
  {
    accessorKey: "asalKota",
    header: "Kota/Kabupaten",
  },
  {
    accessorKey: "asalWilayah",
    header: "Wilayah",
  },
  {
    accessorKey: "kelas",
    header: "Kelas",
  },
  {
    accessorKey: "jenjangPendidikan",
    header: "Jenjang Pendidikan",
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">View</Button>
        <Button size="sm" variant="secondary">Edit</Button>
        <Button size="sm" variant="destructive">Delete</Button>
      </div>
    ),
  },
]

export function DataAnggota() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Cari nama lengkap..."
          value={(table.getColumn("namaLengkap")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("namaLengkap")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
