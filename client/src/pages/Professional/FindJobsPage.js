import styled from "@emotion/styled";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
// Components
import FindThatJobHeader from "../../components/PRO-FindThatJob/FindThatJobHeader";
import CircularIndeterminate from "../../components/Utilities/CircularIndeterminate";
import BackDropLoading from "../../components/Utilities/BackDropLoading";
import JobCard from "../../components/SharedComponents/JobCard";
import AlertDialog from "../../components/Utilities/AlertDialog";
import Pagination from "@mui/material/Pagination";
// Contexts ----------------------
import { useJobsData } from "../../contexts/jobsData";
// Utils -----------------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";
// Hooks -----------------------------
function FindJobsPage() {
  const userRole = localStorage.getItem("role");
  // State for filter searching ----------------------------------
  const [searchJobText, setSearchJobText] = useState("");

  const [searchMinSalaryText, setSearchMinSalaryText] = useState("");
  const [searchMaxSalaryText, setSearchMaxSalaryText] = useState("");
  const [searchJobCategory, setsearchJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [keywordsNumber, setKeywordsNumber] = useState("");
  const { jobs, setJobs } = useJobsData();
  // Loading ----------------------------------
  const [isLoading, setIsLoading] = useState(false);
  // Pagination Start Here ----------------------------------
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalCompany, setTotalCompany] = useState(0);
  const [sum, setSum] = useState(0);

  const { componentDidMount } = UtilitiesFunction();
  // Fecth data from Back-End ---------------------------------
  const search = async () => {
    setIsLoading(true);
    const results = await axios.get(
      `http://localhost:4000/jobs?page=${page}&keywords=${searchJobText}&searchMinSalaryText=${searchMinSalaryText}&searchMaxSalaryText=${searchMaxSalaryText}&searchJobCategory=${searchJobCategory}&jobType=${jobType}`
    );
    setJobs(results.data.data);
    setTotalPages(results.data.total_pages);
    setSum(results.data.sum);
    setTotalJobs(results.data.total_jobs);
    /* setTotalCompany(results.data.total_Company); */

    setIsLoading(false);
  };

  useEffect(() => {
    search();
  }, [
    searchJobText,

    searchMinSalaryText,
    searchMaxSalaryText,
    searchJobCategory,
    jobType,
    page,
  ]);

  // render start here ----------------------------------------
  return (
    <Wrapper>
      <AlertDialog />
      {/*Header: filter box zone --------------------------------------- */}{" "}
      <FindThatJobHeader
        setSearchJobText={setSearchJobText}
        setSearchMinSalaryText={setSearchMinSalaryText}
        setSearchMaxSalaryText={setSearchMaxSalaryText}
        setsearchJobCategory={setsearchJobCategory}
        setJobType={setJobType}
        setKeywordsNumber={setKeywordsNumber}
        setIsLoading={setIsLoading}
        searchJobText={searchJobText}
        searchMinSalaryText={searchMinSalaryText}
        searchMaxSalaryText={searchMaxSalaryText}
        searchJobCategory={searchJobCategory}
        keywordsNumber={keywordsNumber}
        jobType={jobType}
      />
      {/*Body: job card zone --------------------------------------- */}{" "}
      <FindThatJobWrapper>
        <BackDropLoading />
        <JobsCounterNumber>{sum} jobs for you</JobsCounterNumber>
        {isLoading ? (
          <CircularIndeterminate />
        ) : (
          <FindThatJobGrid>
            {jobs.map((job, index) => {
              return (
                <JobCard
                  key={index}
                  jobTitle={job?.jobTitle}
                  companyName={job?.company[0]?.companyName}
                  jobCategory={job?.jobCategory}
                  jobType={job?.jobType}
                  minSalary={job?.minSalary}
                  maxSalary={job?.maxSalary}
                  companyDetail={job?.company}
                  jobId={job?._id}
                />
              );
            })}
          </FindThatJobGrid>
        )}
        {/*Pagination --------------------------------------- */}{" "}
        <NumberOfPage>
          <Pagination
            count={totalPages}
            showFirstButton
            showLastButton
            color="primary"
            defaultPage={page}
            onClick={componentDidMount}
            onChange={(event, value) => setPage(value)}
            sx={{ marginLeft: "-45px" }}
          />
        </NumberOfPage>
      </FindThatJobWrapper>
    </Wrapper>
  );
}

export default FindJobsPage;
const Wrapper = styled.section`
  width: 75vw;
  padding-left: 325px;
  margin-bottom: 100px;
`;

const JobsCounterNumber = styled.h1`
  padding: 15px 0;
  font-weight: 500;
  font-size: 1.25rem;
`;
const FindThatJobWrapper = styled.div`
  padding-top: 1rem;
`;
const FindThatJobGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px 0;
  width: 100%;
  padding-left: 10px;

  /*   display: ${(props) => (props.status ? "none" : null)};
 */
`;

const NumberOfPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;
