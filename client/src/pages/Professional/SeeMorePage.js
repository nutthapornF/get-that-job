import styled from "@emotion/styled";
import axios from "axios";
import _ from "lodash";
//Contexts ------------------------------------
import { useJobsData } from "../../contexts/jobsData";
import { useNav } from "../../contexts/navigate";
// Hooks --------------------------------------
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
//Components ------------------------------------
import CompanyHeader from "../../components/SharedComponents/CompanyHeader";
import JobDetails from "../../components/SharedComponents/JobDetails";
// Pictures -------------------------------------
import NavigationIcon from "../../assets/navigation-line.svg";

function SeeMorePage() {
  // เก็บเอา userId และ jobId จาก localStorage เพื่อเอาไปใช้ต่อ
  const professionalId = localStorage.getItem("id");
  const jobId = localStorage.getItem("jobId");
  // -----------------------------------------------------
  const navigate = useNavigate();
  const { job, setJob } = useJobsData();
  const { setMenuIndex } = useNav();

  // ดีงข้อมูลงานมาแสดง ----------------------------------
  const getOneJob = async () => {
    try {
      const results = await axios.get(`http://localhost:4000/jobs/${jobId}`);
      setJob(results.data.data);
    } catch (error) {
      console.log(error);
    }
    return {
      job,
    };
  };

  useEffect(() => {
    getOneJob();
    let timeOut;
    if (job) {
      timeOut = setTimeout(job, 1000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  // fx สร้างใบสมัครงาน ----------------------------------
  const createApplication = async (data) => {
    await axios.post("http://localhost:4000/applications/create", data);
  };

  // Check user condition ว่ามีเอกสารและข้อมูลสำหรับสมัครงานมั้ย -------------------------
  const { data, reFetch } = useFetch(
    `http://localhost:4000/users/${professionalId}`
  );
  const checkUserProfile = async () => {
    // fx ส่งข้อมูลใบสมัครไป Back-End -----------------------
    const handleSubmit = () => {
      const applicationStatus = [
        "applied",
        "reviewing",
        "declined",
        "finished",
      ];
      const randomStatus =
        applicationStatus[Math.floor(Math.random() * applicationStatus.length)];

      /* event.preventDefault(); */ // <- ใส่มาแล้วบึ้มเลย
      const data = {
        professionalId,
        jobId,
        appliedDate: Date.now(),
        applicationStatus: randomStatus,
      };
      createApplication(data);
    };

    if (
      data?.cvFiles?.[0] === undefined ||
      data?.phone === "" ||
      data?.phone === "-" ||
      data?.name === "" ||
      data?.name === "-"
    ) {
      alert(
        "Please upload your cv file, fill your name and phone before apply a job. "
      );
      navigate("/profile");
    } else {
      handleSubmit();
      alert(
        `Congratulation! You already applied ${job?.jobTitle}!\nRedirect to your applications in 5 secound...(ตอนนี้ยังไม่ได้ทำ)`
      );
      setMenuIndex(2);
      reFetch();
      navigate("/applications");
    }
  };
  // fx ปุ่มเปลี่ยนสถานะได้ ถ้าสมัครงานเข้ามา -------------------------------
  const applyNowBtn = () => {
    const applicationsData = data?.applications;
    let status = null;
    const result = applicationsData?.filter((item) => {
      return item.jobId === jobId;
    });
    if (result?.length > 0) {
      status = false;
    } else {
      status = true;
    }
    const button = (color, text, status) => {
      return (
        <button
          className={`btn btn-lg ${color} uppercase`}
          onClick={checkUserProfile}
          disabled={status}
        >
          <span>
            <img className="mr-2" src={NavigationIcon} alt="Navigation Icon" />
          </span>
          {text}
        </button>
      );
    };
    if (status) {
      return button("btn-pink", "Apply Now", false);
    } else {
      return button("btn-gray", "Applied", true);
    }
  };
  const contentData = [
    { title: "About The company name SA", content: job?.company?.[0].about }, // aboutCompany
    { title: "About the job position", content: job?.aboutJob }, // aboutJob
    { title: "Mandatory Requirements", content: job?.mandatoryReq }, // mandatoryReq
    { title: "Optional Requirements", content: job?.optionalReq }, // optionalReq
  ];

  return (
    <Wrapper>
      <Header>
        {/*โซนแสดงข้อมูลบริษัท Start Here -----------------------------  */}
        <CompanyWrapper>
          <HeaderLeft>
            <CompanyHeader />
          </HeaderLeft>
          <HeaderRight>{applyNowBtn()}</HeaderRight>
        </CompanyWrapper>
        {/*โซนแสดงข้อมูลงาน Start Here -----------------------------  */}
        <HeaderTitleWrapper>
          <JobDetails />
        </HeaderTitleWrapper>
      </Header>
      {/*โซนแสดงรายละเอียดงาน Start Here -----------------------------  */}
      <ContentWrapper>
        {contentData.map((items, index) => {
          const { title, content } = items;
          return (
            <ContentBox key={index}>
              <ContentHeading className="text-pinkprimary">
                {title}
              </ContentHeading>
              {content}
            </ContentBox>
          );
        })}
        <ContentFooter>{applyNowBtn()}</ContentFooter>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 75%;
  padding: 25px 0;
  margin-left: 350px;
`;
const Header = styled.section`
  display: flex;
  flex-direction: column;
`;
const CompanyWrapper = styled.div`
  display: flex;
`;

const HeaderLeft = styled.div`
  width: 80%;
`;
const HeaderRight = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const HeaderTitleWrapper = styled.div`
  padding: 45px;
`;
const ContentWrapper = styled.section``;
const ContentBox = styled.div`
  width: 80%;
  margin: 10px 0;
`;

const ContentHeading = styled.h3`
  font-size: 1.5rem;
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

export default SeeMorePage;
