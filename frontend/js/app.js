const apiBase = 'http://localhost:5000/api'; // Backend API base URL

// Elements
const studentForm = document.getElementById('student-form');
const studentList = document.getElementById('student-list');
const teacherForm = document.getElementById('teacher-form');
const teacherList = document.getElementById('teacher-list');
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutBtn = document.getElementById('logout-btn');




logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('authToken');
  authToken = null;
  updateUI();
});

let authToken = null;

// Save token locally
function saveToken(token) {
  localStorage.setItem('authToken', token);
  authToken = token;
}

// Get token from storage
function getToken() {
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  return authToken;
}

// Show/hide UI based on auth status
function updateUI() {
  if (getToken()) {
    authSection.style.display = 'none';
    appSection.style.display = 'block';
    fetchStudents();
    fetchTeachers();
  } else {
    authSection.style.display = 'block';
    appSection.style.display = 'none';
  }
}

// Login handler
loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  const username = loginForm['login-username'].value;
  const password = loginForm['login-password'].value;

  const res = await fetch(`${apiBase}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (res.ok) {
    saveToken(data.token);
    updateUI();
  } else {
    alert(data.message || 'Login failed');
  }

  loginForm.reset();
});

// Register handler
registerForm.addEventListener('submit', async e => {
  e.preventDefault();
  const username = registerForm['register-username'].value;
  const password = registerForm['register-password'].value;
  const role = registerForm['register-role'].value;

  const res = await fetch(`${apiBase}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role }),
  });

  const data = await res.json();
  if (res.ok) {
    alert('Registration successful! You can now login.');
    registerForm.reset();
  } else {
    alert(data.message || 'Registration failed');
  }
});

// Update fetch requests to include auth token in headers
async function fetchStudents() {
  const res = await fetch(`${apiBase}/students`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  renderStudents(data);
}

async function fetchTeachers() {
  const res = await fetch(`${apiBase}/teachers`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  renderTeachers(data);
}

// Similarly update add, update, delete student/teacher fetch calls to include Authorization header...

// Initialize UI on page load
updateUI();

// Variables to track edit state
let editStudentId = null;
let editTeacherId = null;

// Function to fill student form for editing
function fillStudentForm(student) {
  editStudentId = student._id;
  studentForm['student-name'].value = student.name;
  studentForm['student-age'].value = student.age;
  studentForm['student-grade'].value = student.grade;
  studentForm['student-contact'].value = student.contact;
  studentForm.querySelector('button[type="submit"]').textContent = 'Update Student';
}

// Function to fill teacher form for editing
function fillTeacherForm(teacher) {
  editTeacherId = teacher._id;
  teacherForm['teacher-name'].value = teacher.name;
  teacherForm['teacher-subject'].value = teacher.subject;
  teacherForm['teacher-email'].value = teacher.email;
  teacherForm['teacher-phone'].value = teacher.phone;
  teacherForm.querySelector('button[type="submit"]').textContent = 'Update Teacher';
}

// Fetch and render students
async function fetchStudents() {
  const res = await fetch(`${apiBase}/students`);
  const data = await res.json();
  renderStudents(data);
}

function renderStudents(students) {
  studentList.innerHTML = '';
  students.forEach(student => {
    const li = document.createElement('li');
    li.textContent = `${student.name} - Age: ${student.age}, Grade: ${student.grade}, Contact: ${student.contact} `;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => fillStudentForm(student);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => deleteStudent(student._id);

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    studentList.appendChild(li);
  });
}

// Delete student
async function deleteStudent(id) {
  await fetch(`${apiBase}/students/${id}`, { method: 'DELETE' });
  fetchStudents();
}

// Add or update student form submit
studentForm.addEventListener('submit', async e => {
  e.preventDefault();
  const student = {
    name: studentForm['student-name'].value,
    age: Number(studentForm['student-age'].value),
    grade: studentForm['student-grade'].value,
    contact: studentForm['student-contact'].value,
  };

  if (editStudentId) {
    await fetch(`${apiBase}/students/${editStudentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    editStudentId = null;
    studentForm.querySelector('button[type="submit"]').textContent = 'Add Student';
  } else {
    await fetch(`${apiBase}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
  }

  studentForm.reset();
  fetchStudents();
});

// Fetch and render teachers
async function fetchTeachers() {
  const res = await fetch(`${apiBase}/teachers`);
  const data = await res.json();
  renderTeachers(data);
}

function renderTeachers(teachers) {
  teacherList.innerHTML = '';
  teachers.forEach(teacher => {
    const li = document.createElement('li');
    li.textContent = `${teacher.name} - Subject: ${teacher.subject}, Email: ${teacher.email}, Phone: ${teacher.phone} `;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => fillTeacherForm(teacher);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => deleteTeacher(teacher._id);

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    teacherList.appendChild(li);
  });
}

// Delete teacher
async function deleteTeacher(id) {
  await fetch(`${apiBase}/teachers/${id}`, { method: 'DELETE' });
  fetchTeachers();
}

// Add or update teacher form submit
teacherForm.addEventListener('submit', async e => {
  e.preventDefault();
  const teacher = {
    name: teacherForm['teacher-name'].value,
    subject: teacherForm['teacher-subject'].value,
    email: teacherForm['teacher-email'].value,
    phone: teacherForm['teacher-phone'].value,
  };

  if (editTeacherId) {
    await fetch(`${apiBase}/teachers/${editTeacherId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacher),
    });
    editTeacherId = null;
    teacherForm.querySelector('button[type="submit"]').textContent = 'Add Teacher';
  } else {
    await fetch(`${apiBase}/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacher),
    });
  }

  teacherForm.reset();
  fetchTeachers();
});

// Initial fetch to populate lists
fetchStudents();
fetchTeachers();
