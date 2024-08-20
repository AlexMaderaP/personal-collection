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

import { renderItemCell } from "./item-row";

import { SearchIcon } from "@/components/icons";
import { ItemForTable } from "@/types/items";
import { ItemKey, KEYS } from "@/utils/helpers/items";

type ItemsTableProps = {
  items: ItemForTable[];
  isOwnerOrAdmin: boolean;
};

export default function ItemsTable({ items, isOwnerOrAdmin }: ItemsTableProps) {
  const t = useTranslations("item.table");

  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredItems = [...items];

    if (hasSearchFilter) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredItems;
  }, [items, filterValue, hasSearchFilter]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const itemsPage = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const sortedItems = useMemo(() => {
    return [...itemsPage].sort((a: ItemForTable, b: ItemForTable) => {
      const first = a[sortDescriptor.column as keyof ItemForTable] as string;
      const second = b[sortDescriptor.column as keyof ItemForTable] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, itemsPage]);

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
      <TableBody emptyContent={"No items to display."} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(itemKey) => (
              <TableCell>
                {renderItemCell(item, itemKey as ItemKey, isOwnerOrAdmin)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
