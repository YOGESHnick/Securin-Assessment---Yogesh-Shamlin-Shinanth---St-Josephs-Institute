const express = require('express');
const router = express.Router();
const CVE = require('../models/CVE');

// Fetch CVEs -> pagination and sorting
router.get('/cves', async (req, res) => {
    const { page = 1, limit = 10, sort = 'published', order = 'asc', days, year, id } = req.query;

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { [sort]: order === 'asc' ? 1 : -1 },
    };
    const filters = {};

    if (id) {
        filters.cve_id = id;
    }
    if (year) {
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31`);
        filters.published = { $gte: startDate, $lt: endDate };
    }
    if (days) {
        const sinceDate = new Date();
        sinceDate.setDate(sinceDate.getDate() - parseInt(days));
        filters.lastModified = { $gte: sinceDate };
    }    
    try {
        const cves = await CVE.paginate(filters, options);
        res.json(cves);
    } catch (error) {
        console.error('Error retrieving CVE data:', error);
        res.status(500).send('Error retrieving CVE data');
    }
});

// Fetch  CVE -> ID
router.get('/cves/:id', async (req, res) => {
    try {
        const cve = await CVE.findOne({ cve_id: req.params.id });
        console.log(cve);
        if (!cve) {
            return res.status(404).send('CVE not found');
        }
        res.json(cve);
    } catch (error) {
        console.error('Error retrieving CVE data:', error);
        res.status(500).send('Error retrieving CVE data');
    }
});

// Fetch CVEs -> year
router.get('/cves/year/:year', async (req, res) => {
    const year = parseInt(req.params.year, 10);
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    try {
        const cves = await CVE.find({
            published: {
                $gte: startDate,
                $lt: endDate
            }
        });
        res.json(cves);
    } catch (error) {
        console.error('Error retrieving CVE data:', error);
        res.status(500).send('Error retrieving CVE data');
    }
});

// Fetch CVEs -> base score
router.get('/cves/score/:score', async (req, res) => {
    const score = parseFloat(req.params.score);

    try {
        const cves = await CVE.find({
            $or: [
                { 'metrics.cvssMetricV2.baseScore': score },
                { 'metrics.cvssMetricV2.baseScore': score }
            ]
        });
        res.json(cves);
    } catch (error) {
        console.error('Error retrieving CVE data:', error);
        res.status(500).send('Error retrieving CVE data');
    }
});

//  CVEs -> last N days
router.get('/cves/modified/:days', async (req, res) => {
    const days = parseInt(req.params.days, 10);
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    try {
        const cves = await CVE.find({
            lastModified: {
                $gte: sinceDate
            }
        });
        res.json(cves);
    } catch (error) {
        console.error('Error retrieving CVE data:', error);
        res.status(500).send('Error retrieving CVE data');
    }
});

module.exports = router;
