const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
    var dt = new Date();
    dt.setDate(dt.getDate() + 7)

    const top5violations = {
        columns: [
            {label: "Violation", field: "violation"}, 
            {label: "Frequency", field: "frequency"},
            {label: "Occurrences", field: "occurrences"}],
        rows: [
            {violation: "Long method", frequency: "30%", occurrences: 54}, {violation: "God Package", frequency: "16%", occurrences: 28},  {violation: "Feature envy", frequency: "10%", occurrences: 17},  {violation: "Commented code", frequency: "5%", occurrences: 10},  {violation: "Possible null pointer", frequency: "3%", occurrences: 5}]}

    const top5Hotspots = {
        columns: [
            {label: "Hot-spot", field: "hotspot"}, 
            {label: "CPU-cycles", field: "cpyusage"}],
        rows: [
            {hotspot: "1st (Lines:167-191)", cpyusage: "29%"}, {hotspot: "2nd (Lines:659-675)", cpyusage: "15%"},  {hotspot: "3rd (Lines:522-555)", cpyusage: "12%"},  {hotspot: "4th (Lines:1898-1924)", cpyusage: "9%"},  {hotspot: "5th (Lines:382-395)", cpyusage: "4%"}]}

    const top5HotspotsGPU = {
        columns: [
            {label: "Hot-spot", field: "hotspot"}, 
            {label: "Energy Gain", field: "energygain"}],
        rows: [
            {hotspot: "1st", energygain: ">10x"}, {hotspot: "2nd", energygain: "0"},  {hotspot: "3rd", energygain: "0"},  {hotspot: "4th", energygain: "0"},  {hotspot: "5th", energygain: "<10x"}]}

    const data = {
        principalOverTimeChart: [{
        y: [65, 59, 80, 81, 56, 55, 40],
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        type: 'scatter',
        mode: 'line',
        marker: {color: 'red'},
        autosize: true,
        margin: {l:20, r:20, t:50, b:50}
        }],

        interestOverTimeChart: [{
        y: [10, 13, 16, 15, 18, 14, 12],
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        type: 'scatter',
        mode: 'line',
        marker: {color: 'red'},
        autosize: true,
        margin: {l:20, r:20, t:50, b:50}
        }],

        densityOverTimeChart: [{
        y: [1.20, 1.21, 1.18, 1.23, 1.14, 1.10, 1.11],
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        type: 'scatter',
        mode: 'line',
        marker: {color: 'red'},
        autosize: true,
        margin: {l:20, r:20, t:50, b:50}
        }],

        densityComparisonChart: [{
        y: [0.9, 1.2],
        x: ['New code', 'Existing'],
        text: ['min/kloc', 'min/kloc'],
        type: 'bar'
        }],

        systemSummary: { qualityScore: 3, coverage: 90, vulnerabilities: {count: 42, critical: 3}, codeSmells: 154, duplCode: 10, bugs: 350, linesOfCode: 8502 },

        energyIndicatorsSummary: { branchmiss: 11, cpucycles: 3158456, cachemiss:12, Icachemiss:4 , memoryaccesses: 154000, duplCode: 10, dataraces: 1, linesOfCode: 8502 },

        acelerationIndicatorsSummary: { ilp: 1125, ilpRate: 28, cachemiss: 12, mem: 38, cont: 12, int: 20, fp: 40, div: 18, coldmiss: 9, stride:6},

        interestSummary: {breakpoint: dt.toDateString(), breakpointDaysLeft:7, interestprob: 30, interestrank:5},

        topViolations: top5violations,

        topViolationsNewCode:top5violations,

        topHotspots: top5Hotspots,

        topHotspotsGPU: top5HotspotsGPU
    }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});