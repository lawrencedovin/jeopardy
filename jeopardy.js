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

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  const response = await axios.get("http://jservice.io//api/categories", {
    params: { count: 5 },
  });
  const { data } = response;
  for (let category of data) {
    categories.push(category.id);
  }
}

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

async function getCategory(catId) {
  const response = await axios.get("http://jservice.io//api/category", {
    params: { id: `${catId}` },
  });
  const { data } = response;
  const { clues } = data;

  // CLUES WORKS WITH MAP BECAUSE IT IS AN OBJECT
  // DATA DOESN'T WORK WITH MAP BECAUSE IT IS A SINGLE FIELD

  let categories = clues.map((result) => {
    let title = data.title;
    let category = result;
    return {
      title: title,
      clues: [
        { question: category.question, answer: category.answer, showing: null },
      ],
    };
  });
  return categories;
}

getCategoryIds();

async function idk() {
  for (let id of categories) {
    console.log(await getCategory(id));
  }
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  const $title = $("<h1>");
  $title
    .addClass("text-center")
    .attr("id", "game-title")
    .text("Jeopardy");
  $("body").append($title);

  const $table = $("<table>").addClass("table table-bordered");
  const $thead = $('<thead>');
  const $theadrow = $('<tr>');
  for(let i = 0; i < 5; i++) {
      $theadrow.append('<th>title</th>');
  }
  // appending the same $th element
  $("body").append($table.append($thead.append($theadrow)));

//   $("body").append($table.append('peanuts'));    


//   <table class="table table-bordered">
//       <thead>
//         <tr>
//           <th>TOUGH-POURRI</th>
//           <th>KIDS RULE</th>
//           <th>LIGHTEN UP</th>
//           <th>"HOT" STUFF</th>
//           <th>PORT OF CALL</th>
//           <th>WORDS FOR YOUNGSTERS</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>?</td>
//           <td>?</td>
//           <td>?</td>
//           <td>?</td>
//           <td>?</td>
//           <td>?</td>
//         </tr>

}

fillTable();
/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODOs
