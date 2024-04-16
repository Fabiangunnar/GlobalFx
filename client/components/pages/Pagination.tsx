import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const Pagination = ({
  setCurrentPage,
  currentPage,
  postsPerPage,
  totalPosts,
}: any) => {
  const pageCount = Math.ceil(totalPosts / postsPerPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Box paddingInline={4} className="pagination">
        <Button
          fontSize={12}
          // className="btn"\

          onClick={handlePreviousPage}
          _hover={{
            background: "#64d2b1",
          }}
          color={"#fff"}
          size={"sm"}
          background="#55b598"
          isDisabled={currentPage === 1}>
          Prev
        </Button>

        <ul>
          <Text fontSize={14}>
            Page {currentPage} of {pageCount}
          </Text>
        </ul>
        <Button
          fontSize={12}
          _hover={{
            background: "#64d2b1",
          }}
          size={"sm"}
          color={"#fff"}
          background="#55b598"
          onClick={handleNextPage}
          isDisabled={currentPage === pageCount}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default Pagination;
