import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Informasi Akun */}
      <div className="border rounded-md bg-white p-4 space-y-2">
        <h2 className="font-semibold">Informasi Akun</h2>
        <p>Nama : Bara Subara</p>
        <p>Email : bara@gmail.com</p>
        <p>Asal Sekolah : Forum OSIS Jawa Barat</p>
      </div>

      {/* Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <div className="border p-4 rounded-md bg-white">
          <h3 className="font-semibold mb-2">Pengumuman Wawancara</h3>
          <Badge variant="secondary">Klik di sini</Badge>
        </div> */}
        <div className="border p-4 rounded-md bg-white">
          <h3 className="font-semibold mb-2">Status Pendaftaran</h3>
          <Badge className="bg-green-100 text-green-800">sudah lengkap</Badge>
        </div>
        <div className="border p-4 rounded-md bg-white">
          <h3 className="font-semibold mb-2">Status Upload Twibbon</h3>
          <Badge className="bg-green-100 text-green-800">sudah submit</Badge>
        </div>
      </div>

      {/* Program Studi */}
      {/* <div className="border rounded-md bg-white p-4 space-y-2">
        <h2 className="font-semibold">Program Studi</h2>
        <p>Pilihan 1: S1 Sistem Informasi - Kampus Jakarta</p>
        <p>Pilihan 2: S1 Desain Produk & Inovasi - Kampus Bandung</p>
      </div> */}

      {/* Alerts */}
      <Alert className="border-green-500 bg-green-50 text-green-800">
        <AlertDescription>
          ✅ Terimakasih! Berkas kamu telah tersubmit, nantikan informasi selanjutnya.
        </AlertDescription>
      </Alert>

      <Alert>
        <AlertDescription>
          ✨ Selamat, anda telah melakukan pendaftaran anggota Forum OSIS Jawa Barat Generasi 13 <b>FOJB Gen 13</b><br />
          Silakan untuk bergabung ke channel Whatsapp Resmi FOJB:{" "}
          <a href="https://whatsapp.com/channel/0029Vab3p1T4tRs14pKOa425" className="underline text-blue-600">
          https://whatsapp.com/channel/0029Vab3p1T4tRs14pKOa425
          </a>
        </AlertDescription>
      </Alert>
    </div>
  )
}
