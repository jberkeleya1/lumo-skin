"use client"

import { useState } from "react"
import CollapsibleRoutineCard from "./CollapsibleRoutineCard"

export default function RoutineFilter({ routines }: { routines: any[] }) {
  const [filterDate, setFilterDate] = useState("")

  const filteredRoutines = routines.filter((routine) => {
    const created = new Date(routine.created_at).toISOString().slice(0, 10)
    return filterDate ? created === filterDate : true
  })

  return (
    <div className="space-y-6">
      <div className="mb-4 flex flex-col gap-2">
        <label className="text-sm font-medium text-textMuted">Filter by date</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-fit border border-borderColor rounded px-3 py-1 text-sm bg-card text-textMain"
        />
      </div>

      {filteredRoutines.length > 0 ? (
        filteredRoutines.map((routine) => (
          <CollapsibleRoutineCard key={routine.id} routine={routine} />
        ))
      ) : (
        <p className="text-textMuted text-sm">No routines found for this date.</p>
      )}
    </div>
  )
}
