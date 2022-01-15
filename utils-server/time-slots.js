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

const calculate_time_slot = function timeSlot(
  start_time,
  end_time,
  interval = "30"
) {
  var i, formatted_time;
  var time_slots = new Array();
  for (var i = start_time; i <= end_time; i = i + interval) {
    formatted_time = convertHours(i);
    time_slots.push(formatted_time);
  }

  console.log(time_slots);
  return time_slots;
};

// calculate_time_slot(parseTime(start_time), parseTime(end_time), 30);

module.exports = { calculate_time_slot, parseTime };
