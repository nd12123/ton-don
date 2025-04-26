// components/ui/table.tsx
"use client";
import React from "react";

export function Table({ className = "", ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={`w-full border-collapse text-sm ${className}`} {...props} />;
}

export function Thead({ className = "", ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={className} {...props} />;
}

export function Tbody({ className = "", ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props} />;
}

export function Tr({ className = "", ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`border-b last:border-b-0 ${className}`} {...props} />;
}

export function Th({ className = "", ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) {
  return <th className={`text-left font-medium p-3 bg-gray-100 ${className}`} {...props} />;
}

export function Td({ className = "", ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={`p-3 ${className}`} {...props} />;
}
