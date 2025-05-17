import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Logo dari public/logo.png */}
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex items-center justify-center rounded-md">
            <Image
              src="/logo.png"
              alt="Logo"
              width={64}
              height={64}
              className="rounded-sm"
              priority
            />
          </div>
          <span className="text-sm text-muted-foreground">Forum OSIS Jawa Barat</span>
        </a>

        <RegisterForm />
      </div>
    </div>
  )
}
