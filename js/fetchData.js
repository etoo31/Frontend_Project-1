//featching data
export let fetchCourses = async ()=>{
    let response = await fetch("http://localhost:3000/courses");
    const courseData = await response.json();
    return courseData;
}
export let fetchSubjectsHeader = async ()=>{
    let response = await fetch("http://localhost:3000/headers");
    const subjectsHeader = await response.json();
    return subjectsHeader;
}
