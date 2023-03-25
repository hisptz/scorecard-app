import {Pagination} from "@dhis2/ui";
import {chunk} from "lodash";
import PropTypes from "prop-types";
import React, {useMemo, useState} from "react";

export default function PaginatedDisplay({
  pageSize = 8,
  scorecards = [],
  listComponent,
}) {
  const [page, setPage] = useState(0);
  const chunks = useMemo(
    () => chunk(scorecards, pageSize),
    [scorecards, pageSize]
  );
  const Component = listComponent;

  const onPageChange = (newPage) => {
    setPage(newPage - 1);
  };

  return (
    <div className="p-16 scorecard-list">
        <Component scorecards={chunks[page]}/>
        {chunks.length > 1 && (
            <div className="p-16">
                <Pagination
                    hidePageSizeSelect
                    total={scorecards.length}
                    pageCount={chunks.length}
                    pageSize={pageSize}
                    page={page + 1}
                    onPageChange={onPageChange}
            onPageSizeChange={() => {}}
          />
        </div>
      )}
    </div>
  );
}

PaginatedDisplay.propTypes = {
  listComponent: PropTypes.any.isRequired,
  pageSize: PropTypes.number.isRequired,
  scorecards: PropTypes.array.isRequired,
};
