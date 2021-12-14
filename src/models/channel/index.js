import Channel from "./channelModel.js";

const channelFunc = {};

channelFunc.createChannel = async (newChannel) => {
  const channel = new Channel(newChannel);
  return await channel.save();
};

channelFunc.fetchByUserId = (id) => Channel.find({ createdBy: id });

export default channelFunc;
