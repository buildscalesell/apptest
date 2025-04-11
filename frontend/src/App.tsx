import { useState, useEffect } from "react"
import { Input } from "@shared/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"

export default function App() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [token, setToken] = useState<string | null>(null)

  // Token beim Laden aus localStorage holen
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token")
    if (savedToken) setToken(savedToken)
  }, [])

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, password })
      })

      if (!res.ok) {
        const data = await res.json()
        setMessage(data.detail || "Login fehlgeschlagen")
        return
      }

      const data = await res.json()
      localStorage.setItem("access_token", data.access_token)
      setToken(data.access_token)
      setMessage("")
    } catch (error) {
      setMessage("Fehler beim Login")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    setToken(null)
    setName("")
    setPassword("")
  }
  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        </Routes>
      </Router>
    )
  }
  
  function PrivateRoute({ children }: { children: JSX.Element }) {
    const token = localStorage.getItem("access_token")
    return token ? children : <Navigate to="/login" />
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {token ? "Willkommen 🎉" : "Login"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {!token ? (
            <>
              <div>
                <Label htmlFor="name">Benutzername</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          ) : (
            <p className="text-green-600 text-center">
              Du bist eingeloggt ✅
            </p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          {!token ? (
            <Button className="w-full" onClick={handleLogin}>
              Anmelden
            </Button>
          ) : (
            <Button variant="destructive" onClick={handleLogout}>
              Ausloggen
            </Button>
          )}
          {message && (
            <p className="text-sm text-center text-red-500">{message}</p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
