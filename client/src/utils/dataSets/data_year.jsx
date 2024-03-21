export const data_year = (data) => {
  let yearObj = {};
  let filteredYear = [];
  let dataSetsObj = {intensity: {}, likelihood: {}, relevance: {}};

  data.forEach((item) => {
    let year;
    if (item.published.length > 1)
      year = new Date(item.published).getFullYear();
    if (year != undefined) {
      if (yearObj[year] == undefined) {
        yearObj[year] = true;
        filteredYear.push(year);
      }

      if (dataSetsObj.intensity[year] == undefined) {
        dataSetsObj.intensity[year] = {
          arr: [item.intensity],
          sum: +item.intensity,
        };
        dataSetsObj.likelihood[year] = {
          arr: [item.likelihood],
          sum: +item.likelihood,
        };
        dataSetsObj.relevance[year] = {
          arr: [item.relevance],
          sum: +item.relevance,
        };
      } else {
        dataSetsObj.intensity[year].arr.push(item.intensity);
        dataSetsObj.intensity[year].arr.sum += +item.intensity;

        dataSetsObj.intensity[year].arr.push(item.likelihood);
        dataSetsObj.intensity[year].arr.sum += +item.likelihood;

        dataSetsObj.intensity[year].arr.push(item.relevance);
        dataSetsObj.intensity[year].arr.sum += +item.relevance;
      }
    }
  });
  let topic = filteredYear.sort((a, b) => a - b);
  return { topic, dataSetsObj };
};
