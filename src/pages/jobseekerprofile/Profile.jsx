 
import Resume from "../../components/jobseekerprofile/Resume";
import KeySkills from "../../components/jobseekerprofile/KeySkills";
import Employment from "../../components/jobseekerprofile/Employment";
import Education from "../../components/jobseekerprofile/Education";
import PersonalDetails from "../../components/jobseekerprofile/PersonalDetails";
import ProfileLayout from "../../Layout/ProfileLayout";

const Profile = () => {
  return (
    <ProfileLayout>
      <Resume />
      <KeySkills />
      <Employment />
      <Education />
      <PersonalDetails />
    </ProfileLayout>
  );
};

export default Profile;
