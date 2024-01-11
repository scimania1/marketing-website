"use client";
import { createUrl, range } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export enum PaginationItem {
  DOTS = "dots",
  NEXT = "next",
  PREV = "prev",
}

export type PaginationItemValue = number | PaginationItem;

export type PaginationProps = {
  /**
   * The total number of pages
   */
  totalPages: number;
  /**
   * The active page
   */
  currentPage: number;
  /**
   * The number of pages to show on each side of the current page
   * @default 1
   */
  siblings?: number;
  /**
   * The number of pages to be shown at the beginning and the end of pagination
   * @default 1
   */
  boundaries?: number;
  /**
   * If `true`, show the "prev" and "next" buttons
   * @default false
   */
  showControls?: boolean;
};

function getRange(
  totalPages: number,
  currentPage: number,
  siblings: number,
  boundaries: number,
): PaginationItemValue[] {
  /** lets say we are in the middle of the array, then there is
   * 1 middle guy + siblings on either side (2 * siblings) +
   * boundary elements on either side (2 * boundaries) + 2 dots
   */
  const arraySize = siblings * 2 + boundaries * 2 + 3;
  if (arraySize >= totalPages) {
    return range(1, totalPages);
  }
  const leftSiblingIdx = Math.max(currentPage - siblings, boundaries);
  const rightSiblingIdx = Math.min(
    currentPage + siblings,
    totalPages - boundaries + 1,
  );
  const leftDotsVisible = leftSiblingIdx > boundaries + 2;
  const rightDotsVisible = totalPages - boundaries + 1 - rightSiblingIdx > 2;

  if (leftDotsVisible && !rightDotsVisible) {
    const rightCount = arraySize - boundaries - 1;
    return [
      ...range(1, boundaries),
      PaginationItem.DOTS,
      ...range(rightCount, totalPages),
    ];
  }

  if (!leftDotsVisible && rightDotsVisible) {
    const leftCount = arraySize - boundaries - 1;
    return [
      ...range(1, leftCount),
      PaginationItem.DOTS,
      ...range(totalPages - boundaries + 1, totalPages),
    ];
  }

  return [
    ...range(1, boundaries),
    PaginationItem.DOTS,
    ...range(leftSiblingIdx, rightSiblingIdx),
    PaginationItem.DOTS,
    ...range(totalPages - boundaries + 1, totalPages),
  ];
}

type PaginationButtonsProps = {
  paginationItemValue: PaginationItemValue;
  currentPage: number;
  totalPages: number;
  idx: number;
  length: number;
};

function PaginationButton(props: PaginationButtonsProps) {
  const { paginationItemValue, currentPage, totalPages, idx, length } = props;
  const searchParams = useSearchParams();

  const prevHref = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${currentPage - 1}`);
    return createUrl("/products", params);
  }, [searchParams, currentPage]);

  const nextHref = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${currentPage + 1}`);
    return createUrl("/products", params);
  }, [searchParams, currentPage]);

  const dotsLeftHref = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${currentPage - Math.floor(length / 2)}`);
    return createUrl("/products", params);
  }, [searchParams, currentPage, length]);

  const dotsRightHref = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${currentPage + Math.floor(length / 2)}`);
    return createUrl("/products", params);
  }, [searchParams, currentPage, length]);

  const pageNumberHref = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${paginationItemValue}`);
    return createUrl("/products", params);
  }, [searchParams, paginationItemValue]);

  if (paginationItemValue === PaginationItem.PREV) {
    return (
      <PaginationPrevious
        href={prevHref}
        className={`${
          currentPage === 1
            ? "pointer-events-none text-muted-foreground/50"
            : ""
        }`}
        size="sm"
        aria-disabled={currentPage === 1}
      />
    );
  }
  if (paginationItemValue === PaginationItem.NEXT) {
    return (
      <PaginationNext
        href={nextHref}
        className={`${
          currentPage === totalPages
            ? "pointer-events-none text-muted-foreground/50"
            : ""
        }`}
        size="sm"
        aria-disabled={currentPage === totalPages}
      />
    );
  }
  if (paginationItemValue === PaginationItem.DOTS) {
    if (idx <= length / 2) {
      return (
        <PaginationLink href={dotsLeftHref} className="group h-9 w-9" size="sm">
          <MoreHorizontal className="h-4 w-4 block group-hover:hidden" />
          <ChevronsLeft className="h-4 w-4 hidden group-hover:block" />
          <span className="sr-only">
            Skip {`${Math.floor(length / 2)}`} Pages to the Left
          </span>
        </PaginationLink>
      );
    } else {
      return (
        <PaginationLink
          href={dotsRightHref}
          className="group h-9 w-9"
          size="sm"
        >
          <MoreHorizontal className="h-4 w-4 block group-hover:hidden" />
          <ChevronsRight className="h-4 w-4 hidden group-hover:block" />
          <span className="sr-only">
            Skip {`${Math.floor(length / 2)}`} Pages to the Right
          </span>
        </PaginationLink>
      );
    }
  }
  return (
    <PaginationLink
      href={pageNumberHref}
      isActive={paginationItemValue === currentPage}
      size="sm"
    >
      {paginationItemValue}
    </PaginationLink>
  );
}

export default function ProductPagination(props: PaginationProps) {
  const {
    totalPages,
    currentPage,
    siblings = 1,
    boundaries = 1,
    showControls = true,
  } = props;

  const paginationArray = useMemo(() => {
    let range = getRange(totalPages, currentPage, siblings, boundaries);
    if (!showControls) {
      return range;
    }
    return [PaginationItem.PREV, ...range, PaginationItem.NEXT];
  }, [totalPages, currentPage, siblings, boundaries, showControls]);

  return (
    <Pagination>
      <PaginationContent className="gap-0 sm:gap-1">
        {paginationArray.map((paginationItem, idx) => (
          <PaginationButton
            key={idx}
            idx={idx}
            length={paginationArray.length}
            paginationItemValue={paginationItem}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        ))}
      </PaginationContent>
    </Pagination>
  );
}
