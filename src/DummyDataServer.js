const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
    var dt = new Date();
    dt.setDate(dt.getDate() + 7)

    const top10violations = {
        columns: [
            {label: "Metric", field: "metric"}, 
            {label: "Score", field: "score"}],
        rows: [
            {metric: "MPC", score: 1}, {metric: "DIT", score: 1},  {metric: "NCC", score: 2},  {metric: "RFC", score: 38},  {metric: "LCM", score: 205}, {metric: "WMC", score: 1}, {metric: "DAC", score: 0}, {metric: "CC", score: 304}, {metric: "LOC", score: 1185}, {metric: "NOP", score: 456}]}
      
    const top5violations = {
       columns: [
            {label: "Violation", field: "violation"}, 
            {label: "Frequency", field: "frequency"},
            {label: "Occurrences", field: "occurrences"}],
        rows: [
            {violation: "Long method", frequency: "30%", occurrences: 54}, {violation: "God Package", frequency: "16%", occurrences: 28},  {violation: "Feature envy", frequency: "10%", occurrences: 17},  {violation: "Commented code", frequency: "5%", occurrences: 10},  {violation: "Possible null pointer", frequency: "3%", occurrences: 5}]} // The top violations wrt frequency in new code

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

        holisun: {
        	projectName : "holisun",
        	energyIndicatorsSummary: { branchmiss: '11%', cpucycles: 3158456, cachemiss:'12%', Icachemiss:'4%' , memoryaccesses: 154000, duplCode: 10, dataraces: 1, linesOfCode: 8502 },
        	acelerationIndicatorsSummary: { ilp: 1125, ilpRate: 28, cachemiss: '12%', mem: 38, cont: 12, int: 20, fp: 40, div: 18, coldmiss: 9, stride:6},
        	topHotspotsFunction: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"},
		            {label: "Line start", field: "start"},
		            {label: "Line end", field: "end"}, 
		            {label: "CPU-cycles", field: "cpuusage"},
		            {label: "Source file", field: "source"},
		            {label: "Function Name", field: "function"}],
		        rows: [
		            {hotspot: "1st", start: "-", end: "-", cpuusage: "47.6%", source: "-", function: "sun.awt.X11.XToolkit.waitForEvents"},
		            {hotspot: "2nd", start: "-", end: "-", cpuusage: "36.47%", source: "-", function: "java.net.SocketInputStream.socketRead0"},
		            {hotspot: "3rd", start: "-", end: "-", cpuusage: "1.43%", source: "-", function: "sun.nio.ch.FileDispatcherImpl.force0"},
		            {hotspot: "4th", start: "-", end: "-", cpuusage: "1.05%", source: "-", function: "java.lang.ClassLoader.defineClass1"},
		            ]},

		    topHotspotsLoop: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"},
		            {label: "Line start", field: "start"},
		            {label: "Line end", field: "end"},  
		            {label: "CPU-cycles", field: "cpuusage"},
		            {label: "Source file", field: "source"},
		            {label: "Type", field: "type"}],
		        rows: [
		            {hotspot: "-", start: "-", end: "-", cpuusage: "-", source: "-", type: "-"}
		            ]},

        	topHotspotsGPUFunction: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"},
		            {label: "Line start", field: "start"},
		            {label: "Line end", field: "end"},
		            {label: "Energy Gain", field: "energygain"}],
		        rows: [
		        	{hotspot: "-",start: "-", end: "-", energygain: "-"} 
		            ]},

        	topHotspotsGPULoop: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"}, 
		            {label: "Energy Gain", field: "energygain"}],
		        rows: [
		            {hotspot: "-", start: "-", end: "-", energygain: "-"}
		            ]},
		},

        airbus: {
        	projectName : "airbus",
        	energyIndicatorsSummary: { branchmiss: '2.69%', cpucycles: 18764557, cachemiss:'5.24%', Icachemiss:'0.55%' , memoryaccesses: 249456, dataraces: 0},
        	acelerationIndicatorsSummary: { ilp: 15283, ilpRate: 28, cachemiss: '4.9%', mem: 10268, cont: 15326, int: 61331, fp: 0, div: 0, coldmiss: 16153, stride:0.46408},
        	topHotspotsFunction: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"},
		            {label: "Line start", field: "start"},
		            {label: "Line end", field: "end"}, 
		            {label: "CPU-cycles", field: "cpuusage"},
		            {label: "Source file", field: "source"},
		            {label: "Function Name", field: "function"}],
		        rows: [
		            {hotspot: "1st", start: "138", end: "141", cpuusage: "2%", source: "configsection.cpp", function: "ConfigSectionset"},
		            {hotspot: "2nd", start: "142", end: "157", cpuusage: "6%", source: "configmap.cpp", function: "ConfigMapaddSection"},
		            {hotspot: "3rd", start: "15", end: "52", cpuusage: "16%", source: "iniparser.cpp", function: "IniParserparseLine"},
		            {hotspot: "4th", start: "54", end: "57", cpuusage: "4%", source: "iniparser.cpp", function: "IniParsereof"},
		            {hotspot: "5th", start: "59", end: "65", cpuusage: "4%", source: "iniparser.cpp", function: "IniParserstartSection"},
		            {hotspot: "6th", start: "67", end: "74", cpuusage: "8%", source: "iniparser.cpp", function: "IniParserterminateSection"},
		            {hotspot: "7th", start: "13", end: "78", cpuusage: "8%", source: "com_loader.cpp", function: "ComLoaderload"},
		            {hotspot: "8th", start: "80", end: "133", cpuusage: "1%", source: "com_loader.cpp", function: "ComLoaderloadLinks"},
		            {hotspot: "9th", start: "135", end: "176", cpuusage: "1%", source: "com_loader.cpp", function: "ComLoaderloadCodecs"},
		            {hotspot: "10th", start: "178", end: "246", cpuusage: "2%", source: "com_loader.cpp", function: "ComLoaderloadSources"},
		            {hotspot: "11th", start: "21", end: "56", cpuusage: "17%", source: "conffileparser.cpp", function: "ConfFileParserparseDir"},
		            {hotspot: "12th", start: "58", end: "67", cpuusage: "22%", source: "conffileparser.cpp", function: "ConfFileParserparseFile"},
		            {hotspot: "13th", start: "69", end: "89", cpuusage: "22%", source: "conffileparser.cpp", function: "ConfFileParserparse"},
		            {hotspot: "14th", start: "746", end: "757", cpuusage: "1%", source: "Message4586.cpp", function: "CMessage4586WriteRadiansInSignedBAMField"},
		            {hotspot: "15th", start: "104", end: "115", cpuusage: "1%", source: "timer.cpp", function: "Timer_loop"},
		            {hotspot: "16th", start: "117", end: "123", cpuusage: "1%", source: "timer.cpp", function: "Timer_sleepThenRunStep"},
		            {hotspot: "17th", start: "23", end: "105", cpuusage: "45%", source: "kameleoncore.cpp", function: "KameleonCoreconfigure"},
		            {hotspot: "18th", start: "215", end: "325", cpuusage: "54%", source: "main.cpp", function: "main"} 
		            ]},

		    topHotspotsLoop: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"},
		            {label: "Line start", field: "start"},
		            {label: "Line end", field: "end"},  
		            {label: "CPU-cycles", field: "cpuusage"},
		            {label: "Source file", field: "source"},
		            {label: "Type", field: "type"}],
		        rows: [
		            {hotspot: "1st", start: "145", end: "156", cpuusage: "6%", source: "configmap.cpp", type: "If statement"},
		            {hotspot: "2nd", start: "21", end: "50", cpuusage: "2%", source: "iniparser.cpp", type: "If statement"},
		            {hotspot: "3rd", start: "69", end: "73", cpuusage: "8%", source: "iniparser.cpp", type: "If statement"},
		            {hotspot: "4th", start: "27", end: "55", cpuusage: "17%", source: "conffileparser.cpp", type: "If statement"},
		            {hotspot: "5th", start: "74", end: "88", cpuusage: "22%", source: "conffileparser.cpp", type: "If statement"},
		            {hotspot: "6th", start: "106", end: "113", cpuusage: "1%", source: "timer.cpp", type: "If statement"},
		            {hotspot: "7th", start: "296", end: "321", cpuusage: "6%", source: "main.cpp", type: "While loop"}
		            ]},

        	topHotspotsGPUFunction: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"},
		            {label: "Line start", field: "start"},
		            {label: "Line end", field: "end"},
		            {label: "Energy Gain", field: "energygain"}],
		        rows: [
		            {hotspot: "-",start: "-", end: "-", energygain: "-"} 
		            ]},

        	topHotspotsGPULoop: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"}, 
		            {label: "Energy Gain", field: "energygain"}],
		        rows: [
		            {hotspot: "-", start: "-", end: "-", energygain: "-"}
		            ]},
        },

        neurasmus: {
        	projectName : "neurasmus",
        	energyIndicatorsSummary: { branchmiss: '4.11%', cpucycles: 608599, cachemiss:'4.9%', Icachemiss:'0.84%' , memoryaccesses: 36585, dataraces: 0},
        	acelerationIndicatorsSummary: { ilp: 15283, ilpRate: 28, cachemiss: 4.9, mem: 10268, cont: 15326, int: 61331, fp: 0, div: 0, coldmiss: 16153, stride:0.46408},
        	topHotspotsFunction: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"},
		            {label: "Line start", field: "start"},
		            {label: "Line end", field: "end"}, 
		            {label: "CPU-cycles", field: "cpuusage"},
		            {label: "Source file", field: "source"},
		            {label: "Function Name", field: "function"}],
		        rows: [
		            {hotspot: "1st", start: "32", end: "44", cpuusage: "6%", source: "misty1.c", function: "fi"},
		            {hotspot: "2nd", start: "47", end: "62", cpuusage: "1%", source: "misty1.c", function: "fo"},
		            {hotspot: "3rd", start: "65", end: "82", cpuusage: "1%", source: "misty1.c", function: "fl"},
		            {hotspot: "4th", start: "106", end: "153", cpuusage: "8%", source: "misty1.c", function: "misty1_encrypt_block"},
		            {hotspot: "5th", start: "191", end: "211", cpuusage: "8%", source: "imdcode.c", function: "cmac"},
		            {hotspot: "6th", start: "218", end: "705", cpuusage: "10%", source: "imdcode.c", function: "main"} 
		            ]},

		    topHotspotsLoop: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"},
		            {label: "Line start", field: "start"},
		            {label: "Line end", field: "end"},  
		            {label: "CPU-cycles", field: "cpuusage"},
		            {label: "Source file", field: "source"},
		            {label: "Type", field: "type"}],
		        rows: [
		            {hotspot: "1st", start: "202", end: "206", cpuusage: "8%", source: "imdcode.c", type: "For loop"},
		            {hotspot: "2nd", start: "557", end: "562", cpuusage: "6%", source: "imdcode.c", type: "If statement"},
		            {hotspot: "3rd", start: "601", end: "606", cpuusage: "2%", source: "imdcode.c", type: "If statement"}
		            ]},

        	topHotspotsGPUFunction: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"},
		            {label: "Line start", field: "start"},
		            {label: "Line end", field: "end"},
		            {label: "Ins. Parallelism", field: "ilp"},
		            {label: "Memory Stride 0", field: "stride0"},
		            {label: "Num.of Instructions", field: "ins"},
		            {label: "Cold Refs", field: "cold"},
		            {label: "Control Ops", field: "ctrl"},
		            {label: "Memory Ops", field: "mem"},
		            {label: "Integer Ops", field: "int"},
		            {label: "Energy Gain", field: "energygain"}],
		        rows: [
		        	{hotspot: "1st",start: "32", end: "44", ilp: "471.6", stride0: "69%", ins: "184815", cold: "0.06%", ctrl: "14.5%", mem: "41.9%", int: "13.4%", energygain: "0"},
		            {hotspot: "2nd",start: "47", end: "62", ilp: "432.7", stride0: "49.2%", ins: "62937", cold: "0.2%", ctrl: "13.8%", mem: "41.5%", int: "12.8%", energygain: "0"},
		            {hotspot: "3rd",start: "65", end: "82", ilp: "459.0", stride0: "65.1%", ins: "113886", cold: "0.04%", ctrl: "14.6%", mem: "41.9%", int: "13.4%", energygain: "0"},
		            {hotspot: "4th",start: "106", end: "153", ilp: "220.7", stride0: "0%", ins: "9990", cold: "1.5%", ctrl: "5.7%", mem: "32.8%", int: "4.9%", energygain: "0"},
		            {hotspot: "5th",start: "191", end: "211", ilp: "0", stride0: "0%", ins: "10989", cold: "3.5%", ctrl: "2.4%", mem: "27.8%", int: "2.5%", energygain: "0"},
		            {hotspot: "6th",start: "218", end: "705", ilp: "0", stride0: "0%", ins: "13989", cold: "3.8%", ctrl: "1.6%", mem: "27.6%", int: "1.8%", energygain: "0"} 
		            ]},

        	topHotspotsGPULoop: {
		        columns: [
		            {label: "Hot-spot", field: "hotspot"}, 
		            {label: "Line start", field: "start"},
		            {label: "Line end", field: "end"},
		            {label: "Ins. Parallelism", field: "ilp"},
		            {label: "Memory Stride 0", field: "stride0"},
		            {label: "Num.of Instructions", field: "ins"},
		            {label: "Cold Refs", field: "cold"},
		            {label: "Control Ops", field: "ctrl"},
		            {label: "Memory Ops", field: "mem"},
		            {label: "Integer Ops", field: "int"},
		            {label: "Energy Gain", field: "energygain"}],
		        rows: [
		            {hotspot: "1st", start: "202", end: "206", ilp: "0", stride0: "0%", ins: "10989", cold: "3.5%", ctrl: "2.4%", mem: "27.8%", int: "2.5%", energygain: "0"},
		            {hotspot: "2nd", start: "557", end: "562", ilp: "0", stride0: "0%", ins: "7992", cold: "6.6%", ctrl: "1.9%", mem: "27.1%", int: "2.2%", energygain: "0"},
		            {hotspot: "3rd", start: "601", end: "606", ilp: "0", stride0: "0%", ins: "2997", cold: "6.6%", ctrl: "", mem: "", int: "", energygain: "0"}
		            ]},
        },

        interestSummary: {breakpoint: 28, totalInterest:800, maintainabilityRank: 10, interestProbability:38, instability: 25, interestProbabilityRank: 40},

        principalSummary: {tdInDays: 21, tdInCurrency: 150000, bugs: 168, vulnerabilities: 55 , codeSmells: 1400, coverage: 12.2, duplCode: 2.3 },
        
        topViolations: top10violations,

        topViolationsNewCode:top5violations       
    }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
