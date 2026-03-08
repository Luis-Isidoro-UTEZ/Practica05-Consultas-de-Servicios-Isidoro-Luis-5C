import '../css/DataTable.css';

function DataTable({ headers, data, renderActions }) {
    return (
        <div className="table-container">
            <table className="md-table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        {renderActions && <th style={{ textAlign: 'center' }}>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id || index}>
                            {Object.keys(item).map((key, i) => {
                                if (typeof item[key] === 'object' && item[key] !== null) return null;
                                return <td key={i}>{item[key]}</td>;
                            })}
                            {item.name && (
                                <td>{item.name.firstname} {item.name.lastname}</td>
                            )}
                            {renderActions && (
                                <td style={{ textAlign: 'center' }}>
                                    {renderActions(item)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
