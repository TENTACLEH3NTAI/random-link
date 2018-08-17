var linkList = [
  "google.com","reddit.com","amazon.com"
];

function links(options) {

  function link() {
    if (options && options.maxLength > 1) {
      return generateLinkWithMaxLength();
    } else {
      return generateRandomLink();
    }
  }

  function generateLinkWithMaxLength() {
    let rightSize = false;
    let linkUsed;
    while (!rightSize) {  
      linkUsed = generateRandomLink();
      if(linkUsed.length <= options.maxLength) {
        rightSize = true;
      }

    }
    return linkUsed;
  }

  function generateRandomLink() {
    return linkList[randInt(linkList.length)];
  }

  function randInt(lessThan) {
    return Math.floor(Math.random() * lessThan);
  }

  // No arguments = generate one link
  if (typeof(options) === 'undefined') {
    return link();
  }

  // Just a number = return that many links
  if (typeof(options) === 'number') {
    options = { exactly: options };
  }

  // options supported: exactly, min, max, join
  if (options.exactly) {
    options.min = options.exactly;
    options.max = options.exactly;
  }
  
  // not a number = one link par string
  if (typeof(options.linksPerString) !== 'number') {
    options.linksPerString = 1;
  }

  //not a function = returns the raw link
  if (typeof(options.formatter) !== 'function') {
    options.formatter = (link) => link;
  }

  //not a string = separator is a space
  if (typeof(options.separator) !== 'string') {
    options.separator = ' ';
  }

  var total = options.min + randInt(options.max + 1 - options.min);
  var results = [];
  var token = '';
  var relativeIndex = 0;

  for (var i = 0; (i < total * options.linksPerString); i++) {
    if (relativeIndex === options.linksPerString - 1) {
      token += options.formatter(link(), relativeIndex);
    }
    else {
      token += options.formatter(link(), relativeIndex) + options.separator;
    }
    relativeIndex++;
    if ((i + 1) % options.linksPerString === 0) {
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
// Export the link list as it is often useful
links.linkList = linkList;
