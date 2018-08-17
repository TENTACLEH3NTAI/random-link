var linkList = [
  //list taken from https://theuselessweb.com/
		["http://heeeeeeeey.com/"],
		["http://tinytuba.com/"],
		["http://corndog.io/"],
		["http://thatsthefinger.com/"],
		["http://cant-not-tweet-this.com/"],
		["http://weirdorconfusing.com/"],
		["http://eelslap.com/"],
		["http://www.staggeringbeauty.com/"],
		["http://burymewithmymoney.com/"],
		["http://endless.horse/"],
		["http://www.fallingfalling.com/"],
		["http://just-shower-thoughts.tumblr.com/"],
		// ["http://ducksarethebest.com/"],
		["http://www.trypap.com/"],
		["http://www.republiquedesmangues.fr/"],
		["http://www.movenowthinklater.com/"],
		["http://www.partridgegetslucky.com/"],
		["http://www.rrrgggbbb.com/"],
		["http://beesbeesbees.com/"],
		["http://www.sanger.dk/"],
		["http://www.koalastothemax.com/"],
		["http://www.everydayim.com/"],
		["http://www.leduchamp.com/"],
		// ['http://www.haneke.net/',                                    false],
		["http://r33b.net/"],
		["http://randomcolour.com/"],
		["http://cat-bounce.com/"],
		["http://www.sadforjapan.com/"],
		["http://www.taghua.com/"],
		["http://isitwednesdaymydudes.ml/"],
		["http://metaphorsofinfinity.com/"],
		["http://chrismckenzie.com/"],
		["http://hasthelargehadroncolliderdestroyedtheworldyet.com/"],
		["http://ninjaflex.com/"],
		["http://iloveyoulikeafatladylovesapples.com/"],
		["http://ihasabucket.com/"],
		["http://corndogoncorndog.com/"],
		// ["http://www.ringingtelephone.com/"],
		["https://pointerpointer.com"],
		["http://imaninja.com/"],
		// ["http://willthefuturebeaweso.me/"],
		["http://www.ismycomputeron.com/"],
		["http://www.nullingthevoid.com/"],
		["http://www.muchbetterthanthis.com/"],
		["http://www.ouaismaisbon.ch/"],
		["http://www.yesnoif.com/"],
		["http://iamawesome.com/"],
		["http://www.pleaselike.com/"],
		["http://crouton.net/"],
		["http://corgiorgy.com/"],
		["http://www.electricboogiewoogie.com/"],
		["http://www.wutdafuk.com/"],
		["http://unicodesnowmanforyou.com/"],
		["http://www.crossdivisions.com/"],
		["http://tencents.info/"],
		["http://intotime.com/"],
		["http://leekspin.com/"],
		["http://minecraftstal.com/"],
		["http://www.patience-is-a-virtue.org/"],
		["http://whitetrash.nl/"],
		["http://www.theendofreason.com/"],
		["http://zombo.com"],
		["http://pixelsfighting.com/"],
		["http://baconsizzling.com/"],
		["http://isitwhite.com/"],
		["http://onemillionlols.com/"],
		["http://www.omfgdogs.com/"],
		["http://oct82.com/"],
		["http://semanticresponsiveillustration.com/"],
		["http://chihuahuaspin.com/"],
		// ['http://potato.io/',                false],
		["http://www.blankwindows.com/"],
		["http://www.biglongnow.com/"],
		["http://dogs.are.the.most.moe/"],
		["http://tunnelsnakes.com/"],
		["http://www.infinitething.com/"],
		["http://www.trashloop.com/"],
		["http://www.ascii-middle-finger.com/"],
		["http://www.coloursquares.com/"],
		// ['https://annoying.dog/', false],
		["http://spaceis.cool/"],
		// ["https://thebigdog.club/"],
		["http://buildshruggie.com/"],
		["http://buzzybuzz.biz/"],
		["http://yeahlemons.com/"],
		["http://burnie.com/"]
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
