"use client"

import { Button } from "@/components/ui/button"

export function PengumpulanTwibbon() {
  return (
    <div className="flex justify-center mt-8">
      <div className="space-y-6 max-w-2xl w-full">
        {/* Judul Halaman */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Absensi Mentoring dan Bimbingan</h1>
          <p className="text-muted-foreground">Forum OSIS Jawa Barat Generasi 13</p>
        </div>

        {/* Kartu Pengumuman */}
        <div className="border rounded-md p-6 bg-white space-y-4 shadow">
          <p className="text-base leading-relaxed">
            <span className="">Halo</span>,<b>Bara</b> silakan untuk{" "}
            <span className="text-green-600 font-semibold">UPLOAD BUKTI KEHADIRAN</span> dalam mengikuti kegiatan Mentoring dan Bimbingan Program Kadersiasi FOJB Generasi 13.
          </p>

          <hr />

          <p className="text-base">Upload bukti kehadiran kamu dibawah ini.</p>

          <hr />

          {/* <div className="text-sm text-muted-foreground space-y-2">
            <p>📌 <b>Silakan</b> melengkapi dokumen yang diminta pada menu <b>Data Kehadiran</b>.</p>
            <p>📢 Informasi lanjut tentang bahan presentasi dan jadwal akan dikirim via WhatsApp.</p>
            <p>⏳ Mohon menunggu konfirmasi resmi dalam waktu maksimal 2×24 jam.</p>
            <p>🙏 Terima kasih dan selamat mempersiapkan diri untuk tahap selanjutnya!</p>
          </div> */}

          <div>
            <Button variant="secondary" className="bg-green-400 hover:bg-green-500 text-white">
              Lengkapi Berkas Presentasi
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
