//A global array that carrying course data
let courseData;
//getting some of the dom elements
coursesContainerDiv = document.querySelector(".courses-container");

//featching data
let fetchCourses = async ()=>{
    let response = await fetch("http://localhost:3000/courses");
    let json = await response.json();
    courseData = await json;
    await courseData.forEach(element =>addCourseElement(element));
   // await ();

}
fetchCourses();
function addCourseElement(element)
{
    //create course div
    let courseDiv = document.createElement('div');
    courseDiv.classList.add("one-course");

    //create image-container div
    let imageContainerDiv = document.createElement('div');
    imageContainerDiv.classList.add("course-div");

    //create img element
    let img = document.createElement('img');
    img.classList.add('course-img');
    img.setAttribute('src',element['image-src']);
    img.setAttribute('alt' ,element['alt']);

    //add image to the image-container div
    imageContainerDiv.appendChild(img);

    //add image container div to the course div
    courseDiv.appendChild(imageContainerDiv);

    //create course descriptio div
    let courseDescriptionDiv = document.createElement('div');
    courseDescriptionDiv.classList.add('course-description')

    //create course description header
    let courseDescriptionHeader = document.createElement('h4');
    courseDescriptionHeader.classList.add('one-course-header')
    courseDescriptionHeader.innerText = element['title'];

    //add course description header to coruse description
    courseDescriptionDiv.append(courseDescriptionHeader);

    //create course-author span
    let courseAuthorSpan = document.createElement('span');
    courseAuthorSpan.classList.add('course-author')
    courseAuthorSpan.innerText=element['author'];

    //add course author to course description
    courseDescriptionDiv.append(courseAuthorSpan);

    //create star container div
    let starContainerDiv = document.createElement('div');
    starContainerDiv.classList.add('star-container');

    //create course ratting value
    let courseRattingValue = document.createElement('div')
    courseRattingValue.classList.add('rating');
    courseRattingValue.innerText = element['rating'];

    //add course Ratting value div to star container
    starContainerDiv.appendChild(courseRattingValue);

    //create stars icons
    /*getting the rating number and knowing how many full stars are there
     and if there a half star or not and if there an empty star or not*/
    let numberOfStars = +element['rating'];
    let fullStars = Math.floor(numberOfStars);
    let emptyStars = 5-fullStars;
    let halfStar = false;

    if (numberOfStars-fullStars != 0){
        //checking for half star
        halfStar = true;
        emptyStars = 5-(fullStars+1);
    } 
    for (let i = 1 ; i <= fullStars; i++)
    {
        let starDiv = document.createElement('i')
        starDiv.classList.add('star');
        starDiv.classList.add('fa-solid');
        starDiv.classList.add('fa-star');

        //add star to star container 
        starContainerDiv.appendChild(starDiv);
    }
    if (halfStar)
    {
        let starDiv = document.createElement('i')
        starDiv.classList.add('star');
        starDiv.classList.add('fa-solid');
        starDiv.classList.add('fa-star-half-stroke');

        //add star to star container 
        starContainerDiv.appendChild(starDiv);
    }
    for (let i = 0 ; i < emptyStars; i++)
    {
        let starDiv = document.createElement('i')
        starDiv.classList.add('fa-star');
        starDiv.classList.add('fa-regular');
        starDiv.classList.add('empty-star');

        //add star to star container 
        starContainerDiv.appendChild(starDiv);
    }


    //add star container div to course description
    courseDescriptionDiv.appendChild(starContainerDiv);

    //create Price paragraph
    let priceParagraph = document.createElement('p')
    priceParagraph.classList.add('price-container')

    //create a span for the actual price
    let priceContainer = document.createElement('span')
    priceContainer.innerText = 'E£'+element['price'];

    //create a span for offer price if there is an offer
    if (element['offer'] =='1')
    {
        let offerPriceContainer = document.createElement('span')
        offerPriceContainer.classList.add('course-price');
        offerPriceContainer.innerText = 'E£'+element['offerPrice'];
        priceContainer.classList.add('delete-price');

        //add offer Price Container to Price paragraph
        priceParagraph.appendChild(offerPriceContainer);
    }
    else 
    {
        priceContainer.classList.add('course-price');
    }

    //add Actual Price to price Paragraph
    priceParagraph.appendChild(priceContainer);

    //add price Paragraph to course discription div
    courseDescriptionDiv.appendChild(priceParagraph);

    //add course desciption to course div
    courseDiv.appendChild(courseDescriptionDiv);

    //add course div to courses Container div
    coursesContainerDiv.appendChild(courseDiv);
    
}


//Select search button document
let searchButton = document.querySelector('.nav-form-button');
//add an action on click
searchButton.addEventListener('click' , searchCourse);

function searchCourse()
{
    //select search input
    let searchInput = document.querySelector('#search-input');
    let input = searchInput.value.toLowerCase();
    //clear searchInput text
    searchInput.value = "";
    //if searchinput is empty do nothing
    if (input.trim() == '' || courseData == undefined)return;
    
    //make an array for the data that will match the input
    let displayedElement = new Array();

    //go through all courses
    for (let i = 0 ; i < courseData.length;i++)
    {
        if (courseData[i]['title'].toLowerCase().includes(input)) {
            displayedElement.push(courseData[i]);
        }
    }
    //clear the course Container div
    coursesContainerDiv.innerText = "";

    if (displayedElement.length == 0)
    {//if the input dosen't match with any course display all courses
        courseData.forEach(element =>addCourseElement(element));
    }
    else 
    {//if atleast one course match the input data display it
        displayedElement.forEach(element =>addCourseElement(element));
    }
}

//Prevent the page from reload on submit
var navForm = document.getElementById("nav-form");
console.log(navForm);
function handleForm(event) { event.preventDefault(); } 
navForm.addEventListener('submit', handleForm);
