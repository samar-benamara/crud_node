import Event from "../models/event.js";

export const addEvent = async (req, res) => {
  console.log("body", req.body);
  const event = new Event(req.body);
  await event.save();
  res.status(201).json({ model: event, message: " Success " });
};

export const getEventById = async (req, res) => {
  console.log("id", req.params.id);
  const event = await Event.findOne({ _id: req.params.id });
  res.status(201).json({ model: event, message: " Success " });
};

export const updateEvent = async (req, res) => {
  const event = await Event.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  res.status(200).json({ model: event, message: "Success" });
};
