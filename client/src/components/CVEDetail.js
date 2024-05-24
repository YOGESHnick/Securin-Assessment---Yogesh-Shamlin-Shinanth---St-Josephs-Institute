import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CVEDetail() {
    const { id } = useParams();
    const [cve, setCve] = useState(null);

    useEffect(() => {
        fetchCveDetails(id);
    }, [id]);

    const fetchCveDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cves/${id}`);
            setCve(response.data);
        } catch (error) {
            console.error('Error fetching CVE details:', error);
        }
    };

    if (!cve) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>CVE Details</h2>
            <p><strong>CVE ID:</strong> {cve.cve_id}</p>
            <p><strong>Source Identifier:</strong> {cve.sourceIdentifier}</p>
            <p><strong>Published Date:</strong> {new Date(cve.published).toLocaleDateString()}</p>
            <p><strong>Last Modified Date:</strong> {new Date(cve.lastModified).toLocaleDateString()}</p>
            <p><strong>Vulnerability Status:</strong> {cve.vulnStatus}</p>
            <h3>Description:</h3>
            {cve.descriptions.map((desc, index) => (
                <p key={index}>{desc.value}</p>
            ))}
            <h3>References:</h3>
            <ul>
                {cve.references.map((ref, index) => (
                    <li key={index}><a href={ref.url}>{ref.source}</a></li>
                ))}
            </ul>
        </div>
    );
}

export default CVEDetail;
