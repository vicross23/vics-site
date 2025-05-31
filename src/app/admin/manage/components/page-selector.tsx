"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import { pageSelectorOptions } from "~/app/admin/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const PageSelector = ({
  setSelectedPage,
}: {
  setSelectedPage: Dispatch<SetStateAction<undefined | string>>;
}) => {
  const selectOptions = useMemo(() => {
    return pageSelectorOptions.map((option) => (
      <SelectItem
        key={`page-select-option-${option.value}`}
        value={option.value}
      >
        {option.label}
      </SelectItem>
    ));
  }, []);
  return (
    <div className="w-full inline-flex gap-4 items-center place-content-center">
      <p className="shrink-0">Select a page:</p>
      <Select onValueChange={setSelectedPage}>
        <SelectTrigger className="min-w-28">
          <SelectValue placeholder="Select a page..." />
        </SelectTrigger>
        <SelectContent>{selectOptions}</SelectContent>
      </Select>
    </div>
  );
};

export default PageSelector;
