import Image from "next/image"

const partners = [
  { name: "Vercel", logo: "/placeholder.svg" },
  { name: "Loom", logo: "/placeholder.svg" },
  { name: "Cash App", logo: "/placeholder.svg" },
  { name: "Loops", logo: "/placeholder.svg" },
  { name: "Zapier", logo: "/placeholder.svg" },
  { name: "Ramp", logo: "/placeholder.svg" },
  { name: "Raycast", logo: "/placeholder.svg" },
]

export function Partners() {
  return (
    <div className="w-full py-12 border-t border-white/10">
      <div className="container flex flex-wrap justify-center items-center gap-8 opacity-50">
        {partners.map((partner) => (
          <div key={partner.name} className="w-32">
            <Image
              src={partner.logo || "/placeholder.svg"}
              alt={partner.name}
              width={128}
              height={40}
              className="w-full h-10 object-contain filter invert"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

