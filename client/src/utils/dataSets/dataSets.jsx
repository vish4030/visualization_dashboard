

export const dataSets = (data) => {
  let yearObj ={}, topicObj ={},sectorObj={}, regionObj={}, sourceObj={}, countryObj={}, cityObj={};
  let filteredYear = [];
  let dataSetsObj = {
    years: { intensity: {}, likelihood: {}, relevance: {} },
    topics: { intensity: {}, likelihood: {}, relevance: {} },
    sectors: { intensity: {}, likelihood: {}, relevance: {} },
    regions: { intensity: {}, likelihood: {}, relevance: {} },
    source: { intensity: {}, likelihood: {}, relevance: {} },
    country: { intensity: {}, likelihood: {}, relevance: {} },
    city: { intensity: {}, likelihood: {}, relevance: {} },
  };
  let dataSetsObjArr = Object.keys(dataSetsObj);

  data.forEach((item) => {
    let year;
    if (item.published.length > 1)
        year = new Date(item.published).getFullYear();
    if (year != undefined) {
      if (yearObj[year] == undefined) {
        yearObj[year] = true;
        filteredYear.push(year);
      }
      dataSetsObjArr.forEach((dataTopic) => {
        if (dataSetsObj[dataTopic].intensity[year] == undefined) {
          dataSetsObj[dataTopic].intensity[year] = {
            arr: [item.intensity],
            sum: +item.intensity,
          };
          dataSetsObj[dataTopic].likelihood[year] = {
            arr: [item.likelihood],
            sum: +item.likelihood,
          };
          dataSetsObj[dataTopic].relevance[year] = {
            arr: [item.relevance],
            sum: +item.relevance,
          };
        } else {
          dataSetsObj[dataTopic].intensity[year].arr.push(item.intensity);
          dataSetsObj[dataTopic].intensity[year].arr.sum+= +item.intensity;

          dataSetsObj[dataTopic].intensity[year].arr.push(item.likelihood);
          dataSetsObj[dataTopic].intensity[year].arr.sum+= +item.likelihood;

          dataSetsObj[dataTopic].intensity[year].arr.push(item.relevance);
          dataSetsObj[dataTopic].intensity[year].arr.sum+= +item.relevance;
        }
      });
    }
  });
  filteredYear = filteredYear.sort((a,b)=>a-b);
  return {filteredYear, dataSetsObj};
};
