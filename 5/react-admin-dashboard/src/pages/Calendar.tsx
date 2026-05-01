import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar'

const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date())
  const [dates, setDates] = useState<Date[] | null>(null)
  const [range, setRange] = useState<Date[] | null>(null)

  const events = [
    { title: 'Team Meeting', date: new Date().toDateString(), color: 'blue' },
    { title: 'Product Launch', date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toDateString(), color: 'green' },
    { title: 'Client Call', date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString(), color: 'yellow' },
    { title: 'Deadline', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toDateString(), color: 'red' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Calendar</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your schedule</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Calendar View</h2>
          <div className="flex justify-center">
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value as Date | null)}
              inline
              className="border rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {events.map((event, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className={`w-2 h-12 rounded-full ${
                    event.color === 'blue' ? 'bg-blue-500' :
                    event.color === 'green' ? 'bg-green-500' :
                    event.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{event.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Other Examples</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Multiple Selection</label>
                <Calendar
                  value={dates}
                  onChange={(e) => setDates(e.value as Date[])}
                  selectionMode="multiple"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Range Selection</label>
                <Calendar
                  value={range}
                  onChange={(e) => setRange(e.value as Date[])}
                  selectionMode="range"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage
