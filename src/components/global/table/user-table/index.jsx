"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useUser } from "@/store/hooks/useUser";

export default function EventTable() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const { users, loading, error, getAllUser } = useUser();

  useEffect(() => {
    getAllUser();
  }, []);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const currentPageUsers = users.slice(startIndex, startIndex + rowsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case "failure":
        return (
          <Badge className="bg-red-100 text-red-700 rounded-full px-3 border border-red-300">
            Failure
          </Badge>
        );
      case "success":
        return (
          <Badge className="bg-green-100 text-green-700 rounded-full px-3 border border-green-300">
            Success
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 rounded-full px-3 border border-gray-300">
            In Process
          </Badge>
        );
    }
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case "high":
        return (
          <Badge className="bg-red-200 text-red-800 rounded-full px-3 border border-red-300">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-200 text-yellow-800 rounded-full px-3 border border-yellow-300">
            Medium
          </Badge>
        );
      default:
        return (
          <Badge className="bg-green-200 text-green-800 rounded-full px-3 border border-green-300">
            Low
          </Badge>
        );
    }
  };

  return (
    <Card className="shadow-lg border border-gray-200 dark:border-zinc-700 rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-gray-200 dark:border-zinc-700">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Users
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-zinc-700">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-zinc-800">
                <TableHead className="font-semibold text-gray-600 dark:text-gray-300">
                  Type
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPageUsers.map((user, idx) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all 
                     border-b border-gray-200 dark:border-zinc-700"
                >
                  <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{getSeverityBadge(user.severity)}</TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {event.context?.url || "-"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(event.occurredAt.$date).toLocaleString()}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            {startIndex + 1} -{" "}
            {Math.min(startIndex + rowsPerPage, users.length)} of {users.length}{" "}
            rows
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="border-gray-300 dark:border-zinc-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="border-gray-300 dark:border-zinc-600"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
