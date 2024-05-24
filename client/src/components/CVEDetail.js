// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function CVEDetail() {
//     const { id } = useParams();
//     const [cve, setCve] = useState(null);

//     useEffect(() => {
//         fetchCveDetails(id);
//     }, [id]);

//     const fetchCveDetails = async (id) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/api/cves/${id}`);
//             setCve(response.data);
//         } catch (error) {
//             console.error('Error fetching CVE details:', error);
//         }
//     };

//     if (!cve) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>CVE Details</h2>
//             <p><strong>CVE ID:</strong> {cve.cve_id}</p>
//             <p><strong>Source Identifier:</strong> {cve.sourceIdentifier}</p>
//             <p><strong>Published Date:</strong> {new Date(cve.published).toLocaleDateString()}</p>
//             <p><strong>Last Modified Date:</strong> {new Date(cve.lastModified).toLocaleDateString()}</p>
//             <p><strong>Vulnerability Status:</strong> {cve.vulnStatus}</p>
//             <h3>Description:</h3>
//             {cve.descriptions.map((desc, index) => (
//                 <p key={index}>{desc.value}</p>
//             ))}
//             <h3>References:</h3>
//             <ul>
//                 {cve.references.map((ref, index) => (
//                     <li key={index}><a href={ref.url}>{ref.source}</a></li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default CVEDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function CVEDetail() {
//     const { id } = useParams();
//     const [cve, setCve] = useState(null);

//     const fetchCveDetails = async (id) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/api/cves/${id}`);
//             // console.log('Server Response:', response.data);
//             setCve(response.data);
//             console.log("cve:",cve);
//         } catch (error) {
//             console.error('Error fetching CVE details:', error);
//         }
//     };

//     useEffect(() => {
//         fetchCveDetails(id);
//     }, [id,fetchCveDetails]);

//     if (!cve) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>{cve.cve_id}</h2>
//             <h3>Description:</h3>
//             {cve.descriptions.map((desc, index) => (
//                 <p key={index}>{desc.value}</p>
//             ))}

//             <h3>CVSS V2 Metrics:</h3>
//             <p><strong>Severity Score:</strong> {cve.cvssV2?.severityScore}</p>
//             <p><strong>Vector String:</strong> {cve.cvssV2?.vectorString}</p>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>Access Vector</th>
//                         <th>Access Complexity</th>
//                         <th>Authentication</th>
//                         <th>Confidentiality Impact</th>
//                         <th>Integrity Impact</th>
//                         <th>Availability Impact</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{cve.cvssV2?.accessVector}</td>
//                         <td>{cve.cvssV2?.accessComplexity}</td>
//                         <td>{cve.cvssV2?.authentication}</td>
//                         <td>{cve.cvssV2?.confidentialityImpact}</td>
//                         <td>{cve.cvssV2?.integrityImpact}</td>
//                         <td>{cve.cvssV2?.availabilityImpact}</td>
//                     </tr>
//                 </tbody>
//             </table>

//             <h3>Scores:</h3>
//             <p><strong>Exploitability Score:</strong> {cve.cvssV2?.exploitabilityScore}</p>
//             <p><strong>Impact Score:</strong> {cve.cvssV2?.impactScore}</p>

//             <h3>CPE:</h3>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Criteria</th>
//                         <th>Match Criteria ID</th>
//                         <th>Vulnerable</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {cve.cpe?.map((cpeItem, index) => (
//                         <tr key={index}>
//                             <td>{cpeItem.criteria}</td>
//                             <td>{cpeItem.matchCriteriaId}</td>
//                             <td>{cpeItem.vulnerable ? "Yes" : "No"}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default CVEDetail;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CVEDetail() {
  const { id } = useParams();
  const [cve, setCve] = useState(null);

  useEffect(() => {
    const fetchCveDetails = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/cves/${id}`
        );
        // console.log(response.data);
        setCve(response.data);
        console.log(cve);
      } catch (error) {
        console.error("Error fetching CVE details:", error);
      }
    };

    fetchCveDetails(id);
  }, [id]);

  useEffect(() => {
    console.log(cve);
  }, [cve]);

  if (!cve) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{cve.cve_id}</h2>
      <h3>Description:</h3>
      {cve.descriptions.map((desc, index) => (
        <p key={index}>{desc.value}</p>
      ))}

      <h3>CVSS V2 Metrics:</h3>
      <p>
        <strong>Severity:</strong> {cve.metrics.cvssMetricV2[0].baseSeverity}
      </p>
      <p>
        <strong>Score:</strong> {cve.metrics.cvssMetricV2[0].cvssData.baseScore}
      </p>
      {/* <p><strong>Vector String:</strong> {cve.cvssV2?.vectorString}</p> */}

      <table>
        <thead>
          <tr>
            <th>Access Vector</th>
            <th>Access Complexity</th>
            <th>Authentication</th>
            <th>Confidentiality Impact</th>
            <th>Integrity Impact</th>
            <th>Availability Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cve.metrics.cvssMetricV2[0].cvssData.accessVector}</td>
            <td>{cve.metrics.cvssMetricV2[0].cvssData.accessComplexity}</td>
            <td>{cve.metrics.cvssMetricV2[0].cvssData.authentication}</td>
            <td>
              {cve.metrics.cvssMetricV2[0].cvssData.confidentialityImpact}
            </td>
            <td>{cve.metrics.cvssMetricV2[0].cvssData.integrityImpact}</td>
            <td>{cve.metrics.cvssMetricV2[0].cvssData.availabilityImpact}</td>
          </tr>
        </tbody>
      </table>

      <h3>Scores:</h3>
      <p>
        <strong>Exploitability Score:</strong>{" "}
        {cve.metrics.cvssMetricV2[0].exploitabilityScore}
      </p>
      <p>
        <strong>Impact Score:</strong> {cve.metrics.cvssMetricV2[0].impactScore}
      </p>

      <h3>CPE:</h3>
      <table>
        <thead>
          <tr>
            <th>Criteria</th>
            <th>Match Criteria ID</th>
            <th>Vulnerable</th>
          </tr>
        </thead>
        <tbody>
          {cve.configurations[0].nodes[0].cpeMatch?.map((cpeItem, index) => (
            <tr key={index}>
              <td>{cpeItem.criteria}</td>
              <td>{cpeItem.matchCriteriaId}</td>
              <td>{cpeItem.vulnerable ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CVEDetail;
