




//
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Create Employee Records from an Array of Arrays
  function createEmployeeRecords(dataArray) {
    return dataArray.map(createEmployeeRecord);
  }
  
  // Add a TimeIn Event to an Employee's Record
  function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employee.timeInEvents.push({ type: "TimeIn", date, hour });
    return employee;
  }
  
  // Add a TimeOut Event to an Employee's Record
  function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employee.timeOutEvents.push({ type: "TimeOut", date, hour });
    return employee;
  }
  
  // Calculate Hours Worked on a Specific Date
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find((event) => event.date === date);
    const timeOut = employee.timeOutEvents.find((event) => event.date === date);
  
    if (timeIn && timeOut) {
      const timeInHours = parseInt(timeIn.hour, 10);
      const timeOutHours = parseInt(timeOut.hour, 10);
      return (timeOutHours - timeInHours) / 100; // Assuming time is in HHMM format
    }
  
    return 0; // No hours worked if there are no matching TimeIn and TimeOut events.
  }
  
  // Calculate Wages Earned on a Specific Date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Calculate All Wages for an Employee
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map((event) => event.date);
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  // Calculate All Wages for Multiple Employees
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
  // Example CSV data
  const employeeData = [
    ["Sonia", "Sotomayor", "Title1", 15],
    ["Elena", "Kagan", "Title2", 20],
    // Add more employee data as needed
  ];
  
  const employees = createEmployeeRecords(employeeData);
  createTimeInEvent(employees[0], "2023-10-11 0800");
  createTimeOutEvent(employees[0], "2023-10-11 1600");
  
  // Run tests
  console.log(allWagesFor(employees[0])); // Should print the wages for the first employee
  console.log(calculatePayroll(employees)); // Should print the total payroll
  
