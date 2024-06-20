import React from 'react';

interface UserNameWithStarProps {
  name: string;
  isDonor: boolean;
}

const UserNameWithStar: React.FC<UserNameWithStarProps> = ({ name, isDonor }) => {
  return (
    <span>
      {name} {isDonor && '⭐'}
    </span>
  );
};

export default UserNameWithStar;
  {/* {isDonor && <img src="" alt="star" className="ml-2" />} */}