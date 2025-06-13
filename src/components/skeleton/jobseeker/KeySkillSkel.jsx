 

const KeySkillSkel = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="h-8 w-40 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-48 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-36 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default KeySkillSkel;
