class SentenceGenerator {
  //  words
  #words = {
    moods: ["happy", "sad", "excited", "calm", "curious", "angry"],

    animalNouns: [
      "cat",
      "dog",
      "lion",
      "elephant",
      "rabbit",
      "bird",
      "shark",
      "whale",
      "tiger",
      "wolf",
    ],
    personNouns: [
      "teacher",
      "doctor",
      "engineer",
      "artist",
      "scientist",
      "child",
      "parent",
      "athlete",
      "driver",
    ],
    thingNouns: [
      "car",
      "phone",
      "book",
      "table",
      "computer",
      "lamp",
      "pen",
      "watch",
      "bicycle",
      "chair",
    ],
    placeNouns: [
      "city",
      "village",
      "forest",
      "mountain",
      "beach",
      "park",
      "restaurant",
      "school",
      "market",
    ],
    abstractNouns: [
      "idea",
      "truth",
      "love",
      "fear",
      "hope",
      "honor",
      "anger",
      "joy",
      "beauty",
      "justice",
    ],

    animalVerbs: [
      "run",
      "hunt",
      "fly",
      "crawl",
      "pounce",
      "swim",
      "roar",
      "chirp",
      "climb",
      "scratch",
    ],
    personVerbs: [
      "teach",
      "build",
      "study",
      "create",
      "help",
      "lead",
      "sing",
      "play",
      "read",
      "drive",
    ],
    thingVerbs: [
      "ring",
      "break",
      "shine",
      "open",
      "close",
      "fall",
      "move",
      "roll",
      "buzz",
      "click",
    ],
    placeVerbs: [
      "thrive",
      "bustle",
      "grow",
      "decline",
      "expand",
      "flourish",
      "shrink",
      "quiet",
    ],
    abstractVerbs: [
      "exist",
      "inspire",
      "believe",
      "create",
      "imagine",
      "feel",
      "learn",
      "dream",
      "reflect",
    ],

    animalSizes: ["big", "small", "huge", "tiny", "massive", "minute"],
    personSizes: ["tall", "short", "strong", "weak"],
    thingSizes: ["large", "compact", "bulky", "lightweight"],
    placeSizes: ["spacious", "cramped", "vast", "narrow"],
    abstractSizes: ["ample", "minimal"],

    animalColors: ["red", "blue", "green", "yellow", "purple", "white"],
    personColors: ["black", "gray", "orange"],
    thingColors: ["colorful", "monochrome"],
    placeColors: ["lush", "bare"],
    abstractColors: ["vibrant", "muted"],

    animalManner: [
      "quickly",
      "slowly",
      "carefully",
      "gracefully",
      "awkwardly",
      "boldly",
      "silently",
      "eagerly",
    ],
    personManner: ["quickly", "slowly", "patiently", "energetically", "calmly"],
    thingManner: ["smoothly", "noisily", "softly", "gently"],
    placeManner: ["quietly", "bustlingly", "peacefully"],
    abstractManner: ["freely", "gracefully"],

    personSubjects: ["I", "you", "he", "she", "it", "we", "they"],
    personObjects: ["me", "you", "him", "her", "it", "us", "them"],
    animalSubjects: ["he", "she", "it", "they"],
    thingSubjects: ["it", "they"],
    placeSubjects: ["it", "they"],
    abstractSubjects: ["it", "they"],

    prepositions: [
      "on",
      "in",
      "under",
      "over",
      "beside",
      "between",
      "around",
      "against",
      "through",
    ],

    conjunctions: [
      "and",
      "but",
      "or",
      "so",
      "because",
      "although",
      "while",
      "if",
      "since",
      "unless",
    ],
  };

  // sentence structures
  #sentenceStructures = [
    ["moods", "personSubjects", "personVerbs", "thingNouns"],
    ["animalNouns", "animalVerbs", "animalSizes"],
    ["thingNouns", "thingVerbs", "thingColors"],
    ["placeNouns", "placeVerbs", "placeSizes"],
    ["abstractNouns", "abstractVerbs", "abstractSizes"],

    // Adjective and Adverb Combinations
    ["thingSizes", "thingNouns", "thingVerbs", "thingManner"],
    ["animalColors", "animalNouns", "animalVerbs", "animalManner"],
    ["personSizes", "personNouns", "personVerbs", "personManner"],

    // Verb and Object Combinations
    ["personSubjects", "personVerbs", "thingNouns"],
    ["animalSubjects", "animalVerbs", "thingNouns"],
    ["thingNouns", "thingVerbs", "abstractNouns"],

    // Prepositional Phrases
    ["personSubjects", "personVerbs", "prepositions", "placeNouns"],
    ["animalNouns", "animalVerbs", "prepositions", "thingNouns"],

    // Conjunction and Compound Structures
    [
      "animalNouns",
      "animalVerbs",
      "conjunctions",
      "personSubjects",
      "personVerbs",
    ],

    // Including Pronouns
    [
      "personSubjects",
      "personVerbs",
      "thingManner",
      "prepositions",
      "placeNouns",
    ],

    // Questions
    ["questionWords", "personSubjects", "personVerbs", "thingNouns"],

    // Conditional Sentences
    ["personSubjects", "conjunctions", "animalNouns", "animalVerbs"],

    // More Complex Structures
    ["personSubjects", "personVerbs", "abstractNouns", "abstractVerbs"],

    // Combining Abstract Nouns with Other Elements
    [
      "abstractSubjects",
      "abstractVerbs",
      "thingManner",
      "prepositions",
      "thingNouns",
    ],
  ];

  // Method to generate sentences
  generateSentences(size) {
    if (typeof size !== "number") {
      throw new TypeError("Number of words should be a number.");
    }

    if (size < 1) {
      throw new RangeError("Number of words should be positive.");
    }

    size = parseInt(size);
    let sentences = [];
    let totalWords = 0;

    while (totalWords < size) {
      // Randomly select a sentence structure
      const structure =
        this.#sentenceStructures[
          Math.floor(Math.random() * this.#sentenceStructures.length)
        ];
      let sentence = this.#buildSentence(structure)
        .replace(/\s{2,}/g, " ")
        .trim();
      let sen = sentence.split(" ");
      const wordCount = sen.length;

      if (wordCount + totalWords > size) {
        let diff = wordCount + totalWords - size;
        sen = sen.slice(0, wordCount - diff);
        sentence = sen.join(" ");
      }
      sentences.push(sentence);
      totalWords += wordCount;
    }

    return sentences
      .join(" ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  // method to build a sentence based on the structure
  #buildSentence(structure) {
    return structure
      .map((part) => {
        if (Array.isArray(this.#words[part])) {
          return this.#getRandomWord(this.#words[part]);
        } else if (this.#words[part]) {
          return this.#getRandomWord(this.#words[part]);
        }
        return "";
      })
      .join(" ");
  }

  // Helper method to get a random word from an array
  #getRandomWord(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

function sensiLorem(size) {
  const generator = new SentenceGenerator();
  return generator.generateSentences(size);
}

module.exports = sensiLorem;
