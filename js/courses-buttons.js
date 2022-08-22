//importing fetch functions from fetchData.js
import {fetchCourses, fetchSubjectsHeader} from "./fetchData.js";

//make an array for courses data and subject header 
const courseData = await fetchCourses();
const subjectsHeader = await fetchSubjectsHeader();

//select all courses buttons
let allCourseButtons = document.querySelectorAll(".course-btn");
let subjectName = "python";
//select subjectContainer
let subjectContainer = document.querySelector(".subject-container");

//show default subject data which is python data
showSubjectData();

//for all course buttons 
allCourseButtons.forEach((btn)=>{
    //on click
    btn.addEventListener('click', ()=>{
        //remove class .active-btn from the active one and put it in the current clicked button
        let activeBtn = document.querySelector('.active-btn');
        //if active-btn equal to current clicked btn do nothing
        if (activeBtn == btn)return

        activeBtn.classList.remove('active-btn');
        //put the class active-btn to the clicked button
        btn.classList.add('active-btn');
        //show subject Data
        subjectName = btn.classList[1];
        //delete any element in the subject element container 
        subjectContainer.innerHTML = "";
        showSubjectData();
    })
});





//show subject data
export default function showSubjectData()
{
    //make course header container 
    let subjectHeaderContainer = document.createElement('div');
    subjectHeaderContainer.classList.add('container');
    subjectHeaderContainer.classList.add('m-4');
    //get subject Header
    let subjectHeader = getSubjectHeader();
    //add subject Header to subject header container 
    subjectHeaderContainer.appendChild(subjectHeader);
    //get subject paragraph
    let subjectParagraph = getSubjectParagraph();
    //add subject paragraph to subject header container
    subjectHeaderContainer.appendChild(subjectParagraph);
    //get subject button
    let subjectButton = getSubjectButton();
    //add subject button to subject header container
    subjectHeaderContainer.appendChild(subjectButton);

    //----add subject header container to subject container---
    subjectContainer.appendChild(subjectHeaderContainer);



}
//get subject header 
function getSubjectHeader()
{
    //create an h1 element
    let subjectHeader = document.createElement('h1');
    //add subject header class
    subjectHeader.classList.add('subject-header');

    //get subject header from data
    subjectHeader.innerText = subjectsHeader[0][subjectName+"Header"];
    
    //return created header
    return subjectHeader;
}
//get subject Paragraph
function getSubjectParagraph()
{
    //create an p element
    let subjectParagraph = document.createElement('p');
    subjectParagraph.classList.add('subject-paragraph');
    subjectParagraph.classList.add('col-lg-9');
    
    subjectParagraph.innerText = subjectsHeader[0][subjectName+"Paragraph"];
    return subjectParagraph;
}
function getSubjectButton()
{
    //create subject button
    let subjectButton = document.createElement('button');
    //add some classes
    subjectButton.classList = "btn btn-light explore-more";

    //add inner text
    subjectButton.innerText = "Explore More";

    //return button
    return subjectButton;
}
function getSwiperContainer()
{
    //creae swiper container 
    let swiper = document.createElement('div');
    //add swiper class 
    swiper.classList.add('swiper');
    //return swiper
    return swiper;
}
