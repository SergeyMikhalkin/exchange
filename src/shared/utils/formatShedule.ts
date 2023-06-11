export const formatShedule = (shedule: Array<string>): Array<string> => {
  const formatedValue = shedule.map((dayString) => {
    let formatedString: string = dayString;
    const sheduleTimeParts = dayString.slice(2).trim().split(' '); // '10 30 19 00' => ['10', '30', '19', '00']
    if (sheduleTimeParts.length > 0) {
      const shortDayString = dayString.slice(0, 2);

      if (sheduleTimeParts.length === 4) {
        formatedString = `${shortDayString} ${sheduleTimeParts[0]}:${sheduleTimeParts[1]}-${sheduleTimeParts[2]}:${sheduleTimeParts[3]}`;
      }
      if (sheduleTimeParts.length === 8) {
        formatedString = `${shortDayString} ${sheduleTimeParts[0]}:${sheduleTimeParts[1]}-${sheduleTimeParts[2]}:${sheduleTimeParts[3]} ${sheduleTimeParts[4]}:${sheduleTimeParts[5]}-${sheduleTimeParts[6]}:${sheduleTimeParts[7]}`;
      }
      return formatedString;
    }
    return dayString;
  });

  return formatedValue;
};
