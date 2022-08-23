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

    //get displayed courses
    let displayedCourses = getDisplayedCourses();
    console.log(displayedCourses);

    //create Swipper wrapper
    let swiperWrapper = getSwiperWrapper();
    let swiperSlide = getSwiperSlide();
    for(let i = 1; i <= displayedCourses.length ;i++)
    {
        let card = createCard(displayedCourses[i-1]);
        swiperSlide.appendChild(card);
        if (i%5 == 0)
        {
            swiperWrapper.appendChild(swiperSlide);
            console.log(swiperSlide);
            swiperSlide = getSwiperSlide();
        }
    }

    let swiper = getSwiperContainer();

    swiper.appendChild(swiperWrapper);

    let swiperNext = swiperNextBtn();
    let swiperPrev = swiperPrevBtn();
    swiper.appendChild(swiperPrev);
    swiper.appendChild(swiperNext);
    // append swiper 
    subjectContainer.append(swiper);
    initSwiper();
    
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
    //add some classes
    subjectParagraph.classList.add('subject-paragraph');
    subjectParagraph.classList.add('col-lg-9');

    //get paragraph from data
    subjectParagraph.innerText = subjectsHeader[0][subjectName+"Paragraph"];
    
    //return subject Paragraph
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

function getSwiperWrapper(){
    
    //create swiper wrapper
    let swiperWrapper = document.createElement('div');

    //add swiper wrapper class
    swiperWrapper.classList = "swiper-wrapper";

    //return swiper Wrapper
    return swiperWrapper;

}
function getDisplayedCourses()
{
    let displayedCourses = new Array();
    //go through all courses
    for (let i = 0 ; i < courseData.length;i++)
    {
        if (courseData[i]['title'].toLowerCase().includes(subjectName)) {
            displayedCourses.push(courseData[i]);
        }
    }
    return displayedCourses;
}
function getSwiperSlide()
{
    //create div
    let swiperSlide = document.createElement('div');
    //add class
    swiperSlide.classList.add('swiper-slide');
    //return swiper slide
    return swiperSlide;
}
function createCard(element)
{
    //create card div
    let card = document.createElement('div');
    card.classList ="card m-1 w-25";

    // get card div img and append it
    let cardImgContainer = getCardImg(element);

    //------append card img------
    card.appendChild(cardImgContainer);

    //create card description
    let cardDescriptionDiv = document.createElement('div');
    cardDescriptionDiv.classList ="card-description";

    //create card header
    let cardHeader = getCardHeader(element);

    //------append card header------
    cardDescriptionDiv.appendChild(cardHeader);

    //get course author
    let courseAuthor = getCourseAuthor(element);

    //------append course author------
    cardDescriptionDiv.appendChild(courseAuthor);

    //rating and start
    let ratingandStars = getStarsAndRating(element);
    cardDescriptionDiv.appendChild(ratingandStars);

    //price
    let priceContainer = getPrice(element);
    cardDescriptionDiv.appendChild(priceContainer);

    //---append card description----
    card.appendChild(cardDescriptionDiv);
    return card;

}
function getCardImg(element)
{
    //creatre card img div
    let cardImgContainer = document.createElement('div');
    //add class to it
    cardImgContainer.classList ='card-img-top';
    
    //create card img
    let cardImg = document.createElement('img');
    cardImg.classList ="card-img";

    //set src and alt attributes 
    cardImg.setAttribute('src',element['image-src']);
    cardImg.setAttribute('alt' ,element['alt']);
    
    //--------append img element to card img container-------- 
    cardImgContainer.appendChild(cardImg);

    //return cardImgContainer
    return cardImgContainer;
}

function getCardHeader(element)
{
    //create h4 element
    let cardHeader = document.createElement('h4');
    //add class
    cardHeader.classList = "card-header";
    //get inner text from data
    cardHeader.innerText =element['title'];
    //return card header
    return cardHeader;

}

function getCourseAuthor(element)
{
    //create Course Author
    let courseAuthor = document.createElement('div');
    //add class
    courseAuthor.classList ="course-author";
    //add course author name from data
    courseAuthor.innerText=element['author'];
    //return course author
    return courseAuthor;
}
function getStarsAndRating(element)
{
    //rating stars container 
    let ratingAndStarsContainer = document.createElement('div');
    //add class
    ratingAndStarsContainer.classList ="rating-star-container";

    //rating span
    let rating = document.createElement('span');
    //rating class
    rating.classList="rating";
    //get rating data
    rating.innerText = element['rating'];
    //---------append rating------
    ratingAndStarsContainer.appendChild(rating);

    //create star container div
    let starContainerDiv = document.createElement('div');
    starContainerDiv.classList.add('star-container');

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

       //-------add star to star container----- 
       starContainerDiv.appendChild(starDiv);
   }
   if (halfStar)
   {
       let starDiv = document.createElement('i')
       starDiv.classList.add('star');
       starDiv.classList.add('fa-solid');
       starDiv.classList.add('fa-star-half-stroke');

       //------add star to star container-------- 
       starContainerDiv.appendChild(starDiv);
   }
   for (let i = 0 ; i < emptyStars; i++)
   {
       let starDiv = document.createElement('i')
       starDiv.classList.add('fa-star');
       starDiv.classList.add('fa-regular');
       starDiv.classList.add('empty-star');

       //--------add star to star container------- 
       starContainerDiv.appendChild(starDiv);
   }
   //--------append rating and stars container--------
   ratingAndStarsContainer.appendChild(starContainerDiv);

   return ratingAndStarsContainer;
}
function getPrice(element)
{
    let priceContainer = document.createElement('div');
    priceContainer.classList ="price-container";

    //create a span for the actual price
    let actualContainer = document.createElement('span')
    actualContainer.innerText = 'E£'+element['price'];

    //create a span for offer price if there is an offer
    if (element['offer'] =='1')
    {
        let offerPriceContainer = document.createElement('span')
        offerPriceContainer.classList.add('course-price');
        offerPriceContainer.innerText = 'E£'+element['offerPrice'];
        actualContainer.classList.add('delete-price');

        //add offer Price Container to Price paragraph
        priceContainer.appendChild(offerPriceContainer);
    }
    else 
    {
        actualContainer.classList.add('course-price');
    }
    priceContainer.appendChild(actualContainer);
    
    return priceContainer;
}

function swiperNextBtn(){
    let next = document.createElement('div');
    next.classList = "next";
    next.innerHTML ='<img src="./img/right-icon.png" alt="left icon" class="prev-next-img" />'
    return next;
}
function swiperPrevBtn()
{
    let prev = document.createElement('div');
    prev.classList = "prev";
    prev.innerHTML ='<img src="./img/left-icon.png" alt="left icon" class="prev-next-img" />'
    return prev;
}




// swiper 
function initSwiper(){
var makeSwiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    observer: true,
    observeParents: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
}
 
  