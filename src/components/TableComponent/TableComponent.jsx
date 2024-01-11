import { Table } from "antd";
import Loading from "../LoadingComponent/Loading";
import { useState } from "react";

function TableComponent (props) {
    const { selectionType = 'checkbox', data:dataSource = [], isLoading = false, columns = [], handleDelteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKeys(selectedRowKeys);
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
      handleDelteMany(rowSelectedKeys)
    }
    
    return (
        <Loading isLoading={isLoading}>
          {rowSelectedKeys.length > 0 && (
            <div style={{
                backgroundColor: '#4096ff',
                color: '#fff',
                fontWeight: 'bold',
                padding: '10px',
                cursor: 'pointer'
            }}
                onClick={handleDeleteAll}
            >
               Xóa tất cả 
            </div>

          )}
 
        <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={dataSource}
            {...props}
          />
      </Loading>
  );
}

export default TableComponent;