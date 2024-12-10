interface Course {
    id: number;
    name: string;
    price: number;
    start: string;
    duration: number;
    type_id: number;
}

export async function fetchCourses(url: string): Promise<Course[]> {
    const response = await fetch(url);
    const data = await response.json(); 
    return data;
}