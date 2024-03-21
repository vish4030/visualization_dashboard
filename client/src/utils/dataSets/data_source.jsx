


export const data_source = (data) => {
    let topicObj = {};
    let filteredTopic = [];
    let dataSetsObj = {intensity: {}, likelihood: {}, relevance: {}};
  
    data.forEach((item) => {
       let topic = item.source;
      if (topic !== "") {
        if (topicObj[topic] == undefined) {
          topicObj[topic] = true;
          filteredTopic.push(topic);
        }
  
        if (dataSetsObj.intensity[topic] == undefined) {
          dataSetsObj.intensity[topic] = {
            arr: [item.intensity],
            sum: +item.intensity,
          };
          dataSetsObj.likelihood[topic] = {
            arr: [item.likelihood],
            sum: +item.likelihood,
          };
          dataSetsObj.relevance[topic] = {
            arr: [item.relevance],
            sum: +item.relevance,
          };
        } else {
          dataSetsObj.intensity[topic].arr.push(item.intensity);
          dataSetsObj.intensity[topic].arr.sum += +item.intensity;
  
          dataSetsObj.intensity[topic].arr.push(item.likelihood);
          dataSetsObj.intensity[topic].arr.sum += +item.likelihood;
  
          dataSetsObj.intensity[topic].arr.push(item.relevance);
          dataSetsObj.intensity[topic].arr.sum += +item.relevance;
        }
      }
    });
    let topic = filteredTopic.sort();
    return { topic, dataSetsObj };
  };
  