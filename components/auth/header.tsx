import { MapPin } from "lucide-react"

interface HeaderProps {
  label: string
}

export function Header({
  label
}: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex items-center gap-x-2">
        <MapPin className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-semibold">
          Terrasspotter
        </h1>
      </div>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  )
}