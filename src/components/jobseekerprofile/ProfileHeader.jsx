import { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBill } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileHeader = () => {
  const [profileData, setProfileData] = useState({
    userName: 'Not provided',
    userProfilePic: 'https://www.shareicon.net/data/128x128/2016/09/15/829466_man_512x512.png',
    address: 'Not provided',
    phone: 'Not provided',
    email: 'Not provided',
    jobTitle: 'Not provided',
    company: 'Not provided',
    isFresher: true,
    experience: 0,
    currentSalary: null,
    expectedSalary: null,
    noticePeriod: null,
    updatedAt: new Date().toISOString(),
    isPhoneVerified: false,
    isEmailVerified: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        toast.error('You are not logged in. Please log in to continue.');
        navigate('/login');
        return;
      }

      try {
        const { _id, phone, isPhoneVerified } = JSON.parse(userData);
        if (!_id) {
          toast.error('Invalid user data. Please log in again.');
          navigate('/login');
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}/job-seekers-basic-details/get-job-seeker-basic-by-id/${_id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        

        const { success, resData } = response.data;
        if (success && resData) {
          setProfileData({
            userName: resData.userName || 'Not provided',
            userProfilePic:
              resData.userProfilePic ||
              'https://www.shareicon.net/data/128x128/2016/09/15/829466_man_512x512.png',
            address: resData.address || 'Not provided',
            phone: resData.phone || phone || 'Not provided',
            email: resData.email || 'Not provided',
            jobTitle: resData.jobTitle || 'Not provided',
            company: resData.company || 'Not provided',
            isFresher: resData.isFresher !== undefined ? resData.isFresher : true,
            experience: resData.experience || 0,
            currentSalary: resData.currentSalary || null,
            expectedSalary: resData.expectedSalary || null,
            noticePeriod: resData.noticePeriod || null,
            updatedAt: resData.updatedAt || new Date().toISOString(),
            isPhoneVerified: isPhoneVerified || !!resData.phone,
            isEmailVerified: !!resData.email,
          });
          console.log('resData',resData);
          
        } else {
          toast.warn('No profile details found.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const formatUpdatedAt = (updatedAt) => {
    const date = new Date(updatedAt);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const formatExperience = (experience) => {
    if (!experience || experience === 0) return 'Not provided';
    const years = Math.floor(experience / 12);
    const months = experience % 12;
    return `${years ? `${years} Year${years > 1 ? 's' : ''}` : ''} ${months ? `${months} Month${months > 1 ? 's' : ''}` : ''}`.trim();
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Not provided';
    return `₹ ${salary.toLocaleString('en-IN')}`;
  };

  const formatNoticePeriod = (noticePeriod) => {
    if (!noticePeriod) return 'Not provided';
    return `${noticePeriod} Month${noticePeriod > 1 ? 's' : ''} notice period`;
  };

  if (isLoading) {
    return <div className="text-center p-6">Loading profile...</div>;
  }

  return (
    <div className="bg-cream rounded-xl shadow p-6 flex items-center gap-6">
      <div className="relative w-24 h-24">
        <img
          src={profileData.userProfilePic}
          alt="Profile"
          className="rounded-full w-full h-full object-cover border-4 border-green-500"
        />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 text-xs text-green-600 border border-green-600 rounded-full">
          100%
        </div>
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{profileData.userName}</h2>
            <p className="text-sm text-gray-600">{profileData.jobTitle}</p>
            <p className="text-sm text-gray-400">
              {profileData.company ? `at ${profileData.company}` : 'Not provided'}
            </p>
          </div>
          <p className="text-sm text-gray-400">
            Profile last updated –{' '}
            <span className="text-blue-600">{formatUpdatedAt(profileData.updatedAt)}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3  gap-4 mt-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <span>{profileData.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            <span>{formatExperience(profileData.experience)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBill className="text-gray-500" />
            <span>{formatSalary(profileData.currentSalary)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-gray-500" />
            <span>{profileData.phone}</span>
            {profileData.isPhoneVerified && <MdVerified className="text-green-600" />}
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            <span>{profileData.email}</span>
            {profileData.isEmailVerified && <MdVerified className="text-green-600" />}
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            <span>{formatNoticePeriod(profileData.noticePeriod)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;