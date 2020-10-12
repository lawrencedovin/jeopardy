// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespearsse", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

// {
//     "answer":"SEAL Team Six",
//     "question":"Chris Pratt, goofy Andy on \"Parks and Recreation\", played one of the members of this elite group in \"zero dark thirty\"",
//     "category":{
//        "title":"celebs"
//     }
//  }

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const response = await axios.get('http://jservice.io//api/categories', {params: {count: 5}});
    const {data} = response;
    // let categories = data.map((result) => {
    //     let category = result;
    //     return {

    //     }
    // });
    // let categoriesId = [];
    for(let category of data) {
        categories.push(category.id);
    }
    
    // console.log(categories);
    //return categoriesId;
}

// getCategoryIds();
// console.log(categories);


/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

 getCategoryIds();
 console.log(categories);


 async function getCategory(catId) {

    const response = await axios.get('http://jservice.io//api/category', {params: {id: `${catId}`}});
    const {clues} = response.data;
    //const {data} = response;
    // let title = response.data.title;

    // CLUES WORKS WITH MAP BECAUSE IT IS AN OBJECT
    // DATA DOESN'T WORK WITH MAP BECAUSE IT IS A SINGLE FIELD

    let cate = clues.map((result) => {
        let title = response.data.title;
        let cat = result;
        return {
            title: title,
            clues: [
                {question: cat.question, answer: cat.answer, showing: null}
            ]
        };
    });

    // let cate = response.map((result) => {
    //     let cat = result;
    //     return {
    //         title: cat.data.title,
    //         clues: [
    //             {question: cat.data.clues.question, answer: cat.data.clues.answer, showing: null}
    //         ]
    //     };
    // });

    // let categories = data.map((result) => {
    //     let category = result;
    //     return {
    //         title: category.title,
    //         clues: [
    //             {question: category.clues.question, answer: category.clues.answer, showing: null}
    //         ]
    //     };

    // });
    // console.log(catId) = 11531
    // return catId = Promise
    // In order to gain the Promise in the proper form it needs to be passed into an async function
    // console.log(cate);
    return cate;
    // return categories;
}

getCategory(11531);


/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODOs