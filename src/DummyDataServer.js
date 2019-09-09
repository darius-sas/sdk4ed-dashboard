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
            {violation: "Cognitive complexity of methods should not be too high", frequency: "30%", occurrences: 54}, {violation: "String literals should not be duplicated", frequency: "16%", occurrences: 28},  {violation: "Generic exceptions should never be thrown", frequency: "10%", occurrences: 17},  {violation: "Control flow statements should not be nested too deeply", frequency: "5%", occurrences: 10},  {violation: "Exception handlers should preserve the original exceptions", frequency: "3%", occurrences: 5}]} // The top violations wrt frequency in new code

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

         neurasmusTD : {
			projectName : 'Neurasmus',
			interestSummary : 
				{name:'Neurasmus', type: 'project', breakpoint: 9.77 , totalInterest:550.293, maintainabilityRank: 99, interestProbability: 43, interestProbabilityRank: 66, LOC: 1243, CC: 8.42, NoF: 48, CD: 31.11}, 
			  							
			principalSummary :
				{name:'Neurasmus', type: 'project', tdInMinutes: 9111, tdInCurrency: 6955.82, bugs: 0, vulnerabilities: 0 , codeSmells: 1474, duplCode: 24.16},
					 						
			interestIndicators:
				{
				columns: [
					{label: "Artifact", field: "name"}, 
					{label: "Lines of Code", field: "LOC"},
					{label: "Cyclomatic Complexity", field: "CC"}, 
					{label: "Number of Functions", field: "NoF"}, 
					{label: "Comments Density", field: "CD"},
					{label: "Interest Probability", field: "IP"},
					{label: "Interest", field: "Interest"},
					{label: "Maintainability Ranking", field: "MR"},
					{label: "Interest Probability Ranking", field: "IPR"},	
					],
				rows: [
					{name:'Neurasmus/imd-emulator/resources', LOC: 818, CC: 6.20, NoF : 2.13, CD: 407.20, IP: 0.00, Interest: 0.00, MR: 10 , IPR: 10 }, 
					{name:'Neurasmus/imd-emulator/resources/mdcode_v1.3', LOC: 0, CC: 0.00, NoF : 0.00, CD: 0.00, IP: 0.00, Interest: 0.00, MR: 10 , IPR: 10 },  
					{name:'Neurasmus/imd-emulator/api.cpp', LOC: 93, CC: 15.00, NoF : 11.00, CD: 11.40, IP: 0.11, Interest: 163.60 , MR: 99 , IPR:40 },   
					{name:'Neurasmus/imd-emulator/api.h', LOC: 11, CC: 0.00, NoF : 0.00, CD: 50.00, IP: 0.11, Interest: 16.70, MR: 70 , IPR:40  },   
					{name:'Neurasmus/imd-emulator/body.cpp', LOC: 11, CC: 2.00, NoF : 1.00, CD: 31.30, IP: 0.11, Interest: 17.91, MR: 80 , IPR: 40 }, 
					{name:'Neurasmus/imd-emulator/body.h', LOC: 1, CC: 0.00, NoF : 0.00, CD: 0.00, IP: 0.11, Interest: 1.37, MR: 40 , IPR:40  },  
					{name:'Neurasmus/imd-emulator/main.cpp', LOC: 53, CC: 6.00, NoF : 5.00, CD: 1.90, IP: 0.11, Interest: 96.78, MR:  90, IPR:40  },  
					{name:'Neurasmus/imd-emulator/misty1.cpp', LOC: 145, CC: 15.00, NoF : 10.00, CD: 44.20, IP: 0.11, Interest: 236.29, MR: 99 , IPR:40  }, 
					{name:'Neurasmus/imd-emulator/misty1.h', LOC: 58, CC: 0.00, NoF : 0.00, CD: 21.60, IP: 0.11, Interest: 102.08, MR: 99 , IPR:40  }, 
					{name:'Neurasmus/imd-emulator/reader.cpp', LOC: 206, CC: 25.00, NoF : 1.00, CD: 38.30, IP: 0.83, Interest: 11.42 , MR: 70 , IPR:99 }, 
					{name:'Neurasmus/imd-emulator/reader.h', LOC: 1, CC: 0.00, NoF : 0.00, CD: 0.00, IP: 0.16, Interest: 1.37 , MR: 50 , IPR: 90}, 
					{name:'Neurasmus/imd-emulator/sec_primitives.cpp', LOC: 24, CC: 4.00, NoF : 2.00, CD: 53.80, IP: 0.66, Interest: 4.09, MR: 60 , IPR:90  }, 
					{name:'Neurasmus/imd-emulator/sec_primitives.h', LOC: 3, CC: 0.00, NoF : 0.00, CD: 88.50, IP: 0.88, Interest: 0.54 , MR: 40 , IPR:99 }, 
					{name:'Neurasmus/imd-emulator/sims.cpp', LOC: 11, CC: 2.00, NoF : 1.00, CD: 35.30, IP: 0.11, Interest: 17.56 , MR: 80 , IPR: 40}, 
					{name:'Neurasmus/imd-emulator/sims.h', LOC: 1, CC: 0.00, NoF : 0.00, CD: 0.00, IP: 0.11, Interest: 1.37, MR: 40 , IPR: 40}, 
					{name:'Neurasmus/imd-emulator/sisc.cpp', LOC: 199, CC: 24.00, NoF : 1, CD: 30.90, IP: 0.88, Interest: 38.96 , MR: 90 , IPR:99 }, 
					{name:'Neurasmus/imd-emulator/sisc.h', LOC: 1, CC: 0.00, NoF : 0.00, CD: 0.00, IP: 0.11, Interest: 1.37 , MR:50  , IPR:40 }, 
					{name:'Neurasmus/imd-emulator/resources/imdcode.c', LOC: 111, CC: 26.00, NoF : 3.00, CD: 59.20, IP: 0.00, Interest: 0.00 , MR:10  , IPR: 10}, 
					{name:'Neurasmus/imd-emulator/resources/mdcode_v1.3/imdcode.c', LOC: 111, CC: 26.00, NoF : 3.00, CD: 59.30, IP: 0.00, Interest: 0.00 , MR: 10 , IPR: 10}, 
					{name:'Neurasmus/imd-emulator/resources/mdcode_v1.3/misty1.c', LOC: 145, CC: 15.00, NoF : 10.00, CD: 44.90, IP: 0.00, Interest: 0.00, MR:10  , IPR: 10 },
					{name:'Neurasmus/imd-emulator/resources/mdcode_v1.3/misty1.h', LOC: 58, CC: 0.00, NoF : 0.00, CD: 20.50, IP: 0.00, Interest: 0.00, MR: 10 , IPR:10 }, ]
					
		          },
		          
		     principalIndicators:
				{
				columns: [
					{label: "Artifact", field: "name"}, 
					{label: "TD-minutes", field: "tdInMinutes"},
					{label: "TD-currency", field: "tdInCurrency"}, 
					{label: "Bugs", field: "bugs"}, 
					{label: "Vulnerabilities", field: "vulnerabilities"},
					{label: "Code Smells", field: "codeSmells"},   
					{label: "Duplications", field: "duplCode"},  	
					],
				rows: [
					{name:'Neurasmus/imd-emulator/resources', tdInMinutes: 950, tdInCurrency: 725.30, bugs: 0, vulnerabilities: 0 , codeSmells: 160, duplCode: 78.70 }, 
					{name:'Neurasmus/imd-emulator/resources/mdcode_v1.3', tdInMinutes: 1863, tdInCurrency: 1422.21, bugs: 0, vulnerabilities: 0 , codeSmells: 310, duplCode: 75.30 },  
					{name:'Neurasmus/imd-emulator/api.cpp', tdInMinutes: 120, tdInCurrency: 91.62, bugs: 0, vulnerabilities: 0 , codeSmells: 7, duplCode: 0.00},   
					{name:'Neurasmus/imd-emulator/api.h', tdInMinutes: 70, tdInCurrency: 53.45, bugs: 0, vulnerabilities: 0 , codeSmells: 16, duplCode: 0.00},   
					{name:'Neurasmus/imd-emulator/body.cpp', tdInMinutes: 23, tdInCurrency: 17.56, bugs: 0, vulnerabilities: 0 , codeSmells: 5,  duplCode: 0.00 }, 
					{name:'Neurasmus/imd-emulator/body.h', tdInMinutes: 18, tdInCurrency: 13.74, bugs: 0, vulnerabilities: 0 , codeSmells: 5,  duplCode: 0.00 },  
					{name:'Neurasmus/imd-emulator/main.cpp', tdInMinutes: 90, tdInCurrency: 68.72, bugs: 0, vulnerabilities: 0 , codeSmells: 11,  duplCode: 0.00 },  
					{name:'Neurasmus/imd-emulator/misty1.cpp', tdInMinutes: 783, tdInCurrency: 597.82, bugs: 0, vulnerabilities: 0 , codeSmells: 128,  duplCode: 91.50}, 
					{name:'Neurasmus/imd-emulator/misty1.h', tdInMinutes: 123, tdInCurrency: 93.91, bugs: 0, vulnerabilities: 0 , codeSmells: 24,  duplCode: 0.00 }, 
					{name:'Neurasmus/imd-emulator/reader.cpp', tdInMinutes: 1081, tdInCurrency: 825.34, bugs: 0, vulnerabilities: 0 , codeSmells: 150,  duplCode: 9.30}, 
					{name:'Neurasmus/imd-emulator/reader.h', tdInMinutes: 17, tdInCurrency: 12.98, bugs: 0, vulnerabilities: 0 , codeSmells: 4,  duplCode: 0.00 }, 
					{name:'Neurasmus/imd-emulator/sec_primitives.cpp', tdInMinutes: 115, tdInCurrency: 87.80, bugs: 0, vulnerabilities: 0 , codeSmells: 20, duplCode: 0.00 }, 
					{name:'Neurasmus/imd-emulator/sec_primitives.h', tdInMinutes: 50, tdInCurrency: 38.18, bugs: 0, vulnerabilities: 0 , codeSmells: 10, duplCode: 0.00 }, 
					{name:'Neurasmus/imd-emulator/sims.cpp', tdInMinutes: 23, tdInCurrency: 17.56, bugs: 0, vulnerabilities: 0 , codeSmells: 5,  duplCode: 0.00 }, 
					{name:'Neurasmus/imd-emulator/sims.h', tdInMinutes: 18, tdInCurrency: 13.74, bugs: 0, vulnerabilities: 0 , codeSmells: 5, duplCode: 0.00 }, 
					{name:'Neurasmus/imd-emulator/sisc.cpp',tdInMinutes: 937, tdInCurrency: 715.40, bugs: 0, vulnerabilities: 0 , codeSmells: 140, duplCode: 3.90  }, 
					{name:'Neurasmus/imd-emulator/sisc.h', tdInMinutes: 17, tdInCurrency: 12.98, bugs: 0, vulnerabilities: 0 , codeSmells: 4, duplCode: 0.00 }, 
					{name:'Neurasmus/imd-emulator/resources/imdcode.c', tdInMinutes: 950, tdInCurrency: 725.30, bugs: 0, vulnerabilities: 0 , codeSmells: 160,  duplCode: 78.70 }, 
					{name:'Neurasmus/imd-emulator/resources/mdcode_v1.3/imdcode.c', tdInMinutes: 960, tdInCurrency: 732.86, bugs: 0, vulnerabilities: 0 , codeSmells: 159, duplCode: 79.10}, 
					{name:'Neurasmus/imd-emulator/resources/mdcode_v1.3/misty1.c', tdInMinutes: 783, tdInCurrency: 597.74, bugs: 0, vulnerabilities: 0 , codeSmells: 128,  duplCode: 90.80 },
					{name:'Neurasmus/imd-emulator/resources/mdcode_v1.3/misty1.h', tdInMinutes: 120, tdInCurrency: 91.61, bugs: 0, vulnerabilities: 0 , codeSmells: 23,  duplCode: 0.00 }, ]
		          },
		          
		   	lineChartInterestTD: {values: [965.441, 569.982, 298.874, 557.914, 586.697, 690.202, 620.015, 620.764, 550.029]}, 
		     
			lineChartPrincipalTD: {values: [4119.201, 4307.266, 1431.616, 2803.166, 5669.68, 6074.134, 5904.866, 6878.514, 6955.823]}, 
		     
			lineChartBreakingPointTD: {values: [3.2629, 5.78299, 11.28612, 11.8264, 7.38824, 6.71242, 7.28350, 8.38141, 9.67052]},
		     
			lineChartCumulativeInterestTD: {values: [965.441, 1022.423, 1052.297, 1610.211, 1668.908, 1738.11, 1800.125, 1862.889, 1917.918]},    
			
			interestRadarChartValues : {values: [39.95, 8.42, 48, 31.11] }, 
			
			interestRadarChartLabels : {values: ['LOC', 'CC', 'NoF', 'CD']},
			
        },     
       
	holisun_arassistanceTD : {
			projectName : 'Holisun Arassistance',
			interestSummary : 
				{name:'Holisun Arassistance', type: 'project', breakpoint: 3.39 , totalInterest:516.374, maintainabilityRank: 66, interestProbability: 49, interestProbabilityRank: 99, MPC: 37.19, DIT: 7, NCC: 1, RFC: 34.97, LCM: 52.77, WMC: 1.26, DAC: 0.13, CC: 7.71, LOC: 1189, NOM: 360 }, 
			  							
			principalSummary :
				{name:'Holisun Arassistance', type: 'project', tdInMinutes:2728, tdInCurrency: 2082.82, bugs: 0, vulnerabilities: 26, codeSmells: 382, duplCode: 49.7},
					 						
			interestIndicators:
				{
				columns: [
					{label: "Artifact", field: "name"}, 
					{label: "MPC", field: "MPC"},
					{label: "DIT", field: "DIT"}, 
					{label: "NCC", field: "NCC"}, 
					{label: "RFC", field: "RFC"},
					{label: "LCM", field: "LCM"},  
					{label: "WMC", field: "WMC"}, 
					{label: "DAC", field: "DAC"}, 
					{label: "CC", field: "CC"}, 
					{label: "LOC", field: "LOC"}, 
					{label: "NOM", field: "NOM"}, 
					{label: "Interest Probability", field: "IP"},
					{label: "Interest", field: "Interest"},	
					{label: "Maintainability Ranking %", field: "MR"},
					{label: "Interest Probability Ranking %", field: "IPR"},	
					],
				rows: [
					{name:'Holisun/arassistance', MPC: 11, DIT: 7, NOCC : 0, RFC: 13, LCM: 8, WMC: 1, DAC: 0, CC: 8, LOC: 51, NOM: 19, IP: 0.55, Interest: 1.97, MR: 40 , IPR: 60  }, 
					{name:'Holisun/arassistance/SplashActivity.java', MPC: 29, DIT: 7, NOCC: 0, RFC: 31, LCM: 24, WMC: 2, DAC: 0, CC: 7, LOC: 38, NOM: 13, IP: 0.58, Interest:4.07 , MR: 50 , IPR:70  },
					{name:'Holisun/arassistance/adapters', MPC: 34, DIT: 1, NOCC : 0, RFC: 33, LCM: 13, WMC: 2, DAC: 0, CC: 20, LOC: 130, NOM: 27, IP: 0.95, Interest:10.66, MR: 70 , IPR:  90 },  
					{name:'Holisun/arassistance/adapters/ChatAdapter.java', MPC: 30, DIT: 1, NOCC: 0, RFC: 35, LCM: 7, WMC: 2, DAC: 0, CC: 6, LOC: 38, NOM: 9, IP: 0.58, Interest:0.15, MR: 20 , IPR:70   },
					{name:'Holisun/arassistance/adapters/DocumentRecyclerViewAdapter.java', MPC: 16, DIT: 1, NOCC: 0, RFC: 24, LCM: 13, WMC: 1, DAC: 0, CC: 6, LOC: 42, NOM: 8, IP: 0.25, Interest:29.39 , MR: 90 , IPR:40  },
					{name:'Holisun/arassistance/adapters/OnlineUsersAdapter.java', MPC: 55, DIT: 1, NOCC: 0, RFC: 39, LCM: 18, WMC: 3, DAC: 0, CC: 8, LOC: 50, NOM: 10, IP: 0.23, Interest: 45.80 , MR: 90 , IPR:10  },
					{name:'Holisun/arassistance/models', MPC: 1, DIT: 1, NOCC : 0, RFC: 20, LCM: 40, WMC: 1, DAC: 0, CC: 18, LOC: 69, NOM: 27, IP: 0.55, Interest: 1.32, MR: 30 , IPR:  60  },   
					{name:'Holisun/arassistance/models/ChatModel.java', MPC: 1, DIT: 1, NOCC: 0, RFC: 14, LCM: 15, WMC: 1, DAC: 0, CC: 6, LOC: 24, NOM: 9, IP: 0.58, Interest: 1.34, MR: 40 , IPR: 70  },
					{name:'Holisun/arassistance/models/OnlineUserModel.java', MPC: 2, DIT: 1, NOCC: 0, RFC: 27, LCM: 66, WMC: 1, DAC: 0, CC: 12, LOC: 45, NOM: 18, IP: 0.23, Interest: 50.03 , MR: 99 , IPR: 10 },
					{name:'Holisun/arassistance/services', MPC: 107, DIT: 3, NOCC : 0, RFC: 109, LCM: 311, WMC: 1, DAC: 1, CC: 25, LOC: 112, NOM: 28, IP: 0.35, Interest: 2.89, MR: 50 , IPR: 50 },   
					{name:'Holisun/arassistance/services/ChatService.java', MPC: 107, DIT: 3, NOCC: 0, RFC: 109, LCM: 311, WMC: 1, DAC: 1, CC: 25, LOC: 112, NOM: 28, IP: 0.38, Interest: 3.02, MR: 50 , IPR:  70 },
					{name:'Holisun/arassistance/ui/activity', MPC: 122, DIT: 7, NOCC : 0, RFC: 78, LCM: 133, WMC: 2, DAC: 0, CC: 64, LOC: 358, NOM: 94, IP: 0.95, Interest: 22.52  , MR: 80 , IPR: 90  }, 
					{name:'Holisun/arassistance/ui/activity/ChatActivity.java', MPC: 60, DIT: 7, NOCC: 0, RFC: 60, LCM: 16, WMC: 1, DAC: 0, CC: 7, LOC: 40, NOM: 11, IP: 0.58, Interest: 0.48, MR: 30 , IPR: 70  },
					{name:'Holisun/arassistance/ui/activity/ConferenceActivity.java', MPC: 418, DIT: 7, NOCC: 0, RFC: 215, LCM: 616, WMC: 3, DAC: 2, CC: 40, LOC: 229, NOM: 59, IP: 0.96, Interest:22.23, MR:70  , IPR: 99  },
					{name:'Holisun/arassistance/ui/activity/IncomingCallActivity.java', MPC: 21, DIT: 7, NOCC: 0, RFC: 26, LCM: 0, WMC: 1, DAC: 0, CC: 3, LOC: 14, NOM: 5, IP: 0.23, Interest:28.79 , MR: 90 , IPR: 10 },
					{name:'Holisun/arassistance/ui/activity/LoginActivity.java', MPC: 78, DIT: 7, NOCC: 0, RFC: 57, LCM: 25, WMC: 2, DAC: 0, CC: 9, LOC: 53, NOM: 13, IP: 0.23, Interest: 61.07, MR:99  , IPR: 10  },
					{name:'Holisun/arassistance/ui/activity/SliderActivity.java', MPC: 32, DIT: 7, NOCC: 0, RFC: 34, LCM: 9, WMC: 1, DAC: 0, CC: 5, LOC: 22, NOM: 6, IP: 0.96, Interest:2.65, MR: 40 , IPR:  99  },
					{name:'Holisun/arassistance/ui/fragments', MPC: 17, DIT: 3, NOCC : 0, RFC: 25, LCM: 8, WMC: 1, DAC: 0, CC: 18, LOC: 109, NOM: 29, IP: 0.95, Interest: 10.44 , MR: 60 , IPR: 90  },  
					{name:'Holisun/arassistance/ui/fragments/CallFragment.java', MPC: 28, DIT: 3, NOCC: 0, RFC: 39, LCM: 13, WMC: 1, DAC: 0, CC: 6, LOC: 34, NOM: 11, IP: 0.38, Interest:0.30, MR:  20, IPR: 50 },
					{name:'Holisun/arassistance/ui/fragments/DocumentsFragment.java', MPC: 28, DIT: 3, NOCC: 0, RFC: 41, LCM: 14, WMC: 1, DAC: 0, CC: 8, LOC: 44, NOM: 13, IP: 0.25, Interest: 27.76 , MR: 80 , IPR:40  },
					{name:'Holisun/arassistance/ui/fragments/OptionsFragment.java', MPC: 8, DIT: 3, NOCC: 0, RFC: 11, LCM: 3, WMC: 1, DAC: 0, CC: 2, LOC: 18, NOM: 2, IP: 0.95, Interest: 1.48  , MR: 40 , IPR: 90 },
					{name:'Holisun/arassistance/ui/fragments/TabPagerAdapter.java', MPC: 4, DIT: 3, NOCC: 0, RFC: 9, LCM: 1, WMC: 2, DAC: 0, CC: 2, LOC: 13, NOM: 3, IP: 0.23, Interest: 6.19, MR: 60 , IPR:  10 },
					{name:'Holisun/arassistance/utils', MPC: 16, DIT: 2, NOCC : 0, RFC: 21, LCM: 32, WMC: 1, DAC: 0, CC: 87, LOC: 373, NOM: 142, IP: 0.95, Interest: 16.50  , MR: 70 , IPR: 90 },  
					{name:'Holisun/arassistance/utils/Call.java', MPC: 2, DIT: 1, NOCC: 0, RFC: 5, LCM: 1, WMC: 1, DAC: 0, CC: 1, LOC: 6, NOM: 1, IP: 0.23, Interest:  5.60 , MR: 50 , IPR: 10 },
					{name:'Holisun/arassistance/utils/Constants.java', MPC: 1, DIT: 1, NOCC: 0, RFC: 2, LCM: 0, WMC: 1, DAC: 0, CC: 0, LOC: 22, NOM: 19, IP: 0.96, Interest:  0.41 , MR: 30 , IPR: 99  },
					{name:'Holisun/arassistance/utils/Converter.java', MPC: 18, DIT: 1, NOCC: 0, RFC: 15, LCM: 3, WMC: 2, DAC: 0, CC: 2, LOC: 19, NOM: 2, IP: 0.23, Interest:  20.62 , MR:70  , IPR: 10  },
					{name:'Holisun/arassistance/utils/Document.java', MPC: 1, DIT: 1, NOCC: 0, RFC: 8, LCM: 0, WMC: 1, DAC: 0, CC: 3, LOC: 16, NOM: 6, IP: 0.25, Interest:  0.00 , MR:  10, IPR:  40},
					{name:'Holisun/arassistance/utils/EndpointLogin.java', MPC: 53, DIT: 2, NOCC: 0, RFC: 51, LCM: 16, WMC: 1, DAC: 1, CC: 7, LOC: 44, NOM: 11, IP: 0.38, Interest:  0.32 , MR: 20 , IPR: 50  },
					{name:'Holisun/arassistance/utils/EndpointLoginInterface.java', MPC: 0, DIT: 1, NOCC: 1, RFC: 4, LCM: 1, WMC: 0, DAC: 0, CC: 2, LOC: 3, NOM: 2, IP: 0.23, Interest:   0.00 , MR: 10 , IPR: 10 },
					{name:'Holisun/arassistance/utils/EndpointSessionManager.java', MPC: 4, DIT: 1, NOCC: 0, RFC: 56, LCM: 327, WMC: 1, DAC: 0, CC: 26, LOC: 59, NOM: 40, IP: 0.23, Interest: 54.08   , MR: 99 , IPR:10  },
					{name:'Holisun/arassistance/utils/HSQBSessionListener.java', MPC: 0, DIT: 1, NOCC: 0, RFC: 2, LCM: 0, WMC: 0, DAC: 0, CC: 1, LOC: 2, NOM: 1, IP: 0.80, Interest:  0.00  , MR: 10 , IPR: 80 },
					{name:'Holisun/arassistance/utils/JsonMessageSender.java', MPC: 43, DIT: 1, NOCC: 0, RFC: 30, LCM: 6, WMC: 1, DAC: 0, CC: 3, LOC: 30, NOM: 3, IP: 0.25, Interest: 30.19  , MR: 90 , IPR:40   },
					{name:'Holisun/arassistance/utils/MessageQueue.java', MPC: 4, DIT: 1, NOCC: 0, RFC: 13, LCM: 0, WMC: 1, DAC: 0, CC: 4, LOC: 11, NOM: 4, IP: 0.23, Interest:  10.13, MR: 60 , IPR: 10  },
					{name:'Holisun/arassistance/utils/Opponent.java', MPC: 1, DIT: 1, NOCC: 0, RFC: 6, LCM: 0, WMC: 1, DAC: 0, CC: 2, LOC: 12, NOM: 4, IP: 0.23, Interest: 0.00   , MR:  10, IPR:  10},
					{name:'Holisun/arassistance/utils/Preferences.java', MPC: 17, DIT: 1, NOCC: 0, RFC: 16, LCM: 10, WMC: 1, DAC: 0, CC: 4, LOC: 21, NOM: 4, IP: 0.23, Interest:  24.33 , MR: 80 , IPR: 10  },
					{name:'Holisun/arassistance/utils/QBPrivateChatManagerListenerImpl.java', MPC: 9, DIT: 2, NOCC: 0, RFC: 16, LCM: 0, WMC: 1, DAC: 0, CC: 3, LOC: 21, NOM: 4, IP: 0.80, Interest: 24.10 , MR: 80 , IPR: 80  },
					{name:'Holisun/arassistance/utils/SessionManager.java', MPC: 5, DIT: 1, NOCC: 0, RFC: 28, LCM: 28, WMC: 1, DAC: 0, CC: 11, LOC: 26, NOM: 14, IP: 0.38, Interest:  0.80  , MR: 30 , IPR:50  },
					{name:'Holisun/arassistance/utils/WhiteBoard.java', MPC: 78, DIT: 1, NOCC: 0, RFC: 61, LCM: 93, WMC: 2, DAC: 0, CC: 18, LOC: 81, NOM: 27, IP: 0.23, Interest:  93.33 , MR: 99 , IPR: 10  }, 
					]	
				},
		          
		     principalIndicators:
				{
				columns: [
					{label: "Artifact", field: "name"}, 
					{label: "TD-minutes", field: "tdInMinutes"},
					{label: "TD-currency", field: "tdInCurrency"}, 
					{label: "Bugs", field: "bugs"}, 
					{label: "Vulnerabilities", field: "vulnerabilities"},
					{label: "Code Smells", field: "codeSmells"},  
					{label: "Duplications", field: "duplCode"},  	
					],
				rows: [
					{name:'Holisun/arassistance', tdInMinutes: 34, tdInCurrency: 25.96, bugs: 0, vulnerabilities: 0 , codeSmells: 8, duplCode: 0.00  }, 
					{name:'Holisun/arassistance/SplashActivity.java', tdInMinutes: 34, tdInCurrency: 25.96, bugs: 0, vulnerabilities: 0 , codeSmells: 8, duplCode: 0.00  },
					{name:'Holisun/arassistance/adapters', tdInMinutes: 38, tdInCurrency: 29.01, bugs: 0, vulnerabilities: 1 , codeSmells: 7, duplCode: 0.00  },  
					{name:'Holisun/arassistance/adapters/ChatAdapter.java', tdInMinutes: 22, tdInCurrency: 16.80, bugs: 0, vulnerabilities: 0 , codeSmells: 4, duplCode: 0.00  },
					{name:'Holisun/arassistance/adapters/DocumentRecyclerViewAdapter.java', tdInMinutes: 10, tdInCurrency: 7.64, bugs: 0, vulnerabilities: 1 , codeSmells: 0, duplCode: 0.00  },
					{name:'Holisun/arassistance/adapters/OnlineUsersAdapter.java', tdInMinutes: 6, tdInCurrency: 4.58, bugs: 0, vulnerabilities: 0 , codeSmells: 3, duplCode: 0.00  },
					{name:'Holisun/arassistance/models', tdInMinutes: 24, tdInCurrency: 18.32, bugs: 0, vulnerabilities: 0 , codeSmells: 6, duplCode: 0.00   },   
					{name:'Holisun/arassistance/models/ChatModel.java', tdInMinutes: 5, tdInCurrency: 3.82, bugs: 0, vulnerabilities: 0 , codeSmells: 1, duplCode: 0.00  },
					{name:'Holisun/arassistance/models/OnlineUserModel.java', tdInMinutes: 19, tdInCurrency: 14.51, bugs: 0, vulnerabilities: 0 , codeSmells: 5, duplCode: 0.00   },
					{name:'Holisun/arassistance/services', tdInMinutes: 115, tdInCurrency: 87.8, bugs: 0, vulnerabilities: 1 , codeSmells: 18, duplCode: 0.00  },   
					{name:'Holisun/arassistance/services/ChatService.java', tdInMinutes: 115, tdInCurrency: 87.8, bugs: 0, vulnerabilities: 1 , codeSmells: 18, duplCode: 0.00  },
					{name:'Holisun/arassistance/ui/activity', tdInMinutes: 504, tdInCurrency: 384.80, bugs: 0, vulnerabilities: 1 , codeSmells: 71, duplCode: 19.9    }, 
					{name:'Holisun/arassistance/ui/activity/ChatActivity.java', tdInMinutes: 74, tdInCurrency: 56.5, bugs: 0, vulnerabilities: 0 , codeSmells: 19, duplCode: 0.00  },
					{name:'Holisun/arassistance/ui/activity/ConferenceActivity.java', tdInMinutes: 357, tdInCurrency: 272.57, bugs: 0, vulnerabilities: 0 , codeSmells: 43, duplCode: 29.80 },
					{name:'Holisun/arassistance/ui/activity/IncomingCallActivity.java', tdInMinutes: 46, tdInCurrency: 35.12, bugs: 0, vulnerabilities: 0 , codeSmells: 5, duplCode: 0.00  },
					{name:'Holisun/arassistance/ui/activity/LoginActivity.java', tdInMinutes: 12, tdInCurrency: 9.16, bugs: 0, vulnerabilities: 1 , codeSmells: 1, duplCode: 0.00   },
					{name:'Holisun/arassistance/ui/activity/SliderActivity.java', tdInMinutes: 15, tdInCurrency: 11.45, bugs: 0, vulnerabilities: 0 , codeSmells: 3, duplCode: 0.00  },
					{name:'Holisun/arassistance/ui/fragments', tdInMinutes: 154, tdInCurrency: 117.58, bugs: 0, vulnerabilities: 2 , codeSmells: 32, duplCode: 0.00  },  
					{name:'Holisun/arassistance/ui/fragments/CallFragment.java', tdInMinutes: 94, tdInCurrency: 71.77, bugs: 0, vulnerabilities: 2 , codeSmells: 13, duplCode: 0.00 },
					{name:'Holisun/arassistance/ui/fragments/DocumentsFragment.java', tdInMinutes: 52, tdInCurrency: 39.7, bugs: 0, vulnerabilities: 0 , codeSmells: 15, duplCode: 0.00  },
					{name:'Holisun/arassistance/ui/fragments/OptionsFragment.java', tdInMinutes: 2, tdInCurrency: 1.53, bugs: 0, vulnerabilities: 0 , codeSmells: 1, duplCode: 0.00    },
					{name:'Holisun/arassistance/ui/fragments/TabPagerAdapter.java', tdInMinutes: 6, tdInCurrency: 4.58, bugs: 0, vulnerabilities: 0 , codeSmells: 3, duplCode: 0.00   },
					{name:'Holisun/arassistance/utils', tdInMinutes: 495, tdInCurrency: 377.93, bugs: 0, vulnerabilities: 8 , codeSmells: 49, duplCode: 0.00  },  
					{name:'Holisun/arassistance/utils/Call.java', tdInMinutes: 87, tdInCurrency: 66.42, bugs: 0, vulnerabilities: 3 , codeSmells: 7, duplCode: 0.00   },
					{name:'Holisun/arassistance/utils/Constants.java', tdInMinutes: 100, tdInCurrency: 76.35, bugs: 0, vulnerabilities: 2 , codeSmells: 2, duplCode: 0.00   },
					{name:'Holisun/arassistance/utils/Converter.java', tdInMinutes: 47, tdInCurrency: 35.88, bugs: 0, vulnerabilities: 0 , codeSmells: 3, duplCode: 0.00  },
					{name:'Holisun/arassistance/utils/Document.java', tdInMinutes: 0, tdInCurrency: 0.00, bugs: 0, vulnerabilities: 0 , codeSmells: 0, duplCode: 0.00    },
					{name:'Holisun/arassistance/utils/EndpointLogin.java', tdInMinutes: 44, tdInCurrency: 33.59, bugs: 0, vulnerabilities: 3 , codeSmells: 4, duplCode: 0.00    },
					{name:'Holisun/arassistance/utils/EndpointLoginInterface.java',tdInMinutes: 0, tdInCurrency: 0.00, bugs: 0, vulnerabilities: 0 , codeSmells: 0, duplCode: 0.00     },
					{name:'Holisun/arassistance/utils/EndpointSessionManager.java', tdInMinutes: 68, tdInCurrency: 51.92, bugs: 0, vulnerabilities: 0 , codeSmells: 16, duplCode: 0.00    },
					{name:'Holisun/arassistance/utils/HSQBSessionListener.java', tdInMinutes: 0, tdInCurrency: 0.00, bugs: 0, vulnerabilities: 0 , codeSmells: 0, duplCode: 0.00    },
					{name:'Holisun/arassistance/utils/JsonMessageSender.java', tdInMinutes: 34, tdInCurrency: 25.96, bugs: 0, vulnerabilities: 0 , codeSmells: 3, duplCode: 0.00  },
					{name:'Holisun/arassistance/utils/MessageQueue.java', tdInMinutes: 30, tdInCurrency: 22.91, bugs: 0, vulnerabilities: 0 , codeSmells: 1, duplCode: 0.00    },
					{name:'Holisun/arassistance/utils/Opponent.java', tdInMinutes: 0, tdInCurrency: 0.00, bugs: 0, vulnerabilities: 0 , codeSmells: 0, duplCode: 0.00 },
					{name:'Holisun/arassistance/utils/Preferences.java', tdInMinutes: 36, tdInCurrency: 27.49, bugs: 0, vulnerabilities: 0 , codeSmells: 4, duplCode: 0.00     },
					{name:'Holisun/arassistance/utils/QBPrivateChatManagerListenerImpl.java', tdInMinutes: 6, tdInCurrency: 4.58, bugs: 0, vulnerabilities: 0 , codeSmells: 3, duplCode: 0.00    },
					{name:'Holisun/arassistance/utils/SessionManager.java', tdInMinutes: 32, tdInCurrency: 24.43, bugs: 0, vulnerabilities: 0 , codeSmells: 2, duplCode: 0.00    },
					{name:'Holisun/arassistance/utils/WhiteBoard.java', tdInMinutes: 11, tdInCurrency: 8.4, bugs: 0, vulnerabilities: 0 , codeSmells: 4, duplCode: 0.00   }, 
					]
				},
					
					
			lineChartInterestTD: {values: [8440.584, 1686.407, 446.951, 390.905, 516.374]}, 
		     
			lineChartPrincipalTD: {values: [1505.488, 1809.98, 1846.572, 1945.591, 2082.312]}, 
		     
			lineChartBreakingPointTD: {values: [0.7135, 4.2919, 16.5221, 19.9066, 16.1342]},
		     
			lineChartCumulativeInterestTD: {values: [8440.584, 10126.991, 10573.942, 10964.847, 11481.221]},
			
			interestRadarChartValues : {values: [37.19, 7, 1, 34.97, 52.77, 1.26, 0.13, 7.71] }, 
			
			interestRadarChartLabels : {values: ['MPC', 'DIT', 'NCC', 'RFC', 'LCM', 'WMC', 'DAC', 'CC']},		
        },   
  
               
        airbusTD : {
			projectName : 'Airbus',
			interestSummary : 
				{name:'Airbus', type: 'project', breakpoint: 7.89  , totalInterest: 473.30, maintainabilityRank: 33, interestProbability: 31 , interestProbabilityRank: 33, LOC: 958 , CC: 9.17, NoF: 95.33, CD: 5.32}, 
			  							
			principalSummary :
				{name:'Airbus', type: 'project', tdInMinutes: 4889 , tdInCurrency: 3732.74, bugs: 0, vulnerabilities: 0 , codeSmells: 732 , duplCode: 0.00},
					 						
			interestIndicators:
				{
				columns: [
					{label: "Artifact", field: "name"}, 
					{label: "Lines of Code", field: "LOC"},
					{label: "Cyclomatic Complexity", field: "CC"}, 
					{label: "Number of Functions", field: "NoF"}, 
					{label: "Comments Density", field: "CD"},
					{label: "Interest Probability", field: "IP"},
					{label: "Interest", field: "Interest"},
					{label: "Maintainability Ranking", field: "MR"},
					{label: "Interest Probability Ranking", field: "IPR"},	
					],
				rows: [
					{name:'Airbus/base/inc/core', LOC: 53, CC: 0.00, NoF : 0.00, CD: 1.90, IP: 0.33, Interest: 1.21, MR: 80 , IPR: 20 }, 
					{name:'Airbus/base/inc/core/kameleoncore.h', LOC: 53, CC: 0.00, NoF : 0.00, CD: 1.90, IP: 0.33, Interest: 1.80, MR: 40 , IPR: 20  },  
					{name:'Airbus/lib/kamutils/src', LOC: 311, CC: 17.5, NoF : 12.33, CD: 30.70, IP: 0.33, Interest: 2.29, MR:70 , IPR:20  },  
					{name:'Airbus/lib/kamutils/src/bytebuffer.cpp', LOC: 56, CC: 15.00, NoF : 10.00, CD: 1.80, IP: 0.33, Interest: 2.41, MR: 50, IPR: 20 },  
					{name:'Airbus/lib/kamutils/src/intfun.cpp', LOC: 71, CC: 18.00, NoF : 7.00, CD: 2.70, IP: 0.33, Interest: 2.43, MR:70 , IPR: 20 },  
					{name:'Airbus/lib/kamutils/src/path.cpp', LOC: 86, CC: 26.00, NoF : 15.00, CD: 0.00, IP: 0.33, Interest: 6.05, MR: 30, IPR:20  },  
					{name:'Airbus/lib/kamutils/src/strfun.cpp', LOC: 53, CC: 14.00, NoF : 10.00, CD: 8.60, IP: 0.33, Interest: 6.65, MR: 99, IPR:20  },  
					{name:'Airbus/lib/kamutils/src/timestamp.cpp', LOC: 14, CC: 2.00, NoF : 2.00, CD: 17.60, IP: 0.33, Interest: 6.67, MR:20 , IPR:20  },  
					{name:'Airbus/lib/kamutils/src/value.cpp', LOC: 31, CC: 30.00, NoF : 30.00, CD: 0.00, IP: 0.33, Interest: 7.87, MR:40 , IPR:20  },  
					{name:'Airbus/base/inc/com/link', LOC: 112, CC: 0.00, NoF : 0.00, CD: 13.1, IP: 0.33, Interest: 9.09, MR: 80, IPR:20  },  
					{name:'Airbus/base/inc/com/link/linkinterface.h', LOC: 26, CC: 0.00, NoF : 0.00, CD: 7.10, IP: 0.33, Interest: 21.39 , MR: 80, IPR:20 },  
					{name:'Airbus/base/inc/com/link/tcpserverlink.h', LOC: 47, CC: 0.00, NoF : 0.00, CD: 6.00, IP: 0.00, Interest: 26.60 , MR: 99, IPR: 10},  
					{name:'Airbus/base/inc/com/link/udplink.h', LOC: 39, CC: 0.00, NoF : 0.00, CD: 0.00, IP: 0.33, Interest: 29.44, MR:60 , IPR: 20 },  
					{name:'Airbus/base/inc/core/loader', LOC: 120, CC: 0.00, NoF : 0.00, CD: 0.00, IP: 0.33, Interest: 37.33, MR: 60, IPR: 20 },  
					{name:'Airbus/base/inc/core/loader/com_loader.h', LOC: 21, CC: 0.00, NoF : 0.00, CD: 0.00, IP: 0.33, Interest: 39.28 , MR: 10, IPR:20 },  
					{name:'Airbus/base/inc/conf', LOC: 199, CC: 3.00, NoF : 1.80, CD: 6.69, IP: 0.33, Interest: 39.89, MR: 90, IPR: 20 },  
					{name:'Airbus/base/inc/conf/configmap.h', LOC: 16, CC: 0.00, NoF : 0.00, CD: 0.00, IP: 0.33, Interest: 56.54 , MR:10 , IPR:20 },  
					{name:'Airbus/base/inc/conf/configsection.h', LOC: 112, CC: 15.00, NoF : 9.00, CD: 3.40, IP: 0.33, Interest: 84.19, MR:90 , IPR: 20 },  
					{name:'Airbus/base/inc/conf/confstreamparser.h', LOC: 22, CC: 0.00, NoF : 0.00, CD: 0.00, IP: 0.33, Interest: 92.13, MR: 30, IPR:20 },  
					]
		          },
		          
		     principalIndicators:
				{
				columns: [
					{label: "Artifact", field: "name"}, 
					{label: "TD-minutes", field: "tdInMinutes"},
					{label: "TD-currency", field: "tdInCurrency"}, 
					{label: "Bugs", field: "bugs"}, 
					{label: "Vulnerabilities", field: "vulnerabilities"},
					{label: "Code Smells", field: "codeSmells"},   
					{label: "Duplications", field: "duplCode"},  	
					],
				rows: [
					{name:'Airbus/base/inc/core', tdInMinutes: 119, tdInCurrency: 90.86, bugs: 0, vulnerabilities: 0 , codeSmells: 28, duplCode: 0.00 }, 
					{name:'Airbus/base/inc/core/kameleoncore.h', tdInMinutes: 119, tdInCurrency: 90.86, bugs: 0, vulnerabilities: 0 , codeSmells: 28, duplCode: 0.00 },  
					{name:'Airbus/lib/kamutils/src', tdInMinutes: 1213, tdInCurrency: 926.13, bugs: 0, vulnerabilities: 0 , codeSmells: 126, duplCode: 0.00 },  
					{name:'Airbus/lib/kamutils/src/bytebuffer.cpp', tdInMinutes: 167, tdInCurrency: 127.5, bugs: 0, vulnerabilities: 0 , codeSmells: 16, duplCode: 0.00 },  
					{name:'Airbus/lib/kamutils/src/intfun.cpp', tdInMinutes: 200, tdInCurrency: 152.70, bugs: 0, vulnerabilities: 0 , codeSmells: 22, duplCode: 0.00 },  
					{name:'Airbus/lib/kamutils/src/path.cpp', tdInMinutes: 255, tdInCurrency: 194.69, bugs: 0, vulnerabilities: 0 , codeSmells: 26, duplCode: 0.00 },  
					{name:'Airbus/lib/kamutils/src/strfun.cpp', tdInMinutes: 181, tdInCurrency: 138.19, bugs: 0, vulnerabilities: 0 , codeSmells: 18, duplCode: 0.00 },  
					{name:'Airbus/lib/kamutils/src/timestamp.cpp', tdInMinutes: 43, tdInCurrency: 32.83, bugs: 0, vulnerabilities: 0 , codeSmells: 10, duplCode: 0.00 },  
					{name:'Airbus/lib/kamutils/src/value.cpp', tdInMinutes: 367, tdInCurrency: 280.20, bugs: 0, vulnerabilities: 0 , codeSmells: 34, duplCode: 0.00},  
					{name:'Airbus/base/inc/com/link', tdInMinutes: 396, tdInCurrency: 302.35, bugs: 0, vulnerabilities: 0 , codeSmells: 85, duplCode: 0.00},  
					{name:'Airbus/base/inc/com/link/linkinterface.h', tdInMinutes: 89, tdInCurrency: 67.95, bugs: 0, vulnerabilities: 0 , codeSmells: 18, duplCode: 0.00 },  
					{name:'Airbus/base/inc/com/link/tcpserverlink.h', tdInMinutes: 161, tdInCurrency: 122.92, bugs: 0, vulnerabilities: 0 , codeSmells: 37, duplCode: 0.00 },  
					{name:'Airbus/base/inc/com/link/udplink.h', tdInMinutes: 146, tdInCurrency: 111.47, bugs: 0, vulnerabilities: 0 , codeSmells: 30, duplCode: 0.00 },  
					{name:'Airbus/base/inc/core/loader', tdInMinutes: 244, tdInCurrency: 186.29, bugs: 0, vulnerabilities: 0 , codeSmells: 54, duplCode: 0.00},  
					{name:'Airbus/base/inc/core/loader/com_loader.h', tdInMinutes: 29, tdInCurrency: 22.14, bugs: 0, vulnerabilities: 0 , codeSmells: 12, duplCode: 0.00 },  
					{name:'Airbus/base/inc/conf', tdInMinutes: 628, tdInCurrency: 479.48, bugs: 0, vulnerabilities: 0 , codeSmells: 102, duplCode: 0.00 },  
					{name:'Airbus/base/inc/conf/configmap.h', tdInMinutes: 103, tdInCurrency: 78.64, bugs: 0, vulnerabilities: 0 , codeSmells: 23, duplCode: 0.00 },  
					{name:'Airbus/base/inc/conf/configsection.h', tdInMinutes: 348, tdInCurrency: 265.70, bugs: 0, vulnerabilities: 0 , codeSmells: 49, duplCode: 0.00 },  
					{name:'Airbus/base/inc/conf/confstreamparser.h', tdInMinutes: 81, tdInCurrency: 61.84, bugs: 0, vulnerabilities: 0 , codeSmells: 14, duplCode: 0.00 },  
					
					]
		          },
		          
		    lineChartInterestTD: {values: [153.17, 0.5, 473.30]}, 
		     
			lineChartPrincipalTD: {values: [1002.45, 1029.53, 3732.74]}, 
		     
			lineChartBreakingPointTD: {values: [1.1160, 23252.506, 1.6685]},
		     
			lineChartCumulativeInterestTD: {values: [153.17, 153.67, 626.97]},
			
			interestRadarChartValues : {values: [10.05, 9.17, 95.33, 5.32] }, 
			
			interestRadarChartLabels : {values: ['LOC', 'CC', 'NoF', 'CD']},							  
    			
        },

      
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
		            {hotspot: "3rd", start: "601", end: "606", ilp: "0", stride0: "0%", ins: "2997", cold: "6.6%", ctrl: "3.1%", mem: "29.4%", int: "3.3%", energygain: "0"}
		            ]},
        },

        interestSummary: {breakpoint: 28, totalInterest:800, maintainabilityRank: 10, interestProbability:38, instability: 25, interestProbabilityRank: 40},

        principalSummary: {tdInDays: 21, tdInCurrency: 150000, bugs: 168, vulnerabilities: 55 , codeSmells: 1400, coverage: 12.2, duplCode: 2.3 },
        
        topViolations: top10violations,

        topViolationsNewCode:top5violations,   
        
        newCodeLineChartTD: {data: [2.21, 2.81, 0.98, 1.42]},  

        newCodeLineChartNC: {data: [0.55, 0.56, 0.57, 0.58]},  
    }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
