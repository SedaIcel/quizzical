// const [selectedData, setSelectedData] = React.useState([]);
// const [isSelected, setIsSelected] = React.useState(false);

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// function insertRandomly(array, element) {
//   const newArray = [...array];
//   const index = Math.floor(Math.random() * (newArray.length + 1));
//   newArray.splice(index, 0, element);
//   return newArray;
// }

// const newData = triviaData.map((item) => {
//   return {
//     ...item,
//     id: nanoid(),
//     triviaAnswers: shuffleArray(
//       insertRandomly(item.incorrect_answers, item.correct_answer)
//     ),
//   };
// });

//console.log(newData)

// function handleClick(event) {
//   setSelectedData(
//     newData.map((item) => {
//       return item.question === event.target.name
//         ? {
//             ...item,
//             selectedAnswer: event.target.value,
//           }
//         : {
//             ...item,
//             selectedAnswer: "",
//           };
//     })
//   );
// }

// console.log(selectedData);

// const result = selectedData.filter(
//   (item) => item.correct_answer === item.selectedAnswer
// ).length;

// function checkAnswers() {
//     const
//    selectedData.map(item => {
//     if(item.selectedAnswer) {

//     }
//    })
// }

// });
//
