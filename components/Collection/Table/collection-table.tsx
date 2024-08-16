"use client";

import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/pagination";
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";

import { renderCollectionCell } from "./collection-row";

import { ColumnKey, KEYS } from "@/utils/helpers/collection";
import { CollectionForTable } from "@/types/collection";
import { SearchIcon } from "@/components/icons";

type CollectionTableProps = {
  collections: CollectionForTable[];
};

export default function CollectionTable({ collections }: CollectionTableProps) {
  const t = useTranslations("user.dashboard");

  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredCollections = useMemo(() => {
    let filteredCollections = [...collections];

    if (hasSearchFilter) {
      filteredCollections = filteredCollections.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredCollections;
  }, [collections, filterValue, hasSearchFilter]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(filteredCollections.length / rowsPerPage);

  const collectionsPage = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredCollections.slice(start, end);
  }, [page, filteredCollections]);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const sortedCollections = useMemo(() => {
    return [...collectionsPage].sort(
      (a: CollectionForTable, b: CollectionForTable) => {
        const first = a[
          sortDescriptor.column as keyof CollectionForTable
        ] as string;
        const second = b[
          sortDescriptor.column as keyof CollectionForTable
        ] as string;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      },
    );
  }, [sortDescriptor, collectionsPage]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder={t("search")}
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear]);

  return (
    <Table
      aria-label="Collection Table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
        {KEYS.map((key) => (
          <TableColumn
            key={key}
            {...(key === "name" ? { allowsSorting: true } : {})}
          >
            {t(key)}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent={"No collections to display."}
        items={sortedCollections}
      >
        {(collection) => (
          <TableRow key={collection.id}>
            {(columnKey) => (
              <TableCell>
                {renderCollectionCell(collection, columnKey as ColumnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
