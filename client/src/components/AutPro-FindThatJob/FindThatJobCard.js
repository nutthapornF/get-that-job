import styled from "@emotion/styled";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

// Pictures --------------------
import DollarLineIcon from "../../assets/money-dollar-circle-line.svg";
import CompanyIcon from "../../assets/building-3-line.svg";
import FocusIcon from "../../assets/focus.svg";
import CompanyLogo from "../../assets/placeholder/placeholder-company.jpg";
import CalendarIcon from "../../assets/calendar-2-line.svg";
// Contexts --------------------
import { useUserData } from "../../contexts/usersData";
import { useJobsData } from "../../contexts/jobsData";
// Contexts --------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";
//
function FindThatJobCard() {
  const { jobs, setJobs, searchJobText, setSearchJobText /* getJobs */ } =
    useJobsData();
  const { textUpperCase } = UtilitiesFunction();

  /* useEffect(() => {
    getJobs({ jobs });
  }); */
  /*   getJobs({ jobs }); */
  return (
    <Wrapper>
      <JobsCounterNumber>{jobs.length} jobs for you</JobsCounterNumber>
      <FindThatJobWrapper>
        {jobs.map((items, index) => {
          const { jobTitle, jobCategory, jobType, minSalary, maxSalary } =
            items;
          const newMinNumber = minSalary / 1000;
          const newMaxNumber = maxSalary / 1000;
          return (
            <JobCardWrapper className="shadow-medium" key={index}>
              <JobCardContent>
                <ContentLeft>
                  <CompanyLogoWrapper>
                    <CompanyLogoJa src={CompanyLogo}></CompanyLogoJa>
                  </CompanyLogoWrapper>
                </ContentLeft>
                <ContentRight>
                  <JobCategory>{jobCategory}</JobCategory>
                  <JobTitle>{jobTitle}</JobTitle>
                  <CompanyName>The Company Name</CompanyName>
                  <SubContentWrapper>
                    {" "}
                    <JobType>
                      <span className="mr-1">
                        <img src={CalendarIcon} />
                      </span>
                      {jobType}
                    </JobType>
                    <Salary>
                      <span className="mr-1">
                        <img src={DollarLineIcon} alt="DollarIcon" />
                      </span>
                      {newMinNumber.toFixed(1)}k - {newMaxNumber.toFixed(1)}k
                    </Salary>
                  </SubContentWrapper>
                </ContentRight>
              </JobCardContent>
              <JobCardFooter>
                <FollowCircle>
                  <FollowIcon src={FocusIcon}></FollowIcon>
                </FollowCircle>
                <FollowButton className="btn btn-white btn-md">
                  {textUpperCase("follow")}
                </FollowButton>
                <SeeMoreButton className="btn btn-white btn-md pink-border">
                  {textUpperCase("see more")}
                </SeeMoreButton>
              </JobCardFooter>
            </JobCardWrapper>
          );
        })}
      </FindThatJobWrapper>
    </Wrapper>
  );
}
export default FindThatJobCard;

//  CSS Zone --------------------------
const Wrapper = styled.section`
  padding-top: 1rem;
`;
const JobsCounterNumber = styled.h1`
  padding: 15px 0;
  font-weight: 500;
  font-size: 1.25rem;
`;

const FindThatJobWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px 0;
  width: 83%;
  padding-left: 10px;
`;

const JobCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 290px;
  padding: 16px;
  background-color: var(--white);
`;
const JobCardContent = styled.div`
  display: flex;
`;
const ContentLeft = styled.div`
  margin-right: 10.67px;
`;

const CompanyLogoWrapper = styled.div`
  width: 74.67px;
  height: 74.67px;
  overflow: hidden;
`;
const CompanyLogoJa = styled.img`
  object-fit: cover;
  width: 74.67px;
  height: 74.67px;
`;
const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 16px;
  width: 100%;
`;
const JobCategory = styled.p`
  font-family: var(--seconary-font);
  color: var(--light-gray);
  font-size: 0.75rem;
`;
const JobTitle = styled.h1`
  color: var(--primary-text-color);
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 28px;
`;
const CompanyName = styled.h3`
  color: var(--gray);
  font-weight: 500;
  font-size: 0.875rem;
`;
const SubContentWrapper = styled.div`
  display: flex;
  color: var(--light-gray);
  font-weight: 400;
  font-size: 0.75rem;
  margin-top: 5px;
`;
const JobType = styled.p`
  line-height: 16px;
  width: 50%;
  display: flex;
`;
const Salary = styled.p`
  font-family: var(--seconary-font);
  display: flex;
  justify-content: center;
`;
const JobCardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;
const FollowButton = styled.p`
  padding-left: 0;
  margin-left: -2px;
  cursor: pointer;
`;
const FollowCircle = styled.div`
  background-color: var(--secoundary-brand-color);
  border-radius: 50px;
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-weight: 500;
  cursor: pointer;
`;
const FollowIcon = styled.img``;
const SeeMoreButton = styled.button`
  &:hover {
    background-color: var(--secoundary-brand-color);
    color: white;
  }
`;
