// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
const path = require('path');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart() {
  // The text to synthesize
  const text = 'And then the grandmother came out alive as well. Then Little Red Riding Hood fetched some large heavy stones. They filled the wolf’s body with them, and when he woke up and tried to run away, the stones were so heavy that he fell down dead.';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'MALE'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  console.log(response.audioContent);
  await writeFile(path.join("server/data/Thanh11/audio/reading.mp3"), response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
quickStart();