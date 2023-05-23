
//the parameter "time" is unix time stamp in seconds.
export function formatUnixTimeStamp(time) {
  //options set to the time zone of New York (Eastern Time)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/New_York',
  };

  //convert the Unix Timestamp from Seconds to Milliseconds
  const convertedCreatedAt = new Date(time * 1000);

  //formatting
  const formattedCreatedAt = convertedCreatedAt.toLocaleString('en-US', options);
  return formattedCreatedAt;
};