import { useState } from "react"
import SplineScene from "@/components/SplineScene"
import Header from "@/components/Header"
import RotatingTextAccent from "@/components/RotatingTextAccent"
import Footer from "@/components/Footer"
import HeroTextOverlay from "@/components/HeroTextOverlay"
import OrderModal from "@/components/OrderModal"

const CDN_BASE = "https://cdn.poehali.dev/templates/meet-jack"

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="w-full min-h-screen py-0 bg-background">
      <div className="max-w-[1200px] mx-auto">
        <main className="w-full relative h-[600px]">
          <Header onOrder={() => setModalOpen(true)} />
          <SplineScene />
          <HeroTextOverlay />
          <RotatingTextAccent />
        </main>

        <section
          className="relative rounded-4xl py-7 mx-4 md:mx-0 w-[calc(100%-2rem)] md:w-full bg-card border border-solid border-border pb-20"
          style={{
            backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        >
          <div className="absolute top-8 left-8 text-foreground opacity-50 text-5xl font-extralight font-sans leading-[0rem]">
            +
          </div>
          <div className="absolute top-8 right-8 text-foreground opacity-50 text-5xl font-sans leading-[0] font-extralight">
            +
          </div>
          <div className="absolute bottom-8 left-8 text-foreground opacity-50 text-5xl font-sans font-extralight">
            +
          </div>
          <div className="absolute bottom-8 right-8 text-foreground opacity-50 text-5xl font-sans font-extralight">
            +
          </div>

          <div className="px-6 md:px-40">
            <div className="flex items-center justify-center mb-8 md:gap-11 gap-6 flex-wrap">
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-background/50">
                <span className="text-5xl">💵</span>
                <span className="text-accent font-mono text-sm font-bold">USD</span>
                <span className="text-foreground font-mono text-xs">Доллар США</span>
              </div>

              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-background/50">
                <span className="text-5xl">💶</span>
                <span className="text-accent font-mono text-sm font-bold">EUR</span>
                <span className="text-foreground font-mono text-xs">Евро</span>
              </div>

              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-background/50">
                <span className="text-5xl">₿</span>
                <span className="text-accent font-mono text-sm font-bold">BTC</span>
                <span className="text-foreground font-mono text-xs">Биткоин</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 max-w-5xl">
              <div className="flex items-center gap-4">
                <span className="text-accent font-mono text-sm">Скорость</span>
                <span className="text-foreground font-mono text-sm">Обмен за 5 минут</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-accent font-mono text-sm">Курс</span>
                <span className="text-foreground font-mono text-sm">Выгодный обменный курс без скрытых комиссий</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-accent font-mono text-sm">Надёжность</span>
                <span className="text-foreground font-mono text-sm">
                  Работаем официально, соблюдаем все требования безопасности. Ваши средства под защитой.
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer onOrder={() => setModalOpen(true)} />
      <OrderModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}

export default Index