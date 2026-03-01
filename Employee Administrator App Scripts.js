const form = document.getElementById('employee-form');
        const employeeList = document.getElementById('employee-list');
        let employees = [];
        let editIndex = null;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const inputs = form.querySelectorAll('input');
            let isValid = true;

            inputs.forEach(input => {
                const formGroup = input.parentElement;
                if (!input.value.trim()) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                }
            });

            if (!isValid) {
                form.classList.add('was-validated');
                return;
            }

            const employee = {
                name: inputs[0].value.trim(),
                position: inputs[1].value.trim(),
                department: inputs[2].value.trim()
            };

            if (editIndex !== null) {
                employees[editIndex] = employee;
                editIndex = null;
            } else {
                employees.push(employee);
            }

            renderEmployees();
            form.reset();
            form.classList.remove('was-validated');
        });

        function renderEmployees() {
            employeeList.innerHTML = '';
            employees.forEach((employee, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.name}</td>
                    <td>${employee.position}</td>
                    <td>${employee.department}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editEmployee(${index})">Editar</button>
                        <button class="action-btn delete-btn" onclick="deleteEmployee(${index})">Eliminar</button>
                    </td>
                `;
                employeeList.appendChild(row);
            });
        }

        function editEmployee(index) {
            const employee = employees[index];
            const inputs = form.querySelectorAll('input');
            inputs[0].value = employee.name;
            inputs[1].value = employee.position;
            inputs[2].value = employee.department;
            editIndex = index;
            form.querySelector('.btn').textContent = 'Actualizar Empleado';
        }

        function deleteEmployee(index) {
            employees.splice(index, 1);
            renderEmployees();
            form.querySelector('.btn').textContent = 'Agregar Empleado';
            form.reset();
        }