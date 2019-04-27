module.exports = (text, object) => {
// Regex that should match Griffin:. G: or any other brothers name (and Clint) even if misspelled
// /\[J|T|G|C][a-z]{0,6}\:
  if (text.includes('J:') || text.includes('Justin:')) {
    text = text.replace('J: ', '');
    text = text.replace('Justin:', '');
    object.quotes.justin.push(text);
  } else if (text.includes('T:') || text.includes('Travis:')) {
    text = text.replace('T: ', '');
    text = text.replace('Travis:', '');
    object.quotes.travis.push(text);
  } else if (text.includes('G:') || text.includes('Griffin:')) {
    text = text.replace('G: ', '');
    text = text.replace('Griffin:', '');
    object.quotes.griffin.push(text);
  } else if (text.length !== 0) {
    text = text.replace('[???]: ', '');
    object.quotes.unattributed.push(text);
  }
}