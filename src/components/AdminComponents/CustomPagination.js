// import React from "react";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import ReactPaginate from "react-paginate";

// function CustomPagination({ currentPage, totalPages, handlePageChange }) {
//   return (
//     <div className="flex flex-row">
//       {totalPages > 1 && (
//         <>
//           <ReactPaginate
//             pageCount={totalPages}
//             onPageChange={handlePageChange}
//             containerClassName={"flex items-center space-x-4"}
//             previousLabel={<ChevronLeftIcon />}
//             nextLabel={<ChevronRightIcon />}
//             activeClassName={""}
//             previousClassName={
//               "bg-primary text-white w-7 h-7 items-center justify-center p-2 text-xl flex rounded"
//             }
//             nextClassName={
//               "bg-primary text-white w-7 h-7 items-center justify-center p-2 text-xl flex rounded"
//             }
//             pageClassName={"text-black"}
//             pageLinkClassName={"text-primary"}
//             breakClassName={"hidden"}
//             renderOnZeroPageCount={null}
//             breakLinkClassName={"px-8 py-1 bg-gray-200 text-gray-600 rounded"}
//           />
//           <div className="mx-2">
//             Page {currentPage + 1} of {totalPages}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default CustomPagination;

import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ReactPaginate from "react-paginate";

function CustomPagination({ currentPage, totalPages, handlePageChange }) {
	if (totalPages <= 1) return null;

	return (
		<div className="flex flex-row items-center">
			<ReactPaginate
				pageCount={totalPages}
				forcePage={currentPage}
				onPageChange={handlePageChange}
				containerClassName={"flex items-center space-x-4"}
				previousLabel={<ChevronLeftIcon className="bg-primary text-white p-1 rounded" size={28} />}
				nextLabel={<ChevronRightIcon className="bg-primary text-white p-1 rounded" size={28}/>}
				pageLinkClassName={"text-primary"}
				pageRangeDisplayed={2}
				marginPagesDisplayed={1}
				breakClassName={"px-1 text-gray-500"}
				breakLinkClassName={"cursor-pointer"}
				renderOnZeroPageCount={null}
			/>
			<div className="mx-3 font-medium text-sm">
				Page {currentPage + 1} of {totalPages}
			</div>
		</div>
	);
}

export default CustomPagination;
