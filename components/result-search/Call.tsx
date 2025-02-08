import ScheduledCalls from "./scheduled-calls"
import OngoingCalls from "./ongoing-calls"

export default function Home() {
  return (
    <main className="container mx-auto p-4 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <ScheduledCalls />
        <OngoingCalls />
      </div>
    </main>
  )
}

