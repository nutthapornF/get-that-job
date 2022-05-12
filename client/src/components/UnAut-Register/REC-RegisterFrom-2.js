import styled from "@emotion/styled";

// Contexts
import { useUserData } from "../../contexts/usersData";

function RecRegisterForm2() {
  const {
    companyWebsite,
    setCompanyWebsite,
    about,
    setAbout,
    companyLogo,
    setCompanyLogo,
  } = useUserData();

  console.log(companyWebsite, about, companyLogo);

  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    setCompanyLogo({
      ...companyLogo,
      [uniqueId]: event.target.files[0],
    });
    console.log(companyLogo);
  };

  return (
    <Wrapper>
      <div>
        <Label1>
          {" "}
          YOU CAN COMPLETE THIS INFORMATION LATER BUT WE RECOMMENED YOU TO DO IT
          NOW{" "}
        </Label1>
        <br />
        <Label> COMPANY WEBSITE </Label>
        <br />
        <Input
          type="text"
          name="companyWebsite"
          value={companyWebsite}
          onChange={(event) => setCompanyWebsite(event.target.value)}
          placeholder="https://www.mycompany.sa"
          id="companyWebsite"
          rows={4}
          cols={30}
          required
        />
        <br />

        <Label> ABOUT THE COMPANY </Label>
        <br />
        <InputLimit
          type="text"
          name="about"
          value={about}
          onChange={(event) => setAbout(event.target.value)}
          placeholder="My Company SA has the vision to change thw way how..."
          id="about"
          rows={4}
          cols={30}
          minlength="5"
          required
        />
        <Limitation> Between 100 and 2000 characters </Limitation>
        <Label2>UPLOAD THE COMPANY LOGO</Label2>
        <UploadFileSection>
          <UploadButton htmlFor="uploadFile">
            <ChooseFile>Choose File</ChooseFile>
          </UploadButton>
          <Input
            id="uploadFile"
            name="logo"
            type="file"
            placeholder="Enter last name here"
            onChange={handleFileChange}
            accept="application/pdf"
            maxSize={5}
            hidden
          />
          <FileName>No file chosen</FileName>
        </UploadFileSection>
        <Limitation>Only PDF Max size 5MB</Limitation>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  background-color: #f5f5f6;
  position: relative;
`;

const Label = styled.label`
  font-family: var(--seconary-font);
  font-weight: 400;
  font-size: 10px;
  color: #373737;
`;

const Label1 = styled.label`
  font-family: var(--seconary-font);
  font-weight: 400;
  font-size: 10px;
  color: #616161;
`;
const Label2 = styled.label`
  font-family: var(--seconary-font);
  font-weight: 400;
  font-size: 10px;
  color: #616161;
`;

const Input = styled.input`
  width: 360px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--secoundary-brand-color);
  padding-left: 10px;
  padding-right: 10px;
  color: #8e8e8e;
`;
const Limitation = styled.p`
  font-family: var(--secondary-font);
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 1.5px;
  width: 380px;
  margin-top: 0px;
  color: #8e8e8e;
`;

const UploadButton = styled.label`
  margin-right: 15px;
  width: 134px;
  height: 35px;
  border-radius: 8px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  font-weight: 400;
  font-family: var(--secondary-font);
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
`;

const UploadFileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  letter-spacing: 1.25px;
`;

const ChooseFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FileName = styled.p`
  font-family: var(--secondary-font);
  font-weight: 400;
  color: #616161;
  font-size: 14px;
`;

const InputLimit = styled.textarea`
  width: 600px;
  height: 65px;
  border-radius: 8px;
  font-family: var(--secondary-font);
  border: 1px solid var(--secoundary-brand-color);
  padding-left: 10px;
  padding-right: 10px;
  color: var(--tertiary-text-color);
`;

export default RecRegisterForm2;