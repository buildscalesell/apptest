import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function DashboardPage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">🎉 Willkommen im Dashboard</h1>
      <p className="mb-4">Nur sichtbar mit gültigem Login-Token</p>
      <Button variant="destructive" onClick={handleLogout}>
        Ausloggen
      </Button>
    </div>
  )
}
