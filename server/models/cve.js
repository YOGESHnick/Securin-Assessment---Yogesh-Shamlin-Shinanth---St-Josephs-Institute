const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const descriptionSchema = new mongoose.Schema({
    lang: String,
    value: String,
});

const cvssMetricV2Schema = new mongoose.Schema({
    source: String,
    type: String,
    cvssData: {
        version: String,
        vectorString: String,
        accessVector: String,
        accessComplexity: String,
        authentication: String,
        confidentialityImpact: String,
        integrityImpact: String,
        availabilityImpact: String,
        baseScore: Number,
    },
    baseSeverity: String,
    exploitabilityScore: Number,
    impactScore: Number,
    acInsufInfo: Boolean,
    obtainAllPrivilege: Boolean,
    obtainUserPrivilege: Boolean,
    obtainOtherPrivilege: Boolean,
    userInteractionRequired: Boolean,
});

const weaknessSchema = new mongoose.Schema({
    source: String,
    type: String,
    description: [descriptionSchema],
});

const cpeMatchSchema = new mongoose.Schema({
    vulnerable: Boolean,
    criteria: String,
    matchCriteriaId: String,
});

const nodeSchema = new mongoose.Schema({
    operator: String,
    negate: Boolean,
    cpeMatch: [cpeMatchSchema],
});

const configurationSchema = new mongoose.Schema({
    nodes: [nodeSchema],
});

const referenceSchema = new mongoose.Schema({
    url: String,
    source: String,
});

const cveSchema = new mongoose.Schema({
    cve_id: { type: String, required: true, unique: true },
    sourceIdentifier: String,
    published: Date,
    lastModified: Date,
    vulnStatus: String,
    descriptions: [descriptionSchema],
    metrics: {
        cvssMetricV2: [cvssMetricV2Schema],
    },
    weaknesses: [weaknessSchema],
    configurations: [configurationSchema],
    references: [referenceSchema],
});

cveSchema.plugin(mongoosePaginate);

const CVE = mongoose.model('CVE', cveSchema);
module.exports = CVE;
