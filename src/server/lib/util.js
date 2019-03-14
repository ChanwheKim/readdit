const trimKeywords = (keywords) => {
  const newKeywords = [];

  keywords.forEach((word) => {
    let trimmedWord = word.replace(/[^a-zA-Z0-9\u3131-\uD79D]/g, '').toLowerCase();

    if (trimmedWord[0]) {
      trimmedWord = trimmedWord[0].toUpperCase() + trimmedWord.slice(1);
      newKeywords.push(trimmedWord);
    }
  });

  return newKeywords;
};

const filterJasonLdKeywords = (jsonLD) => {
  if (jsonLD) {
    let keywords = jsonLD.keywords;

    if (typeof keywords === 'string') {
      return keywords;
    }

    if (Array.isArray(jsonLD.keywords)) {
      if (jsonLD.keywords.join(' ').includes('Tag:')) {
        keywords = keywords.reduce((filteredWords, word) => {
          if (word.includes('Tag:')) {
            filteredWords.push(word.replace('Tag:', ''));
          }

          return filteredWords;
        }, []);
      }

      return keywords.join(' ');
    }
  }
};

module.exports = {
  trimKeywords,
  filterJasonLdKeywords
};
