function parseTime(s) {
  var c = s.split(":");
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}

function convertHours(mins) {
  var hour = Math.floor(mins / 60);
  var mins = mins % 60;
  var converted = pad(hour, 2) + ":" + pad(mins, 2);
  return converted;
}

function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

const calculate_time_slot = function timeSlot(start_time, end_time) {
  console.log("start time", start_time, "end time", end_time);
  var i, formatted_time;
  var time_slots = new Array();
  for (var i = start_time; i <= end_time; i = i + 30) {
    formatted_time = convertHours(i);
    console.log("formartted time", formatted_time);
    time_slots.push(formatted_time);
  }

  console.log("time slots", time_slots);
  return time_slots;
};

module.exports = { calculate_time_slot, parseTime };
