const express = require('express');
const router = express.Router();
const axios = require('axios');
const CVE = require('../models/CVE');

router.get('/fetch-cves', async (req, res) => {
    const baseURL = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
    let startIndex = 0;
    const resultsPerPage = 1000; 
    let totalRecords = 1;

    while (startIndex < totalRecords) {
        try {
            const response = await axios.get(baseURL);
            // console.log(response.data.vulnerabilities[0].configurations.nodes);
            
            const { totalResults, vulnerabilities } = response.data;
            totalRecords = totalResults;

            for (let vulnerability of vulnerabilities) {
                const cveData = vulnerability.cve;
                const cve = new CVE({
                    cve_id: cveData.id,
                    sourceIdentifier: cveData.sourceIdentifier,
                    published: new Date(cveData.published),
                    lastModified: new Date(cveData.lastModified),
                    vulnStatus: cveData.vulnStatus,
                    descriptions: cveData.descriptions,
                    metrics: {
                        cvssMetricV2: cveData.metrics?.cvssMetricV2 || [],
                    },
                    weaknesses: cveData.weaknesses,
                    configurations: cveData.configurations,
                    references: cveData.references,
                });

                // await cve.save();
            }

            startIndex += resultsPerPage;
        } catch (error) {
            console.error('Error fetching CVE data:', error);
            return res.status(500).send('Error fetching CVE data');
        }
    }

    res.send('CVE data fetched and stored successfully');
});

module.exports = router;