"use client"

import { cn } from "@/lib/utils"
import {
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  GraduationCap,
  HelpCircle,
  Home,
  Link2,
  ListChecks,
  Settings,
  TrendingUp,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: BookOpen, label: "Academic Records", href: "/academic-records" },
  { icon: TrendingUp, label: "Academic Progress", href: "/academic-progress" },
  { icon: Calendar, label: "Manage Classes", href: "/manage-classes" },
  { icon: Wallet, label: "Financial Account", href: "/financial-account", badge: "Due" },
  { icon: CreditCard, label: "Financial Aid & Awards", href: "/financial-aid" },
  { icon: GraduationCap, label: "Credit Transfers", href: "/credit-transfers" },
  { icon: FileText, label: "Registration Status", href: "/registration-status" },
  { icon: ListChecks, label: "Tasks", href: "/tasks", badge: "2" },
  { icon: Users, label: "Student Services", href: "/student-services" },
  { icon: Link2, label: "Important Links", href: "/important-links" },
  { icon: HelpCircle, label: "Service Requests", href: "/service-requests" },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-[#0B335E] transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-white font-semibold">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-white text-[#0B335E]"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      )}
                      onClick={() => {
                        if (window.innerWidth < 1024) {
                          onClose()
                        }
                      }}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            item.badge === "Due"
                              ? "bg-red-500 text-white"
                              : "bg-white/20 text-white"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-white/10">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
