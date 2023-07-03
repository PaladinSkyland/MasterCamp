import React from 'react';

const ToggleButton = ({ isChecked, value, handleChange }) => {
  
  return (
    <label className="flex items-center m-3">
      <div
        className={`mr-3 ${
          isChecked ? 'text-blue-200' : 'text-blue-500'
        } font-bold`}
      >
        {value[0]}
      </div>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
        />
        <div className="w-9 h-4 bg-gray-300 rounded-full shadow-inner">
          <div
            className={`absolute left-0 top-0 transition bg-blue-500 w-4 h-4 rounded-full shadow transform ${
              isChecked ? 'translate-x-5' : 'translate-x-0'
            }`}
          ></div>
        </div>
      </div>
      <div
        className={`ml-3 ${
          isChecked ? 'text-blue-500' : 'text-blue-200'
        } font-bold`}
      >
        {value[1]}
      </div>
    </label>
  );
};

export default ToggleButton;
