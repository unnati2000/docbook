const TimingsForm = ({ day, timing, changeTiming }) => {
  return (
    <div className="my-2">
      <h2>{day}</h2>
      <div className="flex justify-between items-center space-x-4">
        <input
          type="time"
          placeholder="From"
          name="from"
          className="bg-gray-50 border p-1 my-2 rounded-md border-blue-500"
          value={timing.from}
          onChange={(e) => changeTiming({ ...timing, from: e.target.value })}
        />
        <input
          type="time"
          placeholder="To"
          name="to"
          className="bg-gray-50 border p-1 my-2 rounded-md border-blue-500"
          value={timing.to}
          onChange={(e) => changeTiming({ ...timing, to: e.target.value })}
        />
        <div className="flex justify-between items-center">
          <input
            type="checkbox"
            checked={timing.markAsHoliday}
            onChange={(e) =>
              changeTiming({ ...timing, markAsHoliday: e.target.checked })
            }
          />
          <p className="ml-2">Mark as Holiday</p>
        </div>
      </div>
    </div>
  );
};

export default TimingsForm;
