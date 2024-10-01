const employees = []; // Global array to store employee data

// Function to collect employee data
function collectEmployees() {
    let addMore = true;

    while (addMore) {
        const firstName = prompt("Enter first name:");
        const lastName = prompt("Enter last name:");
        let salary = parseFloat(prompt("Enter salary:"));

        // Validate inputs
        if (!firstName || !lastName) {
            alert("First name and last name cannot be empty.");
            continue; // Skip to the next iteration if names are invalid
        }

        // Default salary to $0 if invalid
        if (isNaN(salary)) {
            alert("Invalid salary, setting to $0.");
            salary = 0;
        }

        // Add employee object to the array
        employees.push({ firstName, lastName, salary });

        // Ask if the user wants to add another employee
        addMore = confirm("Would you like to add another employee?");
    }

    // Call function to display data and perform calculations
    trackEmployeeData();
}

// Function to calculate and display average salary
function displayAverageSalary() {
    if (employees.length === 0) {
        console.log("No employees to calculate average salary.");
        return; // Early return if there are no employees
    }
    const totalSalary = employees.reduce((total, employee) => total + employee.salary, 0);
    const averageSalary = (totalSalary / employees.length).toFixed(2);
    
    console.log(`The average employee salary between our ${employees.length} employee(s) is $${averageSalary}`);
}

// Function to randomly select an employee
function getRandomEmployee() {
    if (employees.length === 0) {
        console.log("No employees available for the drawing.");
        return; // Handle case where there are no employees
    }
    const randomIndex = Math.floor(Math.random() * employees.length);
    const randomEmployee = employees[randomIndex];

    console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`);
}

// Function to track employee data
function trackEmployeeData() {
    // Sort employees by last name
    employees.sort((a, b) => a.lastName.localeCompare(b.lastName));

    // Display the employees and calculate the average salary
    displayEmployees(employees);
    displayAverageSalary();
    getRandomEmployee();
}

// Function to display employees in a table
function displayEmployees(employeeArray) {
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = ''; // Clear existing rows

    employeeArray.forEach(employee => {
        const employeeRow = document.createElement('tr');
        employeeRow.innerHTML = `
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>$${employee.salary.toFixed(2)}</td>
        `;
        employeeList.appendChild(employeeRow);
    });
}

// Attach event listener to the button
document.getElementById('add-employee').addEventListener('click', collectEmployees);
