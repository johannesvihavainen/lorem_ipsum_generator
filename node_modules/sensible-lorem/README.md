# Sensible Lorem

Generate nearly meaningful random English sentence strings using real words!

## Installation

To install `sensible-lorem`, use npm:

```
npm i sensible-lorem
```

## Usage

To use the package in your project, require it and call the function with the desired word count:

(The argument of sensiLorem function specifies the number of words the generated string will contain)

```
const sensiLorem = require("sensible-lorem");

sensiLorem(10);
```

This will output a string of approximately 10 words that form coherent sentences.

## Features

### Realistic Sentences:

Generates sentences with real English words, making them suitable for placeholder text.

### Custom Word Counts:

Specify the number of words you want in the output.

### Diverse Sentence Structures:

Utilizes various grammatical structures for richer text.

### Contextual Word Matching:

Words are chosen to create more meaningful combinations.

### Example

Here’s an example of how to use sensible-lorem:

```
const sensiLorem = require("sensible-lorem");

console.log(sensiLorem(11));
// Output might be: "The curious cat quickly climbed the tall tree near the peaceful park"

```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any enhancements or bug fixes.

## Acknowledgments

Thanks to the contributors of the English language for providing the rich vocabulary that makes this package possible! <3
