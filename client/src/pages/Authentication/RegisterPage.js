import styled from "@emotion/styled";
// Images
import image from "../../img/discussing.png";
//Contexts
import { useAuth } from "../../contexts/authentication";
import { useUserData } from "../../contexts/usersData";
// Components
import MainRegisterForm from "../../components/UnAut-Register/MainRegisterForm";
import SelectRole from "../../components/UnAut-Register/SelectRole";
import AlertNotification from "../../components/Utilities/AlertNotification";
import RoleStepsBox from "../../components/UnAut-Register/RoleStepsBox";
import RegFormButton from "../../components/UnAut-Register/RegFormButton";
function RegisterPage() {
  const {
    // Shared state between Professional & Recruiter -----------------------------------------
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmed,
    setPasswordConfirmed,
    role,
    setRole,
    // State Only for Professional -----------------------------------------
    name,
    setName,
    phone,
    setPhone,
    birthDate,
    setBirthDate,
    linkedin,
    setLinkedin,
    title,
    setTitle,
    experience,
    setExperience,
    education,
    setEducation,
    uploadFiles,
    setUploadFiles,
    userAppiedJobs,
    userFollowJobs,
    // State Only for Recruiter -----------------------------------------
    companyName,
    setCompanyName,
    companyWebsite,
    setCompanyWebsite,
    about,
    setAbout,
    companyLogo,
    setCompanyLogo,
    // Others -------------------------------------
    setRoleBtn,
    // This Zone is for Register form vadilate only -------------------------------------
    step,
    setStep,
    isErrorEmail,
    setIsErrorEmail,
    isErrorPassword,
    setIsErrorPassword,
    nextFormPasswordChecker,
  } = useUserData();

  const { register, login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === "professional") {
      setRole("professional");
      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);
      formData.append("passwaordConfirmed", passwordConfirmed);
      formData.append("role", role);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("birthDate", birthDate);
      formData.append("linkedin", linkedin);
      formData.append("title", title);
      formData.append("experience", experience);
      formData.append("education", education);
      formData.append("userAppiedJobs", userAppiedJobs);
      formData.append("userFollowJobs", userFollowJobs);

      for (let uploadFileKey in uploadFiles) {
        formData.append("cvFile", uploadFiles[uploadFileKey]);
      }
      register(formData);
      /*       login({
        email,
        password,
      }); */
      setEmail("");
      setPassword("");
      setPasswordConfirmed("");
      setRole("");
      setName("");
      setPhone("");
      setBirthDate("");
      setLinkedin("");
      setTitle("");
      setExperience("");
      setEducation("");
      setUploadFiles("");
    } else if (role === "recruiter") {
      setRole("recruiter");
      const formData = new FormData();

      formData.append("companyName", companyName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("companyWebsite", companyWebsite);
      formData.append("about", about);
      formData.append("companyLogo", companyLogo);

      for (let uploadFileKey in uploadFiles) {
        formData.append("logoFile", uploadFiles[uploadFileKey]);
      }
      register(formData);
      /*       login({
        email,
        password,
      }); */
      setCompanyName("");
      setCompanyWebsite("");
      setAbout("");
      setCompanyLogo("");
    }

    setStep(0);
    setRoleBtn("professional");
    setRole("professional");
  };

  return (
    <Wrapper>
      <LeftBox>
        <form
          className="professional-register-form"
          id="register-form"
          onSubmit={handleSubmit}
        >
          <Detail>
            <Progressbar>
              <Title>Good choice!</Title>
              <Caption className="mb-4">Create a new account as...</Caption>
              <h1>{`Current Role is: ${role}`}</h1>
              <h1>{`Current Step is: ${step}`}</h1>
              <SelectRole />
              {role === "professional" ? (
                <RoleStepsBox userRole={"Personal"} />
              ) : (
                <RoleStepsBox userRole={"Company"} />
              )}

              {/*แจ้งเตือนเมื่อ user ไม่ใส่ email*/}
              {isErrorEmail ? (
                <AlertNotification text="Please enter valid email address" />
              ) : null}
              {/*แจ้งเตือนเมื่อ user ไม่ใส่ Password*/}
              {isErrorPassword ? (
                <AlertNotification text="Please verify and re-enter your password" />
              ) : null}

              <MainRegisterForm userRole={role} />
              <RegFormButton />
            </Progressbar>
          </Detail>
        </form>
        <FormWrapper></FormWrapper>
      </LeftBox>

      <RightBox>
        <BorderImage>
          <GirlImage src={image} alt="Girl"></GirlImage>
        </BorderImage>
      </RightBox>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: row;
  background-color: #f5f5f6;
  position: relative;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  margin: 6rem 0 0 0;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 228px;
`;

const Title = styled.h1`
  color: var(--primary-text-color);
  font-family: var(--primary-font);
  font-weight: 400;
  font-size: 48px;
`;

const Progressbar = styled.div`
  width: 70%;
`;

const Caption = styled.h3`
  color: var(--primary-text-color);
  font-family: var(--primary-font);
  font-weight: 500;
  font-size: 20px;
  margin-top: 20px;
`;

const LeftBox = styled.div`
  width: 60%;
`;

const RightBox = styled.div`
  width: 40%;
  display: flex;
  align-items: end;
`;

const GirlImage = styled.img`
  width: 120%;
`;

const BorderImage = styled.div`
  width: 435px;
`;

/* 
const NextPageButton = styled.button`
  width: 106px;
  height: 40px;
  border-radius: 16px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
  font-family: var(--secondary-font);
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
`;

const SkipButton = styled.button`
  width: 106px;
  height: 40px;
  border-radius: 16px;
  border: 1px solid var(--secoundary-brand-color);
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
  font-family: var(--secondary-font);
  cursor: pointer;
  margin: 0 16px;
  color: #616161;
  background-color: #f5f5f6;
`;

const FinishButton = styled.button`
  width: 106px;
  height: 40px;
  border-radius: 16px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
  font-family: var(--secondary-font);
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
`;

const PreviousButton = styled.button`
  width: 131px;
  height: 40px;
  border-radius: 16px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
  font-family: var(--secondary-font);
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
`; */

export default RegisterPage;
