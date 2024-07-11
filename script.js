// inputs stored in varibales
const recordDetails = document.getElementById('record-details');
const studentNameInput = document.getElementById('studentName');
const studentIdInput = document.getElementById('studentId');
const emailInput = document.getElementById('email');
const contactNoInput = document.getElementById('contactNo');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('indexEdit');

// Initialize records from local storage
let records = JSON.parse(localStorage.getItem('records')) || [];

// Function to check for duplicate student IDs
function isDuplicateStudentId(studentId) {
    return records.some(
        (record) => record.studentId === studentId
    );
}

// Function to check for duplicate studentEmail
function isDuplicatestudentEmail(email) {
    return records.some(
        (record) => record.email.toLowerCase() === email.toLowerCase()
    );
}

// Function to check for duplicate student contact
function isDuplicatestudentcontactNo(contactNo) {
    return records.some(
        (record) => record.contactNo === contactNo
    );
}

// Display records
function showRecords() {
    recordList.innerHTML = '';
    if (records.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" style="text-align:center;color:red;">0 Records</td>`;
        recordList.appendChild(row);
    } else {
        records.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.studentName}</td>
                <td>${record.studentId}</td>
                <td>${record.email}</td>
                <td>${record.contactNo}</td>
                <td><button onclick="editRecord(${index})">Edit</button></td>
                <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
            `;
            recordList.appendChild(row);
        });
    }

      // Add hover effect to delete buttons
  const deleteButtons = document.querySelectorAll('button');
  deleteButtons.forEach(button => {
      if (button.innerHTML === 'Delete') {
          button.addEventListener('mouseover', () => {
              button.style.backgroundColor = 'red';
          });
          button.addEventListener('mouseout', () => {
              button.style.backgroundColor = '';
          });
      }
      else if(button.innerHTML === 'Edit') {
          button.addEventListener('mouseover', () => {
              button.style.backgroundColor = 'blue';
          });
          button.addEventListener('mouseout', () => {
              button.style.backgroundColor = '';
          });
      }
      else if(button.innerHTML === 'Add') {
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = 'green';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '';
        });
    }
  });
}

// Add or Update a record
recordDetails.addEventListener('submit', function (e) {
    e.preventDefault();
    const studentName = studentNameInput.value.trim();
    const studentId = studentIdInput.value.trim();
    const email = emailInput.value.trim();
    const contactNo = contactNoInput.value.trim();
    const editIndex = parseInt(editIndexInput.value);

    if (studentName && studentId && email && contactNo) {
        // Check for duplicate student ID
        if (isDuplicateStudentId(studentId) && editIndex === -1) {
            alert('Student ID already exists.');
            return;
        }
        if (isDuplicatestudentEmail(email) && editIndex === -1) {
            alert('Email already exists.');
            return;
        }
        if (isDuplicatestudentcontactNo(contactNo) && editIndex === -1) {
            alert('Contact Number already exists.');
            return;
        }

        if (editIndex === -1) {
            // Add a new record
            records.push({ studentName, studentId, email, contactNo });
            alert('New record has been added successfully!');
        } else {
            // Update an existing record
            records[editIndex] = { studentName, studentId, email, contactNo };
            editIndexInput.value = -1;
            alert('Record has been updated successfully!')
        }

        localStorage.setItem('records', JSON.stringify(records));
        studentNameInput.value = '';
        studentIdInput.value = '';
        emailInput.value = '';
        contactNoInput.value = '';
        showRecords();
    }
});

// Edit a record
function editRecord(index) {
    const recordToEdit = records[index];
    studentNameInput.value = recordToEdit.studentName;
    studentIdInput.value = recordToEdit.studentId;
    emailInput.value = recordToEdit.email;
    contactNoInput.value = recordToEdit.contactNo;
    editIndexInput.value = index;
}

// Delete a record
function deleteRecord(index) {
    records.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(records));
    showRecords();
    alert('Record has been deleted successfully!');
}

// Text validation for student name
studentNameInput.addEventListener('input', function () {
    studentNameInput.value = studentNameInput.value.replace(/[^a-zA-Z\s]/g, '');
});

// Numeric validation for contact number
contactNoInput.addEventListener('input', function () {
    contactNoInput.value = contactNoInput.value.replace(/[^0-9]/g, '');
});

// Numeric validation for student ID
studentIdInput.addEventListener('input', function () {
    studentIdInput.value = studentIdInput.value.replace(/[^0-9]/g, '');
});



// Initial display
showRecords();


