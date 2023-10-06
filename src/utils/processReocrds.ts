export const ProcessRecords = (getdata: any) => {
  return getdata?.flatMap((eachDetail: any) => {
    let activitiesRecords = eachDetail?.eachDetail?.flatMap((item: any) => {
      let staydata = [];
      let tasteData = [];
      let experiencedata = [];
      let vibedata = [];
      if (item.stayImages.length > 0) {
        staydata = item.stayImages.flatMap((image: any) => {
          return {
            username: eachDetail.userId.username,
            image: image,
            title: eachDetail.title,
            activityid: eachDetail._id,
            daytitle: item.dayTitle,
            dayid: item._id,
            category: eachDetail.category,
            description: item.stayDescription,
            type: "stay",
          };
        });
      }
      if (item.tasteImages.length > 0) {
        tasteData = item.tasteImages.flatMap((image: any) => {
          return {
            username: eachDetail.userId.username,
            image: image,
            title: eachDetail.title,
            activityid: eachDetail._id,
            daytitle: item.dayTitle,
            dayid: item._id,
            category: eachDetail.category,
            description: item.tasteDescription,
            type: "taste",
          };
        });
      }
      if (item.experienceImages.length > 0) {
        experiencedata = item.experienceImages.flatMap((image: any) => {
          return {
            username: eachDetail.userId.username,
            image: image,
            title: eachDetail.title,
            activityid: eachDetail._id,
            daytitle: item.dayTitle,
            dayid: item._id,
            category: eachDetail.category,
            description: item.experienceDescription,
            type: "experience",
          };
        });
      }
      if (item.vibeImages.length > 0) {
        vibedata = item.vibeImages.flatMap((image: any) => {
          return {
            username: eachDetail.userId.username,
            image: image,
            title: eachDetail.title,
            activityid: eachDetail._id,
            daytitle: item.dayTitle,
            dayid: item._id,
            category: eachDetail.category,
            description: item.vibeDescription,
            type: "vibe",
          };
        });
      }
      return [...staydata, ...tasteData, ...vibedata, ...experiencedata];
    });
    return activitiesRecords;
  });
};
