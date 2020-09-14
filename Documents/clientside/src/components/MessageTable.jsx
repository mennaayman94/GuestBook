import React, { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default function MessageTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Tile", field: "title" },
      { title: "Message", field: "body" },
      { title: "Sent Date", field: "createdAt", type: "date" },
      { title: "Sent Time", field: "createdAt", type: "time" },
    ],
    data: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:9000/message/");

      setState({ columns: state.columns, data: result.data });
    };
    fetchData();
  }, []);
  async function addMessage(newmessage) {
    const result = await axios.post(
      "http://localhost:9000/message/add",
      newmessage
    );

    setState({ columns: state.columns, data: [...state.data, result.data] });
  }

  async function deleteMessage(id) {
    const result = await axios.delete(
      `http://localhost:9000/message/delete/${id}`
    );
    console.log(result.data);
    setState({ columns: state.columns, data: result.data });
  }

  async function editedMessage(id, editedMessage) {
    const result = await axios.patch(
      `http://localhost:9000/message/edit/${id}`,
      editedMessage
    );

    console.log(result.data.message);
    setState({ columns: state.columns, data: result.data });
  }

  return (
    <MaterialTable
      title="Messages"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newMessage) =>
          new Promise((resolve) => {
            resolve();
            addMessage(newMessage);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            const id = oldData._id;
            resolve();

            editedMessage(id, newData, oldData);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            const id = oldData._id;

            resolve();
            deleteMessage(id, oldData);
          }),
      }}
    />
  );
}
