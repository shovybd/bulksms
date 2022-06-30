import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Table from "../../src/Components/SMSHistoryPage/Table";


const TableExample = () => {
  const columns = useMemo(
    () => [
      {
        Header: " ",
        columns: [
          {
            Header: "Number",
            accessor: "number",
          },
          {
            Header: "Message",
            accessor: "message",
          },
          {
            Header: "Sender",
            accessor: "sender",
          },
          {
            Header: "Message id",
            accessor: "messageId",
          },
          {
            Header: "Request id",
            accessor: "requestId",
          },
          {
            Header: "Send date",
            accessor: "sendDate",
          },
          {
            Header: "Delivered date",
            accessor: "deliveredDate",
          },
          {
            Header: "Send",
            accessor: "sendStatus",
          },
          {
            Header: "Delivered",
            accessor: "deliveredStatus",
          },
        ],
      },
    ],
    []
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("/smshistorydata.json");
      setData(result.data.data);
    })();
  }, []);
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default TableExample;
