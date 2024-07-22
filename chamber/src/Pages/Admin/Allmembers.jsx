import { useMemo, useState, useEffect } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Button, Modal } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

const toReadableHeader = (key) => {
  let result = key.replace(/(_[a-z])/g, (group) =>
    group.toUpperCase().replace("_", "")
  );
  result = result.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const Allmembers = () => {
  const [data, setData] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentFileUrl, setCurrentFileUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://192.168.169.77:8000/membershipform/",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(() => {
    const baseColumns = [];

    if (data.length > 0) {
      const keys = Object.keys(data[0]);

      keys.forEach((key) => {
        baseColumns.push({
          accessorKey: key,
          header: toReadableHeader(key),
        });
      });

      const fileFields = [
        "e_sign",
        "IncomeandExpenditure",
        "incometaxtpan",
        "FactoryRegistrationCertificate",
        "MemorandumArticleofAssociation",
        "GSTINRegistrationCopy",
        "IECodeCertificate",
        "ProfessionalCertificate",
        "CopyofLandDocument",
        "LandHolding",
        "passportsizephoto",
        "DirectorsPartners",
      ];

      fileFields.forEach((field) => {
        baseColumns.push({
          id: `${field}_view`,
          header: toReadableHeader(field),
          cell: ({ row }) =>
            row.original[field] ? (
              <Button
                leftIcon={<IconEye />}
                onClick={() => {
                  setCurrentFileUrl(row.original[field]);
                  setModalOpened(true);
                }}
              >
                View
              </Button>
            ) : null,
        });
      });
    }

    return baseColumns;
  }, [data]);

  const table = useMantineReactTable({
    columns,
    data,
    initialState: {
      pageIndex: 0,
      pageSize: 10,
    },
    manualPagination: false,
    manualSorting: false,
    manualFiltering: false,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    enableSorting: true,
    enablePagination: true,
    enableRowSelection: false,
    onPaginationChange: (pagination) => {
      console.log("Pagination changed:", pagination);
    },
    onSortingChange: (sorting) => {
      console.log("Sorting changed:", sorting);
    },
    onGlobalFilterChange: (filter) => {
      console.log("Global filter changed:", filter);
    },

    state: {
      globalFilter: "",
    },
  });

  return (
    <>
      <MantineReactTable table={table} />
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="File Viewer"
        size="lg"
      >
        {currentFileUrl && (
          <iframe
            src={currentFileUrl}
            title="File"
            style={{ width: "100%", height: "600px" }}
          />
        )}
      </Modal>
    </>
  );
};

export default Allmembers;
