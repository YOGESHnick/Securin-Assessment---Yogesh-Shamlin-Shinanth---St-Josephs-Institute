import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';

function CVEList() {
    const [cves, setCves] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        fetchCves(page, limit);
    }, [page, limit]);

    const fetchCves = async (page, limit) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cves?page=${page}&limit=${limit}`);
            setCves(response.data.docs);
            setTotalPages(response.data.totalPages);
            setTotalRecords(response.data.totalDocs); 
        } catch (error) {
            console.error('Error fetching CVE data:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(Number(event.target.value));
        setPage(1);
    };

    return (
        <div className="CVEList">
            <h1>CVE List</h1>
            <p>Total Records: {totalRecords}</p> {/* Display total records */}
            <table>
                <thead>
                    <tr>
                        <th>CVE ID</th>
                        <th>Source Identifier</th>
                        <th>Published Date</th>
                        <th>Last Modified Date</th>
                        <th>Vulnerability Status</th>
                    </tr>
                </thead>
                <tbody>
                    {cves.map(cve => (
                        <tr key={cve.cve_id}>
                            <td><Link to={`/cves/${cve.cve_id}`}>{cve.cve_id}</Link></td>
                            <td>{cve.sourceIdentifier}</td>
                            <td>{new Date(cve.published).toLocaleDateString()}</td>
                            <td>{new Date(cve.lastModified).toLocaleDateString()}</td>
                            <td>{cve.vulnStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
            <div className="limit-selector">
                <label>
                    Results per page:
                    <select value={limit} onChange={handleLimitChange}>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default CVEList;
