// Ensure employees array is defined only once
let employees = []; // Declare the employees array once

// Function to collect employee data
function collectEmployees() {
    let addMore = true;

    while (addMore) {
        const firstName = prompt("Enter first name:").trim();
        const lastName = prompt("Enter last name:").trim();
        let salaryInput = prompt("Enter salary (non-negative number):");
        let salary = parseFloat(salaryInput);

        // Initialize an array to store error messages
        let errorMessages = [];

        // Validate inputs (checks if name is just empty or whitespace)
        if (!firstName || firstName.trim() === "") {
        errorMessages.push("First name cannot be empty or just whitespace.");
        }

         if (!lastName || lastName.trim() === "") {
        errorMessages.push("Last name cannot be empty or just whitespace.");
        }

        // Validate salary input (non-negative number)
        if (isNaN(salary) || salary < 0) {
            errorMessages.push("Invalid salary entered. The salary will be automatically set to $0.");
            salary = 0;
        }

        // If there are errors, display them in a single alert and continue the loop
        if (errorMessages.length > 0) {
            alert(errorMessages.join("\n")); // Display all error messages at once
            continue; // Skip to the next iteration
        }

        // Add employee object to the array
        employees.push({ firstName, lastName, salary });

        // Ask if the user wants to add another employee
        addMore = confirm("Would you like to add another employee?");
    }

    // Call function to track employee data after all employees are added
    trackEmployeeData();
}

// Function to calculate and display average salary
function displayAverageSalary(employees) {
    // Check if employees is a valid array and if there are any employees
    if (!Array.isArray(employees) || employees.length === 0) {
        console.log("No employees to calculate average salary.");
        return; // Early return if there are no employees
    }

    let validSalaries = 0; // Count of valid salaries
    const totalSalary = employees.reduce((total, employee) => {
        // Check if employee.salary is a valid number
        if (typeof employee.salary === 'number' && !isNaN(employee.salary)) {
            validSalaries++;
            return total + employee.salary;
        }
        return total; // Ignore invalid salary
    }, 0);

    // Calculate average salary based on valid salaries
    const averageSalary = (validSalaries > 0) ? (totalSalary / validSalaries).toFixed(2) : 0;

    // Log the average salary in the specified format
    console.log(`The average employee salary between our ${employees.length} employee(s) is $${averageSalary}.`);
}

// Function to randomly select an employee
function getRandomEmployee(employees) {
    // Check if the employees array is valid and has elements
    if (!Array.isArray(employees) || employees.length === 0) {
        console.log("No employees available for the drawing.");
        return; // Handle case where there are no employees or invalid input
    }

    // Generate a random index and select the random employee
    const randomIndex = Math.floor(Math.random() * employees.length);
    const randomEmployee = employees[randomIndex];

    // Log the selected employee directly, assuming the employee object is valid
    console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`);
}

// Function to track employee data
function trackEmployeeData() {
    // Sort employees by last name
    employees.sort((a, b) => a.lastName.localeCompare(b.lastName));

    // Display the employees and calculate the average salary
    displayEmployees(employees);
    displayAverageSalary(employees);
    getRandomEmployee(employees);
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


    