

export default function dataSets(data) {
  let obj = {};
  let filteredYear = [];
  let datasetObj = {
    intensity: {},
    likelihood: {},
    relevance: {},
  };
  data.forEach((item) => {
    let year;
    if (item.published.length > 1)
      year = new Date(item.published).getFullYear();
    if (year != undefined) {
      if (obj[year] == undefined) {
        obj[year] = true;
        filteredYear.push(year);
      }
      if (datasetObj.intensity[year] == undefined) {
        datasetObj.intensity[year] = {
          arr: [item.intensity],
          sum: +item.intensity,
        };
        datasetObj.likelihood[year] = {
          arr: [item.likelihood],
          sum: +item.likelihood,
        };
        datasetObj.relevance[year] = {
          arr: [item.relevance],
          sum: +item.relevance,
        };
      } else {
        datasetObj.intensity[year].arr.push(item.intensity);
        datasetObj.intensity[year].sum += +item.intensity;
        datasetObj.likelihood[year].arr.push(item.likelihood);
        datasetObj.likelihood[year].sum += +item.likelihood;
        datasetObj.relevance[year].arr.push(item.relevance);
        datasetObj.relevance[year].sum += +item.relevance;
      }
    }});
    filteredYear = filteredYear.sort((a,b)=>a-b)
    return {filteredYear, datasetObj}
}
