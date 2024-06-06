"use client";

import { Flowbite, Pagination, Table } from "flowbite-react";
import CustomTheme from "@/components/Theme";
import { OutcomeResponseDTO } from "@/entities/money-planner-api";
import formatCurrency from "@/helpers/currencyMask";
import formatDate from "@/helpers/dateMask";
import { useState } from "react";

interface CustomTableProps {
  data: OutcomeResponseDTO[];
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const CustomOutcomeTable = ({ data, totalPages, onPageChange }: CustomTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChangeInner = (page: number) => {
    setCurrentPage(page);
    onPageChange && onPageChange(page);
  };

  return (
      <Flowbite theme={{theme: CustomTheme}}>
        <div className="overflow-x-auto p-4">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Value</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Payment Method</Table.HeadCell>
              <Table.HeadCell>Bank</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((outcome, index) => (
                  <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {outcome.description}
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      {formatCurrency(outcome.value)}
                    </Table.Cell>
                    <Table.Cell>{formatDate(outcome.date)}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {outcome.category ? outcome.category.name : "-"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {outcome.paymentMethod.name}
                    </Table.Cell>
                    <Table.Cell>{outcome.bank.name}</Table.Cell>
                    <Table.Cell>
                      <a
                          href="#"
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="flex overflow-x-auto justify-center pb-2">
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChangeInner}
              showIcons
              previousLabel=""
              nextLabel=""
          />
        </div>
      </Flowbite>
  );
};

export default CustomOutcomeTable;
