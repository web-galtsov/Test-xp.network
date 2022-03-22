import React from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { Table } from "rsuite";
import fakeData from "./data.js";
import "rsuite/dist/rsuite.min.css";
import "./styles.css";

const { HeaderCell, Cell, Column } = Table;

const ItemTypes = {
    COLUMN: "column",
    ROW: "row"
};

function DraggableHeaderCell({ children, onDrag, id, ...rest }) {
    const ref = React.useRef(null);

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.COLUMN,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        drop(item, monitor) {
            onDrag(item.id, id);
        }
    });

    const [{ isDragging }, drag] = useDrag({
        item: { id, type: ItemTypes.COLUMN },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });
    const isActive = canDrop && isOver;

    drag(drop(ref));

    const styles = {
        padding: "0.6rem 1rem",
        cursor: "grab",
        opacity: isDragging ? 0 : 1,
        borderLeft: isActive ? "2px solid #2589f5" : null
    };

    return (
        <HeaderCell {...rest} style={{ padding: 0 }}>
            <div ref={ref} style={styles}>
                {children}
            </div>
        </HeaderCell>
    );
}

function Row({ children, onDrag, id, rowData, ...rest }) {
    const ref = React.useRef(null);

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.ROW,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        drop(item, monitor) {
            onDrag && onDrag(item.id, rowData.id);
        }
    });

    const [{ isDragging }, drag] = useDrag({
        item: { id: rowData.id, type: ItemTypes.ROW },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });
    const isActive = canDrop && isOver;
    drag(drop(ref));

    const styles = {
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
        background: isActive ? "#ddd" : null,
        width: "100%",
        height: "100%",
        borderTop: isActive ? "2px solid #2589f5" : null
    };

    return (
        <div ref={ref} style={styles}>
            {children}
        </div>
    );
}

function sort(source, sourceId, targetId) {
    const nextData = source.filter((item) => item.id !== sourceId);
    const dragItem = source.find((item) => item.id === sourceId);
    const index = nextData.findIndex((item) => item.id === targetId);

    nextData.splice(index, 0, dragItem);
    return nextData;
}

function DraggableTable() {
    /*   const [autoHeight, setAutoHeight] = React.useState(true);*/
    const [data, setData] = React.useState(
        fakeData.filter((item, index) => index < 100)
    );
    const [columns, setColumns] = React.useState([
        {
            name: 'מספר ת.ז',
            id: 'id_number',
            width: 148

        },
        {
            name: 'שם עובד',
            id: 'worker_name',
            width: 148
        },
        {
            name: "שעות חריגות",
            id: 'extraordinary_hours',
            width: 148
        },
        {
            name: 'שעות ידניות',
            id: 'manual_hours',
            width: 148
        },
        {
            name: 'שעות',
            id: 'hours',
            width: 148
        },
        {
            name: 'סך הכל שעות',
            id: 'total_hours',
            width: 148
        },
        {
            name: 'אפשרויות',
            id: 'options',
            width: 216
        },
    ]);

    const handleDragColumn = (sourceId, targetId) => {
        setColumns(sort(columns, sourceId, targetId));
    };

    const handleDragRow = (sourceId, targetId) => {
        setData(sort(data, sourceId, targetId));
    };

    return (
        <DndProvider backend={Backend}>
            <div className="container">
                <Table
                    height={420}
                    /*  autoHeight={autoHeight}*/
                    data={data}
                    bordered
                    rowKey="id"
                    renderRow={(children, rowData) => {
                        return rowData ? (
                            <Row
                                key={rowData.id}
                                rowData={rowData}
                                id={rowData.id}
                                onDrag={handleDragRow}
                            >
                                {children}
                            </Row>
                        ) : (
                            children
                        );
                    }}
                >
                    {columns.map((column) => (
                        <Column
                            width={column.width}
                            key={column.id}
                            flexGrow={column.flexGrow}
                        >
                            <DraggableHeaderCell onDrag={handleDragColumn} id={column.id}>
                                {column.name}
                            </DraggableHeaderCell>
                            <Cell dataKey={column.id} />
                        </Column>
                    ))}
                </Table>
            </div>
        </DndProvider>
    );
}

export default DraggableTable
