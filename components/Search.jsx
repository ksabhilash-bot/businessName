"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useQueryStore from "@/store/queryStore";
import { toast } from "sonner";
import QuerDialog from "./QuerDialog";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const { setQuery, query } = useQueryStore();
  const [querydialog, setquerydialog] = useState(false);
  const handlekey = (e) => {
    setKeyword(e.target.value);
  };

  const handleButton = () => {
    if (!keyword) {
      return toast("Please enter an keyword");
    }
    setQuery({ keyword });
    setquerydialog(!querydialog);
  };
  return (
    <div className="flex flex-col md:flex-row gap-3 w-full md:w-[500px]">
      <Input
        onChange={handlekey}
        value={keyword}
        placeholder="Enter keyword..."
        className="p-3 h-[50px] text-white font-semibold text-xl flex-1"
      />

      <Button onClick={handleButton} className="text-xl px-6 h-[50px]">
        Generate
      </Button>
      <QuerDialog querydialog={querydialog} setquerydialog={setquerydialog} />
    </div>
  );
};

export default Search;
