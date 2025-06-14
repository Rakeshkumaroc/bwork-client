import Resume from "../../components/jobseekerprofile/Resume";
import KeySkills from "../../components/jobseekerprofile/KeySkills";
import Employment from "../../components/jobseekerprofile/Employment";
import Education from "../../components/jobseekerprofile/Education";
import ProfileLayout from "../../Layout/ProfileLayout";
import LanguageDetails from "../../components/jobseekerprofile/LanguageDetails";

const Profile = () => {
  return (
    <ProfileLayout>
      <Resume />
      <KeySkills />
      <Employment />
      <Education />
      <LanguageDetails />
    </ProfileLayout>
  );
};

export default Profile;
