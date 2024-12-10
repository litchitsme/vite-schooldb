// import './style.css'

import { fetchCourses } from './fetch.ts'

const url = "http://127.0.0.1:8000/api/courses/" 
const showCoursesButton = document.querySelector<HTMLButtonElement>('#show-courses')!;
const show1CourseButton = document.querySelector<HTMLButtonElement>('#search-courses')!;
const addCourseButton = document.querySelector<HTMLButtonElement>('#add-course')!;
const deleteCourseButton = document.querySelector<HTMLButtonElement>('#delete-course')!;

fetchCourses(url).then((data) => console.log(data));

async function showCourses(url: string): Promise<void> {
  try {
    const courses = await fetchCourses(url);
    const output = document.querySelector<HTMLDivElement>('#output')!
    output.innerHTML = 
    `
          ${courses.map(course => `
            <div class="backdrop-blur-lg bg-white/30 rounded-2xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div class="flex items-center space-x-4">
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">${course.name}</h2>
                </div>
              </div>
              <div class="mt-4 space-y-2">
                <p class="text-gray-700"><span class="font-medium">Start:</span> ${course.start}</p>
                <p class="text-gray-700"><span class="font-medium">Duration:</span> ${course.duration} months</p>
                <p class="text-gray-700"><span class="font-medium">Price:</span> €${course.price}</p>
              </div>
            </div>
          `).join('')}
    `
  }
  catch (error) {
    console.log(error)
  }
}

showCoursesButton.addEventListener('click', () => showCourses(url));

async function showSpecificCourse(url: string): Promise<void> {
  try {
    const courses = await fetchCourses(url);
    const courseName = document.querySelector<HTMLInputElement>('#courseName')!.value;
    const courseId = document.querySelector<HTMLInputElement>('#courseId')!.value;
    const output = document.querySelector<HTMLDivElement>('#output')!;

    if (courses.some(course => course.name.toLowerCase() === courseName.toLowerCase())) {
      const url = `http://127.0.0.1:8000/api/courses//${courseName}/`;
      const course = await fetchCourses(url);
      output.innerHTML = 
      `
              <div class="backdrop-blur-lg bg-white/30 rounded-2xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center space-x-4">
                  <div>
                    <h2 class="text-xl font-semibold text-gray-800">${course.name}</h2>
                  </div>
                </div>
                <div class="mt-4 space-y-2">
                  <p class="text-gray-700"><span class="font-medium">Start:</span> ${course.start}</p>
                  <p class="text-gray-700"><span class="font-medium">Duration:</span> ${course.duration} months</p>
                  <p class="text-gray-700"><span class="font-medium">Price:</span> €${course.price}</p>
                </div>
              </div>
      `
    }
    else {
      if (courses.some(course => course.id === Number(courseId))) {
        const url = `http://127.0.0.1:8000/api/courses/${courseId}/`;
        const course = await fetchCourses(url);
        output.innerHTML = 
        `
                <div class="backdrop-blur-lg bg-white/30 rounded-2xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                  <div class="flex items-center space-x-4">
                    <div>
                      <h2 class="text-xl font-semibold text-gray-800">${course.name}</h2>
                    </div>
                  </div>
                  <div class="mt-4 space-y-2">
                    <p class="text-gray-700"><span class="font-medium">Start:</span> ${course.start}</p>
                    <p class="text-gray-700"><span class="font-medium">Duration:</span> ${course.duration} months</p>
                    <p class="text-gray-700"><span class="font-medium">Price:</span> €${course.price}</p>
                  </div>
                </div>
        `
      }
      else {
        output.innerHTML = 
        `
          <div class="backdrop-blur-lg bg-white/30 rounded-2xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center space-x-4">
              <div>
                <h2 class="text-xl font-semibold text-gray-800">No course found</h2>
              </div>
            </div>
          </div>
        ` 
      
      }
    }
  } 
  catch (error) {
    console.log(error)
  }
}

show1CourseButton.addEventListener('click', () => showSpecificCourse(url));

async function addCourse(url: string): Promise<void> {
  try {
    const newCourse = {
        name: document.querySelector<HTMLInputElement>('#courseName')!.value,
        price: document.querySelector<HTMLInputElement>('#coursePrice')!.value,
        start: document.querySelector<HTMLInputElement>('#courseStart')!.value,
        duration: document.querySelector<HTMLInputElement>('#courseDuration')!.value,
        type_id: document.querySelector<HTMLInputElement>('#courseTypeId')!.value,
    };
    const output = document.querySelector<HTMLDivElement>('#output')!;
    const message = document.querySelector<HTMLDivElement>('#message')!;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key' : 'your-secret-api-key-2024'
        },
        body: JSON.stringify(newCourse)
    })

    console.log(newCourse);
    message.innerHTML = 
    `<div class=" text-center mb-10 text-gray-800">New course added successfully</div>`;

    output.innerHTML = 
    `
      <div class="backdrop-blur-lg bg-white/30 rounded-2xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
        <div class="flex items-center space-x-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">${newCourse.name}</h2>
          </div>
        </div>
        <div class="mt-4 space-y-2">
          <p class="text-gray-700"><span class="font-medium">Start:</span> ${newCourse.start}</p>
          <p class="text-gray-700"><span class="font-medium">Duration:</span> ${newCourse.duration} months</p>
          <p class="text-gray-700"><span class="font-medium">Price:</span> €${newCourse.price}</p>
        </div>
      </div>
    `

  }
  catch (error) {
    console.log(error)
  }
};

async function deleteCourse(url: string): Promise<void> {
  try {
    const courses = await fetchCourses(url);
    const message = document.querySelector<HTMLDivElement>('#message')!;
    const courseName = document.querySelector<HTMLInputElement>('#courseName')!.value;
    const courseId = document.querySelector<HTMLInputElement>('#courseId')!.value;

    if (courses.some(course => course.name === courseName)) {
      const deleteUrl = `http://127.0.0.1:8000/api/courses//${courseName}/`;

      await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'x-api-key' : 'your-secret-api-key-2024'
        }
      })
      message.innerHTML = 
        `<div class=" text-center mb-10 text-gray-800">${courseName} deleted successfully</div>`;
    }
    else {
      if (courses.some(course => course.id === Number(courseId))) {
        const deleteUrl = `http://127.0.0.1:8000/api/courses/${courseId}/`;
        await fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
              'x-api-key' : 'your-secret-api-key-2024'
          }
        })
        message.innerHTML = 
          `<div class=" text-center mb-10 text-gray-800">${courseId} deleted successfully</div>`;
      }
      else {
        message.innerHTML = 
          `<div class=" text-center mb-10 text-gray-800">Course not found</div>`;
        return; // Exit early since no course was deleted
      }
    }

    // Call showCourses only after deletion completes
    await showCourses(url);
  }
  catch (error) {
    console.log(error)
  }
};

addCourseButton.addEventListener('click', () => addCourse(url));

deleteCourseButton.addEventListener('click', () => deleteCourse(url));

showCourses(url);