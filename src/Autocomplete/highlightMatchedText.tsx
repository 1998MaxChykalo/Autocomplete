export const highlightMatchedText = (str: string, textToMatch: string) => {
    const startIndex = str.toLowerCase().indexOf(textToMatch.toLowerCase());
    const endIndex = startIndex + textToMatch.length;
  
    return startIndex === -1 ? str : (
      <>
        {str.substring(0, startIndex)}
        <strong>{str.substring(startIndex, endIndex)}</strong>
        {str.substring(endIndex)}
      </>
    );
  };