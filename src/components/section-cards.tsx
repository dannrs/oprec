import {
  IconUser,
  IconUsers,
  IconSchool,
} from "@tabler/icons-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Admin */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Admin</CardDescription>
          <div className="flex items-center gap-3">
            <IconUser className="text-blue-500 size-6" />
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              10
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Pengurus */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pengurus</CardDescription>
          <div className="flex items-center gap-3">
            <IconUsers className="text-green-500 size-6" />
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              255
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Anggota */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Anggota</CardDescription>
          <div className="flex items-center gap-3">
            <IconUsers className="text-yellow-500 size-6" />
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              5,678
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Sekolah */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Sekolah</CardDescription>
          <div className="flex items-center gap-3">
            <IconSchool className="text-purple-500 size-6" />
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              6.453
            </CardTitle>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
