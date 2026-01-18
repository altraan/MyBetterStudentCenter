"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  Building2,
  CalendarDays,
  ExternalLink,
  GraduationCap,
  Library,
  Mail,
  MapPin,
} from "lucide-react"

const links = [
  { icon: Library, label: "Library Services", href: "#" },
  { icon: CalendarDays, label: "Academic Calendar", href: "#" },
  { icon: Building2, label: "Campus Maps", href: "#" },
  { icon: BookOpen, label: "Course Catalog", href: "#" },
  { icon: GraduationCap, label: "Career Services", href: "#" },
  { icon: Mail, label: "Student Email", href: "#" },
  { icon: MapPin, label: "Parking Services", href: "#" },
]

export function QuickLinksCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 p-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-[#0B335E] transition-colors group"
            >
              <link.icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate flex-1">{link.label}</span>
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
