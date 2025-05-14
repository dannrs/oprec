"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function TwibbonAnggota() {
  const [copied, setCopied] = useState(false)

  const caption = `📢 COMING SOON: PROGRAM KADERISASI GENERASI 13 📢

Salam, #PemimpinMudaJawaBarat!

Halo, Pemimpin Muda!

Kini, Generasi 12 akan segera menuntaskan perjalanannya, dan estafet kepemimpinan akan berpindah tangan. 🫱🏻‍🫲🏻

Waktunya mempersiapkan diri kamu untuk menjadi bagian dari generasi penerus kepemimpinan pelajar Jawa Barat! ✊🏻

“Kepemimpinan tidak dilihat dari usia, tetapi dari kemampuan untuk mempengaruhi dan membawa orang lain untuk bergerak maju.” ✨
—Jusuf Kalla 

Apakah kamu siap mengambil peran? 🤔

Kami tunggu ya! 🫵🏻

•••
Follow us for more information!

@forumosisjabar.id @disdikjabar @tikomdik_disdikjabar
__________

📧 E-Mail : Info@forumosisjabar.id / mediacenterfojb@gmail.com 
📷 Instagram : @forumosisjabar.id
🎵 TikTok : forumosisjabar.id
▶️ YouTube : Forum OSIS Jawa Barat
🔗 Website : https://forumosisjabar.id
❎ X : @ForumOSIS_Jabar
🎙️ Spotify : Jam Istirahat!
__________

#ForumOSISJawaBarat #SalamPemimpinMudaJawaBarat #OSISJabar #FOJB #JabarJuara #IndonesiaEmas2045 #12thGeneration #2025 #SatuDekadeFOJB #PROKSI #Generasi13`

  const handleCopy = () => {
    navigator.clipboard.writeText(caption)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="pt-12 px-4 lg:px-6">
  <Card>
    <CardHeader>
      <CardTitle>Twibbon Anggota FOJB Gen 13</CardTitle>
      <a
        href="https://twb.nz/iggs2025"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 underline"
      >
        Klik disini
      </a>
    </CardHeader>
    <CardContent className="space-y-4 pt-4">
      <p className="font-semibold">Caption:</p>
      <Textarea value={caption} readOnly rows={18} />
      <Button onClick={handleCopy} variant="outline">
        {copied ? "Tersalin!" : "Salin Caption"}
      </Button>
    </CardContent>
  </Card>
</div>

  )
}
