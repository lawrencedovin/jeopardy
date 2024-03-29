const BASE_URL = "https://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES = 5;
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
  const response = await axios.get(`${BASE_URL}categories`, {
    params: { count: 1993 },
  });
  const { data } = response;
  let categoryIds = [];
  for (let category of data) {
    categoryIds.push(category.id);
  }
  return _.sampleSize(categoryIds, [(n = NUM_CATEGORIES)]);
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
  const response = await axios.get(`${BASE_URL}category`, {
    params: { id: `${catId}` },
  });
  const { data } = response;
  let cluesList = data.clues;

  let clues = cluesList.map((clue) => ({
    question: clue.question,
    answer: clue.answer,
    showing: null,
  }));

  return { title: data.title, clues };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  const $table = $("<table>").addClass("table table-bordered");
  const $thead = $("<thead>");
  const $theadrow = $("<tr>");
  const $tbody = $("<tbody>");

  for (let i = 0; i < NUM_CATEGORIES; i++) {
    $theadrow.append(`<th>${categories[i].title}</th>`);
  }

  for (let i = 0; i < NUM_CLUES; i++) {
    let $tbodyrow = $("<tr>");
    $tbody.append($tbodyrow);
    for (let j = 0; j < NUM_CATEGORIES; j++) {
      let $td = $(`<td>$${(i + 1) * 200}</td>`)
        .addClass("question-mark")
        .attr("id", `${j}-${i}`);
      $tbodyrow.append($td);
    }
  }
  $table.append($thead.append($theadrow));
  $table.append($tbody);
  $("body").prepend($table);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  let id = evt.target.id;
  let [categoryIndex, clueIndex] = id.split("-");
  let clueData = categories[categoryIndex].clues[clueIndex];
  if (clueData.showing === null) {
    clueData.showing = "question";
    $(this)
      .text(clueData.question)
      .removeClass("question-mark")
      .addClass("question");
  } else if (clueData.showing === "question") {
    clueData.showing = "answer";
    $(this)
      .text(clueData.answer)
      .removeClass("question-mark")
      .addClass("answer");
  } else return;
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  $("#loadingDiv").show();
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  $("#loadingDiv").hide();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  let categoryIds = await getCategoryIds();
  categories = [];
  for (let id of categoryIds) {
    categories.push(await getCategory(id));
  }
  fillTable();
  hideLoadingView();
}

/** On click of start / restart button, set up game. */
function resetGame() {
  showLoadingView();
  $("table").empty();
  setupAndStart();
}

function createResetButton() {
  const $buttonContainer = $("<div>").addClass(
    "button-container d-flex justify-content-center"
  );
  const $button = $("<button>RESET</button>")
    .addClass("btn btn-primary btn-lg")
    .attr("id", "reset-button");
  $($button).on("click", resetGame);
  $($buttonContainer).append($button);
  $("body").append($buttonContainer);
}

function createLoadingSpinner() {
  const $loadingContainer = $("<div>")
    .addClass("text-center")
    .attr("id", "loadingDiv");
  const $loadingMessage = $("<li>").addClass("fas fa-spinner fa-pulse fa-5x");
  $loadingContainer.append($loadingMessage);
  $("body").prepend($loadingContainer);
}

/** On page load, add event handler for clicking clues */
$(function () {
  setupAndStart();
  $("body").on("click", "td", handleClick);
  hideLoadingView();
  createResetButton();
  createLoadingSpinner();
});
