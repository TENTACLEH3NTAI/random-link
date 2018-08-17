var linkList = [
  "google.com","youtube.com","amazon.com","reddit.com"
];

function links(options) {

  function generateRandomWord() {
    return wordList[randInt(wordList.length)];
  }

  // Just a number = return that many words
  if (typeof(options) === 'number') {
    options = { exactly: options };
  }

  var total = options.min + randInt(options.max + 1 - options.min);
  var results = [];
  var token = '';
  var relativeIndex = 0;

  for (var i = 0; (i < total * options.wordsPerString); i++) {
    if (relativeIndex === options.wordsPerString - 1) {
      token += options.formatter(word(), relativeIndex);
    }
    else {
      token += options.formatter(word(), relativeIndex) + options.separator;
    }
    relativeIndex++;
    if ((i + 1) % options.wordsPerString === 0) {
      results.push(token);
      token = ''; 
      relativeIndex = 0;
    }
   
  }
  if (options.join) {
    results = results.join(options.join);
  }

  return results;
}

module.exports = links;
// Export the word list as it is often useful
links.linkList = wordList;
