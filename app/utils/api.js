//Dev
/*var baseUrl="http://localhost";
var port="9000"
var apiKey="8447dd099b14428b851017d5322233ba0d42c90f870b40b94b326f6572a9a433" ;*/

//UAT
var baseUrl="http://10.214.4.9";
var port="80";
var apiKey="329194d504b8166f2fae01db2d550af8ce5ef9ddf364ca516d1346ab4283182b";
export default {
    patientApiBaseUrl:baseUrl+":"+port+"/api/v2/cisfp/_table",//":9000/api/v2/cisfp/_table",//http://"+baseUrl+":3000",
    patientListApiUrl:baseUrl+":"+port+"/api/v2/cisfp/_table/Patients?api_key="+apiKey,
    doctorApiBaseUrl: baseUrl+":"+port+"/api/v2/cisfp/_table",//baseUrl+":3001",
    doctorListApiUrl: baseUrl+":"+port+"/api/v2/cisfp/_table/Doctors?api_key="+apiKey,//baseUrl+":3001/resource",
    suburbApiBaseUrl:baseUrl+":"+port+"/api/v2/cisfp/_table", //baseUrl+":3004",
    suburbListApiUrl:baseUrl+":"+port+"/api/v2/cisfp/_table/Suburbs?api_key="+apiKey, //baseUrl+":3004/resource",
    practiceApiBaseUrl:baseUrl+":"+port+"/api/v2/cisfp/_table",// baseUrl+":3005",
    practiceListApiUrl:baseUrl+":"+port+"/api/v2/cisfp/_table/Practices?api_key="+apiKey, //baseUrl+":3005/resource",
    healthfundApiBaseUrl: baseUrl+":"+port+"/api/v2/cisfp/_table",//baseUrl+":3006",
    healthfundListApiUrl:baseUrl+":"+port+"/api/v2/cisfp/_table/Healthfunds?api_key="+apiKey,// baseUrl+":3006/resource",
    providedServiceVenueApiBaseUrl:baseUrl+":"+port+"/api/v2/cisfp/_table",// baseUrl+":3008",
    providedServiceVenueListApiUrl: baseUrl+":"+port+"/api/v2/cisfp/_table/ServiceVenues?api_key="+apiKey,
    providedServiceApiBaseUrl:baseUrl+":"+port+"/api/v2/cisfp/_table",// baseUrl+":3007",
    providedServiceListApiUrl: baseUrl+":"+port+"/api/v2/cisfp/_table/Services?api_key="+apiKey,
    referralApiBaseUrl:baseUrl+":"+port+"/api/v2/cisfp/_table", //baseUrl+":3003",
    referralListApiUrl:baseUrl+":"+port+"/api/v2/cisfp/_table/Referrals?api_key="+apiKey, //baseUrl+":3003/resource",
    slotsApiBaseUrl: baseUrl+":"+port+"/api/v2/cisfp/_table",//baseUrl+":3009",
    slotsListApiUrl: baseUrl+":"+port+"/api/v2/cisfp/_table/slots?api_key="+apiKey,//baseUrl+":3009/resource",
    appointmentsApiBaseUrl: baseUrl+":"+port+"/api/v2/cisfp/_table",
    appointmentsListApiUrl: baseUrl+":"+port+"/api/v2/cisfp/_table/appointments?api_key="+apiKey,
    inboundfaxesApiBaseUrl: baseUrl+":"+port+"/api/v2/cisfp/_table",
    inboundfaxesListApiUrl: baseUrl+":"+port+"/api/v2/cisfp/_table/inboundfaxes?api_key="+apiKey,
    emailApiBaseUrl:"http://cisaunedvsvb1"+":"+8080+"/api/v2",
    emailListApiUrl: "http://cisaunedvsvb1"+":"+8080+"/api/v2?api_key="+apiKey,
    authinticationApiBaseUrl: "http://10.214.6.7:5000/connect/token",
    clientId:'js_oidc',

    apiKey:apiKey,

}