const CLEAR_PASSWORD = '2816M'

const defaultEmployees = []

const defaultSummary = []

const getEmployees = () => {
  const data = localStorage.getItem('employees')
  return data ? JSON.parse(data) : defaultEmployees
}

const setEmployees = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees))
}

const getSummary = () => {
  const data = localStorage.getItem('summary')
  return data ? JSON.parse(data) : defaultSummary
}

const setSummary = (summary) => {
  localStorage.setItem('summary', JSON.stringify(summary))
}

const initSummary = () => {
  const employees = getEmployees()
  const summary = getSummary()
  const existingIds = summary.map(s => s.id)
  const newSummary = [...summary]
  
  employees.forEach(emp => {
    if (!existingIds.includes(emp.id)) {
      newSummary.push({
        id: emp.id,
        name: emp.name,
        grade: emp.grade,
        position: emp.position,
        attendanceCount: 0,
        absentCount: 0,
        leaveCount: 0,
        onLeave: false
      })
    }
  })
  
  setSummary(newSummary)
}

const verifyPassword = (password) => {
  return password === CLEAR_PASSWORD
}

const clearAllData = () => {
  localStorage.removeItem('employees')
  localStorage.removeItem('summary')
}

const getEmployeeById = (id) => {
  const employees = getEmployees()
  return employees.find(emp => emp.id === id)
}

const setEmployeeOnLeave = (id, onLeave) => {
  const summary = getSummary()
  const employeeIndex = summary.findIndex(s => s.id === id)
  if (employeeIndex !== -1) {
    if (onLeave) {
      summary[employeeIndex].onLeave = true
    } else {
      summary[employeeIndex].onLeave = false
    }
    setSummary(summary)
  }
}

const getEmployeesByFilter = (grade = null, position = null) => {
  const employees = getEmployees()
  return employees.filter(emp => {
    let match = true
    if (grade) {
      match = match && emp.grade === grade
    }
    if (position) {
      match = match && emp.position === position
    }
    return match
  })
}

const processAttendance = (attendedIds, grade = null, position = null) => {
  const employees = getEmployeesByFilter(grade, position)
  const summary = getSummary()
  const attendedSet = new Set(attendedIds)
  const absentList = []
  
  employees.forEach(emp => {
    const summaryIndex = summary.findIndex(s => s.id === emp.id)
    if (summaryIndex === -1) return
    
    const isOnLeave = summary[summaryIndex].onLeave
    
    if (isOnLeave) {
      summary[summaryIndex].leaveCount++
    } else if (attendedSet.has(emp.id)) {
      summary[summaryIndex].attendanceCount++
    } else {
      summary[summaryIndex].absentCount++
      absentList.push({
        id: emp.id,
        name: emp.name
      })
    }
    
    summary[summaryIndex].onLeave = false
  })
  
  setSummary(summary)
  return absentList
}

export {
  getEmployees,
  setEmployees,
  getSummary,
  setSummary,
  initSummary,
  verifyPassword,
  clearAllData,
  getEmployeeById,
  setEmployeeOnLeave,
  getEmployeesByFilter,
  processAttendance
}
