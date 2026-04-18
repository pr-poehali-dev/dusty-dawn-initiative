import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import func2url from "../../backend/func2url.json"

interface OrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function OrderModal({ open, onOpenChange }: OrderModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", amount: "", currency: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email || !form.amount || !form.currency) {
      setError("Пожалуйста, заполните все поля")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(func2url["send-order"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSuccess(true)
        setForm({ name: "", phone: "", email: "", amount: "", currency: "" })
      } else {
        setError("Ошибка отправки. Попробуйте ещё раз.")
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (val: boolean) => {
    onOpenChange(val)
    if (!val) {
      setSuccess(false)
      setError("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono text-xl">
            {success ? "Заявка отправлена!" : "Заявка на обмен — PEPPYLOT"}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <span className="text-5xl">✅</span>
            <p className="text-foreground font-mono text-sm">
              Мы получили вашу заявку и свяжемся с вами в ближайшее время.
            </p>
            <Button
              className="rounded-full px-8 bg-primary text-primary-foreground"
              onClick={() => handleClose(false)}
            >
              Закрыть
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <Label className="font-mono text-sm">ФИО</Label>
              <Input
                placeholder="Иванов Иван Иванович"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-mono text-sm">Телефон</Label>
              <Input
                placeholder="+7 900 000 00 00"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-mono text-sm">Email</Label>
              <Input
                type="email"
                placeholder="example@mail.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <Label className="font-mono text-sm">Сумма</Label>
                <Input
                  placeholder="1000"
                  value={form.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5 w-32">
                <Label className="font-mono text-sm">Валюта</Label>
                <Select value={form.currency} onValueChange={(v) => handleChange("currency", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выбрать" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD 💵">USD 💵</SelectItem>
                    <SelectItem value="EUR 💶">EUR 💶</SelectItem>
                    <SelectItem value="BTC ₿">BTC ₿</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-mono">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="rounded-full bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 mt-1"
            >
              {loading ? "Отправляем..." : "Создать заявку"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
